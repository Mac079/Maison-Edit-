/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeJournal } from './components/HomeJournal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { ARTICLES, CATEGORIES, Article, Category } from './data/articles';
import { THE_EDIT_ITEMS } from './data/theEdit';
import { getSchemaForRoute, SITE_ORIGIN } from './utils/schemaGenerator';

// Dynamic code-splitting for non-homepage routes & diagnostics (saves ~47 KiB unused JS)
const ArticleView = lazy(() => import('./components/ArticleView').then(m => ({ default: m.ArticleView })));
const CategoryView = lazy(() => import('./components/CategoryView').then(m => ({ default: m.CategoryView })));
const ArchiveView = lazy(() => import('./components/ArchiveView').then(m => ({ default: m.ArchiveView })));
const NotFoundView = lazy(() => import('./components/NotFoundView').then(m => ({ default: m.NotFoundView })));
const DiagnosticReport = lazy(() => import('./components/DiagnosticReport').then(m => ({ default: m.DiagnosticReport })));

const ViewFallback = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center animate-pulse" aria-hidden="true">
    <div className="h-4 bg-stone-200/80 w-32 mx-auto mb-4"></div>
    <div className="h-8 bg-stone-200/80 w-64 sm:w-96 mx-auto mb-6"></div>
    <div className="h-48 bg-stone-200/50 max-w-3xl mx-auto"></div>
  </div>
);

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false);

  // Sync route on popstate (browser back/forward)
  useEffect(() => {
    const onPopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Safe client-side navigation handler
  const navigate = useCallback((path: string) => {
    try {
      window.history.pushState({}, '', path);
    } catch {
      // In constrained iframe sandboxes pushState might be restricted
    }
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Separate pathname and search params
  let pathname = '/';
  let initialSearchQuery = '';
  let initialSaved = false;
  try {
    const urlObj = new URL(currentPath, window.location.origin || 'http://localhost');
    pathname = urlObj.pathname.replace(/\/+$/, '') || '/';
    initialSearchQuery = urlObj.searchParams.get('q') || urlObj.searchParams.get('search') || '';
    initialSaved = urlObj.searchParams.get('saved') === 'true';
  } catch {
    pathname = currentPath.split('?')[0].replace(/\/+$/, '') || '/';
  }

  // Match route
  let matchedArticle: Article | undefined;
  let matchedCategory: Category | undefined;
  let isArchive = false;
  let isHome = false;
  let isNotFound = false;

  if (pathname === '' || pathname === '/') {
    isHome = true;
  } else if (pathname.startsWith('/journal/')) {
    const slug = pathname.replace('/journal/', '');
    matchedArticle = ARTICLES.find((a) => a.slug === slug);
    if (!matchedArticle) {
      isNotFound = true;
    }
  } else if (pathname.startsWith('/category/')) {
    const slug = pathname.replace('/category/', '');
    matchedCategory = CATEGORIES.find((c) => c.slug === slug);
    if (!matchedCategory) {
      isNotFound = true;
    }
  } else if (pathname === '/archive') {
    isArchive = true;
  } else {
    isNotFound = true;
  }

  // Update dynamic document title, meta tags, and JSON-LD schema for SEO
  useEffect(() => {
    let title = 'Maison Edit | Luxury Fashion Journal & Haute Couture Archive';
    let desc = 'An independent luxury fashion journal covering heritage houses, Italian tailoring, runway culture, craftsmanship, and enduring style stories.';
    let keywords = 'haute couture, luxury fashion, artisan craftsmanship, runway collections, heritage houses, Maison Edit, fashion journalism, Italian tailoring, sartorial elegance, quiet luxury, bespoke tailoring, saddle stitch, leathercraft atelier, vintage couture archive, textile conservation, biomaterials, high horology, haute joaillerie';
    let ogImage = `${SITE_ORIGIN}/images/paris-atelier-couture-gown-cover.webp`;
    let ogType = 'website';
    const canonicalUrl = `${SITE_ORIGIN}${pathname === '/' ? '/' : `${pathname}/`}`;

    if (matchedArticle) {
      title = matchedArticle.seoTitle || `${matchedArticle.title} | Maison Edit`;
      desc = matchedArticle.seoDescription || matchedArticle.subtitle;
      keywords = (matchedArticle.seoKeywords || matchedArticle.tags).join(', ');
      ogImage = matchedArticle.image.startsWith('http') ? matchedArticle.image : `${SITE_ORIGIN}${matchedArticle.image}`;
      ogType = 'article';
    } else if (matchedCategory) {
      title = matchedCategory.seoTitle || `${matchedCategory.name} | Maison Edit`;
      desc = matchedCategory.seoDescription || matchedCategory.description;
      keywords = (matchedCategory.keywords || []).join(', ');
    } else if (isArchive) {
      title = 'The Article Archive | Maison Edit Luxury Fashion Index';
      desc = 'Search and explore the complete Maison Edit archive of luxury fashion essays, Italian tailoring analyses, and haute couture investigations.';
    } else if (isNotFound) {
      title = 'Page Not Found | Maison Edit';
      desc = 'The requested story or page could not be located in this edition of Maison Edit.';
    }

    // Set page title
    document.title = title;

    // Helper to set or create meta tags
    const setMeta = (selector: string, attr: 'name' | 'property', key: string, content: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('meta[name="description"]', 'name', 'description', desc);
    setMeta('meta[name="keywords"]', 'name', 'keywords', keywords);
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', desc);
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setMeta('meta[property="og:image"]', 'property', 'og:image', ogImage);
    setMeta('meta[property="og:type"]', 'property', 'og:type', ogType);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', desc);
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);

    // Update canonical link
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', canonicalUrl);

    // Dynamic Schema.org JSON-LD generation and injection for EVERY page
    const routeSchemaResult = getSchemaForRoute(pathname, ARTICLES, CATEGORIES, THE_EDIT_ITEMS);
    let existingDynamicScript = document.getElementById('maison-dynamic-schema');
    if (!existingDynamicScript) {
      existingDynamicScript = document.createElement('script');
      existingDynamicScript.id = 'maison-dynamic-schema';
      existingDynamicScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(existingDynamicScript);
    }
    existingDynamicScript.textContent = JSON.stringify(routeSchemaResult.schema, null, 2);
  }, [matchedArticle, matchedCategory, isArchive, isNotFound, pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f5f0] text-[#1c1917] pb-16 md:pb-0">
      <Header
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenDiagnostics={() => setIsDiagnosticOpen(true)}
      />

      <main className="flex-1">
        {isHome && <HomeJournal onNavigate={navigate} />}

        <Suspense fallback={<ViewFallback />}>
          {matchedArticle && (
            <ArticleView article={matchedArticle} onNavigate={navigate} />
          )}

          {matchedCategory && (
            <CategoryView category={matchedCategory} onNavigate={navigate} />
          )}

          {isArchive && (
            <ArchiveView
              onNavigate={navigate}
              initialQuery={initialSearchQuery}
              initialSaved={initialSaved}
            />
          )}

          {isNotFound && (
            <NotFoundView
              currentPath={currentPath}
              onNavigate={navigate}
              onOpenDiagnostics={() => setIsDiagnosticOpen(true)}
            />
          )}
        </Suspense>
      </main>

      <Footer
        onNavigate={navigate}
        onOpenDiagnostics={() => setIsDiagnosticOpen(true)}
      />

      {/* Mobile-Friendly Bottom Navigation Bar (Elle Style) */}
      <MobileBottomNav
        currentPath={currentPath}
        onNavigate={navigate}
      />

      {/* Interactive System Diagnostic Monitor (lazy loaded on demand) */}
      {isDiagnosticOpen && (
        <Suspense fallback={null}>
          <DiagnosticReport
            isOpen={isDiagnosticOpen}
            onClose={() => setIsDiagnosticOpen(false)}
            onNavigate={navigate}
          />
        </Suspense>
      )}
    </div>
  );
}

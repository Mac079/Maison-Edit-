/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeJournal } from './components/HomeJournal';
import { ArticleView } from './components/ArticleView';
import { CategoryView } from './components/CategoryView';
import { ArchiveView } from './components/ArchiveView';
import { NotFoundView } from './components/NotFoundView';
import { DiagnosticReport } from './components/DiagnosticReport';
import { ARTICLES, CATEGORIES, Article, Category } from './data/articles';

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
    let ogImage = 'https://maisonedit.com/images/paris-atelier-couture-gown-cover.jpg';
    let ogType = 'website';
    let canonicalUrl = `https://maisonedit.com${pathname === '/' ? '/' : `${pathname}/`}`;
    let dynamicSchema: object | null = null;

    if (matchedArticle) {
      title = matchedArticle.seoTitle || `${matchedArticle.title} | Maison Edit`;
      desc = matchedArticle.seoDescription || matchedArticle.subtitle;
      keywords = (matchedArticle.seoKeywords || matchedArticle.tags).join(', ');
      ogImage = matchedArticle.image.startsWith('http') ? matchedArticle.image : `https://maisonedit.com${matchedArticle.image}`;
      ogType = 'article';

      dynamicSchema = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'NewsArticle',
            '@id': `${canonicalUrl}#article`,
            'isPartOf': {
              '@type': 'WebSite',
              '@id': 'https://maisonedit.com/#website',
              'name': 'Maison Edit',
              'url': 'https://maisonedit.com/',
            },
            'headline': matchedArticle.title,
            'alternativeHeadline': matchedArticle.subtitle,
            'description': desc,
            'inLanguage': 'en-US',
            'mainEntityOfPage': canonicalUrl,
            'image': [ogImage],
            'datePublished': matchedArticle.datePublished || '2026-10-12T08:00:00Z',
            'dateModified': matchedArticle.dateModified || '2026-10-14T19:45:00Z',
            'author': {
              '@type': 'Person',
              'name': matchedArticle.author,
              'jobTitle': matchedArticle.authorRole,
            },
            'publisher': {
              '@type': 'NewsMediaOrganization',
              '@id': 'https://maisonedit.com/#organization',
              'name': 'Maison Edit Publishing Group',
              'url': 'https://maisonedit.com/',
              'logo': {
                '@type': 'ImageObject',
                'url': 'https://maisonedit.com/images/paris-atelier-couture-gown-cover.jpg',
              },
            },
            'articleSection': matchedArticle.categoryName,
            'keywords': keywords,
            'wordCount': matchedArticle.wordCount || 1200,
          },
          {
            '@type': 'BreadcrumbList',
            '@id': `${canonicalUrl}#breadcrumb`,
            'itemListElement': [
              {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Home',
                'item': 'https://maisonedit.com/',
              },
              {
                '@type': 'ListItem',
                'position': 2,
                'name': matchedArticle.categoryName,
                'item': `https://maisonedit.com/category/${matchedArticle.categorySlug}/`,
              },
              {
                '@type': 'ListItem',
                'position': 3,
                'name': matchedArticle.title,
                'item': canonicalUrl,
              },
            ],
          },
        ],
      };
    } else if (matchedCategory) {
      title = matchedCategory.seoTitle || `${matchedCategory.name} | Maison Edit`;
      desc = matchedCategory.seoDescription || matchedCategory.description;
      keywords = (matchedCategory.keywords || []).join(', ');

      dynamicSchema = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'CollectionPage',
            '@id': `${canonicalUrl}#webpage`,
            'url': canonicalUrl,
            'name': title,
            'description': desc,
            'inLanguage': 'en-US',
            'isPartOf': {
              '@id': 'https://maisonedit.com/#website',
            },
          },
          {
            '@type': 'BreadcrumbList',
            '@id': `${canonicalUrl}#breadcrumb`,
            'itemListElement': [
              {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Home',
                'item': 'https://maisonedit.com/',
              },
              {
                '@type': 'ListItem',
                'position': 2,
                'name': matchedCategory.name,
                'item': canonicalUrl,
              },
            ],
          },
        ],
      };
    } else if (isArchive) {
      title = 'The Article Archive | Maison Edit Luxury Fashion Index';
      desc = 'Search and explore the complete Maison Edit archive of luxury fashion essays, Italian tailoring analyses, and haute couture investigations.';
      dynamicSchema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        'url': canonicalUrl,
        'name': title,
        'description': desc,
        'inLanguage': 'en-US',
      };
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

    // Dynamic Schema JSON-LD injection
    const existingDynamicScript = document.getElementById('maison-dynamic-schema');
    if (dynamicSchema) {
      if (existingDynamicScript) {
        existingDynamicScript.textContent = JSON.stringify(dynamicSchema);
      } else {
        const script = document.createElement('script');
        script.id = 'maison-dynamic-schema';
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(dynamicSchema);
        document.head.appendChild(script);
      }
    } else if (existingDynamicScript) {
      existingDynamicScript.remove();
    }
  }, [matchedArticle, matchedCategory, isArchive, isNotFound, pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f5f0] text-[#1c1917]">
      <Header
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenDiagnostics={() => setIsDiagnosticOpen(true)}
      />

      <main className="flex-1">
        {isHome && <HomeJournal onNavigate={navigate} />}

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
      </main>

      <Footer
        onNavigate={navigate}
        onOpenDiagnostics={() => setIsDiagnosticOpen(true)}
      />

      {/* Interactive System Diagnostic Monitor */}
      <DiagnosticReport
        isOpen={isDiagnosticOpen}
        onClose={() => setIsDiagnosticOpen(false)}
        onNavigate={navigate}
      />
    </div>
  );
}

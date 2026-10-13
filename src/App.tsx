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
  try {
    const urlObj = new URL(currentPath, window.location.origin || 'http://localhost');
    pathname = urlObj.pathname.replace(/\/+$/, '') || '/';
    initialSearchQuery = urlObj.searchParams.get('q') || urlObj.searchParams.get('search') || '';
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

  // Update dynamic document title & meta tags for SEO and UX
  useEffect(() => {
    let title = 'Maison Edit - Luxury Fashion Journal';
    let desc = 'An independent luxury fashion journal covering heritage houses, craftsmanship, runway culture, and enduring style stories.';

    if (matchedArticle) {
      title = `${matchedArticle.title} | Maison Edit`;
      desc = matchedArticle.subtitle;
    } else if (matchedCategory) {
      title = `${matchedCategory.name} | Maison Edit`;
      desc = matchedCategory.description;
    } else if (isArchive) {
      title = 'The Article Archive | Maison Edit';
      desc = 'Complete index of all essays, investigations, and field notes across our five editorial departments.';
    } else if (isNotFound) {
      title = 'Page Not Found | Maison Edit';
      desc = 'The requested story or page could not be located in this edition of Maison Edit.';
    }

    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', desc);
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', desc);
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }
  }, [matchedArticle, matchedCategory, isArchive, isNotFound]);

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

        {isArchive && <ArchiveView onNavigate={navigate} initialQuery={initialSearchQuery} />}

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

import React, { useState, useEffect } from 'react';
import { Article, ARTICLES } from '../data/articles';
import { ArrowLeft, ArrowRight, Share2, Check, Bookmark, BookmarkCheck } from 'lucide-react';

interface ArticleViewProps {
  article: Article;
  onNavigate: (path: string) => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({ article, onNavigate }) => {
  const [fontSize, setFontSize] = useState<'standard' | 'large' | 'relaxed'>('standard');
  const [copied, setCopied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const progressBarRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const bookmarks = JSON.parse(localStorage.getItem('maison_bookmarks') || '[]');
    setIsBookmarked(bookmarks.includes(article.id));
  }, [article.id]);

  useEffect(() => {
    let ticking = false;
    const updateProgress = () => {
      if (progressBarRef.current) {
        const scrollY = window.scrollY;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = totalHeight > 0 ? Math.min(1, Math.max(0, scrollY / totalHeight)) : 0;
        progressBarRef.current.style.transform = `scaleX(${progress})`;
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('maison_bookmarks') || '[]');
    let updated: string[];
    if (isBookmarked) {
      updated = bookmarks.filter((id: string) => id !== article.id);
      setIsBookmarked(false);
    } else {
      updated = [...bookmarks, article.id];
      setIsBookmarked(true);
    }
    localStorage.setItem('maison_bookmarks', JSON.stringify(updated));
  };

  // Find previous and next articles
  const currentIndex = ARTICLES.findIndex((a) => a.id === article.id);
  const prevArticle = currentIndex > 0 ? ARTICLES[currentIndex - 1] : null;
  const nextArticle = currentIndex < ARTICLES.length - 1 ? ARTICLES[currentIndex + 1] : null;

  const fontClass =
    fontSize === 'large'
      ? 'text-lg leading-relaxed'
      : fontSize === 'relaxed'
      ? 'text-xl leading-loose'
      : 'text-base leading-relaxed';

  return (
    <div>
      {/* Reading Progress Bar (Hardware accelerated transform, zero reflow) */}
      <div
        ref={progressBarRef}
        className="fixed top-0 left-0 right-0 h-1 bg-stone-900 z-50 origin-left will-change-transform"
        style={{ transform: 'scaleX(0)' }}
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-28 sm:pt-12 sm:pb-16">
        {/* Navigation Breadcrumb Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-3 sm:pb-4 mb-6 sm:mb-8 text-xs">
          <nav aria-label="Breadcrumb" className="inline-flex items-center gap-1.5 text-stone-600">
            <button
              onClick={() => onNavigate('/')}
              className="inline-flex items-center gap-1 hover:text-stone-950 transition-colors py-1 min-h-[36px]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Journal</span>
            </button>
            <span className="text-stone-300" aria-hidden="true">/</span>
            <button
              onClick={() => onNavigate(`/category/${article.categorySlug}/`)}
              className="hover:text-stone-950 transition-colors py-1 min-h-[36px]"
            >
              {article.categoryName}
            </button>
            <span className="text-stone-300 hidden sm:inline" aria-hidden="true">/</span>
            <span className="text-stone-900 font-medium hidden sm:inline truncate max-w-[220px]">
              {article.title}
            </span>
          </nav>

          <div className="flex items-center gap-2 sm:gap-4 text-stone-500">
            <div className="flex items-center gap-0.5 bg-stone-100/90 px-1.5 py-0.5 border border-stone-200/80">
              <span className="text-[10px] uppercase tracking-wider text-stone-500 mr-1 font-semibold">Type:</span>
              <button
                onClick={() => setFontSize('standard')}
                className={`min-h-[38px] min-w-[36px] px-2 text-xs inline-flex items-center justify-center transition-colors ${fontSize === 'standard' ? 'text-stone-950 font-bold bg-white shadow-xs' : 'hover:text-stone-900 text-stone-600'}`}
                aria-label="Standard font size"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`min-h-[38px] min-w-[36px] px-2 text-sm inline-flex items-center justify-center transition-colors ${fontSize === 'large' ? 'text-stone-950 font-bold bg-white shadow-xs' : 'hover:text-stone-900 text-stone-600'}`}
                aria-label="Large font size"
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('relaxed')}
                className={`min-h-[38px] min-w-[36px] px-2 text-base inline-flex items-center justify-center transition-colors ${fontSize === 'relaxed' ? 'text-stone-950 font-bold bg-white shadow-xs' : 'hover:text-stone-900 text-stone-600'}`}
                aria-label="Relaxed font size"
              >
                A++
              </button>
            </div>

            <button
              onClick={handleBookmark}
              className="inline-flex items-center gap-1.5 hover:text-stone-900 transition-colors min-h-[44px] px-2.5 py-1 text-xs"
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark essay'}
              aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark essay'}
            >
              {isBookmarked ? (
                <BookmarkCheck className="w-4 h-4 text-emerald-800" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
              <span className="hidden sm:inline font-medium">{isBookmarked ? 'Saved' : 'Save'}</span>
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 hover:text-stone-900 transition-colors min-h-[44px] px-2.5 py-1 text-xs"
              title="Copy share link"
              aria-label="Copy share link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-800" /> : <Share2 className="w-4 h-4" />}
              <span className="hidden sm:inline font-medium">{copied ? 'Copied' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* Article Header */}
        <header className="mb-10 text-center sm:text-left">
          <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-medium mb-3">
            <button
              onClick={() => onNavigate(`/category/${article.categorySlug}/`)}
              className="hover:text-stone-900 transition-colors"
            >
              {article.categoryName}
            </button>
            <span aria-hidden="true">·</span>
            <span>Essay {article.number}</span>
            <span aria-hidden="true">·</span>
            <span>{article.issue}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-editorial-serif font-medium text-stone-900 leading-tight mb-4">
            {article.title}
          </h1>

          <p className="text-lg sm:text-xl font-editorial-body text-stone-600 leading-relaxed max-w-3xl mb-6">
            {article.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-700 border-t border-b border-stone-200 py-3">
            <span className="font-semibold text-stone-950">{article.author}</span>
            <span className="text-stone-600">({article.authorRole})</span>
            <span aria-hidden="true" className="text-stone-400">·</span>
            <time dateTime={article.datePublished || '2026-10-12T08:00:00Z'}>{article.date}</time>
            <span aria-hidden="true" className="text-stone-400">·</span>
            <span>{article.readTime}</span>
          </div>
        </header>

        {/* Main Editorial Image */}
        <figure className="mb-10 sm:mb-12 w-full">
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[21/10] max-h-[620px] overflow-hidden bg-stone-900">
            <img
              src={article.image}
              alt={article.imageAlt}
              width="1200"
              height="750"
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover object-center block transition-transform duration-700 ease-out"
              loading="eager"
              referrerPolicy="no-referrer"
            />
          </div>
          <figcaption className="py-2.5 sm:py-3 text-xs font-serif italic text-stone-600 border-b border-stone-200">
            {article.imageAlt} · Maison Edit Archival Documentation.
          </figcaption>
        </figure>

        {/* Curator Note if available */}
        {article.curatorNote && (
          <aside className="my-8 p-4 bg-[#f2eee6] border-l-2 border-stone-900 text-xs text-stone-700 leading-relaxed font-editorial-body">
            <span className="font-semibold uppercase tracking-wider text-stone-900 block mb-1">
              Curator’s Field Note:
            </span>
            {article.curatorNote}
          </aside>
        )}

        {/* Essay Body */}
        <div className={`font-editorial-body text-stone-800 ${fontClass} max-w-none`}>
          {article.sections.map((section, sIdx) => (
            <div key={sIdx} className="mb-10">
              {section.heading && (
                <h2 className="text-2xl font-editorial-serif font-medium text-stone-900 mt-8 mb-4">
                  {section.heading}
                </h2>
              )}
              {section.body.map((para, pIdx) => {
                const isOpeningPara = sIdx === 0 && pIdx === 0;
                return (
                  <p
                    key={pIdx}
                    className={`mb-6 text-stone-700 leading-relaxed ${
                    isOpeningPara ? 'drop-cap' : ''
                    }`}
                  >
                    {para}
                  </p>
                );
              })}
            </div>
          ))}

          {/* Pull quote */}
          {article.pullQuote && (
            <blockquote className="my-12 py-8 border-y border-stone-300 text-center">
              <p className="text-2xl sm:text-3xl font-editorial-serif italic text-stone-900 max-w-2xl mx-auto leading-snug">
                &ldquo;{article.pullQuote.text}&rdquo;
              </p>
              <cite className="block text-xs uppercase tracking-widest text-stone-500 font-sans mt-4 not-italic font-medium">
                {article.pullQuote.attribution}
              </cite>
            </blockquote>
          )}
        </div>

        {/* Clean Metadata Tags & Editorial Keywords */}
        <div className="pt-8 border-t border-stone-200 mt-12 space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
            <span className="uppercase tracking-widest font-medium text-stone-400">Filed under:</span>
            {article.tags.map((tag, i) => (
              <React.Fragment key={tag}>
                <button
                  onClick={() => onNavigate(`/archive/?q=${encodeURIComponent(tag)}`)}
                  className="hover:text-stone-900 transition-colors cursor-pointer"
                >
                  {tag}
                </button>
                {i < article.tags.length - 1 && <span aria-hidden="true">·</span>}
              </React.Fragment>
            ))}
          </div>

          {article.seoKeywords && article.seoKeywords.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-stone-500 pt-1">
              <span className="font-mono uppercase tracking-widest text-stone-400 text-[10px]">Keywords:</span>
              {article.seoKeywords.map((kw, i) => (
                <React.Fragment key={kw}>
                  <button
                    onClick={() => onNavigate(`/archive/?q=${encodeURIComponent(kw)}`)}
                    className="hover:text-stone-900 transition-colors underline decoration-stone-300 underline-offset-2"
                  >
                    {kw}
                  </button>
                  {i < (article.seoKeywords?.length ?? 0) - 1 && <span aria-hidden="true" className="text-stone-300">·</span>}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>

        {/* Related Stories in Department & Topical Network */}
        {(() => {
          let related: typeof ARTICLES = [];
          if (article.relatedSlugs && article.relatedSlugs.length > 0) {
            related = ARTICLES.filter((a) => article.relatedSlugs?.includes(a.slug));
          }
          if (related.length === 0) {
            related = ARTICLES.filter(
              (a) => a.id !== article.id && a.categorySlug === article.categorySlug
            ).slice(0, 3);
          }
          if (related.length < 3) {
            const extra = ARTICLES.filter(
              (a) => a.id !== article.id && !related.some((r) => r.id === a.id)
            ).slice(0, 3 - related.length);
            related = [...related, ...extra];
          }

          return (
            <div className="pt-10 border-t border-stone-200 mt-12">
              <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-stone-700 mb-6 font-semibold flex items-center justify-between">
                <span>Related Inquiries · {article.categoryName}</span>
                <button
                  onClick={() => onNavigate(`/category/${article.categorySlug}/`)}
                  className="hover:text-stone-900 transition-colors underline font-normal lowercase"
                >
                  view department index &rarr;
                </button>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {related.slice(0, 3).map((rel) => (
                  <article
                    key={rel.id}
                    onClick={() => onNavigate(`/journal/${rel.slug}/`)}
                    className="group cursor-pointer flex flex-col justify-between p-3.5 bg-stone-50 border border-stone-200/80 hover:border-stone-900 transition-colors"
                  >
                    <div>
                      <div className="w-full aspect-[16/10] overflow-hidden bg-stone-950 mb-3">
                        <img
                          src={rel.image}
                          alt={rel.imageAlt}
                          width="400"
                          height="250"
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                      <div className="text-[10px] font-mono text-stone-700 uppercase mb-1 font-semibold">
                        {rel.categoryName} · {rel.number}
                      </div>
                      <h3 className="font-editorial-serif text-sm font-medium text-stone-950 group-hover:text-stone-700 line-clamp-2 leading-snug">
                        {rel.title}
                      </h3>
                    </div>
                    <div className="text-[11px] text-stone-600 font-editorial-body pt-3 mt-2 border-t border-stone-200/60 flex items-center justify-between">
                      <span>{rel.readTime}</span>
                      <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          );
        })()}

        {/* Previous / Next Essay Pagination */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-10 border-t border-stone-200 mt-10">
          {prevArticle ? (
            <button
              onClick={() => onNavigate(`/journal/${prevArticle.slug}/`)}
              className="text-left p-4 border border-stone-200 hover:border-stone-900 transition-colors group"
            >
              <div className="text-[11px] uppercase tracking-wider text-stone-400 mb-1 flex items-center gap-1">
                <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                <span>Previous Essay · {prevArticle.number}</span>
              </div>
              <div className="font-editorial-serif font-medium text-stone-900 text-base truncate">
                {prevArticle.title}
              </div>
            </button>
          ) : (
            <div />
          )}

          {nextArticle ? (
            <button
              onClick={() => onNavigate(`/journal/${nextArticle.slug}/`)}
              className="text-right p-4 border border-stone-200 hover:border-stone-900 transition-colors group sm:col-start-2"
            >
              <div className="text-[11px] uppercase tracking-wider text-stone-400 mb-1 flex items-center justify-end gap-1">
                <span>Next Essay · {nextArticle.number}</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="font-editorial-serif font-medium text-stone-900 text-base truncate">
                {nextArticle.title}
              </div>
            </button>
          ) : (
            <div />
          )}
        </div>
      </div>

      {/* Floating Mobile Reading Bar (< 768px) - Positioned safely above MobileBottomNav */}
      <div className="md:hidden fixed bottom-[calc(3.75rem+env(safe-area-inset-bottom,0px))] left-3 right-3 z-30 bg-[#1c1917]/95 backdrop-blur-md text-stone-100 border border-stone-700 px-3 py-1.5 shadow-2xl flex items-center justify-between">
        <button
          onClick={() => onNavigate('/')}
          className="flex items-center gap-1.5 text-xs text-stone-300 hover:text-white min-h-[44px] px-2 py-1 font-medium"
          aria-label="Back to Journal"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Journal</span>
        </button>

        <span className="text-stone-700 font-mono">|</span>

        <button
          onClick={handleBookmark}
          className="flex items-center gap-1.5 text-xs text-stone-300 hover:text-white min-h-[44px] px-2 py-1 font-medium"
          aria-label={isBookmarked ? 'Saved to bookmarks' : 'Save bookmark'}
        >
          {isBookmarked ? (
            <BookmarkCheck className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <Bookmark className="w-3.5 h-3.5" />
          )}
          <span>{isBookmarked ? 'Saved' : 'Save'}</span>
        </button>

        <span className="text-stone-700 font-mono">|</span>

        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 text-xs text-stone-300 hover:text-white min-h-[44px] px-2 py-1 font-medium"
          aria-label="Share story"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Share'}</span>
        </button>

        <span className="text-stone-700 font-mono">|</span>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-xs text-stone-300 hover:text-white min-h-[44px] px-2 py-1 font-medium"
          aria-label="Scroll to top of article"
        >
          &uarr; Top
        </button>
      </div>
    </div>
  );
};

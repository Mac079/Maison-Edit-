import React, { useState, useEffect } from 'react';
import { Article, ARTICLES } from '../data/articles';
import { ArrowLeft, ArrowRight, Share2, Check, Bookmark, BookmarkCheck } from 'lucide-react';

interface ArticleViewProps {
  article: Article;
  onNavigate: (path: string) => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({ article, onNavigate }) => {
  const [fontSize, setFontSize] = useState<'standard' | 'large' | 'relaxed'>('standard');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const bookmarks = JSON.parse(localStorage.getItem('maison_bookmarks') || '[]');
    setIsBookmarked(bookmarks.includes(article.id));
  }, [article.id]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
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
      {/* Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-1 bg-stone-900 z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Navigation Breadcrumb Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-3 sm:pb-4 mb-6 sm:mb-8 text-xs">
          <button
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-1.5 text-stone-600 hover:text-stone-950 transition-colors py-1 min-h-[36px]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to journal</span>
          </button>

          <div className="flex items-center gap-3 sm:gap-4 text-stone-500">
            <div className="flex items-center gap-1 bg-stone-100/80 px-2 py-0.5 border border-stone-200/80">
              <span className="text-[11px] uppercase tracking-wider text-stone-400 mr-0.5">Type:</span>
              <button
                onClick={() => setFontSize('standard')}
                className={`min-h-[32px] px-1.5 text-xs inline-flex items-center ${fontSize === 'standard' ? 'text-stone-950 font-bold' : 'hover:text-stone-900'}`}
                aria-label="Standard font size"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`min-h-[32px] px-1.5 text-sm inline-flex items-center ${fontSize === 'large' ? 'text-stone-950 font-bold' : 'hover:text-stone-900'}`}
                aria-label="Large font size"
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('relaxed')}
                className={`min-h-[32px] px-1.5 text-base inline-flex items-center ${fontSize === 'relaxed' ? 'text-stone-950 font-bold' : 'hover:text-stone-900'}`}
                aria-label="Relaxed font size"
              >
                A++
              </button>
            </div>

            <button
              onClick={handleBookmark}
              className="inline-flex items-center gap-1.5 hover:text-stone-900 transition-colors min-h-[36px] px-2 py-1"
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark essay'}
              aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark essay'}
            >
              {isBookmarked ? (
                <BookmarkCheck className="w-4 h-4 text-emerald-800" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
              <span className="hidden sm:inline">{isBookmarked ? 'Saved' : 'Save'}</span>
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 hover:text-stone-900 transition-colors min-h-[36px] px-2 py-1"
              title="Copy share link"
              aria-label="Copy share link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-800" /> : <Share2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Share'}</span>
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

          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-600 border-t border-b border-stone-200 py-3">
            <span className="font-medium text-stone-900">{article.author}</span>
            <span className="text-stone-400">({article.authorRole})</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>{article.date}</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>{article.readTime}</span>
          </div>
        </header>

        {/* Main Editorial Image */}
        <figure className="mb-10 sm:mb-12 w-full">
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[21/10] max-h-[620px] overflow-hidden bg-stone-900">
            <img
              src={article.image}
              alt={article.imageAlt}
              className="w-full h-full object-cover object-center block transition-transform duration-700 ease-out"
              loading="eager"
              referrerPolicy="no-referrer"
            />
          </div>
          <figcaption className="py-2.5 sm:py-3 text-xs font-serif italic text-stone-500 border-b border-stone-200">
            {article.imageAlt} — Maison Edit Archival Documentation.
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
                — {article.pullQuote.attribution}
              </cite>
            </blockquote>
          )}
        </div>

        {/* Clean Metadata Tags (Zero-Pill discipline) */}
        <div className="pt-8 border-t border-stone-200 mt-12">
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
        </div>

        {/* Related Stories in Department */}
        {(() => {
          const related = ARTICLES.filter(
            (a) => a.id !== article.id && a.categorySlug === article.categorySlug
          ).slice(0, 2);
          const fallbackRelated = related.length > 0 ? related : ARTICLES.filter((a) => a.id !== article.id).slice(0, 2);

          return (
            <div className="pt-10 border-t border-stone-200 mt-12">
              <div className="text-[11px] font-sans uppercase tracking-[0.2em] text-stone-400 mb-6 font-semibold">
                More in {article.categoryName}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {fallbackRelated.map((rel) => (
                  <article
                    key={rel.id}
                    onClick={() => onNavigate(`/journal/${rel.slug}/`)}
                    className="group cursor-pointer flex gap-4 p-3 bg-stone-50 border border-stone-200/80 hover:border-stone-900 transition-colors"
                  >
                    <div className="w-20 h-16 shrink-0 overflow-hidden bg-stone-950">
                      <img
                        src={rel.image}
                        alt={rel.imageAlt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <div className="min-w-0 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-[10px] font-mono text-stone-500 uppercase">
                          {rel.issue}
                        </div>
                        <h4 className="font-editorial-serif text-sm font-medium text-stone-950 group-hover:text-stone-700 line-clamp-2 leading-snug">
                          {rel.title}
                        </h4>
                      </div>
                      <div className="text-[11px] text-stone-400 font-editorial-body pt-1">
                        {rel.readTime}
                      </div>
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

      {/* Floating Mobile Reading Bar (< 768px) */}
      <div className="md:hidden fixed bottom-3 left-4 right-4 z-40 bg-stone-900/95 backdrop-blur-md text-stone-100 border border-stone-700 px-4 py-2 shadow-2xl flex items-center justify-between">
        <button
          onClick={() => onNavigate('/')}
          className="flex items-center gap-1 text-xs text-stone-300 hover:text-white py-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Journal</span>
        </button>

        <span className="text-stone-600">|</span>

        <button
          onClick={handleBookmark}
          className="flex items-center gap-1 text-xs text-stone-300 hover:text-white py-1"
        >
          {isBookmarked ? (
            <BookmarkCheck className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <Bookmark className="w-3.5 h-3.5" />
          )}
          <span>{isBookmarked ? 'Saved' : 'Save'}</span>
        </button>

        <span className="text-stone-600">|</span>

        <button
          onClick={handleShare}
          className="flex items-center gap-1 text-xs text-stone-300 hover:text-white py-1"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Share'}</span>
        </button>

        <span className="text-stone-600">|</span>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-xs text-stone-300 hover:text-white py-1"
        >
          &uarr; Top
        </button>
      </div>
    </div>
  );
};

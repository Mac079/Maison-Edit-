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
        <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-8 text-xs">
          <button
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-1.5 text-stone-600 hover:text-stone-950 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to journal</span>
          </button>

          <div className="flex items-center gap-4 text-stone-500">
            <div className="flex items-center gap-1">
              <span className="text-[11px] uppercase tracking-wider text-stone-400">Type:</span>
              <button
                onClick={() => setFontSize('standard')}
                className={`px-1.5 py-0.5 text-xs ${fontSize === 'standard' ? 'text-stone-950 font-bold' : 'hover:text-stone-900'}`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-1.5 py-0.5 text-sm ${fontSize === 'large' ? 'text-stone-950 font-bold' : 'hover:text-stone-900'}`}
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('relaxed')}
                className={`px-1.5 py-0.5 text-base ${fontSize === 'relaxed' ? 'text-stone-950 font-bold' : 'hover:text-stone-900'}`}
              >
                A++
              </button>
            </div>

            <button
              onClick={handleBookmark}
              className="inline-flex items-center gap-1 hover:text-stone-900 transition-colors"
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark essay'}
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
              className="inline-flex items-center gap-1 hover:text-stone-900 transition-colors"
              title="Copy share link"
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
        <figure className="mb-12 bg-stone-200">
          <div className="overflow-hidden aspect-4/3 max-h-[540px]">
            <img
              src={article.image}
              alt={article.imageAlt}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
          <figcaption className="p-3 text-xs font-serif italic text-stone-500 bg-[#f7f5f0] border-b border-stone-200">
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

        {/* Previous / Next Essay Pagination */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-12 border-t border-stone-200 mt-10">
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
    </div>
  );
};

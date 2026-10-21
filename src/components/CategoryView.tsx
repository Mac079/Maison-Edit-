import React, { useState, useEffect } from 'react';
import { Category, ARTICLES } from '../data/articles';
import { ArrowLeft, ArrowRight, ArrowUpRight, Bookmark, BookmarkCheck } from 'lucide-react';

interface CategoryViewProps {
  category: Category;
  onNavigate: (path: string) => void;
}

export const CategoryView: React.FC<CategoryViewProps> = ({ category, onNavigate }) => {
  const categoryArticles = ARTICLES.filter((a) => a.categorySlug === category.slug);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('maison_bookmarks') || '[]');
      setBookmarkedIds(saved);
    } catch {
      setBookmarkedIds([]);
    }
  }, []);

  const toggleBookmark = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    let updated: string[];
    if (bookmarkedIds.includes(id)) {
      updated = bookmarkedIds.filter((item) => item !== id);
    } else {
      updated = [...bookmarkedIds, id];
    }
    setBookmarkedIds(updated);
    localStorage.setItem('maison_bookmarks', JSON.stringify(updated));
  };

  const leadStory = categoryArticles[0];
  const remainingStories = categoryArticles.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb Navigation */}
      <div className="border-b border-stone-200 pb-3 mb-6 sm:mb-8 text-xs flex items-center justify-between">
        <nav aria-label="Breadcrumb" className="inline-flex items-center gap-1.5 text-stone-600">
          <button
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-1 hover:text-stone-950 transition-colors py-1 min-h-[36px]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Journal</span>
          </button>
          <span className="text-stone-300" aria-hidden="true">/</span>
          <span className="text-stone-900 font-medium">{category.name}</span>
        </nav>
        <span className="font-mono text-stone-500 uppercase tracking-widest text-[11px]">
          {categoryArticles.length} {categoryArticles.length === 1 ? 'Essay' : 'Essays'} in Vol. XIV
        </span>
      </div>

      {/* Vogue Department Banner */}
      <div className="border-b border-stone-900 pb-8 mb-10 sm:mb-12">
        <div className="text-[11px] font-sans uppercase tracking-[0.2em] text-stone-700 font-semibold mb-2">
          Department · {category.issueScope}
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-editorial-serif font-medium text-stone-950 mb-4 tracking-tight">
          {category.name}
        </h1>
        <p className="text-base sm:text-lg text-stone-700 max-w-2xl font-editorial-body leading-relaxed mb-6">
          {category.description}
        </p>

        {/* Department Keyword Topics */}
        {category.keywords && category.keywords.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-stone-200/80 text-xs text-stone-700">
            <span className="font-mono uppercase tracking-widest text-stone-800 text-[10px] font-semibold">Department Topics:</span>
            {category.keywords.map((kw, i) => (
              <React.Fragment key={kw}>
                <button
                  onClick={() => onNavigate(`/archive/?q=${encodeURIComponent(kw)}`)}
                  className="hover:text-stone-950 transition-colors underline decoration-stone-400 underline-offset-2 min-h-[32px] py-1"
                >
                  {kw}
                </button>
                {i < (category.keywords?.length ?? 0) - 1 && <span aria-hidden="true" className="text-stone-400">·</span>}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {categoryArticles.length === 0 ? (
        <div className="py-16 text-center text-stone-600 font-editorial-body">
          No articles filed under this department in this edition.
        </div>
      ) : (
        <div className="space-y-12 sm:space-y-16">
          {/* Department Lead Story (Vogue Lead Layout) */}
          {leadStory && (
            <article
              onClick={() => onNavigate(`/journal/${leadStory.slug}/`)}
              className="group cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 border-b border-stone-200 pb-10 sm:pb-14 items-stretch"
            >
              <div className="lg:col-span-8 overflow-hidden bg-stone-950 relative w-full aspect-[4/3] sm:aspect-[16/10]">
                <img
                  src={leadStory.image}
                  alt={leadStory.imageAlt}
                  width="1200"
                  height="750"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-stone-950/85 text-stone-100 text-[10px] uppercase tracking-widest px-2.5 py-1 font-mono">
                  Department Lead · {leadStory.number}
                </div>
                <button
                  onClick={(e) => toggleBookmark(e, leadStory.id)}
                  className="absolute top-3 right-3 min-w-[44px] min-h-[44px] flex items-center justify-center bg-stone-950/80 hover:bg-stone-950 text-stone-200 transition-colors"
                  aria-label={`Save story: ${leadStory.title}`}
                >
                  {bookmarkedIds.includes(leadStory.id) ? (
                    <BookmarkCheck className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                </button>
              </div>

              <div className="lg:col-span-4 flex flex-col justify-between py-1">
                <div className="space-y-3">
                  <div className="text-xs uppercase tracking-widest text-stone-700 font-mono font-semibold">
                    {leadStory.issue}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-editorial-serif font-medium text-stone-950 group-hover:text-stone-700 transition-colors leading-tight">
                    {leadStory.title}
                  </h2>
                  <p className="text-stone-700 font-editorial-body text-sm sm:text-base leading-relaxed">
                    {leadStory.subtitle}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600 mt-4">
                  <div>
                    <span className="text-stone-950 font-semibold">{leadStory.author}</span>
                    <span className="mx-1.5">·</span>
                    <span>{leadStory.readTime}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-stone-950 font-semibold group-hover:translate-x-1 transition-transform">
                    Read Essay <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          )}

          {/* Remaining Stories in 2-column or 3-column Magazine Flow */}
          {remainingStories.length > 0 && (
            <div>
              <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-stone-700 mb-6 font-semibold">
                More in {category.shortName}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
                {remainingStories.map((art) => (
                  <article
                    key={art.id}
                    onClick={() => onNavigate(`/journal/${art.slug}/`)}
                    className="group cursor-pointer flex flex-col justify-between border-b border-stone-200 pb-8"
                  >
                    <div>
                      <div className="overflow-hidden bg-stone-950 mb-4 aspect-[16/10] w-full relative">
                        <img
                          src={art.image}
                          alt={art.imageAlt}
                          width="600"
                          height="375"
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-2.5 left-2.5 bg-stone-950/80 text-stone-100 text-[10px] uppercase tracking-wider px-2 py-0.5 font-mono">
                          {art.number}
                        </div>
                        <button
                          onClick={(e) => toggleBookmark(e, art.id)}
                          className="absolute top-2.5 right-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center bg-stone-950/80 hover:bg-stone-950 text-stone-200 transition-colors"
                          aria-label={`Save story: ${art.title}`}
                        >
                          {bookmarkedIds.includes(art.id) ? (
                            <BookmarkCheck className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Bookmark className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>

                      <div className="text-[11px] uppercase tracking-wider text-stone-700 font-mono mb-1 font-semibold">
                        {art.issue}
                      </div>

                      <h3 className="text-xl sm:text-2xl font-editorial-serif font-medium text-stone-950 group-hover:text-stone-700 transition-colors leading-snug mb-2">
                        {art.title}
                      </h3>

                      <p className="text-stone-700 text-xs sm:text-sm font-editorial-body leading-relaxed mb-4 line-clamp-3">
                        {art.subtitle}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600">
                      <div>
                        <span className="font-semibold text-stone-900">{art.author}</span>
                        <span className="mx-1.5">·</span>
                        <span>{art.readTime}</span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-stone-600 group-hover:text-stone-950 transition-colors" />
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { ARTICLES, CATEGORIES } from '../data/articles';
import { ArrowLeft, Search, Compass, BookOpen, Layers, Bookmark, ArrowRight, ShieldCheck } from 'lucide-react';

interface NotFoundViewProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenDiagnostics: () => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({
  currentPath,
  onNavigate,
  onOpenDiagnostics,
}) => {
  const [query, setQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onNavigate(`/archive/?q=${encodeURIComponent(query.trim())}`);
  };

  const handleLinkClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      {/* Editorial Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-200/80 text-stone-700 text-xs uppercase tracking-widest font-mono mb-6">
          <span>HTTP 404 · Unresolved Destination</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-editorial-serif font-medium text-stone-900 mb-4 tracking-tight">
          Page Not Located
        </h1>

        <p className="text-base sm:text-lg text-stone-600 font-editorial-body leading-relaxed mb-6">
          We could not locate <code className="bg-stone-200/70 px-2 py-0.5 text-stone-900 font-mono text-sm">{currentPath}</code> in Volume XIV. The story may have moved, been retitled, or filed under a different department.
        </p>

        {/* Quick Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative max-w-md mx-auto mb-8">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search our essays, artisans, and archives..."
            className="w-full pl-10 pr-24 py-2.5 text-sm bg-white border border-stone-300 focus:outline-hidden focus:border-stone-900 text-stone-900 placeholder:text-stone-400 min-h-[42px]"
          />
          <button
            type="submit"
            className="absolute right-1 top-1 bottom-1 px-3 text-xs bg-stone-900 text-stone-100 hover:bg-stone-800 transition-colors uppercase tracking-wider font-mono"
          >
            Search
          </button>
        </form>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 text-stone-100 hover:bg-stone-800 transition-colors text-xs uppercase tracking-wider font-mono"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Home Journal</span>
          </a>

          <a
            href="/archive/"
            onClick={(e) => handleLinkClick(e, '/archive/')}
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-stone-300 hover:border-stone-900 bg-white text-stone-800 transition-colors text-xs uppercase tracking-wider font-mono"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Browse Full Archive</span>
          </a>
        </div>
      </div>

      {/* Main Pages Directory */}
      <div className="border-t border-stone-300 pt-12 mb-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <h2 className="text-xs uppercase tracking-widest text-stone-700 font-mono font-semibold">
            Main Editorial Departments
          </h2>
          <span className="text-xs text-stone-600 font-editorial-body">
            Five departments covering heritage, craft, runway, and culture
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map((cat) => (
            <a
              key={cat.slug}
              href={`/category/${cat.slug}/`}
              onClick={(e) => handleLinkClick(e, `/category/${cat.slug}/`)}
              className="p-5 bg-white border border-stone-200/90 hover:border-stone-900 transition-colors group flex flex-col justify-between"
            >
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-stone-700 font-semibold mb-1">
                  Department · {cat.shortName}
                </div>
                <h3 className="font-editorial-serif text-lg font-medium text-stone-950 group-hover:text-stone-700 transition-colors mb-2">
                  {cat.name}
                </h3>
                <p className="text-xs text-stone-700 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>
              <div className="pt-4 mt-3 border-t border-stone-100 flex items-center justify-between text-xs font-mono text-stone-600 group-hover:text-stone-900">
                <span>Explore Department</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          ))}

          {/* Quick Core Section Card */}
          <a
            href="/archive/?saved=true"
            onClick={(e) => handleLinkClick(e, '/archive/?saved=true')}
            className="p-5 bg-[#f4f1ea] border border-stone-300/80 hover:border-stone-900 transition-colors group flex flex-col justify-between"
          >
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-stone-700 font-semibold mb-1 flex items-center gap-1.5">
                <Bookmark className="w-3 h-3 text-stone-800" />
                <span>Reading List</span>
              </div>
              <h3 className="font-editorial-serif text-lg font-medium text-stone-950 group-hover:text-stone-700 transition-colors mb-2">
                Saved Articles
              </h3>
              <p className="text-xs text-stone-700 leading-relaxed">
                Access your bookmarked investigations, reading notes, and offline reading list.
              </p>
            </div>
            <div className="pt-4 mt-3 border-t border-stone-200 flex items-center justify-between text-xs font-mono text-stone-700 group-hover:text-stone-900">
              <span>View Bookmarks</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>
        </div>
      </div>

      {/* Featured Articles Recommended Reading */}
      <div className="border-t border-stone-300 pt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xs uppercase tracking-widest text-stone-700 font-mono font-semibold">
            Recommended Reading from Volume XIV
          </h2>
          <a
            href="/archive/"
            onClick={(e) => handleLinkClick(e, '/archive/')}
            className="text-xs font-mono text-stone-700 hover:text-stone-900 underline underline-offset-4 font-semibold"
          >
            View all 10 essays &rarr;
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ARTICLES.slice(0, 4).map((art) => (
            <a
              key={art.id}
              href={`/journal/${art.slug}/`}
              onClick={(e) => handleLinkClick(e, `/journal/${art.slug}/`)}
              className="group bg-white border border-stone-200 p-3 hover:border-stone-900 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[16/10] overflow-hidden bg-stone-950 mb-3">
                  <img
                    src={art.image}
                    alt={art.imageAlt}
                    width="400"
                    height="250"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="text-[10px] font-mono text-stone-700 font-semibold uppercase mb-1">
                  {art.categoryName} · {art.number}
                </div>
                <h3 className="font-editorial-serif text-sm font-medium text-stone-950 group-hover:text-stone-700 line-clamp-2 leading-snug">
                  {art.title}
                </h3>
              </div>
              <div className="text-[11px] text-stone-600 font-editorial-body pt-3 mt-2 border-t border-stone-100 flex items-center justify-between">
                <span>{art.readTime}</span>
                <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Auxiliary diagnostics link */}
      <div className="mt-14 pt-6 border-t border-stone-200 text-center">
        <button
          onClick={onOpenDiagnostics}
          className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-800 transition-colors font-mono"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
          <span>System Diagnostic Check · Inspect Site Health &amp; Routes</span>
        </button>
      </div>
    </div>
  );
};

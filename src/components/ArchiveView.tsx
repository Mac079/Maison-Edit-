import React, { useState, useMemo } from 'react';
import { ARTICLES, CATEGORIES, Article } from '../data/articles';
import { Search, ArrowLeft, ArrowUpRight, X, BookmarkCheck } from 'lucide-react';

interface ArchiveViewProps {
  onNavigate: (path: string) => void;
  initialQuery?: string;
  initialSaved?: boolean;
}

export const ArchiveView: React.FC<ArchiveViewProps> = ({
  onNavigate,
  initialQuery = '',
  initialSaved = false,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'number' | 'title' | 'readTime'>('number');
  const [onlySaved, setOnlySaved] = useState(initialSaved);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  React.useEffect(() => {
    if (initialQuery) {
      setSearchQuery(initialQuery);
    }
  }, [initialQuery]);

  React.useEffect(() => {
    if (initialSaved) {
      setOnlySaved(true);
    }
  }, [initialSaved]);

  const savedIds = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('maison_bookmarks') || '[]');
    } catch {
      return [];
    }
  }, []);

  const filteredArticles = useMemo(() => {
    return ARTICLES.filter((article) => {
      if (onlySaved && !savedIds.includes(article.id)) {
        return false;
      }
      if (selectedCategory !== 'all' && article.categorySlug !== selectedCategory) {
        return false;
      }
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const inTitle = article.title.toLowerCase().includes(q);
      const inSubtitle = article.subtitle.toLowerCase().includes(q);
      const inAuthor = article.author.toLowerCase().includes(q);
      const inTags = article.tags.some((t) => t.toLowerCase().includes(q));
      const inKeywords = (article.seoKeywords || []).some((k) => k.toLowerCase().includes(q));
      const inBody = article.sections.some((s) =>
        s.body.some((p) => p.toLowerCase().includes(q))
      );

      return inTitle || inSubtitle || inAuthor || inTags || inKeywords || inBody;
    }).sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'readTime') {
        return parseInt(a.readTime) - parseInt(b.readTime);
      }
      return parseInt(a.id) - parseInt(b.id);
    });
  }, [searchQuery, selectedCategory, sortBy, onlySaved, savedIds]);

  const popularKeywords = [
    'Quiet Luxury',
    'Italian Tailoring',
    'Saddle Stitch',
    'Paris Runway',
    'Heritage Codes',
    'Red Carpet',
    'Vintage Couture',
    'Biomaterials',
    'High Horology',
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-28 sm:pt-12 sm:pb-16">
      {/* Breadcrumb */}
      <div className="border-b border-stone-200 pb-4 mb-8 text-xs">
        <nav aria-label="Breadcrumb" className="inline-flex items-center gap-1.5 text-stone-600">
          <button
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-1.5 hover:text-stone-950 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to journal</span>
          </button>
          <span className="text-stone-300" aria-hidden="true">/</span>
          <span className="text-stone-900 font-medium">Article Archive</span>
        </nav>
      </div>

      {/* Header */}
      <div className="border-b border-stone-200 pb-8 mb-8">
        <div className="text-xs uppercase tracking-widest text-stone-700 font-semibold mb-1">
          Complete Issue Index · Vol. XIV
        </div>
        <h1 className="text-3xl sm:text-5xl font-editorial-serif font-medium text-stone-900 mb-3">
          The Article Archive
        </h1>
        <p className="text-stone-700 text-sm sm:text-base max-w-2xl font-editorial-body">
          Explore all essays, curatorial critiques, and investigative field notes across our five editorial departments.
        </p>
      </div>

      {/* Search and Filters Toolbar */}
      <div className="space-y-4 mb-10">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-600" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search essays by title, artisan, craft, or keyword..."
              aria-label="Search essays by title, artisan, craft, or keyword"
              className="w-full pl-10 pr-9 py-2.5 text-sm bg-white border border-stone-300 focus:outline-hidden focus:border-stone-900 text-stone-900 placeholder:text-stone-500 min-h-[44px]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-600 hover:text-stone-900 p-2 min-h-[36px] min-w-[36px] flex items-center justify-center"
                aria-label="Clear search query"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center justify-between sm:justify-start gap-2 w-full sm:w-auto">
            <span className="text-xs text-stone-700 uppercase tracking-wider font-semibold shrink-0">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              aria-label="Sort articles by"
              className="flex-1 sm:flex-initial px-3 py-2.5 text-xs bg-white border border-stone-300 focus:outline-hidden focus:border-stone-900 text-stone-900 min-h-[44px]"
            >
              <option value="number">Issue Sequence (01-10)</option>
              <option value="title">Title (A-Z)</option>
              <option value="readTime">Read Time (Shortest first)</option>
            </select>
          </div>
        </div>

        {/* Curated Editorial Keyword Chips */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-stone-700">
          <span className="font-mono text-[10px] uppercase tracking-widest text-stone-800 font-semibold mr-1">Curated Inquiries:</span>
          {popularKeywords.map((kw) => {
            const isActive = searchQuery.toLowerCase() === kw.toLowerCase();
            return (
              <button
                key={kw}
                onClick={() => setSearchQuery(isActive ? '' : kw)}
                className={`px-3 py-1.5 min-h-[38px] inline-flex items-center text-xs border transition-colors ${
                  isActive
                    ? 'bg-stone-900 text-white border-stone-900 font-medium'
                    : 'bg-white text-stone-700 border-stone-300 hover:border-stone-800 hover:bg-stone-50'
                }`}
              >
                {kw}
              </button>
            );
          })}
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-200/60">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-2 text-xs font-semibold transition-colors min-h-[44px] flex items-center ${
              selectedCategory === 'all'
                ? 'bg-stone-900 text-stone-50 shadow-xs'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            All Departments ({ARTICLES.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = ARTICLES.filter((a) => a.categorySlug === cat.slug).length;
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3.5 py-2 text-xs font-semibold transition-colors min-h-[44px] flex items-center ${
                  isSelected
                    ? 'bg-stone-900 text-stone-50 shadow-xs'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                {cat.shortName} ({count})
              </button>
            );
          })}
          {savedIds.length > 0 && (
            <button
              onClick={() => setOnlySaved(!onlySaved)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold transition-colors min-h-[44px] ${
                onlySaved
                  ? 'bg-emerald-900 text-white shadow-xs'
                  : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-200'
              }`}
            >
              <BookmarkCheck className="w-4 h-4 text-emerald-400" />
              <span>Saved Reading List ({savedIds.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* View Mode & Results Count */}
      <div className="text-xs text-stone-600 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span>Showing {filteredArticles.length} of {ARTICLES.length} stories</span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-stone-900 font-semibold underline underline-offset-2 ml-2 min-h-[36px] inline-flex items-center"
            >
              Clear search
            </button>
          )}
        </div>

        {/* View Mode Toggle: Grid vs List */}
        <div className="flex items-center gap-1 bg-stone-100 p-1 border border-stone-200 self-start sm:self-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1.5 min-h-[38px] text-xs font-semibold transition-colors inline-flex items-center ${
              viewMode === 'grid'
                ? 'bg-stone-900 text-stone-50 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
            title="Archival Grid View"
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1.5 min-h-[38px] text-xs font-semibold transition-colors inline-flex items-center ${
              viewMode === 'list'
                ? 'bg-stone-900 text-stone-50 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
            title="Editorial List View"
          >
            List
          </button>
        </div>
      </div>

      {/* Articles Display */}
      {filteredArticles.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-stone-300 p-8">
          <p className="text-stone-600 font-editorial-serif text-lg mb-2">
            No matching stories found.
          </p>
          <p className="text-xs text-stone-500 mb-4">
            Try adjusting your search terms or clearing the selected department filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setOnlySaved(false);
            }}
            className="px-4 py-2 text-xs bg-stone-900 text-stone-100 hover:bg-stone-800 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* Grid Layout: Stacks to 1 column on screens < 768px, 2-col on sm/md, 3-col on lg */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => onNavigate(`/journal/${article.slug}/`)}
              className="group cursor-pointer flex flex-col justify-between border-b border-stone-200 pb-6 sm:pb-8"
            >
              <div>
                <div className="overflow-hidden bg-stone-900 mb-4 aspect-[4/3] w-full relative">
                  <img
                    src={article.image}
                    alt={article.imageAlt}
                    width="600"
                    height="450"
                    decoding="async"
                    className="w-full h-full object-cover object-center block transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-stone-900/80 text-stone-100 text-[10px] uppercase tracking-wider px-2 py-0.5 font-mono">
                    {article.number}
                  </div>
                </div>

                <div className="text-xs uppercase tracking-widest text-stone-700 font-semibold mb-1.5">
                  {article.categoryName} · {article.issue}
                </div>

                <h2 className="text-lg sm:text-xl font-editorial-serif font-medium text-stone-900 group-hover:text-stone-700 transition-colors leading-snug mb-2">
                  {article.title}
                </h2>

                <p className="text-stone-700 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2 font-editorial-body">
                  {article.subtitle}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600">
                <div>
                  <span className="font-semibold text-stone-950">{article.author}</span>
                  <span className="mx-1.5">·</span>
                  <span>{article.readTime}</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-stone-600 group-hover:text-stone-950 transition-colors" />
              </div>
            </article>
          ))}
        </div>
      ) : (
        /* List Layout: Stacks image above text on screens < 768px, inline beside text on desktop (>= md) */
        <div className="border-t border-stone-300 divide-y divide-stone-200">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => onNavigate(`/journal/${article.slug}/`)}
              className="group cursor-pointer py-6 sm:py-7 flex flex-col md:flex-row md:items-center justify-between hover:bg-stone-50/80 px-3 -mx-3 transition-colors gap-4 sm:gap-6"
            >
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 min-w-0 flex-1">
                {/* Responsive Image: Full width on < 768px mobile, compact beside text on md+ */}
                <div className="w-full sm:w-44 md:w-48 aspect-[16/9] sm:aspect-[4/3] shrink-0 overflow-hidden bg-stone-900 relative">
                  <img
                    src={article.image}
                    alt={article.imageAlt}
                    width="400"
                    height="300"
                    decoding="async"
                    className="w-full h-full object-cover object-center block group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 bg-stone-900/80 text-stone-100 text-[10px] uppercase tracking-wider px-1.5 py-0.5 font-mono">
                    {article.number}
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="text-[11px] uppercase tracking-wider text-stone-700 font-semibold mb-1">
                    {article.categoryName} · {article.issue}
                  </div>
                  <h2 className="text-lg sm:text-xl font-editorial-serif font-medium text-stone-900 group-hover:text-stone-700 transition-colors leading-snug">
                    {article.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-700 mt-1 line-clamp-2 font-editorial-body">
                    {article.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6 text-xs text-stone-600 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-stone-100">
                <div className="text-left md:text-right">
                  <div className="text-stone-950 font-semibold">{article.author}</div>
                  <div className="text-stone-600">{article.readTime}</div>
                </div>
                <div className="w-8 h-8 rounded-full border border-stone-300 group-hover:border-stone-900 flex items-center justify-center text-stone-600 group-hover:text-stone-900 transition-colors shrink-0">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

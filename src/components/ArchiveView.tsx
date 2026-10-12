import React, { useState, useMemo } from 'react';
import { ARTICLES, CATEGORIES, Article } from '../data/articles';
import { Search, ArrowLeft, ArrowUpRight, X, BookmarkCheck } from 'lucide-react';

interface ArchiveViewProps {
  onNavigate: (path: string) => void;
}

export const ArchiveView: React.FC<ArchiveViewProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'number' | 'title' | 'readTime'>('number');
  const [onlySaved, setOnlySaved] = useState(false);

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
      const inBody = article.sections.some((s) =>
        s.body.some((p) => p.toLowerCase().includes(q))
      );

      return inTitle || inSubtitle || inAuthor || inTags || inBody;
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <div className="border-b border-stone-200 pb-4 mb-8 text-xs">
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-1.5 text-stone-600 hover:text-stone-950 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to journal</span>
        </button>
      </div>

      {/* Header */}
      <div className="border-b border-stone-200 pb-8 mb-8">
        <div className="text-xs uppercase tracking-widest text-stone-500 font-medium mb-1">
          Complete Issue Index · Vol. XIV
        </div>
        <h1 className="text-3xl sm:text-5xl font-editorial-serif font-medium text-stone-900 mb-3">
          The Article Archive
        </h1>
        <p className="text-stone-600 text-sm sm:text-base max-w-2xl font-editorial-body">
          Explore all essays, curatorial critiques, and investigative field notes across our five editorial departments.
        </p>
      </div>

      {/* Search and Filters Toolbar */}
      <div className="space-y-4 mb-10">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search essays by title, artisan, craft, or keyword..."
              className="w-full pl-10 pr-9 py-2.5 text-sm bg-white border border-stone-300 focus:outline-hidden focus:border-stone-900 text-stone-900 placeholder:text-stone-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-900"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500 uppercase tracking-wider shrink-0">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2.5 text-xs bg-white border border-stone-300 focus:outline-hidden focus:border-stone-900 text-stone-900"
            >
              <option value="number">Issue Sequence (01-10)</option>
              <option value="title">Title (A-Z)</option>
              <option value="readTime">Read Time (Shortest first)</option>
            </select>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-200/60">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 text-xs font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-stone-900 text-stone-50'
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
                className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                  isSelected
                    ? 'bg-stone-900 text-stone-50'
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
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors ${
                onlySaved
                  ? 'bg-emerald-900 text-white'
                  : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-200'
              }`}
            >
              <BookmarkCheck className="w-3.5 h-3.5" />
              <span>Saved Reading List ({savedIds.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="text-xs text-stone-500 mb-6 flex items-center justify-between">
        <span>Showing {filteredArticles.length} of {ARTICLES.length} stories</span>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-stone-700 hover:underline"
          >
            Clear search query
          </button>
        )}
      </div>

      {/* Articles Table / List */}
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
      ) : (
        <div className="border-t border-stone-300 divide-y divide-stone-200">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => onNavigate(`/journal/${article.slug}/`)}
              className="group cursor-pointer py-6 sm:py-7 flex flex-col md:flex-row md:items-center justify-between hover:bg-stone-50/80 px-3 -mx-3 transition-colors gap-4"
            >
              <div className="flex items-start gap-4 sm:gap-6 min-w-0">
                <span className="font-mono text-xs text-stone-400 pt-1 shrink-0">
                  {article.number}
                </span>

                <div className="min-w-0">
                  <div className="text-[11px] uppercase tracking-wider text-stone-500 mb-1">
                    {article.categoryName} · {article.issue}
                  </div>
                  <h2 className="text-lg sm:text-xl font-editorial-serif font-medium text-stone-900 group-hover:text-stone-700 transition-colors leading-snug">
                    {article.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1 line-clamp-2 font-editorial-body">
                    {article.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6 text-xs text-stone-500 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-stone-100">
                <div className="text-left md:text-right">
                  <div className="text-stone-900 font-medium">{article.author}</div>
                  <div className="text-stone-400">{article.readTime}</div>
                </div>
                <div className="w-8 h-8 rounded-full border border-stone-200 group-hover:border-stone-900 flex items-center justify-center text-stone-400 group-hover:text-stone-900 transition-colors shrink-0">
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

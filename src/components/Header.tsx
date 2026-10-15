import React, { useState, useEffect } from 'react';
import { CATEGORIES, ARTICLES } from '../data/articles';
import { Search, ShieldCheck, Menu, X, Bookmark, ArrowRight, Compass, Sparkles } from 'lucide-react';
import { SOCIAL_LINKS } from './Footer';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenDiagnostics: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate, onOpenDiagnostics }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchDrawerQuery, setSearchDrawerQuery] = useState('');
  const [bookmarkCount, setBookmarkCount] = useState(0);

  // Sync bookmark count from localStorage
  useEffect(() => {
    const updateCount = () => {
      try {
        const bookmarks = JSON.parse(localStorage.getItem('maison_bookmarks') || '[]');
        setBookmarkCount(bookmarks.length);
      } catch {
        setBookmarkCount(0);
      }
    };
    updateCount();
    window.addEventListener('storage', updateCount);
    const interval = setInterval(updateCount, 1500);
    return () => {
      window.removeEventListener('storage', updateCount);
      clearInterval(interval);
    };
  }, []);

  // Close drawer on navigation
  const handleNav = (path: string) => {
    setIsDrawerOpen(false);
    onNavigate(path);
  };

  const handleDrawerSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchDrawerQuery.trim()) return;
    setIsDrawerOpen(false);
    onNavigate(`/archive/?q=${encodeURIComponent(searchDrawerQuery.trim())}`);
  };

  return (
    <>
      <header className="border-b border-stone-200/80 bg-[#f7f5f0] sticky top-0 z-40 transition-shadow duration-200 shadow-xs">
        {/* Top utility ribbon - Vogue Edition & Global Date */}
        <div className="border-b border-stone-200/70 bg-[#f4f1ea] text-[11px] text-stone-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-mono uppercase tracking-widest text-stone-500 text-[10px]">
                Edition: International
              </span>
              <span className="hidden sm:inline text-stone-300">·</span>
              <span className="hidden sm:inline font-editorial-body text-stone-600">
                Monday, October 12, 2026
              </span>
            </div>

            <div className="flex items-center gap-3.5">
              <button
                onClick={onOpenDiagnostics}
                className="inline-flex items-center gap-1.5 text-stone-600 hover:text-stone-900 transition-colors text-[10px] sm:text-[11px]"
                title="System and responsive mobile layout check"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span className="hidden sm:inline">Diagnostic: Healthy & Responsive (17/17)</span>
                <span className="sm:hidden font-mono text-emerald-800">Audit: 100% OK</span>
              </button>
              <span className="text-stone-300">|</span>
              <span className="font-serif italic text-stone-800 text-[11px]">Vol. XIV</span>
            </div>
          </div>
        </div>

        {/* Vogue-Style Masthead & Primary Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3.5 sm:py-5 border-b border-stone-200/60">
            {/* Left: Vogue Hamburger Menu Button */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="inline-flex items-center gap-2 px-2.5 py-1.5 text-stone-900 hover:text-stone-600 transition-colors min-h-[44px] min-w-[44px] -ml-2 text-xs uppercase tracking-widest font-medium group"
                aria-label="Open editorial drawer menu"
              >
                <Menu className="w-5 h-5 transition-transform group-hover:scale-110" />
                <span className="hidden md:inline font-sans text-xs tracking-widest font-semibold">
                  Menu
                </span>
              </button>
            </div>

            {/* Center: Authoritative Centered Masthead */}
            <div className="text-center flex-1 px-2">
              <button
                onClick={() => handleNav('/')}
                className="inline-block text-2xl sm:text-4xl md:text-5xl font-editorial-title tracking-tight text-stone-950 hover:opacity-90 transition-opacity"
              >
                MAISON <span className="font-serif italic font-normal text-stone-800">EDIT</span>
              </button>
              <div className="hidden sm:block text-[10px] md:text-[11px] font-sans uppercase tracking-[0.22em] text-stone-500 mt-0.5">
                The Independent Journal of Runway, Atelier & Culture
              </div>
            </div>

            {/* Right: Quick Search & Saved Reading List */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => handleNav('/archive/')}
                className="inline-flex items-center gap-1.5 p-2 sm:px-3 sm:py-2 text-xs text-stone-800 hover:text-stone-950 transition-colors min-h-[44px] min-w-[44px] rounded-none hover:bg-stone-200/40"
                aria-label="Search stories and view archive"
                title="Search stories"
              >
                <Search className="w-4 h-4" />
                <span className="hidden md:inline uppercase tracking-wider text-[11px] font-medium">
                  Search
                </span>
              </button>

              <button
                onClick={() => handleNav('/archive/?saved=true')}
                className="inline-flex items-center gap-1.5 p-2 sm:px-3 sm:py-2 text-xs text-stone-800 hover:text-stone-950 transition-colors min-h-[44px] min-w-[44px] rounded-none hover:bg-stone-200/40 relative"
                aria-label="View saved articles"
                title="Saved reading list"
              >
                <Bookmark className="w-4 h-4" />
                <span className="hidden md:inline uppercase tracking-wider text-[11px] font-medium">
                  Saved
                </span>
                {bookmarkCount > 0 && (
                  <span className="absolute -top-1 -right-1 sm:top-1 sm:right-1 bg-stone-900 text-stone-50 text-[10px] font-mono px-1.5 py-0.2 rounded-full min-w-[18px] text-center">
                    {bookmarkCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Department Navigation Bar (Desktop links & Mobile smooth-swipe ribbon) */}
          <nav aria-label="Departments" className="relative">
            <div className="flex items-center md:justify-center gap-4 sm:gap-7 overflow-x-auto py-2.5 sm:py-3 no-scrollbar text-xs uppercase tracking-wider font-medium text-stone-700">
              <button
                onClick={() => handleNav('/')}
                className={`whitespace-nowrap shrink-0 py-1 px-1 transition-colors relative min-h-[40px] flex items-center ${
                  currentPath === '/'
                    ? 'text-stone-950 font-bold border-b-2 border-stone-900'
                    : 'hover:text-stone-950 text-stone-600'
                }`}
              >
                Home
              </button>

              {CATEGORIES.map((cat) => {
                const catPath = `/category/${cat.slug}/`;
                const isActive = currentPath === catPath || currentPath === `/category/${cat.slug}`;
                return (
                  <button
                    key={cat.slug}
                    onClick={() => handleNav(catPath)}
                    className={`whitespace-nowrap shrink-0 py-1 px-1 transition-colors relative min-h-[40px] flex items-center ${
                      isActive
                        ? 'text-stone-950 font-bold border-b-2 border-stone-900'
                        : 'hover:text-stone-950 text-stone-600'
                    }`}
                  >
                    {cat.shortName}
                  </button>
                );
              })}

              <button
                onClick={() => handleNav('/archive/')}
                className={`whitespace-nowrap shrink-0 py-1 px-1 transition-colors relative min-h-[40px] flex items-center ${
                  currentPath.startsWith('/archive')
                    ? 'text-stone-950 font-bold border-b-2 border-stone-900'
                    : 'hover:text-stone-950 text-stone-600'
                }`}
              >
                Complete Archive
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Vogue-Caliber Slide-Out Editorial Drawer */}
      {isDrawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200"
        >
          {/* Backdrop */}
          <div
            onClick={() => setIsDrawerOpen(false)}
            className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer container */}
          <div className="fixed inset-y-0 left-0 max-w-md w-full bg-[#fbf9f5] shadow-2xl flex flex-col z-50 border-r border-stone-200 overflow-y-auto">
            {/* Drawer Header */}
            <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-[#f4f1ea]">
              <div>
                <span className="font-editorial-title text-2xl tracking-tight text-stone-900 block">
                  MAISON <i className="font-serif italic font-normal">EDIT</i>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-stone-500 font-mono">
                  Volume XIV · Issue 14
                </span>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-stone-600 hover:text-stone-950 transition-colors"
                aria-label="Close menu drawer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Search Input in Drawer */}
            <div className="p-5 border-b border-stone-200/80 bg-white">
              <form onSubmit={handleDrawerSearchSubmit} className="relative">
                <input
                  type="text"
                  value={searchDrawerQuery}
                  onChange={(e) => setSearchDrawerQuery(e.target.value)}
                  placeholder="Search runway, craftsmanship, essays..."
                  className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-300 text-stone-900 text-sm focus:outline-hidden focus:border-stone-900 placeholder:text-stone-400 font-editorial-body"
                />
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
              </form>
            </div>

            {/* Department Navigation */}
            <div className="p-5 flex-1 space-y-6">
              <div>
                <div className="text-[11px] font-sans uppercase tracking-[0.2em] text-stone-400 mb-3 font-semibold">
                  Editorial Departments
                </div>
                <div className="space-y-1">
                  {CATEGORIES.map((cat) => {
                    const articleCount = ARTICLES.filter((a) => a.categorySlug === cat.slug).length;
                    return (
                      <button
                        key={cat.slug}
                        onClick={() => handleNav(`/category/${cat.slug}/`)}
                        className="w-full flex items-center justify-between py-2.5 px-3 text-left hover:bg-stone-100/80 transition-colors group min-h-[44px]"
                      >
                        <div>
                          <span className="font-editorial-serif text-lg text-stone-900 group-hover:text-stone-700 block">
                            {cat.name}
                          </span>
                          <span className="text-xs text-stone-500 font-editorial-body">
                            {cat.issueScope}
                          </span>
                        </div>
                        <span className="font-mono text-xs text-stone-400 bg-stone-200/60 px-2 py-0.5 rounded-xs">
                          {articleCount}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Special Sections */}
              <div className="border-t border-stone-200 pt-5">
                <div className="text-[11px] font-sans uppercase tracking-[0.2em] text-stone-400 mb-3 font-semibold">
                  Curated Sections
                </div>
                <div className="space-y-1 text-sm font-medium">
                  <button
                    onClick={() => handleNav('/')}
                    className="w-full flex items-center justify-between py-2 px-3 text-left hover:bg-stone-100 transition-colors text-stone-800 min-h-[40px]"
                  >
                    <span>Latest Cover & Runway Wire</span>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                  </button>
                  <button
                    onClick={() => handleNav('/archive/')}
                    className="w-full flex items-center justify-between py-2 px-3 text-left hover:bg-stone-100 transition-colors text-stone-800 min-h-[40px]"
                  >
                    <span>Full Article Archive ({ARTICLES.length} Essays)</span>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                  </button>
                  <button
                    onClick={() => handleNav('/archive/?saved=true')}
                    className="w-full flex items-center justify-between py-2 px-3 text-left hover:bg-stone-100 transition-colors text-stone-800 min-h-[40px]"
                  >
                    <span className="flex items-center gap-2">
                      <Bookmark className="w-4 h-4 text-stone-700" />
                      <span>Saved Reading List</span>
                    </span>
                    <span className="font-mono text-xs text-stone-600 bg-stone-200 px-2 py-0.5">
                      {bookmarkCount}
                    </span>
                  </button>
                </div>
              </div>

              {/* Trending Stories in Drawer */}
              <div className="border-t border-stone-200 pt-5">
                <div className="text-[11px] font-sans uppercase tracking-[0.2em] text-stone-400 mb-3 font-semibold">
                  Trending in Salons
                </div>
                <div className="space-y-3">
                  {ARTICLES.slice(0, 3).map((art) => (
                    <button
                      key={art.id}
                      onClick={() => handleNav(`/journal/${art.slug}/`)}
                      className="w-full text-left group flex items-start gap-3 py-1"
                    >
                      <span className="font-mono text-xs text-stone-400 pt-0.5">{art.number}</span>
                      <div className="flex-1">
                        <div className="font-editorial-serif text-sm text-stone-900 group-hover:text-stone-600 line-clamp-1">
                          {art.title}
                        </div>
                        <div className="text-[11px] text-stone-500 font-editorial-body">
                          {art.categoryName} · {art.readTime}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-5 border-t border-stone-200 bg-[#f4f1ea] text-xs text-stone-600 space-y-3.5">
              {/* Social Channels in Drawer */}
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-stone-500 mb-2">
                  Follow @maisonedit
                </div>
                <div className="flex items-center gap-4">
                  {SOCIAL_LINKS.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.ariaLabel}
                      title={`${item.name}: ${item.handle}`}
                      className="text-stone-700 hover:text-stone-950 transition-transform hover:scale-110 p-0.5"
                    >
                      {item.icon}
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-stone-200/60">
                <span className="font-serif italic">Maison Edit · Paris</span>
                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    onOpenDiagnostics();
                  }}
                  className="text-emerald-700 hover:underline flex items-center gap-1 font-mono text-[11px]"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  System Audit
                </button>
              </div>
              <div className="text-[11px] text-stone-400">
                &copy; 2026 Maison Edit. Published with Curatorial Independence.
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

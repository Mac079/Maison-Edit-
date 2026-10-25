import React, { useState, useEffect } from 'react';
import { Home, Sparkles, ShoppingBag, Search, Bookmark } from 'lucide-react';

interface MobileBottomNavProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenTheEdit?: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentPath,
  onNavigate,
  onOpenTheEdit,
}) => {
  const [bookmarkCount, setBookmarkCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      try {
        const saved = JSON.parse(localStorage.getItem('maison_bookmarks') || '[]');
        setBookmarkCount(Array.isArray(saved) ? saved.length : 0);
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

  const isHome = currentPath === '/' || currentPath === '';
  const isRunway = currentPath.includes('/category/fashion-runway');
  const isSearch = currentPath.startsWith('/archive') && !currentPath.includes('saved=true');
  const isSaved = currentPath.includes('saved=true');

  const handleEditClick = () => {
    if (onOpenTheEdit) {
      onOpenTheEdit();
    } else {
      if (currentPath === '/') {
        const el = document.getElementById('the-edit');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      onNavigate('/#the-edit');
    }
  };

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#1c1917]/95 backdrop-blur-md text-stone-200 border-t border-stone-800 shadow-2xl pb-[env(safe-area-inset-bottom,0px)]"
    >
      <div className="grid grid-cols-5 h-14 max-w-md mx-auto items-center">
        {/* Home */}
        <button
          onClick={() => onNavigate('/')}
          className={`flex flex-col items-center justify-center h-full w-full transition-colors ${
            isHome ? 'text-white font-semibold' : 'text-stone-400 hover:text-stone-200'
          }`}
          aria-label="Home Journal"
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-wider uppercase font-sans">Home</span>
        </button>

        {/* Runway */}
        <button
          onClick={() => onNavigate('/category/fashion-runway/')}
          className={`flex flex-col items-center justify-center h-full w-full transition-colors ${
            isRunway ? 'text-white font-semibold' : 'text-stone-400 hover:text-stone-200'
          }`}
          aria-label="Runway Collections"
        >
          <Sparkles className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-wider uppercase font-sans">Runway</span>
        </button>

        {/* The Edit (Curated Shopping) */}
        <button
          onClick={handleEditClick}
          className="flex flex-col items-center justify-center h-full w-full text-stone-400 hover:text-stone-200 transition-colors"
          aria-label="The Edit: Curated Wardrobe & Shopping"
        >
          <ShoppingBag className="w-5 h-5 mb-0.5 text-[#e5d5ba]" />
          <span className="text-[10px] tracking-wider uppercase font-sans text-[#e5d5ba]">The Edit</span>
        </button>

        {/* Search */}
        <button
          onClick={() => onNavigate('/archive/')}
          className={`flex flex-col items-center justify-center h-full w-full transition-colors ${
            isSearch ? 'text-white font-semibold' : 'text-stone-400 hover:text-stone-200'
          }`}
          aria-label="Search Archive"
        >
          <Search className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-wider uppercase font-sans">Search</span>
        </button>

        {/* Saved reading list */}
        <button
          onClick={() => onNavigate('/archive/?saved=true')}
          className={`flex flex-col items-center justify-center h-full w-full relative transition-colors ${
            isSaved ? 'text-white font-semibold' : 'text-stone-400 hover:text-stone-200'
          }`}
          aria-label={`Saved reading list (${bookmarkCount})`}
        >
          <div className="relative">
            <Bookmark className="w-5 h-5 mb-0.5" />
            {bookmarkCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-emerald-600 text-white text-[9px] font-mono px-1 rounded-full min-w-[14px] text-center font-bold leading-tight">
                {bookmarkCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-wider uppercase font-sans">Saved</span>
        </button>
      </div>
    </nav>
  );
};

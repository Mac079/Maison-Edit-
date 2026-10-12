import React from 'react';
import { CATEGORIES } from '../data/articles';
import { Search, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenDiagnostics: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate, onOpenDiagnostics }) => {
  return (
    <header className="border-b border-stone-200 bg-[#f7f5f0] sticky top-0 z-40">
      {/* Top utility bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2 border-b border-stone-200/60 text-xs text-stone-600">
          <span className="font-editorial-body tracking-wider uppercase text-[11px] text-stone-500">
            Independent Fashion Journal
          </span>
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenDiagnostics}
              className="inline-flex items-center gap-1.5 text-stone-600 hover:text-stone-900 transition-colors text-[11px]"
              title="System & route health check"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Diagnostic: Healthy (17/17)</span>
            </button>
            <span className="text-stone-300">|</span>
            <span className="text-[11px] font-serif text-stone-900 font-medium">Issue No. 14</span>
          </div>
        </div>

        {/* 3-Zone Top Bar Contract */}
        <div className="flex items-center justify-between gap-8 py-4">
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => onNavigate('/')}
            className="text-2xl sm:text-3xl font-editorial-title tracking-tight text-stone-900 whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity text-left"
          >
            MAISON <i className="font-serif italic font-normal">EDIT</i>
          </button>

          {/* Zone 2: 5 clean single-line nav links */}
          <nav aria-label="Main" className="hidden md:flex items-center gap-6 lg:gap-8 text-xs uppercase tracking-wider font-medium text-stone-600">
            {CATEGORIES.map((cat) => {
              const catPath = `/category/${cat.slug}/`;
              const isActive = currentPath === catPath || currentPath === `/category/${cat.slug}`;
              return (
                <button
                  key={cat.slug}
                  onClick={() => onNavigate(catPath)}
                  className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
                    isActive
                      ? 'text-stone-950 font-semibold'
                      : 'hover:text-stone-950 text-stone-600'
                  }`}
                >
                  {cat.shortName}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-stone-900" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigate('/archive/')}
              className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium border transition-colors whitespace-nowrap shrink-0 ${
                currentPath.startsWith('/archive')
                  ? 'bg-stone-900 text-stone-50 border-stone-900'
                  : 'bg-white text-stone-800 border-stone-300 hover:border-stone-900 hover:text-stone-950'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Archive & Search</span>
            </button>
          </div>
        </div>

        {/* Mobile secondary category ribbon */}
        <div className="md:hidden flex items-center gap-4 overflow-x-auto py-2.5 border-t border-stone-200/50 no-scrollbar text-xs uppercase tracking-wider text-stone-600">
          <button
            onClick={() => onNavigate('/')}
            className={`whitespace-nowrap shrink-0 ${currentPath === '/' ? 'text-stone-950 font-semibold' : ''}`}
          >
            Home
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => onNavigate(`/category/${cat.slug}/`)}
              className={`whitespace-nowrap shrink-0 ${
                currentPath.includes(cat.slug) ? 'text-stone-950 font-semibold' : ''
              }`}
            >
              {cat.shortName}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

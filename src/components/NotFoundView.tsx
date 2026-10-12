import React from 'react';
import { ARTICLES, CATEGORIES } from '../data/articles';
import { ArrowLeft, ShieldCheck, Compass } from 'lucide-react';

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
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-200 text-stone-700 text-xs uppercase tracking-widest font-mono mb-6">
        <span>HTTP 404 · Unresolved Path</span>
      </div>

      <h1 className="text-4xl sm:text-6xl font-editorial-serif font-medium text-stone-900 mb-4">
        Page not found
      </h1>

      <p className="text-base sm:text-lg text-stone-600 max-w-lg mx-auto font-editorial-body mb-8">
        The requested path <code className="bg-stone-200/70 px-2 py-0.5 text-stone-900 font-mono text-sm">{currentPath}</code> could not be located in this edition of the journal.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 text-stone-100 hover:bg-stone-800 transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to the Maison Edit journal</span>
        </button>

        <button
          onClick={onOpenDiagnostics}
          className="inline-flex items-center gap-2 px-6 py-3 border border-stone-300 hover:border-stone-900 bg-white text-stone-800 transition-colors text-sm font-medium"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>Run System Diagnostic</span>
        </button>
      </div>

      {/* Suggested stories */}
      <div className="border-t border-stone-200 pt-12 text-left">
        <div className="text-xs uppercase tracking-widest text-stone-500 font-medium mb-6 text-center sm:text-left">
          Explore Current Issue 14 Essays
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ARTICLES.slice(0, 4).map((article) => (
            <div
              key={article.id}
              onClick={() => onNavigate(`/journal/${article.slug}/`)}
              className="p-4 border border-stone-200 hover:border-stone-900 transition-colors cursor-pointer bg-white group"
            >
              <div className="text-[11px] text-stone-500 uppercase tracking-wider mb-1">
                {article.categoryName} · {article.number}
              </div>
              <div className="font-editorial-serif text-base font-medium text-stone-900 group-hover:text-stone-700 truncate">
                {article.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

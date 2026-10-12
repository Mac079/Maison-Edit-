import React from 'react';
import { Category, ARTICLES } from '../data/articles';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

interface CategoryViewProps {
  category: Category;
  onNavigate: (path: string) => void;
}

export const CategoryView: React.FC<CategoryViewProps> = ({ category, onNavigate }) => {
  const categoryArticles = ARTICLES.filter((a) => a.categorySlug === category.slug);

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

      {/* Category Header */}
      <div className="border-b border-stone-200 pb-8 mb-12">
        <div className="text-xs uppercase tracking-widest text-stone-500 font-medium mb-2">
          Department · {category.issueScope}
        </div>
        <h1 className="text-3xl sm:text-5xl font-editorial-serif font-medium text-stone-900 mb-4">
          {category.name}
        </h1>
        <p className="text-base sm:text-lg text-stone-600 max-w-2xl font-editorial-body leading-relaxed">
          {category.description}
        </p>
      </div>

      {/* Articles Grid */}
      {categoryArticles.length === 0 ? (
        <div className="py-16 text-center text-stone-500">
          No articles filed under this department for Issue 14.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {categoryArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => onNavigate(`/journal/${article.slug}/`)}
              className="group cursor-pointer flex flex-col justify-between border-b border-stone-200 pb-8"
            >
              <div>
                <div className="overflow-hidden bg-stone-200 mb-4 aspect-4/3 relative">
                  <img
                    src={article.image}
                    alt={article.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-stone-900/80 text-stone-100 text-[10px] uppercase tracking-wider px-2 py-0.5 font-mono">
                    {article.number}
                  </div>
                </div>

                <div className="text-xs uppercase tracking-widest text-stone-500 font-medium mb-1.5">
                  {article.issue}
                </div>

                <h2 className="text-xl sm:text-2xl font-editorial-serif font-medium text-stone-900 group-hover:text-stone-700 transition-colors leading-snug mb-2">
                  {article.title}
                </h2>

                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                  {article.subtitle}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
                <div>
                  <span className="font-medium text-stone-900">{article.author}</span>
                  <span className="mx-1.5">·</span>
                  <span>{article.readTime}</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-stone-900 transition-colors" />
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

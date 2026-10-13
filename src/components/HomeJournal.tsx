import React, { useState } from 'react';
import { ARTICLES, Article } from '../data/articles';
import { ArrowUpRight, Check, Sparkles } from 'lucide-react';

interface HomeJournalProps {
  onNavigate: (path: string) => void;
}

export const HomeJournal: React.FC<HomeJournalProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const coverArticle = ARTICLES[0];
  const featuredArticles = ARTICLES.slice(1, 4);
  const readingListArticles = ARTICLES.slice(4);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Editorial Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-stone-200 pb-6 mb-8 gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-stone-500 font-medium mb-1">
            Luxury Fashion Journal · October 2026
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-editorial-serif font-medium text-stone-900 tracking-tight">
            Stories of enduring style.
          </h1>
        </div>
        <div className="text-right">
          <span className="font-serif italic text-lg sm:text-xl text-stone-600 block">
            Vol. XIV
          </span>
          <span className="text-[11px] uppercase tracking-wider text-stone-400">
            Ten Essays in Issue 14
          </span>
        </div>
      </div>

      {/* Cover Story Feature */}
      <article
        onClick={() => onNavigate(`/journal/${coverArticle.slug}/`)}
        className="group cursor-pointer mb-12 sm:mb-16 border-b border-stone-200 pb-12 sm:pb-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-stretch">
          {/* Cover Image */}
          <div className="lg:col-span-8 overflow-hidden bg-stone-900 relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-full min-h-[260px] sm:min-h-[380px] lg:min-h-[500px]">
            <img
              src={coverArticle.image}
              alt={coverArticle.imageAlt}
              className="w-full h-full object-cover object-center block transition-transform duration-700 ease-out group-hover:scale-105"
              loading="eager"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-stone-900/90 backdrop-blur-xs text-stone-100 text-[10px] sm:text-xs uppercase tracking-widest px-2.5 py-1 font-mono">
              Cover Story · {coverArticle.issue}
            </div>
          </div>

          {/* Cover Editorial Copy */}
          <div className="lg:col-span-4 flex flex-col justify-between py-1 sm:py-2">
            <div>
              <div className="text-xs uppercase tracking-widest text-stone-500 font-medium mb-2">
                {coverArticle.categoryName} · {coverArticle.issue}
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-editorial-serif font-medium text-stone-900 leading-tight group-hover:text-stone-700 transition-colors mb-3 sm:mb-4">
                {coverArticle.title}
              </h2>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 font-editorial-body">
                {coverArticle.subtitle}
              </p>
              {coverArticle.pullQuote && (
                <div className="border-y border-stone-200/80 py-3 sm:py-4 my-3 sm:my-4">
                  <p className="font-editorial-serif italic text-xs sm:text-sm text-stone-800 leading-relaxed">
                    &ldquo;{coverArticle.pullQuote.text}&rdquo;
                  </p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
              <div>
                <span className="text-stone-900 font-medium">{coverArticle.author}</span>
                <span className="mx-2">·</span>
                <span>{coverArticle.readTime}</span>
              </div>
              <span className="inline-flex items-center gap-1 text-stone-900 font-medium group-hover:translate-x-1 transition-transform">
                Read essay &rarr;
              </span>
            </div>
          </div>
        </div>
      </article>

      {/* About The Journal Section */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 py-8 md:py-12 border-b border-stone-200 mb-12 md:mb-16">
        <div className="md:col-span-4">
          <div className="text-xs uppercase tracking-widest text-stone-500 font-medium mb-1">
            About the journal
          </div>
          <h2 className="text-xl sm:text-2xl font-editorial-serif font-medium text-stone-900">
            What is Maison Edit?
          </h2>
        </div>
        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 text-sm text-stone-700 leading-relaxed">
          <div className="p-4 sm:p-5 bg-[#faf8f4] border border-stone-200/70">
            <h3 className="font-serif italic text-base text-stone-900 mb-2">
              What is a luxury fashion journal?
            </h3>
            <p className="text-stone-600 font-editorial-body text-xs sm:text-sm">
              A luxury fashion journal is an editorial publication that looks beyond trends at heritage houses, craftsmanship and the culture around them. Maison Edit is a fashion editorial for readers who value depth over speed, covering luxury fashion brands with an independent point of view.
            </p>
          </div>
          <div className="p-4 sm:p-5 bg-[#faf8f4] border border-stone-200/70">
            <h3 className="font-serif italic text-base text-stone-900 mb-2">
              What will you find in this issue?
            </h3>
            <p className="text-stone-600 font-editorial-body text-xs sm:text-sm">
              This issue features ten essays on quiet luxury, Italian tailoring, handbag craftsmanship, the fashion runway, red carpet fashion, the luxury boutique, vintage couture, sustainable materials, and fine watches and jewelry.
            </p>
          </div>
        </div>
      </section>

      {/* What's new in luxury fashion? (3 Featured Cards) */}
      <section className="mb-14 md:mb-20">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-stone-200 pb-3 sm:pb-4 mb-6 sm:mb-8 gap-1">
          <h2 className="text-xl sm:text-2xl font-editorial-serif font-medium text-stone-900">
            What&apos;s new in luxury fashion?
          </h2>
          <span className="text-xs uppercase tracking-widest text-stone-500 font-medium">
            Selected Stories · 02 – 04
          </span>
        </div>

        {/* 3-card grid: stacks 1-col on screens < 768px, 3-col on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {featuredArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => onNavigate(`/journal/${article.slug}/`)}
              className="group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="overflow-hidden bg-stone-900 mb-4 aspect-[4/3] w-full relative">
                  <img
                    src={article.image}
                    alt={article.imageAlt}
                    className="w-full h-full object-cover object-center block transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-stone-900/80 text-stone-100 text-[10px] uppercase tracking-wider px-2 py-0.5 font-mono">
                    {article.number}
                  </div>
                </div>
                <div className="text-xs uppercase tracking-widest text-stone-500 font-medium mb-1.5">
                  {article.categoryName} · {article.number}
                </div>
                <h3 className="text-xl font-editorial-serif font-medium text-stone-900 group-hover:text-stone-700 transition-colors leading-snug mb-2">
                  {article.title}
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                  {article.subtitle}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
                <span>{article.author}</span>
                <span>{article.readTime}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* The Reading List (Remaining Essays 05 to 10) */}
      <section className="border-t border-stone-200 pt-10 md:pt-16 mb-12 md:mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <div className="lg:col-span-4">
            <div className="text-xs uppercase tracking-widest text-stone-500 font-medium mb-1">
              The reading list
            </div>
            <h2 className="text-xl sm:text-3xl font-editorial-serif font-medium text-stone-900 mb-2 sm:mb-3">
              Where can I read more luxury fashion stories?
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4 sm:mb-6">
              Essential reading on the houses, artisans, materials, and ideas shaping luxury today.
            </p>
            <button
              onClick={() => onNavigate('/archive/')}
              className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-stone-900 border-b border-stone-900 pb-1 hover:opacity-70 transition-opacity"
            >
              Explore Complete Archive ({ARTICLES.length} Stories) &rarr;
            </button>
          </div>

          <div className="lg:col-span-8 divide-y divide-stone-200">
            {readingListArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => onNavigate(`/journal/${article.slug}/`)}
                className="group cursor-pointer py-3.5 sm:py-4.5 flex items-center justify-between hover:bg-stone-50/70 px-2 -mx-2 transition-colors min-h-[58px] gap-3"
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0 pr-2">
                  <span className="font-mono text-xs text-stone-400 shrink-0">
                    {article.number}
                  </span>
                  {/* Responsive thumbnail on reading list */}
                  <div className="w-14 h-11 sm:w-16 sm:h-12 shrink-0 overflow-hidden bg-stone-900 relative">
                    <img
                      src={article.image}
                      alt={article.imageAlt}
                      className="w-full h-full object-cover object-center block group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base lg:text-lg font-editorial-serif font-medium text-stone-900 group-hover:text-stone-700 transition-colors line-clamp-2 sm:line-clamp-1 leading-snug">
                      {article.title}
                    </h3>
                    <div className="text-[11px] sm:text-xs text-stone-500 mt-0.5 sm:mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                      <span>{article.categoryName}</span>
                      <span aria-hidden="true" className="text-stone-300">·</span>
                      <span>{article.readTime}</span>
                      <span aria-hidden="true" className="text-stone-300">·</span>
                      <span className="text-stone-600 hidden sm:inline">{article.author}</span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 text-stone-400 group-hover:text-stone-900 transition-colors p-1">
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Private Newsletter Subscription Section */}
      <section id="newsletter" className="bg-[#ede8df] border border-stone-300 p-6 sm:p-12 mb-10 sm:mb-12">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-xs uppercase tracking-widest text-stone-600 font-medium mb-2">
            The Private Letter
          </div>
          <h2 className="text-2xl sm:text-4xl font-editorial-serif font-medium text-stone-900 mb-3">
            A considered edit, <i className="italic font-normal">once a week.</i>
          </h2>
          <p className="text-sm text-stone-600 max-w-lg mx-auto mb-6">
            Reflections on runway collections, atelier craftsmanship, and curatorial culture delivered directly to your inbox every Sunday morning.
          </p>

          {subscribed ? (
            <div className="inline-flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm font-medium">
              <Check className="w-4 h-4 text-emerald-700" />
              <span>Thank you. Your first edit arrives this Sunday.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                aria-label="Email address for private letter"
                className="flex-1 px-4 py-2.5 text-sm bg-white border border-stone-300 focus:outline-hidden focus:border-stone-900 text-stone-900 placeholder:text-stone-400"
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-stone-900 text-stone-100 hover:bg-stone-800 transition-colors text-sm font-medium whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

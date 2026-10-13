import React, { useState, useEffect } from 'react';
import { ARTICLES, Article, CATEGORIES } from '../data/articles';
import { ArrowUpRight, Check, ArrowRight, Bookmark, BookmarkCheck, Clock, Compass, Sparkles } from 'lucide-react';

interface HomeJournalProps {
  onNavigate: (path: string) => void;
}

export const HomeJournal: React.FC<HomeJournalProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync bookmarks from localStorage
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('maison_bookmarks') || '[]');
      setBookmarkedIds(saved);
    } catch {
      setBookmarkedIds([]);
    }
  }, []);

  const toggleBookmark = (e: React.MouseEvent, articleId: string, articleTitle: string) => {
    e.stopPropagation();
    let updated: string[];
    if (bookmarkedIds.includes(articleId)) {
      updated = bookmarkedIds.filter((id) => id !== articleId);
      setToastMessage(`Removed from reading list`);
    } else {
      updated = [...bookmarkedIds, articleId];
      setToastMessage(`Saved: "${articleTitle.slice(0, 28)}..."`);
    }
    setBookmarkedIds(updated);
    localStorage.setItem('maison_bookmarks', JSON.stringify(updated));
    setTimeout(() => setToastMessage(null), 2400);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
  };

  // Vogue Editorial Segmentation
  const coverStory = ARTICLES[0]; // Lead cover story
  const runwayDispatch = ARTICLES.slice(1, 4); // Trending wire alongside cover
  const runwaySpotlight = ARTICLES.slice(3, 6); // 3 portrait runway collection cards
  const mostReadRankings = [ARTICLES[0], ARTICLES[1], ARTICLES[3], ARTICLES[5], ARTICLES[8]]; // Vogue Top 5 Ranking
  const atelierCollection = ARTICLES.slice(6); // Atelier deep dives

  return (
    <div className="pb-16 sm:pb-24">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-stone-100 text-xs py-2 px-4 shadow-xl border border-stone-700 animate-in fade-in duration-200 flex items-center gap-2">
          <BookmarkCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Editorial Ticker / Issue Announcement */}
      <div className="border-b border-stone-200/80 bg-[#f9f8f4] py-2 px-4 text-center text-xs text-stone-600 font-editorial-body">
        <span className="font-semibold uppercase tracking-wider text-stone-900 mr-2">
          Issue 14 Now Live:
        </span>
        <span className="text-stone-700">
          The Autumn/Winter Collections, Atelier Revelations & The Philosophy of Enduring Taste
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        {/* ========================================================= */}
        {/* PACKAGE 1: THE VOGUE LEAD PACKAGE (Cover Story & Wire)    */}
        {/* ========================================================= */}
        <section aria-label="Cover Package" className="border-b border-stone-200 pb-10 sm:pb-16 mb-12 sm:mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Primary Cover Essay (8 cols on desktop) */}
            <article
              onClick={() => onNavigate(`/journal/${coverStory.slug}/`)}
              className="lg:col-span-8 group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="overflow-hidden bg-stone-950 relative w-full aspect-[4/3] sm:aspect-[16/10] mb-5 sm:mb-6">
                  <img
                    src={coverStory.image}
                    alt={coverStory.imageAlt}
                    className="w-full h-full object-cover object-center block transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="eager"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-stone-950/90 text-stone-100 text-[10px] sm:text-xs uppercase tracking-widest px-2.5 py-1 font-mono">
                    Cover Story · Vol. XIV
                  </div>
                  <button
                    onClick={(e) => toggleBookmark(e, coverStory.id, coverStory.title)}
                    className="absolute top-3 right-3 p-2 bg-stone-950/80 hover:bg-stone-950 text-stone-200 transition-colors"
                    aria-label="Save cover story"
                  >
                    {bookmarkedIds.includes(coverStory.id) ? (
                      <BookmarkCheck className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <div className="space-y-2.5 sm:space-y-3">
                  <div className="text-xs uppercase tracking-widest text-stone-500 font-semibold flex items-center gap-2">
                    <span>{coverStory.categoryName}</span>
                    <span aria-hidden="true">·</span>
                    <span>The Autumn Salon</span>
                  </div>

                  <h1 className="text-2xl sm:text-4xl lg:text-5xl font-editorial-serif font-medium text-stone-950 group-hover:text-stone-700 transition-colors leading-[1.12] tracking-tight">
                    {coverStory.title}
                  </h1>

                  <p className="text-stone-600 font-editorial-body text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl">
                    {coverStory.subtitle}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-200/80 flex items-center justify-between text-xs text-stone-500">
                <div className="flex items-center gap-2">
                  <span className="text-stone-950 font-medium">{coverStory.author}</span>
                  <span>·</span>
                  <span>{coverStory.readTime}</span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-stone-950 font-semibold group-hover:translate-x-1 transition-transform">
                  Read Essay <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>

            {/* Vogue Runway Dispatch / Breaking Wire (4 cols on desktop) */}
            <div className="lg:col-span-4 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-stone-200 lg:pl-8 pt-8 lg:pt-0">
              <div>
                <div className="flex items-center justify-between border-b border-stone-900 pb-2 mb-4">
                  <span className="text-xs uppercase tracking-widest font-bold text-stone-950">
                    The Runway Dispatch
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-stone-500 font-mono">
                    Latest Dispatches
                  </span>
                </div>

                <div className="divide-y divide-stone-200">
                  {runwayDispatch.map((art, idx) => (
                    <article
                      key={art.id}
                      onClick={() => onNavigate(`/journal/${art.slug}/`)}
                      className="group cursor-pointer py-4 sm:py-5 first:pt-2 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1.5 font-mono">
                          <span className="uppercase tracking-wider text-stone-700 font-semibold">
                            {art.categoryName}
                          </span>
                          <span>{idx === 0 ? '2h ago' : idx === 1 ? '5h ago' : 'Yesterday'}</span>
                        </div>

                        <h3 className="font-editorial-serif text-lg sm:text-xl font-medium text-stone-950 group-hover:text-stone-700 transition-colors leading-snug mb-2">
                          {art.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 font-editorial-body leading-relaxed mb-3">
                          {art.subtitle}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
                        <span>By {art.author}</span>
                        <button
                          onClick={(e) => toggleBookmark(e, art.id, art.title)}
                          className="p-1 hover:text-stone-950 text-stone-400"
                          title="Save story"
                        >
                          {bookmarkedIds.includes(art.id) ? (
                            <BookmarkCheck className="w-3.5 h-3.5 text-emerald-700" />
                          ) : (
                            <Bookmark className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200 mt-2">
                <button
                  onClick={() => onNavigate('/archive/')}
                  className="w-full py-2.5 text-center text-xs uppercase tracking-widest font-semibold bg-stone-900 text-stone-100 hover:bg-stone-800 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Explore Archive Dispatch</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* PACKAGE 2: RUNWAY & COLLECTION SPOTLIGHT (Vogue Gallery) */}
        {/* ========================================================= */}
        <section aria-label="Runway Collections" className="mb-14 sm:mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-stone-900 pb-3 mb-6 sm:mb-8 gap-2">
            <div>
              <div className="text-[11px] font-sans uppercase tracking-[0.2em] text-stone-500 font-semibold mb-1">
                Runway &amp; Collections
              </div>
              <h2 className="text-2xl sm:text-3xl font-editorial-serif font-medium text-stone-950">
                Salon Presentations &amp; Haute Couture
              </h2>
            </div>
            <button
              onClick={() => onNavigate('/category/fashion-runway/')}
              className="text-xs uppercase tracking-widest font-semibold text-stone-900 hover:text-stone-600 transition-colors inline-flex items-center gap-1 self-start sm:self-auto"
            >
              <span>View All Runway</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 3-card portrait visual showcase with mobile swipe */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {runwaySpotlight.map((art) => (
              <article
                key={art.id}
                onClick={() => onNavigate(`/journal/${art.slug}/`)}
                className="group cursor-pointer flex flex-col justify-between bg-[#faf8f4] border border-stone-200/80 p-4 transition-all hover:border-stone-900"
              >
                <div>
                  <div className="relative overflow-hidden bg-stone-950 aspect-[3/4] mb-4 w-full">
                    <img
                      src={art.image}
                      alt={art.imageAlt}
                      className="w-full h-full object-cover object-center block group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-stone-950/80 text-stone-100 text-[10px] uppercase tracking-wider px-2 py-0.5 font-mono">
                      {art.categoryName}
                    </div>
                    <button
                      onClick={(e) => toggleBookmark(e, art.id, art.title)}
                      className="absolute top-2.5 right-2.5 p-1.5 bg-stone-950/80 hover:bg-stone-950 text-stone-200 transition-colors"
                      aria-label="Save story"
                    >
                      {bookmarkedIds.includes(art.id) ? (
                        <BookmarkCheck className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Bookmark className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  <div className="text-[11px] uppercase tracking-wider text-stone-500 font-mono mb-1">
                    {art.issue}
                  </div>

                  <h3 className="font-editorial-serif text-lg sm:text-xl font-medium text-stone-950 group-hover:text-stone-700 transition-colors leading-snug mb-2">
                    {art.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 line-clamp-3 font-editorial-body leading-relaxed mb-4">
                    {art.subtitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
                  <span>{art.author}</span>
                  <span>{art.readTime}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* PACKAGE 3: IN FOCUS / THE COUTURE STATEMENT               */}
        {/* ========================================================= */}
        <section
          onClick={() => onNavigate(`/journal/${ARTICLES[1].slug}/`)}
          className="group cursor-pointer mb-14 sm:mb-20 bg-[#1c1917] text-[#f7f5f0] p-6 sm:p-12 lg:p-16 border border-stone-800"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="text-xs font-mono uppercase tracking-[0.25em] text-stone-400">
                In Focus · The Sartorial Statement
              </div>
              <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-editorial-serif font-normal italic leading-snug text-stone-100">
                &ldquo;True tailoring is not merely garment construction; it is an architectural dialogue between human posture and the drape of woven wool.&rdquo;
              </blockquote>
              <div className="text-xs sm:text-sm text-stone-400 font-editorial-body">
                From <span className="text-stone-200 font-medium">{ARTICLES[1].title}</span> by Marco Bellini, Milan
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-center lg:items-end">
              <div className="w-full max-w-sm aspect-[4/3] overflow-hidden bg-stone-900 border border-stone-700 mb-4">
                <img
                  src={ARTICLES[1].image}
                  alt={ARTICLES[1].imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-stone-300 font-semibold group-hover:text-white transition-colors">
                <span>Read Full Essay</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* PACKAGE 4: THE VOGUE NUMBERED RANKING / MOST READ (01-05) */}
        {/* ========================================================= */}
        <section aria-label="Most Read Stories" className="mb-14 sm:mb-20 border-b border-stone-200 pb-14 sm:pb-20">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-stone-900 pb-3 mb-6 sm:mb-8 gap-2">
            <div>
              <div className="text-[11px] font-sans uppercase tracking-[0.2em] text-stone-500 font-semibold mb-1">
                The Maison Edit
              </div>
              <h2 className="text-2xl sm:text-3xl font-editorial-serif font-medium text-stone-950">
                Most Read in This Edition
              </h2>
            </div>
            <span className="text-xs uppercase tracking-widest text-stone-500 font-mono">
              Curated Reader Favorites · 01 – 05
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-6">
            {mostReadRankings.map((art, index) => (
              <article
                key={art.id}
                onClick={() => onNavigate(`/journal/${art.slug}/`)}
                className="group cursor-pointer flex flex-col justify-between border-b md:border-b-0 md:border-r border-stone-200 last:border-r-0 pb-6 md:pb-0 md:pr-4"
              >
                <div>
                  {/* Big Editorial Serif Number (Vogue Style) */}
                  <div className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-light text-stone-400 group-hover:text-stone-900 transition-colors mb-2">
                    0{index + 1}
                  </div>

                  <div className="w-full aspect-[16/10] overflow-hidden bg-stone-950 mb-3 relative">
                    <img
                      src={art.image}
                      alt={art.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>

                  <div className="text-[10px] uppercase tracking-wider text-stone-500 font-mono mb-1">
                    {art.categoryName}
                  </div>

                  <h3 className="font-editorial-serif text-base sm:text-lg font-medium text-stone-950 group-hover:text-stone-700 transition-colors leading-snug mb-2 line-clamp-2">
                    {art.title}
                  </h3>

                  <p className="text-xs text-stone-600 line-clamp-2 font-editorial-body leading-relaxed mb-3">
                    {art.subtitle}
                  </p>
                </div>

                <div className="text-[11px] text-stone-500 flex items-center justify-between pt-2 border-t border-stone-200/60">
                  <span>{art.readTime}</span>
                  <button
                    onClick={(e) => toggleBookmark(e, art.id, art.title)}
                    className="p-1 hover:text-stone-950 text-stone-400"
                    title="Bookmark"
                  >
                    {bookmarkedIds.includes(art.id) ? (
                      <BookmarkCheck className="w-3.5 h-3.5 text-emerald-700" />
                    ) : (
                      <Bookmark className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* PACKAGE 5: ATELIER ARCHIVE & CRAFTSMANSHIP DEEP DIVES     */}
        {/* ========================================================= */}
        <section aria-label="Atelier Craftsmanship" className="mb-14 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-4">
              <div className="sticky top-28 space-y-4">
                <div className="text-[11px] font-sans uppercase tracking-[0.2em] text-stone-500 font-semibold">
                  The Complete Reading List
                </div>
                <h2 className="text-2xl sm:text-3xl font-editorial-serif font-medium text-stone-950 leading-tight">
                  Atelier Craftsmanship &amp; Objects of Heritage
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 font-editorial-body leading-relaxed">
                  In-depth investigations into double-faced cashmere, vintage couture archives, saddlery leathercraft, and mechanical horology.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('/archive/')}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-stone-950 border-b-2 border-stone-950 pb-1 hover:opacity-75 transition-opacity"
                  >
                    <span>View All {ARTICLES.length} Essays in Archive</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 divide-y divide-stone-200">
              {atelierCollection.map((art) => (
                <article
                  key={art.id}
                  onClick={() => onNavigate(`/journal/${art.slug}/`)}
                  className="group cursor-pointer py-4 sm:py-5 flex items-center justify-between hover:bg-stone-100/60 px-3 -mx-3 transition-colors gap-4"
                >
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    <span className="font-mono text-xs text-stone-400 shrink-0 w-6">
                      {art.number}
                    </span>

                    {/* Responsive thumbnail */}
                    <div className="w-16 h-12 sm:w-20 sm:h-14 shrink-0 overflow-hidden bg-stone-950 relative">
                      <img
                        src={art.image}
                        alt={art.imageAlt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="text-[10px] uppercase tracking-wider text-stone-500 font-mono">
                        {art.categoryName}
                      </div>
                      <h3 className="font-editorial-serif text-base sm:text-lg font-medium text-stone-950 group-hover:text-stone-700 transition-colors leading-snug line-clamp-1">
                        {art.title}
                      </h3>
                      <div className="text-xs text-stone-500 font-editorial-body hidden sm:block line-clamp-1">
                        {art.subtitle}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-stone-500 font-mono hidden md:inline">
                      {art.readTime}
                    </span>
                    <button
                      onClick={(e) => toggleBookmark(e, art.id, art.title)}
                      className="p-1 text-stone-400 hover:text-stone-900"
                      title="Save"
                    >
                      {bookmarkedIds.includes(art.id) ? (
                        <BookmarkCheck className="w-4 h-4 text-emerald-700" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                    <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-stone-950 group-hover:translate-x-1 transition-all" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* PACKAGE 6: THE PRIVATE LETTER / VOGUE NEWSLETTER STRIP     */}
        {/* ========================================================= */}
        <section id="newsletter" className="bg-[#ede8df] border border-stone-300 p-6 sm:p-12 mb-10 sm:mb-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-[11px] font-sans uppercase tracking-[0.2em] text-stone-600 font-semibold mb-2">
              The Maison Letter · Weekly Dispatch
            </div>
            <h2 className="text-2xl sm:text-4xl font-editorial-serif font-medium text-stone-950 mb-3">
              The Sunday Edit, <i className="italic font-normal">curated with discipline.</i>
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-md mx-auto mb-6 font-editorial-body">
              A private digest of runway reviews, atelier documentation, and architectural couture commentary delivered every Sunday morning.
            </p>

            {subscribed ? (
              <div className="inline-flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm font-medium">
                <Check className="w-4 h-4 text-emerald-700" />
                <span>Thank you. Your first Sunday dispatch is scheduled.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  aria-label="Email address for private letter"
                  className="flex-1 px-4 py-2.5 text-sm bg-white border border-stone-300 focus:outline-hidden focus:border-stone-900 text-stone-900 placeholder:text-stone-400 font-editorial-body"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-stone-900 text-stone-100 hover:bg-stone-800 transition-colors text-xs uppercase tracking-widest font-semibold whitespace-nowrap min-h-[44px]"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </section>
      </div>

      {/* ========================================================= */}
      {/* VOGUE MOBILE FLOATING QUICK-ACTION BAR (< 768px)          */}
      {/* ========================================================= */}
      <div className="md:hidden fixed bottom-3 left-4 right-4 z-40 bg-stone-900/95 backdrop-blur-md text-stone-100 border border-stone-700 px-4 py-2 shadow-2xl flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-1.5 text-xs text-stone-300 hover:text-white py-1"
        >
          <span>Top &uarr;</span>
        </button>
        <span className="text-stone-600">|</span>
        <button
          onClick={() => onNavigate('/archive/?saved=true')}
          className="flex items-center gap-1.5 text-xs text-stone-300 hover:text-white py-1"
        >
          <Bookmark className="w-3.5 h-3.5 text-emerald-400" />
          <span>Saved ({bookmarkedIds.length})</span>
        </button>
        <span className="text-stone-600">|</span>
        <button
          onClick={() => onNavigate('/archive/')}
          className="flex items-center gap-1.5 text-xs text-stone-300 hover:text-white py-1"
        >
          <span>Archive</span>
        </button>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { EditItem } from '../data/theEdit';
import { X, Bookmark, BookmarkCheck, Sparkles, Shield, ArrowRight, Check } from 'lucide-react';

interface TheEditModalProps {
  item: EditItem | null;
  onClose: () => void;
}

export const TheEditModal: React.FC<TheEditModalProps> = ({ item, onClose }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [inquired, setInquired] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (!item) return;
    try {
      const saved = JSON.parse(localStorage.getItem('maison_edit_saved_items') || '[]');
      setIsSaved(saved.includes(item.id));
    } catch {
      setIsSaved(false);
    }
    setInquired(false);
  }, [item]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [item, onClose]);

  if (!item) return null;

  const handleToggleSave = () => {
    try {
      const saved = JSON.parse(localStorage.getItem('maison_edit_saved_items') || '[]');
      let updated: string[];
      if (saved.includes(item.id)) {
        updated = saved.filter((id: string) => id !== item.id);
        setIsSaved(false);
      } else {
        updated = [...saved, item.id];
        setIsSaved(true);
      }
      localStorage.setItem('maison_edit_saved_items', JSON.stringify(updated));
    } catch {
      setIsSaved(!isSaved);
    }
  };

  const handleInquire = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setInquired(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-item-title"
      className="fixed inset-0 z-50 overflow-y-auto animate-in fade-in duration-200"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-stone-950/70 backdrop-blur-xs transition-opacity"
      />

      <div className="min-h-full flex items-center justify-center p-3 sm:p-6 lg:p-8">
        <div className="relative bg-[#fbf9f5] w-full max-w-3xl shadow-2xl border border-stone-300 overflow-hidden text-stone-900 my-8">
          {/* Header Close button */}
          <div className="flex items-center justify-between p-4 border-b border-stone-200 bg-[#f4f1ea]">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-mono tracking-widest text-stone-600 font-semibold">
                The Maison Edit · Curated Investment
              </span>
              <span className="text-stone-300">·</span>
              <span className="text-[10px] uppercase font-sans text-stone-500">
                {item.category}
              </span>
            </div>
            <button
              onClick={onClose}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center text-stone-600 hover:text-stone-950 transition-colors"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8">
            {/* Image col */}
            <div className="md:col-span-5 flex flex-col">
              <div className="relative aspect-[3/4] overflow-hidden bg-stone-900 border border-stone-200 mb-4">
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  width="600"
                  height="800"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                <span className="absolute top-2 left-2 bg-stone-950/90 text-stone-100 text-[10px] uppercase tracking-wider px-2 py-0.5 font-mono">
                  {item.editorialRating}
                </span>
              </div>

              <div className="bg-stone-100 p-3.5 border border-stone-200 text-xs space-y-1.5">
                <div className="text-[10px] uppercase font-mono tracking-wider text-stone-500 font-semibold">
                  Atelier Provenance
                </div>
                <p className="text-stone-700 font-editorial-body leading-relaxed">
                  {item.provenance}
                </p>
              </div>
            </div>

            {/* Details col */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-5">
              <div>
                <div className="flex items-baseline justify-between gap-2 mb-1.5">
                  <span className="text-xs uppercase tracking-widest text-stone-600 font-semibold font-mono">
                    {item.brand}
                  </span>
                  <span className="text-lg sm:text-xl font-editorial-serif font-bold text-stone-950">
                    {item.price}
                  </span>
                </div>

                <h3
                  id="modal-item-title"
                  className="text-2xl sm:text-3xl font-editorial-serif font-medium text-stone-950 leading-snug mb-3"
                >
                  {item.name}
                </h3>

                {/* Editor's Note */}
                <div className="border-l-2 border-stone-900 pl-3 py-1 mb-4 bg-stone-100/60">
                  <div className="text-[10px] uppercase font-sans tracking-widest text-stone-600 font-semibold mb-1">
                    The Editor’s Verdict
                  </div>
                  <p className="text-xs sm:text-sm text-stone-800 font-editorial-body leading-relaxed italic">
                    &ldquo;{item.editorNote}&rdquo;
                  </p>
                </div>

                {/* Styling Note */}
                <div className="space-y-1.5 mb-4">
                  <div className="text-[11px] uppercase font-sans tracking-wider text-stone-700 font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-stone-800" />
                    <span>How To Style This Season</span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-700 font-editorial-body leading-relaxed">
                    {item.stylingTip}
                  </p>
                </div>

                {/* Materials & Composition */}
                <div className="space-y-1">
                  <div className="text-[11px] uppercase font-sans tracking-wider text-stone-700 font-semibold flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-stone-800" />
                    <span>Materials &amp; Construction</span>
                  </div>
                  <p className="text-xs text-stone-600 font-editorial-body leading-relaxed">
                    {item.materials}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-stone-200 space-y-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleToggleSave}
                    className={`flex-1 min-h-[44px] py-2.5 px-4 text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-colors ${
                      isSaved
                        ? 'bg-emerald-900 text-white'
                        : 'bg-stone-900 text-stone-100 hover:bg-stone-800'
                    }`}
                  >
                    {isSaved ? (
                      <>
                        <BookmarkCheck className="w-4 h-4 text-emerald-300" />
                        <span>Saved In Wishlist</span>
                      </>
                    ) : (
                      <>
                        <Bookmark className="w-4 h-4" />
                        <span>Save To Wishlist</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Direct stockist concierge */}
                {inquired ? (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Inquiry logged. Atelier stockist availability dispatched to your email.</span>
                  </div>
                ) : (
                  <form onSubmit={handleInquire} className="flex gap-2">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email for stockist & private sizing"
                      className="flex-1 px-3 py-2 text-xs bg-white border border-stone-300 text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:border-stone-900 min-h-[44px]"
                    />
                    <button
                      type="submit"
                      className="min-h-[44px] px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-900 text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-colors"
                    >
                      Inquire
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

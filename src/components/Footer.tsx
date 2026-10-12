import React from 'react';
import { CATEGORIES } from '../data/articles';
import { ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenDiagnostics: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenDiagnostics }) => {
  return (
    <footer className="bg-[#1c1917] text-[#f4efe6] pt-16 pb-12 mt-20 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-stone-800">
          {/* Brand & mission */}
          <div className="md:col-span-5">
            <button
              onClick={() => onNavigate('/')}
              className="text-2xl font-editorial-title text-[#f4efe6] hover:opacity-90 text-left block mb-4"
            >
              MAISON <i className="font-serif italic font-normal">EDIT</i>
            </button>
            <p className="text-stone-400 text-sm leading-relaxed max-w-sm mb-6">
              An independent journal of enduring style, exceptional objects, and the ateliers that craft them. Published in Paris, Milan, and Geneva.
            </p>
            <div className="flex items-center gap-3 text-xs text-stone-500">
              <span>ISSN 2940-1428</span>
              <span>·</span>
              <span>Volume XIV</span>
              <span>·</span>
              <button
                onClick={onOpenDiagnostics}
                className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Diagnostic Check</span>
              </button>
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3">
            <div className="text-xs uppercase tracking-widest text-stone-500 mb-4 font-medium">
              The Journal
            </div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('/')}
                  className="text-stone-300 hover:text-white transition-colors"
                >
                  Latest Stories
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/archive/')}
                  className="text-stone-300 hover:text-white transition-colors"
                >
                  The Article Archive
                </button>
              </li>
              <li>
                <a
                  href="#newsletter"
                  className="text-stone-300 hover:text-white transition-colors"
                >
                  Newsletter Subscription
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="md:col-span-4">
            <div className="text-xs uppercase tracking-widest text-stone-500 mb-4 font-medium">
              Departments & Curations
            </div>
            <ul className="space-y-2.5 text-sm">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <button
                    onClick={() => onNavigate(`/category/${cat.slug}/`)}
                    className="text-stone-300 hover:text-white transition-colors"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div>&copy; 2026 Maison Edit. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <span>Published with Perspective</span>
            <span>·</span>
            <span>Curatorial Independence</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

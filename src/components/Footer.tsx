import React from 'react';
import { CATEGORIES } from '../data/articles';
import { ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenDiagnostics: () => void;
}

export const SOCIAL_LINKS = [
  {
    name: 'X',
    handle: '@maisonedit',
    href: 'https://x.com/maisonedit',
    ariaLabel: 'Follow Maison Edit on X (formerly Twitter)',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    handle: '@maisonedit',
    href: 'https://www.tiktok.com/@maisonedit',
    ariaLabel: 'Follow Maison Edit on TikTok',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.88 2.89 2.89 0 0 1-2.88-2.88 2.89 2.89 0 0 1 2.88-2.88c.36 0 .7.07 1 .2V9.45a6.34 6.34 0 0 0-1-.08A6.33 6.33 0 0 0 3 15.7a6.33 6.33 0 0 0 6.33 6.33 6.33 6.33 0 0 0 6.33-6.33V8.89a8.27 8.27 0 0 0 5-1.63z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    handle: '@maisonedit',
    href: 'https://www.youtube.com/@maisonedit',
    ariaLabel: 'Subscribe to Maison Edit on YouTube',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    handle: 'maisonedit',
    href: 'https://www.facebook.com/maisonedit',
    ariaLabel: 'Follow Maison Edit on Facebook',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    handle: '@maisonedit',
    href: 'https://www.instagram.com/maisonedit',
    ariaLabel: 'Follow Maison Edit on Instagram',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: 'Pinterest',
    handle: '@maisonedit',
    href: 'https://www.pinterest.com/maisonedit',
    ariaLabel: 'Follow Maison Edit on Pinterest',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current">
        <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
      </svg>
    ),
  },
];

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenDiagnostics }) => {
  return (
    <footer className="bg-[#1c1917] text-[#f4efe6] pt-16 pb-12 mt-20 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-column navigation & directory grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-stone-800">
          {/* Brand & mission */}
          <div className="sm:col-span-2 md:col-span-4">
            <button
              onClick={() => onNavigate('/')}
              className="text-2xl font-editorial-title text-[#f4efe6] hover:opacity-90 text-left block mb-4"
            >
              MAISON <i className="font-serif italic font-normal">EDIT</i>
            </button>
            <p className="text-stone-400 text-sm leading-relaxed max-w-sm mb-6">
              An independent journal of enduring style, exceptional objects, and the ateliers that craft them. Published in Paris, Milan, and Geneva.
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500">
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
          <div className="sm:col-span-1 md:col-span-2">
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
                <button
                  onClick={() => {
                    onNavigate('/');
                    setTimeout(() => {
                      const el = document.getElementById('newsletter');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 120);
                  }}
                  className="text-stone-300 hover:text-white transition-colors"
                >
                  Newsletter Subscription
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="sm:col-span-1 md:col-span-3">
            <div className="text-xs uppercase tracking-widest text-stone-500 mb-4 font-medium">
              Departments &amp; Curations
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

          {/* Social Media Handles Directory */}
          <div className="sm:col-span-2 md:col-span-3">
            <div className="text-xs uppercase tracking-widest text-stone-500 mb-4 font-medium">
              Official Social Channels
            </div>
            <p className="text-xs text-stone-400 leading-relaxed mb-3">
              Follow our daily dispatches, salon streams, and runway coverage across official accounts:
            </p>
            <ul className="space-y-2 text-xs font-mono text-stone-300">
              {SOCIAL_LINKS.map((item) => (
                <li key={item.name} className="flex items-center justify-between py-0.5">
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="text-stone-400 group-hover:text-white">{item.name}</span>
                    <span className="text-stone-500">:</span>
                    <span className="text-stone-300 group-hover:underline">{item.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Vogue-Style Social Media Icons Row as presented in screenshot */}
        <div className="py-10 border-b border-stone-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-stone-400 font-semibold mb-1">
              Connect With Maison Edit
            </div>
            <p className="text-xs text-stone-400 font-editorial-body">
              Official handles across all platforms: <span className="text-stone-200 font-mono font-medium">@maisonedit</span> · Archival imagery, backstage dispatches &amp; haute horlogerie
            </p>
          </div>

          {/* Social Media Logos in exact order: X, TikTok, YouTube, Facebook, Instagram, Pinterest */}
          <div className="flex items-center gap-6 sm:gap-8">
            {SOCIAL_LINKS.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.ariaLabel}
                title={`${item.name}: ${item.handle}`}
                className="text-[#f4efe6] hover:text-white transition-all transform hover:scale-110 p-1 flex items-center justify-center focus:outline-hidden focus:ring-1 focus:ring-stone-400"
              >
                {item.icon}
                <span className="sr-only">{item.name} {item.handle}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div>&copy; 2026 Maison Edit. All rights reserved. Published in Paris, Milan &amp; Geneva.</div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span>Published with Perspective</span>
            <span>·</span>
            <span>Curatorial Independence</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Final Grade Calculator', href: '/' },
    { name: 'Weighted Calculator', href: '/weighted-grade-calculator/' },
    { name: 'Grade Converter', href: '/grade-converter/' },
    { name: 'Guides', href: '/calculators/' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src="/logo-128.png"
                alt="Final Grade Calculator Logo"
                width={40}
                height={40}
                className="w-10 h-10 transition-transform group-hover:scale-110"
              />
              <span className="text-lg font-bold text-primary dark:text-primary-light hidden sm:block">
                Final Grade Calculator
              </span>
              <span className="text-lg font-bold text-primary dark:text-primary-light sm:hidden">
                FGC
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => trackEvent('nav_click', {
                  calculator_type: 'site_navigation',
                  input_mode: 'header_desktop',
                  result_state: 'navigate',
                  destination: item.href,
                })}
                className="text-sm font-medium text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary-light transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md text-gray-700 transition-colors hover:bg-gray-100 hover:text-primary dark:text-gray-300 dark:hover:bg-gray-800"
              onClick={() => {
                const nextState = !mobileMenuOpen;
                setMobileMenuOpen(nextState);
                trackEvent('mobile_menu_toggle', {
                  calculator_type: 'site_navigation',
                  input_mode: 'header_menu',
                  result_state: nextState ? 'open' : 'closed',
                });
              }}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-base font-medium text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary-light transition-colors"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    trackEvent('mobile_nav_click', {
                      calculator_type: 'site_navigation',
                      input_mode: 'header_menu',
                      result_state: 'navigate',
                      destination: item.href,
                    });
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

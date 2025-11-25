"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Header() {
     const [isScrolled, setIsScrolled] = useState(false);

     useEffect(() => {
          const handleScroll = () => {
               if (window.scrollY > 50) {
                    setIsScrolled(true);
               } else {
                    setIsScrolled(false);
               }
          };

          window.addEventListener('scroll', handleScroll);
          return () => window.removeEventListener('scroll', handleScroll);
     }, []);

     const navItems = ['Home', 'Menu', 'About', 'Gallery', 'Contact'];

     return (
          <header
               className={`w-full bg-white/90 backdrop-blur-sm sticky top-0 z-50 border-b border-stone-100 transition-all duration-300 shadow-sm`}
          >
               {/* Top Section: Logo (and Nav when scrolled) */}
               <div className={`w-full transition-all duration-300 ${isScrolled ? 'py-2' : 'py-0'}`}>
                    <div className={`container mx-auto px-4 flex items-center ${isScrolled ? 'justify-between' : 'justify-center py-6'}`}>
                         {/* Logo */}
                         <Link href="/">
                              <Image
                                   src="/logo_orange.png"
                                   alt="Cafe Logo"
                                   width={isScrolled ? 50 : 80}
                                   height={isScrolled ? 50 : 80}
                                   className="hover:opacity-90 transition-all duration-300"
                              />
                         </Link>

                         {/* Navigation (Scrolled Mode) */}
                         <nav className={`transition-all duration-300 ${isScrolled ? 'opacity-100 visible' : 'opacity-0 invisible w-0 h-0'}`}>
                              <ul className="flex items-center gap-x-8">
                                   {navItems.map((item) => (
                                        <li key={item}>
                                             <Link
                                                  href={item === 'Home' ? '/' : item === 'About' ? '/story' : `/${item.toLowerCase()}`}
                                                  className="text-sm uppercase tracking-[0.15em] font-medium text-stone-600 hover:text-[#EC814E] transition-colors duration-300"
                                             >
                                                  {item}
                                             </Link>
                                        </li>
                                   ))}
                              </ul>
                         </nav>
                    </div>
               </div>

               {/* Bottom Section: Navigation Bar (Default Mode) */}
               <div className={`w-full bg-[#1c1c1c] transition-all duration-300 overflow-hidden ${isScrolled ? 'max-h-0 opacity-0' : 'max-h-16 opacity-100'
                    }`}>
                    <div className="container mx-auto px-4">
                         <nav className="w-full py-4">
                              <ul className="flex flex-wrap items-center justify-center gap-x-10">
                                   {navItems.map((item) => (
                                        <li key={item}>
                                             <Link
                                                  href={item === 'Home' ? '/' : item === 'About' ? '/story' : `/${item.toLowerCase()}`}
                                                  className="text-sm uppercase tracking-[0.15em] font-medium text-white hover:text-[#EC814E] transition-colors duration-300"
                                             >
                                                  {item}
                                             </Link>
                                        </li>
                                   ))}
                              </ul>
                         </nav>
                    </div>
               </div>
          </header>
     );
}

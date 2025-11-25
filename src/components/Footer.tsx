import Link from 'next/link';

export default function Footer() {
     return (
          <footer className="w-full bg-[#EC814E] text-white">
               <div className="container mx-auto px-4 py-12">
                    <div className="flex flex-col items-center justify-center gap-8 text-center">
                         {/* Brand Name */}
                         <h2 className="font-serif text-3xl font-bold tracking-wide">What Coffee</h2>

                         {/* Navigation */}
                         <nav>
                              <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                                   {['Home', 'Menu', 'About', 'Gallery', 'Contact'].map((item) => (
                                        <li key={item}>
                                             <Link
                                                  href={item === 'Home' ? '/' : item === 'About' ? '/story' : `/${item.toLowerCase()}`}
                                                  className="text-sm uppercase tracking-widest font-medium hover:text-stone-200 transition-colors"
                                             >
                                                  {item}
                                             </Link>
                                        </li>
                                   ))}
                              </ul>
                         </nav>

                         {/* Social Icons */}
                         <div className="flex gap-6 items-center mt-2">
                              <a href="#" aria-label="Instagram" className="hover:text-stone-200 transition-colors transform hover:scale-110 duration-200">
                                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                                   </svg>
                              </a>
                              <a href="#" aria-label="Facebook" className="hover:text-stone-200 transition-colors transform hover:scale-110 duration-200">
                                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                   </svg>
                              </a>
                              <a href="mailto:hello@whatcoffee.com" aria-label="Email" className="hover:text-stone-200 transition-colors transform hover:scale-110 duration-200">
                                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect width="20" height="16" x="2" y="4" rx="2" />
                                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                   </svg>
                              </a>
                         </div>

                         {/* Copyright */}
                         <div className="text-xs text-white/80 font-light tracking-wide mt-4">
                              <p>&copy; {new Date().getFullYear()} What Coffee. All rights reserved.</p>
                         </div>
                    </div>
               </div>
          </footer>
     );
}

import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
     const navItems = ['Home', 'Menu', 'About', 'Gallery', 'Contact'];

     return (
          <header className="w-full bg-white/90 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
               <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="mr-8">
                         <Image
                              src="/logo_orange.png"
                              alt="Cafe Logo"
                              width={70}
                              height={70}
                              className="hover:opacity-90 transition-opacity"
                         />
                    </Link>

                    {/* Navigation */}
                    <nav>
                         <ul className="flex items-center gap-x-8">
                              {navItems.map((item) => (
                                   <li key={item}>
                                        <Link
                                             href={item === 'Home' ? '/' : item === 'About' ? '/story' : `/${item.toLowerCase()}`}
                                             className="text-sm uppercase tracking-[0.15em] font-medium text-stone-600 hover:text-[#EC814E] transition-colors"
                                        >
                                             {item}
                                        </Link>
                                   </li>
                              ))}
                         </ul>
                    </nav>
               </div>
          </header>
     );
}

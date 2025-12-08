import Image from "next/image";
import Link from "next/link";

export default function Hero() {
     return (
          <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-background px-4 md:px-8 lg:px-16 pt-20">
               <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <div className="flex flex-col gap-6 z-10">
                         <div className="inline-flex items-center gap-2 text-primary font-medium tracking-wide uppercase text-sm">
                              <span className="w-8 h-[1px] bg-primary"></span>
                              Est. 2024
                         </div>

                         <h1 className="text-6xl md:text-8xl font-bold leading-[0.9] tracking-tighter text-foreground">
                              BREW <br />
                              <span className="text-primary">BOLDER.</span>
                         </h1>

                         <p className="text-lg md:text-xl text-zinc-600 max-w-md font-sans leading-relaxed">
                              Experience coffee that wakes up your soul.
                              Minimalist sourcing, maximalist flavor.
                         </p>

                         <div className="flex flex-wrap gap-4 mt-4">
                              <Link href="/menu" className="px-8 py-4 bg-primary text-primary-foreground text-sm font-semibold tracking-wide uppercase hover:opacity-90 transition-opacity rounded-full">
                                   See Menu
                              </Link>
                              <Link href="/story" className="px-8 py-4 border border-zinc-200 text-foreground text-sm font-semibold tracking-wide uppercase hover:bg-zinc-50 transition-colors rounded-full">
                                   Our Story
                              </Link>
                         </div>
                    </div>

                    {/* Hero Image */}
                    <div className="relative h-[600px] w-full hidden lg:block">
                         <div className="absolute top-0 right-0 w-[90%] h-full bg-zinc-100 overflow-hidden rounded-2xl">
                              <Image
                                   src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1000&auto=format&fit=crop"
                                   alt="Pouring coffee"
                                   fill
                                   className="object-cover hover:scale-105 transition-transform duration-700"
                                   priority
                              />
                         </div>
                    </div>
               </div>
          </section>
     );
}

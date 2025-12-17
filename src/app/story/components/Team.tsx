import Image from "next/image";
import Link from "next/link";

export default function Team() {
     return (
          <section className="relative w-full min-h-[85svh] md:min-h-[90vh] flex items-center justify-center overflow-hidden bg-background px-4 md:px-8 lg:px-16 pt-24 md:pt-20 pb-12 md:pb-0">
               <div className="container mx-auto grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
                    {/* Content */}
                    <div className="flex flex-col gap-4 md:gap-6 z-10 text-center lg:text-left items-center lg:items-start">
                         <div className="inline-flex items-center gap-2 text-primary font-medium tracking-wide uppercase text-xs md:text-sm">
                              <span className="w-8 h-[1px] bg-primary"></span>
                              Est. 2024
                         </div>

                         <h1 className="text-5xl md:text-8xl font-bold leading-[0.9] tracking-tighter text-foreground">
                              STAY <br />
                              <span className="text-primary">AWHILE.</span>
                         </h1>

                         <p className="text-base md:text-xl text-zinc-600 max-w-md font-sans leading-relaxed">
                              The world is fast enough. Take a slow moment with a cup that was made with care, just for you.
                         </p>

                         <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
                              <Link href="/menu" className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground text-sm font-semibold tracking-wide uppercase hover:opacity-90 transition-opacity rounded-full flex justify-center">
                                   See Menu
                              </Link>
                              <Link href="/story" className="w-full sm:w-auto px-8 py-4 border border-zinc-200 text-foreground text-sm font-semibold tracking-wide uppercase hover:bg-zinc-50 transition-colors rounded-full flex justify-center">
                                   Our Story
                              </Link>
                         </div>
                    </div>

                    {/* Hero Image */}
                    <div className="relative h-[400px] md:h-[600px] w-full hidden lg:block">
                         <div className="absolute top-0 right-0 w-[90%] h-full bg-zinc-100 overflow-hidden rounded-2xl">
                              <Image
                                   src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1000&auto=format&fit=crop"
                                   alt="Pouring coffee"
                                   fill
                                   className="object-cover transition-transform duration-700"
                                   priority
                              />
                         </div>
                    </div>
               </div>
          </section>
     );
}

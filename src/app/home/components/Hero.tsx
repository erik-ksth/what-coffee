import Image from "next/image";
import Link from "next/link";

export default function Hero() {
     return (
          <section className="relative w-full min-h-[90vh] flex items-center bg-background overflow-hidden pt-20">
               {/* Abstract Background Shapes */}
               <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
               <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-zinc-100 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

               <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                         {/* Text Content */}
                         <div className="lg:col-span-7 flex flex-col gap-8 text-center lg:text-left">
                              <div className="inline-flex items-center gap-2 justify-center lg:justify-start">
                                   <span className="w-12 h-px bg-primary"></span>
                                   <span className="text-primary font-medium tracking-widest uppercase text-sm">
                                        Est. 2024
                                   </span>
                              </div>

                              <h1 className="text-6xl md:text-8xl xl:text-9xl font-bold leading-[0.9] tracking-tighter text-foreground">
                                   CRAFT <br />
                                   <span className="relative inline-block">
                                        <span className="relative z-10 text-transparent bg-clip-text bg-linear-to-r from-primary to-orange-600">
                                             COFFEE
                                        </span>
                                        <span className="absolute -bottom-2 left-0 w-full h-[30%] bg-primary/20 -rotate-2 z-0"></span>
                                   </span>
                              </h1>

                              <p className="text-lg md:text-2xl text-zinc-600 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
                                   Experience the perfect blend of atmosphere and aroma.
                                   Where every cup tells a story of passion and precision.
                              </p>

                              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-4">
                                   <Link
                                        href="/menu"
                                        className="px-8 py-4 bg-foreground text-background text-sm font-bold tracking-widest uppercase hover:bg-foreground/90 transition-all rounded-full"
                                   >
                                        View Menu
                                   </Link>
                                   <Link
                                        href="/story"
                                        className="px-8 py-4 border-2 border-zinc-200 text-foreground text-sm font-bold tracking-widest uppercase hover:border-foreground hover:bg-zinc-50 transition-all rounded-full"
                                   >
                                        Our Story
                                   </Link>
                              </div>
                         </div>

                         {/* Image Composition */}
                         <div className="lg:col-span-5 relative">
                              <div className="relative aspect-3/4 md:aspect-square w-full max-w-md mx-auto lg:max-w-none rotate-3 hover:rotate-0 transition-transform duration-700 ease-out">
                                   {/* Decorative Frame */}
                                   <div className="absolute inset-0 border-2 border-primary/20 rounded-t-[100px] rounded-b-[40px] translate-x-4 translate-y-4" />

                                   {/* Main Image Container */}
                                   <div className="relative h-full w-full rounded-t-[100px] rounded-b-[40px] overflow-hidden shadow-2xl bg-zinc-100">
                                        <Image
                                             src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1000&auto=format&fit=crop"
                                             alt="Pouring coffee"
                                             fill
                                             className="object-cover scale-110 hover:scale-100 transition-transform duration-1000"
                                             priority
                                             sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                        {/* Overlay Gradient */}
                                        <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />

                                        {/* Floating Badge */}
                                        <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg max-w-[150px]">
                                             <p className="text-xs font-bold text-foreground uppercase tracking-wider mb-1">Daily Roast</p>
                                             <p className="text-[10px] text-zinc-500">Fresh beans roasted every morning</p>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </section>
     );
}

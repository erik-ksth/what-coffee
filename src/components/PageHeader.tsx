import Image from "next/image";
import { ReactNode } from "react";

interface PageHeaderProps {
     title: string;
     subtitle?: string;
     image: string;
     children?: ReactNode;
}

export default function PageHeader({ title, subtitle, image, children }: PageHeaderProps) {
     return (
          <section className="relative w-full pt-32 pb-16 md:pt-48 md:pb-32 overflow-hidden">
               {/* Background pattern/color */}
               <div className="absolute inset-0 bg-muted/30 -z-20" />

               <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                         {/* Text Content */}
                         <div className="flex-1 flex flex-col gap-6 text-center md:text-left z-10">
                              <div className="space-y-2">
                                   {subtitle && (
                                        <span className="text-primary font-medium tracking-wider uppercase text-sm md:text-base">
                                             {subtitle}
                                        </span>
                                   )}
                                   <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[0.9]">
                                        {title}
                                   </h1>
                              </div>
                              {children && (
                                   <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-4">
                                        {children}
                                   </div>
                              )}
                         </div>

                         {/* Image Composition */}
                         <div className="flex-1 relative w-full aspect-4/3 md:aspect-square lg:aspect-4/3 max-w-2xl mx-auto">
                              {/* Decorative elements */}
                              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
                              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />

                              <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700 ease-out">
                                   <Image
                                        src={image}
                                        alt={title}
                                        fill
                                        className="object-cover"
                                        priority
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                   />
                                   {/* Overlay gradient */}
                                   <div className="absolute inset-0 bg-linear-to-tr from-black/20 to-transparent" />
                              </div>
                         </div>
                    </div>
               </div>
          </section>
     );
}

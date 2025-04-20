import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function ImagesSlider(props:{images:string[]}) {
    const {images}=props;
    if(!images || images.length === 0) {
      return(
        <></>
      )
    }
  return (
<Carousel className="w-full max-w-4xl mx-auto relative">
  <CarouselContent>
    {images?.map((image, index) => (
      <CarouselItem key={index} className="w-full">
        <div className="relative w-full h-72 overflow-hidden rounded-lg">
          <Image
            src={image || "/placeholder_deals.png"}
            alt="Oops error showing"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      </CarouselItem>
    ))}
  </CarouselContent>

  <CarouselPrevious className="left-2 sm:left-4 z-10 bg-white shadow-md rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center" />
  <CarouselNext className="right-2 sm:right-4 z-10 bg-white shadow-md rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center" />
</Carousel>

  
  );
}

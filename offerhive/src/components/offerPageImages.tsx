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
  return (
    <Carousel className="w-full max-w-4xl mx-auto">
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
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
  
  );
}

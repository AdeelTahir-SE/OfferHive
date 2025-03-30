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
    <Carousel className="w-4xl">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index} className="basis-1/3">
            <div className="p-1">
              <Image
                className="text-4xl font-semibold "
                src={image}
                alt="oops error showing !"
                width={300}
                height={300}
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

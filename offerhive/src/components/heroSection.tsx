"use client";

import Button from "./button";
import { BackgroundLines } from "./backgroundLines";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HeroSection() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/providers");
  };

  useEffect(() => {
    router.prefetch("/providers");
  }, []);

  
  return (
    <BackgroundLines className=" pb-[30px] py-[60px] lg:py-[100px]  px-[40px] md:px-[100px] xl:px-[200px] xxl-[450px]  max-h-fit  ">
      <section className="flex flex-col items-center gap-[30px] justify-center   text-center">
        <h1 className="hero-heading text-center z-10 relative max-w-4xl tracking-wide">
          Discover the Best <span className="text-primary">Deals</span> in{" "}
          <span className="text-primary">Universities</span> and Beyond
        </h1>

        <p className="description z-10">
          Explore exclusive deals, events, and communities especially for
          students.
        </p>
        <Button
          text="Browse Offers"
          onClick={handleButtonClick}
          className="z-10"
        />
      </section>
    </BackgroundLines>
  );
}

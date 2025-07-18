"use client";

import Button from "./button";
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
      <section className="flex flex-col items-center gap-[30px] justify-center  py-32 md:py-0 md:h-screen text-center">
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
  );
}

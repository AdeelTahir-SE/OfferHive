"use client";

import { BackgroundLines } from "./backgroundLines";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/providers");
  };

  return (
    <BackgroundLines className="mb-18 md:mb-0">
      <section className="flex flex-col items-center justify-center text-center relative z-0 px-4 py-20 sm:py-24 md:py-32  bg-white">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold max-w-2xl sm:max-w-3xl mb-6 leading-tight z-10 relative">
          Discover the Best Deals in Universities and Beyond
        </h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-md sm:max-w-xl mb-8 relative z-10">
          Explore exclusive deals, events, and communities especially for students.
        </p>
        <button
          className="px-6 py-3 mt-2 sm:mt-8 z-10 cursor-pointer rounded-2xl bg-yellow-500 hover:bg-yellow-400 text-black font-semibold transition duration-200"
          onClick={handleButtonClick}
        >
          Browse Offers
        </button>
      </section>
    </BackgroundLines>
  );
}

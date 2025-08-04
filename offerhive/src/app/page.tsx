"use client";
import FaqSection from "@/components/faqSection";
import { useRouter } from "next/navigation";
import HeroSection from "@/components/heroSection";
import HowItWorksSection from "@/components/howItWorksSection";
import Stats from "@/components/statsSection";
import RedirectIcon from "@/components/redirectComponent";
import WhatWeOffer from "@/components/whatWeOffer";
import OurUsers from "@/components/ourUsers";
export default function Home() {
  const router = useRouter();

  const handleRedirectClick = () => {
    router.prefetch("/documentation");

    router.push("/documentation");
  };

  return (
    <section className="flex flex-col items-center justify-center py-[10px] md:py-[30px] gap-[30px] px-[40px] md:px-[100px] xl:px-[150px] xxl:px-[450px]   max-w-screen">
      <HeroSection />
      <OurUsers />
      {/* <Stats /> */}
      <WhatWeOffer />
      <HowItWorksSection />
      <button
        className="px-6 py-3 mt-2 flex flex-row mb-4 items-center gap-2 sm:mt-8 z-10 cursor-pointer rounded-2xl bg-yellow-500 hover:bg-yellow-400 text-black font-semibold transition duration-200"
        onClick={handleRedirectClick}
      >
        <p>See Documentation</p>
        <RedirectIcon className="max-w-12 w-6 h-6" />
      </button>

      <FaqSection />
    </section>
  );
}

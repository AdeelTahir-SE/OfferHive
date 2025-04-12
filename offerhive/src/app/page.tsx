"use client";

import { useRouter } from "next/navigation";
import HeroSection from "@/components/heroSection";
import HowItWorksSection from "@/components/howItWorksSection";
import WhatOurSaysSection from "@/components/whatOurUsersSaySection";
import RedirectIcon from "@/components/redirectComponent";

export default function Home() {
  const router = useRouter();

  const handleRedirectClick = () => {
    router.push("/documentation");
  };

  return (
    <section className="flex flex-col items-center justify-center">
      <HeroSection />
      <HowItWorksSection />

      <div
        onClick={handleRedirectClick}
        className="flex justify-center items-center transition ease-linear gap-2 hover:bg-yellow-500 hover:scale-90 bg-yellow-400 p-4 text-xl rounded-full font-bold cursor-pointer mt-6"
      >
        <span>Read Documentation</span>
        <RedirectIcon className="max-w-12 w-6 h-6" />
      </div>

      <WhatOurSaysSection />
    </section>
  );
}

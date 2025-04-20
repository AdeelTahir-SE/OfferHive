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
    <section className="flex flex-col items-center justify-center max-w-screen">
      <HeroSection />
      <HowItWorksSection />

          <button
          className="px-6 py-3 mt-2 flex flex-row items-center gap-2 sm:mt-8 z-10 cursor-pointer rounded-2xl bg-yellow-500 hover:bg-yellow-400 text-black font-semibold transition duration-200"
          onClick={handleRedirectClick}
        >
          <p>See Documentation</p>
          <RedirectIcon className="max-w-12 w-6 h-6" />

        </button>

      {/* <WhatOurSaysSection /> */}
    </section>
  );
}

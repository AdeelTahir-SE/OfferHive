import Image from "next/image";
import HeroSection from "@/components/heroSection";
import HowItWorksSection from "@/components/howItWorksSection";
import WhatOurSaysSection from "@/components/whatOurUsersSaySection";
import Link from "next/link";
import RedirectIcon from "@/components/redirectComponent";
export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center">
      <HeroSection />
      <HowItWorksSection />
      <Link href="/documentation" className="flex justify-center items-center transition ease-linear gap-2 hover:bg-yellow-500 hover:scale-90 tra bg-yellow-400 p-4 text-xl rounded-full font-bold ">
        <p className="">
          Read Documentation
        </p>
        <RedirectIcon className="max-w-12 w-6 h-6" />
      </Link>

      <WhatOurSaysSection />
    </section>
  );
}

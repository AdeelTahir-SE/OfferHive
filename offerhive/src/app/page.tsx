import Image from "next/image";
import HeroSection from "@/components/heroSection";
import HowItWorksSection from "@/components/howItWorksSection";
import WhatOurSaysSection from "@/components/whatOurUsersSaySection";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center">
<HeroSection/>
<HowItWorksSection/>
<WhatOurSaysSection/>
    </section>
  );
}

"use client";

import SpotlightCard from "./spotlightCard";
import {
  BriefcaseIcon,
  ChartBarIcon,
  UserGroupIcon,
  SparklesIcon,
  ShieldCheckIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";

export default function WhatWeOffer() {
  const offers = [
    {
      id: 1,
      icon: <BriefcaseIcon className="w-12 h-12 text-primary" />,
      description:
        "Provides a platform for university students to showcase and grow their businesses.",
    },
    {
      id: 2,
      icon: <ChartBarIcon className="w-12 h-12 text-primary" />,
      description:
        "Offers a standardized platform with essential tools and analytics to track performance.",
    },
    {
      id: 3,
      icon: <UserGroupIcon className="w-12 h-12 text-primary" />,
      description:
        "Facilitates community building and networking opportunities across campuses.",
    },
    {
      id: 4,
      icon: <SparklesIcon className="w-12 h-12 text-primary" />,
      description:
        "Curates exclusive deals and offers tailored to student lifestyles.",
    },
    ,
    {
      id: 6,
      icon: <DevicePhoneMobileIcon className="w-12 h-12 text-yellow-500" />,
      description:
        "Mobile-friendly interface so students can manage their offerings on the go.",
    },
    {
      id: 7,
      icon: <ShieldCheckIcon className="w-12 h-12 text-yellow-500" />,
      description:
        "Secure payment integrations to ensure safe transactions and trust.",
    },
  ];

  return (
    <section className="py-16 px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {offers.map((offer) => (
        <SpotlightCard
          key={offer?.id}
          spotlightColor="rgba(255, 203, 0, 0.65)"
          className="h-full"
        >
          <section className="flex flex-col items-center justify-center gap-[30px]">
            {offer?.icon}
            <p className="text-black font-semibold text-center">{offer?.description}</p>
          </section>
        </SpotlightCard>
      ))}
    </section>
  );
}

// components/WhatWeOffer.tsx
"use client";

import SpotlightCard from "./spotlightCard";
import { motion } from "framer-motion";
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
      icon: <BriefcaseIcon className="w-12 h-12 text-yellow-500" />,
      description:
        "Provides a platform for university students to showcase and grow their businesses.",
    },
    {
      id: 2,
      icon: <ChartBarIcon className="w-12 h-12 text-yellow-500" />,
      description:
        "Offers a standardized platform with essential tools and analytics to track performance.",
    },
    {
      id: 3,
      icon: <UserGroupIcon className="w-12 h-12 text-yellow-500" />,
      description:
        "Facilitates community building and networking opportunities across campuses.",
    },
    {
      id: 4,
      icon: <SparklesIcon className="w-12 h-12 text-yellow-500" />,
      description:
        "Curates exclusive deals and offers tailored to student lifestyles.",
    },
    {
      id: 5,
      icon: <DevicePhoneMobileIcon className="w-12 h-12 text-yellow-500" />,
      description:
        "Mobile-friendly interface so students can manage their offerings on the go.",
    },
    {
      id: 6,
      icon: <ShieldCheckIcon className="w-12 h-12 text-yellow-500" />,
      description:
        "Secure payment integrations to ensure safe transactions and trust.",
    },
  ];

  const cardVariant = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <section className="py-16 px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {offers.map((offer, i) => (
        <motion.div
          key={offer.id}
          variants={cardVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
        >
          <SpotlightCard
            spotlightColor="rgba(255, 203, 0, 0.65)"
            className="h-full"
          >
            <div className="flex flex-col items-center justify-center gap-6 p-6">
              {offer.icon}
              <p className="text-gray-800 font-semibold text-center">
                {offer.description}
              </p>
            </div>
          </SpotlightCard>
        </motion.div>
      ))}
    </section>
  );
}

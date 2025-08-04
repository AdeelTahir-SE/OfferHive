// components/WhatWeOffer.tsx
"use client";

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
      title: "Business Showcase",
      description:
        "Provides a platform for university students to showcase and grow their businesses.",
      color: "from-yellow-400 to-orange-500",
    },
    {
      id: 2,
      icon: <ChartBarIcon className="w-12 h-12 text-yellow-500" />,
      title: "Analytics & Tools",
      description:
        "Offers a standardized platform with essential tools and analytics to track performance.",
      color: "from-blue-400 to-purple-500",
    },
    {
      id: 3,
      icon: <UserGroupIcon className="w-12 h-12 text-yellow-500" />,
      title: "Community Building",
      description:
        "Facilitates community building and networking opportunities across campuses.",
      color: "from-green-400 to-cyan-500",
    },
    {
      id: 4,
      icon: <SparklesIcon className="w-12 h-12 text-yellow-500" />,
      title: "Exclusive Deals",
      description:
        "Curates exclusive deals and offers tailored to student lifestyles.",
      color: "from-pink-400 to-red-500",
    },
    {
      id: 5,
      icon: <DevicePhoneMobileIcon className="w-12 h-12 text-yellow-500" />,
      title: "Mobile First",
      description:
        "Mobile-friendly interface so students can manage their offerings on the go.",
      color: "from-indigo-400 to-blue-500",
    },
    {
      id: 6,
      icon: <ShieldCheckIcon className="w-12 h-12 text-yellow-500" />,
      title: "Secure Payments",
      description:
        "Secure payment integrations to ensure safe transactions and trust.",
      color: "from-emerald-400 to-teal-500",
    },
  ];

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariant = {
    hidden: { 
      opacity: 0, 
      y: 50, 
      scale: 0.9,
      rotateX: -15,
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
  };

  const iconVariant = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
        delay: 0.3,
      },
    },
  };

  const titleVariant = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        delay: 0.4,
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const descriptionVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay: 0.5,
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-20 px-8 ">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-16"
      >
        <motion.h2 
          className="heading-1 mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          What We Offer
        </motion.h2>
        <motion.p 
          className="description mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Empowering student entrepreneurs with everything they need to succeed
        </motion.p>
      </motion.div>

      {/* Cards Grid */}
      <motion.div
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
      >
        {offers.map((offer, i) => (
          <motion.div
            key={offer.id}
            variants={cardVariant}
            whileHover={{ 
              scale: 1.05, 
              y: -10,
              transition: { type: "spring", stiffness: 300, damping: 10 }
            }}
            whileTap={{ scale: 0.95 }}
            className="group"
          >
            <motion.div
              className="h-full overflow-hidden"
            >
              <div className="relative flex flex-col items-center justify-center gap-6 p-8 h-full">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${offer.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                {/* Icon with enhanced animation */}
                <motion.div 
                  variants={iconVariant}
                  className="relative z-10"
                  whileHover={{ 
                    rotate: [0, -10, 10, -10, 0],
                    scale: 1.1,
                    transition: { duration: 0.5 }
                  }}
                >
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-yellow-50 to-orange-50 group-hover:from-yellow-100 group-hover:to-orange-100 transition-all duration-300 shadow-lg">
                    {offer.icon}
                  </div>
                </motion.div>

                {/* Title */}
                <motion.h3 
                  variants={titleVariant}
                  className="text-2xl font-bold text-gray-800 text-center relative z-10"
                >
                  {offer.title}
                </motion.h3>

                {/* Description */}
                <motion.p 
                  variants={descriptionVariant}
                  className="text-gray-600 text-center leading-relaxed relative z-10 group-hover:text-gray-700 transition-colors duration-300"
                >
                  {offer.description}
                </motion.p>

                {/* Hover indicator */}
                <motion.div
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: 0.6 + i * 0.1, duration: 0.8 }}
                />
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1, duration: 0.8 }}
        className="text-center mt-16"
      >

      </motion.div>
    </section>
  );
}
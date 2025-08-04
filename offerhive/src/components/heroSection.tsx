// components/HeroSection.tsx
"use client";

import Button from "./button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  SparklesIcon,
  AcademicCapIcon,
  UserGroupIcon,
  TrophyIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

export default function HeroSection() {
  const router = useRouter();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleButtonClick = () => {
    router.push("/providers");
  };

  useEffect(() => {
    router.prefetch("/providers");
  }, []);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Floating icons data
  const floatingIcons = [
    { 
      Icon: SparklesIcon, 
      delay: 0, 
      duration: 6, 
      initialX: "10%", 
      initialY: "20%",
      color: "text-yellow-400"
    },
    { 
      Icon: AcademicCapIcon, 
      delay: 1, 
      duration: 8, 
      initialX: "85%", 
      initialY: "15%",
      color: "text-blue-400"
    },
    { 
      Icon: UserGroupIcon, 
      delay: 2, 
      duration: 7, 
      initialX: "20%", 
      initialY: "70%",
      color: "text-green-400"
    },
    { 
      Icon: TrophyIcon, 
      delay: 3, 
      duration: 9, 
      initialX: "80%", 
      initialY: "75%",
      color: "text-purple-400"
    },
  ];

  // Animation variants
  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const titleVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  // Typing animation for highlighted words
  const TypingText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
    const [displayText, setDisplayText] = useState("");
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        let i = 0;
        const typeTimer = setInterval(() => {
          setDisplayText(text.slice(0, i + 1));
          i++;
          if (i >= text.length) {
            clearInterval(typeTimer);
            setTimeout(() => setShowCursor(false), 500);
          }
        }, 100);
      }, delay);

      return () => clearTimeout(timer);
    }, [text, delay]);

    return (
      <span className="text-primary relative">
        {displayText}
        {showCursor && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="ml-1"
          >
            |
          </motion.span>
        )}
      </span>
    );
  };

  return (
    <section className="relative flex flex-col items-center gap-[30px] justify-center py-32 md:py-0 md:h-screen text-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(255,203,0,0.3) 0%, transparent 70%)",
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)",
            transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`,
          }}
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <defs>
              <pattern id="hero-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#hero-grid)" />
          </svg>
        </div>

        {/* Floating Icons */}
        {floatingIcons.map((item, index) => (
          <motion.div
            key={index}
            className={`absolute w-8 h-8 ${item.color} opacity-30`}
            style={{
              left: item.initialX,
              top: item.initialY,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: item.duration,
              delay: item.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <item.Icon className="w-full h-full" />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariant}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-6xl mx-auto px-4"
      >
        {/* Badge */}
        <motion.div
          variants={itemVariant}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-200 text-yellow-800 font-medium mb-8"
        >
          <SparklesIcon className="w-4 h-4" />
          <span className="text-sm">🎉 Join Student Entrepreneurs</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1 
          variants={titleVariant}
          className="hero-heading text-center z-10 relative max-w-4xl tracking-wide mb-6"
        >
          Discover the Best{" "}
          <motion.span
            initial={{ backgroundSize: "0% 100%" }}
            animate={{ backgroundSize: "100% 100%" }}
            transition={{ delay: 1.5, duration: 1 }}
            className="text-primary relative inline-block  bg-bottom"
          >
            <TypingText text="Deals" delay={1000} />
          </motion.span>{" "}
          in{" "}
          <motion.span
            initial={{ backgroundSize: "0% 100%" }}
            animate={{ backgroundSize: "100% 100%" }}
            transition={{ delay: 2.5, duration: 1 }}
            className="text-primary relative inline-block bg-bottom"
          >
            <TypingText text="Universities" delay={2000} />
          </motion.span>{" "}
          and Beyond
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          variants={itemVariant}
          className="description z-10 max-w-2xl mx-auto text-lg leading-relaxed mb-8"
        >
          Explore exclusive deals, events, and communities especially for
          students. Connect with fellow entrepreneurs and grow your business.
        </motion.p>

        {/* Stats Bar */}
        {/* <motion.div
          variants={itemVariant}
          className="flex flex-wrap justify-center gap-8 mb-10 text-sm text-gray-600"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span>12,500+ Students</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <span>85+ Universities</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
            <span>$2.8M+ Generated</span>
          </div>
        </motion.div> */}

        {/* CTA Buttons */}
        <motion.div 
          variants={itemVariant}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 z-10"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              text="Browse Offers"
              onClick={handleButtonClick}
              className="z-10 relative group overflow-hidden"
            />
          </motion.div>

          {/* <motion.button
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 text-gray-700 font-medium hover:text-gray-900 transition-colors duration-200"
          >
            Watch Demo
            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </motion.button> */}
        </motion.div>

        {/* Trust Indicators */}
        {/* <motion.div
          variants={itemVariant}
          className="mt-16 text-center"
        >
          <p className="text-sm text-gray-500 mb-4">Trusted by students from</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {["Harvard", "MIT", "Stanford", "Yale", "Princeton"].map((university, index) => (
              <motion.div
                key={university}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.6, y: 0 }}
                transition={{ delay: 3 + index * 0.1, duration: 0.5 }}
                className="text-sm font-medium text-gray-600"
              >
                {university}
              </motion.div>
            ))}
          </div>
        </motion.div> */}
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-1 h-3 bg-gray-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
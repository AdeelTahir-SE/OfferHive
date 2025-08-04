// components/Stats.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  UserGroupIcon,
  AcademicCapIcon,
  CurrencyDollarIcon,
  BuildingOffice2Icon,
  TrophyIcon,
  ChartBarIcon,
  StarIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Intersection Observer to trigger animations when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      id: 1,
      icon: <UserGroupIcon className="w-8 h-8" />,
      number: 12500,
      suffix: "+",
      label: "Active Students",
      description: "Entrepreneurs across campuses",
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50",
    },
    {
      id: 2,
      icon: <AcademicCapIcon className="w-8 h-8" />,
      number: 85,
      suffix: "+",
      label: "Universities",
      description: "Partner institutions",
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50",
    },
    {
      id: 3,
      icon: <CurrencyDollarIcon className="w-8 h-8" />,
      number: 2.8,
      suffix: "M+",
      label: "Revenue Generated",
      description: "For student businesses",
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50",
    },
    {
      id: 4,
      icon: <ShoppingBagIcon className="w-8 h-8" />,
      number: 45000,
      suffix: "+",
      label: "Products & Services",
      description: "Listed on platform",
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-50 to-red-50",
    },
    {
      id: 5,
      icon: <StarIcon className="w-8 h-8" />,
      number: 4.9,
      suffix: "/5",
      label: "Average Rating",
      description: "Customer satisfaction",
      color: "from-yellow-500 to-orange-500",
      bgColor: "from-yellow-50 to-orange-50",
    },
    {
      id: 6,
      icon: <TrophyIcon className="w-8 h-8" />,
      number: 1200,
      suffix: "+",
      label: "Success Stories",
      description: "Businesses grown 10x+",
      color: "from-indigo-500 to-purple-500",
      bgColor: "from-indigo-50 to-purple-50",
    },
  ];

  // Animated counter hook
  const useAnimatedCounter = (end: number, duration: number = 2000, delay: number = 0) => {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
      if (!isVisible || hasStarted) return;

      setHasStarted(true);
      const startTime = Date.now() + delay;
      const endTime = startTime + duration;

      const timer = setInterval(() => {
        const now = Date.now();
        if (now < startTime) return;

        const progress = Math.min((now - startTime) / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOutQuart * end));

        if (now >= endTime) {
          setCount(end);
          clearInterval(timer);
        }
      }, 16);

      return () => clearInterval(timer);
    }, [isVisible, end, duration, delay, hasStarted]);

    return count;
  };

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariant = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.8,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
  };

  const StatCard = ({ stat, index }: { stat: typeof stats[0], index: number }) => {
    const animatedNumber = useAnimatedCounter(stat.number, 2000, index * 200);

    return (
      <motion.div
        variants={cardVariant}
        whileHover={{ 
          scale: 1.05, 
          y: -10,
          transition: { type: "spring", stiffness: 300, damping: 10 }
        }}
        className="group relative"
      >
        <div className="relative overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 p-8">
          {/* Background Gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
          
          {/* Floating Elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-gradient-to-br from-yellow-200/20 to-orange-200/20 group-hover:scale-110 transition-transform duration-500" />
          <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-gradient-to-br from-blue-200/10 to-purple-200/10 group-hover:scale-110 transition-transform duration-700" />

          {/* Icon */}
          <motion.div 
            className={`relative z-10 inline-flex p-4 rounded-2xl bg-gradient-to-br ${stat.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
            whileHover={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.5 }}
          >
            {stat.icon}
          </motion.div>

          {/* Number */}
          <div className="relative z-10 mb-4">
            <motion.div 
              className="text-4xl md:text-5xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-300"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
              transition={{ delay: index * 0.2 + 0.5, duration: 0.8, type: "spring" }}
            >
              {stat.suffix === "/5" ? animatedNumber.toFixed(1) : animatedNumber.toLocaleString()}
              <span className={`bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.suffix}
              </span>
            </motion.div>
          </div>

          {/* Label */}
          <h3 className="relative z-10 text-xl font-bold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors duration-300">
            {stat.label}
          </h3>

          {/* Description */}
          <p className="relative z-10 text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
            {stat.description}
          </p>

          {/* Progress Bar */}
          <motion.div
            className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${stat.color} rounded-full`}
            initial={{ width: 0 }}
            animate={isVisible ? { width: "100%" } : { width: 0 }}
            transition={{ delay: index * 0.2 + 1, duration: 1.5, ease: "easeOut" }}
          />
        </div>
      </motion.div>
    );
  };

  return (
    <section 
      ref={sectionRef}
      className="py-20 px-8 bg-gradient-to-br from-white via-gray-50 to-blue-50 relative overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-br from-yellow-200/20 to-orange-200/20" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-gradient-to-br from-blue-200/20 to-purple-200/20" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <svg className="w-full h-full opacity-5" viewBox="0 0 100 100">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 text-white mb-6"
          >
            <ChartBarIcon className="w-8 h-8" />
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Empowering Student Success
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Join thousands of student entrepreneurs who are building their future, one business at a time
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {stats.map((stat, index) => (
            <StatCard key={stat.id} stat={stat} index={index} />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-center mt-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <button className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 group">
              <span className="flex items-center gap-2">
                Join Our Community
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  →
                </motion.div>
              </span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
// components/FAQ.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./button";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  AcademicCapIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
  DevicePhoneMobileIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const faqData = [
    {
      id: 1,
      category: "Getting Started",
      icon: <AcademicCapIcon className="w-5 h-5" />,
      question: "Who can join this platform?",
      answer: "Any student with a valid email address can join our platform. Whether you're running a small side business, offering tutoring services, or selling handmade products, you're welcome to showcase your entrepreneurial spirit here."
    },
    {
      id: 2,
      category: "Getting Started",
      icon: <AcademicCapIcon className="w-5 h-5" />,
      question: "How do I get started on the platform?",
      answer: "Getting started is simple! Sign up with your university email, verify your student status, create your business profile, upload photos of your products/services, and start connecting with fellow students on your campus."
    },
   
    {
      id: 4,
      category: "Payments",
      icon: <CurrencyDollarIcon className="w-5 h-5" />,
      question: "What are the fees?",
      answer: "Ou platform is fully free Any student with a passion for business can join and use the platform without any financial cost."
    },
    // {
    //   id: 5,
    //   category: "Safety",
    //   icon: <ShieldCheckIcon className="w-5 h-5" />,
    //   question: "Is it safe to buy and sell on the platform?",
    //   answer: "Absolutely! We verify all users with their emails to . All transactions are secure and protected."
    // },
    // {
    //   id: 6,
    //   category: "Safety",
    //   icon: <ShieldCheckIcon className="w-5 h-5" />,
    //   question: "What if there's an issue with my order?",
    //   answer: "We have a comprehensive dispute resolution system. If you encounter any issues with your order, contact our support team within 48 hours. We offer mediation services, refund protection, and will work with both parties to find a fair solution."
    // },
    {
      id: 7,
      category: "Features",
      icon: <DevicePhoneMobileIcon className="w-5 h-5" />,
      question: "Is there a mobile app?",
      answer: "While we don't have a dedicated mobile app yet, our website is fully mobile-optimized and works seamlessly on all devices. You can access all features, manage your business, and communicate with customers directly from your phone's browser."
    },
    {
      id: 8,
      category: "Features",
      icon: <UserGroupIcon className="w-5 h-5" />,
      question: "Can I connect with students from other universities?",
      answer: "Currently, the platform focuses on connecting students within the same university to build strong local communities. However, we're exploring options to enable inter-university connections for certain types of businesses and services in the future."
    },
    {
      id: 9,
      category: "Business",
      icon: <QuestionMarkCircleIcon className="w-5 h-5" />,
      question: "What types of businesses can I promote?",
      answer: "You can promote almost any legal student business! This includes tutoring services, food delivery, handmade crafts, digital services, event planning, photography, study materials, tech support, and much more. Just ensure your business complies with university policies."
    },
    {
      id: 10,
      category: "Business",
      icon: <QuestionMarkCircleIcon className="w-5 h-5" />,
      question: "How do I track my business performance?",
      answer: "Our analytics dashboard provides comprehensive insights including no of clicks and we are currently working on adding more features."
    }
  ];

  const categories = ["All", ...Array.from(new Set(faqData.map(faq => faq.category)))];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
  };

  return (
    <section className="py-20 px-8 ">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <motion.h2 
            className="heading-1 mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p 
            className="description mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Got questions? We've got answers! Find everything you need to know about our platform.
          </motion.p>
        </motion.div>

        {/* Search Bar */}
{/* <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="relative max-w-md mx-auto">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all duration-300 bg-white shadow-sm"
            />
          </div>
        </motion.div>

        <motion.div 
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-yellow-300 hover:bg-yellow-50"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div> */}
        {/* FAQ Items */}
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-4"
        >
          <AnimatePresence>
            {filteredFAQs.map((faq, index) => (
              <motion.div
                key={faq.id}
                variants={itemVariant}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                <motion.button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition duration-200"
                  whileHover={{ backgroundColor: "rgba(249, 250, 251, 0.8)" }}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 p-2 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-50">
                      {faq.icon}
                    </div>
                    <div>
                      <span className="inline-block px-3 py-1 text-xs font-medium text-yellow-700 bg-yellow-100 rounded-full mb-2">
                        {faq.category}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {faq.question}
                      </h3>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex-shrink-0"
                  >
                    <ChevronDownIcon className="w-6 h-6 text-gray-400" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden "
                    >
                      <div className="px-6 pb-6 pl-16">
                        <motion.p 
                          initial={{ y: -10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.1, duration: 0.3 }}
                          className="text-gray-600 leading-relaxed"
                        >
                          {faq.answer}
                        </motion.p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results */}
        {filteredFAQs.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <QuestionMarkCircleIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No FAQs found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}

        {/* Still Have Questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-16 p-8 flex flex-col items-center justify-center rounded-3xl border border-yellow-100"
        >
          <QuestionMarkCircleIcon className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Still have questions?</h3>
          <p className="text-gray-600 mb-6">Can't find what you're looking for? Our support team is here to help!</p>
          <Link
            href="/contact"
            className="px-[20px] py-[12px] max-w-fit  cursor-pointer rounded-2xl bg-primary hover:bg-secondary text-black font-semibold flex flex-row items-center justify-center gap-[10px] transition duration-200"
          >
            Contact Support
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
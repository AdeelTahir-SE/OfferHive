// components/HowItWorksSection.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HowItWorksSection() {
  const stepVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="flex flex-col items-start justify-center max-w-fit">
      <motion.h1
        className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight mb-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={stepVariant}
        transition={{ duration: 0.6 }}
      >
        How it Works
      </motion.h1>

      <motion.h2
        className="heading-2"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={stepVariant}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Requesting providers about deals and offers
      </motion.h2>

      <motion.div
        className="flex flex-col items-center justify-center sm:flex-row gap-[30px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={stepVariant}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <p className="description">
          Click on a provider to explore their available offers. <br />
          You can search for offerers based on the title of the offer, or simply
          keep scrolling to browse offers that match your needs and preferences.
          Discover deals tailored to your interests with ease.
        </p>
        <Image
          src="/image.png"
          alt="Browsing offers"
          className="object-fit xl:min-w-[200px] rounded-lg"
          width={300}
          height={300}
        />
      </motion.div>

      <motion.div
        className="flex flex-col items-center justify-center sm:flex-row gap-[30px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={stepVariant}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <p className="description">
          After signing up and signing in, you can chat directly with offerers
          and ask about their deals. <br />
          To start a chat, simply click on the chat button shown on the right
          side of the offerer&apos;s shop page. This allows you to connect with
          them instantly and get more details about any offers that interest
          you.
        </p>
        <Image
          src="/chatButton.PNG"
          alt="chat Button"
          className="object-fit xl:min-w-[200px] rounded-lg"
          width={300}
          height={300}
        />
      </motion.div>
    </section>
  );
}

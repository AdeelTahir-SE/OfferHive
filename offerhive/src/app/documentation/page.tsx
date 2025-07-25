"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "@/components/button";
import { motion } from "framer-motion";

export default function Documentation() {
  const router = useRouter();

  const handleRedirectClick = () => {
    router.push("/terms&policy");
  };

  const variant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="flex flex-col items-center justify-center py-[40px] gap-[50px] px-[40px] md:px-[100px] xl:px-[200px] xxl:px-[450px]">
      <motion.h1
        className="heading-1 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={variant}
        transition={{ duration: 0.6 }}
      >
        How it Works
      </motion.h1>

      <motion.h2
        className="heading-2"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={variant}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Requesting providers about deals and offers
      </motion.h2>

      <motion.div
        className="flex flex-col items-center justify-center sm:flex-row gap-[30px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={variant}
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
        variants={variant}
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
          src="/chatButton.png"
          alt="chat Button"
          className="object-fit xl:min-w-[200px] rounded-lg"
          width={300}
          height={300}
        />
      </motion.div>

      <motion.h2
        className="heading-2 mt-[30px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={variant}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        Creating offer
      </motion.h2>

      <motion.div
        className="flex flex-col sm:flex-row items-center justify-center gap-[30px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={variant}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <p className="description">
          Click on an offerer to explore their available offers. <br />
          You can search for offerers based on the title of the offer, or simply
          keep scrolling to browse offers that match your needs and preferences.
          Discover deals tailored to your interest with ease.
        </p>

        <Image
          src="/offers.PNG"
          alt="Offers"
          className="object-fit xl:min-w-[200px] rounded-lg"
          width={300}
          height={300}
        />
      </motion.div>

      <motion.div
        className="flex flex-col sm:flex-row items-center justify-center gap-[30px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={variant}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <p className="description">
          To create an offer, you first need to create a shop. <br />
          While creating your shop, make sure to add relevant tags related to
          the services you provide, any useful links such as your website, and
          your contact information. <br />
          Once your shop is created, you can head over to the offers section to
          start creating and showcasing your offers.
        </p>

        <Image
          src="/createShop.PNG"
          alt="create Shop"
          className="object-fit xl:min-w-[200px] rounded-lg"
          width={300}
          height={300}
        />
      </motion.div>

      <motion.div
        className="flex flex-col sm:flex-row items-center justify-center gap-[30px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={variant}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <p className="description">
          The dashboard provides insights such as the number of clicks on your
          service card, along with a dedicated section to chat with your
          customers. <br />
          More exciting features will be added in the future to help you grow
          and manage your services more effectively.
        </p>
        <Image
          src="/dashboard.PNG"
          alt="dashboard "
          className="object-fit xl:min-w-[200px] rounded-lg"
          width={300}
          height={300}
        />{" "}
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={variant}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <Button
          onClick={handleRedirectClick}
          text="See Terms & Policy"
          redirectIcon={true}
          className="bg-gray-500"
        />
      </motion.div>
    </section>
  );
}

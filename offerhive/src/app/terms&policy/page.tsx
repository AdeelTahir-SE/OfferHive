"use client";

import { motion } from "framer-motion";

export default function TermsAndPolicy() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="min-h-screen px-6 py-10 bg-white flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="max-w-3xl bg-yellow-100 p-8 rounded-xl shadow-lg w-full"
      >
        <h1 className="text-4xl font-extrabold text-black mb-6 text-center">
          Terms & Policies
        </h1>
        <ul className="list-disc pl-6 space-y-4 text-lg text-gray-800">
          <li>No promotion or listing of Israeli products is allowed.</li>
          <li>Any image or content containing vulgarity is strictly prohibited.</li>
          <li>
            Images objectifying women for the sake of attracting more sales are
            not permitted.
          </li>
          <li>
            Shops with incorrect or irrelevant purposes may be removed without
            notice.
          </li>
          <li>
            OfferHive reserves the right to remove any shop found to be violating
            or non-violating our policies if needed.
          </li>
        </ul>
      </motion.div>
    </motion.section>
  );
}

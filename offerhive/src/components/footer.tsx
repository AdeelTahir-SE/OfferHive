import Image from "next/image";
import Link from "next/link";
import { Briefcase } from "lucide-react"; 
import * as motion from "motion/react-client"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-10 px-4 bottom-0 relative ">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex items-center justify-center md:justify-start space-x-6  ">
          <Link
            href="https://www.instagram.com/offer__hive?utm_source=qr&igsh=Nml0dzV4ZHBqcTZn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/instagram.svg"
              alt="Instagram"
              width={35}
              height={35}
              className="hover:scale-110 transition-transform"
            />
          </Link>
          <Link
            href="https://github.com/AdeelTahir-SE"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/github.svg"
              alt="GitHub"
              width={35}
              height={35}
              className="hover:scale-110 transition-transform"
            />
          </Link>
          <Link
            href="www.linkedin.com/in/adeel-tahir-fullstackdeveoper"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/linkedIn.svg"
              alt="LinkedIn"
              width={35}
              height={35}
              className="hover:scale-110 transition-transform"
            />
          </Link>
        </div>

        <div className="flex flex-col items-center space-y-4 text-sm font-medium">
          <Link
            href="/"
            className="hover:underline hover:text-yellow-400 transition duration-300"
          >
            Home
          </Link>
          <Link
            href="/contact"
            className="hover:underline hover:text-yellow-400 transition duration-300"
          >
            Contact
          </Link>
          <Link
            href="/providers"
            className="hover:underline hover:text-yellow-400 transition duration-300"
          >
            Providers
          </Link>
          <p className="text-yellow-300 mt-2">
            🚀 Many new things coming soon...
          </p>
        </div>

        <div className="flex flex-col items-center justify-center  gap-4  text-sm">
          <div className="flex flex-col items-center justify-center">
            <p className="mb-2">Need help? Email us at</p>
            <p className="text-yellow-400 hover:underline">
              adeeltahir6a@gmail.com
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="mb-2 flex items-center gap-2">
              <motion.div
                animate={{ y: [0, -5, 0] }} 
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Briefcase className="w-5 h-5 text-yellow-400" />
              </motion.div>
              Check out our other services:
            </div>
            <Link href="/services" className="text-yellow-400 hover:underline cursor-pointer transition duration-300 hover:scale-105">
              Services
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} OfferHive. All rights reserved.
      </div>
    </footer>
  );
}

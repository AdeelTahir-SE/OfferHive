import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-10 px-4  ">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        <div className="flex items-center justify-center md:justify-start space-x-6">
          {/* <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <Image src="/facebook.svg" alt="Facebook" width={28} height={28} className="hover:scale-110 transition-transform" />
          </a>
          */}
          <a href="https://www.instagram.com/offer__hive?utm_source=qr&igsh=Nml0dzV4ZHBqcTZn" target="_blank" rel="noopener noreferrer">
            <Image src="/instagram.svg" alt="Instagram" width={28} height={28} className="hover:scale-110 transition-transform" />
          </a>
         <a href="https://github.com/AdeelTahir-SE" target="_blank" rel="noopener noreferrer">
            <Image src="/github.svg" alt="GitHub" width={28} height={28} className="hover:scale-110 transition-transform" />
          </a>
        </div>

        <div className="flex flex-col items-center space-y-4 text-sm font-medium">
          <Link href="/" className="hover:underline hover:text-yellow-400 transition duration-300">Home</Link>
          <Link href="/contact" className="hover:underline hover:text-yellow-400 transition duration-300">Contact</Link>
          <Link href="/providers" className="hover:underline hover:text-yellow-400 transition duration-300">Providers</Link>
          <p className="text-yellow-300 mt-2">🚀 Many new things coming soon...</p>
        </div>

        <div className="flex flex-col items-center md:items-end text-sm">
          <p className="mb-2">Need help? Email us at</p>
          <p className="text-yellow-400 hover:underline">adeeltahir6a@gmail.com</p>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} OfferHive. All rights reserved.
      </div>
    </footer>
  );
}

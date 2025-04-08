import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-10 px-4 mt-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Social Icons */}
        <div className="flex items-center justify-center md:justify-start space-x-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <Image src="/facebook.svg" alt="Facebook" width={28} height={28} className="hover:scale-110 transition-transform" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Image src="/instagram.svg" alt="Instagram" width={28} height={28} className="hover:scale-110 transition-transform" />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <Image src="/github.svg" alt="GitHub" width={28} height={28} className="hover:scale-110 transition-transform" />
          </a>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col items-center space-y-4 text-sm font-medium">
          <Link href="/" className="hover:underline hover:text-yellow-400 transition duration-300">Home</Link>
          <Link href="/contact" className="hover:underline hover:text-yellow-400 transition duration-300">Contact</Link>
          <Link href="/offers" className="hover:underline hover:text-yellow-400 transition duration-300">Offers</Link>
        </div>

        {/* Extra Info or Logo */}
        <div className="flex flex-col items-center md:items-end text-sm">
          <p className="mb-2">Need help? Email us at</p>
          <a href="mailto:support@offerhive.com" className="text-yellow-400 hover:underline">support@offerhive.com</a>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="mt-8 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} OfferHive. All rights reserved.
      </div>
    </footer>
  );
}

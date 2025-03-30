import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center bg-gray-100 rounded-xl border-t-2 absolute bottom-0 border-gray-300  py-6 w-full">
      <section className=" rounded-2xl  p-6 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {/* Social Media Logos */}
        <section className="flex flex-row items-center justify-center space-x-6">
          <Image src="/facebook.svg" alt="Facebook" width={30} height={30} />
          <Image src="/instagram.svg" alt="Instagram" width={30} height={30} />
          <Image src="/github.svg" alt="GitHub" width={30} height={30} />
        </section>
        
        {/* Navigation Links */}
        <section className="flex flex-col items-center justify-center">
          <ul className="flex flex-col items-center justify-center gap-4 font-semibold">
            <li><Link href="/"><span className="hover:text-white">Home</span></Link></li>
            <li><Link href="/contact"><span className="hover:text-white">Contact</span></Link></li>
            <li><Link href="/offers"><span className="hover:text-white">Offers</span></Link></li>
          </ul>
        </section>
        
        {/* Empty Placeholder (Can be used for additional content) */}
        <section className="flex flex-col items-center justify-center"></section>
      </section>
      
      {/* Copyright Section */}
      <section className="mt-4 text-sm text-black">
        All rights reserved {new Date().getFullYear()} OfferHive
      </section>
    </footer>
  );
}

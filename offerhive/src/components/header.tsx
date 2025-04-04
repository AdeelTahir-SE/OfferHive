import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <nav className="bg-yellow-500 text-black p-4 flex justify-between items-center">
            <Image
                src="/logo.svg"
                alt="logo"
                width={60}
                height={60}
            />
            <ul className="flex space-x-6 font-semibold">
               <Link href="/"> <li className="hover:text-white transition-colors">Home</li></Link>
               <Link href="/contact"><li className="hover:text-white transition-colors">Contact</li></Link>
               <Link href="/offers"><li className="hover:text-white transition-colors">Offers</li></Link>
               <Link href="/groups"><li className="hover:text-white transition-colors">Groups</li></Link>
            </ul>
        </nav>
    );
}

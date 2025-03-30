import Image from "next/image";

export default function Header() {
    return (
        <nav className="bg-yellow-500 text-black p-4 flex justify-between items-center">
            <Image
                src="/logo.svg"
                alt="logo"
                width={100}
                height={100}
            />
            <ul className="flex space-x-6 font-semibold">
                <li className="hover:text-white transition-colors">Home</li>
                <li className="hover:text-white transition-colors">Contact</li>
                <li className="hover:text-white transition-colors">Offers</li>
            </ul>
        </nav>
    );
}

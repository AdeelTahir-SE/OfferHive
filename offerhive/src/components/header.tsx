"use client"
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
export default function Header() {
  const user = useSelector((state: any) => state.user);
  return (
    <nav className="bg-yellow-500 text-black p-4 flex justify-between items-center">
      <Image src="/logo.svg" alt="logo" width={60} height={60} />
      <ul className="flex space-x-6 font-semibold items-center">
        <Link href="/">
          {" "}
          <li className="hover:text-white transition-colors">Home</li>
        </Link>
        <Link href="/contact">
          <li className="hover:text-white transition-colors">Contact</li>
        </Link>
        <Link href="/offers">
          <li className="hover:text-white transition-colors">Offers</li>
        </Link>
        <Link href="/groups">
          <li className="hover:text-white transition-colors">Groups</li>
        </Link>
        {user?.email ? (
          <Link href="/profile">
            <li className="hover:text-yellow-400 transition-colors rounded-full p-2 bg-gray-200 border-yellow-700 m-1">{user.email}</li>
          </Link>
        ) : (
          <Link href="/logIn">
            <li className="hover:text-white transition-colors">Sign In</li>
          </Link>
        )}
      </ul>
    </nav>
  );
}

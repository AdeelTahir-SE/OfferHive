"use client";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Header() {
  const user = useSelector((state: any) => state.user);
  console.log("owner", user?.is_shop_owner);

  return (
    <nav className="bg-yellow-500 text-black p-4 flex justify-between items-center">
      <Image src="/logo.svg" alt="logo" width={60} height={60} />

      <ul className="flex space-x-6 font-semibold items-center">
        <li className="hover:text-white transition-colors">
          <Link href="/people/7c6c8674-4a74-4bec-8f77-56c78e4ac499">a</Link>
        </li>
        <li className="hover:text-white transition-colors">
          <Link href="/">Home</Link>
        </li>
        <li className="hover:text-white transition-colors">
          <Link href="/contact">Contact</Link>
        </li>
        <li className="hover:text-white transition-colors">
          <Link href="/offers">Offerers</Link>
        </li>
        <li className="hover:text-white transition-colors">
          <Link href="/groups">Groups</Link>
        </li>
        
        {user?.is_shop_owner ? (
          <li className="hover:text-white transition-colors">
            <Link href="/shop/dashboard">My Shop</Link>
          </li>
        ) : (
          <li className="hover:text-white transition-colors">
            <Link href="/createStore">Create Shop</Link>
          </li>
        )}

        {user?.email ? (
          <li className="hover:text-yellow-400 transition-colors rounded-full p-2 bg-gray-200 border-yellow-700 m-1">
            <Link href="/profile">{user.email}</Link>
          </li>
        ) : (
          <li className="hover:text-white transition-colors">
            <Link href="/logIn">Sign In</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

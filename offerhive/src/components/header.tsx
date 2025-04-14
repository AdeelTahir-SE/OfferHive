"use client";
import { RootState } from "@/lib/redux/store";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const user = useSelector((state: RootState) => state.user);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-yellow-500 text-black p-4 flex justify-between items-center mb-0 z-40 md:z-0 relative">
      <div className="flex items-center justify-between w-full md:w-auto">
        <Image src="/hive.svg" alt="logo" width={60} height={60} />
        <button
          ref={buttonRef}
          onClick={toggleMenu}
          className="md:hidden ml-auto focus:outline-none"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <ul
        ref={menuRef}
        className={`${
          menuOpen ? "block" : "hidden"
        } absolute top-full left-0 w-full bg-yellow-500 flex flex-col items-start p-4 gap-4 font-semibold md:static md:flex md:flex-row md:items-center md:space-x-6 md:p-0 md:gap-0 md:w-auto z-50`}
      >
        {user?.email && !user?.is_shop_owner && (
          <li className="hover:text-white transition-colors">
            <Link href="/people">People</Link>
          </li>
        )}
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

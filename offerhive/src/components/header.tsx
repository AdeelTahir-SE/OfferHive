"use client";
import { RootState } from "@/lib/redux/store";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Bell } from "lucide-react";
import { fetchRequest } from "@/lib/utils/fetch";
import { getNotifications, deleteNotifications } from "@/lib/database/user";

type Notification = {
  user_id: string;
  description: string;
  created_at: string;
};
export default function Header() {
  const user = useSelector((state: RootState) => state.user);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[] | null>([]);
  const menuRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const toggleNotifications = async () => {
    setShowNotifications((prev) => !prev);
  };

  async function removeNotifications() {
    if (user?.user_id) {
      fetchRequest("/api/notifications",{
        method:"DELETE",
        headers:{
          "user_id":user?.user_id,
        }

      },
      ()=>{},
      ()=>{},
      (data)=>{
        if(data?.success)
        setNotifications([]); 
      }
    
    )

    }
  }

  async function getAndSetNotifications() {
    if (user?.user_id) {
      fetchRequest("/api/notifications",{
        method:"GET",
        headers:{
          "user_id":user?.user_id,
        }
      },
      ()=>{},
      ()=>{},
      (data)=>{
        if(data?.success)
        setNotifications(data?.data); 
      })

    }
  }

  useEffect(() => {
    getAndSetNotifications();
  }, [user, user?.user_id]);

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

      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        if (showNotifications && user?.user_id) {
          removeNotifications();
        }
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotifications, user?.user_id]); 

  const MenuLink = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <li className="hover:text-white transition-colors">
      <Link href={href} onClick={closeMenu}>
        {children}
      </Link>
    </li>
  );

  return (
    <nav
      className={`bg-primary text-black  h-20 px-8  flex justify-between items-center mb-0 relative ${
        menuOpen||showNotifications ? "z-40" : "z-10"
      }`}
    >
      <div className="flex items-center justify-between w-full md:w-auto z-30 md:z-0">
        <Link href={"/"}><Image src="/hive.svg" alt="logo" width={60} height={60} /></Link>
        <div className="flex items-center gap-4 md:hidden">
          {user?.email && (
            <div className="relative" ref={notificationRef}>
              <button
                onClick={toggleNotifications}
                className="relative p-2 rounded-full hover:bg-secondary transition-colors"
              >
                <Bell className="w-5 h-5 cursor-pointer" />
                {notifications && notifications?.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                    {notifications?.length}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="fixed top-20 right-4 w-72 bg-white shadow-lg rounded-md overflow-hidden z-[9999]">
                  <div className="p-3 font-semibold border-b border-gray-200">
                    Notifications
                  </div>
                  <ul className="max-h-60 overflow-y-auto ">
                    {notifications &&
                      notifications?.map((note, index) => (
                        <li
                          key={index}
                          className="p-3 hover:bg-gray-100 text-sm border-b last:border-none"
                        >
                          {note?.description}
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <button
            ref={buttonRef}
            onClick={toggleMenu}
            className="md:hidden ml-auto focus:outline-none"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Main Menu */}
      <ul
        ref={menuRef}
        className={`${
          menuOpen ? "block" : "hidden"
        } absolute top-full left-0 w-full bg-primary *:hover:scale-110 *:transition *:duration-100 flex flex-col items-start p-4 gap-4 font-semibold md:static md:flex md:flex-row md:items-center md:space-x-6 md:p-0 md:gap-0 md:w-auto z-50`}
      >
        {user?.email && !user?.is_shop_owner && (
          <MenuLink href="/people">People</MenuLink>
        )}
        <MenuLink href="/">Home</MenuLink>
        <MenuLink href="/contact">Contact</MenuLink>
        <MenuLink href="/providers">Providers</MenuLink>
        <MenuLink href="/communities">Communities</MenuLink>

        {user?.is_shop_owner ? (
          <MenuLink href="/shop/dashboard">My Shop</MenuLink>
        ) : (
          <MenuLink href="/createStore">Create Shop</MenuLink>
        )}

        {user?.email && (
          <div className="relative hidden md:block" ref={notificationRef}>
            <button
              onClick={toggleNotifications}
              className="relative p-2 rounded-full hover:bg-secondary transition-colors cursor-pointer"
            >
              <Bell className="w-5 h-5 " />
              {notifications && notifications?.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                  {notifications?.length}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="fixed top-20 right-4 w-72 bg-white shadow-lg rounded-md overflow-hidden z-[9999]">
                <div className="p-3 font-semibold border-b border-gray-200">
                  Notifications
                </div>
                <ul className="max-h-60 overflow-y-auto">
                  {notifications &&
                    notifications?.map((note, index) => (
                      <li
                        key={index}
                        className="p-3 hover:bg-gray-100 text-sm border-b last:border-none"
                      >
                        {note?.description}
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {user?.email ? (
          <li className="hover:scale-110 transition duration-300 rounded-full p-2 bg-gray-200 border-secondary-700 m-1">
            <Link href="/profile" onClick={closeMenu}>
              {user.email}
            </Link>
          </li>
        ) : (
          <MenuLink href="/logIn">Sign In</MenuLink>
        )}
      </ul>
    </nav>
  );
}

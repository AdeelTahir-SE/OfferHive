"use client";
import { RootState } from "@/lib/redux/store";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Bell } from "lucide-react";
import { getNotifications, deleteNotifications } from "@/lib/DB/user";
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
      await deleteNotifications(user.user_id);  
      setNotifications([]);  // Clear the notifications from state
    }
  }

  async function getAndSetNotifications() {
    if (user?.user_id) {
      const notifications = await getNotifications(user.user_id);
      setNotifications(
        notifications 
      );
    }
  }

  useEffect(() => {
    getAndSetNotifications();
  }, [user, user?.user_id]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close the menu if clicked outside
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }

      // Close notifications if clicked outside
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        if (showNotifications && user?.user_id) {
          removeNotifications(); // Delete notifications when closing
        }
        setShowNotifications(false); // Close notifications dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotifications, user?.user_id]); // Added dependencies to ensure proper update

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
      className={`bg-yellow-500 text-black p-4 flex justify-between items-center mb-0 relative ${menuOpen ? "z-40" : "z-10"}`}
    >
      <div className="flex items-center justify-between w-full md:w-auto z-30 md:z-0">
        <Image src="/hive.svg" alt="logo" width={60} height={60} />
        <div className="flex items-center gap-4 md:hidden">
          {user?.email && (
            <div className="relative" ref={notificationRef}>
              <button
                onClick={toggleNotifications}
                className="relative p-2 rounded-full hover:bg-yellow-300 transition-colors"
              >
                <Bell className="w-5 h-5" />
                {notifications && notifications?.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                    {notifications?.length}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 top-10 w-72 bg-white shadow-lg rounded-md overflow-hidden z-50">
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

          <button
            ref={buttonRef}
            onClick={toggleMenu}
            className="md:hidden ml-auto focus:outline-none"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Main Menu */}
      <ul
        ref={menuRef}
        className={`${
          menuOpen ? "block" : "hidden"
        } absolute top-full left-0 w-full bg-yellow-500 flex flex-col items-start p-4 gap-4 font-semibold md:static md:flex md:flex-row md:items-center md:space-x-6 md:p-0 md:gap-0 md:w-auto z-50`}
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
              className="relative p-2 rounded-full hover:bg-yellow-300 transition-colors"
            >
              <Bell className="w-5 h-5" />
              {notifications && notifications?.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                  {notifications?.length}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-10 w-72 bg-white shadow-lg rounded-md overflow-hidden z-50">
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
          <li className="hover:text-yellow-400 transition-colors rounded-full p-2 bg-gray-200 border-yellow-700 m-1">
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

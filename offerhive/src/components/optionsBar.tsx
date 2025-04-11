import Link from "next/link";
import { LayoutDashboard, ShoppingBag, LogOut } from "lucide-react";

export default function OptionsBar() {
  return (
    <section className="relative flex items-center justify-center w-full bg-gray-100 py-4">
      <ul className="flex flex-row items-center justify-center space-x-6 rounded-full bg-gray-300 px-6 py-2 shadow-md">
        <TooltipItem href="/shop/dashboard" label="Dashboard">
          <LayoutDashboard className="w-6 h-6 text-black" />
        </TooltipItem>
        <TooltipItem href="/shop/manageShop" label="Shop">
          <ShoppingBag className="w-6 h-6 text-black" />
        </TooltipItem>
        <TooltipItem href="/shop/logout" label="Logout">
          <LogOut className="w-6 h-6 text-black" />
        </TooltipItem>
      </ul>
    </section>
  );
}

// Tooltip wrapper component
function TooltipItem({
    href,
    label,
    children,
  }: {
    href: string;
    label: string;
    children: React.ReactNode;
  }) {
    return (
      <li className="relative group p-2 bg-gray-400 rounded-2xl hover:scale-125 transition-transform">
        <Link href={href}>
          <div className="flex items-center justify-center">{children}</div>
        </Link>
  
        {/* Tooltip positioned above */}
        <span className="absolute bottom-full  left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-black text-white text-xs px-2 py-1 rounded-md whitespace-nowrap transition-opacity duration-200 z-50">
          {label}
        </span>
      </li>
    );
  }
  
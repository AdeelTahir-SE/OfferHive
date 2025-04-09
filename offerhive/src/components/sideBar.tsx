import Link from "next/link"
import { LayoutDashboard, Users, ShoppingBag, LogOut } from "lucide-react"

export default async function SideBar() {
    return (
        <section className="flex flex-col items-center justify-center h-screen left-0 border-2 w-20 rounded-xl bg-gray-100 max-w-20 absolute">
            <ul className="flex flex-col items-center justify-center space-y-4">
                <TooltipItem href="/shop/dashboard" label="Dashboard">
                    <LayoutDashboard className="w-6 h-6 text-black" />
                </TooltipItem>
                <TooltipItem href="/shop/people" label="People">
                    <Users className="w-6 h-6 text-black" />
                </TooltipItem>
                <TooltipItem href="/shop/manageShop" label="Shop">
                    <ShoppingBag className="w-6 h-6 text-black" />
                </TooltipItem>
                <TooltipItem href="/shop/logout" label="Logout">
                    <LogOut className="w-6 h-6 text-black" />
                </TooltipItem>
            </ul>
        </section>
    )
}

// Tooltip wrapper component
function TooltipItem({ href, label, children }: { href: string, label: string, children: React.ReactNode }) {
    return (
        <li className="relative group p-2 bg-gray-400 rounded-2xl my-2 hover:scale-150 transition-transform">
            <Link href={href}>
                {children}
            </Link>
            <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-black text-white text-xs px-2 py-1 rounded-md whitespace-nowrap transition-opacity duration-200 z-10">
                {label}
            </span>
        </li>
    )
}

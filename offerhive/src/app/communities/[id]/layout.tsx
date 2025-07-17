"use client"
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
export default function Layout({ children }: { children: React.ReactNode }) {
      const { id }: { id: string } = useParams();
    
  return (
    <section className="flex flex-col items-center justify-center">
      <>
        <OptionsBar id={id} />
        {children}
      </>
    </section>
  );
}

function OptionsBar({id}:{id:string}) {
  return (
    <section className="relative z-30 md:z-20 flex items-center justify-center w-full bg-gray-100 py-4 overflow-visible">
      <ul className="flex flex-row items-center justify-center space-x-6 rounded-full bg-gray-300 px-6 py-2 shadow-md">
        <TooltipItem href={`/communities/${id}`} label="About Community">
          <Image src="/about_icon.svg" alt="" width={40} height={40} />
        </TooltipItem>
        <TooltipItem href={`/communities/${id}/communityProviders`} label="community shops">
          <Image src="/shop_icon.svg" alt="" width={40} height={40} />
        </TooltipItem>
        <TooltipItem href={`/communities/${id}/openShops`} label="open trading">
          <Image src="/trade_icon.svg" alt="" width={40} height={40} />
        </TooltipItem>
      </ul>
    </section>
  );
}

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

      <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-black text-white text-xs px-2 py-1 rounded-md whitespace-nowrap transition-opacity duration-200 z-[9999]">
        {label}
      </span>
    </li>
  );
}

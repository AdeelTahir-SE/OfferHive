
import Image from "next/image";
import Link from "next/link";

export default function GroupCard({ image, title, desc, members }) {
  const visibleMembers = members.slice(0, 6);
  const remaining = members.length - visibleMembers.length;

  return (
    <Link href={`/groups/${title}`} className="w-full h-full">
       <section className="flex flex-row items-center justify-center p-4 hover:border rounded-xl shadow-md gap-6">
      <Image src={image} alt={title} width={300} height={300} className="h-full" />
      <section className="flex flex-col items-center justify-center gap-2">
        <h2 className="text-xl font-bold">{title}</h2>
        <h3 className="text-md text-gray-600">{desc}</h3>
        <section className="flex flex-row items-center justify-around gap-2 flex-wrap">
          {visibleMembers.map((v: string, i: number) => (
            <span key={i} className="rounded-xl bg-yellow-300 text-black p-2">{v}</span>
          ))}
          {remaining > 0 && <span className="text-sm text-gray-500">... and {remaining} more</span>}
        </section>
      </section>
    </section>
    </Link>
 
  );
}

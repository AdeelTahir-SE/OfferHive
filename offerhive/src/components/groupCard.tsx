import Image from "next/image";
import Link from "next/link";

export default function GroupCard({
  image,
  title,
  desc,
  members,
  id,
}: {
  image: string;
  title: string;
  desc: string;
  members: string[];
  id: string;
}) {
  const visibleMembers = members.slice(0, 6);
  const remaining = members.length - visibleMembers.length;

  return (
    <Link href={`/groups/${id}`} className="w-full h-full">
      <section className="flex flex-col sm:flex-row items-center sm:items-start justify-start bg-white p-4 hover:border rounded-xl shadow-md gap-4 transition-all duration-200">
        <div className="w-full sm:w-[150px] lg:w-[300px]">
          <Image
            src={image}
            alt={title}
            width={300}
            height={300}
            className="w-full h-auto object-cover rounded-2xl shadow-md"
          />
        </div>

        <section className="flex flex-col items-center sm:items-start justify-center gap-2 w-full">
          <h2 className="text-lg sm:text-xl font-bold text-center sm:text-left">
            {title}
          </h2>
          <h3 className="text-sm sm:text-md text-gray-600 text-center sm:text-left">
            {desc}
          </h3>

          <section className="flex flex-wrap gap-2 justify-center sm:justify-start mt-2">
            {visibleMembers.map((v: string, i: number) => (
              <span
                key={i}
                className="rounded-xl bg-yellow-300 text-black px-3 py-1 text-sm font-medium"
              >
                {v}
              </span>
            ))}
            {remaining > 0 && (
              <span className="text-sm text-gray-500">
                ... and {remaining} more
              </span>
            )}
          </section>
        </section>
      </section>
    </Link>
  );
}

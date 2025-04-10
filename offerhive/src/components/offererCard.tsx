import Image from "next/image";
import Link from "next/link";
export default function OffererCard({
  id,
  image,
  title,
  tags,
  group,
  address,
}: {
  id: string;
  image: string;
  title: string;
  tags: string[];
  group: string | null;
  address: string;
}) {
  return (
    <Link href={`/offers/${id}`}>
      <section className="flex flex-col items-center justify-center  w-80 hover:bg-gray-50 rounded-xl p-4">
        <Image
          src={image}
          alt="offer"
          width={300}
          height={200}
          className="rounded-lg shadow-lg mb-4 px-2 m-auto object-cover  h-60  hover:scale-105 *:transition-transform duration-300 ease-in-out"
        />
        <section className="flex flex-col items-center justify-center">
          <section className="flex flex-col items-center justify-center">
            <span className="text-lg font-semibold">{title}</span>
            {tags?.length > 1 ? (
              <section className="flex flex-row items-center justify-center ">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-yellow-500 text-black rounded-full max-w-[120px] overflow-hidden text-ellipsis mx-1 p-1 text-sm font-semibold whitespace-nowrap"
                  >
                    {tag}
                  </span>
                ))}
              </section>
            ) : (
              <span className="bg-yellow-500 text-black rounded-full px-3 py-1 text-sm font-semibold">
                {tags}
              </span>
            )}
          </section>
          <section className="flex flex-row items-center justify-center space-x-2">
            {group && (
              <span className="text-sm font-semibold bg-gray-400 rounded-2xl my-2 p-2">
                {group}
              </span>
            )}
          </section>
          <section className="flex flex-row items-center justify-center space-x-2">
            <span className="text-sm font-semibold">{address}</span>
          </section>
        </section>
      </section>
    </Link>
  );
}

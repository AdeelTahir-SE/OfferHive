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
  const placeholderImage = "/placeholder_deals.png";
  const displayTitle = title?.trim() || "No title provided";
  const displayAddress = address?.trim() || "No address available";
  const hasTags = tags && tags.length > 0;

  return (
    <Link href={`/offers/${id}`} className="w-full max-w-[320px]">
      <section className="flex flex-col w-full h-[370px] justify-start rounded-xl border hover:shadow-md hover:bg-gray-50 transition-all p-4">
        <div className="w-full h-[180px] relative mb-4">
          <Image
            src={image?.trim() || placeholderImage}
            alt={title || "offer image"}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        <div className="flex flex-col flex-grow justify-start text-center space-y-2">
          <span className="text-lg font-semibold line-clamp-2">{displayTitle}</span>

          <div className="flex flex-wrap justify-center gap-2">
            {hasTags ? (
              tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-yellow-500 text-black rounded-full px-3 py-1 text-sm font-semibold max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  {tag}
                </span>
              ))
            ) : (
              <span className="bg-gray-300 text-gray-600 rounded-full px-3 py-1 text-sm font-medium">
                No tags
              </span>
            )}
          </div>

          {group && (
            <span className="text-sm font-semibold bg-gray-400 text-white rounded-2xl px-3 py-1">
              {group}
            </span>
          )}

          <span className="text-sm font-medium text-gray-600">{displayAddress}</span>
        </div>
      </section>
    </Link>
  );
}

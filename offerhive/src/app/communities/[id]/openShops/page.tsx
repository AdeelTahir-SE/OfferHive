"use client";
import { fetchRequest } from "@/lib/utils/fetch";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import SearchBar from "@/components/searchBar";
import SearchIcon from "@/components/searchIcon";
import Loader from "@/components/loader";
import Link from "next/link";
export default function openShops() {
  const [shops, setShops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [counter, setCounter] = useState(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [hasMore, setHasMore] = useState(true);
  const { id }: { id: string } = useParams();
  const fetchShops = useCallback(async () => {
    if (!hasMore) return;

    try {
      await fetchRequest(
        `/api/communities/openShops?searchQuery=${encodeURIComponent(
          searchTerm
        )}&counter=${counter}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "group-id": id,
          },
        },
        setLoading,
        setError,
        (data) => {
          setShops(data?.data);
        }
      );
    } catch (err) {
      console.error("Failed to fetch open shops:", err);
    }
    if (!shops || shops?.length <= 0) {
      setHasMore(false);
    }
  }, [searchTerm, counter, hasMore]);

  useEffect(() => {
    fetchShops();
  }, [fetchShops]);

  const handleScroll = () => {
    if (shops?.length === 0 || loading || !hasMore) return;

    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 100
    ) {
      setCounter((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore, shops]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setShops([]);
    setCounter(0);
    setHasMore(true);
  };

  return (
    <section className="flex flex-col items-center justify-center gap-[30px] rounded-xl py-6 px-[40px] sm:px-0 w-full  md:px-[100px] xl:px-px[200px] xxl:px-[450px]">
      <h1 className="heading-1">Open Shops</h1>
      <p className="description">
        Browse offers tailored to your needs — simply post what you’re looking
        for, and let the community respond!
      </p>

      <div className="md:max-w-2/3 min-w-[300px] md:w-full">
        <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
      </div>
      {shops?.length === 0 && !loading && (
        <section className="flex flex-col items-center justify-center text-primary">
          <SearchIcon />
          <h2 className="text-2xl font-bold mt-4">No Offerers Found</h2>
        </section>
      )}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 w-full max-w-4xl place-items-center">
        {shops &&
          shops?.length > 0 &&
          shops?.map((shop) => (
            <GroupShopCard
              key={shop.id}
              id={shop.id}
              groupId={id}
              image_url={shop.image_url}
              group_shop_tags={shop?.group_shop_tags}
              group_shop_name={shop.group_shop_name}
              group_shop_description={shop.group_shop_description}
            />
          ))}
      </section>

      {loading && (
        <section className="flex items-center justify-center mt-4 mb-4">
          <Loader size={3} />
        </section>
      )}

      {!hasMore && shops?.length > 0 && (
        <p className="text-gray-500 mt-4">
          No more communityProviders to show.
        </p>
      )}
    </section>
  );
}

interface GroupShopCardProps {
  id: string;
  groupId: string;
  image_url: string;
  group_shop_name: string;
  group_shop_description: string;
  group_shop_tags: string[] | undefined;
}

function GroupShopCard({
  id,
  groupId,
  image_url,
  group_shop_name,
  group_shop_description,
  group_shop_tags,
}: GroupShopCardProps) {
  const placeholderImage = "/placeholder_deals.png";
  const displayTitle = group_shop_name?.trim() || "No title provided";
  const hasTags = group_shop_tags && group_shop_tags.length > 0;

  return (
    <Link
      href={`/communities/${groupId}/openShops/${id}`}
      className="w-full max-w-[320px] "
      prefetch={false}
    >
      <section className="flex flex-col w-full h-[370px] justify-start rounded-xl border hover:shadow-md hover:bg-gray-50 transition-all p-4">
        <div className="w-full h-[180px] relative mb-4">
          <Image
            src={image_url?.trim() || placeholderImage}
            alt={group_shop_name || "offer image"}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        <div className="flex flex-col flex-grow justify-start text-center space-y-2">
          <span className="text-lg font-bold line-clamp-2">
            {displayTitle}
          </span>
          <span className="text-sm font-semibold  text-black rounded-2xl px-1 py-1">
            {group_shop_description?.substring(0, 35)}...
          </span>
          <div className="flex flex-wrap justify-center gap-2">
            {hasTags ? (
              group_shop_tags?.slice(0, 5).map((tag, index) => (
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
        </div>
      </section>
    </Link>
  );
}

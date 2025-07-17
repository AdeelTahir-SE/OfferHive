"use client";
import { fetchRequest } from "@/lib/utils/fetch";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SearchBar from "@/components/searchBar";
import SearchIcon from "@/components/searchIcon";
import Loader from "@/components/loader";
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
}

function GroupShopCard({
  id,
  groupId,
  image_url,
  group_shop_name,
  group_shop_description,
}: GroupShopCardProps) {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(`/communities/${groupId}/openShops/${id}`);
      }}
      className="relative p-[2px] rounded-xl rainbow-beam-wrapper max-w-xs w-full transition-transform hover:scale-[1.02]"
    >
      <div className="relative z-10 bg-white dark:bg-zinc-900 rounded-xl p-5 shadow-md flex flex-col items-center text-center space-y-3">
        <Image
          src={image_url}
          alt={group_shop_name}
          width={96}
          height={96}
          className="rounded-md object-cover"
        />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          {group_shop_name}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
          {group_shop_description}
        </p>
      </div>
    </div>
  );
}

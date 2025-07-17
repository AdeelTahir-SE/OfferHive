"use client";
import { useState, useEffect, useCallback } from "react";
import SearchBar from "@/components/searchBar";
import OffererCard from "@/components/offererCard";
import SearchIcon from "@/components/searchIcon";
import Loader from "@/components/loader";
import { fetchRequest } from "@/lib/utils/fetch";
import { useParams } from "next/navigation";
export default function Page() {
  const [communityProviders, setCommunityProviders] = useState<any[]>([]);
  const [counter, setCounter] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [hasMore, setHasMore] = useState(true);
  const { id }: { id: string } = useParams();
  const fetchOffers = useCallback(async () => {
    if (!hasMore) return;

    fetchRequest(
      `/api/communities/${id}/communityProviders?searchQuery=${encodeURIComponent(
        searchTerm
      )}&counter=${counter}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
      setIsFetching,
      setError,
      setCommunityProviders
    );
    console.log(
      `Fetching communityProviders with searchTerm: ${searchTerm}, counter: ${counter}`
    );
    if (!communityProviders || communityProviders.length <= 0) {
      setHasMore(false);
    }
  }, [searchTerm, counter, hasMore]);

  useEffect(() => {
    fetchOffers();
    console.log("Community Providers fetched:", communityProviders);
  }, [fetchOffers]);

  const handleScroll = () => {
    if (communityProviders.length === 0 || isFetching || !hasMore) return;

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
  }, [isFetching, hasMore, communityProviders]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCommunityProviders([]);
    setCounter(0);
    setHasMore(true);
  };

  return (
    <section className="flex flex-col items-center justify-center gap-[30px] rounded-xl py-6 px-[40px] sm:px-0 w-full  md:px-[100px] xl:px-px[200px] xxl:px-[450px]">
      <h1 className="heading-1">Community Providers</h1>
      <p className="description">
        Check out amazing communityProviders by different Providers of this Community!
      </p>
      <div className="md:max-w-2/3 min-w-[300px] md:w-full">
        <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
      </div>
      {communityProviders.length === 0 && !isFetching && (
        <section className="flex flex-col items-center justify-center text-primary">
          <SearchIcon />
          <h2 className="text-2xl font-bold mt-4">No Offerers Found</h2>
        </section>
      )}

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 w-full max-w-4xl place-items-center">
        {communityProviders?.map((offer, index) => {
            console.log(offer)
            return(
          <OffererCard
            key={index}
            id={offer.user_id}
            image={offer.User?.UserShop?.shop_images?.[0]}
            title={offer.User?.UserShop?.shop_title}
            tags={offer.User?.UserShop?.shop_tags}
            group={offer.User?.UserShop?.group}
            address={offer.User?.UserShop?.shop_address}
          />
        )})}
      </section>

      {isFetching && (
        <section className="flex items-center justify-center mt-4 mb-4">
          <Loader size={3} />
        </section>
      )}

      {!hasMore && communityProviders.length > 0 && (
        <p className="text-gray-500 mt-4">No more communityProviders to show.</p>
      )}
    </section>
  );
}

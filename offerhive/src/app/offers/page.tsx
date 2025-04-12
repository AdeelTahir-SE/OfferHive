"use client";
import { useState, useEffect, useCallback } from "react";
import SearchBar from "@/components/searchBar";
import OffererCard from "@/components/offererCard";
import { searchOfferers, getOfferers } from "@/lib/DB/offerer";
import SearchIcon from "@/components/searchIcon";
import Loader from "@/components/loader";

export default function Offers() {
  const [offers, setOffers] = useState<any[]>([]);
  const [counter, setCounter] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [hasMore, setHasMore] = useState(true);

  const fetchOffers = useCallback(async () => {
    if (!hasMore) return;
    setIsFetching(true);
    try {
      const data = searchTerm
        ? await searchOfferers(searchTerm, counter)
        : await getOfferers(counter);

      if (data&&data?.length > 0) {
        setOffers((prev) => [...prev, ...data]);
      } else {
        setHasMore(false); // Stop fetching if no data
      }
    } catch (err) {
      setError("Error fetching offers. Please try again later.");
    } finally {
      setIsFetching(false);
    }
  }, [searchTerm, counter, hasMore]);

  useEffect(() => {
    fetchOffers();
  }, [fetchOffers]);

  const handleScroll = () => {
    if (offers.length === 0 || isFetching || !hasMore) return;

    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100
    ) {
      setCounter((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetching, hasMore, offers]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setOffers([]);
    setCounter(0);
    setHasMore(true); // Reset on new search
  };

  return (
    <section className="flex flex-col items-center justify-center rounded-xl py-6 w-full">
      <h1 className="text-3xl font-bold mb-4">Offerers</h1>
      <p className="text-lg">Check out amazing offers by different Offerers!</p>

      <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />

      {offers.length === 0 && !isFetching && (
        <section className="flex flex-col items-center justify-center text-yellow-400">
          <SearchIcon />
          <h2 className="text-2xl font-bold mt-4">No Offerers Found</h2>
        </section>
      )}

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 w-full max-w-4xl place-items-center">
        {offers?.map((offer, index) => (
          <OffererCard
            key={index}
            id={offer.user_id}
            image={offer.shop_images?.[0]}
            title={offer.shop_title}
            tags={offer.shop_tags}
            group={offer.group}
            address={offer.shop_address}
          />
        ))}
      </section>

      {isFetching && (
        <section className="flex items-center justify-center mt-4 mb-4">
          <Loader size={3} />
        </section>
      )}

      {!hasMore && offers.length > 0 && (
        <p className="text-gray-500 mt-4">No more offers to show.</p>
      )}
    </section>
  );
}

"use client";
import { useState, useEffect, useCallback } from "react";
import SearchBar from "@/components/searchBar";
import GroupCard from "@/components/groupCard";
import SearchIcon from "@/components/searchIcon";
import Loader from "@/components/loader";
import { fetchRequest } from "@/lib/utils/fetch";
export default function Groups() {
  const [groups, setGroups] = useState<any[]>([]);
  const [counter, setCounter] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [hasMore, setHasMore] = useState(true);

  const fetchGroups = useCallback(async () => {
    if (!hasMore) return;
    if (searchTerm.trim() === "" && counter !== 0) return;
    await fetchRequest(
      `/api/communities?searchQuery=${encodeURIComponent(
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
      setGroups
    );
    console.log(
      `Fetching groups with searchTerm: ${searchTerm}, counter: ${counter}`
    );
    console.log("Groups fetched:", groups);

    if (!groups || groups.length <= 0) {
      setHasMore(false);
    }
  }, [searchTerm, counter, hasMore]);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  const handleScroll = useCallback(() => {
    if (groups.length === 0 || isFetching || !hasMore) return;

    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 100
    ) {
      setCounter((prev) => prev + 1);
    }
  }, [groups, isFetching, hasMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleSearch = (term: string) => {
    setGroups([]);
    setCounter(0);
    setSearchTerm(term.trim());
    setHasMore(true);
  };

  return (
    <section className="flex flex-col items-center justify-center gap-6 p-4 w-full">
      <h1 className="text-3xl font-bold mb-4">Community</h1>
      <p className="text-lg text-center">
        Find Community that match your interests and receive relevant offers.
      </p>

      <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      {groups.length === 0 && !isFetching && (
        <section className="flex flex-col items-center justify-center text-yellow-400">
          <SearchIcon />
          <h2 className="text-2xl font-bold mt-4">No Groups Found</h2>
        </section>
      )}

      <section className="flex flex-col items-start justify-center gap-6 w-full max-w-4xl">
        {groups.map((group, index) => (
          <GroupCard
            key={index}
            id={group.group_id}
            image={group.GroupDetail[0]?.group_image}
            title={group.GroupDetail[0]?.group_title}
            desc={group.GroupDetail[0]?.group_desc}
            members={group?.GroupUser?.map(
              (groupUser: any) => groupUser?.User?.UserShop?.shop_title
            )}
          />
        ))}
      </section>

      {isFetching && (
        <section className="flex items-center justify-center mt-4 mb-4">
          <Loader size={3} />
        </section>
      )}

      {!hasMore && groups.length > 0 && (
        <p className="text-gray-500 mt-4">No more groups to show.</p>
      )}
    </section>
  );
}

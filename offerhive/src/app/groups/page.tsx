"use client";
import { useState, useEffect, useCallback } from "react";
import SearchBar from "@/components/searchBar";
import GroupCard from "@/components/groupCard";
import { getGroups, searchGroups } from "@/lib/DB/group";
import SearchIcon from "@/components/searchIcon";
import Loader from "@/components/loader";

export default function Groups() {
  const [groups, setGroups] = useState<any[]>([]);
  const [counter, setCounter] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchGroups = useCallback(async () => {
    setIsFetching(true);
    try {
      const data = searchTerm
        ? await searchGroups(searchTerm, counter)
        : await getGroups(counter);
      console.log(data, "page");
      if (data) {
        setGroups((prev) => [...prev, ...data]);
      }
    } catch (err) {
      setError("Error fetching groups. Please try again later.");
      console.log(err);
    } finally {
      setIsFetching(false);
    }
  }, [searchTerm, counter]);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  const handleScroll = useCallback(() => {
    if (groups.length === 0) return;

    const bottom =
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 5;

    if (bottom && !isFetching) {
      setCounter((prev) => prev + 1);
    }
  }, [isFetching, groups]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleSearch = (term: string) => {
    setGroups([]);
    setCounter(0);
    setSearchTerm(term);
  };

  return (
    <section className="flex flex-col items-center justify-center gap-6 px-4 py-6 sm:px-6 lg:px-12 w-full">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2">Groups</h1>
      <p className="text-md sm:text-lg text-center max-w-2xl text-gray-700">
        Find groups that match your interests and receive relevant offers.
      </p>

      <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      {groups.length === 0 && !isFetching && (
        <section className="flex flex-col items-center justify-center text-yellow-400 mt-8">
          <SearchIcon />
          <h2 className="text-xl sm:text-2xl font-bold mt-4">No Groups Found</h2>
        </section>
      )}

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl mt-4">
        {groups?.map((group, index) => (
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
    </section>
  );
}

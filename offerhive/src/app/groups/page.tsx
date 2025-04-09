"use client";
import { useState, useEffect, useCallback } from "react";
import SearchBar from "@/components/searchBar";
import GroupCard from "@/components/groupCard";
import { getGroups, searchGroups } from "@/lib/DB/group";

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

      if (data) {
        setGroups((prev) => [...prev, ...data]);
      }
    } catch (err) {
      setError("Error fetching groups. Please try again later.");
    } finally {
      setIsFetching(false);
    }
  }, [searchTerm, counter]);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  const handleScroll = useCallback(() => {
    const bottom =
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight;
    if (bottom && !isFetching) {
      setCounter((prev) => prev + 1);
    }
  }, [isFetching]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleSearch = (term: string) => {
    setGroups([]);       // Clear current groups
    setCounter(0);       // Reset pagination
    setSearchTerm(term); // Set new search term
  };

  return (
    <section className="flex flex-col items-center justify-center gap-6 p-4">
      <h1 className="text-3xl font-bold mb-4">Groups</h1>
      <p className="text-lg">
        Find groups that match your interests and receive relevant offers.
      </p>
      <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      <section className="flex flex-col items-start justify-center gap-6">
        {groups.map((group, index) => (
          <GroupCard
            key={index}
            image={group.image}
            title={group.title}
            desc={group.desc}
            members={group.members}
          />
        ))}
      </section>
      {isFetching && <p className="text-center mt-4">Loading more groups...</p>}
    </section>
  );
}

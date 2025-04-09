"use client";
import { useState, useEffect, useCallback } from "react";
import SearchBar from "@/components/searchBar";
import GroupCard from "@/components/groupCard";
import { getGroups, searchGroups } from "@/lib/DB/group";
import SearchIcon from "@/components/searchIcon";
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
    if(groups.length === 0) return;

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
    setGroups([]);      
    setCounter(0);       
    setSearchTerm(term); 
  };

  return (
    <section className="flex flex-col items-center justify-center gap-6 p-4">
      <h1 className="text-3xl font-bold mb-4">Groups</h1>
      <p className="text-lg">
        Find groups that match your interests and receive relevant offers.
      </p>
      <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      {groups.length === 0 && !isFetching && (
                
                <section className="flex flex-col items-center justify-center text-yellow-400">
                <SearchIcon/>
                <h2 className="text-2xl font-bold mt-4">No Groups Found</h2>
              </section>
              )
              }
      <section className="flex flex-col items-start justify-center gap-6">
        {groups?.map((group, index) => (
          <GroupCard
            key={index}
            id={group.group_id}
            image={group.GroupDetail[0]?.group_image}
            title={group.GroupDetail[0]?.group_title}
            desc={group.GroupDetail[0]?.group_desc}
            members={group?.GroupUser?.map((groupUser: any) => groupUser?.User?.UserShop?.shop_title)
            }          />
        ))}
      </section>
      {isFetching && <p className="text-center mt-4">Loading more groups...</p>}
    </section>
  );
}

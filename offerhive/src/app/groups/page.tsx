"use client";
import { useState, useEffect } from "react";
import SearchBar from "@/components/searchBar";
import GroupCard from "@/components/groupCard";
import { getGroups } from "@/lib/DB/group";

export default function Groups() {
  const [groups, setGroups] = useState<any[]>([]);
  const [counter, setCounter] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGroups = async () => {
    setIsFetching(true);
    try {
      const data = await getGroups(counter);
      if (data) {
        setGroups((prevGroups) => [...prevGroups, ...data]); 
      }
    } catch (err) {
      setError("Error fetching groups. Please try again later.");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, [counter]);

  const handleScroll = () => {
    const bottom = window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight;
    if (bottom && !isFetching) {
      setCounter((prevCounter) => prevCounter + 1); 
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isFetching]);

  return (
    <section className="flex flex-col items-center justify-center gap-6 p-4">
         <h1 className="text-3xl font-bold mb-4">Groups</h1>
         <p className="text-lg">Find groups that match your interests and receive relevant offers.</p>
         <SearchBar />
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

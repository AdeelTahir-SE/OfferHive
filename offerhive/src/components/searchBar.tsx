"use client"
import React, { useState } from "react";
export default function SearchBar({
    searchTerm,
    onSearch,
  }: {
    searchTerm: string;
    onSearch: (term: string) => void;
  }) {
    const [localTerm, setLocalTerm] = useState(searchTerm);
  
    const handleSearchClick = () => {
      onSearch(localTerm.trim());
    };
  
    return (
      <div className="flex items-center justify-center rounded-xl  py-6 w-full">
        <input
          type="text"
          placeholder="Search for offers..."
          className="border border-gray-300 rounded-lg p-2 w-full"
          value={localTerm}
          onChange={(e) => setLocalTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearchClick();
            }
          }}
        />
        <button
          className="bg-yellow-500 text-black font-semibold py-2 px-4 rounded-lg ml-4"
          onClick={handleSearchClick}
        >
          Search
        </button>
      </div>
    );
  }
  
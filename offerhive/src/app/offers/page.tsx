"use client";
import { useState, useEffect } from "react";
import SearchBar from "@/components/searchBar";
import OffererCard from "@/components/offererCard";
import { getOfferers } from "@/lib/DB/offerer";
export default function Offers() {
  const [offers, setOffers] = useState<any[]>([]);
  const [counter, setCounter] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fetchOffers = async () => {
    setIsFetching(true);
    try {
      const data = await getOfferers(counter);
      if (data) {
        setOffers((prevOffers) => [...prevOffers, ...data]); 
      }
    } catch (err) {
      setError("Error fetching offers. Please try again later.");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchOffers();
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
    <section className="flex flex-col items-center justify-center rounded-xl py-6 w-full">
      <h1 className="text-3xl font-bold mb-4">Offerers</h1>
      <p className="text-lg">Check out amazing offers by different Offerers!</p>
      <SearchBar />
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 w-full max-w-4xl">
        {offers?.map((offer, index) => (
          <OffererCard
            key={index}
            image={offer.shop_images[0]}
            title={offer.shop_title}
            tags={offer.shop_tags}
            group={offer.group}
            address={offer.shop_address}
          />
        ))}
      </section>
      {isFetching && <p className="text-center mt-4">Loading more offerers...</p>}
    </section>
  );
}


  // const offers = [
  //   {
  //     image: "/offer1.jpeg",
  //     title: "50% Off on Electronics",
  //     tags: ["Discount", "Limited Time", "Exclusive"],
  //     group: "Tech Savers",
  //     address: "123 Tech Street, Silicon Valley, CA",
  //   },
  //   {
  //     image: "/offer1.jpeg",
  //     title: "Buy 1 Get 1 Free",
  //     tags: ["BOGO", "Super Deal"],
  //     group: "Shopaholics",
  //     address: "456 Market Ave, New York, NY",
  //   },
  //   {
  //     image: "/offer1.jpeg",
  //     title: "Free Shipping on Orders Over $50",
  //     tags: ["Free Shipping", "No Minimum"],
  //     group: "Smart Shoppers",
  //     address: "789 E-Commerce Blvd, Los Angeles, CA",
  //   },
  //   {
  //     image: "/offer1.jpeg",
  //     title: "Buy 1 Get 1 Free",
  //     tags: ["BOGO", "Super Deal"],
  //     group: "Shopaholics",
  //     address: "456 Market Ave, New York, NY",
  //   },
  //   {
  //     image: "/offer1.jpeg",
  //     title: "Free Shipping on Orders Over $50",
  //     tags: ["Free Shipping", "No Minimum"],
  //     group: "Smart Shoppers",
  //     address: "789 E-Commerce Blvd, Los Angeles, CA",
  //   },
  // ];

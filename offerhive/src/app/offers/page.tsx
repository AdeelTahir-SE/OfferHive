import SearchBar from "@/components/searchBar";
import OfferCard from "@/components/offerCard";
export default function Offers() {
  const offers = [
    {
      image: "/offer1.jpeg",
      title: "50% Off on Electronics",
      tags: ["Discount", "Limited Time", "Exclusive"],
      group: "Tech Savers",
      address: "123 Tech Street, Silicon Valley, CA",
    },
    {
      image: "/offer1.jpeg",
      title: "Buy 1 Get 1 Free",
      tags: ["BOGO", "Super Deal"],
      group: "Shopaholics",
      address: "456 Market Ave, New York, NY",
    },
    {
      image: "/offer1.jpeg",
      title: "Free Shipping on Orders Over $50",
      tags: ["Free Shipping", "No Minimum"],
      group: "Smart Shoppers",
      address: "789 E-Commerce Blvd, Los Angeles, CA",
    },
    {
      image: "/offer1.jpeg",
      title: "Buy 1 Get 1 Free",
      tags: ["BOGO", "Super Deal"],
      group: "Shopaholics",
      address: "456 Market Ave, New York, NY",
    },
    {
      image: "/offer1.jpeg",
      title: "Free Shipping on Orders Over $50",
      tags: ["Free Shipping", "No Minimum"],
      group: "Smart Shoppers",
      address: "789 E-Commerce Blvd, Los Angeles, CA",
    },
  ];

  return (
    <section className="flex flex-col items-center justify-center  rounded-xl     py-6 w-full">
      <h1 className="text-3xl font-bold mb-4">Offers</h1>
      <p className="text-lg">Check out our amazing offers!</p>
      <SearchBar />
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 w-full max-w-4xl">
        {offers.map((offer, index) => (
          <OfferCard
            key={index}
            image={offer.image}
            title={offer.title}
            tags={offer.tags}
            group={offer.group}
            address={offer.address}
          />
        ))}
      </section>
    </section>
  );
}

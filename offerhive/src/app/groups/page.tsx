import SearchBar from "@/components/searchBar";
import GroupCard from "@/components/groupCard";

export default function Groups() {
  const groupData = [
    {
      image: "/offer1.jpeg",
      title: "Beauty Bazaar",
      desc: "A collection of top beauty and skincare brands. Discover the latest in self-care.",
      members: ["L'Oréal", "Nivea", "The Ordinary", "Garnier", "Neutrogena", "Maybelline", "Dove"],
    },
    {
      image: "/offer1.jpeg",
      title: "Tech Town",
      desc: "All the leading gadget and electronics shops in one place. From smartphones to smart homes.",
      members: ["Samsung", "Apple", "Sony", "LG", "Xiaomi", "OnePlus", "Dell", "HP"],
    },
    {
      image: "/avatar.jpg",
      title: "Fashion Fiesta",
      desc: "Trendy clothing stores and designer boutiques meet here. Style has a new address.",
      members: ["Zara", "H&M", "Gucci", "Levi’s", "Uniqlo", "Nike", "Adidas", "Puma"],
    },
    {
      image: "/offer1.jpeg",
      title: "Gourmet Garden",
      desc: "A place for foodies to explore gourmet kitchens, cafes, and food brands.",
      members: ["KFC", "McDonald's", "Subway", "Pizza Hut", "Burger King", "Starbucks", "Domino's"],
    },
  ];

  return (
    <section className="flex flex-col items-center justify-center gap-6 p-4">
      <SearchBar />
      <section className="flex flex-col items-start justify-center gap-6">
        {groupData.map((group, i) => (
          <GroupCard
            key={i}
            image={group.image}
            title={group.title}
            desc={group.desc}
            members={group.members}
          />
        ))}
      </section>
    </section>
  );
}

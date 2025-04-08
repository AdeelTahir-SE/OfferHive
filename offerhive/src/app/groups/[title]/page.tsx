
import OffererCard from "@/components/offererCard";
export default function GroupPage({ params }: { params: { title: string } }) {
    const groupShops = [
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
        <section className="flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">{params.title}</h1>
           {
                groupShops.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 w-full max-w-4xl">
                        {groupShops.map((shop, index) => (
                          <OffererCard 
                            key={index}
                            image={shop.image}
                            title={shop.title}
                            tags={shop.tags}
                            group={shop.group}
                            address={shop.address}
                          />
                        ))}
                    </div>
                ) : (
                    <p>No shops available in this group.</p>
                )
           }
        </section>
    );
}
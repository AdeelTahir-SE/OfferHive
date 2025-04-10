"use client";
import { useEffect, useState } from "react";
import { ImagesSlider } from "@/components/offerPageImages";
import { getShopById } from "@/lib/DB/offerer"; 
import { Offer,Shop } from "@/lib/types";
import React from "react";


export default function OfferDetails({ params }: { params: { offer_id: string } }) {
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);
  const {offer_id}= React.use(params)
  useEffect(() => {
    const fetchShop = async () => {
      try {
        console.log(offer_id)
        const data = await getShopById(offer_id); 
        console.log(data)
        setShop(data);
      } catch (error) {
        console.error("Failed to fetch shop:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShop();
  }, [offer_id]);

  if (loading) {
    return <div className="text-center text-xl font-medium">Loading...</div>;
  }

  if (!shop) {
    return <div className="text-center text-red-500 text-xl">Shop not found.</div>;
  }

  return (
    <section className="flex flex-col items-center justify-center p-6 max-w-6xl mx-auto">
      <h1 className="text-5xl text-center font-extrabold text-gray-800 mb-4">
        {shop.shop_title}
      </h1>
      <p className="text-xl text-gray-600 text-center max-w-2xl mb-6">
        {shop.shop_desc}
      </p>

      <ImagesSlider images={shop.shop_images} />

      <div className="w-full mt-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Available Offers</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {shop.offers.map((offer, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden w-80 border border-gray-200"
            >
              <img src={offer.image} alt={offer.offer_title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{offer.offer_title}</h3>
                <p className="text-gray-600 mb-2">{offer.offer_desc}</p>
                <p className="text-sm text-gray-500">
                  Valid: {new Date(offer.starts_at).toLocaleDateString()} -{" "}
                  {new Date(offer.valid_uptill).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shop tags */}
      <div className="flex flex-col items-center justify-center mt-10">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Tags</h3>
        <section className="flex flex-wrap items-center justify-center gap-2">
          {shop.shop_tags.map((tag, index) => (
            <span
              key={index}
              className="bg-yellow-500 text-black rounded-full px-4 py-2 text-lg font-semibold"
            >
              {tag}
            </span>
          ))}
        </section>
      </div>

      {/* Contact Info */}
      <div className="flex flex-col items-center justify-center mt-10 w-full bg-gray-100 p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact the Seller</h2>
        <p className="text-lg text-gray-700 mb-1">{shop.shop_address}</p>
        <p className="text-lg text-gray-700 mb-1">Phone: {shop.contact_info}</p>
        {shop.links?.map((link, index) => (
          <a
            key={index}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline text-lg"
          >
            {link}
          </a>
        ))}
      </div>
    </section>
  );
}


// const shop: Shop = {
//     shop_desc: "A trendy boutique offering exclusive fashion and accessories.",
//     shop_title: "StyleHub",
//     contact_info: "+1-234-567-890",
//     links: ["https://stylehub.com", "https://instagram.com/stylehub"],
//     shop_images: ["/offer1.jpeg", "/offer1.jpeg", "/offer1.jpeg", "/offer1.jpeg"],
//     shop_tags: ["fashion", "trendy", "boutique", "sale"],
//     shop_address: "123 Fashion Avenue, New York, NY",
//     offers: [
//       {
//         starts_at: "2025-04-01T09:00:00Z",
//         valid_uptill: "2025-04-30T23:59:59",
//         image: "/offer1.jpeg",
//         offer_desc: "Enjoy 30% off on all new summer arrivals. Limited time only!",
//         offer_title: "Summer Splash Sale",
//       },
//       {
//         starts_at: "2025-05-01T09:00:00Z",
//         valid_uptill: "2025-05-15T23:59:59",
//         image: "/offer1.jpeg",
//         offer_desc: "Buy one get one free on selected items!",
//         offer_title: "BOGO Bonanza",
//       },
      
//       {
//         starts_at: "2025-05-01T09:00:00Z",
//         valid_uptill: "2025-05-15T23:59:59",
//         image: "/offer1.jpeg",
//         offer_desc: "Buy one get one free on selected items!",
//         offer_title: "BOGO Bonanza",
//       },
      
//       {
//         starts_at: "2025-05-01T09:00:00Z",
//         valid_uptill: "2025-05-15T23:59:59",
//         image: "/offer1.jpeg",
//         offer_desc: "Buy one get one free on selected items!",
//         offer_title: "BOGO Bonanza",
//       },
//       {
//         starts_at: "2025-05-01T09:00:00Z",
//         valid_uptill: "2025-05-15T23:59:59",
//         image: "/offer1.jpeg",
//         offer_desc: "Buy one get one free on selected items!",
//         offer_title: "BOGO Bonanza",
//       },
//     ],
//   };
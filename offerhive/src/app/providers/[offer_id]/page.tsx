"use client";
import { useEffect, useState } from "react";
import { ImagesSlider } from "@/components/offerPageImages";
import { Shop } from "@/lib/types";
import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import Loader from "@/components/loader";
import Image from "next/image";
import { RootState } from "@/lib/redux/store";
import { fetchRequest } from "@/lib/utils/fetch";

export default function OfferDetails() {
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);
  const { offer_id }: { offer_id: string } = useParams();
  const user = useSelector((state: RootState) => state.user);

  async function clicksHandler(offer_id: string) {
    try {
      await fetchRequest(
        `/api/clicks?offer_id=${offer_id}`,
        { method: "GET" },
        () => {},
        (err) => console.log("Failed to update clicks:", err),
        (data) => console.log("Clicks updated:", data)
      );
    } catch (error) {
      console.error("Click handler failed:", error);
    }
  }

  const fetchShop = async () => {
    await fetchRequest(
      `/api/providers/${offer_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
      setLoading,
      (error) => {
        console.log("Failed to fetch shop:", error);
      },
      (data) => {
        if (data) {
          console.log("Shop data fetched:", data);
          setShop(data);
        } else {
          console.error("No shop data found for offer_id:", offer_id);
        }
      }
    );
  };

  useEffect(
    () => {
    clicksHandler(offer_id);
    fetchShop();
  },
   [offer_id]);


  if (loading) {
    return (
      <section className="h-screen w-screen bg-white flex items-center justify-center">
        <Loader size={12} />
      </section>
    );
  }

  if (!shop) {
    return (
      <div className="text-center text-red-500 text-xl">Shop not found.</div>
    );
  }

  return (
    <section className="flex flex-col items-center justify-center p-6 max-w-6xl mx-auto">
      <h1 className="text-5xl text-center font-extrabold text-gray-800 mb-4">
        {shop.shop_title}
      </h1>
      <p className="text-xl text-gray-600 text-center break-words max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mb-6">
        {shop.shop_desc}
      </p>

      <ImagesSlider images={shop.shop_images} />

      <div className="w-full mt-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Available Offers
        </h2>
        {shop?.offers.length === 0 ? (
          <p className="text-center text-gray-600">
            Sorry, currently no offers available.
          </p>
        ) : (
          <div className="flex flex-wrap justify-center gap-6">
            {shop?.offers.map((offer, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden w-80 border border-gray-200"
              >
                <div className="relative w-full h-72">
                  <Image
                    src={offer?.image || "/placeholder_deals.png"}
                    alt={offer?.offer_title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                    priority
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold break-words text-gray-800 mb-2">
                    {offer.offer_title}
                  </h3>
                  <p className="text-gray-600 mb-2 break-words whitespace-pre-wrap">
                    {offer.offer_desc}
                  </p>
                  <p className="text-sm text-gray-500">
                    Valid: {offer.starts_at} - {offer.valid_uptill}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
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
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Contact the Seller
        </h2>

        <p className="text-lg font-bold text-gray-700 mb-1 break-words text-center">
          {shop.shop_address}
        </p>

        <p className="text-lg font-bold text-gray-700 mb-1 break-words text-center">
          Phone: {shop.contact_info}
        </p>

        <div className="flex flex-col items-center space-y-2 w-full break-words">
          {shop.links?.map((link, index) => (
            <a
              key={index}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline text-lg break-words text-center w-full max-w-full"
            >
              {link}
            </a>
          ))}
        </div>

        {user && !user?.is_shop_owner && (
          <Link
            href={user?.email ? `/people/${shop?.user_id}` : `/logIn`}
            className=""
          >
            <button className="rounded-xl bg-yellow-500 mt-4 hover:bg-yellow-400 cursor-pointer p-4 text-xl">
              {user?.email ? "Chat with Seller" : "Login to chat with Seller"}
            </button>
          </Link>
        )}
      </div>
    </section>
  );
}

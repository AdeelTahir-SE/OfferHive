"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { fetchRequest } from "@/lib/utils/fetch";
import { GroupShopData } from "@/lib/types";
import Image from "next/image";
export default function OpenShopOffers() {
  const { openShopId }: { openShopId: string } = useParams();
  const [shop, setShop] = useState<GroupShopData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchShopOffers = async () => {
      try {
        await fetchRequest(
          `/api/communities/openShops/${openShopId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
          setLoading,
          setError,
          (data) => {
            setShop(data?.data || []);
            console.log("Shop offers fetched:", data?.data);
          }
        );
      } catch (err) {
        console.error("Failed to fetch open shops:", err);
      }
    };

    fetchShopOffers();
  }, [openShopId]);
  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Offers in Open Shop</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <section className="max-w-xl mx-auto p-4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">{shop?.group_shop_name}</h1>
            <p className="text-gray-600 dark:text-gray-400">
              {shop?.group_shop_description}
            </p>
            {shop?.image_url && (
              <Image
                src={shop.image_url}
                alt={shop.group_shop_name}
                width={300}
                height={200}
                className="rounded-lg mt-4"
              />
            )}
          </div>

          <h2 className="text-2xl font-semibold mb-4">Offers</h2>
          {shop?.GroupShopOffer?.length  ? (
            <ul className="space-y-4">
              {shop?.GroupShopOffer.map((offer) => (
                <li
                  key={offer.id}
                  className="p-4 bg-gray-100 dark:bg-zinc-800 rounded-md shadow-md"
                >
                  <p className="text-gray-800 dark:text-gray-200 whitespace-pre-line">
                    {offer.description}
                  </p>
                  {offer.image_url && (
                    <Image
                      src={offer.image_url}
                      alt="Offer"
                      width={200}
                      height={120}
                      className="mt-2 rounded-md"
                    />
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No offers available.</p>
          )}
        </section>
      )}
    </section>
  );
}

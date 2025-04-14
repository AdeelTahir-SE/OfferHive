"use client";
import { useEffect, useState } from "react";
import { ImagesSlider } from "@/components/offerPageImages";
import { getShopById } from "@/lib/DB/offerer";
import { Shop } from "@/lib/types";
import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { setClicks, getClicks } from "@/lib/DB/shop";
import { Click } from "@/lib/types";
import Loader from "@/components/loader";
import Image from "next/image";
import { RootState } from "@/lib/redux/store";

export default function OfferDetails() {
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);
  const { offer_id }: { offer_id: string } = useParams();
  const user = useSelector((state: RootState) => state.user);
  async function clicksHandler(offer_id:string) {
    const { clicks }: { clicks: Click[] } = await getClicks(offer_id);
    const today = new Date().toISOString().split("T")[0];
    if (clicks?.length == 0) {
      const newClick = {
        clicks: 1,
        date: today,
      };
      setClicks(offer_id, [newClick]);
      return;
    }

    let matched = false;
    let updatedClicks: Click[] = [];

    const validClicks = clicks ?? [];

    updatedClicks = validClicks.map((click: Click) => {
      if (click.date === today) {
        matched = true;
        click.clicks += 1;
      }
      return { ...click };
    });

    if (!matched) {
      updatedClicks.push({
        date: today,
        clicks: 1,
      });
    }

    setClicks(offer_id, updatedClicks);
  }

  useEffect(() => {
    const fetchShop = async () => {
      try {
        console.log(offer_id);
        const data = await getShopById(offer_id);
        setShop(data);
      } catch (error) {
        console.error("Failed to fetch shop:", error);
      } finally {
        setLoading(false);
      }
    };
    clicksHandler(offer_id);
    fetchShop();
  }, [offer_id]);
   if(loading){
    return <section className="h-screen w-screen bg-white flex items-center justify-center"><Loader size={12} /></section>
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
      <p className="text-xl text-gray-600 text-center max-w-2xl mb-6">
        {shop.shop_desc}
      </p>

      <ImagesSlider images={shop.shop_images} />

      <div className="w-full mt-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Available Offers
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {shop?.offers.map((offer, index:number) => (
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
              <h3 className="text-xl font-semibold text-wrap text-gray-800 mb-2">
                {offer.offer_title}
              </h3>
              <p className="text-gray-600 mb-2 break-words max-h-20 overflow-hidden">
                {offer.offer_desc}
              </p>
              <p className="text-sm text-gray-500">
                Valid: {offer.starts_at} - {offer.valid_uptill}
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
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Contact the Seller
        </h2>
        <p className="text-lg font-bold text-gray-700 mb-1">
          {shop.shop_address}
        </p>
        <p className="text-lg font-bold text-gray-700 mb-1">
          Phone: {shop.contact_info}
        </p>
        
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
        {user&&user?.email &&!user?.is_shop_owner  && (
          <Link href={`/people/${shop?.user_id}`} className="">
            <button className="rounded-xl bg-yellow-500 mt-4 hover:bg-yellow-400 cursor-pointer p-4 text-xl">
              Chat with Seller
            </button>
          </Link>
        )}
      </div>
    </section>
  );
}

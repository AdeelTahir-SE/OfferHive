"use client";
import { useEffect, useState } from "react";
import {
  getShopById,
  updateShop,
  updateOffer,
  createOffer,
  getOffersById,
  deleteOffer
} from "@/lib/DB/offerer";
import { Shop, Offer } from "@/lib/types";
import EditableText from "@/components/editableText";
import { useSelector } from "react-redux";
import EditableImages from "@/components/editableImages";
import EditableImage from "@/components/editableImage";
import Loader from "@/components/loader";
import Link from "next/link";
import { RootState } from "@/lib/redux/store";
export default function ManageShop() {
  const id = useSelector((state: RootState) => state.user.user_id);
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [shopData, offersData] = await Promise.all([
          getShopById(id),
          getOffersById(id),
        ]);
        setShop(shopData);
        setOffers(offersData??[]);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchData();
  }, [id]);

  const handleShopUpdate = async (field: keyof Shop, value: string) => {
    if (!shop) return;
    const updated = { ...shop, [field]: value };
    setShop(updated);
    await updateShop(id, { [field]: value });
  };

  const handleOfferUpdate = async (
    index: number,
    field: keyof Offer,
    value: string|null
  ) => {
    if(!value&&field!=="image"){
      return
    }
    const updatedOffers = [...offers];
    const offer = updatedOffers[index];
    if (!offer) return;

    const updatedOffer = { ...offer, [field]: value };
    updatedOffers[index] = updatedOffer;
    setOffers(updatedOffers);

    if (updatedOffer.offer_id) {
      await updateOffer(updatedOffer.offer_id, { [field]: value });

    }
  };

  const handleDeleteOffer = async (index: number) => {
    const offer = offers[index];
    if (!offer) return;
    const updated = offers.filter((_, i) => i !== index);
    setOffers(updated);
    await deleteOffer(offer.offer_id, offer.user_id);
  };

  const handleCreateOffer = async () => {
    const newOffer = {
      
      user_id: id,
      offer_title: "New Offer",
      offer_desc: "Description",
      image: "",
      starts_at: new Date().toISOString(),
      valid_uptill: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    };
    const created = await createOffer(newOffer);
    setOffers([...offers, created]);
  };
 if(loading){
  return <section className="h-screen w-screen bg-white flex items-center justify-center"><Loader size={12} /></section>
 }
  if (!shop){
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-3xl text-red-500 font-bold mb-4">Shop Not Found</h2>
      <p className="text-gray-600 mb-6">The shop you&apos;re looking for doesn&apos;t exist or has been removed.</p>
      <Link href="/">
        <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
          Go to Home
        </button>
      </Link>
    </div>
  );
  }
  return (
    <section className="flex flex-col items-center justify-center p-6 max-w-6xl mx-auto">
      <h1 className="text-5xl text-center font-extrabold text-gray-800 mb-4">
        <EditableText
          text={shop.shop_title}
          onSave={(val) => handleShopUpdate("shop_title", val)}
          
        />
      </h1>

      <p className="text-xl text-gray-600 text-center max-w-2xl mb-6">
        <EditableText
          text={shop.shop_desc}
          onSave={(val) => handleShopUpdate("shop_desc", val)}
        />
      </p>

      <EditableImages
        images={shop.shop_images ?? []}
        id={id}
        onChange={(images) => {
          if (!Array.isArray(images) || images.some(image => typeof image !== 'string')) {
            alert("Error setting image: Invalid image data");
            return;
          }
          setShop({ ...shop, shop_images: images });
          updateShop(id, { shop_images: images });
        }}
      />

      <div className="w-full mt-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Available Offers
        </h2>

        <div className="flex flex-wrap justify-center gap-6">
          {offers.map((offer, index) => (
           <div
           key={index}
           className="bg-white rounded-xl shadow-md flex flex-col w-80 border border-gray-200 overflow-hidden"
         >
           {/* Image should fill full width of container */}
             <EditableImage
               image={offer.image ?? "/placeholder_deals.png"}
               user_id={id}
               offer_id={offer.offer_id}
               onChange={(image) => handleOfferUpdate(index, "image", image)}
             />
         
           <div className="p-4 flex flex-col gap-2">
             <h3 className="text-xl font-semibold text-gray-800">
               <EditableText
                 text={offer.offer_title}
                 onSave={(val) => handleOfferUpdate(index, "offer_title", val)}
               />
             </h3>
         
             <p className="text-gray-600 text-sm">
               <EditableText
                 text={offer.offer_desc}
                 onSave={(val) => handleOfferUpdate(index, "offer_desc", val)}
               />
             </p>
         
             <div className="text-gray-500 text-sm space-y-1">
               <p>
                 <span className="font-medium">Valid From:</span>{" "}
                 <EditableText
                   text={offer.starts_at}
                   onSave={(val) => handleOfferUpdate(index, "starts_at", val)}
                 />
               </p>
               <p>
                 <span className="font-medium">Valid Until:</span>{" "}
                 <EditableText
                   text={offer.valid_uptill}
                   onSave={(val) => handleOfferUpdate(index, "valid_uptill", val)}
                 />
               </p>
             </div>
         
             <button
               className="mt-3 text-red-500 hover:underline text-sm self-start"
               onClick={() => handleDeleteOffer(index)}
             >
               Delete Offer
             </button>
           </div>
         </div>
         
          ))}
          <button
            className="mt-6 px-4 py-2 bg-yellow-500 text-white rounded-md"
            onClick={handleCreateOffer}
          >
            Create New Offer
          </button>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-col items-center justify-center mt-10">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Tags</h3>
        <section className="flex flex-wrap items-center justify-center gap-2">
          {shop?.shop_tags.map((tag, index) => (
            <EditableText
              key={index}
              text={tag}
              onSave={(val) => {
                const updatedTags = [...shop.shop_tags];
                updatedTags[index] = val;
                setShop({ ...shop, shop_tags: updatedTags });
                updateShop(id, { shop_tags: updatedTags });
              }}
              className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold"
            />
          ))}
        </section>
        <button
          className="mt-4 px-4 py-2 bg-yellow-500 hover:bg-yellow-300 cursor-pointer text-white rounded-md"
          onClick={() => {
            const updatedTags = [...shop.shop_tags, "New Tag"];
            setShop({ ...shop, shop_tags: updatedTags });
            updateShop(id, { shop_tags: updatedTags });
          }}
        >
          Add New Tag
        </button>
      </div>

      {/* Address */}
      {shop?.shop_address && (
        <div className="flex flex-col items-center justify-center mt-10 w-full bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Shop Address</h2>
          <p className="text-gray-600 font-extrabold text-3xl mb-2">
            <EditableText
              text={shop.shop_address}
              onSave={(val) => handleShopUpdate("shop_address", val)}
            />
          </p>
        </div>
      )}

      {/* Contact Info */}
      {shop?.contact_info && (
        <div className="flex flex-col items-center justify-center mt-10 w-full bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact Info</h2>
          <p className=" font-extrabold text-3xl text-gray-700 mb-1">
            <EditableText
              text={shop.contact_info}
              onSave={(val) => handleShopUpdate("contact_info", val)}
            />
          </p>
        </div>
      )}

      {/* Links */}
      {shop&&shop?.links && (
        <div className="flex flex-col items-center justify-center mt-10 w-full bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Shop Links</h2>
          {shop?.links?.map((link, index) => (
            <EditableText
              key={index}
              text={link}
              onSave={(val) => {
                const updatedLinks = [...shop.links];
                updatedLinks[index] = val;
                setShop({ ...shop, links: updatedLinks });
                updateShop(id, { links: updatedLinks });
              }}
              className="text-yellow-500 hover:bg-yellow-300 cursor-pointer underline text-lg"
            />
          ))}
          <button
            className="mt-4 px-4 py-2 bg-yellow-500 hover:bg-yellow-300 cursor-pointer text-white rounded-md"
            onClick={() => {
              const updatedLinks = [...shop.links, "https://newlink.com"];
              setShop({ ...shop, links: updatedLinks });
              updateShop(id, { links: updatedLinks });
            }}
          >
            Add New Link
          </button>
        </div>
      )}
    </section>
  );
}

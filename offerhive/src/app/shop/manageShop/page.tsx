"use client";
import { useEffect, useState } from "react";
import { getShopById, updateShop, updateOffer } from "@/lib/DB/offerer";
import { Shop, Offer } from "@/lib/types";
import EditableText from "@/components/editableText";
import { useSelector } from "react-redux";
import EditableImages from "@/components/editableImages";
export default function ManageShop() {
  const id = useSelector((state: any) => state.user.user_id);
  console.log(id);
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const data = await getShopById(id);
        setShop(data);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch shop:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShop();
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
    value: string
  ) => {
    if (!shop) return;
    const updatedOffers = [...shop.offers];
    updatedOffers[index] = { ...updatedOffers[index], [field]: value };
    setShop({ ...shop, offers: updatedOffers });
    await updateOffer(id, index, { [field]: value });
  };

  if (loading)
    return <div className="text-center text-xl font-medium">Loading...</div>;
  if (!shop)
    return (
      <div className="text-center text-red-500 text-xl">Shop not found.</div>
    );

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
          setShop({ ...shop, shop_images: images });
          updateShop(id, { shop_images: images });
        }}
      />
      <div className="w-full mt-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Available Offers
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {shop.offers.map((offer, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden w-80 border border-gray-200"
            >
              <img
                src={offer.image}
                alt={offer.offer_title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  <EditableText
                    text={offer.offer_title}
                    onSave={(val) =>
                      handleOfferUpdate(index, "offer_title", val)
                    }
                  />
                </h3>
                <p className="text-gray-600 mb-2">
                  <EditableText
                    text={offer.offer_desc}
                    onSave={(val) =>
                      handleOfferUpdate(index, "offer_desc", val)
                    }
                  />
                </p>
                <p className="text-sm text-gray-500">
                  Valid: {new Date(offer.starts_at).toLocaleDateString()} -{" "}
                  {new Date(offer.valid_uptill).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {shop && (
        <>
          {/* Shop Tags */}
          <div className="flex flex-col items-center justify-center mt-10">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Tags</h3>
            <section className="flex flex-wrap items-center justify-center gap-2">
              {shop.shop_tags.map((tag, index) => (
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

          {/* Shop Address */}
          {shop.shop_address && (
            <div className="flex flex-col items-center justify-center mt-10 w-full bg-gray-100 p-6 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Shop Address
              </h2>
              <p className="text-gray-600 mb-2">
                <EditableText
                  text={shop.shop_address}
                  onSave={(val) => handleShopUpdate("shop_address", val)}
                />
              </p>
            </div>
          )}

          {shop.contact_info && (
            <div className="flex flex-col items-center justify-center mt-10 w-full bg-gray-100 p-6 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Contact Info
              </h2>
              <p className="text-lg text-gray-700 mb-1">
                <EditableText
                  text={shop.contact_info}
                  onSave={(val) => handleShopUpdate("contact_info", val)}
                />
              </p>
            </div>
          )}

          {/* Shop Links */}
          {shop.links && (
            <div className="flex flex-col items-center justify-center mt-10 w-full bg-gray-100 p-6 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Shop Links
              </h2>
              {shop.links.map((link, index) => (
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
        </>
      )}
    </section>
  );
}

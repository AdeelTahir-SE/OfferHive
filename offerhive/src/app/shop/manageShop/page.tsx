"use client";
import { useEffect, useState } from "react";
import {
  updateShop,

} from "@/lib/database/offerer";
import { Shop, Offer } from "@/lib/types";
import EditableText from "@/components/editableText";
import { useSelector } from "react-redux";
import EditableImages from "@/components/editableImages";
import EditableImage from "@/components/editableImage";
import Loader from "@/components/loader";
import Link from "next/link";
import { RootState } from "@/lib/redux/store";
import { fetchRequest } from "@/lib/utils/fetch";

export default function ManageShop() {
  const id = useSelector((state: RootState) => state.user.user_id);
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [editingOffers, setEditingOffers] = useState<Set<string> | null>(
    new Set()
  );

  useEffect(() => {
    const fetchData = async () => {
      fetchRequest(
        `/api/shop/manageShop`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            shop_id: id || "",
          },
        },
        setLoading,
        (error) => {
          console.error("Failed to fetch shop data:", error);
        },
        (data) => {
          if (data) {
            setShop(data?.shop);
            setOffers(data?.offers || []);
          } else {
            console.error("No shop data found for id:", id);
          }
        }
      );
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
    value: string | null
  ) => {
    if (!value && field !== "image") {
      return;
    }
    const updatedOffers = [...offers];
    const offer = updatedOffers[index];
    if (!offer) return;

    const updatedOffer = { ...offer, [field]: value };
    updatedOffers[index] = updatedOffer;
    setOffers(updatedOffers);
  };

  async function handlechangeOffer(offer_id: string) {
    const offer = offers.find((o) => o.offer_id === offer_id);
    if (!offer) return;

    const newEditingOffers = new Set(editingOffers);
    if (editingOffers?.has(offer_id)) {
      await fetchRequest(
        `/api/shop/manageShop/offer/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            offer_id,
            user_id: id,
            offer_title: offer.offer_title,
            offer_desc: offer.offer_desc,
            image: offer.image,
            starts_at: offer.starts_at,
            valid_uptill: offer.valid_uptill,
          }),
        },
        () => {
          console.log("Offer updated successfully");
        },
        (error) => {
          console.error("Failed to update offer:", error);
        },
        () => {}
      );

      newEditingOffers.delete(offer_id);
    } else {
      newEditingOffers.add(offer_id);
    }

    setEditingOffers(newEditingOffers);
  }

  const handleDeleteOffer = async (index: number) => {
    const offer = offers[index];
    if (!offer) return;
    const updated = offers.filter((_, i) => i !== index);
    setOffers(updated);

    await fetchRequest(
      `/api/shop/manageShop/offer/delete`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          offer_id: offer.offer_id,
          user_id: id,
        }),
      },
      () => {
        console.log("Offer deleted successfully");
      },
      (error) => {
        console.error("Failed to delete offer:", error);
      },
      () => {}
    );
  };

  const handleCreateOffer = async () => {
   if(!id){
      console.error("User ID is not available");
      return;
    }
    await fetchRequest(
      `/api/shop/manageShop/offer/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id}),
      },
      () => {
        console.log("Offer created successfully");
      },
      (error) => {
        console.error("Failed to create offer:", error);
      },
      (offerCreated) => {
        setOffers([...offers, offerCreated]);
      }
    );

  };

  if (loading) {
    return (
      <section className="h-screen max-w-screen w-screen bg-white flex items-center justify-center">
        <Loader size={12} />
      </section>
    );
  }
  if (!shop) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 ">
        <h2 className="text-3xl text-red-500 font-bold mb-4">Shop Not Found</h2>
        <p className="text-gray-600 mb-6">
          The shop you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
        <Link href="/">
          <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            Go to Home
          </button>
        </Link>
      </div>
    );
  }
  return (
    <section className="flex flex-col items-center justify-center p-4 md:max-w-6xl mx-auto max-w-screen">
      <h1 className="text-5xl text-center font-extrabold text-gray-800 mb-4">
        <EditableText
          text={shop.shop_title}
          onSave={(val) => handleShopUpdate("shop_title", val)}
          isEditing={true}
        />
      </h1>

      <p className="text-xl text-gray-600 text-center max-w-2xl mb-6">
        <EditableText
          text={shop.shop_desc}
          onSave={(val) => handleShopUpdate("shop_desc", val)}
          isEditing={true}
        />
      </p>

      <EditableImages
        images={shop.shop_images ?? []}
        id={id}
        onChange={(images) => {
          if (
            !Array.isArray(images) ||
            images.some((image) => typeof image !== "string")
          ) {
            alert("Error setting image: Invalid image data");
            return;
          }
          setShop({ ...shop, shop_images: images });
          updateShop(id, { shop_images: images });
        }}
      />

      <div className="w-full mt-10 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Available Offers
        </h2>

        <div className="flex flex-wrap justify-center gap-6">
          {offers.map((offer, index) => {
            const isEditing = editingOffers?.has(offer.offer_id);

            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md flex flex-col w-80 border border-gray-200 overflow-hidden"
              >
                <EditableImage
                  image={offer.image ?? "/placeholder_deals.png"}
                  user_id={id}
                  isEditing={isEditing}
                  offer_id={offer.offer_id}
                  onChange={(image) => handleOfferUpdate(index, "image", image)}
                />

                <div className="p-4 flex flex-col gap-2">
                  <h3 className="text-xl font-semibold text-gray-800">
                    <EditableText
                      text={offer.offer_title}
                      isEditing={isEditing}
                      onSave={(val) =>
                        handleOfferUpdate(index, "offer_title", val)
                      }
                    />
                  </h3>

                  <p className="text-gray-600 text-sm">
                    <EditableText
                      text={offer.offer_desc}
                      isEditing={isEditing}
                      onSave={(val) =>
                        handleOfferUpdate(index, "offer_desc", val)
                      }
                    />
                  </p>

                  <div className="text-gray-500 text-sm space-y-1">
                    <p>
                      <span className="font-medium">Valid From:</span>{" "}
                      <EditableText
                        text={offer.starts_at}
                        isEditing={isEditing}
                        onSave={(val) =>
                          handleOfferUpdate(index, "starts_at", val)
                        }
                      />
                    </p>
                    <p>
                      <span className="font-medium">Valid Until:</span>{" "}
                      <EditableText
                        text={offer.valid_uptill}
                        isEditing={isEditing}
                        onSave={(val) =>
                          handleOfferUpdate(index, "valid_uptill", val)
                        }
                      />
                    </p>
                  </div>
                  <div className="flex flex-row items-center justify-between *:text-lg *:font-semibold *:hover:cursor-pointer ">
                    <button
                      className="mt-3 text-red-500 hover:underline  self-start"
                      onClick={() => handleDeleteOffer(index)}
                    >
                      Delete Offer
                    </button>
                    <button
                      className={`mt-3 ${
                        !isEditing ? "text-yellow-500" : "text-green-500"
                      }  hover:underline self-start`}
                      onClick={() => {
                        handlechangeOffer(offer?.offer_id);
                      }}
                    >
                      {!isEditing ? "Change Offer" : "update"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <button
          className="mt-6 px-4 py-2 bg-yellow-500 text-white rounded-md hover:cursor-pointer"
          onClick={handleCreateOffer}
        >
          Create New Offer
        </button>
      </div>

      {/* Tags */}
      <div className="flex flex-col items-center justify-center mt-10">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Tags</h3>
        <section className="flex flex-wrap items-center justify-center gap-2">
          {shop?.shop_tags.map((tag, index) => (
            <div
              key={index}
              className="flex items-center gap-1 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold"
            >
              <EditableText
                text={tag}
                onSave={(val) => {
                  const updatedTags = [...shop.shop_tags];
                  updatedTags[index] = val;
                  setShop({ ...shop, shop_tags: updatedTags });
                  updateShop(id, { shop_tags: updatedTags });
                }}
              />
              <button
                onClick={() => {
                  const updatedTags = shop.shop_tags.filter(
                    (_, i) => i !== index
                  );
                  setShop({ ...shop, shop_tags: updatedTags });
                  updateShop(id, { shop_tags: updatedTags });
                }}
                className="ml-1 text-white font-bold hover:text-red-200"
              >
                ✖
              </button>
            </div>
          ))}
        </section>
        <button
          className={`mt-4 px-4 py-2 ${
            shop.shop_tags.length >= 5
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-yellow-500 hover:bg-yellow-300"
          } text-white rounded-md`}
          disabled={shop.shop_tags.length >= 5}
          onClick={() => {
            if (shop.shop_tags.length >= 5) return;
            const updatedTags = [...shop.shop_tags, "New Tag"];
            setShop({ ...shop, shop_tags: updatedTags });
            updateShop(id, { shop_tags: updatedTags });
          }}
        >
          {shop.shop_tags.length >= 5 ? "Max 5 Tags Reached" : "Add New Tag"}
        </button>
      </div>

      {/* Address */}
      {
        <div className="flex flex-col items-center justify-center mt-10 w-full bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Shop Address
          </h2>
          <p className="text-gray-600 font-extrabold text-3xl mb-2">
            <EditableText
              text={shop.shop_address}
              onSave={(val) => handleShopUpdate("shop_address", val)}
            />
          </p>
        </div>
      }

      {/* Contact Info */}
      {
        <div className="flex flex-col items-center justify-center mt-10 w-full bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Contact Info
          </h2>
          <p className=" font-extrabold text-3xl text-gray-700 mb-1">
            <EditableText
              text={shop.contact_info}
              onSave={(val) => handleShopUpdate("contact_info", val)}
            />
          </p>
        </div>
      }

      {shop && shop.links && (
        <div className="flex flex-col items-center justify-center mt-10 w-full bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Shop Links</h2>
          <section className="flex flex-wrap gap-3 justify-center">
            {shop.links.map((link, index) => (
              <div
                key={index}
                className="flex items-center bg-white shadow p-2 rounded-md"
              >
                <EditableText
                  text={link}
                  onSave={(val) => {
                    const updatedLinks = [...shop.links];
                    updatedLinks[index] = val;
                    setShop({ ...shop, links: updatedLinks });
                    updateShop(id, { links: updatedLinks });
                  }}
                  className="text-yellow-500 underline"
                />
                <button
                  onClick={() => {
                    const updatedLinks = shop.links.filter(
                      (_, i) => i !== index
                    );
                    setShop({ ...shop, links: updatedLinks });
                    updateShop(id, { links: updatedLinks });
                  }}
                  className=" text-red-500 hover:text-red-700 text-sm font-bold"
                >
                  ✖
                </button>
              </div>
            ))}
          </section>
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

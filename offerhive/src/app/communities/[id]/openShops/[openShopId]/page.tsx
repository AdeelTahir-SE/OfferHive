"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { fetchRequest } from "@/lib/utils/fetch";
import { GroupShopData } from "@/lib/types";
import Image from "next/image";
import SearchBar from "@/components/searchBar";
import SearchIcon from "@/components/searchIcon";
import Loader from "@/components/loader";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { GroupShopOffer } from "@/lib/types";
export default function OpenShopOffers() {
  const { openShopId, id }: { openShopId: string; id: string } = useParams();
  const [shop, setShop] = useState<GroupShopData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [offers, setOffers] = useState([]);
  const [counter, setCounter] = useState(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const fetchOffers = useCallback(async () => {
    if (!hasMore) return;

    try {
      await fetchRequest(
        `/api/communities/openShops/${openShopId}
?searchQuery=${encodeURIComponent(searchTerm)}&counter=${counter}&offers=${true}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
        setIsFetching,
        setError,
        (data) => {
          setOffers(data?.data || []);
          console.log("Shop offers fetched:", data?.data);
        }
      );
    } catch (err) {
      console.error("Failed to fetch open shops:", err);
    }
    if (!offers || offers?.length <= 0) {
      setHasMore(false);
    }
  }, [searchTerm, counter, hasMore]);

  useEffect(() => {
    const fetchShop = async () => {
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

    fetchShop();
  }, [openShopId]);

  useEffect(() => {
    fetchOffers();
  }, [fetchOffers]);

  const handleScroll = () => {
    if (offers?.length === 0 || isFetching || !hasMore) return;

    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 100
    ) {
      setCounter((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetching, hasMore, offers]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setOffers([]);
    setCounter(0);
    setHasMore(true);
  };

  return (
    <section className="flex flex-col items-center justify-center gap-[30px] rounded-xl py-6 px-[40px] sm:px-0 w-full  md:px-[100px] xl:px-px[200px] xxl:px-[450px]">
      <h1 className="heading-1">{shop?.group_shop_name}</h1>
      <p className="description">{shop?.group_shop_description}</p>
      {/* {shop?.image_url && (
            <Image
              src={shop.image_url}
              alt={shop.group_shop_name}
              width={300}
              height={200}
              className="rounded-lg mt-4"
            />
          )} */}

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      <h2 className="heading-1">{shop?.group_shop_name} Offers</h2>
      <div className="md:max-w-2/3 min-w-[300px] md:w-full">
        <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 w-full max-w-4xl place-items-center">
        <CreateOffer id={id} openShopId={openShopId} />
        {offers?.length === 0 && !isFetching && (
          <section className="flex flex-col items-center justify-center text-primary">
            <SearchIcon />
            <h2 className="text-2xl font-bold mt-4">No Offerers Found</h2>
          </section>
        )}
        {offers?.map((offer:GroupShopOffer) => (
          <GroupShopOfferCard
            key={offer?.id}
            title={offer?.group_shop_offer_title}
            description={offer?.description}
            imageurl={offer?.image_url}
            price={offer?.price}
            contact={offer?.contact}
            createdAt={offer?.created_at}
          />
        ))}
      </section>
      {isFetching && (
        <section className="flex items-center justify-center mt-4 mb-4">
          <Loader size={3} />
        </section>
      )}

      {!hasMore && offers?.length > 0 && (
        <p className="text-gray-500 mt-4">
          No more communityProviders to show.
        </p>
      )}
    </section>
  );
}

interface OfferCardProps {
  title: string;
  description: string;
  contact: string;
  price: string;
  imageurl: string;
  createdAt: string;
}

function GroupShopOfferCard({
  title,
  description,
  contact,
  price,
  imageurl,
  createdAt,
}: OfferCardProps) {
  return (
    <section className="max-w-sm w-full bg-white shadow-md rounded-xl min-h-96 p-4 flex flex-col items-center text-center space-y-3">
      <div className="w-full h-48 relative">
        <Image
          src={imageurl}
          alt={title || ""}
          layout="fill"
          objectFit="cover"
          className="rounded-md border-1"
        />
      </div>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600 whitespace-normal break-words max-w-full">
        {description}
      </p>
      <p className="text-gray-400">{createdAt}</p>
      <p className="text-sm text-gray-500">📞{contact}</p>
      <p className="text-md font-bold text-green-600">Rs. {price}</p>
    </section>
  );
}

function CreateOffer({ id, openShopId }: { id: string; openShopId: string }) {
  const router = useRouter();
  const link = `/communities/${id}/openShops/${openShopId}/createOffer`;
  useEffect(() => {
    router.prefetch(link);
  }, []);

  return (
    <section className="max-w-sm w-full bg-white shadow-md rounded-xl min-h-96 p-4 flex flex-col items-center text-center space-y-4">
      <div className="bg-yellow-100 flex items-center justify-center p-4 border-2 border-dashed border-yellow-500 rounded-md w-full h-48">
        <p className="font-bold text-yellow-500">Item Image</p>
      </div>

      <h3 className="text-lg font-semibold text-gray-800">Create your Offer</h3>

      <button
        className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-md"
        onClick={() => {
          router?.push(link);
        }}
      >
        Create
      </button>
    </section>
  );
}

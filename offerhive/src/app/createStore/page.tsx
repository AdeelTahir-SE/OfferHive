"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { setIsShopOwner } from "@/lib/redux/user/userSlice";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { RootState } from "@/lib/redux/store";
import { fetchRequest } from "@/lib/utils/fetch";

export interface Shop {
  shop_desc: string;
  shop_title: string;
  contact_info: string;
  links: string[];
  shop_tags: string[];
  shop_address: string;
}

export default function CreateStore() {
  const [shop, setShop] = useState<Shop>({
    shop_desc: "",
    shop_title: "",
    contact_info: "",
    links: [],
    shop_tags: [],
    shop_address: "",
  });
  const [response, setResponse] = useState<any>(null);
  const [tagsInput, setTagsInput] = useState("");
  const [imagesInput, setImagesInput] = useState<File[]>([]);
  const [linksInput, setLinksInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setShop((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImagesInput((prevFiles) => [...prevFiles, ...files]);
    }
  };

  const handleAddTag = () => {
    if (tagsInput) {
      setShop((prevState) => ({
        ...prevState,
        shop_tags: [...prevState.shop_tags, tagsInput],
      }));
      setTagsInput("");
    }
  };

  const handleRemoveTag = (index: number) => {
    setShop((prevState) => ({
      ...prevState,
      shop_tags: prevState.shop_tags.filter((_, idx) => idx !== index),
    }));
  };

  const handleAddLink = () => {
    if (linksInput) {
      setShop((prevState) => ({
        ...prevState,
        links: [...prevState.links, linksInput],
      }));
      setLinksInput("");
    }
  };

  const handleRemoveLink = (index: number) => {
    setShop((prevState) => ({
      ...prevState,
      links: prevState.links.filter((_, idx) => idx !== index),
    }));
  };

  const handleRemoveImage = (index: number) => {
    setImagesInput((prevFiles) => prevFiles.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("shop_owner_id", user?.user_id);
      formData.append("shop_title", shop?.shop_title);
      formData.append("shop_desc", shop?.shop_desc);
      formData.append("shop_address", shop?.shop_address);
      formData.append("shop_contact_info", shop?.contact_info);

      imagesInput?.forEach((img: File) => {
        formData.append("shop_images", img);
      });

      shop?.shop_tags?.forEach((tag: string) => {
        formData.append("shop_tags", tag);
      });

      shop?.links?.forEach((link: string) => {
        formData.append("shop_links", link);
      });

      await fetchRequest(
        "/api/createStore",
        {
          method: "POST",
          body: formData,
        },
        setLoading,
        setError,
        (response) => {
          if (response?.success) {
            setShop({
              shop_desc: "",
              shop_title: "",
              contact_info: "",
              links: [],
              shop_tags: [],
              shop_address: "",
            });
            setTagsInput("");
            setImagesInput([]);
            setLinksInput("");
            dispatch(setIsShopOwner(true));
            router.push("/shop/dashboard");
            setResponse(null);
          } 
        }
      );
    } catch (error) {
      setError("An error occurred while creating the shop. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  if (user?.email == "") {
    return (
      <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br max-w-screen from-yellow-50 to-white p-6">
        <div className="bg-white shadow-xl rounded-2xl p-10  w-full text-center border border-yellow-200">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
            Create Shop and Offers
          </h1>
          <p className="text-lg md:text-xl text-red-600 font-medium">
            Please login to create a shop.
          </p>

          <Link
            href="/logIn"
            className="inline-flex items-center gap-3 justify-center mt-8 text-white bg-yellow-500 hover:bg-yellow-400 text-xl font-semibold py-3 px-6 rounded-full transition-all duration-200 shadow-md"
          >
            Login
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    );
  } else if (user.is_shop_owner === false) {
    return (
      <section className="flex flex-col items-center justify-center p-6 border-2 mx-auto">
        <h1 className="heading-1 mb-[30px]">Create Shop and Offers</h1>

        <form
          onSubmit={handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
        >
          <section className="grid grid-cols-1 md:grid-cols-2 gap-5 min-w-full  mx-auto">
            {/* Shop Title */}
            <div className="flex flex-col col-span-3">
              <label
                htmlFor="shop_title"
                className="text-base font-semibold text-gray-700"
              >
                Shop Title
              </label>
              <input
                id="shop_title"
                type="text"
                placeholder="Enter your shop title max length 50"
                maxLength={50}
                className="px-4 py-3 border text-base rounded-md focus:outline-none"
                value={shop.shop_title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col col-span-3">
              <label
                htmlFor="shop_address"
                className="text-base font-semibold text-gray-700"
              >
                Shop Address (Optional)
              </label>
              <input
                id="shop_address"
                type="text"
                maxLength={60}
                placeholder="Enter your shop address max length 60"
                className="px-4 py-3 border text-base rounded-md focus:outline-none"
                value={shop.shop_address || ""}
                onChange={handleChange}
              />
            </div>

            {/* Shop Description */}
            <div className="flex flex-col col-span-3">
              <label
                htmlFor="shop_desc"
                className="text-base font-semibold text-gray-700"
              >
                Shop Description
              </label>
              <textarea
                id="shop_desc"
                placeholder="Enter your shop description max length 600"
                maxLength={600}
                className="px-4 py-3 border text-base rounded-md focus:outline-none"
                value={shop.shop_desc}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col col-span-3 w-full">
              <label
                htmlFor="contact_info"
                className="text-base font-semibold text-gray-700"
              >
                Contact Info
              </label>
              <input
                id="contact_info"
                type="text"
                placeholder="Enter your contact info max length 15"
                maxLength={15}
                className="px-4 w-full py-3 border text-base rounded-md focus:outline-none"
                value={shop.contact_info}
                onChange={handleChange}
                required
              />
            </div>

            {/* Tags */}
            <div className="flex flex-col col-span-3">
              <label
                htmlFor="tags"
                className="text-base font-semibold text-gray-700"
              >
                Shop Tags (Optional)
              </label>
              <div className="flex gap-2 items-center">
                <input
                  id="tags"
                  type="text"
                  placeholder="Enter tags max length 15"
                  maxLength={15}
                  className="px-4 py-3 border text-base rounded-md focus:outline-none"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="bg-yellow-500 text-white px-3 py-2 rounded-md"
                >
                  Add Tag
                </button>
              </div>
              <div className="flex flex-row items-center flex-wrap justify-center gap-2 mt-2">
                {shop.shop_tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-yellow-200 px-4 py-1 rounded-full relative"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(idx)}
                      className="absolute top-0 right-0 text-red-500 text-xs"
                    >
                      X
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Image Upload */}
            <div className="flex flex-col col-span-3">
              <label
                htmlFor="images"
                className="text-base font-semibold text-gray-700"
              >
                Shop Images (Optional)
              </label>
              <div className="bg-yellow-100 p-4 border-2 border-dashed border-yellow-500 rounded-md">
                <input
                  id="images"
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <label
                  htmlFor="images"
                  className="cursor-pointer text-center text-yellow-600"
                >
                  Drag and drop or click to select images
                </label>
              </div>
              <div className="flex gap-2 mt-2">
                {imagesInput.length > 0 &&
                  imagesInput.map((image, idx) => (
                    <span
                      key={idx}
                      className="bg-yellow-200 px-4 py-1 rounded-full relative"
                    >
                      {image.name}
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute top-0 right-0 text-red-500 text-xs"
                      >
                        X
                      </button>
                    </span>
                  ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-col col-span-3">
              <label
                htmlFor="links"
                className="text-base font-semibold text-gray-700"
              >
                Shop Links (Optional)
              </label>
              <div className="flex gap-2 items-center">
                <input
                  id="links"
                  type="text"
                  placeholder="Enter shop link"
                  className="px-4 py-3 border text-base rounded-md focus:outline-none"
                  value={linksInput}
                  onChange={(e) => setLinksInput(e.target.value)}
                />
                <button
                  type="button"
                  onClick={handleAddLink}
                  className="bg-yellow-500 text-white px-3 py-2 rounded-md"
                >
                  Add Link
                </button>
              </div>
              <div className="flex flex-row items-center justify-center flex-wrap gap-2 mt-2">
                {shop.links.map((link, idx) => (
                  <span
                    key={idx}
                    className="bg-yellow-200 px-4 py-1 rounded-full relative overflow-hidden text-ellipsis whitespace-nowrap"
                  >
                    {link}
                    <button
                      type="button"
                      onClick={() => handleRemoveLink(idx)}
                      className="absolute top-0 right-0 text-red-500 text-xs"
                    >
                      X
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 cursor-pointer col-span-2 md:col-span-1 text-base font-semibold bg-yellow-500 hover:bg-yellow-400 text-white rounded-md transition"
              disabled={loading}
            >
              {loading ? "Creating Shop..." : "Create Shop"}
            </button>

            
          </section>
          {/* Error message */}
            {error && (
              <div className="mt-4 text-red-500 text-center">{error}</div>
            )}
        </form>
      </section>
    );
  }
}

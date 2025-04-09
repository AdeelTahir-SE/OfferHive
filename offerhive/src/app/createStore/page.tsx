"use client";
import { useState } from "react";
import { createShop } from "@/lib/DB/offerer";
import { useSelector } from "react-redux";

export interface Shop {
  shop_desc: string;
  shop_title: string;
  contact_info: string;
  links: string[];
  shop_images: string[];
  shop_tags: string[];
  shop_address: string;
}

export default function CreateStore() {
  const [shop, setShop] = useState<Shop>({
    shop_desc: "",
    shop_title: "",
    contact_info: "",
    links: [],
    shop_images: [],
    shop_tags: [],
    shop_address: "",
  });
  const [tagsInput, setTagsInput] = useState("");
  const [imagesInput, setImagesInput] = useState<File[]>([]);
  const [linksInput, setLinksInput] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state

  const user = useSelector((state: any) => state.user);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setShop((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  // Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImagesInput((prevFiles) => [...prevFiles, ...files]); // Add new files to the existing ones
    }
  };

  // Handle tag input
  const handleAddTag = () => {
    if (tagsInput) {
      setShop((prevState) => ({
        ...prevState,
        shop_tags: [...prevState.shop_tags, tagsInput],
      }));
      setTagsInput("");
    }
  };

  // Remove tag
  const handleRemoveTag = (index: number) => {
    setShop((prevState) => ({
      ...prevState,
      shop_tags: prevState.shop_tags.filter((_, idx) => idx !== index),
    }));
  };

  // Handle link input
  const handleAddLink = () => {
    if (linksInput) {
      setShop((prevState) => ({
        ...prevState,
        links: [...prevState.links, linksInput],
      }));
      setLinksInput("");
    }
  };

  // Remove link
  const handleRemoveLink = (index: number) => {
    setShop((prevState) => ({
      ...prevState,
      links: prevState.links.filter((_, idx) => idx !== index),
    }));
  };

  // Remove image
  const handleRemoveImage = (index: number) => {
    setImagesInput((prevFiles) => prevFiles.filter((_, idx) => idx !== index));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true); // Set loading to true when starting the submission
    setError(""); 

    try {
      const response = await createShop(user.user_id, shop, imagesInput);

      if (response?.data) {
        setShop({
          shop_desc: "",
          shop_title: "",
          contact_info: "",
          links: [],
          shop_images: [],
          shop_tags: [],
          shop_address: "",
        });
        setTagsInput("");
        setImagesInput([]);
        setLinksInput("");
        console.log("Shop Created Successfully", response);
        window.location.href = "/shop/dashboard";
      } else {
        setError("Error creating shop. Please try again.");
      }
    } catch (error) {
      setError("An error occurred while creating the shop. Please try again.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <section className="flex flex-col items-center justify-center p-6 max-w-6xl mx-auto">
      <h1 className="text-5xl text-center font-extrabold text-gray-800 mb-4">Create Shop and Offers</h1>

      <form onSubmit={handleSubmit}>
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-4xl mx-auto">
          {/* Shop Title */}
          <div className="flex flex-col">
            <label htmlFor="shop_title" className="text-base font-semibold text-gray-700">Shop Title</label>
            <input
              id="shop_title"
              type="text"
              placeholder="Enter your shop title"
              className="px-4 py-3 border text-base rounded-md focus:outline-none"
              value={shop.shop_title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="shop_address" className="text-base font-semibold text-gray-700">Shop Address (Optional)</label>
            <input
              id="shop_address"
              type="text"
              placeholder="Enter your shop address"
              className="px-4 py-3 border text-base rounded-md focus:outline-none"
              value={shop.shop_address || ""}
              onChange={handleChange}
            />
          </div>

          {/* Shop Description */}
          <div className="flex flex-col col-span-2">
            <label htmlFor="shop_desc" className="text-base font-semibold text-gray-700">Shop Description</label>
            <textarea
              id="shop_desc"
              placeholder="Enter your shop description"
              className="px-4 py-3 border text-base rounded-md focus:outline-none"
              value={shop.shop_desc}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col">
            <label htmlFor="contact_info" className="text-base font-semibold text-gray-700">Contact Info</label>
            <input
              id="contact_info"
              type="text"
              placeholder="Enter your contact info"
              className="px-4 py-3 border text-base rounded-md focus:outline-none"
              value={shop.contact_info}
              onChange={handleChange}
              required
            />
          </div>

          {/* Tags */}
          <div className="flex flex-col col-span-2">
            <label htmlFor="tags" className="text-base font-semibold text-gray-700">Shop Tags (Optional)</label>
            <div className="flex gap-2 items-center">
              <input
                id="tags"
                type="text"
                placeholder="Enter tags"
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
            <div className="flex gap-2 mt-2">
              {shop.shop_tags.map((tag, idx) => (
                <span key={idx} className="bg-yellow-200 px-4 py-1 rounded-full relative">
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
          <div className="flex flex-col col-span-2">
            <label htmlFor="images" className="text-base font-semibold text-gray-700">Shop Images (Optional)</label>
            <div className="bg-yellow-100 p-4 border-2 border-dashed border-yellow-500 rounded-md">
              <input
                id="images"
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <label htmlFor="images" className="cursor-pointer text-center text-yellow-600">
                Drag and drop or click to select images
              </label>
            </div>
            <div className="flex gap-2 mt-2">
              {imagesInput.length > 0 && imagesInput.map((image, idx) => (
                <span key={idx} className="bg-yellow-200 px-4 py-1 rounded-full relative">
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
          <div className="flex flex-col col-span-2">
            <label htmlFor="links" className="text-base font-semibold text-gray-700">Shop Links (Optional)</label>
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
            <div className="flex gap-2 mt-2">
              {shop.links.map((link, idx) => (
                <span key={idx} className="bg-yellow-200 px-4 py-1 rounded-full relative">
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
            className="w-full py-3 cursor-pointer text-base font-semibold bg-yellow-500 hover:bg-yellow-400 text-white rounded-md transition"
            disabled={loading}
          >
            {loading ? "Creating Shop..." : "Create Shop"}
          </button>

          {/* Error message */}
          {error && (
            <div className="mt-4 text-red-500 text-center">{error}</div>
          )}
        </section>
      </form>
    </section>
  );
}

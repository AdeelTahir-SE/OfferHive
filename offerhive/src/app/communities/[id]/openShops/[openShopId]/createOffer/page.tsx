"use client";
import { useState, ChangeEvent, FormEvent, useRef } from "react";
import Image from "next/image";
import { fetchRequest } from "@/lib/utils/fetch";
import { useParams } from "next/navigation";

interface OfferForm {
  title: string;
  description: string;
  contact: string;
  price: string;
  imageFile: File | null;
}

export default function CreateOffer() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>("");
  const imageRef = useRef<HTMLInputElement | null>(null);
  const { openShopId, id }: { openShopId: string; id: string } = useParams();
  const [form, setForm] = useState<OfferForm>({
    title: "",
    description: "",
    contact: "",
    price: "",
    imageFile: null,
  });
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, imageFile: file }));
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleImageUpload = () => {
    imageRef?.current?.click();
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    if (form?.imageFile) {
      formData.append("image", form.imageFile);
    }
    formData.append("title", form.title);
    formData.append("contact", form.contact);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("openShopId", openShopId);

    await fetchRequest(
      `/api/communities/openShops/${id}/createOffer`,
      {
        method: "POST",
        body: formData,
      },
      setLoading,
      (error) => {
        setError(error);
        console.log(error);
      },
      (data) => {
        console.log(data);
        alert("Offer created successfully!");
        setForm({
          title: "",
          description: "",
          contact: "",
          price: "",
          imageFile: null,
        });
        setPreview(null);
      }
    );

    console.log("Offer data:", form);
  };

  return (
    <section className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700">Image</label>
          <div className="mt-2 relative w-full h-92 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
            {preview && (
              <Image
                src={preview}
                alt="Image preview"
                layout="fill"
                objectFit="cover"
                onClick={handleImageUpload}
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              ref={imageRef}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />

            {!preview && (
              <div
                className="absolute inset-0 flex items-center justify-center text-gray-400"
                onClick={handleImageUpload}
              >
                <p>Click to upload</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="title"
            className="text-sm font-semibold text-gray-700"
          >
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            maxLength={30}
            value={form.title}
            placeholder="max 30 characters"
            onChange={handleChange}
            required
            className="mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="description"
            className="text-sm font-semibold text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={form.description}
            maxLength={300}
            onChange={handleChange}
            placeholder="max 300 characters"
            required
            className="mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label
              htmlFor="price"
              className="text-sm font-semibold text-gray-700"
            >
              Price (Rs.)
            </label>
            <input
              id="price"
              name="price"
              type="text"
              value={form.price}
              maxLength={25}
              onChange={handleChange}
              placeholder="max 25 characters"
              required
              className="mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="contact"
              className="text-sm font-semibold text-gray-700"
            >
              Contact
            </label>
            <input
              id="contact"
              name="contact"
              type="text"
              maxLength={15}
              value={form.contact}
              onChange={handleChange}
              placeholder="max 15 characters"
              required
              className="mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 cursor-pointer text-white font-semibold rounded-md shadow transition"
        >
          {loading ? "loading..." : "Submit"}
        </button>
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </section>
  );
}

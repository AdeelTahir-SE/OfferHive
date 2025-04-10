"use client";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { uploadOfferImage } from "@/lib/DB/offerer";

export default function EditableImage({
  image,
  onChange,
  user_id,
  offer_id,
}: {
  image: string;
  onChange: (updatedImage: string) => void;

  user_id: string;
  offer_id: string;
}) {
  const [localImage, setLocalImage] = useState<string | null>(image);
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    setLocalImage("");
    onChange("");
  };

  const handleAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);

    try {
      const url: string | null = await uploadOfferImage(
        file,
        user_id,
        offer_id
      );
      setLocalImage(url);
      onChange(url);
    } catch (error) {
      console.error("Image upload failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-start gap-4 flex-wrap">
      {localImage ? (
        <section className="relative w-32 h-32 border border-gray-300 rounded-lg overflow-hidden">
          <Trash2
            className="absolute top-2 right-2 cursor-pointer text-red-500 hover:text-red-700 z-10"
            onClick={handleDelete}
          />
          <Image
            src={localImage}
            alt="Uploaded Image"
            layout="fill"
            objectFit="cover"
          />
        </section>
      ) : (
        <label className="relative w-32 h-32 border border-dashed border-gray-400 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 transition duration-200">
          {loading ? (
            <span className="text-gray-500 animate-pulse">Uploading...</span>
          ) : (
            <span className="text-gray-500">Add Image</span>
          )}
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleAddImage}
            disabled={loading}
          />
        </label>
      )}
    </section>
  );
}

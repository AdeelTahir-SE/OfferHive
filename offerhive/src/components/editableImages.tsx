"use client";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { uploadImage } from "@/lib/database/offerer";
import {handleDeleteShopImage} from "@/lib/database/offerer";
export default function EditableImages({
  images,
  onChange,
  id,
}: {
  images: string[];
  onChange: (updatedImages: string[]) => void;
  id: string;
}) {
  const [localImages, setLocalImages] = useState<string[]>(images);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (index: number) => {
    const imageUrl = localImages[index];
    if (!imageUrl) return;
  
    try {
      const urlParts = imageUrl.split("/");
      const filename = urlParts[urlParts.length - 1].split("?")[0];
  
      const success = await handleDeleteShopImage(id, filename); // Use `id` for both offer/shop if structure is same
  
      if (success) {
        const updated = [...localImages];
        updated.splice(index, 1);
        setLocalImages(updated);
        onChange(updated);
      } else {
        alert("Failed to delete image from storage");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      alert("An error occurred while deleting the image.");
    }
  };
  
  const handleAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);

    try {
      const url = await uploadImage(file, id);
      const updated = [...localImages, url] as string[];
      setLocalImages(updated);
      onChange(updated);  // Ensure only string[] is passed to onChange
    } catch (error) {
      console.error("Image upload failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex md:flex-row flex-wrap items-center justify-center flex-col gap-4">
      {localImages.map((image, index) => (
        <section
          key={index}
          className="relative w-80 h-80 border border-gray-300 rounded-lg overflow-hidden"
        >
          <Trash2
            className="absolute top-2 right-2 cursor-pointer text-red-500 hover:text-red-700 z-10"
            onClick={() => handleDelete(index)}
          />
          <Image
            src={image || "/placeholder_deals.png"}  // Ensure image is a valid string
            alt={`Image ${index + 1}`}
            layout="fill"
            objectFit="cover"
          />
        </section>
      ))}

      {localImages.length < 5 && (
        <label className="relative w-80 h-80 border border-dashed border-gray-400 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 transition duration-200">
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

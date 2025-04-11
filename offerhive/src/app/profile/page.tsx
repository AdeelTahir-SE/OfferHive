"use client";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useState } from "react";
import { setProfileImageDB } from "@/lib/DB/user";
import {setProfileImage} from "@/lib/redux/user/userSlice"
import { useDispatch } from "react-redux";

export default function Profile() {
  const User = useSelector((state: any) => state?.user);
  console.log(User)
  const [preview, setPreview] = useState(User?.profile_image);
  const [uploading, setUploading] = useState(false);
  const dispatch=useDispatch()

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !User?.user_id) return;

    setUploading(true);
    const publicUrl = await setProfileImageDB(file, User?.user_id);
    dispatch(setProfileImage(publicUrl))

    if (publicUrl) {
        console.log(publicUrl)
      setPreview(publicUrl); // update preview
    }
    setUploading(false);
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">
      {/* Profile Image */}
      <div className="w-32 h-32 relative mb-6">
        <Image
          src={preview || "/profile_placeholder.png"}
          alt={`${User?.email}'s Profile Picture`}
          className="rounded-full object-cover"
          fill
        />
      </div>

      {/* Upload Button */}
      <label className="cursor-pointer bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 mb-6">
        {uploading ? "Uploading..." : "Change Profile Picture"}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </label>

      {/* User Info */}
      <section className="text-center">
        <h1 className="text-3xl font-bold mb-2">{User?.email}</h1>
        <p className="text-gray-600 text-lg">
          Account created on {new Date(User?.created_at).toDateString()}
        </p>
      </section>
    </section>
  );
}

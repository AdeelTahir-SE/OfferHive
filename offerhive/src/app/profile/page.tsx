"use client";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useState } from "react";
import { setProfileImageDB } from "@/lib/DB/user";
import { setProfileImage } from "@/lib/redux/user/userSlice";
import { useDispatch } from "react-redux";
import { signOut } from "@/lib/DB/user";
import { setUser } from "@/lib/redux/user/userSlice";
import { useRouter } from "next/navigation";
import { RootState } from "@/lib/redux/store";

export default function Profile() {
  const User = useSelector((state: RootState) => state?.user);
  const [preview, setPreview] = useState(User?.profile_image || "/profile_placeholder.png"); // Set default preview image
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    const confirmed = confirm("Are you sure you want to logout?");
    if (!confirmed) return;

    try {
      setLoading(true);
      await signOut();
      dispatch(setUser({ user_id: "", email: "", profile_image: "/profile_placeholder.png", is_shop_owner: false, joined_groups: [], subscribed_groups: [] })); // Reset user state
      setMessage("Successfully logged out.");
      setTimeout(() => {
        router.push("/logIn");
      }, 1500);
    } catch (error) {
      setMessage("Logout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !User?.user_id) return;

    setUploading(true);
    const publicUrl = await setProfileImageDB(file, User?.user_id);
    dispatch(setProfileImage(publicUrl??""));

    if (publicUrl) {
      setPreview(publicUrl); // update preview
    }
    setUploading(false);
  };
  if(User&&!User?.email){
    return(
      <section className="h-screen flex flex-col items-center justify-center ">
      <div className="text-center mt-10 max-w-lg mx-auto">
        <h1 className="text-4xl font-bold text-gray-800">
          Oops! You can not manage the profile without logging in😅
        </h1>

        <button
          onClick={() => router.push("/logIn")}
          className="mt-8 bg-yellow-400 cursor-pointer text-black py-3 px-8 rounded-full hover:bg-yellow-500 text-lg font-semibold transition duration-300 shadow-lg"
        >
          Login
        </button>
      </div>
    </section>
    )
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">
      <div className="w-32 h-32 relative mb-6">
        <Image
          src={preview || "/profile_placeholder.png"} // Fallback to placeholder if preview is not available
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
      </section>

      {/* Logout Section */}
      <section className="flex flex-col items-center justify-center ">
        <section className="flex flex-col items-center justify-center gap-6 px-8 py-10 border rounded-2xl shadow-lg bg-gray-50 w-[400px]">
          <h1 className="text-3xl font-bold text-gray-800">Logout</h1>

          <button
            onClick={handleLogout}
            disabled={loading}
            className={`px-4 py-2 text-white rounded-md transition-all cursor-pointer ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-600"
            }`}
          >
            {loading ? "Logging out..." : "Logout"}
          </button>

          {message && (
            <p className={`text-sm ${message.includes("failed") ? "text-red-500" : "text-yellow-600"}`}>
              {message}
            </p>
          )}
        </section>
      </section>
    </section>
  );
}

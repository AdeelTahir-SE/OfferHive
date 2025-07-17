"use client";
import { fetchRequest } from "@/lib/utils/fetch";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/lib/redux/user/userSlice";
export default function Logout() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const confirmed = confirm("Are you sure you want to logout?");
    if (!confirmed) return;

    try {
      fetchRequest(
        "/api/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
        setLoading,
        (error) => {
          console.error(error);
        },
        (data) => {
          if (data) {
            setMessage("Successfully logged out.");
            dispatch(
              setUser({
                user_id: "",
                email: "",
                profile_image: "",
                is_shop_owner: false,
                subscribed_groups: [],
                joined_groups: [],
              })
            );
            setTimeout(() => {
              router.push("/logIn");
            }, 1500);
          } else {
            setMessage("Logout failed. Please try again.");
          }
        }
      );
    } catch (error) {
      setMessage("Logout failed. Please try again.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen bg-white font-sans">
      <section className="flex flex-col items-center justify-center gap-6 px-8 py-10 border rounded-2xl shadow-lg bg-gray-50 w-[400px]">
        <h1 className="text-3xl font-bold text-gray-800">Logout</h1>

        <button
          onClick={handleLogout}
          disabled={loading}
          className={`px-4 py-2 text-white rounded-md transition-all cursor-pointer ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-yellow-500 hover:bg-yellow-600"
          }`}
        >
          {loading ? "Logging out..." : "Logout"}
        </button>

        {message && (
          <p
            className={`text-sm ${
              message.includes("failed") ? "text-red-500" : "text-yellow-600"
            }`}
          >
            {message}
          </p>
        )}
      </section>
    </section>
  );
}

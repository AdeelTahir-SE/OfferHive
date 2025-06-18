"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/lib/redux/store";
import { fetchRequest } from "@/lib/utils/fetch";

export default function People() {
  interface ChatMessage {
    user_id: string;
    profile_image: string | null;
    email: string;
    message: string;
  }

  const [chat, setChat] = useState<ChatMessage[]>([]);
  const router = useRouter();
  const user = useSelector((state: RootState) => state?.user);



  const fetchChat = async (user_id: string) => {
    fetchRequest(
      `/api/people?user_id=${user_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
      () => {},
      (error) => {
        console.error("Error fetching chat:", error);
      },
      (data) => {
        setChat(data);
      }
    );
  };

  useEffect(() => {
    if (user?.user_id) {
      fetchChat(user.user_id);
    }
    console.log(user?.is_shop_owner)
  }, [user]);

  if(!user?.email){
    return(
      <section className="h-screen flex flex-col items-center justify-center ">
      <div className="text-center mt-10 max-w-lg mx-auto">
        <h1 className="text-4xl font-bold text-gray-800">
          Oops! You can not chat without logging in😅
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

  if (user&& user?.is_shop_owner) {
    return (
      <section className="h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Hold Up! 🛑</h1>
          <p className="text-lg text-gray-600 mb-6">
            You're a shop owner — this page is only for chatting with shop owners.
            What are you doing here? 😅
          </p>
          <button
            onClick={() => router.push('/')}
            className="mt-6 bg-yellow-500 text-black py-2 px-6 rounded-full hover:bg-yellow-400 transition duration-300"
          >
            Go to Home
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col items-center justify-center px-4 py-6 ml-12 h-screen">
      <div className="text-3xl font-semibold bg-yellow-500 text-black px-6 py-3 rounded-t-lg shadow w-full text-center">
        Chat with Offerers
      </div>
      <div className="scrollable max-h-96 overflow-y-auto w-full bg-white p-4 rounded-b-lg shadow-md space-y-4">
        {chat.length === 0 ? (
          <p className="text-center text-gray-600">No messages yet.</p>
        ) : (
          chat.map((message, index) => (
            <Link href={`/people/${message?.user_id}`} key={index}>
              <div className="flex flex-row items-center justify-start gap-4 rounded-xl p-4 hover:bg-gray-100 transition">
                <Image
                  src={message?.profile_image || "/profile_placeholder.png"}
                  alt="User Avatar"
                  width={50}
                  height={50}
                  className="rounded-full object-cover"
                />
                <div className="flex flex-col items-start justify-center">
                  <span className="text-sm font-semibold">{message.email}</span>
                  <span className="text-sm text-gray-700 mt-1">{message?.message}</span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}

"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { chatWithShopOwners } from "@/lib/DB/user";
import { useSelector } from "react-redux";

export default function People() {

    interface ChatMessage {
        user_id: string;
        profile_image: string | null;
        email: string;
        message: string;
      }
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const user = useSelector((state: any) => state?.user);
  const fetchChat = async (user_id:string) => {
    const chats = await chatWithShopOwners(user_id);
    console.log(chats)
    setChat(chats);
  };
  useEffect(() => {
    fetchChat(user?.user_id)
  }, []);

  return (
    <section className="flex flex-col items-center justify-center px-4 py-6 ml-12  h-screen">
      <div className="text-3xl font-semibold bg-yellow-500 text-black px-6 py-3 rounded-t-lg shadow w-full text-center">
        Chat with Offerers
      </div>
      <div className="scrollable max-h-96 overflow-y-auto w-full bg-white p-4 rounded-b-lg shadow-md space-y-4">
        {chat.length === 0 ? (
          <p className="text-center text-gray-600">No messages yet.</p>
        ) : (
          chat.map((message, index:number) => (
            <Link href={`/people/${message?.user_id}`} key={index}>
              <div
                key={index}
                className="flex flex-row items-center justify-start gap-4 rounded-xl p-4  hover:bg-gray-400 "
              >
                <Image
                  src={
                    message?.profile_image
                      ? message?.profile_image
                      : "/profile_placeholder.png"
                  }
                  alt="User Avatar"
                  width={50}
                  height={50}
                  className="rounded-full object-cover "
                />
                <div className="flex flex-col items-center justify-center">
                  <span className="text-sm font-semibold">{message.email}</span>
                  <span className="text-sm text-gray-700 mt-1">
                    {message?.message}
                  </span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}

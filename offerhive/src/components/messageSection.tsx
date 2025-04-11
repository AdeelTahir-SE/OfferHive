"use client";

import Image from "next/image";
import Link from "next/link";
import Message from "@/lib/types";

const dummyMessages: Message[] = [
  {
    message: "Hi there! I just placed an order.",
    profile_image: "/avatar.jpg", // Make sure this image exists in your public/ folder
    email: "user1@example.com",
    user_id: "12312312",
  },
  {
    message: "Can you confirm my payment?",
    profile_image: "/avatar.jpg",
    email: "user2@example.com",
    user_id: "12312312",
  },
  {
    message: "Order received, thank you!",
    profile_image: "/avatar.jpg",
    email: "user3@example.com",
    user_id: "12312312",
  },
  {
    message: "Order received, thank you!",
    profile_image: "/avatar.jpg",
    email: "user3@example.com",
    user_id: "12312312",
  },
  {
    message: "Order received, thank you!",
    profile_image: "/avatar.jpg",
    email: "user3@example.com",
    user_id: "12312312",
  },
];

export default function MessageSection({ list }: { list: Message[] }) {
  console.log("list", list);
  return (
    <section className="flex flex-col items-center justify-center px-4 py-6 ml-12 ">
      <div className="text-3xl font-semibold bg-yellow-500 text-black px-6 py-3 rounded-t-lg shadow w-full text-center">
        Check Latest Orders / Messages
      </div>
      <div className="scrollable max-h-96 overflow-y-auto w-full bg-white p-4 rounded-b-lg shadow-md space-y-4">
        {list.length === 0 ? (
          <p className="text-center text-gray-600">No messages yet.</p>
        ) : (
          list.map((message, index) => (
            <Link href={`/people/${message?.user_id}`} key={index}>
              <div
                key={index}
                className="flex flex-row items-start gap-4 rounded-xl p-4 hover:bg-gray-400 "
              >
                <Image
                  src={message?.profile_image ? message?.profile_image : "/profile_placeholder.png"}
                  alt="User Avatar"
                  width={50}
                  height={50}
                  className="rounded-full object-cover "
                />
                <div className="flex flex-col">
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

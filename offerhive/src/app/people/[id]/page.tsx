"use client";
import { useState, useEffect, use } from "react";
import { getUserwithId, getChat, setChatDB } from "@/lib/Db/user";
import { fetchRequest } from "@/lib/utils/fetch";
import { supabase } from "@/lib/Db/db";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import Image from "next/image";
import React from "react";
import { RootState } from "@/lib/redux/store";
import { useRouter } from "next/navigation";
interface User {
  profile_image: string;
  email: string;
}

interface ReduxUser {
  user_id: string;
  profile_image: string;
  email: string;
  is_shop_owner: boolean;
}

function getFormattedTimestamp() {
  const now = new Date();
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const day = now.getDate();
  const month = months[now.getMonth()];
  const year = now.getFullYear();
  const hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const weekday = daysOfWeek[now.getDay()];
  const hours12 = hours % 12 || 12;
  const ampm = hours >= 12 ? "PM" : "AM";
  return `${weekday}, ${day} ${month} ${year}, ${hours12}:${minutes}:${seconds} ${ampm}`;
}

export default function PersonChat() {
  const [chat, setChat] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const { id }: { id: string } = useParams();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const loggedInUser = useSelector(
    (state: RootState) => state.user
  ) as ReduxUser;
  const fetchUser = async () => {
    await fetchRequest(
      `/api/people/${id}/user`,
      {
        method: "GET",
      },
      setLoading,
      (error) => {},
      (data) => {
        if (data) {
          setUser(data);
        }
      }
    );
  };
  useEffect(() => {
    if (id) {
      fetchUser();
    }
  }, [id]);

  useEffect(() => {
    if (id && loggedInUser?.user_id) {
      const fetchChat = async () => {
        try {
          //sender will always not be shop owner and receiver will always be shop owner
          const senderId = loggedInUser.is_shop_owner
            ? id
            : loggedInUser.user_id;
          const receiverId = loggedInUser.is_shop_owner
            ? loggedInUser.user_id
            : id;

          await fetchRequest(
            "/api/people/chat",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "sender-id": senderId,
                "receiver-id": receiverId,
              },
            },
            setLoading,
            () => {},
            (data) => {
              if (data && Array.isArray(data.chat)) {
                console.log(data);
                setChat(data.chat);
                console.log("this is a chat", chat);
              } else {
                setChat([]);
              }
            }
          );
        } catch (error) {
          console.error("Error fetching chat:", error);
          setChat([]);
        }
      };

      fetchChat();
    }
  }, [id, loggedInUser?.user_id, loggedInUser?.is_shop_owner]);

  useEffect(() => {
    if (!id || !loggedInUser?.user_id) return;

    const sender = loggedInUser.is_shop_owner ? id : loggedInUser.user_id;
    const receiver = loggedInUser.is_shop_owner ? loggedInUser.user_id : id;

    const channel = supabase
      .channel("realtime-chat")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "Chat",
        },
        (payload) => {
          const updated = payload.new;
          const isMatch =
            (updated.user_id === sender && updated.shop_user_id === receiver) ||
            (updated.user_id === receiver && updated.shop_user_id === sender);

          if (isMatch && Array.isArray(updated.chat)) {
            setChat(updated.chat);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id, loggedInUser?.user_id, loggedInUser?.is_shop_owner]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    const newMessageData = {
      message: newMessage,
      timestamp: getFormattedTimestamp(),
      sender: loggedInUser?.user_id,
    };

    const updatedChat = [...chat, newMessageData];
    setChat(updatedChat);

    if (loggedInUser?.is_shop_owner) {
      await setChatDB(id, loggedInUser?.user_id, updatedChat);
    } else {
      await setChatDB(loggedInUser?.user_id, id, updatedChat);
    }

    setNewMessage("");
  };
  if (!loggedInUser?.email) {
    return (
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
    );
  }
  return (
    <section className="flex flex-col items-center justify-center bg-gray-100 min-h-screen p-4 sm:p-6">
      {loading ? (
        <p className="text-2xl sm:text-3xl mb-4 text-center">Loading chat...</p>
      ) : (
        <>
          <p className="text-2xl sm:text-3xl mb-4 text-center">
            Chat with {user?.email || "User"}
          </p>
        </>
      )}

      {chat?.length > 0 && (
        <div className="bg-white shadow rounded-lg w-full max-w-4xl h-full mb-4 p-4 sm:p-6 overflow-hidden">
          <div className="flex flex-col space-y-4 max-h-[75vh] overflow-y-auto pr-2">
            {chat?.length > 0 &&
              chat.map((message, index) => {
                const isSender = message.sender === loggedInUser?.user_id;
                const profileImage = isSender
                  ? loggedInUser?.profile_image
                  : user?.profile_image;

                return (
                  <div
                    key={index}
                    className={`flex items-start ${
                      isSender ? "flex-row-reverse" : "flex-row"
                    } gap-3`}
                  >
                    <div className="min-w-[2.5rem] min-h-[2.5rem] w-10 h-10">
                      <Image
                        src={profileImage || "/profile_placeholder.png"}
                        alt={isSender ? "You" : (user?.email as string)}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col max-w-[75%] sm:max-w-md">
                      <div
                        className={`p-3 rounded-lg break-words ${
                          isSender ? "bg-yellow-400" : "bg-yellow-200"
                        }`}
                      >
                        <p className="text-sm sm:text-base">
                          {message.message}
                        </p>
                      </div>
                      <span className="text-xs text-gray-500 mt-1">
                        {message.timestamp}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      <div className="flex w-full max-w-4xl flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <button
          onClick={handleSendMessage}
          className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600"
        >
          Send
        </button>
      </div>
    </section>
  );
}

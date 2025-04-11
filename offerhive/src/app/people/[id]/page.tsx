"use client";
import { useState, useEffect } from "react";
import { getUserwithId, getChat, setChatDB } from "@/lib/DB/user";
import { supabase } from "@/lib/DB/db";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import Image from "next/image";
import React from "react";
import { RootState } from "@/lib/redux/store";

function getFormattedTimestamp() {
  const now = new Date();
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
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
  const [user, setUser] = useState({ profile_image: "", email: "" });
  const { id }: { id: string } = useParams();
  const User = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUserwithId(id);
      setUser(userData);
    };
    fetchUser();
  }, [id]);

  useEffect(() => {
    if (id && User?.user_id) {
      const fetchChat = async () => {
        let chatData;
        if (!User?.is_shop_owner) {
          chatData = await getChat(User?.user_id, id);
        } else {
          chatData = await getChat(id, User?.user_id);
        }

        if (Array.isArray(chatData?.chat)) {
          setChat(chatData.chat);
        } else {
          setChat([]);
        }
      };
      fetchChat();
    }
  }, [id, User?.user_id, User?.is_shop_owner]);

  useEffect(() => {
    if (!id || !User?.user_id) return;

    const sender = User.is_shop_owner ? id : User.user_id;
    const receiver = User.is_shop_owner ? User.user_id : id;

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
         console.log("hello")
          if (isMatch && Array.isArray(updated.chat)) {
            setChat(updated.chat);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id, User?.user_id, User?.is_shop_owner]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    const newMessageData = {
      message: newMessage,
      timestamp: getFormattedTimestamp(),
      sender: User?.user_id,
    };

    const updatedChat = [...chat, newMessageData];
    setChat(updatedChat);

    if (User?.is_shop_owner) {
      await setChatDB(id, User?.user_id, updatedChat);
    } else {
      await setChatDB(User?.user_id, id, updatedChat);
    }

    setNewMessage("");
  };

  return (
    <section className="flex flex-col items-center justify-center bg-gray-100 min-h-screen p-6">
      <p className="text-3xl mb-6">Chat with {user.email}</p>
      <div className="p-4 rounded-lg w-full max-w-3xl h-auto mb-4 bg-white shadow">
        <div className="flex flex-col space-y-4">
          {chat?.length > 0 &&
            chat.map((message, index) => {
              const isSender = message.sender === User?.user_id;
              const profileImage = isSender ? User?.profile_image : user?.profile_image;

              return (
                <div key={index} className={`flex items-start space-x-3 ${isSender ? "flex-row-reverse" : ""}`}>
                  <div className="w-10 h-10 flex items-center justify-center">
                    <Image
                      src={profileImage || "/profile_placeholder.png"}
                      alt={isSender ? "You" : user.email}
                      width={300}
                      height={300}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className={`p-3 rounded-lg max-w-md ${isSender ? "bg-yellow-200" : "bg-yellow-300"}`}>
                      <p>{message.message}</p>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">{message?.timestamp}</span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      <div className="flex w-full max-w-3xl items-center space-x-4">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <button
          onClick={handleSendMessage}
          className="bg-yellow-500 text-white p-3 rounded-lg hover:bg-yellow-600"
        >
          Send
        </button>
      </div>
    </section>
  );
}

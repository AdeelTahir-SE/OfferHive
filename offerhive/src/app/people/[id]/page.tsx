"use client";
import { useState, useEffect } from "react";
import { getUserwithId, chatListener, getChat, setChatDB } from "@/lib/DB/user";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { removeChatListener } from "@/lib/DB/user";
import Image from "next/image";
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

  const day = now.getDate(); // Day of the month (e.g., 10)
  const month = months[now.getMonth()]; // Month name (e.g., "April")
  const year = now.getFullYear(); // Year (e.g., 2025)
  const hours = now.getHours(); // Hours (0-23)
  const minutes = now.getMinutes(); // Minutes (0-59)
  const seconds = now.getSeconds(); // Seconds (0-59)
  const weekday = daysOfWeek[now.getDay()]; // Weekday name (e.g., "Monday")

  // Format hours to 12-hour format and determine AM/PM
  const hours12 = hours % 12 || 12; // Convert 24-hour time to 12-hour time
  const ampm = hours >= 12 ? "PM" : "AM"; // Determine AM/PM
  const formattedMinutes = String(minutes).padStart(2, "0"); // Add leading zero if needed
  const formattedSeconds = String(seconds).padStart(2, "0"); // Add leading zero if needed
  const formattedTimestamp = `${weekday}, ${day} ${month} ${year}, ${hours12}:${formattedMinutes}:${formattedSeconds} ${ampm}`;
  console.log("sa", formattedTimestamp);

  return formattedTimestamp;
}

export default function PersonChat() {
  const [chat, setChat] = useState<any[]>([]); // Ensure it's always an array
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState<{ profile_image: string; email: string }>({
    profile_image: "",
    email: "",
  });

  const { id }: { id: string } = useParams();
  const User = useSelector((state: any) => state.user);

  // Fetch user data on mount or when `id` changes
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUserwithId(id);
      setUser(userData);
    };
    fetchUser();
  }, [id]);

  // Fetch chat data based on user roles (shop owner vs. customer)
  useEffect(() => {
    if (id && User?.user_id) {
      const fetchChat = async () => {
        let chatData;

        if (!User?.is_shop_owner) {
          // Customer chat
          chatData = await getChat(User?.user_id, id);
        } else {
          // Shop owner chat
          chatData = await getChat(id, User?.user_id);
        }
        console.log("setting chat inasd", chatData);

        // Ensure chatData is always an array
        if (Array.isArray(chatData?.chat)) {
          console.log("setting chat inasd");
          setChat(chatData?.chat);
          console.log(chatData);
        } else {
          setChat([]); // Fallback in case it's not an array
        }
      };
      fetchChat();
    }
  }, [id, User?.user_id, User?.is_shop_owner]);

  // Set up real-time chat listener when the component mounts
  useEffect(() => {
    if (id && User?.user_id) {
      const channel = User?.is_shop_owner
        ? chatListener(id, User?.user_id, setChat)
        : chatListener(User?.user_id, id, setChat);

      return () => {
        removeChatListener(channel);
      };
    }
  }, [id, User?.user_id]);

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    const now = new Date();
    const newMessageData = {
      message: newMessage,
      timestamp: getFormattedTimestamp(), // Format timestamp
      sender: User?.user_id,
    };

    // Add new message to the chat state
    setChat((prevChat) => {
      const updatedChat = Array.isArray(prevChat)
        ? [...prevChat, newMessageData]
        : [newMessageData];
      return updatedChat;
    });

    // After the state update, send the updated chat data to the database
    const updatedChat = [...chat, newMessageData]; // Ensure chat is updated with the new message

    if (User?.is_shop_owner) {
      await setChatDB(id, User?.user_id, updatedChat); // Shop owner sending the message
    } else {
      await setChatDB(User?.user_id, id, updatedChat); // Customer sending the message
    }

    // Clear the message input field
    setNewMessage("");
  };

  return (
    <section className="flex flex-col items-center justify-center bg-gray-100 min-h-screen p-6">
      <p className="text-3xl mb-6">Chat with {user.email}</p>

      {/* Chat display */}
      <div className="p-4 rounded-lg w-full max-w-3xl h-auto mb-4">
        <div className="flex flex-col space-y-4">
          {chat?.length > 0 &&
            chat.map((message, index) => {
              const isSender = message.sender === User?.user_id; // Check if the message was sent by the current user
              const profileImage = isSender ? User?.profile_image : user?.profile_image;

              return (
                <div
                  key={index}
                  className={`flex items-start space-x-3 ${
                    isSender ? "flex-row-reverse" : ""
                  }`} 
                >
                  <div className="w-10 h-10 flex items-center justify-center">
                    {profileImage?(<Image
                      src={profileImage}
                      alt={isSender ? "You" : user.email}
                      width={300}
                      height={300}
                      className="w-full h-full rounded-full object-cover"
                    />):(<span >{isSender ? "You" : user?.email?.split("@")[0]}</span>)}
                  </div>
                  <div className="flex flex-col">
                    <div
                      className={`p-3 rounded-lg max-w-md ${
                        isSender ? "bg-yellow-200" : "bg-yellow-300"
                      }`}
                    >
                      <p>{message.message}</p>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">
                      {message?.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Message input field */}
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

"use client";
import { useState } from "react";
import PeopleCard from "@/components/peopleCard";
import Image from "next/image";

export default function People() {
    const [currentCustomer, setCurrentCustomer] = useState<{ name: string; image: string }>({
        name: "",
        image: "/avatar.jpg",
    });
    const [chats, setChats] = useState<{ message: string; sender: string }[]>([]);
    const [message, setMessage] = useState("");

    const sendMessage = () => {
        if (message.trim()) {
            setChats([...chats, { message, sender: "You" }]);
            setMessage("");
        }
    };

    const handleClick = (name: string, image: string) => {
        setCurrentCustomer({ name, image });
        setChats([]); // Reset chat when switching users
    };

    return (
        <section className="flex flex-row items-center justify-around h-screen bg-gray-100 p-4">
            <section className="flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold mb-4">People</h1>
                <p className="text-lg">Here you can manage your customers.</p>
                <section className="flex flex-col items-start gap-4">
                    <PeopleCard image="/avatar.jpg" name="John Doe" onClick={handleClick} />
                    <PeopleCard image="/avatar.jpg" name="Jane Smith" onClick={handleClick} />
                    <PeopleCard image="/avatar.jpg" name="Alice Johnson" onClick={handleClick} />
                </section>
            </section>

            {/* Chat Room Section */}
            <section className="border-2 chatroom flex flex-col items-center justify-center w-1/3 bg-white shadow-lg rounded-lg p-4">
                {/* Chat Header */}
                <section className="flex flex-row items-center justify-between w-full p-4 border-b">
                    <Image src={currentCustomer.image} alt="Chat Avatar" width={50} height={50} className="rounded-full" />
                    <h2 className="text-lg font-bold text-yellow-700">{currentCustomer.name || "Select a person"}</h2>
                </section>

                {/* Chat Messages */}
                <section className="flex flex-col items-start w-full h-80 overflow-y-auto p-2 bg-gray-50 rounded-lg">
                    {chats.length === 0 ? (
                        <p className="text-gray-400 text-sm text-center w-full">No messages yet</p>
                    ) : (
                        chats.map((chat, index) => (
                            <div key={index} className={`px-4 py-2 rounded-lg mb-2 ${chat.sender === "You" ? "bg-blue-500 text-white self-end" : "bg-gray-200 text-black self-start"}`}>
                                <strong>{chat.sender}: </strong>{chat.message}
                            </div>
                        ))
                    )}
                </section>

                {/* Chat Input */}
                <section className="flex flex-row items-center w-full p-4 border-t">
                    <input
                        type="text"
                        className="border-2 rounded-xl px-4 py-2 flex-grow"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message..."
                    />
                    <button
                        className="bg-yellow-700 text-white rounded-xl px-4 py-2 ml-2"
                        onClick={sendMessage}
                        disabled={!message.trim()}
                    >
                        Send
                    </button>
                </section>
            </section>
        </section>
    );
}

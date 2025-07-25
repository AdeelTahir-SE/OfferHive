"use client";
import MessageSection from "@/components/messageSection";
import LineGraph from "@/components/lineGraph";
import BarChart from "@/components/barChart";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Message } from "@/lib/types";
import Loader from "@/components/loader";
import { RootState } from "@/lib/redux/store";
import Timer from "@/components/timer";
import { fetchRequest } from "@/lib/utils/fetch";

export default function Dashboard() {
  const [clicksArray, setClicksArray] = useState([]);
  const [latestMessagesArray, setLatestMessagesArray] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const User = useSelector((state: RootState) => state.user);

  async function getClicksInfo() {
    await fetchRequest(
      "/api/shop/dashboard/clicks",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "user_id": User?.user_id || "",
        },
      },
      () => {},
      (error) => {
      },
      (data) => {
        if (data) {
          const latestClicks = data?.clicks.slice(-7);
          setClicksArray(latestClicks);
        }
      }
    );
  }

  async function getLatestMessagesInfo() {
    await fetchRequest(
      "/api/shop/dashboard/messages",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "user_id": User?.user_id || "",
        },
      },
      () => {},
      (error) => {
      },
      (data) => {
        if (data) {
          setLatestMessagesArray(data);
        }
      }
    );
  }

  useEffect(() => {
    async function fetchData() {
      await getClicksInfo();
      await getLatestMessagesInfo();
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="flex items-center justify-center h-screen w-full max-w-screen">
        <Loader size={5} />
      </section>
    );
  }

  return (
    <section className="flex flex-col items-center justify-center bg-gray-100 min-h-screen p-4 sm:p-6 md:p-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-center">
        Welcome to the Dashboard
      </h1>
      <p className="text-base sm:text-lg text-center mb-6">
        Here you can manage your offers and settings.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full max-w-7xl">
        <MessageSection list={latestMessagesArray} />

        <section className="flex flex-col gap-6 items-center justify-center">
          <BarChart data={clicksArray} />
          <LineGraph data={clicksArray} />
        </section>

        <section className="flex flex-col items-center justify-center bg-white/30 backdrop-blur-md border border-white/40 p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-lg text-center">
          <Timer className="mb-4" />

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 drop-shadow-sm mb-4">
            🚧 Coming Soon
          </h1>
          <p className="text-gray-700 text-base sm:text-lg">
            We&apos;re working hard to bring you something amazing. Stay tuned!
          </p>
        </section>
      </div>
    </section>
  );
}

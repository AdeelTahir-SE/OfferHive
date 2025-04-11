"use client";
import React, { useEffect, useState } from "react";
import OffererCard from "@/components/offererCard";
import { getGroupById } from "@/lib/DB/group";
import { GroupUnique } from "@/lib/types";
import { useSelector } from "react-redux";
import { subscribeGroup, joinGroup } from "@/lib/DB/group";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { RootState } from "@/lib/redux/store";

export default function GroupPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [joinStatus, setJoinStaus] = useState("unjoined");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [group, setGroup] = useState<GroupUnique | null>(null);
  const { id }:{id:string} =useParams()

  const user = useSelector((state: RootState) => state.user);
  console.log("user", user);
  const fetchGroupShops = async () => {
    try {
      const data = await getGroupById(id);
      console.log(data);
      if (data) {
        setGroup(data);
        if(data?.GroupUser?.filter(user=>user.user_id==user.user_id)?.length > 0) {
          console.log("joined group")
        setJoinStaus("joined");
        }
        if(data?.GroupSubscription?.filter(user=>user.user_id==user.user_id)?.length > 0) {
          console.log("subscribed group")
        setIsSubscribed(true);
        }
      } else {
        setError("No shops found in this group.");
      }
    } catch (err) {
      setError("Error fetching group shops. Please try again later.");
      console.log(err)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGroupShops();
  }, [id]);

  async function handleJoinGroup(user_id: string, group_id: string) {
    const data = await joinGroup(user_id, group_id);
    if (!data) {
      console.error("Error joining group:");
      return;
    }
    console.log("Joined group successfully:", data);
    setJoinStaus("pending");
  }
  async function handleSubscribe(
    user_id: string,
    group_id: string,
    isSubscribed: boolean
  ) {
    const data = await subscribeGroup(user_id, group_id, isSubscribed);
    if (!data) {
      console.error("Error subscribing to group:");
      return;
    }
    setIsSubscribed(!isSubscribed);
    console.log("Subscribed to group successfully:", data);
  }

  if (isLoading)
    return <div className="text-center text-xl font-medium">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 text-xl">{error}</div>;

  return (
    <section className="flex flex-col items-center justify-center bg-gray-100 m-0 min-h-screen ">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {group?.GroupDetail?.[0]?.group_title || "Group Offerers"}
      </h1>
      <p className="text-lg text-gray-700 font-medium leading-relaxed">
        {group?.GroupDetail?.[0]?.group_desc}
      </p>

      {group && group?.GroupUser?.length > 0 ? (
        <div className="grid grid-cols-5 gap-4 w-full items-start">
          <div className="w-full max-w-3xl col-span-1 bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
              Group Details
            </h2>

            <p className="text-lg text-gray-700 font-medium leading-relaxed mb-6 text-center">
              {group?.GroupDetail?.[0]?.group_desc}
            </p>

            <div className="flex flex-col items-center space-y-4">
              <p className="text-base text-gray-600 font-medium">
                <span className="font-semibold">Group Created On:</span>{" "}
                {new Date(group?.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>

              <p className="text-base text-gray-600 font-medium">
                <span className="font-semibold">Group Owner:</span>{" "}
                {group?.user_id}
              </p>

              {group?.GroupDetail?.[0]?.group_image && (
                <Image
                  src={group?.GroupDetail?.[0]?.group_image}
                  alt="Group Image"
                  width={250}
                  height={250}
                  className="rounded-lg shadow-sm object-cover"
                />
              )}

              {group?.GroupDetail?.[0]?.group_tags?.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {group.GroupDetail[0].group_tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-yellow-200 text-yellow-800 text-sm font-semibold px-3 py-1 rounded-full shadow"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-row items-center col-span-3 overflow-y-scroll min-h-5/6 justify-center flex-wrap gap-2">
            {group.GroupUser.map((shop, index) => (
              <OffererCard
                key={index}
                image={shop.User?.UserShop?.shop_images?.[0]}
                id={shop?.User?.user_id}
                title={shop.User?.UserShop?.shop_title}
                tags={shop.User?.UserShop?.shop_tags}
                group={null}
                address={shop.User?.UserShop?.shop_address}
              />
            ))}
          </div>

          <div className="flex flex-col items-center justify-center col-span-1 space-y-6">
            {user&&user?.is_shop_owner && (
              <div className="text-center flex flex-col space-y-2">
                <p className="text-sm text-gray-600">
                  {joinStatus === "unjoined"
                    ? "Join the group to get the latest updates."
                    : joinStatus === "pending"
                    ? "Your request is pending approval."
                    : "You are already a group member."}
                </p>
                <button
                  onClick={() => handleJoinGroup(user.user_id, id)}
                  className={`px-6 py-2 rounded-lg text-white transition duration-300 ${
                    joinStatus === "unjoined"
                      ? "bg-yellow-500 hover:bg-yellow-600"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  disabled={joinStatus !== "unjoined"}
                >
                  {joinStatus === "unjoined"
                    ? "Join Group"
                    : joinStatus === "pending"
                    ? "Request Pending"
                    : "Request Accepted"}
                </button>
              </div>
            )}

            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600">
                {user?.email
                  ? isSubscribed
                    ? "Unsubscribe to stop receiving updates."
                    : "Subscribe to get updates for this group."
                  : "Please sign in to subscribe to group updates."}
              </p>

              {user?.email ? (
                <button
                  onClick={() =>
                    handleSubscribe(user.user_id, id, isSubscribed)
                  }
                  className={`px-6 py-2 rounded-lg text-white transition duration-300 cursor-pointer ${
                    isSubscribed
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-yellow-500 hover:bg-yellow-600"
                  }`}
                >
                  {isSubscribed ? "Unsubscribe" : "Subscribe"}
                </button>
              ) : (
                <Link
                  href="/logIn"
                  className="inline-block px-6 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white transition duration-300"
                >
                  Sign in to Subscribe
                </Link>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-lg text-gray-500 mt-10">
          No shops available in this group.
        </p>
      )}
    </section>
  );
}

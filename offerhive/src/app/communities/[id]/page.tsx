"use client";
import React, { useEffect, useState } from "react";
import OffererCard from "@/components/offererCard";
import { getGroupById, subscribeGroup, joinGroup } from "@/lib/DB/group";
import { GroupUnique } from "@/lib/types";
import { useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { RootState } from "@/lib/redux/store";
import Loader from "@/components/loader";

export default function GroupPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [joinStatus, setJoinStaus] = useState("unjoined");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [group, setGroup] = useState<GroupUnique | null>(null);
  const { id }: { id: string } = useParams();
  const user = useSelector((state: RootState) => state.user);

  const fetchGroupShops = async () => {
    try {
      const data = await getGroupById(id);
      if (data) {
        setGroup(data);

        const groupUser = data.GroupUser?.find(
          (u) => u.user_id === user?.user_id
        );

        if (groupUser?.status === "joined") {
          setJoinStaus("joined");
        } else if (groupUser?.status === "pending") {
          setJoinStaus("pending");
        } else {
          setJoinStaus("unjoined");
        }

        const isUserSubscribed = data.GroupSubscription?.some(
          (u) => u.user_id === user?.user_id
        );
        setIsSubscribed(Boolean(isUserSubscribed));
      } else {
        setError("No shops found in this group.");
      }
    } catch (err) {
      setError("Error fetching group shops. Please try again later.");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGroupShops();
  }, [id]);

  async function handleJoinGroup(user_id: string, group_id: string) {
    if (!user_id || !group_id) return;
    const data = await joinGroup(user_id, group_id);
    if (data) {
      setJoinStaus("pending");
    }
  }

  async function handleSubscribe(
    user_id: string,
    group_id: string,
    isSubscribed: boolean
  ) {
    const data = await subscribeGroup(user_id, group_id, isSubscribed);
    if (data) {
      setIsSubscribed(!isSubscribed);
    }
  }

  if (isLoading) {
    return (
      <section className="flex flex-col items-center justify-center h-screen">
        <Loader size={5} />
      </section>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 text-xl">{error}</div>;
  }

  return (
    <section className="flex flex-col items-center justify-center bg-gray-100 px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center">
        {group?.GroupDetail?.[0]?.group_title || "Group Offerers"}
      </h1>
      <p className="text-lg text-gray-700 font-medium leading-relaxed mb-6 text-center max-w-2xl">
        {group?.GroupDetail?.[0]?.group_desc}
      </p>

      {group ? (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 w-full max-w-[1440px]">
          {/* Group Details */}
          <div className="col-span-1 md:col-span-1 w-full flex justify-center items-center md:justify-center mb-6 md:mb-0">
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-xs lg:max-w-sm bg-white p-6 rounded-xl shadow-md flex flex-col items-center justify-center text-center">
              <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
                Group Details
              </h2>

              <div className="flex flex-col items-center space-y-4">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Created On:</span>{" "}
                  {new Date(group?.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>

                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Owner:</span> {group?.user_id}
                </p>

                {group?.GroupDetail?.[0]?.group_image && (
                  <Image
                    src={group.GroupDetail[0].group_image}
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
          </div>

          {/* Shop Cards */}
          <div className="col-span-3 flex flex-wrap gap-4 justify-center items-start max-h-[80vh] overflow-y-auto px-2">
            {group?.GroupUser?.filter((shop) => shop.status !== "pending")
              ?.length > 0 ? (
              group.GroupUser.filter((shop) => shop.status !== "pending").map(
                (shop, index) => (
                  <OffererCard
                    key={index}
                    image={shop.User?.UserShop?.shop_images?.[0]}
                    id={shop?.User?.user_id}
                    title={shop.User?.UserShop?.shop_title}
                    tags={shop.User?.UserShop?.shop_tags}
                    group={null}
                    address={shop.User?.UserShop?.shop_address}
                  />
                )
              )
            ) : (
              <p className="text-center text-lg text-gray-600 mt-8 w-full">
                🥇 Be the first one to join this group and showcase your shop!
              </p>
            )}
          </div>

          {/* Join + Subscribe Section */}
          <div className="col-span-1 flex flex-col items-center justify-start space-y-6 w-full">
            {user && (
              <div className="text-center flex flex-col space-y-2">
                <p className="text-sm text-gray-600">
                  {user?.is_shop_owner
                    ? joinStatus === "unjoined"
                      ? "Join the group to get the latest updates."
                      : joinStatus == "pending"
                      ? "Your request is pending approval."
                      : "You are already a group member."
                    : "Sign in to join the group."}
                </p>
                {user?.is_shop_owner ? (
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
                      ? "Click to Join"
                      : joinStatus === "pending"
                      ? "Approval Pending"
                      : "Already Joined"}
                  </button>
                ) : (
                  <button
                    className="px-6 py-2 rounded-lg text-white bg-gray-400 cursor-not-allowed"
                    disabled
                  >
                    Create a Shop first
                  </button>
                )}
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
                  className={`px-6 py-2 rounded-lg text-white transition duration-300 ${
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

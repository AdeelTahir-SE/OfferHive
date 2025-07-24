"use client";
import React, { useEffect, useState } from "react";
import OffererCard from "@/components/offererCard";
import { useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { RootState } from "@/lib/redux/store";
import Loader from "@/components/loader";
import { fetchRequest } from "@/lib/utils/fetch";

export default function GroupPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [joinStatus, setJoinStaus] = useState("unjoined");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [group, setGroup] = useState<any | null>(null);
  const { id }: { id: string } = useParams();
  const user = useSelector((state: RootState) => state.user);

  const fetchGroupShops = async () => {
    try {
      await fetchRequest(
        `/api/communities/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
        setIsLoading,
        setError,
        (data) => {
          if (data) {
            setGroup(data);
            const groupUser = data?.GroupUser?.find((u: any) => {
              return u.User?.user_id === user?.user_id;
            });
            if (groupUser?.status === "joined") {
              setJoinStaus("joined");
            } else if (groupUser?.status === "pending") {
              setJoinStaus("pending");
            } else if (groupUser?.status == "rejected") {
              setJoinStaus("rejected");
            } else {
              setJoinStaus("unjoined");
            }

            const isUserSubscribed = data?.GroupSubscription?.some(
              (u: any) => u.user_id === user?.user_id
            );
            setIsSubscribed(Boolean(isUserSubscribed));
          } else {
            setError("No shops found in this group.");
          }
          console.log("Group data fetched:", data);
        }
      );
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
    fetchRequest(
      `/api/communities/join`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id, group_id }),
      },
      () => {},
      () => {},
      (data) => {
        if (data) {
          setJoinStaus("pending");
        }
      }
    );
  }

  async function handleSubscribe(
    user_id: string,
    group_id: string,
    isSubscribed: boolean
  ) {
    fetchRequest(
      `/api/communities/subscribe`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id, group_id, isSubscribed }),
      },
      () => {},
      () => {},
      (data) => {
        if (data) {
          setIsSubscribed(!isSubscribed);
        }
      }
    );
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
    <section className="flex flex-col md:flex-row items-center justify-center px-[40px] xxl:px-[450px] xl:px-[200px] md:px-[100px] py-[50px] md:py-[130px]">
      {group ? (
        <div className="flex flex-col md:flex-row items-center  justify-center gap-[50px] w-full ">
          <div className="md:flex hidden  md:flex-col items-center justify-center gap-[30px] md:w-1/4">
            <h2 className="heading-3 text-black text-center ">Group Details</h2>

            <div className="flex flex-col items-center ">
              <p className="text-sm text-gray-600 text-center">
                <span className="font-semibold ">Created On:</span>{" "}
                {new Date(group?.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>

              {group?.GroupDetail?.group_image && (
                <Image
                  src={group.GroupDetail?.group_image}
                  alt="Group Image"
                  width={250}
                  height={250}
                  className="rounded-lg object-cover"
                />
              )}

              {group?.GroupDetail?.group_tags?.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 ">
                  {group.GroupDetail.group_tags.map(
                    (tag: string, index: number) => (
                      <span
                        key={index}
                        className="bg-yellow-200 text-yellow-800 text-sm font-semibold px-3 py-1 rounded-full shadow"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              )}
            </div>
          </div>

          <section className="flex flex-col items-center justify-center gap-[30px] md:min-w-1/2 ">
            <h1 className="heading-1 text-center">
              {group?.GroupDetail?.group_title || "Group Offerers"}
            </h1>
            <p className="description text-center max-w-2xl">
              {group?.GroupDetail?.group_desc}
            </p>
          </section>

          <div className="flex md:hidden flex-col items-center justify-center gap-[30px] md:w-1/4">
            <h2 className="heading-3 text-black text-center ">Group Details</h2>

            <div className="flex flex-col items-center ">
              <p className="text-sm text-gray-600 text-center">
                <span className="font-semibold ">Created On:</span>{" "}
                {new Date(group?.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>

              {group?.GroupDetail?.group_image && (
                <Image
                  src={group.GroupDetail?.group_image}
                  alt="Group Image"
                  width={250}
                  height={250}
                  className="rounded-lg object-cover"
                />
              )}

              {group?.GroupDetail?.group_tags?.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 ">
                  {group.GroupDetail.group_tags.map(
                    (tag: string, index: number) => (
                      <span
                        key={index}
                        className="bg-yellow-200 text-yellow-800 text-sm font-semibold px-3 py-1 rounded-full shadow"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-[30px] ">
            {user && (
              <div className="text-center flex flex-col space-y-2">
                <p className="text-sm text-gray-600">
                  {user?.is_shop_owner
                    ? joinStatus === "rejected"
                      ? "join request rejected"
                      : joinStatus == "pending"
                        ? "Your request is pending approval."
                        : joinStatus === "joined"
                          ? "You are already a group member."
                          : joinStatus == "unjoined"
                            ? "Request to join the group."
                            : "Sign in to join the group."
                    : "Sign in to join the group."}
                </p>
                {user?.is_shop_owner ? (
                  <button
                    onClick={() => handleJoinGroup(user.user_id, id)}
                    className={`px-6 py-2 rounded-lg text-white transition duration-300 ${
                      joinStatus === "unjoined"
                        ? "bg-yellow-500 hover:bg-yellow-600"
                        : joinStatus === "pending"
                          ? "bg-gray-400 cursor-not-allowed"
                          : joinStatus === "rejected"
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-yellow-600 cursor-not-allowed"
                    }`}
                    disabled={
                      joinStatus === "pending" ||
                      joinStatus === "joined" ||
                      joinStatus === "rejected"
                    }
                  >
                    {joinStatus === "unjoined"
                      ? "Click to Join"
                      : joinStatus === "pending"
                        ? "Approval Pending"
                        : joinStatus === "rejected"
                          ? "Request Rejected "
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

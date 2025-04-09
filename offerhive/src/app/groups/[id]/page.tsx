"use client";
import { useEffect, useState } from "react";
import OffererCard from "@/components/offererCard";
import { getGroupById } from "@/lib/DB/group";
import { GroupUnique } from "@/lib/types";
import { useSelector } from "react-redux";
import {subscribeGroup,joinGroup} from "@/lib/DB/group";
export default function GroupPage({
  params,
}: {
  params: { id: string };
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [joinStatus,setJoinStaus]=useState("unjoined");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [group,setGroup]=useState<GroupUnique|null>(null);
  const user = useSelector((state: any) => state.user.user_id);
  const fetchGroupShops = async () => {
    try {
      const data = await getGroupById(params.id);
      console.log(data)
      if (data) {
        setGroup(data);
      } else {
        setError("No shops found in this group.");
      }
    } catch (err) {
      setError("Error fetching group shops. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    fetchGroupShops();
  }, [params.id]);


  async function handleJoinGroup(user_id:string,group_id:string){
    const data=await joinGroup(user_id,group_id);
    if (!data) {
      console.error("Error joining group:");
      return;
    }
    console.log("Joined group successfully:", data);
    setJoinStaus("pending");

  }
  async function handleSubscribe(user_id:string,group_id:string,isSubscribed:boolean){
    const data=await subscribeGroup(user_id,group_id,isSubscribed);
    if (!data) {
      console.error("Error subscribing to group:");
      return;
    }
    setIsSubscribed(true);
    console.log("Subscribed to group successfully:", data);
  }

  if (isLoading)
    return <div className="text-center text-xl font-medium">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 text-xl">{error}</div>;

  return (
    <section className="flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">{}</h1>
      {group&&group?.GroupUser?.length > 0 ? (
        <section className="grid grid-cols-2 gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 w-full max-w-4xl">
            {group?.GroupUser?.map((shop, index) => (
              <OffererCard
                key={index}
                image={shop.User?.UserShop?.shop_images[0]}
                id={params.id}
                title={shop.User?.UserShop?.shop_title}
                tags={shop.User?.UserShop?.shop_tags}
                group={group?.GroupDetail?.[0]?.group_title}
                address={shop.User?.UserShop?.shop_address}
              />
            ))}
          </div>
          <div className="flex flex-col items-center justify-center mt-4">
            {user.is_shop_owner && (
              <section className="flex flex-col items-center justify-center">
                <button onClick={()=>handleJoinGroup(user.user_id,params.id)} className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300 ease-in-out">
                  {joinStatus=="unjoined"?"Join Group":joinStatus=="pending"?"Request Pending":"Request Accepted"}
                </button>
                <p className="text-sm text-gray-500 mt-2">
                  {joinStatus=="unjoined"?"Join the group to get latest updates":joinStatus=="pending"?"Request is pending to be accepted by owner":"You are already in the group"}
                </p>
              </section>
            )}
            <section className="flex flex-col items-center justify-center">
              <p>{isSubscribed?"Unsubscribe to remove group from latest updates list":"Subscribe to get latest updates of group information"}</p>
              <button onClick={()=>handleSubscribe(user.user_id,params.id,isSubscribed)} className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300 ease-in-out">
                {isSubscribed?"UnSubscribe":"Subscribe"}
              </button>
            </section>
          </div>
        </section>
      ) : (
        <p>No shops available in this group.</p>
      )}
    </section>
  );
}

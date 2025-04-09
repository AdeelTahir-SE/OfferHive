"use client";
import { useEffect, useState } from "react";
import OffererCard from "@/components/offererCard";
import { getGroupById } from "@/lib/DB/group";
import { Group } from "@/lib/types";
import { useSelector } from "react-redux";
import {subscribeGroup,joinGroup} from "@/lib/DB/group";
export default function GroupPage({
  params,
}: {
  params: { group_id: string };
}) {
  const [groupShops, setGroupShops] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [joinStatus,setJoinStaus]=useState("unjoined");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const user = useSelector((state: any) => state.user.user_id);
  const fetchGroupShops = async () => {
    try {
      const data = await getGroupById(params.group_id,user.user_id);
      console.log(data)
      if (data) {
        setGroupShops(data);
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
  }, [params.group_id]);


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
      {groupShops.length > 0 ? (
        <section className="grid grid-cols-2 gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 w-full max-w-4xl">
            {groupShops.map((shop, index) => (
              <OffererCard
                key={index}
                image={shop.GroupDetail?.group_image}
                id={params.group_id}
                title={shop.GroupDetail?.group_title}
                tags={shop.GroupUsers.map((tag) => tag.tag_name)}
                group={shop.group}
                address={shop.address}
                type="groups"
              />
            ))}
          </div>
          <div className="flex flex-col items-center justify-center mt-4">
            {user.is_shop_owner && (
              <section className="flex flex-col items-center justify-center">
                <button onClick={()=>handleJoinGroup(user.user_id,params.group_id)} className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300 ease-in-out">
                  {joinStatus=="unjoined"?"Join Group":joinStatus=="pending"?"Request Pending":"Request Accepted"}
                </button>
                <p className="text-sm text-gray-500 mt-2">
                  {joinStatus=="unjoined"?"Join the group to get latest updates":joinStatus=="pending"?"Request is pending to be accepted by owner":"You are already in the group"}
                </p>
              </section>
            )}
            <section className="flex flex-col items-center justify-center">
              <p>{isSubscribed?"Unsubscribe to remove group from latest updates list":"Subscribe to get latest updates of group information"}</p>
              <button onClick={()=>handleSubscribe(user.user_id,params.group_id,isSubscribed)} className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300 ease-in-out">
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

// const groupShops = [
//   {
//     image: "/offer1.jpeg",
//     title: "50% Off on Electronics",
//     tags: ["Discount", "Limited Time", "Exclusive"],
//     group: "Tech Savers",
//     address: "123 Tech Street, Silicon Valley, CA",
//   },
//   {
//     image: "/offer1.jpeg",
//     title: "Buy 1 Get 1 Free",
//     tags: ["BOGO", "Super Deal"],
//     group: "Shopaholics",
//     address: "456 Market Ave, New York, NY",
//   },
//   {
//     image: "/offer1.jpeg",
//     title: "Free Shipping on Orders Over $50",
//     tags: ["Free Shipping", "No Minimum"],
//     group: "Smart Shoppers",
//     address: "789 E-Commerce Blvd, Los Angeles, CA",
//   },
//   {
//     image: "/offer1.jpeg",
//     title: "Buy 1 Get 1 Free",
//     tags: ["BOGO", "Super Deal"],
//     group: "Shopaholics",
//     address: "456 Market Ave, New York, NY",
//   },
//   {
//     image: "/offer1.jpeg",
//     title: "Free Shipping on Orders Over $50",
//     tags: ["Free Shipping", "No Minimum"],
//     group: "Smart Shoppers",
//     address: "789 E-Commerce Blvd, Los Angeles, CA",
//   },
// ];

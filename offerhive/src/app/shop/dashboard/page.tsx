"use client"
import MessageSection from "@/components/messageSection";
import LineGraph from "@/components/lineGraph";
import BarChart from "@/components/barChart";
import { getClicks ,getLatestMessages} from "@/lib/DB/shop";
import { useSelector } from "react-redux";
import { useState,useEffect } from "react";
import { Message } from "@/lib/types";
import Loader from "@/components/loader";
import { RootState } from "@/lib/redux/store";
export default function Dashboard() {
  const[clicksArray,setClicksArray]=useState([]);
  const [latestMessagesArray,setLatestMessagesArray ]=useState<Message[]>([]);
  const [loading,setLoading]=useState(true)
  const User= useSelector((state: RootState) => state.user);
  async function getClicksInfo(){
    const { clicks } = await getClicks(User?.user_id);
    setClicksArray(clicks);
  }

  async function getLatestMessagesInfo(){
    const messages=await getLatestMessages(User?.user_id);
    setLatestMessagesArray(messages);
    
    }
  useEffect(()=>{
    getClicksInfo();
    getLatestMessagesInfo();
    setLoading(false)
  },[])
   
  if(loading){
     <section className=" flex items-center justify-center h-screen w-screen"><Loader size={3}/></section>
  }
  return (
    <section className="flex flex-col items-center justify-center bg-gray-100 min-h-screen p-8 ">
      <h1 className="text-4xl font-bold mb-4 text-center">Welcome to the Dashboard</h1>
      <p className="text-lg text-center mb-6">Here you can manage your offers and settings.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full max-w-7xl">
           <MessageSection list={latestMessagesArray}/>
        <section className="flex flex-col gap-6 items-center justify-center">
          <BarChart data={clicksArray}/>
          <LineGraph data={clicksArray} />
        </section>

     

        {/* Coming Soon Section */}
        <section className="flex flex-col items-center justify-center bg-white/30 backdrop-blur-md border border-white/40 p-8 rounded-2xl shadow-xl w-full max-w-lg text-center">
          <h1 className="text-4xl font-bold text-gray-800 drop-shadow-sm mb-4">
            🚧 Coming Soon
          </h1>
          <p className="text-gray-700 text-lg">
            We&apos;re working hard to bring you something amazing. Stay tuned!
          </p>
        </section>
      </div>
    </section>
  );
}

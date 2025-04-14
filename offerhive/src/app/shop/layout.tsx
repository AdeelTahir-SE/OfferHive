"use client";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import OptionsBar from "@/components/optionsBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const user = useSelector((state: RootState) => state.user);
  const router = useRouter();

  return (
    <section className="flex flex-col items-center justify-center">
      {user && user?.is_shop_owner ? (
        <>
          <OptionsBar />
          {children}
        </>
      ) : (
        <section className="h-screen flex flex-col items-center justify-center ">
        <div className="text-center mt-10 max-w-lg mx-auto">
          <h1 className="text-4xl font-bold text-gray-800">
            Oops! You don't have a shop 😅
          </h1>
          <p className="text-xl text-gray-700 mt-4">
            Why check the dashboard and shop when you have nothing to manage? 🤔
          </p>
          <p className="text-lg text-gray-600 mt-2">
            But don't worry, it's easy to get started! Just create your shop, and you'll be up and running in no time.
          </p>
          <button
            onClick={() => router.push("/createStore")}
            className="mt-8 bg-yellow-400 cursor-pointer text-black py-3 px-8 rounded-full hover:bg-yellow-500 text-lg font-semibold transition duration-300 shadow-lg"
          >
            Create Your Shop Now 🚀
          </button>
        </div>
      </section>
      
      )}
    </section>
  );
}

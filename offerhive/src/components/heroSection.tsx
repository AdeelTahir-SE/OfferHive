"use client"
import { BackgroundLines } from "./backgroundLines";
import { useRouter } from "next/navigation";
export default function HeroSection() {
  const router=useRouter()
  const handleButtonClick = () => {
    router.push("/offers");
  };
  return (
    <BackgroundLines className="">
      <section className="flex flex-col items-center justify-center text-center px-4 py-20 bg-white">
        <h1 className="text-4xl md:text-5xl font-bold max-w-3xl mb-6 leading-tight">
          Discover the Best deals in Universities and even at outside
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mb-8">
          Explore exclusive deals, events, and communities especially for
          students.
        </p>
          <button className="px-6 py-3 z-10 cursor-pointer rounded-2xl bg-yellow-500 hover:bg-yellow-400 text-black font-semibold transition duration-200 "onClick={handleButtonClick}>
            Browse Offers
          </button>
      </section>
    </BackgroundLines>
  );
}


"use client";

import CardSwap, { Card } from "./cardSwap";
import Image from "next/image";

interface User {
  id: number;
  image: string;
  name: string;
}

export default function OurUsers() {
  const ourUsers: User[] = [
    { id: 1, image: "/nust.png", name: "NUST" },
    { id: 2, image: "/GIKI.jpg", name: "GIKI" },
    { id: 3, image: "/LUMS.png", name: "LUMS" },
    { id: 4, image: "/FAAST.png", name: "FAAST" },
  ];

  return (
    <section className="pb-40 lg:pb-20   bg-white">
      <div className=" mx-auto flex flex-col justify-center  lg:flex-row items-center gap-8 md:gap-32 lg:gap-16  ">

        <div className="lg:w-1/2 text-center lg:text-left flex-wrap max-w-screen px-4 lg:px-0 ">
          <h2 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
            Trusted by Leading Student Communities
          </h2>
          <p className="text-xl sm:text-2xl text-yellow-500 mb-6">
            Over 5,000 students across top universities rely on our platform.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded mx-auto lg:mx-0" />
        </div>

        {/* Card Carousel */}
        <div className="lg:w-1/2  max-w-fit lg:h-[600px]  ">
          <CardSwap
            cardDistance={40}
            verticalDistance={50}
            delay={5000}
            
            pauseOnHover={false}
          >
            {ourUsers.map((user) => (
              <Card
                key={user.id}
                customClass="flex flex-col items-center gap-4 p-6 w-48 bg-white border border-yellow-300 rounded-xl shadow-lg"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={user.image}
                    alt={user.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="mt-2 text-xl font-semibold text-gray-800">
                  {user.name}
                </h3>
              </Card>
            ))}
          </CardSwap>
        </div>

      </div>
    </section>
  );
}

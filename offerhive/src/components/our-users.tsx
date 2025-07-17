import Image from "next/image";
export default function OurUsers() {
  const logos = [
    { src: "/NUST.png", alt: "NUST" },
    { src: "/LUMS.png", alt: "Hive Logo" },
    { src: "/FAAST.png", alt: "Hive Logo" },
    { src: "/GIKI.png", alt: "Hive Logo" },
  ];

  return (
    <div className="inline-flex w-full flex-nowrap overflow-hidden py-4 bg-slate-700 ">
      <ul className="flex animate-infinite-scroll items-center justify-center md:justify-start [&_img]:max-w-none [&_li]:mx-8">
        {logos.map((logo, index) => (
          <li key={index}>
            <Image src={logo.src} width={100} height={100} alt={logo.alt} className="w-[100px]  lg:w-[200px] h-auto " />
          </li>
        ))}
      </ul>
      <ul
        className="flex animate-infinite-scroll items-center justify-center md:justify-start [&_img]:max-w-none [&_li]:mx-8"
        aria-hidden="true"
      >
        {logos.map((logo, index) => (
          <li key={index}>
            <Image src={logo.src} width={100} height={100} alt={logo.alt} className="w-[100px]  lg:w-[200px] h-auto" />
          </li>
        ))}
      </ul>
    </div>
  );
}
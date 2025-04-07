import Image from "next/image";

export default function TestimonialCard({
  image,
  name,
  quote,
}: {
  image: string;
  name: string;
  quote: string;
}) {
  return (
    <section className="flex flex-col items-start justify-start gap-4 p-4 border rounded-lg shadow-md">
      <section className="flex flex-row items-center gap-4">
        <Image
          src={image}
          alt={`${name}'s profile picture`}
          width={100}
          height={100}
          className="rounded-full object-cover"
        />
        <h2 className="text-lg font-semibold">{name}</h2>
      </section>
      <section className="text-sm italic text-gray-600">
        “{quote}”
      </section>
    </section>
  );
}

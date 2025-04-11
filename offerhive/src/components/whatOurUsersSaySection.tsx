import TestimonialCard from "./TestimonialCard";

export default function WhatOurSaysSection() {
  const testimonials = [
    {
      image: "/avatar.jpg",
      name: "Sarah Johnson",
      quote: "This platform changed the way I work—smooth, simple, and effective.",
    },
    {
      image: "/avatar.jpg",
      name: "Mark Allen",
      quote: "Customer support was amazing and everything worked flawlessly.",
    },
    {
      image: "/avatar.jpg",
      name: "Emily Davis",
      quote: "Highly recommended for anyone looking to streamline their workflow!",
    },
    {
      image: "/avatar.jpg",
      name: "Mark Allen",
      quote: "Customer support was amazing and everything worked flawlessly.",
    },
    {
      image: "/avatar.jpg",
      name: "Emily Davis",
      quote: "Highly recommended for anyone looking to streamline their workflow!",
    },
  ];

  return (
    <section className="flex flex-col items-center justify-center gap-6 px-4 py-12">
      <h1 className="text-3xl font-bold text-center">Helping many like you</h1>
      <h3 className="text-lg text-gray-600 text-center">
        Here&apos;s what a few say about us
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {testimonials.map((t, i) => (
          <TestimonialCard
            key={i}
            image={t.image}
            name={t.name}
            quote={t.quote}
          />
        ))}
      </div>
    </section>
  );
}

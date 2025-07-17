"use client";
import { useState } from "react";
import Image from "next/image";
import { fetchRequest } from "@/lib/utils/fetch";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchRequest(
      "/api/contact",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      },
      setIsSubmitting,
      setErrorMessage,
      () => {}
    );


    if (errorMessage) {
      console.error("Error sending message:");
      alert("There was an error sending your message. Please try again.");
    } else {
      alert("Your message has been sent successfully!");
      const form = document.getElementById("contact-form") as HTMLFormElement;
      if (form) form.reset();
    }

    setIsSubmitting(false);
  };

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen gap-[30px]  p-6 bg-white overflow-hidden">
      <div className="absolute top-0 right-0 m-4 w-18 h-18 md:w-24 md:h-24 ">
        <Image
          src="/animation.gif"
          alt="Revolving Sun"
          width={96}
          height={96}
          className="rounded-full"
        />
      </div>

      <h1 className="heading-1">Get in Touch</h1>

      <p className="description max-w-xl">
        If you notice any bugs or have suggestions or as a shop owner do you
        want some additional features, please let us know. We appreciate your
        feedback and are always looking to improve. Your opinions matter a lot
        to us — feel free to provide feedback or ideas on how we can make things
        better.
      </p>

      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

      <form
        id="contact-form"
        className="w-full max-w-xl bg-white  rounded-xl p-6 space-y-4"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <label htmlFor="name" className="font-medium mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            placeholder="Your Name"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            name="email"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            placeholder="you@example.com"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="message" className="font-medium mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            placeholder="Write your message..."
          ></textarea>
        </div>

        <button
          type="submit"
          className={`w-full bg-yellow-400 cursor-pointer hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded-md transition-colors duration-200 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </section>
  );
}

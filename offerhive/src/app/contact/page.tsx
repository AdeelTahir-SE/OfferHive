"use client";
import { useState } from "react";
import { sendMessage } from "@/lib/DB/contact";
import Image from "next/image";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !message) {
      setErrorMessage("Please fill out all fields.");
      return;
    }

    setIsSubmitting(true);
    const { error } = await sendMessage(name, email, message);

    if (error) {
      console.error("Error sending message:", error);
      alert("There was an error sending your message. Please try again.");
    } else {
      alert("Your message has been sent successfully!");
      const form = document.getElementById("contact-form") as HTMLFormElement;
      if (form) form.reset();
    }

    setIsSubmitting(false);
  };

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50 overflow-hidden">
      <div className="absolute top-0 right-0 m-4 w-18 h-18 md:w-24 md:h-24 ">
        <Image
          src="/animation.gif"
          alt="Revolving Sun"
          width={96}
          height={96}
          className="rounded-full"
        />
      </div>

      <h1 className="text-3xl font-bold mb-4">Get in Touch</h1>

      <p className="text-gray-600 mb-4 text-center max-w-xl">
        If you notice any bugs or have suggestions or as a shop owner do you want some additional features, please let us know. We
        appreciate your feedback and are always looking to improve. Your
        opinions matter a lot to us — feel free to provide feedback or ideas on
        how we can make things better.
      </p>

      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

      <form
        id="contact-form"
        className="w-full max-w-xl bg-white shadow-md rounded-xl p-6 space-y-4"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <label htmlFor="name" className="font-medium mb-1">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            placeholder="Your Name"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="font-medium mb-1">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            placeholder="you@example.com"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="message" className="font-medium mb-1">Message</label>
          <textarea
            id="message"
            name="message"
            rows={5}
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

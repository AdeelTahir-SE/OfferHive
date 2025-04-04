export default function Contact() {
    return (
      <section className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
        <h1 className="text-3xl font-bold mb-4">Get in Touch</h1>
        <p className="text-gray-600 mb-8 text-center max-w-xl">
          We'd love to hear from you! Whether you have a question, suggestion, or just want to say hi — drop us a message.
        </p>
  
        <form className="w-full max-w-xl bg-white shadow-md rounded-xl p-6 space-y-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="font-medium mb-1">Name</label>
            <input
              type="text"
              id="name"
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              placeholder="Your Name"
            />
          </div>
  
          <div className="flex flex-col">
            <label htmlFor="email" className="font-medium mb-1">Email</label>
            <input
              type="email"
              id="email"
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              placeholder="you@example.com"
            />
          </div>
  
          <div className="flex flex-col">
            <label htmlFor="message" className="font-medium mb-1">Message</label>
            <textarea
              id="message"
              rows={5}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              placeholder="Write your message..."
            ></textarea>
          </div>
  
          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded-md transition-colors duration-200"
          >
            Send Message
          </button>
        </form>
  
        <div className="mt-10 text-sm text-gray-500 text-center">
          Or reach us directly at <a href="mailto:contact@yourwebsite.com" className="text-yellow-600 underline">contact@yourwebsite.com</a>
        </div>
      </section>
    );
  }
  
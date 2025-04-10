import MessageSection from "@/components/messageSection";
import LineGraph from "@/components/lineGraph";
import BarChart from "@/components/barChart";

export default function Dashboard() {
  return (
    <section className="flex flex-col items-center justify-center bg-gray-100 min-h-screen p-8 ">
      <h1 className="text-4xl font-bold mb-4 text-center">Welcome to the Dashboard</h1>
      <p className="text-lg text-center mb-6">Here you can manage your offers and settings.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full max-w-7xl">
        <section className="flex flex-col gap-6 ml-4 items-center justify-center">
          <BarChart />
          <LineGraph />
        </section>

        {/* Message Section */}
        <MessageSection />

        {/* Coming Soon Section */}
        <section className="flex flex-col items-center justify-center bg-white/30 backdrop-blur-md border border-white/40 p-8 rounded-2xl shadow-xl w-full max-w-lg text-center">
          <h1 className="text-4xl font-bold text-gray-800 drop-shadow-sm mb-4">
            🚧 Coming Soon
          </h1>
          <p className="text-gray-700 text-lg">
            We're working hard to bring you something amazing. Stay tuned!
          </p>
        </section>
      </div>
    </section>
  );
}

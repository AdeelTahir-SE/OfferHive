export default function SearchBar() {
    return (
        <div className="flex items-center justify-center  rounded-xl  py-6 w-full">
        <input
            type="text"
            placeholder="Search for offers..."
            className="border border-gray-300 rounded-lg p-2 w-1/2"
        />
        <button className="bg-yellow-500 text-black font-semibold py-2 px-4 rounded-lg ml-4">
            Search
        </button>
        </div>
    );
    }
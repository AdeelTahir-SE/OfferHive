import Link from "next/link"
import Image from "next/image"
export default function NotFound(){
    return(
        <section className="flex flex-col items-center justify-center min-h-screen p-6 bg-white">
            <Image src={"/404.jpg"} alt="404" width={300} height={300} className="mb-4" />
            <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
            <p className="text-gray-600 mb-4 text-center max-w-xl">
                The page you are looking for does not exist. Please check the URL or return to the homepage.
            </p>
            <Link href="/" className="text-black-500 hover:underline">
            <button className="bg-yellow-400 cursor-pointer hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded-md transition-colors duration-200">
                Go to Homepage
            </button>
            </Link>

        </section>
    )
}
"use client";
import { Eye, EyeClosed } from "lucide-react";
import {useState } from "react";
import { useRouter } from "next/navigation";
import OAuthSection from "@/components/oAuthsSection";
import { signIn } from "@/lib/DB/user"; // Make sure you have this function in your lib
import { useDispatch } from "react-redux"; 
import { setUser } from "@/lib/redux/user/userSlice";
export default function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const dispatch=useDispatch();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    const { userData,findingError,signInError} = await signIn(email, password);
    if (signInError || findingError) {
      setError(signInError?.message || findingError?.message || "An error occurred");
      console.log("Error signing in:", signInError?.message || findingError?.message);
    } else {
      dispatch(setUser(userData)); 
      console.log("User signed in:", userData);
      router.push("/");
    }
  }

  return (
    <section className="flex flex-col items-center justify-center h-screen bg-white font-sans">
      <section className="flex flex-col items-center justify-center gap-6 px-8 py-10 border rounded-2xl shadow-lg bg-gray-50 w-[400px]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#ffaa0a"
            fillOpacity="1"
            d="M0,160L12.6,186.7C25.3,213,51,267,76,250.7C101.1,235,126,149,152,112C176.8,75,202,85,227,90.7C252.6,96,278,96,303,80C328.4,64,354,32,379,58.7C404.2,85,429,171,455,218.7C480,267,505,277,531,240C555.8,203,581,117,606,112C631.6,107,657,181,682,202.7C707.4,224,733,192,758,192C783.2,192,808,224,834,224C858.9,224,884,192,909,154.7C934.7,117,960,75,985,69.3C1010.5,64,1036,96,1061,117.3C1086.3,139,1112,149,1137,170.7C1162.1,192,1187,224,1213,218.7C1237.9,213,1263,171,1288,165.3C1313.7,160,1339,192,1364,213.3C1389.5,235,1415,245,1427,250.7L1440,256L1440,0L0,0Z"
          ></path>
        </svg>

        <h1 className="text-3xl font-bold text-gray-800">Login</h1>

        <form onSubmit={handleLogin} className="w-full">
          <section className="flex flex-col gap-5 w-full max-w-xs mx-auto">
            <label htmlFor="email" className="text-base font-semibold text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 border text-base rounded-md focus:outline-none"
              required
            />

            <label htmlFor="password" className="text-base font-semibold text-gray-700">
              Password
            </label>
            <section className="flex items-center justify-between gap-4">
              <input
                id="password"
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Enter your password"
                className="flex-1 px-4 py-3 border text-base rounded-md focus:outline-none"
                required
              />
              {isPasswordVisible ? (
                <EyeClosed
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  className="cursor-pointer text-gray-600"
                  size={22}
                />
              ) : (
                <Eye
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  className="cursor-pointer text-gray-600"
                  size={22}
                />
              )}
            </section>

            <button
              type="submit"
              className="w-full py-3 cursor-pointer text-base font-semibold bg-yellow-500 hover:bg-yellow-400 text-white rounded-md transition"
            >
              Login
            </button>
          </section>

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}

          <OAuthSection />
        </form>
      </section>
    </section>
  );
}

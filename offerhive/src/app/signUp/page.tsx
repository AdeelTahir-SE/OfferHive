"use client";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import OAuthSection from "@/components/oAuthsSection";
import { signUp } from "@/lib/DB/user";
import { useDispatch } from "react-redux"; 
import { setUser } from "@/lib/redux/user/userSlice";
import Link from "next/link";
import WavySvg from "@/components/wavySvg";

export default function SignUp() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [loading,setLoading]=useState(false)
  const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useDispatch();

  async function handleSignUp(e: React.FormEvent) {
    setLoading(true);
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    const { userData, signUpError, insertError } = await signUp(email, password);

    if (signUpError || insertError) {
      setError(signUpError?.message || "An error occurred");
      console.log("Error signing up:", signUpError?.message);
    } else {
      dispatch(setUser(userData as any));
      console.log("User signed up:", userData);
      setSuccessMessage("Account created! Please verify your email. Once verified, you can log in.");
    }
    setLoading(false);
  }

  return (
    <section className="flex flex-col items-center justify-center h-screen bg-white font-sans">
      <section className="flex flex-col items-center justify-center gap-6 px-8 py-10 border rounded-2xl shadow-lg bg-gray-50 w-[400px]">
        <WavySvg />
        <h1 className="text-3xl font-bold text-gray-800">Sign Up</h1>

        <form onSubmit={handleSignUp} className="w-full">
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
              disabled={loading}
              className="w-full py-3 cursor-pointer text-base font-semibold bg-yellow-500 hover:bg-yellow-400 text-white rounded-md transition"
            >
             {loading?"Signin up...":"Sign Up"} 
            </button>
          </section>

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          {successMessage && (
            <section className="text-green-600 text-center mt-4">
              <p>{successMessage}</p>
            </section>
          )}

          {!successMessage && <OAuthSection />}

          {!successMessage && (
            <p className="text-sm text-center text-gray-500 mt-4">
              Already have an account?{" "}
              <Link href="/logIn" className="text-yellow-500 font-semibold hover:underline">
                Log in
              </Link>
            </p>
          )}
        </form>
      </section>
    </section>
  );
}

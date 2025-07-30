"use client";
import { Eye, EyeClosed } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/lib/redux/user/userSlice";
import Link from "next/link";
import WavySvg from "@/components/wavySvg";
import { fetchRequest } from "@/lib/utils/fetch";
export default function SignUp() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState<string | null>();
  const [loading, setLoading] = useState(false);
  const [dbUser, setDbUser] = useState<any>();
  const [successMessage, setSuccessMessage] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  async function handleSignUp(e: React.FormEvent) {
    setLoading(true);
    e.preventDefault();

    await fetchRequest(
      "/api/signUp",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      },
      setLoading,
      setError,
      setDbUser
    );
  }

  useEffect(() => {
    if (dbUser) {
      dispatch(setUser(dbUser as any));
      setSuccessMessage(
        "Account created! Please verify your email. Once verified, you can log in."
      );
    }
  },[dbUser]);

  return (
    <section className="flex flex-col items-center justify-center h-screen bg-white font-sans">
      <section className="flex flex-col items-center Z-50 relative justify-center gap-6 px-8 py-10 border rounded-2xl shadow-lg bg-gray-50 w-[400px]">
        <WavySvg />
        <h1 className="text-3xl font-bold text-gray-800">Sign Up</h1>

        <form onSubmit={handleSignUp} className="w-full">
          <section className="flex flex-col gap-5 w-full max-w-xs mx-auto">
            <label
              htmlFor="name"
              className="text-base font-semibold text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={(e) => {
                setForm({ ...form, name: e.target.value });
              }}
              placeholder="Enter your name"
              className="px-4 py-3 border text-base rounded-md focus:outline-none"
              required
            />
            <label
              htmlFor="email"
              className="text-base font-semibold text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => {
                setForm({ ...form, email: e.target.value });
              }}
              placeholder="Enter your email"
              className="px-4 py-3 border text-base rounded-md focus:outline-none"
              required
            />

            <label
              htmlFor="password"
              className="text-base font-semibold text-gray-700"
            >
              Password
            </label>
            <section className="flex items-center justify-between gap-4">
              <input
                id="password"
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) => {
                  setForm({ ...form, password: e.target.value });
                }}
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
              {loading ? "Signin up..." : "Sign Up"}
            </button>
          </section>

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          {successMessage && (
            <section className="text-green-600 text-center mt-4">
              <p>{successMessage}</p>
            </section>
          )}


          {!successMessage && (
            <p className="text-sm text-center text-gray-500 mt-4">
              Already have an account?{" "}
              <Link
                href="/logIn"
                className="text-yellow-500 font-semibold hover:underline"
              >
                Log in
              </Link>
            </p>
          )}
        </form>
      </section>
    </section>
  );
}

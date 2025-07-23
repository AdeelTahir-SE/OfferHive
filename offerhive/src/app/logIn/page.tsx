"use client";
import { Eye, EyeClosed } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchRequest } from "@/lib/utils/fetch";
import { useDispatch } from "react-redux";
import { setUser } from "@/lib/redux/user/userSlice";
import Link from "next/link";
import WavySvg from "@/components/wavySvg";
export default function Login() {
  const [passwordRecoveryLoading, setPasswordRecoveryLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState<string | null>();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const dispatch = useDispatch();

  async function handleLogin(e: React.FormEvent) {
    setLoading(true);
    e.preventDefault();
    await fetchRequest(
      "/api/logIn",
      {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(form),
      },
      setLoading,
      setError,
      (data) => {
        if (data.success) {
          setResponse("User logged in Successfully!");
          dispatch(setUser(data?.user));
          router.push("/");
        }
      }
    );

    setLoading(false);
  }

  return (
    <section className="flex flex-col items-center justify-center h-screen bg-white font-sans">
      <section className="flex flex-col items-center justify-center gap-6 px-8 py-10 border rounded-2xl shadow-lg bg-gray-50 w-[400px]">
        <WavySvg />

        <h1 className="text-3xl font-bold text-gray-800">Login</h1>

        <form onSubmit={handleLogin} className="w-full">
          <section className="flex flex-col gap-5 w-full max-w-xs mx-auto">
            <label
              htmlFor="email"
              className="text-base font-semibold text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={form?.email}
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
                value={form?.password}
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
              {loading ? "Logging in..." : "Sign In"}
            </button>
          </section>

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          {response && !error && !loading && !passwordRecoveryLoading && (
            <p className="text-green-500 text-center mt-4">{response}</p>
          )}
          <p className="text-center text-gray-600 mt-4">
            Don&apos;t have an account?
            <Link
              href="/signUp"
              className="text-yellow-500 font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </form>
        <button
          className="text-yellow-500 cursor-pointer text-center w-full font-semibold hover:underline"
          onClick={() => {
            if (!form.email) {
              alert("fill the email field first");
            } else {
              fetchRequest(
                "/api/passwordRecoveryMail",
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "Application/json",
                  },
                  body: JSON.stringify({ email: form?.email }),
                },
                setPasswordRecoveryLoading,
                setError,
                (data) => {
                  setResponse(data?.message);
                }
              );
            }
          }}
        >
          {passwordRecoveryLoading ? "wait a little..." : "forgot password?"}
        </button>
      </section>
    </section>
  );
}

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { updatePassword, getSupabaseUser, getUserWithEmail } from "@/lib/database/user";
import { setUser } from "@/lib/redux/user/userSlice";

export default function ResetPassword() {
  const dispatch = useDispatch();
  const[loading,setLoading]=useState(false);
  const[error,setError]=useState("");
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    getSupabaseUser().then((res) => {
      setForm((prevForm) => ({
        ...prevForm,
        email: res.data?.user?.email || "",
      }));
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { email, password } = form;

    if (password) {
      setLoading(true);
      setError("");
      const {data,error}=await updatePassword(password, email);
      if(error){
        setError(error.message);
        setLoading(false);
        return;
      }
      const user = await getUserWithEmail(email);
      dispatch(setUser(user?.data));
      router.push("/");
      setLoading(false);
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Your Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={form.email}
              disabled
              className="mt-1 w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              id="password"
              required
              onChange={handleChange}
              value={form.password}
              placeholder="Enter new password"
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
          >
            {loading?"loading...":"Update Password"}
          </button>
          
          {error && (
            <div className="text-red-500 text-sm">
              {error}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

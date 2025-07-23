"use client"
import { updatePassword, getSupabaseUser } from "@/lib/database/user";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/lib/redux/user/userSlice";
import { getUserWithEmail } from "@/lib/database/user";
export default function ResetPassword() {
  const dispatch = useDispatch();
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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = form.email;
    const password = form.password;

    if (password) {
      await updatePassword(password, email);
      const user = await getUserWithEmail(form.email);
      dispatch(setUser(user?.data));
      router.push("/");
    }
  }

  return (
    <section>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={form.email} disabled />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" required />

        <button type="submit">Update Password</button>
      </form>
    </section>
  );
}

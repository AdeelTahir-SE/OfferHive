"use client";
import { Eye, EyeClosed, Mail, Lock, ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchRequest } from "@/lib/utils/fetch";
import { useDispatch } from "react-redux";
import { setUser } from "@/lib/redux/user/userSlice";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Login() {
  const [passwordRecoveryLoading, setPasswordRecoveryLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState<string | null>();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>();
  const [focusedField, setFocusedField] = useState<string | null>(null);
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

  const containerVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const floatingIcons = [
    { Icon: Sparkles, delay: 0, color: "text-yellow-400" },
    { Icon: Mail, delay: 1, color: "text-blue-400" },
    { Icon: Lock, delay: 2, color: "text-green-400" },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-yellow-50 p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-yellow-200/20 to-orange-200/20 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-br from-blue-200/20 to-purple-200/20 blur-3xl" />

        {/* Floating Icons */}
        {floatingIcons.map((item, index) => (
          <motion.div
            key={index}
            className={`absolute w-6 h-6 ${item.color} opacity-20`}
            style={{
              left: `${20 + index * 30}%`,
              top: `${15 + index * 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 6 + index * 2,
              delay: item.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <item.Icon className="w-full h-full" />
          </motion.div>
        ))}
      </div>

      <motion.section
        variants={containerVariant}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-md"
      >
        {/* Main Card */}
        <motion.div
          variants={itemVariant}
          className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 relative overflow-hidden"
        >
          {/* Card Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 rounded-3xl" />
          <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-gradient-to-br from-yellow-200/30 to-orange-200/30 blur-2xl" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-gradient-to-br from-blue-200/30 to-purple-200/30 blur-2xl" />

          <div className="relative z-10">
            {/* Logo/Icon */}
            <motion.div variants={itemVariant} className="text-center mb-8">
              <Image
                src="/offerhive-radial.png"
                alt="OfferHive"
                width={100}
                height={100}
                className="mx-auto"
              />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Welcome Back
              </h1>
              <p className="text-gray-600 mt-2">Sign in to your account</p>
            </motion.div>

            {/* Form */}
            <motion.form
              onSubmit={handleLogin}
              className="space-y-6"
              variants={itemVariant}
            >
              {/* Email Field */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
                <motion.div
                  className={`relative transition-all duration-300 ${
                    focusedField === "email" ? "scale-[1.02]" : ""
                  }`}
                >
                  <input
                    id="email"
                    type="email"
                    value={form?.email}
                    onChange={(e) => {
                      setForm({ ...form, email: e.target.value });
                    }}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 pl-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all duration-300 bg-white/70 backdrop-blur-sm"
                    required
                  />
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <motion.div
                    className={`absolute inset-0 rounded-xl border-2 pointer-events-none transition-opacity duration-300 ${
                      focusedField === "email"
                        ? "opacity-100 border-yellow-500"
                        : "opacity-0"
                    }`}
                  />
                </motion.div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  Password
                </label>
                <motion.div
                  className={`relative transition-all duration-300 ${
                    focusedField === "password" ? "scale-[1.02]" : ""
                  }`}
                >
                  <input
                    id="password"
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="Enter your password"
                    value={form?.password}
                    onChange={(e) => {
                      setForm({ ...form, password: e.target.value });
                    }}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3 pl-12 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all duration-300 bg-white/70 backdrop-blur-sm"
                    required
                  />
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                  >
                    {isPasswordVisible ? (
                      <EyeClosed className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </motion.button>
                  <motion.div
                    className={`absolute inset-0 rounded-xl border-2 pointer-events-none transition-opacity duration-300 ${
                      focusedField === "password"
                        ? "opacity-100 border-yellow-500"
                        : "opacity-0"
                    }`}
                  />
                </motion.div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className="w-full py-3 bg-primary text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl group"
              >
                <span className="flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </>
                  )}
                </span>
              </motion.button>

              {/* Messages */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-3 bg-red-50 border border-red-200 rounded-xl"
                  >
                    <p className="text-red-600 text-sm text-center">{error}</p>
                  </motion.div>
                )}
                {response && !error && !loading && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-3 bg-green-50 border border-green-200 rounded-xl"
                  >
                    <p className="text-green-600 text-sm text-center">
                      {response}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Sign Up Link */}
              <motion.p
                variants={itemVariant}
                className="text-center text-gray-600"
              >
                Don&apos;t have an account?{" "}
                <Link
                  href="/signUp"
                  className="text-yellow-600 font-semibold hover:text-yellow-700 hover:underline transition-colors duration-200"
                >
                  Sign Up
                </Link>
              </motion.p>

              {/* Forgot Password */}
              <motion.button
                type="button"
                variants={itemVariant}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full text-yellow-600 font-semibold hover:text-yellow-700 hover:underline transition-colors duration-200 py-2"
                onClick={() => {
                  if (!form.email) {
                    alert("Please fill the email field first");
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
                disabled={passwordRecoveryLoading}
              >
                {passwordRecoveryLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-3 h-3 border-2 border-yellow-600/30 border-t-yellow-600 rounded-full"
                    />
                    Sending recovery email...
                  </span>
                ) : (
                  "Forgot your password?"
                )}
              </motion.button>
            </motion.form>
          </div>
        </motion.div>

        {/* Bottom Trust Indicators */}
        <motion.div
          variants={itemVariant}
          className="text-center mt-6 text-sm text-gray-500"
        >
          <p>🔒 Secure login • 12,500+ students trust us</p>
        </motion.div>
      </motion.section>
    </section>
  );
}

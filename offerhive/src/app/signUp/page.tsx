"use client";
import { Eye, EyeClosed, User, Mail, Lock, ArrowRight, Sparkles, CheckCircle, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/lib/redux/user/userSlice";
import Link from "next/link";
import Image from "next/image";
import { fetchRequest } from "@/lib/utils/fetch";
import { motion, AnimatePresence } from "framer-motion";

export default function SignUp() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState<string | null>();
  const [loading, setLoading] = useState(false);
  const [dbUser, setDbUser] = useState<any>();
  const [successMessage, setSuccessMessage] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  // Password strength checker
  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  useEffect(() => {
    setPasswordStrength(checkPasswordStrength(form.password));
  }, [form.password]);

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
  }, [dbUser]);

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

  const successVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  };

  const floatingIcons = [
    { Icon: Sparkles, delay: 0, color: "text-yellow-400" },
    { Icon: Users, delay: 1, color: "text-blue-400" },
    { Icon: CheckCircle, delay: 2, color: "text-green-400" },
  ];

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 1) return "bg-red-500";
    if (passwordStrength <= 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 1) return "Weak";
    if (passwordStrength <= 3) return "Medium";
    return "Strong";
  };

  // Success screen
  if (successMessage) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-yellow-50 p-4">
        <motion.div
          variants={successVariant}
          initial="hidden"
          animate="visible"
          className="text-center max-w-md mx-auto"
        >
          <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 rounded-3xl" />
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 text-white mb-6 mx-auto"
              >
                <CheckCircle className="w-10 h-10" />
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-3xl font-bold text-gray-800 mb-4"
              >
                Welcome Aboard! 🎉
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="p-4 bg-green-50 border border-green-200 rounded-xl mb-6"
              >
                <p className="text-green-700">{successMessage}</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="space-y-4"
              >
                <Link
                  href="/logIn"
                  className="inline-flex w-full items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-xl hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Go to Login
                  <ArrowRight className="w-4 h-4" />
                </Link>
                
                <p className="text-sm text-gray-600">
                  Didn't receive the email? Check your spam folder or contact support.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
    );
  }

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
            <motion.div
              variants={itemVariant}
              className="text-center mb-8"
            >
              <Image 
                src="/offerhive-radial.png"
                alt="OfferHive"
                width={100}
                height={100}
                className="mx-auto"
              />
              {/* <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="inline-block p-4 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 text-white mb-4 shadow-lg"
              >
              </motion.div> */}
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Join Our Community
              </h1>
              <p className="text-gray-600 mt-2">Create your student entrepreneur account</p>
            </motion.div>

            {/* Form */}
            <motion.form 
              onSubmit={handleSignUp} 
              className="space-y-6"
              variants={itemVariant}
            >
              {/* Name Field */}
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  Full Name
                </label>
                <motion.div
                  className={`relative transition-all duration-300 ${
                    focusedField === 'name' ? 'scale-[1.02]' : ''
                  }`}
                >
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(e) => {
                      setForm({ ...form, name: e.target.value });
                    }}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 pl-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all duration-300 bg-white/70 backdrop-blur-sm"
                    required
                  />
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <motion.div
                    className={`absolute inset-0 rounded-xl border-2 pointer-events-none transition-opacity duration-300 ${
                      focusedField === 'name' ? 'opacity-100 border-yellow-500' : 'opacity-0'
                    }`}
                  />
                </motion.div>
              </div>

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
                    focusedField === 'email' ? 'scale-[1.02]' : ''
                  }`}
                >
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => {
                      setForm({ ...form, email: e.target.value });
                    }}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 pl-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all duration-300 bg-white/70 backdrop-blur-sm"
                    required
                  />
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <motion.div
                    className={`absolute inset-0 rounded-xl border-2 pointer-events-none transition-opacity duration-300 ${
                      focusedField === 'email' ? 'opacity-100 border-yellow-500' : 'opacity-0'
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
                    focusedField === 'password' ? 'scale-[1.02]' : ''
                  }`}
                >
                  <input
                    id="password"
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={form.password}
                    onChange={(e) => {
                      setForm({ ...form, password: e.target.value });
                    }}
                    onFocus={() => setFocusedField('password')}
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
                      focusedField === 'password' ? 'opacity-100 border-yellow-500' : 'opacity-0'
                    }`}
                  />
                </motion.div>

                {/* Password Strength Indicator */}
                {form.password && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Password Strength</span>
                      <span className={`font-medium ${
                        passwordStrength <= 1 ? 'text-red-500' : 
                        passwordStrength <= 3 ? 'text-yellow-500' : 'text-green-500'
                      }`}>
                        {getPasswordStrengthText()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${(passwordStrength / 5) * 100}%` }}
                      />
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className="w-full px-4 py-3 bg-primary text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl group"
              >
                <span className="flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
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
              </AnimatePresence>

              {/* Login Link */}
              <motion.p 
                variants={itemVariant}
                className="text-center text-gray-600"
              >
                Already have an account?{" "}
                <Link
                  href="/logIn"
                  className="text-yellow-600 font-semibold hover:text-yellow-700 hover:underline transition-colors duration-200"
                >
                  Log In
                </Link>
              </motion.p>
            </motion.form>
          </div>
        </motion.div>

        {/* Bottom Trust Indicators */}
        <motion.div
          variants={itemVariant}
          className="text-center mt-6 text-sm text-gray-500"
        >
          <p>🔒 Secure registration • Join 12,500+ student entrepreneurs</p>
        </motion.div>
      </motion.section>
    </section>
  );
}
"use client";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setProfileImage } from "@/lib/redux/user/userSlice";
import { useDispatch } from "react-redux";
import { signOut } from "@/lib/database/user";
import { setUser } from "@/lib/redux/user/userSlice";
import { useRouter } from "next/navigation";
import { RootState } from "@/lib/redux/store";
import { fetchRequest } from "@/lib/utils/fetch";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Camera,
  Settings,
  LogOut,
  Mail,
  Calendar,
  Shield,
  Bell,
  Eye,
  Edit3,
  Save,
  ArrowRight,
} from "lucide-react";

export default function Profile() {
  const UserData = useSelector((state: RootState) => state?.user);

  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: UserData?.name,
    email: UserData?.email,
    profile_image: UserData?.profile_image,

  });
  
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    setProfileData({...profileData,

      name: UserData?.name,
      email: UserData?.email,
      profile_image: UserData?.profile_image,

    });
  }, [UserData]);

  const handleLogout = async () => {
    const confirmed = confirm("Are you sure you want to logout?");
    if (!confirmed) return;

    try {
      setLoading(true);
      await signOut();
      dispatch(
        setUser({
          name:"",
          user_id: "",
          email: "",
          profile_image: "/profile_placeholder.png",
          is_shop_owner: false,
          joined_groups: [],
          subscribed_groups: [],
        })
      );
      setMessage("Successfully logged out.");
      setTimeout(() => {
        router.push("/logIn");
      }, 1500);
    } catch (error) {
      setMessage("Logout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !UserData?.user_id) return;
    const formData = new FormData();
    formData.append("image", file);
    formData.append("user_id", UserData?.user_id);
    await fetchRequest(
      "/api/profile/imageChange",
      {
        method: "PATCH",
        body: formData,
      },
      setUploading,
      () => {},
      (data) => {
         if(data.success){
          setProfileData({...profileData,
            profile_image: data?.imageurl,
          })
         }
        
      }

    );
  };

  const handleSaveProfile = () => {
    console.log(UserData)
    // Add your profile update API call here
    setIsEditing(false);
    fetchRequest(
      "/api/profile/updateUser",
      {
        method: "PATCH",
        body: JSON.stringify({
          user_id: UserData?.user_id,
          ...profileData,
        }),
      },
      setUploading,
      (error) => {if (error)alert("Issue in Updating user try later")},
      (data) => {

        if(data.success){
          dispatch(setUser({...UserData,
            ...profileData,
          }));

          alert("Profile updated successfully!");

          setMessage("Profile updated successfully!");
        }

      }
    );
    setTimeout(() => setMessage(""), 3000);
  };



  const tabs = [
    { id: "profile", label: "Profile", icon: <User className="w-4 h-4" /> },
    { id: "settings", label: "Settings", icon: <Settings className="w-4 h-4" /> },
  ];

  // Not logged in state
  if (UserData && !UserData?.email) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-yellow-50 p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-lg mx-auto"
        >
          <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 rounded-3xl" />
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 text-white mb-6 mx-auto"
              >
                <User className="w-10 h-10" />
              </motion.div>
              
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Oops! Login Required 😅
              </h1>
              
              <p className="text-gray-600 mb-8">
                You need to be logged in to access your profile and manage your account.
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/logIn")}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 px-8 rounded-full hover:from-yellow-600 hover:to-orange-600 text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Login Now
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-yellow-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
            My Profile
          </h1>
          <p className="text-gray-600">Manage your personal information and account settings</p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-2 shadow-lg">
            <div className="flex gap-2">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-8 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-primary text-black shadow-lg"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "profile" && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Profile Card */}
              <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 rounded-3xl" />
                <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-gradient-to-br from-yellow-200/30 to-orange-200/30 blur-2xl" />
                
                <div className="relative z-10">
                  {/* Profile Image Section */}
                  <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                    <div className="relative group">
                      <div className="w-32 h-32 relative">
                        <Image
                          src={
                            profileData?.profile_image?profileData?.profile_image:"/profile_placeholder.png"
                          }
                          alt={`${UserData?.email}'s Profile Picture`}
                          className="rounded-full object-cover border-4 border-white shadow-lg"
                          fill
                        />
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <Camera className="w-8 h-8 text-white" />
                        </motion.div>
                      </div>
                      
                      <label className="absolute -bottom-2 -right-2 cursor-pointer bg-primary text-white p-3 rounded-full hover:from-yellow-600 hover:to-orange-600 shadow-lg hover:shadow-xl transition-all duration-300">
                        {uploading ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          />
                        ) : (
                          <Edit3 className="w-4 h-4" />
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                      <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                        <h2 className="text-3xl font-bold text-gray-800">{profileData?.name}</h2>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setIsEditing(!isEditing)}
                          className="p-2 text-gray-600 hover:text-yellow-600 transition-colors duration-200"
                        >
                          <Edit3 className="w-5 h-5" />
                        </motion.button>
                      </div>
                      <p className="text-gray-600 mb-2 flex items-center gap-2 justify-center md:justify-start">
                        <Mail className="w-4 h-4" />
                        {profileData.email}
                      </p>
                      {/* <p className="text-gray-600 mb-4 flex items-center gap-2 justify-center md:justify-start">
                        <Calendar className="w-4 h-4" />
                        Member since January 2024
                      </p> */}
                    </div>
                  </div>

                  {/* Profile Information */}
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={profileData.name}
                            onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all duration-300"
                          />
                        ) : (
                          <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800">{profileData.name}</div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                        <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-600">{profileData.email}</div>
                      </div>

                      {/*  <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">University</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={profileData.university}
                            onChange={(e) => setProfileData({...profileData, university: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all duration-300"
                          />
                        ) : (
                          <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800">{profileData.university}</div>
                        )}
                      </div>

                     <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Year & Major</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={`${profileData.year} - ${profileData.major}`}
                            onChange={(e) => {
                              const [year, major] = e.target.value.split(' - ');
                              setProfileData({...profileData, year: year || '', major: major || ''});
                            }}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all duration-300"
                          />
                        ) : (
                          <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800">{profileData.year} - {profileData.major}</div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
                      {isEditing ? (
                        <textarea
                          value={profileData.bio}
                          onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                          rows={4}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all duration-300 resize-none"
                        />
                      ) : (
                        <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800">{profileData.bio}</div>
                      )} */}
                    </div>

                    {isEditing && (
                      <div className="flex justify-end gap-4">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setIsEditing(false)}
                          className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200"
                        >
                          Cancel
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleSaveProfile}
                          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-xl hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                          <Save className="w-4 h-4" />
                          Save Changes
                        </motion.button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "settings" && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 rounded-3xl" />
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <Settings className="w-6 h-6" />
                    Account Settings
                  </h3>
                  
                  <div className="space-y-6">
                    {/* <div className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3 mb-2">
                        <Bell className="w-5 h-5 text-gray-600" />
                        <h4 className="font-semibold text-gray-800">Email Notifications</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Manage how you receive updates</p>
                      <button className="text-yellow-600 hover:text-yellow-700 font-medium transition-colors duration-200">Configure →</button>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3 mb-2">
                        <Eye className="w-5 h-5 text-gray-600" />
                        <h4 className="font-semibold text-gray-800">Privacy Settings</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Control your profile visibility</p>
                      <button className="text-yellow-600 hover:text-yellow-700 font-medium transition-colors duration-200">Manage →</button>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3 mb-2">
                        <Shield className="w-5 h-5 text-gray-600" />
                        <h4 className="font-semibold text-gray-800">Security</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Change password and security settings</p>
                      <button className="text-yellow-600 hover:text-yellow-700 font-medium transition-colors duration-200">Manage →</button>
                    </div> */}

                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                      <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <LogOut className="w-5 h-5" />
                        Logout
                      </h4>
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleLogout}
                        disabled={loading}
                        className={`px-6 py-3 text-white rounded-xl transition-all font-medium ${
                          loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl"
                        }`}
                      >
                        {loading ? (
                          <span className="flex items-center gap-2">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                            />
                            Logging out...
                          </span>
                        ) : (
                          "Logout"
                        )}
                      </motion.button>

                      <AnimatePresence>
                        {message && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className={`mt-4 text-sm ${
                              message.includes("failed") ? "text-red-600" : "text-green-600"
                            }`}
                          >
                            {message}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
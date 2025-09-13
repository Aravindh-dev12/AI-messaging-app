import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser } = useAuthStore();

  return (
    <div className="h-screen bg-gradient-to-b from-base-100 via-base-200 to-base-300 pt-20">
      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Main Card Container */}
        <div className="bg-base-300 rounded-3xl border border-zinc-700/20 backdrop-blur-sm shadow-2xl p-6 space-y-8">

          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-wide text-primary">Profile</h1>
            <p className="mt-2 text-zinc-400">View and manage your profile details</p>
          </div>

          {/* Avatar Section */}
          <div className="flex flex-col items-center relative">
            {/* Avatar Circle */}
            <div className="relative w-32 h-32 rounded-full border-4 border-primary shadow-2xl flex items-center justify-center bg-base-200">
              {authUser?.avatar ? (
                <img
                  src={authUser.avatar}
                  alt="Avatar"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <User className="w-16 h-16 text-zinc-400" />
              )}

              {/* Camera Button - Bottom-Right Edge */}
              <button className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 bg-primary text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-200 z-10">
                <Camera className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-zinc-400 mt-3">Upload a profile picture</p>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-base-200 rounded-2xl p-5 shadow-lg border border-zinc-600/20 hover:shadow-2xl transition-shadow duration-300 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <User className="w-4 h-4" /> Full Name
              </div>
              <p className="text-base px-4 py-2.5 rounded-xl bg-base-300 border border-zinc-600/20 shadow-inner">
                {authUser?.fullName}
              </p>
            </div>

            <div className="bg-base-200 rounded-2xl p-5 shadow-lg border border-zinc-600/20 hover:shadow-2xl transition-shadow duration-300 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <Mail className="w-4 h-4" /> Email Address
              </div>
              <p className="text-base px-4 py-2.5 rounded-xl bg-base-300 border border-zinc-600/20 shadow-inner">
                {authUser?.email}
              </p>
            </div>
          </div>

          {/* Account Info */}
          <div className="bg-base-200 rounded-3xl p-5 shadow-inner border border-zinc-600/20 backdrop-blur-sm">
            <h2 className="text-lg font-semibold text-primary mb-3">Account Information</h2>
            <div className="space-y-2.5 text-sm text-zinc-300">
              <div className="flex justify-between text-gray-600 py-2 border-b border-zinc-700/20">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex text-gray-600 justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500 font-medium">Active</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

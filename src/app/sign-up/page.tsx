"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { FcGoogle } from "react-icons/fc";
import { FiUser, FiMail, FiLock, FiBookOpen, FiAward, FiBook } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

type SignUpFormData = {
  name: string;
  email: string;
  password: string;
  imageUrl?: string;
};

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"student" | "mentor">("student");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>();

const onSubmit = async (data: SignUpFormData) => {
    setLoading(true);

    try {
      // সমাধান: সরাসরি প্রথম অবজেক্টের ভেতরেই 'role' ফিল্ডটি পাস করা হয়েছে
      const res = await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
        image: data.imageUrl || undefined,
        role: selectedRole, // এখানে সরাসরি দিন
        callbackURL: `/dashboard/${selectedRole}` 
      });

      if (res.error) {
        toast.error(res.error.message || "Failed to create account");
      } else {
        toast.success(`Account created as ${selectedRole}!`);
        router.push(`/sign-in`);
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: `/dashboard/${selectedRole}`,
      });
    } catch (err: any) {
      toast.error("Failed to sign up with Google");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center items-center gap-2 text-indigo-600 font-bold text-2xl">
          <FiBookOpen className="w-8 h-8" />
          <span>EduPlatform</span>
        </Link>
        <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/sign-in" className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
          
          {/* Role Selection Blocks */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Join as a:</label>
            <div className="grid grid-cols-2 gap-4">
              <div
                onClick={() => setSelectedRole("student")}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedRole === "student"
                    ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                    : "border-gray-200 hover:border-gray-300 bg-white text-gray-500"
                }`}
              >
                <FiBook className="w-6 h-6 mb-1" />
                <span className="font-semibold text-sm">Student</span>
              </div>

              <div
                onClick={() => setSelectedRole("mentor")}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedRole === "mentor"
                    ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                    : "border-gray-200 hover:border-gray-300 bg-white text-gray-500"
                }`}
              >
                <FiAward className="w-6 h-6 mb-1" />
                <span className="font-semibold text-sm">Mentor</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleGoogleSignUp}
            type="button"
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors focus:outline-none"
          >
            <FcGoogle className="w-5 h-5" />
            <span>Sign up as {selectedRole} with Google</span>
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or use email instead</span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="John Doe"
                  {...register("name", { required: "Full name is required" })}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400" />
                </div>
                <input
                  type="email"
                  placeholder="you@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer focus:outline-none disabled:opacity-50 transition-colors"
            >
              {loading ? "Registering..." : `Sign Up as ${selectedRole}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
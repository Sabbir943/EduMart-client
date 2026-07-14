"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client"; // Your Better Auth client helper

// Icons
import { FcGoogle } from "react-icons/fc";
import { FiUser, FiMail, FiLock, FiImage, FiBookOpen } from "react-icons/fi";

// Form Type Definition
type SignUpFormData = {
  name: string;
  email: string;
  password: string;
  imageUrl?: string;
  role: "student" | "mentor" | "admin";
};

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SignUpFormData>({
    defaultValues: {
      role: "student",
    },
  });

  const emailValue = watch("email");

  // Handle Form Submission
  const onSubmit = async (data: SignUpFormData) => {
    setLoading(true);

    // Fixed Admin Logic: If the user inputs admin@gmail.com, force the role to 'admin'
    let assignedRole = data?.role;
    if (data.email.trim().toLowerCase() === "admin@gmail.com") {
      assignedRole = "admin";
    }

    try {
      const res = await authClient.signUp.email({
        email: data?.email,
        password: data?.password,
        name: data?.name,
        image: data?.imageUrl || undefined,
        role: assignedRole, // Custom field passed to Better Auth
      });

      if (res.error) {
        toast.error(res.error.message || "Failed to create account");
      } else {
        toast.success(`Account created as ${assignedRole.toUpperCase()}! Redirecting...`);
        
        // Redirect to appropriate dashboard based on role
        if (assignedRole === "admin") {
          router.push("/dashboard/admin");
        } else if (assignedRole === "mentor") {
          router.push("/dashboard/mentor");
        } else {
          router.push("/dashboard/student");
        }
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Google OAuth Sign Up
  const handleGoogleSignUp = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard/student",
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
          Create a new account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/sign-in" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
          
          {/* Google Sign Up Button */}
          <button
            onClick={handleGoogleSignUp}
            type="button"
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none"
          >
            <FcGoogle className="w-5 h-5" />
            <span>Sign up with Google</span>
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or register with email</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            {/* Full Name Field */}
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

            {/* Email Field */}
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

            {/* Password Field */}
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

            {/* Image URL (Optional) */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Avatar Image URL <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiImage className="text-gray-400" />
                </div>
                <input
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  {...register("imageUrl", {
                    pattern: {
                      value: /^https?:\/\/.+/i,
                      message: "Please enter a valid URL starting with http:// or https://",
                    },
                  })}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              {errors.imageUrl && <p className="mt-1 text-xs text-red-600">{errors.imageUrl.message}</p>}
            </div>

            {/* Role Selection Dropdown (Hidden or auto-assigned if admin@gmail.com) */}
            <div>
              <label className="block text-sm font-medium text-gray-700">I am joining as a</label>
              <select
                {...register("role")}
                disabled={emailValue?.trim().toLowerCase() === "admin@gmail.com"}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
              >
                <option value="student">Student</option>
                <option value="mentor">Mentor</option>
              </select>
              {emailValue?.trim().toLowerCase() === "admin@gmail.com" && (
                <p className="mt-1 text-xs text-indigo-600 font-semibold">
                  * System Admin email detected. Account role will automatically be set to Admin.
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
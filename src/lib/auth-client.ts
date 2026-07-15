// lib/auth-client.ts
import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "@/lib/auth"; // আপনার সার্ভার সাইড auth কনফিগ ফাইলের টাইপ ইম্পোর্ট করুন

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
  plugins: [
    inferAdditionalFields<typeof auth>() // এটি সার্ভার কনফিগ থেকে 'role' ফিল্ডটির টাইপ ক্লায়েন্ট সাইডে যুক্ত করবে
  ]
});

// সরাসরি ক্লায়েন্ট মেথডগুলো এক্সপোর্ট করার প্র্যাকটিস
export const { signIn, signUp, useSession } = authClient;
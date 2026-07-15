import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("MONGODB_URI is not defined in environment variables.");
}

const client = new MongoClient(uri);
const db = client.db("EduMart");

export const auth = betterAuth({
  emailAndPassword: { 
    enabled: true, 
  }, 
  socialProviders: {
    google: { 
      clientId: process.env.GOOGLE_CLIENT_ID as string, 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
    }, 
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        input: true, // Allow client side inputs during registration!
        defaultValue: "student",
      } 
    }
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const emailNormalized = user.email.trim().toLowerCase();
          
          // 1. If trying to sign up as 'admin', block it unless they are the specific admin email
          if (user.role === "admin" && emailNormalized !== "admin@gmail.com") {
            return {
              data: {
                ...user,
                role: "student", // Force demotion
              }
            };
          }

          // 2. Automatically assign admin to the primary admin email
          if (emailNormalized === "admin@gmail.com") {
            return {
              data: {
                ...user,
                role: "admin",
              }
            };
          }

          return { data: user };
        }
      }
    }
  },
  database: mongodbAdapter(db, {
    client
  }),
});
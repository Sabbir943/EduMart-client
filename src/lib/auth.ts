import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("MONGODB_URI is not defined in environment variables.");
}
const client = new MongoClient(uri);
const db = client.db("online-book");

export const auth = betterAuth({
    emailAndPassword: { 
    enabled: true, 
  }, 
  socialProviders: { 
    github: { 
      clientId: process.env.GITHUB_CLIENT_ID as string, 
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
    }, 
  }, 
  user: {
       additionalFields: {
          role: {
              type: "string",
              input: false,
              defaultValue: "student",
            } 
        }
    },
  database: mongodbAdapter(db, {
    
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),
});
# 📘 EduPlatform — Premium Learning Management Ecosystem

A highly optimized, minimalist, and high-density MERN stack e-learning platform architecture designed for seamless course streaming, classroom metrics monitoring, and identity synchronization.

---

## 🎯 Project Objective
EduPlatform-এর মূল লক্ষ্য হলো একটি মডার্ন, টাইপ-সেফ এবং মিনিমালিস্ট লার্নিং ম্যানেজমেন্ট ইকোসিস্টেম তৈরি করা। এটি ডেভেলপারদের জন্য রিফাইনড কোডবেস মেইনটেইন করার পাশাপাশি স্টুডেন্ট এবং মেন্টরদের রিয়েল-টাইম ডাটা সিঙ্ক্রোনাইজেশন, কোর্স এনরোলমেন্ট ট্র্যাকিং এবং ক্লাস্টারেড এনালিটিক্স উইজেট প্রদানের মাধ্যমে একটি প্রিমিয়াম লার্নিং এক্সপেরিয়েন্স নিশ্চিত করে।

---

## ✨ Key Features Matrix

### 👤 Student Workspace & Management
* **Enrolled Workspace Matrix:** A real-time tabular tracker capturing enrolled courses, exact enrollment dates, and custom processing timestamps (`toLocaleDateString` integration).
* **Workspace Management:** Interactive dropping mechanic with native state updating and instant database record cleanup (`DELETE /api/student/enrollments/:id`).
* **Account Identity Configurator:** Real-time profile metadata syncer featuring full name edits and avatar stream URL customization powered by an atomic patch worker.

### 🏠 Homepage Analytics Widgets
* **Most Popular Streams:** A real-time aggregation pipeline analyzing enrollment densities to highlight the top 3 highest-trafficked workspace channels.
* **Top Contributor Spotlight:** Automatic calculation module highlighting the ecosystem's most active instructor based on cumulative course creation statistics.

### 🛡️ Core Infrastructure & UX Resilience
* **Ecosystem Resilience:** Custom premium `404 Not Found` matrix layer with backward routing history safety controls (`window.history.back`).
* **Type-Safe Compilation:** Robust codebase validated against strict TypeScript type-checking models (`TS2532` resolution).

---

## 🛠️ Core Technology Stack

| Layer | Technology | Functional Domain |
| :--- | :--- | :--- |
| **Frontend UI** | Next.js 14 (App Router) | Core Layout & Routing Architecture |
| **Styling** | Tailwind CSS | Minimalist UI & Dynamic Theme Controls |
| **Icons & Motion** | React Icons (`fi`), Framer Motion | Visual Micro-interactions |
| **Authentication** | Better-Auth Ecosystem | Session Management & OAuth Handshake |
| **Backend Engine**| Node.js, Express.js | API Architecture & Database Aggregations |
| **Database Cluster**| MongoDB Atlas | Scalable Document Storage & JSON Matrix |
| **Language** | TypeScript (Strict Mode) | End-to-End Type Safety |

---

## 🔒 Authentication & Security Architecture

Ecosystem-এর সিকিউরিটি এবং সেশন মূলত **Better-Auth** ফ্রেমওয়ার্ক দ্বারা নিয়ন্ত্রিত। 

* **OAuth 2.0 Integration:** গুগল ক্লায়েন্ট আইডির মাধ্যমে সিকিউর সোশ্যাল লগইন মেকানিজম।
* **Session Persistence:** ক্লায়েন্ট সাইডে `authClient.useSession` ব্যবহার করে রিয়েল-টাইম ক্রেডেনশিয়াল সিঙ্ক্রোনাইজেশন এবং রাউট গার্ডস প্রটেকশন।
* **Database Layout Integration:** Better-Auth স্ট্যান্ডার্ড অনুযায়ী মঙ্গোডিবি ক্লাস্টারে ডেটা মূলত নিচের কালেকশনগুলোতে স্ট্রাকচার্ড থাকে:
  * `users` — Handles verified profile identities and credentials.
  * `courses` — Maintains curriculum specifications, tuition values, and instructor tags.
  * `enrollments` — Keeps transactional logs mapping users to active course streams.

---

## 🚀 Getting Started & Environment

### 1. Installation
Clone the repository and install dependencies for both layers:
```bash
# Clone the repository
git clone [https://github.com/your-username/eduplatform.git](https://github.com/your-username/eduplatform.git)
cd eduplatform

# Install Frontend dependencies
cd client
npm install

# Install Server dependencies
cd ../server
npm install

Create a `.env` file in your **server** directory:
```env
PORT=8000
MONGODB_URI=mongodb_uri
BETTER_AUTH_SECRET=your_better_auth_cryptographic_secret_key
BETTER_AUTH_URL=localhost link
CLIENT_URL=localhost link
GOOGLE_CLIENT_ID=your_google_oauth_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret_key
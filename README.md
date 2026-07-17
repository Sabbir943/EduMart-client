# 📘 EduPlatform — Premium Learning Management Ecosystem

A highly optimized, minimalist, and high-density MERN stack e-learning platform architecture designed for seamless course streaming, classroom metrics monitoring, and identity synchronization.

---

## 🎯 Project Objective
The primary objective of EduPlatform is to deliver a modern, type-safe, and high-performance learning ecosystem. Built using the clean paradigms of the MERN stack and Next.js, it streamlines student-to-mentor interaction channels through real-time data synchronization, automated aggregation pipelines, and highly resilient state containment.

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
| **Frontend UI** | Next.js 14 (App Router) | Typescript | Core Layout & Routing Architecture |
| **Styling** | Tailwind CSS | Minimalist UI & Dynamic Theme Controls |
| **Icons & Motion** | React Icons (`fi`), Framer Motion | Visual Micro-interactions |
| **Authentication** | Better-Auth Ecosystem | Session Management & OAuth Handshake |
| **Backend Engine**| Node.js, Express.js | API Architecture & Database Aggregations |
| **Database Cluster**| MongoDB Atlas | Scalable Document Storage & JSON Matrix |
| **Language** | TypeScript (Strict Mode) | End-to-End Type Safety |

---

## 🔒 Authentication & Security Architecture

The platform's security framework and session context are completely isolated and driven by the **Better-Auth** engine.

* **OAuth 2.0 Integration:** Secure social authentication handshake utilizing Google Client credentials.
* **Session Persistence:** High-performance real-time credential extraction using client hook layers (`authClient.useSession`) for state consistency and route guard protection.
* **Database Layout Integration:** Under the Better-Auth standard schema, data structures are mapped cleanly into the following database cluster collections:
  * `users` — Handles verified profile identities and credentials.
  * `courses` — Maintains curriculum specifications, tuition values, and instructor tags.
  * `enrollments` — Keeps transactional logs mapping users to active course streams.

---

## 🚀 Getting Started & Environment Setup

### 1. Installation & Syncing
Clone the repository instance and compile dependencies for both ecosystem layers:
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
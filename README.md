# ThinkBoard

ThinkBoard is a modern, responsive, and full-featured MERN (MongoDB, Express, React, Node.js) stack note-taking application. It is styled with a premium dark forest aesthetic using Tailwind CSS and Daisy UI, and features robust server-side rate limiting backed by Upstash Redis to prevent abuse.

---

## 🚀 Features

- **Full CRUD Capabilities**: Create, read, update, and delete notes seamlessly.
- **Modern & Responsive UI**: Responsive design featuring custom layouts, a glassmorphism background, and smooth micro-animations.
- **Premium Aesthetics**: Built with Tailwind CSS and the DaisyUI `forest` theme.
- **Upstash Redis Rate Limiting**: Protects backend endpoints with a sliding window rate limiter (10 requests per 20 seconds) via `@upstash/ratelimit`.
- **Elegant Error & Limit Handling**: Specialized fallback UIs (`RateLimitedUi` and `NotesNotFound`) and real-time toast alerts (`react-hot-toast`) for error handling and rate-limit warnings.
- **Clean Architecture**: Decoupled, modular folder structures for both the frontend (React + Vite) and backend (Express + Mongoose).
- **Single Command Build**: Automates the installation and compilation of both backend and frontend layers for streamlined production deployment.

---

## 📂 Project Architecture

```
mern-thinkboard/
├── backend/                  # Express and Node.js Server
│   ├── src/
│   │   ├── config/           # DB (Mongoose) and Upstash Redis configurations
│   │   ├── controllers/      # Route controllers for Notes
│   │   ├── middleware/       # Rate limiting middleware
│   │   ├── models/           # Mongoose schemas (Note)
│   │   ├── routes/           # Express routes mapping
│   │   └── server.js         # Entry point for the backend application
│   └── package.json
│
├── frontend/                 # React and Vite Client
│   ├── src/
│   │   ├── components/       # Reusable components (Navbar, NoteCard, etc.)
│   │   ├── lib/              # Client utilities (Axios instance, Date formatting)
│   │   ├── pages/            # View pages (HomePage, CreatePage, NoteDetailPage)
│   │   ├── App.jsx           # Client routes and theme wrapper
│   │   ├── index.css         # TailwindCSS styles
│   │   └── main.jsx          # React app entry point
│   ├── tailwind.config.js    # Tailwind & DaisyUI settings
│   ├── vite.config.js        # Vite configuration
│   └── package.json
│
├── package.json              # Full-stack orchestrator
└── .gitignore
```

---

## 🛠️ Prerequisites & Requirements

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (Version 14.0.0 or higher; v18+ is recommended)
- [MongoDB](https://www.mongodb.com/) (Local database instance or MongoDB Atlas URI)
- [Upstash Redis](https://upstash.com/) account (to get REST credentials for Redis rate-limiting)

---

## ⚙️ Setup & Configuration

### 1. Clone the Repository
```bash
git clone https://github.com/Firaol-project/mern-thinkboard.git
cd mern-thinkboard
```

### 2. Configure Environment Variables
Create a `.env` file inside the `backend` directory:
```bash
# File: backend/.env

# Port for the server to listen on
PORT=5001

# MongoDB Connection String
MONGO_URI=mongodb://localhost:27017/thinkboard
# OR use MongoDB Atlas: mongodb+srv://<user>:<password>@cluster.mongodb.net/thinkboard

# Upstash Redis REST Credentials (Required for rate limiting)
UPSTASH_REDIS_REST_URL=https://your-upstash-instance.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_upstash_token_here

# Environment Settings
NODE_ENV=development
```

---

## 💻 Running the Application

### Option A: Running in Development Mode (Separate Servers)
In development, the frontend and backend run on different local ports to leverage Hot Module Replacement (HMR).

1. **Start the Backend Server**:
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   *The server will start on [http://localhost:5001](http://localhost:5001).*

2. **Start the Frontend Client**:
   Open a new terminal window:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   *The Vite app will launch on [http://localhost:5173](http://localhost:5173).*

---

### Option B: Running in Production Mode (Unified Server)
In production, the backend server compiles and serves the static production build of the React app.

1. **Build the Application**:
   Run the root build command. This installs all dependencies for both directories and builds the frontend:
   ```bash
   npm run build
   ```
2. **Start the Unified Server**:
   Set your `NODE_ENV` to `production` and start the server:
   ```bash
   # On Windows (PowerShell):
   $env:NODE_ENV="production"
   npm start
   
   # On macOS/Linux:
   NODE_ENV=production npm start
   ```
   *The entire app (frontend and backend) will run on [http://localhost:5001](http://localhost:5001).*

---

## 📡 API Endpoints Documentation

All routes are prefixed with `/api/notes`.

| Method | Endpoint | Description | Request Body | Response |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/` | Fetch all notes (sorted by newest first) | None | `200 OK` (Array of Notes) |
| **GET** | `/:id` | Fetch details of a single note by ID | None | `200 OK` (Note Object) or `404 Not Found` |
| **POST** | `/` | Create a new note | `{ "title": "...", "content": "..." }` | `210 Created` (Saved Note Object) |
| **PUT** | `/:id` | Edit/Update an existing note | `{ "title": "...", "content": "..." }` | `200 OK` or `404 Not Found` |
| **DELETE** | `/:id` | Delete a note by ID | None | `200 OK` or `404 Not Found` |

---

## 🛡️ Rate Limiting Details
- ThinkBoard uses **Upstash Redis** for globally distributed rate-limiting.
- **Default Limit**: 10 requests per 20 seconds.
- **Offline Alternative**: If you wish to run the project offline without Upstash, you can configure the local memory rate-limiter in [rateLimiter.js](file:///backend/src/middleware/rateLimiter.js) by switching the commented imports and middleware.

# 🎓 CampusHub - AI-Powered Campus Learning & Knowledge Platform

<p align="center">
  <img src="https://img.shields.io/badge/React-18.x-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-20.x-green?style=for-the-badge&logo=nodedotjs" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express-4.x-lightgrey?style=for-the-badge&logo=express" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-6.x-brightgreen?style=for-the-badge&logo=mongodb" alt="MongoDB" />
  <img src="https://img.shields.io/badge/ChromaDB-VectorDB-orange?style=for-the-badge" alt="ChromaDB" />
  <img src="https://img.shields.io/badge/LangChain-RAG-purple?style=for-the-badge" alt="LangChain" />
  <img src="https://img.shields.io/badge/Socket.io-4.x-black?style=for-the-badge&logo=socketdotio" alt="Socket.io" />
  <img src="https://img.shields.io/badge/JWT-Auth-red?style=for-the-badge&logo=jsonwebtokens" alt="JWT" />
</p>

---

## 📌 Executive Summary

**CampusHub** is a next-generation academic collaboration and intelligent study platform designed for modern higher-education institutions. Powered by **Retrieval-Augmented Generation (RAG)** and **Autonomous Agentic AI**, CampusHub bridges the gap between raw academic notes and student retention. It converts department courseware into structured vector embeddings, enables instant natural language doubt-solving with verified source citations, predicts exam topics, identifies individual weak areas, and facilitates seamless teacher-student bookings.

---

## 🌟 Key Differentiator: RAG & Agentic AI Engine

```
                                  [ PDF / PPT / DOCX Notes ]
                                             │
                                             ▼
                                [ Processing & Chunking Engine ]
                                             │
                                             ▼
                              [ Vector Embedding (ChromaDB) ]
                                             │
                                             ▼
  [ User Query ] ──► [ RAG Semantic Search ] ──► [ AI Doubt Solving + Citations ]
                            │                             │
                            ▼                             ▼
                 [ Confidence < 60%? ]            [ Weak Topic Detection ]
                            │                             │
                            ▼                             ▼
                 [ Teacher Rec. Agent ]         [ Study & Revision Planner ]
```

---

## 📑 Detailed Module Specification (MVP Scope)

Below is the definitive scope matrix outlining the core modules, retained features, and intentional MVP exclusions.

### 1. 👤 User & Authentication
* **Kept Features (MVP)**:
  - 🎓 **Student Login/Signup**: Multi-step onboarding capturing department, semester, skills & interests.
  - 👨‍🏫 **Teacher Login/Signup**: Verification workflow with subjects taught, office hours, and credentials.
  - 🛡️ **Admin Login**: Centralized management portal.
  - 🔑 **JWT Authentication**: Secure token-based access with refresh tokens and HTTP-only cookies.
  - 🔒 **Role-Based Access Control (RBAC)**: Enforced permissions across `STUDENT`, `TEACHER`, and `ADMIN`.
  - 🎨 **User Profile**: Semester tracking, academic metrics, skills, and interest tagging.

### 2. 🧠 AI Knowledge Base (RAG System) — *Core Flagship*
* **Kept Features (MVP)**:
  - 📤 **Document Upload**: Supports PDF, PPT, and DOCX files up to 50MB per upload.
  - ⚙️ **Automatic Document Processing**: PDF parsing, text extraction, semantic chunking, and text cleaning.
  - 🧬 **Embedding Generation**: Open-source / OpenAI embeddings stored in ChromaDB vector collection.
  - 🔍 **Semantic & Natural Language Search**: Vector similarity search powering instant doubt answers.
  - 💬 **RAG-based Doubt Solving**: Context-aware AI explanations backed by indexed notes.
  - 📌 **Source Citation**: Precise page/slide references with highlighted snippets.
  - 📊 **AI Confidence Score**: Real-time confidence index percentage returned for every answer.
  - 📜 **Chat History**: Session context retention for continuous study conversations.
* **Removed (Non-MVP)**:
  - ❌ *Duplicate Note Detection* (Post-MVP refinement).

### 3. 🤖 Agentic AI Suite
* **Kept Features (MVP)**:
  - 👨‍🏫 **Teacher Recommendation Agent**: Triggers automatically when RAG AI confidence falls below 60%, routing students to the best-suited faculty member.
  - 📉 **Weak Topic Detection Agent**: Analyzes repeated student queries, quiz errors, and low AI confidence scores to pinpoint concept gaps.
  - 💡 **Study Recommendation Agent**: Suggests targeted notes, quizzes, and teacher booking slots tailored to weak topics.
  - 📅 **AI Revision Planner**: Automatically generates daily study schedules and exam countdown timetables.
  - 🔮 **Exam Predictor Agent**: Predicts high-probability exam topics by scanning past year question patterns and note frequency.
  - 📊 **AI Learning Insights**: Synthesizes student study habits, active hours, and subject performance.
  - 🤖 ⭐⭐⭐⭐⭐ **AI Learning Companion**: A persistent personal AI mentor that retains long-term memory of weak areas, learning styles, and goals.
* **Removed (Non-MVP)**:
  - ❌ *AI Notes Quality Score*.

### 4. 📚 Academic Module
* **Kept Features (MVP)**:
  - 🗂️ **Subject Management**: Department and semester-level course categorization.
  - 📑 **Semester-wise Notes**: Clean document browser with metadata filters.
  - 🔍 **Department Filter**: Quick filtering by CS, ECE, ME, Civil, Business, etc.
  - 👁️ **Note Preview & Download**: Inline browser PDF preview and direct file downloads.
  - 🔖 **Bookmark Notes & Reading Progress**: Progress bar tracking percentage of document read.
* **Removed (Non-MVP)**:
  - ❌ *Popular Notes*
  - ❌ *Recent Notes*

### 5. 👨‍🏫 Teacher Module
* **Kept Features (MVP)**:
  - 📋 **Teacher Profile & Expertise**: Areas of specialization and academic bio.
  - 🕒 **Availability Slot Manager**: Weekly office hours grid.
  - 🗺️ **Subject Mapping**: Linking teachers to specific departmental subjects.
  - ⭐ **Teacher Rating & Reviews**: Student feedback ratings out of 5 stars.
  - 📜 **Teacher Recommendation History**: Record of AI agent student referrals.
* **Removed (Non-MVP)**:
  - ❌ *Teacher Analytics*.

### 6. 📝 AI Quiz Module
* **Kept Features (MVP)**:
  - ⚡ **Auto MCQ Generation**: Instant quiz generation from uploaded study notes via RAG chunking.
  - 🎴 **Flashcard Generator**: Quick memory cards for key terminology and formulas.
  - 🎯 **Topic-wise Quiz & Difficulty Levels**: Easy, Medium, Hard topic challenges.
  - 📈 **Quiz History & Score Tracking**: Performance history with accuracy breakdown.
  - 💡 **Instant Feedback & AI Explanations**: Immediate answer step-by-step reasoning.

### 7. 👥 Social Learning
* **Kept Features (MVP)**:
  - 📰 **Notes Feed**: Shared community note uploads feed.
  - 👍 **Upvote & Comment**: Community feedback and peer QA under notes.
  - 📤 **Share**: Public shareable link generation for study materials.
  - 🔍 **Search Users & Follow Teachers**: Find peers and faculty.
  - 👥 **Study Groups & Group Discussions**: Channel-based group study rooms.
* **Removed (Non-MVP)**:
  - ❌ *Follow Students*
  - ❌ *Bookmark Posts*
  - ❌ *Trending Notes*

### 8. 🤝 Collaboration & Mentorship
* **Kept Features (MVP)**:
  - 📅 **Teacher Session Booking**: Book 1-on-1 office hour sessions.
  - ✅ **Session Approval**: Teacher dashboard to accept/reschedule requests.
  - 📹 **Google Meet Integration**: Automated video conference link generation.
  - 📜 **Session History & Peer Learning Requests**: Log of completed mentorship sessions.
* **Removed (Non-MVP)**:
  - ❌ *Skill Exchange Board*.

### 9. 🏆 Gamification
* **Kept Features (MVP)**:
  - 🔥 **Study Streak**: Daily consecutive login and study tracking.
  - 🏅 **Achievement Badges**: Milestones for notes uploaded, quizzes aced, and hours studied.
  - 💯 **Points System**: Earn experience points for active learning.
  - ⚔️ **Weekly Challenges & Leaderboard**: Departmental leaderboard ranking top learners.
* **Removed (Non-MVP)**:
  - ❌ *Contribution Score*
  - ❌ *Progress Level*.

### 10. 📊 Learning Analytics
* **Kept Features (MVP)**:
  - 🖥️ **Learning Dashboard**: Central hub displaying study time, confidence trends, and score averages.
  - 🗓️ **Weekly Report**: Automated weekly learning summary.
  - 🗺️ **Weak Topic Heatmap**: Visual map of subjects needing focus.
  - ⏱️ **Study Time Analytics**: Time logged per subject and category.
* **Removed (Non-MVP)**:
  - ❌ *AI Usage Statistics*.

### 11. 🔔 Real-time Notifications
* **Kept Features (MVP)**:
  - 🔔 **Socket.io Push Notifications**: Alerts for Quiz Ready, Session Approval, Comments, and AI Teacher Recommendations.
* **Removed (Non-MVP)**:
  - ❌ *Badge Notification*.

### 12. 🛡️ Enterprise Security & Admin
* **Kept Features (MVP)**:
  - 🔑 **JWT & RBAC**: Granular permissions across all API endpoints.
  - 📁 **Secure Uploads**: Multer validation with file MIME type checks.
  - ⚙️ **Admin Dashboard**: User management, content moderation, report handling, audit logging, rate limiting (Express-Rate-Limit), input validation (Joi/Zod), and automated MongoDB backups.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | React.js 18 + Vite | High-performance single page application framework |
| **Styling & Icons** | Custom Design System (CSS3) + Lucide Icons | Glassmorphism UI design system with dark/light mode support |
| **State & Data Fetching** | React Hooks / TanStack Query | Client-side caching and state management |
| **Charts & Visuals** | Chart.js / Recharts | Weak topic heatmaps, study time trends, and quiz charts |
| **Backend Runtime** | Node.js + Express.js | Scalable asynchronous RESTful API & WebSocket server |
| **Database & ODM** | MongoDB + Mongoose | Document storage for users, notes, quizzes, and bookings |
| **Vector DB (RAG)** | ChromaDB / Pinecone | High-dimensional vector database for semantic notes search |
| **AI Framework** | LangChain.js + OpenAI / Gemini API | RAG pipeline orchestration, chunking, and agent logic |
| **File Handling** | Multer + PDF-Parse / Mammoth | Multipart file uploads and document text extraction |
| **Real-time Engine** | Socket.io | Instant notification dispatch and group chat updates |

---

## 📂 Project Architecture & Directory Layout

```
CampusHub/
├── index.html                 # Main HTML template (Inter font & metadata)
├── package.json               # Node.js dependencies & scripts
├── vite.config.js             # Vite bundler configuration
├── README.md                  # Project documentation
└── src/
    ├── main.jsx               # React application entrypoint
    ├── App.jsx                # Layout Shell (Header + Sidebar + Content)
    ├── index.css              # Custom CSS variable design system & animations
    └── components/
        ├── Sidebar.jsx        # Responsive collapsible navigation bar with RBAC badge
        ├── Header.jsx         # RAG Search bar, streak badge, notification drawer trigger
        └── Dashboard.jsx      # Main dashboard with Agentic AI, Weak Topics, & RAG widgets
```

---

## 🚀 Quickstart & Setup Guide

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **yarn**
- **MongoDB**: Local instance running on `localhost:27017` or MongoDB Atlas URI
- **ChromaDB**: Running locally via Docker or Python server (`chroma run --path ./chroma_data`)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/campushub.git
cd campushub
```

### 2. Frontend Setup & Run
```bash
# Install dependencies
npm install

# Start Vite Development Server
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Backend Setup (Reference Config)
Create a `.env` file in your backend root with the following keys:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/campushub
JWT_SECRET=your_super_secret_jwt_key_here
CHROMADB_URL=http://localhost:8000
OPENAI_API_KEY=sk-...
GEMINI_API_KEY=AIzaSy...
```

---

## 📸 Dashboard & Side Navigation Preview

- **Responsive Sidebar**: Categorized by *Main*, *AI Learning Tools*, *Academic & Social*, and *Analytics*, featuring user role tags (`Student - Sem 6 CS`).
- **Semantic RAG Search Bar**: Type natural questions directly in the header (e.g. *"Explain Quantum Tunneling from Physics Notes"*).
- **Agentic AI Overview**: Prompts low-confidence alerts (<60%), recommends relevant teachers, and generates customized revision timetables.

---

## 📜 License & Acknowledgments

Distributed under the **MIT License**. Created for modern institutions seeking to revolutionize student retention using RAG & Agentic AI.

Here’s a professional and comprehensive `README.md` for your **StreamSphere** OTT Video Platform, built on the **MERN stack**:

---

```markdown
# 🎬 StreamSphere – OTT Video Platform

StreamSphere is a full-stack Netflix-style OTT video streaming web application built using the MERN stack. It allows users to browse and watch videos, manage watchlists and history, while providing admins with full control over video content, user plans, and analytics.

---

## 🌐 Live Demo

🔗 [Coming Soon]  
🔐 Admin credentials and deployment URLs will be updated post-deployment.

---

## 🛠️ Tech Stack

- **Frontend:** React.js, JSX, CSS (modular files), Tailwind (optional), Web Speech API
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Authentication:** JWT (Role-based)
- **Video Upload:** Multer + GridFS / Cloudinary / AWS S3
- **Deployment:** Vercel (Frontend) | Render / Railway (Backend)

---

## 📦 Features

### 👤 User Side

- 🔐 Secure Login/Signup with JWT
- 🔎 Search Bar with Voice Recognition
- 🎞️ Infinite carousel scrolls for:
  - Genres
  - Languages
  - Top Air
  - Latest Releases
  - Anime
  - For Kids
  - Studios
- 📜 Watchlist & History Tracking
- 📱 Responsive UI for Mobile and Desktop
- 💳 Account Management:
  - View/Edit Plan
  - See Payment Due Dates
  - Update Personal Info

### 🛠️ Admin Side

- 🔐 Admin-only Dashboard
- 📤 Upload/Modify/Delete Video Cards
- 🗂️ Categorize Content (Genre, Language, Tags)
- ⭐ Add to Top Air, Anime, Kids, etc.
- 👥 User Management:
  - Create/Edit/Delete Users
  - View Subscription Plans & Payment Status
- 📈 Future scope: Analytics Dashboard

---

## 💰 Subscription Plans

| Plan        | Price      | Features                          |
|-------------|------------|-----------------------------------|
| Basic       | ₹99/month  | 1 screen, SD, no downloads        |
| Standard    | ₹249/month | 2 screens, HD, 5 downloads        |
| Premium     | ₹399/month | 4 screens, Full HD/4K, unlimited  |
| Student     | ₹59/month  | 1 screen, 720p, 2 downloads       |
| Annual Plan | ₹999/year  | Standard Plan with 2 months free  |

_Add-ons: Kids Mode ₹29/month | Anime Pass ₹49/month_

---

## 📁 Project Structure (MERN)

```

StreamSphere/
├── client/                # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── index.js
├── server/                # Express Backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   └── server.js
├── .env
├── package.json
└── README.md

````

---

## 🚀 Getting Started

### Prerequisites

- Node.js
- MongoDB Atlas Account
- Git

### Install & Run Locally

1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/streamsphere.git
   cd streamsphere
````

2. Setup client:

   ```bash
   cd client
   npm install
   npm start
   ```

3. Setup server:

   ```bash
   cd server
   npm install
   npm run dev
   ```

4. Create `.env` files in both `client/` and `server/` for sensitive config like JWT\_SECRET, DB\_URI, etc.

---

## 🧪 Features in Development

* Payment Gateway Integration (Razorpay/Stripe)
* AI-based Recommendations
* Real-time User Analytics
* Admin Notifications

---

## 📜 License

MIT License. Free to use, modify, and distribute with credits.

---

## 👨‍💻 Developed By

**Rayi Gireesh Kumar**
B.Tech (AI & ML) 2025
ISTE Student Coordinator | AI/ML Developer | MERN Stack Engineer

```

---

Would you like this `README.md` file exported as a downloadable file or directly added to your project folder structure now?
```

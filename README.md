# ImageManager Pro

A premium, full-stack Image Management system built with modern web technologies. Focuses on speed, security, and exceptional user experience with a polished UI and robust validation.

## 🚀 Key Features

### 🔐 Advanced Authentication
- **Secure Auth**: JWT-based authentication with Access & Refresh token rotation.
- **Social Login**: Seamless Google Authentication integration.
- **OTP Verification**: Email-based OTP for registration and password recovery.
- **Password Recovery**: Complete forgot/reset password flow with strict validation.

### 🖼️ Image Management Dashboard
- **Bulk Upload**: Upload multiple images simultaneously with real-time preview.
- **Optimized Storage**: Cloudinary integration for lightning-fast image delivery and processing.
- **Drag & Drop Reordering**: Intuitive `@dnd-kit` powered reordering that persists in the database.
- **Interactive Editing**: Modify titles and replace image files with "No-Changes" detection.
- **Secure Deletion**: Double-confirmation logic to prevent accidental data loss.

### 🛡️ Robust Architecture
- **Strict Validation**: Comprehensive client-side validation for all forms (Auth, Upload, Edit).
- **Clean Code**: Zero comment policy for production readiness.
- **Type Safe**: End-to-end TypeScript implementation (Client & Server).
- **DI Engine**: Modular backend architecture using `tsyringe` for Dependency Injection.

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: Radix UI, Lucide Icons
- **State Management**: Redux Toolkit
- **Notifications**: Sonner

### Backend
- **Runtime**: [Node.js](https://nodejs.org/) & [Express](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (Mongoose)
- **Caching/OTP**: [Redis](https://redis.io/)
- **Storage**: [Cloudinary](https://cloudinary.com/)
- **DI**: [tsyringe](https://github.com/microsoft/tsyringe)
- **Mailing**: Nodemailer

## ⚙️ Setup Instructions

### 1. Prerequisites
- Node.js (v18+)
- MongoDB & Redis installed/running
- Cloudinary Account & API credentials
- Google OAuth Client ID

### 2. Database & Environment
Configure `.env` files for both `client` and `server` based on their respective requirements (DB connection strings, API keys, etc.).

### 3. Installation
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 4. Running the Project
```bash
# Start backend (from server directory)
npm run dev

# Start frontend (from client directory)
npm run dev
```

---
Built with ❤️ for a premium user experience.

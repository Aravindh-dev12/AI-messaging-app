# WhatsApp-Style AI Messaging App

## Overview
This project is a **full-stack messaging application** inspired by WhatsApp, integrated with AI capabilities. Users can chat in real-time, manage contacts, and use AI-based replies powered by OpenAI.  

**Goal:** Showcase the ability to architect and implement an optimized end-to-end system using MERN stack with **PostgreSQL** as the database.

**Tech Stack:**  
- **Frontend:** React + TypeScript + Tailwind CSS  
- **Backend:** Node.js + Express.js  
- **Database:** PostgreSQL  
- **AI Integration:** OpenAI API  

---

## Project Structure

```

## Backend Setup

### 1. Environment Variables
Create a `.env` file in `backend/`:
cd backend
npm install

## env
PORT=5001
DATABASE_URL=postgres://username:password@localhost:5432/chatapp
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key

---

## Frontend Setup
### 1. Environment Variables

Create a .env file in frontend/:

VITE_API_URL=http://localhost:5001/api

### 2. Install Dependencies

cd frontend
npm install

### 3. Run Frontend

Development mode:

npm run dev


Production build:

npm run build
npm run preview

# LumiCore Data Cleaning App — Frontend

This is the frontend for the LumiCore Data Cleaning Challenge.
It is built using Next.js and connects to a Django backend that handles unreliable and messy external data.

The frontend never talks directly to the LumiCore API. All requests go through the backend.

---

## Tech Stack

- Next.js 16 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- TanStack React Query
- Axios

---

## Architecture

Browser (Next.js)
        ↓
Django Backend (Proxy + Data Cleaner)
        ↓
LumiCore Unreliable API

The frontend only receives clean, normalized data from Django.

---

## Local Setup

1. Install dependencies

npm install

2. Create environment file

Create a file named .env.local in the root of the frontend project.

Add:

NEXT_PUBLIC_API_BASE_URL=http://localhost:8000

This should point to your Django backend.

3. Run the app

npm run dev

The app will run at:

http://localhost:3000

---

## Production (Vercel)

In Vercel → Environment Variables, set:

NEXT_PUBLIC_API_BASE_URL=https://<your-django-backend>.railway.app

Then deploy.

---

## What this frontend does

- Fetches cleaned data from Django
- Displays normalized records
- Allows users to submit cleaned results
- Shows loading and error states

The frontend never deals with broken or inconsistent data.

---

## Purpose

The LumiCore API is intentionally unreliable.
We isolate it behind a backend so the UI always stays stable.




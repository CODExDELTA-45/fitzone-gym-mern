# FitZone – MERN Stack Gym Website with Email Functionality

A full-stack gym website built with **MongoDB, Express.js, React.js, Node.js**, featuring JWT
authentication, membership plans, trainer booking, a contact form, and automated **email
notifications** (welcome email, booking confirmation, contact auto-reply) via Nodemailer.

## Tech Stack

- **Frontend:** React (Vite), React Router, Tailwind CSS, Axios, Context API
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Auth:** JWT + bcrypt password hashing
- **Email:** Nodemailer (Gmail SMTP)

## Features

- User registration & login (JWT-based auth)
- Welcome email sent automatically on signup
- Browse membership plans (Basic / Premium / Elite)
- Browse trainers and book a training session
- Booking confirmation email sent automatically
- Contact form → saves message to DB + emails the gym owner + auto-replies the user
- Protected dashboard route (only logged-in users can view their bookings)
- Admin-only routes to add/remove plans and trainers
- Seed script to populate sample plans, trainers, and an admin account

## Folder Structure

```
gym-website/
├── backend/
│   ├── config/db.js
│   ├── controllers/        # business logic
│   ├── middleware/auth.js  # JWT protect + adminOnly
│   ├── models/             # Mongoose schemas
│   ├── routes/
│   ├── utils/sendEmail.js  # Nodemailer helper
│   ├── seed.js             # sample data
│   └── server.js
└── frontend/
    └── src/
        ├── api/axios.js
        ├── context/AuthContext.jsx
        ├── components/
        └── pages/
```

## Images

The UI uses free stock photos from Unsplash (hero background, trainer photos, login/register
side panels, contact banner) loaded directly via URL — no local image files needed, but an
internet connection is required for them to load. Trainer photos are set in `backend/seed.js`
(`image` field) and rendered from `trainer.image` in `Trainers.jsx`. Swap any URL for your own
photos any time — for trainers, just update the `image` field per trainer (in `seed.js` or via
the admin API) with your own hosted image URL.

## Setup Instructions

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:
- `MONGO_URI` – your MongoDB connection string (local or MongoDB Atlas)
- `JWT_SECRET` – any long random string
- `EMAIL_USER` / `EMAIL_PASS` – a Gmail address + a **Google App Password**
  (Google Account → Security → App Passwords; requires 2-Step Verification enabled)

```bash
node seed.js     # adds sample plans, trainers, and an admin user
npm run dev      # starts server on http://localhost:5000
```

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env   # VITE_API_URL=http://localhost:5000/api
npm run dev             # starts app on http://localhost:5173
```

### 3. Try it out

1. Register a new account → check your inbox for the welcome email.
2. Go to **Plans** / **Trainers** (run `node seed.js` first if lists are empty).
3. Log in, go to **Dashboard**, book a trainer session (you can wire up a booking
   button on the Trainers page — the API endpoint `POST /api/bookings` is ready).
4. Submit the **Contact** form → you'll get an auto-reply email, and the gym's
   inbox (`EMAIL_USER`) gets notified too.

Default seeded admin login: `admin@fitzone.com` / `admin123`

## API Overview

| Method | Route                | Access        | Description                     |
|--------|-----------------------|---------------|----------------------------------|
| POST   | /api/auth/register     | Public        | Register + welcome email        |
| POST   | /api/auth/login        | Public        | Login, returns JWT               |
| GET    | /api/auth/me            | Protected     | Get logged-in user               |
| GET    | /api/plans              | Public        | List membership plans            |
| POST   | /api/plans              | Admin         | Create a plan                    |
| GET    | /api/trainers           | Public        | List trainers                    |
| POST   | /api/bookings           | Protected     | Book a session + confirmation email |
| GET    | /api/bookings/my        | Protected     | Get my bookings                  |
| POST   | /api/contact            | Public        | Send message + auto-reply email  |

## For Your Resume / Interview

**Resume bullet example:**
> Built a full-stack gym management website (MERN) with JWT authentication, role-based
> access control, and automated transactional emails (Nodemailer) for onboarding, booking
> confirmations, and customer support — reducing manual admin follow-up.

**Be ready to explain:**
- How JWT auth works (token generation, `protect` middleware verifying it on each request)
- Why passwords are hashed with bcrypt before saving
- How Nodemailer sends email asynchronously without blocking the API response
- How React Context (`AuthContext`) manages global auth state and persists it in `localStorage`
- How Axios interceptors automatically attach the JWT to every request
- The separation of concerns: routes → controllers → models (MVC-style backend)

## Possible Extensions (great "future work" talking points)

- Payment gateway integration (Razorpay/Stripe) for plan purchases
- Password reset via email (forgot-password flow)
- Admin dashboard UI (currently only API routes exist)
- Image uploads for trainers (Multer + Cloudinary)
- Deploy backend on Render/Railway and frontend on Vercel/Netlify

# Quiz Hosting Platform

A fullstack quiz application where users can enroll in NPTEL-style courses, attempt weekly quizzes, and track their performance over time. Built with a sleek dark-themed UI and modern tech stack to offer a seamless learning and testing experience.

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Vercel](https://img.shields.io/badge/Frontend-Vercel-black)](https://vercel.com)
[![Render](https://img.shields.io/badge/Backend-Render-blue)](https://render.com)
[![React](https://img.shields.io/badge/Frontend-React-blue)](https://reactjs.org)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-yellowgreen)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)](https://mongodb.com)

---

## Live Demo

- Frontend: [https://quiz-project-frontend-ankur-kshitij-sahais-projects.vercel.app](https://quiz-project-frontend-ankur-kshitij-sahais-projects.vercel.app)
- Backend API: [https://quiz-project-backend-zf3w.onrender.com](https://quiz-project-backend-zf3w.onrender.com)

---

## Features

### For Users
- Course enrollment with a personalized dashboard
- Weekly quiz access (Week 1 to Week 12)
- Quiz history tracking: view scores by course and week
- Secure login/signup with JWT and session persistence via Redux
- Clean, responsive UI with a consistent dark mode experience

### For Admins
- Add new NPTEL-style courses
- Define weekly modules per course
- Upload multiple-choice questions per week and course

---

## Tech Stack

**Frontend**
- React + Vite
- Tailwind CSS + ShadCN UI
- Redux Toolkit
- Axios

**Backend**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT for authentication
- bcrypt for password hashing
- dotenv, CORS, cookie-parser

---

## Key Functionalities

- Role-based access (User and Admin)
- Course-wise and week-wise quiz tracking
- Score history and analytics per user
- Secure and protected API routes using JWT
- Form validation and real-time error handling
- Toast notifications and edge-case error management
- Dark-theme UI for modern usability

---

## Testing and Validation

- All major API routes tested using Postman
- End-to-end manual flow:
  - User: Register → Login → Enroll → Attempt Quiz → View Results
  - Admin: Login → Add Course → Add Weeks → Add Questions
- Error states tested for invalid routes, auth issues, and data validation

---

## Deployment

### Frontend
Hosted on Vercel  
URL: [https://quiz-project-frontend-ankur-kshitij-sahais-projects.vercel.app](https://quiz-project-frontend-ankur-kshitij-sahais-projects.vercel.app)

### Backend
Hosted on Render  
URL: [https://quiz-project-backend-zf3w.onrender.com](https://quiz-project-backend-zf3w.onrender.com)

---

## Folder Structure

```
quiz-hosting-platform/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── App.jsx
└── README.md
```

---

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

---

## Notes

- Admin access is protected and should only be granted to authorized users
- All quiz content is stored securely in MongoDB
- Only quiz metadata (not answers) is visible to users

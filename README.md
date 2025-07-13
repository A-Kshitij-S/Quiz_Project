# Quiz Hosting Platform

A fullstack quiz application where users can enroll in courses, attempt weekly quizzes, and track their performance over time. Built with a sleek dark-themed UI for an engaging and modern experience custom made for practicing NPTEL based quizzes.

---

## Features

### For Users
- Course enrollment with personalized dashboard
- Weekly quiz access (Week 1 to Week 12 or 8) per enrolled course
- Quiz history tracking: view scores by course and week
- Secure authentication with session persistence using Redux Toolkit and JWT
- Responsive and accessible UI with dynamic rendering

### For Admins (if applicable)
- Upload quizzes for specific courses and weeks
- View participation statistics and user performance
- Admin dashboard to manage quizzes and monitor platform usage

---

## Tech Stack

**Frontend:**  
React, Vite, Tailwind CSS, ShadCN UI, Redux Toolkit, Axios

**Backend:**  
Node.js, Express.js

**Database:**  
MongoDB, Mongoose

**Authentication and Security:**  
JWT, bcrypt, Protected Routes, CORS, dotenv

---

## Key Functionalities

- Role-based access control (User / Admin)
- Course-wise and week-wise quiz attempt tracking
- Score persistence and result analytics per user
- Protected API endpoints with token verification
- Form validation and user-friendly error handling
- Consistent dark-theme UI for better experience

## Testing and Validation

- API testing with Postman
- Manual testing of quiz flows (enroll → attempt → view result)


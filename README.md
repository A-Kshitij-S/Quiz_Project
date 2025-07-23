# Quiz Hosting Platform

A fullstack quiz application where users can enroll in NPTEL-style courses, attempt weekly quizzes, and track their performance over time. Built with a sleek dark-themed UI and modern tech stack to offer a seamless learning and testing experience.

<img width="1306" height="676" alt="image" src="https://github.com/user-attachments/assets/c4c4117b-e4cc-4842-b1da-6bdd30d3d813" />

---

## Live Demo

- Frontend: [[https://quiz-project-frontend-ankur-kshitij-sahais-projects.vercel.app/]](https://quiz-project-frontend-ankur-kshitij-sahais-projects.vercel.app/)
- Backend API: [[https://quiz-project-backend.onrender.com](https://quiz-project-backend.onrender.com)](https://quiz-project-backend-zf3w.onrender.com)
---

## Features

### For Users
- Course enrollment with a personalized dashboard
- Weekly quiz access
- Quiz history tracking: view scores by course and week
- Secure login/signup with JWT and session persistence using Redux
- Clean, responsive UI with dark mode experience

### For Admins
- Course creation: Add new NPTEL-based courses
- Week creation: Define weekly modules per course
- Question upload: Add multiple-choice questions per week and course

---

## Testing and Validation

- Tested using Postman for all major API routes
- Manual flow testing:
  - Register → Enroll → Attempt quiz → View results
- Backend response validation and error handling tested with real users

---

## Tech Stack

### Frontend
- React with Vite
- Tailwind CSS with ShadCN UI
- Redux Toolkit for state management
- Axios for HTTP requests

### Backend
- Node.js and Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for secure password hashing
- dotenv, CORS, and cookie-parser for configuration and security

---

## Key Functionalities

- Role-based access (User and Admin)
- Course-wise and week-wise quiz tracking
- Score history and analytics per user
- Protected API routes with token verification
- Form validation and error handling
- Dark-theme UI for a consistent user experience

---
## Deployment

### Frontend
Hosted on Vercel  
URL: [([https://quiz-project-frontend-ankur-kshitij-sahais-projects.vercel.app/](https://quiz-project-frontend-ankur-kshitij-sahais-projects.vercel.app/))]

### Backend
Hosted on Render  
URL: [([https://quiz-project-frontend-ankur-kshitij-sahais-projects.vercel.app/](https://quiz-project-backend-zf3w.onrender.com))]


CoursePilot is a complete full-stack MERN application. It is a SaaS-style MVP where Admins can manage a catalog of courses, and Students can sign up, browse, and enroll. This project features a secure, role-based REST API and a fully interactive React frontend.

🛠️ Tech Stack
```
Area            Technology

Frontend        React, React Router, TailwindCSS, Axios, React Context

Backend         Node.js, Express.js

Database        MongoDB (with Mongoose)

Auth            JWT (JSON Web Tokens), bcryptjs
```
✨ Core Features

Student:-

1.Browse and view all available courses.

2.Sign up and log in with a secure JWT flow.

3.View individual course details.

4.Enroll in courses (with a mock payment flow).

5.View all enrolled courses in a personal, protected dashboard.

Admin:-

1.Full role-based protection on all admin routes.

2.View a statistics dashboard with Total Revenue and Total Enrollments.

3.See a detailed table of all transactions.

4.Full CRUD: A complete "Course Management" panel to Create, Read, Update, and Delete any course in the database.

🚀 Running Locally

1. Prerequisites

Node.js (v18+)

MongoDB Atlas Account (or a local MongoDB instance)

2. Backend Setup
```
# 1. Navigate to the server folder
cd server

# 2. Install dependencies
npm install

# 3. Create a .env file and add your variables
#    MONGO_URI=your_mongodb_connection_string
#    JWT_SECRET=your_super_secret_key
#    PORT=5000

# 4. Run the backend
npm run dev
```

3. Frontend Setup
```
# 1. (In a new terminal) Navigate to the client folder
cd client

# 2. Install dependencies
npm install

# 3. Run the frontend
npm run dev
```

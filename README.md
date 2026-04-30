🎓 Grade Tracker (MERN Stack)

A full-stack Grade Tracker Web Application built using the MERN stack (MongoDB, Express, React, Node.js). This app helps students manage, track, and analyze their academic performance efficiently.

🔗 Live Demo: https://grade-tracker-three.vercel.app

🚀 Features
🔐 User Authentication (Login / Register)
📊 Add, Update, and Delete Grades
📈 GPA / Performance Tracking
📚 Subject-wise grade management
🎯 Clean and responsive UI
⚡ Fast frontend deployed on Vercel
🌐 REST API backend


🛠️ Tech Stack
Frontend:
React.js
Axios
CSS / Tailwind (if used)
Backend:
Node.js
Express.js
Database:
MongoDB (MongoDB Atlas)
Deployment:
Frontend: Vercel
Backend: (Render / Localhost depending on your setup)

📂 Project Structure
GradeTracker/
│
├── client/          # React frontend
├── server/          # Node + Express backend
├── models/          # MongoDB schemas
├── routes/          # API routes
├── controllers/     # Business logic
├── config/          # DB connection
└── README.md
⚙️ Installation & Setup

1️⃣ Clone the Repository
git clone https://github.com/Amar2802/GradeTracker.git
cd GradeTracker

2️⃣ Setup Backend
cd server
npm install

Create a .env file in the server folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Run backend:
npm start

3️⃣ Setup Frontend
cd client
npm install
npm start

🔐 Environment Variables

Make sure to configure:

MONGO_URI → MongoDB Atlas connection string
JWT_SECRET → Secret key for authentication
PORT → Backend port

📸 Screenshots 
<img width="1337" height="630" alt="Screenshot 2026-04-30 102252" src="https://github.com/user-attachments/assets/147b95fc-4ca4-44de-8b12-9d6f41280a47" />
<img width="1343" height="629" alt="Screenshot 2026-04-30 102341" src="https://github.com/user-attachments/assets/c00cfa4b-0554-4709-ba68-38f5530eb20f" />


🧠 Future Improvements-
📅 Semester-wise tracking
📊 Graphical analytics (charts)
📱 Mobile responsiveness improvements
🌍 Multi-user collaboration
☁️ Full backend deployment
🤝 Contributing

Contributions are welcome!

Fork the repository
Create your feature branch
Commit your changes
Push to the branch
Open a Pull Request

👨‍💻 Author

Amarnath Yadav
GitHub: https://github.com/Amar2802

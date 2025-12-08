# Mental Health Support Platform 🧠💙

### Development of a Digital Mental Health and Psychological Support System for Students in Higher Education

A modern, professional MERN stack application providing students with comprehensive mental health support through mood tracking, resource access, and counselor support.

---

## ✨ **Recent Updates (December 2025)**

### 🎨 **Complete UI/UX Modernization**

- ✅ Professional gradient design system with modern color palette
- ✅ Emoji-based mood tracking for better emotional expression
- ✅ Smooth animations and micro-interactions throughout
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Glassmorphism effects and 3D card designs
- ✅ Enhanced accessibility with WCAG compliance
- ✅ Print-friendly styles for reports

**See [UI_MODERNIZATION_SUMMARY.md](./UI_MODERNIZATION_SUMMARY.md) for detailed changes.**

### 🤖 **NEW: AI Chat Support**

- ✅ 24/7 instant mental health support powered by Google Gemini
- ✅ Intelligent conversation with context awareness
- ✅ Restricted to mental health topics only
- ✅ Crisis detection and resource provision
- ✅ Mobile-responsive chat interface

**See [AI_CHAT_QUICKSTART.md](./AI_CHAT_QUICKSTART.md) for setup guide.**
**See [AI_CHAT_DOCUMENTATION.md](./AI_CHAT_DOCUMENTATION.md) for full documentation.**

---

## 🚀 Features

### For Students:

- 🔐 **Secure Authentication** - User registration and JWT-based login
- 😊 **Emoji Mood Tracking** - Express feelings with 5 expressive emoji levels
- 📊 **Mood History** - View and analyze your emotional patterns
- 📚 **Resource Library** - Access curated mental health resources
- 💬 **Support Requests** - Connect with counselors confidentially
- 🤖 **AI Chat Support** - Get instant mental health support from AI assistant (powered by Google Gemini)
- 📱 **Responsive Dashboard** - Works beautifully on all devices
- 🎨 **Modern UI** - Calming colors and smooth interactions

### For Counselors:

- 👥 **Counselor Dashboard** - Manage all support requests efficiently
- 📋 **Resource Management** - Create, update, and organize resources
- 🔔 **Request Tracking** - Monitor and respond to student needs
- 📈 **User Management** - Oversee platform usage and engagement

---

## 🎯 **Future Features** (See [FEATURE_SUGGESTIONS.md](./FEATURE_SUGGESTIONS.md))

**High Priority:**

- ✅ Advanced mood analytics with charts (IMPLEMENTED)
- ✅ AI-powered chatbot for 24/7 support (IMPLEMENTED - See [AI_CHAT_QUICKSTART.md](./AI_CHAT_QUICKSTART.md))
- Professional counselor scheduling
- Privacy enhancements and encryption

**Coming Soon:**

- Peer support community forums
- Gamification with achievements
- Self-care tools and meditation guides
- Mobile app (PWA)

---

## 🛠️ Tech Stack

### Frontend

- **React** 19.2.0 - Modern UI library
- **React Router** 7.9.6 - Client-side routing
- **Context API** - State management
- **Axios** - HTTP client
- **Vite** - Fast build tool
- **CSS3** - Modern styling with animations

### Backend

- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Google Gemini AI** - AI-powered chat support
- **Mongoose** - ODM for MongoDB
- **JWT** - Secure authentication
- **bcrypt** - Password hashing

---

## 📦 Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn
- Git

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory:

   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/mentalhealth
   JWT_SECRET=your_super_secret_jwt_key_here_change_this
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

   **To get a Gemini API key:**

   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account
   - Click "Get API Key" and create a new API key
   - Copy the key and paste it in your `.env` file

4. (Optional) Seed the database with sample data:

   ```bash
   node seed.js
   ```

5. Start the backend server:
   ```bash
   npm start
   ```
   Server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   Application will run on `http://localhost:5173`

4. Open your browser and visit `http://localhost:5173`

---

## 👤 **Default Users (After Seeding)**

### Student Account

- **Email:** `student@example.com`
- **Password:** `password123`
- Access to mood tracking, resources, and support requests

### Counselor Account

- **Email:** `counselor@example.com`
- **Password:** `counselor123`
- Access to counselor dashboard and resource management

---

## 📁 Project Structure

```
Node_React_Try/
├── backend/
│   ├── config/          # Database configuration
│   ├── middleware/      # Authentication middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── server.js        # Express server setup
│   └── seed.js          # Database seeding script
│
├── frontend/
│   ├── public/          # Static assets
│   ├── src/
│   │   ├── api/         # Axios client configuration
│   │   ├── assets/      # Images and icons
│   │   ├── components/  # Reusable React components
│   │   │   ├── CrisisBanner.jsx
│   │   │   ├── MoodForm.jsx      # 😊 Emoji mood selector
│   │   │   ├── MoodList.jsx      # Enhanced mood display
│   │   │   ├── Navbar.jsx
│   │   │   └── ...
│   │   ├── context/     # React Context providers
│   │   ├── pages/       # Page components
│   │   │   ├── LandingPage.jsx   # 🎨 Modernized hero
│   │   │   ├── DashboardPage.jsx # Enhanced dashboard
│   │   │   ├── MoodPage.jsx
│   │   │   └── ...
│   │   ├── App.jsx      # Main app component
│   │   ├── App.css      # 🎨 1800+ lines of modern styles
│   │   ├── index.css    # Global styles
│   │   └── main.jsx     # Entry point
│   └── package.json
│
├── FEATURE_SUGGESTIONS.md      # 📋 Comprehensive feature roadmap
├── UI_MODERNIZATION_SUMMARY.md # 📝 Detailed UI changes
└── README.md                   # This file
```

---

## 🎨 **Design System**

### Color Palette

- **Primary:** Blue shades (#2196f3) - Trust and calm
- **Secondary:** Purple shades (#9c27b0) - Creativity and support
- **Accent:** Teal (#00bcd4) - Energy and positivity
- **Success:** Green (#4caf50)
- **Warning:** Orange (#ffc107)
- **Danger:** Red (#ef5350)

### Typography

- **Headers:** Poppins (600-700 weight)
- **Body:** Inter (400-600 weight)
- **Responsive scaling with clamp()**

### Spacing

- System scale: xs, sm, md, lg, xl, 2xl, 3xl
- Consistent spacing throughout

---

## 🌐 **API Endpoints**

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Mood Tracking

- `GET /api/mood` - Get all mood entries (authenticated)
- `POST /api/mood` - Create mood entry
- `DELETE /api/mood/:id` - Delete mood entry

### Resources

- `GET /api/resources` - Get all resources
- `POST /api/resources` - Create resource (counselor)
- `PUT /api/resources/:id` - Update resource (counselor)
- `DELETE /api/resources/:id` - Delete resource (counselor)

### Support Requests

- `GET /api/support/my` - Get user's requests
- `GET /api/support` - Get all requests (counselor)
- `POST /api/support` - Create support request
- `PUT /api/support/:id` - Update request status (counselor)

### AI Chat

- `POST /api/ai-chat` - Send message to AI assistant (authenticated)
  - Request body: `{ message: string, conversationHistory: array }`
  - Response: `{ reply: string, timestamp: string }`
  - Restricted to mental health topics only

---

## 🚀 **Deployment**

### Backend (Railway/Heroku)

1. Create new project
2. Set environment variables
3. Connect MongoDB Atlas
4. Deploy from GitHub

### Frontend (Vercel/Netlify)

1. Import from GitHub
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy automatically

---

## 🧪 **Testing**

```bash
# Backend tests (if implemented)
cd backend
npm test

# Frontend tests (if implemented)
cd frontend
npm test
```

---

## 📊 **Screenshots**

### Landing Page

![Landing Page](./screenshots/landing.png)
_Modern hero section with gradient backgrounds and animations_

### Mood Tracker

![Mood Tracker](./screenshots/mood-tracker.png)
_Emoji-based mood selection with smooth interactions_

### Dashboard

![Dashboard](./screenshots/dashboard.png)
_Clean, organized dashboard with gradient cards_

---

## 🤝 **Contributing**

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 **License**

This project is for educational purposes as part of the "Development of a Digital Mental Health and Psychological Support System for Students in Higher Education" project.

---

## 📞 **Support & Resources**

### Crisis Resources

- **National Suicide Prevention Lifeline:** 988
- **Crisis Text Line:** Text "HELLO" to 741741
- **International Association for Suicide Prevention:** [www.iasp.info](https://www.iasp.info)

### Development Support

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Manual](https://docs.mongodb.com)
- [Mental Health Web Guidelines](https://www.who.int/mental_health)

---

## 👏 **Acknowledgments**

- Mental health professionals for guidance
- Open source community for tools and libraries
- Students who will benefit from this platform

---

## 📈 **Roadmap**

- [x] Core functionality (auth, mood tracking, resources)
- [x] UI/UX modernization
- [x] Emoji-based mood system
- [x] Responsive design
- [ ] Advanced analytics dashboard
- [ ] AI chatbot integration
- [ ] Video counseling feature
- [ ] Mobile app (React Native)
- [ ] Community forums
- [ ] Gamification system

See [FEATURE_SUGGESTIONS.md](./FEATURE_SUGGESTIONS.md) for complete roadmap.

---

## 📧 **Contact**

For questions or feedback about this project:

- Create an issue on GitHub
- Check the documentation
- Review feature suggestions

---

**Built with ❤️ for student mental health and wellbeing**

_Last Updated: December 2025_

```bash
npm install
```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser to `http://localhost:3000`

## Default Users (after seeding)

- **Counselor**: counselor@example.com / counselor123
- **Student**: student@example.com / student123

## Project Structure

```
mental-health-support/
├── backend/
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── seed.js
└── frontend/
    ├── src/
    │   ├── api/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   ├── App.jsx
    │   └── main.jsx
    └── vite.config.js
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new student
- `POST /api/auth/login` - Login for students and counselors
- `GET /api/auth/me` - Get current user profile

### Mood Tracking

- `POST /api/mood` - Create a new mood entry
- `GET /api/mood` - Get user's mood history

### Resources

- `GET /api/resources` - Get all resources (with optional search)
- `POST /api/resources` - Create a new resource (counselor only)
- `PUT /api/resources/:id` - Update a resource (counselor only)
- `DELETE /api/resources/:id` - Delete a resource (counselor only)

### Support Requests

- `POST /api/support` - Create a new support request
- `GET /api/support/my` - Get current user's support requests
- `GET /api/support` - Get all support requests (counselor only)
- `PUT /api/support/:id` - Update a support request (counselor only)

## Disclaimer

This platform does not replace professional medical or emergency services. In an emergency, contact your local emergency number or campus helpline.

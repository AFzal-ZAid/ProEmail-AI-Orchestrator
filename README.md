<h1> ProEmail AI Orchestrator </h1>

AI-powered email generation platform built with a full-stack architecture using React and Spring Boot.

Privacy & Smart Automation for Emails

Generate professional emails with AI while maintaining control over customization, tone, and structure.


About

This application enables users to generate AI-based email content using an intuitive interface. It integrates a React frontend with a Spring Boot backend and leverages Gemini API for intelligent content generation.

The system ensures:

* Clean separation of frontend and backend
* Secure API communication
* Scalable and modular architecture

Users can customize email tone, format, and purpose dynamically.

---

Key Features

* AI-powered email generation using Gemini API
* Customizable tone (formal, casual, professional)
* Real-time content generation with responsive UI
* REST API-based communication between frontend and backend
* Error handling and rate-limit management
* Clean and modern UI using Material UI

---

## 🛠️ Tech Stack

* Frontend: React.js, Material UI, Axios
* Backend: Spring Boot, Java
* AI Integration: Gemini API
* Tools: Git, Maven, Postman

📂 Directory Structure


weather-dashboard/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── WeatherCard.jsx
│   │   │   ├── ForecastCard.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── FavoritesBar.jsx
│   │   │   └── ThemeToggle.jsx
│   │   ├── pages/
│   │   │   └── Dashboard.jsx
│   │   ├── hooks/
│   │   │   ├── useWeather.js
│   │   │   └── useTheme.js
│   │   ├── utils/
│   │   │   ├── api.js
│   │   │   └── weatherHelpers.js
│   │   ├── styles/
│   │   │   └── theme.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   ├── .env.example
│   └── README.md
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── weatherRoutes.js
│   │   │   └── favoritesRoutes.js
│   │   ├── controllers/
│   │   │   ├── weatherController.js
│   │   │   └── favoritesController.js
│   │   ├── middleware/
│   │   │   ├── errorHandler.js
│   │   │   └── validation.js
│   │   ├── services/
│   │   │   ├── weatherService.js
│   │   │   └── cacheService.js
│   │   ├── utils/
│   │   │   └── logger.js
│   │   └── app.js
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   ├── .gitignore
│   └── README.md
│
├── docker-compose.yml
├── .gitignore
├── ARCHITECTURE.md
└── README.md


Data Flow Diagram

┌─────────────────────────────────────────────────────┐
│          FRONTEND (React + Vite + MUI)              │
│                                                     │
│  [Input Email] → [Select Tone] → [Generate Reply]  │
│         ↓              ↓              ↓             │
│     [emailContent] [tone] ────────→ Axios POST      │
│                                       ↓             │
└─────────────────────────────────────────────────────┘
                        ↓
            http://localhost:8080
                        ↓
┌─────────────────────────────────────────────────────┐
│     BACKEND (Spring Boot + Java 17)                 │

│                                                     │
│  POST /api/email/generate                          │

│        ↓                                            │
│  EmailGeneratorController                          │

│        ↓                                            │
│  EmailGeneratorService                             │
│        ├─ buildPrompt()                            │
│        │  └─ "Generate reply in {tone} tone for..." │
│        │                                            │
│        └─ WebClient.post()                         │
│           └─ Call Gemini API                       │
│              (+ API Key from ENV)                  │
│                    ↓                               │
└─────────────────────────────────────────────────────┘
                        ↓
        ┌───────────────────────────┐
        │   Gemini API (Google)     │
        │  (AI Text Generation)     │
        └───────────────────────────┘
                        ↓
         Generate professional email reply
         (respecting tone preference)
                        ↓
        ┌───────────────────────────┐
        │  JSON Response Parsing     │
        │  (Extract text content)   │
        └───────────────────────────┘
                        ↓
        ┌───────────────────────────┐
        │  Return to Frontend       │
        │  (ResponseEntity<String>) │
        └───────────────────────────┘
                        ↓
        ┌──────────────────────────────────────┐
        │  Display Result + Copy Option        │
        │  Skeleton loading during process     │
        │  Error handling on failure           │
        └──────────────────────────────────────┘



🔗 API Flow

Frontend (Axios)
    ↓
POST /api/email/generate
    ↓
EmailGeneratorController
    ↓
EmailGeneratorService.generateEmailReply()
    ↓
Build Prompt + Format Request
    ↓
WebClient.post() → Gemini API
    ↓
Extract JSON Response
    ↓
Return Generated Email Text
    ↓
Frontend Display & Copy

---

Future Improvements

* User authentication and session management
* Email history and templates
* Cloud deployment (AWS / Vercel / Render)
* Multi-language support

---

Contribute through Code

If you want to contribute:

* Fork the repository
* Create a feature branch
* Implement your feature
* Test thoroughly
* Raise a Pull Request


Contributions will be reviewed and merged after validation.

Author : AFzal Zaid

<img width="1365" height="601" alt="Homepage" src="https://github.com/user-attachments/assets/ef7148a7-d750-4b9a-ac93-fd9f103ea8d7" /> <br>
<img width="1365" height="368" alt="Screenshot 2026-04-20 122904" src="https://github.com/user-attachments/assets/26b3b852-a661-49bb-a8d2-379de9c4e267" /><br>
<img width="600" height="519" alt="result" src="https://github.com/user-attachments/assets/a54517f0-0e76-4c56-a194-bea90f26702b" /><br>
<img width="1365" height="598" alt="log in" src="https://github.com/user-attachments/assets/3271cd48-d4cc-4990-bd96-ab549965c346" /><br>
<img width="1365" height="593" alt="pricing" src="https://github.com/user-attachments/assets/dfb00f21-4f5d-48d2-a9c4-6539902812b5" /><br>
<img width="1365" height="597" alt="features" src="https://github.com/user-attachments/assets/f79494bf-e0ec-4e7d-9fb3-593d0650998a" /><br>
<img width="1365" height="378" alt="Our mission" src="https://github.com/user-attachments/assets/a3cbfc8d-4b11-47b9-badb-5f4d611d7895" /><br>
<img width="1350" height="433" alt="footer" src="https://github.com/user-attachments/assets/cce41cb8-4e49-42bc-ba51-eb625b187045" /><br>


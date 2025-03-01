# Frontend Interview Preparation App

A modern, interactive web application built with React to help developers prepare for frontend interviews. Practice with flashcards and tests covering HTML, CSS, JavaScript, and React topics.

## Features

- 🎯 Interactive learning modes:
  - Flashcard mode for quick review
  - Test mode with scoring and progress tracking
- 📊 Comprehensive dashboard with performance analytics
- 🏆 Leaderboard to compete with other learners
- 🌙 Dark mode support
- 🔄 Random question shuffling
- 📱 Responsive design for all devices
- 🔐 Google Authentication
- 💾 Progress saving and tracking

## Features in Detail

### Learning Modes

1. **Flashcard Mode**

   - Review questions and answers
   - Random shuffling option
   - Progress tracking
   - Quick navigation between cards

2. **Test Mode**
   - Timed assessments
   - Immediate feedback
   - Score tracking
   - Wrong answer review
   - Performance analytics

### Dashboard

- View personal progress
- Category-wise performance metrics
- Test history
- Improvement suggestions

### Leaderboard

- Global rankings
- Category-specific leaderboards
- Recent high scores
- Personal achievements

## Tech Stack

- React 19
- Vite
- Firebase (Authentication & Firestore)
- TailwindCSS
- Framer Motion
- React Icons
- Headless UI

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase account

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/frontend-interview.git
cd frontend-interview
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Start the development server:

```bash
npm run dev
```

## Project Structure

```
frontend-interview/
├── src/
│   ├── assets/         # Static assets
│   ├── components/     # React components
│   ├── context/        # React context providers
│   ├── data/          # Question database and categories
│   ├── firebase/      # Firebase configuration and utilities
│   ├── hooks/         # Custom React hooks
│   └── App.jsx        # Main application component
├── public/            # Public assets
└── ...config files
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Question database contributors
- Firebase for backend services
- TailwindCSS for styling
- React community for amazing tools and libraries

## Contact

Project Link: [https://github.com/muratguelr/frontend-interview](https://github.com/muratguelr/frontend-interview)

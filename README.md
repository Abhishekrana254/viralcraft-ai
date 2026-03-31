# ViralCraft AI 🚀

**AI-powered content creation and automation platform for influencers and creators**

Create viral content effortlessly with advanced AI models, schedule posts across multiple platforms, and automate your entire content workflow.

## ✨ Features

- 🤖 **FREE AI Content Generation** - Uses Google Gemini, Groq, and HuggingFace (all FREE!)
- 📱 **Multi-Platform Support** - YouTube, Instagram, Twitter, TikTok, and more
- ⏰ **Smart Scheduling** - Plan and automate your content calendar
- 📊 **Advanced Analytics** - Track performance and optimize your content
- 🎯 **Trend Analysis** - Stay ahead with real-time trend insights
- 💬 **Auto Engagement** - Automated comment replies and interactions
- 🎨 **Custom Templates** - Professional content templates for every platform
- 💰 **$0 AI Costs** - Start with completely free APIs, scale with paid later

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: Zustand
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast
- **AI Integration**: OpenAI API
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Hosting**: Vercel
- **Analytics**: Google Analytics

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/viralcraft-ai.git
   cd viralcraft-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```

4. **Configure environment variables**
   ```env
   VITE_OPENAI_API_KEY=your_openai_api_key
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
viralcraft-ai/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Navbar.jsx
│   │   └── ...
│   ├── pages/               # Page components
│   │   ├── LandingPage.jsx
│   │   ├── Dashboard.jsx
│   │   ├── ContentGenerator.jsx
│   │   ├── Analytics.jsx
│   │   ├── Pricing.jsx
│   │   ├── Login.jsx
│   │   └── Signup.jsx
│   ├── store/               # State management
│   │   └── authStore.js
│   ├── utils/               # Utility functions
│   ├── App.jsx              # Main app component
│   └── main.jsx             # App entry point
├── public/                  # Static assets
├── package.json
└── README.md
```

## 🎨 Design System

### Colors
- **Primary**: Purple gradient (`#9333ea` to `#0ea5e9`)
- **Secondary**: Blue shades
- **Accent**: Green for success, Red for errors
- **Neutral**: Gray scale for text and backgrounds

### Typography
- **Font**: Inter (Google Fonts)
- **Sizes**: Tailwind CSS scale
- **Weights**: 300, 400, 500, 600, 700, 800

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Configure environment variables** in Vercel dashboard

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy** the `dist` folder to your hosting provider

## 🔑 Environment Variables

Create a `.env.local` file with the following variables:

```env
# OpenAI API
VITE_OPENAI_API_KEY=your_openai_api_key

# Firebase
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Social Media APIs (Optional)
VITE_YOUTUBE_API_KEY=your_youtube_api_key
VITE_INSTAGRAM_ACCESS_TOKEN=your_instagram_token
VITE_TWITTER_API_KEY=your_twitter_api_key

# Analytics
VITE_GA_TRACKING_ID=your_google_analytics_id

# Payments
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

## 📈 Performance

- **Lighthouse Score**: 95+
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Bundle Size**: < 500KB (gzipped)

## 🔒 Security

- Environment variables for sensitive data
- Input validation and sanitization
- HTTPS enforcement
- Content Security Policy headers
- XSS protection

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

- 📧 Email: support@viralcraft.ai
- 💬 Discord: [Join our community](https://discord.gg/viralcraft)
- 🐦 Twitter: [@viralcraftai](https://twitter.com/viralcraftai)

## 🗺️ Roadmap

- [ ] Advanced AI models integration
- [ ] TikTok and LinkedIn support
- [ ] Mobile app (React Native)
- [ ] Video content generation
- [ ] Voice cloning integration
- [ ] Advanced team collaboration
- [ ] White-label solutions

---

**Made with ❤️ by the ViralCraft AI Team**

*Transform your content creation with the power of AI!*
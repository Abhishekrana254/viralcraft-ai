import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'

// Components
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import ContentGenerator from './pages/ContentGenerator'
import Analytics from './pages/Analytics'
import Pricing from './pages/Pricing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import SocialConnections from './pages/SocialConnections'
import ContentSeries from './pages/ContentSeries'
import OAuthCallback from './components/OAuthCallback'

// Custom Hook for Authentication
import { useAuthStore } from './store/authStore'

function App() {
  const { isAuthenticated, isLoading, initialize } = useAuthStore()

  useEffect(() => {
    // Initialize Firebase auth state
    const unsubscribe = initialize()

    // Cleanup subscription on unmount
    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-bg">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Signup />}
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/create"
          element={isAuthenticated ? <ContentGenerator /> : <Navigate to="/login" />}
        />
        <Route
          path="/analytics"
          element={isAuthenticated ? <Analytics /> : <Navigate to="/login" />}
        />
        <Route
          path="/connections"
          element={isAuthenticated ? <SocialConnections /> : <Navigate to="/login" />}
        />
        <Route
          path="/series"
          element={isAuthenticated ? <ContentSeries /> : <Navigate to="/login" />}
        />

        {/* OAuth Callbacks */}
        <Route path="/auth/youtube" element={<OAuthCallback />} />
        <Route path="/auth/instagram" element={<OAuthCallback />} />
        <Route path="/auth/twitter" element={<OAuthCallback />} />
        <Route path="/auth/facebook" element={<OAuthCallback />} />

        {/* 404 Redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default App
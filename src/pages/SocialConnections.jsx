import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Youtube, Instagram, Twitter, Facebook, Settings, Plus, CheckCircle, AlertCircle } from 'lucide-react'
import { useAuthStore } from '../store/authStore'

const SocialConnections = () => {
  const { user } = useAuthStore()
  const [connectedPlatforms, setConnectedPlatforms] = useState({
    youtube: false,
    instagram: false,
    twitter: false,
    facebook: false
  })

  const platforms = [
    {
      id: 'youtube',
      name: 'YouTube',
      icon: Youtube,
      color: 'bg-red-500',
      description: 'Upload videos, set titles, descriptions & thumbnails',
      features: ['Video uploads', 'Custom thumbnails', 'Automated descriptions', 'Scheduled publishing']
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: Instagram,
      color: 'bg-gradient-to-tr from-purple-600 via-pink-600 to-orange-500',
      description: 'Posts, Reels, Stories with automated captions',
      features: ['Feed posts', 'Reels', 'Stories', 'Hashtag optimization']
    },
    {
      id: 'twitter',
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-blue-500',
      description: 'Tweets, threads, and engagement automation',
      features: ['Tweet posting', 'Thread creation', 'Optimal timing', 'Auto-hashtags']
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600',
      description: 'Page posts and video content distribution',
      features: ['Page posting', 'Video uploads', 'Cross-posting', 'Audience targeting']
    }
  ]

  const handleConnect = async (platformId) => {
    // Mock connection for now - will implement real OAuth later
    setConnectedPlatforms(prev => ({
      ...prev,
      [platformId]: true
    }))

    // Simulate API call
    setTimeout(() => {
      alert(`${platforms.find(p => p.id === platformId)?.name} connected successfully! 🎉`)
    }, 1500)
  }

  const handleDisconnect = (platformId) => {
    setConnectedPlatforms(prev => ({
      ...prev,
      [platformId]: false
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl">
              <Settings className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Connected Accounts
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect your social media accounts for automatic content distribution across platforms
          </p>
        </motion.div>

        {/* Connection Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Account Status</h2>
              <p className="text-gray-600">
                {Object.values(connectedPlatforms).filter(Boolean).length} of {platforms.length} accounts connected
              </p>
            </div>
            <div className="flex items-center space-x-2">
              {Object.values(connectedPlatforms).filter(Boolean).length > 0 ? (
                <CheckCircle className="h-8 w-8 text-green-500" />
              ) : (
                <AlertCircle className="h-8 w-8 text-orange-500" />
              )}
            </div>
          </div>

          <div className="mt-4">
            <div className="flex space-x-2">
              {platforms.map((platform) => {
                const Icon = platform.icon
                const isConnected = connectedPlatforms[platform.id]
                return (
                  <div
                    key={platform.id}
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isConnected
                        ? platform.color
                        : 'bg-gray-200'
                    } transition-all duration-300`}
                  >
                    <Icon className={`h-6 w-6 ${isConnected ? 'text-white' : 'text-gray-500'}`} />
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Platform Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {platforms.map((platform, index) => {
            const Icon = platform.icon
            const isConnected = connectedPlatforms[platform.id]

            return (
              <motion.div
                key={platform.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${platform.color}`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{platform.name}</h3>
                      <p className="text-gray-600 text-sm">{platform.description}</p>
                    </div>
                  </div>

                  {isConnected && (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  )}
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Features:</h4>
                  <ul className="space-y-1">
                    {platform.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-center">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Connection Button */}
                <div>
                  {isConnected ? (
                    <div className="flex space-x-3">
                      <button
                        onClick={() => alert(`${platform.name} settings coming soon!`)}
                        className="flex-1 bg-gray-100 text-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
                      >
                        <Settings className="h-4 w-4 inline mr-2" />
                        Settings
                      </button>
                      <button
                        onClick={() => handleDisconnect(platform.id)}
                        className="px-4 py-3 border border-red-300 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors duration-200"
                      >
                        Disconnect
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleConnect(platform.id)}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center justify-center"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Connect {platform.name}
                    </button>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Automation Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white text-center"
        >
          <h2 className="text-2xl font-bold mb-4">🚀 Full Automation Ready!</h2>
          <p className="text-lg mb-6">
            Once connected, your AI-generated content will automatically post across all platforms at optimal times
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="font-semibold mb-1">Smart Scheduling</div>
              <div className="text-white/80">Posts at peak engagement times</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="font-semibold mb-1">Auto-Optimization</div>
              <div className="text-white/80">Platform-specific content formatting</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="font-semibold mb-1">Analytics Sync</div>
              <div className="text-white/80">Cross-platform performance tracking</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default SocialConnections
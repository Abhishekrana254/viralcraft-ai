import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Calendar,
  Clock,
  Play,
  Settings,
  Users,
  TrendingUp,
  Zap,
  ArrowRight,
  CheckCircle,
  Globe,
  Repeat
} from 'lucide-react'
import { useAuthStore } from '../store/authStore'

const ContentSeries = () => {
  const { user } = useAuthStore()
  const [currentStep, setCurrentStep] = useState(1)
  const [seriesData, setSeriesData] = useState({
    niche: '',
    seriesName: '',
    platform: [],
    schedule: {
      frequency: 'daily',
      time: '12:00',
      timezone: 'local'
    },
    contentType: 'video',
    duration: '30-40',
    style: 'bold-stroke'
  })

  const niches = [
    {
      id: 'scary-stories',
      title: 'Scary Stories',
      description: 'Scary stories that give you goosebumps',
      selected: true
    },
    {
      id: 'historical-figures',
      title: 'Historical Figures',
      description: 'Life story in one minute videos about the most important historical figures'
    },
    {
      id: 'greek-mythology',
      title: 'Greek Mythology',
      description: 'Shocking and dramatic stories from Greek mythology'
    },
    {
      id: 'important-events',
      title: 'Important Events',
      description: 'Historical events that changed the world'
    },
    {
      id: 'science-facts',
      title: 'Science Facts',
      description: 'Mind-blowing scientific discoveries and facts'
    },
    {
      id: 'motivational',
      title: 'Motivational Content',
      description: 'Daily motivation for entrepreneurs and creators'
    }
  ]

  const platforms = [
    { id: 'youtube', name: 'YouTube', color: 'bg-red-500' },
    { id: 'instagram', name: 'Instagram', color: 'bg-gradient-to-tr from-purple-600 to-pink-600' },
    { id: 'twitter', name: 'Twitter', color: 'bg-blue-500' },
    { id: 'tiktok', name: 'TikTok', color: 'bg-gray-900' }
  ]

  const captionStyles = [
    { id: 'bold-stroke', name: 'Bold Stroke', preview: 'A', selected: true },
    { id: 'red-highlight', name: 'Red Highlight', preview: 'A' },
    { id: 'sleek', name: 'Sleek', preview: 'I' },
    { id: 'karaoke', name: 'Karaoke', preview: 'A' },
    { id: 'majestic', name: 'Majestic', preview: 'A' },
    { id: 'beast', name: 'Beast', preview: 'A' }
  ]

  const handleCreateSeries = () => {
    // Mock series creation
    alert(`🚀 "${seriesData.seriesName || 'Untitled Series'}" created successfully!\n\n✅ Will post ${seriesData.schedule.frequency} at ${seriesData.schedule.time}\n✅ Content generated 6 hours before publish time\n✅ Auto-posting to selected platforms\n\nYour automated content series is now LIVE! 🎉`)
  }

  const steps = [
    { number: 1, title: 'Choose Niche', description: 'Select content category' },
    { number: 2, title: 'Platforms', description: 'Choose social platforms' },
    { number: 3, title: 'Style', description: 'Caption & video style' },
    { number: 4, title: 'Schedule', description: 'Set posting frequency' },
    { number: 5, title: 'Launch', description: 'Finalize & activate' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl">
              <Repeat className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Create Content Series
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Set up automated content creation and posting across all your social media platforms
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
              >
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    currentStep >= step.number
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {currentStep > step.number ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <div className="hidden sm:block">
                    <div className={`text-sm font-medium ${
                      currentStep >= step.number ? 'text-purple-600' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    currentStep > step.number ? 'bg-purple-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose your niche</h2>
              <p className="text-gray-600 mb-6">Select a preset or describe your own niche</p>

              <div className="space-y-4">
                {niches.map((niche) => (
                  <motion.div
                    key={niche.id}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      niche.selected
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                    onClick={() => setSeriesData(prev => ({ ...prev, niche: niche.id }))}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{niche.title}</h3>
                        <p className="text-sm text-gray-600">{niche.description}</p>
                      </div>
                      {niche.selected && <CheckCircle className="h-5 w-5 text-purple-600" />}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Platforms</h2>
              <p className="text-gray-600 mb-6">Choose which social media platforms to post on</p>

              <div className="grid grid-cols-2 gap-4">
                {platforms.map((platform) => (
                  <motion.div
                    key={platform.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                      seriesData.platform.includes(platform.id)
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                    onClick={() => {
                      const newPlatforms = seriesData.platform.includes(platform.id)
                        ? seriesData.platform.filter(p => p !== platform.id)
                        : [...seriesData.platform, platform.id]
                      setSeriesData(prev => ({ ...prev, platform: newPlatforms }))
                    }}
                  >
                    <div className="text-center">
                      <div className={`w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center ${platform.color}`}>
                        <Globe className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-900">{platform.name}</h3>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Caption Style</h2>
              <p className="text-gray-600 mb-6">Choose how captions will appear in your videos</p>

              <div className="grid grid-cols-2 gap-4">
                {captionStyles.map((style) => (
                  <motion.div
                    key={style.id}
                    whileHover={{ scale: 1.05 }}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      style.selected
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                    onClick={() => setSeriesData(prev => ({ ...prev, style: style.id }))}
                  >
                    <div className="text-center">
                      <div className="w-16 h-12 bg-gray-700 rounded mx-auto mb-2 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">{style.preview}</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 text-sm">{style.name}</h3>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Posting Schedule</h2>
              <p className="text-gray-600 mb-6">Set when you want your content to be published</p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Series Name</label>
                  <input
                    type="text"
                    placeholder="Enter a name for your series"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    onChange={(e) => setSeriesData(prev => ({ ...prev, seriesName: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Posting Frequency</label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    onChange={(e) => setSeriesData(prev => ({
                      ...prev,
                      schedule: { ...prev.schedule, frequency: e.target.value }
                    }))}
                  >
                    <option value="daily">Daily</option>
                    <option value="twice-daily">2 times per day</option>
                    <option value="weekly">Weekly</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Publish Time</label>
                  <input
                    type="time"
                    defaultValue="12:00"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    onChange={(e) => setSeriesData(prev => ({
                      ...prev,
                      schedule: { ...prev.schedule, time: e.target.value }
                    }))}
                  />
                  <p className="text-sm text-gray-500 mt-1">(Your local time)</p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Zap className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-900">Smart Automation</p>
                      <p className="text-sm text-blue-700">
                        Content will be generated 6 hours before the scheduled publish time so you have time to review them.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Ready to Launch!</h2>
              <p className="text-gray-600 mb-8">Review your series settings and start automation</p>

              <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white mb-8">
                <h3 className="text-xl font-bold mb-4">📋 Series Summary</h3>
                <div className="space-y-2 text-left">
                  <p><strong>Series:</strong> {seriesData.seriesName || 'Untitled Series'}</p>
                  <p><strong>Niche:</strong> {niches.find(n => n.id === seriesData.niche)?.title || 'Scary Stories'}</p>
                  <p><strong>Platforms:</strong> {seriesData.platform.length || '4'} selected</p>
                  <p><strong>Schedule:</strong> {seriesData.schedule.frequency} at {seriesData.schedule.time}</p>
                  <p><strong>Automation:</strong> ✅ Content generation + Auto-posting</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8 text-sm">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="font-semibold text-green-900">Smart Generation</div>
                  <div className="text-green-700">AI creates unique content daily</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="font-semibold text-blue-900">Auto-Posting</div>
                  <div className="text-blue-700">Publishes across all platforms</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="font-semibold text-purple-900">Analytics</div>
                  <div className="text-purple-700">Track performance automatically</div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-lg font-medium ${
                currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              ← Back
            </button>

            {currentStep < 5 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 flex items-center space-x-2"
              >
                <span>Continue</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={handleCreateSeries}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-bold hover:from-green-700 hover:to-emerald-700 flex items-center space-x-2 text-lg"
              >
                <Play className="h-5 w-5" />
                <span>🚀 Create Series</span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ContentSeries
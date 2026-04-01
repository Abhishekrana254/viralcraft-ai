import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  Sparkles,
  Copy,
  Download,
  RefreshCw,
  Youtube,
  Instagram,
  Twitter,
  Send,
  Loader2,
  Wand2,
  TrendingUp,
  Calendar,
  CheckCircle,
  AlertCircle,
  Crown,
  Zap,
  Video,
  Play,
  Upload,
  Volume2,
  VolumeX
} from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuthStore } from '../store/authStore'
import UpgradeModal from '../components/UpgradeModal'
import multiAIService from '../services/multiAIService'
import postingService from '../services/postingService'
import socialMediaService from '../services/socialMediaService'
import videoGeneratorService from '../services/videoGeneratorService'

const ContentGenerator = () => {
  const { user } = useAuthStore()
  const [selectedPlatform, setSelectedPlatform] = useState('youtube')
  const [contentType, setContentType] = useState('script')
  const [prompt, setPrompt] = useState('')
  const [generatedContent, setGeneratedContent] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [tone, setTone] = useState('professional')
  const [contentLength, setContentLength] = useState('medium')
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [remainingGenerations, setRemainingGenerations] = useState(null)
  const [usageStats, setUsageStats] = useState({
    thisMonth: 0,
    totalGenerated: 0
  })
  const [isPosting, setIsPosting] = useState(false)
  const [connectedPlatforms, setConnectedPlatforms] = useState({})
  const [selectedPostingPlatforms, setSelectedPostingPlatforms] = useState([])
  const [scheduleDate, setScheduleDate] = useState('')
  const [scheduleTime, setScheduleTime] = useState('')

  // Video generation states
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false)
  const [videoResult, setVideoResult] = useState(null)
  const [videoProgress, setVideoProgress] = useState({ progress: 0, message: '' })
  const [isUploadingToYouTube, setIsUploadingToYouTube] = useState(false)
  const [videoFormat, setVideoFormat] = useState('vertical')
  const [isPlayingVoiceover, setIsPlayingVoiceover] = useState(false)
  const videoRef = useRef(null)

  // Load user's usage stats and connected platforms
  useEffect(() => {
    if (user) {
      loadUserUsage()
      loadConnectedPlatforms()
    }
  }, [user])

  const loadConnectedPlatforms = async () => {
    try {
      const platforms = socialMediaService.getConnectionStatus()
      setConnectedPlatforms(platforms)

      // Auto-select connected platforms for posting
      const connected = Object.keys(platforms).filter(key => platforms[key])
      setSelectedPostingPlatforms(connected.slice(0, 2)) // Select first 2 by default
    } catch (error) {
      console.error('Failed to load connected platforms:', error)
    }
  }

  const loadUserUsage = async () => {
    try {
      // Mock usage stats - replace with real API call
      const plan = user?.plan || 'free'
      const limits = { free: 5, starter: 50, creator: -1, agency: -1 }
      const used = user?.monthlyUsage || 0
      const remaining = limits[plan] === -1 ? 'Unlimited' : Math.max(0, limits[plan] - used)

      setRemainingGenerations(remaining)
      setUsageStats({
        thisMonth: used,
        totalGenerated: user?.totalGenerated || 0
      })
    } catch (error) {
      console.error('Failed to load usage:', error)
    }
  }

  const platforms = [
    { id: 'youtube', name: 'YouTube', icon: Youtube, color: 'text-red-600', bg: 'bg-red-50' },
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'text-pink-600', bg: 'bg-pink-50' },
    { id: 'twitter', name: 'Twitter', icon: Twitter, color: 'text-blue-600', bg: 'bg-blue-50' }
  ]

  const contentTypes = {
    youtube: [
      { id: 'script', name: 'Video Script', description: 'Full video script with hooks' },
      { id: 'title', name: 'Video Title', description: 'Catchy titles that get clicks' },
      { id: 'description', name: 'Description', description: 'SEO-optimized descriptions' },
      { id: 'thumbnail', name: 'Thumbnail Ideas', description: 'Eye-catching thumbnail concepts' }
    ],
    instagram: [
      { id: 'post', name: 'Post Caption', description: 'Engaging captions with hashtags' },
      { id: 'story', name: 'Story Content', description: 'Interactive story ideas' },
      { id: 'reel', name: 'Reel Script', description: 'Short-form video scripts' },
      { id: 'bio', name: 'Bio Ideas', description: 'Compelling profile bios' }
    ],
    twitter: [
      { id: 'tweet', name: 'Single Tweet', description: 'Engaging standalone tweets' },
      { id: 'thread', name: 'Twitter Thread', description: 'Multi-tweet storytelling' },
      { id: 'reply', name: 'Reply Ideas', description: 'Smart engagement responses' },
      { id: 'bio', name: 'Twitter Bio', description: 'Concise profile descriptions' }
    ]
  }

  const tones = [
    'professional', 'casual', 'humorous', 'inspiring', 'educational', 'conversational'
  ]

  const lengths = [
    { id: 'short', name: 'Short', description: 'Quick & concise' },
    { id: 'medium', name: 'Medium', description: 'Balanced length' },
    { id: 'long', name: 'Long', description: 'Detailed & comprehensive' }
  ]

  // Multi-AI content generation with FREE APIs first!
  const generateContent = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt to generate content')
      return
    }

    // Check usage limits
    const plan = user?.plan || 'free'
    const limits = { free: 5, starter: 50, creator: -1, agency: -1 }
    const used = usageStats.thisMonth

    if (limits[plan] !== -1 && used >= limits[plan]) {
      setShowUpgradeModal(true)
      return
    }

    setIsGenerating(true)

    try {
      // Generate with FREE AI first, then paid if needed
      const result = await multiAIService.generateContent(
        prompt,
        selectedPlatform,
        contentType,
        user
      )

      setGeneratedContent(result.content)

      // Update usage stats
      setUsageStats(prev => ({
        thisMonth: prev.thisMonth + 1,
        totalGenerated: prev.totalGenerated + 1
      }))

      // Update remaining generations
      const newUsed = usageStats.thisMonth + 1
      const newRemaining = limits[plan] === -1 ? 'Unlimited' : Math.max(0, limits[plan] - newUsed)
      setRemainingGenerations(newRemaining)

      // Show cost savings message
      const providerMessage = {
        gemini: 'Generated with FREE Google Gemini! 🆓',
        groq: 'Generated with super-fast Groq! ⚡',
        huggingface: 'Generated with FREE Hugging Face! 🤗',
        openai: 'Generated with premium OpenAI GPT!'
      }

      toast.success(providerMessage[result.provider] || 'Content generated successfully!')

    } catch (error) {
      toast.error('Failed to generate content. Please try again.')
      console.error('Generation error:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedContent)
      toast.success('Content copied to clipboard!')
    } catch (error) {
      toast.error('Failed to copy content')
    }
  }

  // Real Social Media Posting Functions
  const handlePostNow = async () => {
    if (!generatedContent) {
      toast.error('No content to post')
      return
    }

    if (selectedPostingPlatforms.length === 0) {
      toast.error('Please select at least one platform to post to')
      return
    }

    setIsPosting(true)

    try {
      const result = await postingService.postToMultiplePlatforms(
        generatedContent,
        selectedPostingPlatforms
      )

      if (result.success) {
        toast.success(`Posted to ${result.successCount} platform(s)! 🚀`)

        // Update usage stats
        setUsageStats(prev => ({
          thisMonth: prev.thisMonth + 1,
          totalGenerated: prev.totalGenerated + 1
        }))
      } else {
        toast.error('Failed to post to platforms')
      }
    } catch (error) {
      console.error('Posting failed:', error)
      toast.error('Posting failed: ' + error.message)
    } finally {
      setIsPosting(false)
    }
  }

  const handleSchedulePost = async () => {
    if (!generatedContent) {
      toast.error('No content to schedule')
      return
    }

    if (selectedPostingPlatforms.length === 0) {
      toast.error('Please select platforms for scheduling')
      return
    }

    if (!scheduleDate || !scheduleTime) {
      toast.error('Please select date and time for scheduling')
      return
    }

    const scheduleDateTime = new Date(`${scheduleDate}T${scheduleTime}`)
    if (scheduleDateTime <= new Date()) {
      toast.error('Schedule time must be in the future')
      return
    }

    setIsPosting(true)

    try {
      const result = await postingService.postToMultiplePlatforms(
        generatedContent,
        selectedPostingPlatforms,
        scheduleDateTime
      )

      if (result.success) {
        toast.success('Post scheduled successfully! ⏰')

        // Clear scheduling inputs
        setScheduleDate('')
        setScheduleTime('')
      }
    } catch (error) {
      console.error('Scheduling failed:', error)
      toast.error('Scheduling failed: ' + error.message)
    } finally {
      setIsPosting(false)
    }
  }

  const togglePlatformSelection = (platform) => {
    if (!connectedPlatforms[platform]) {
      toast.error(`Please connect your ${platform} account first`)
      return
    }

    setSelectedPostingPlatforms(prev => {
      if (prev.includes(platform)) {
        return prev.filter(p => p !== platform)
      } else {
        return [...prev, platform]
      }
    })
  }

  // Video Generation Functions
  const handleGenerateVideo = async () => {
    if (!generatedContent) {
      toast.error('Generate content first, then create video')
      return
    }

    setIsGeneratingVideo(true)
    setVideoResult(null)
    setVideoProgress({ progress: 0, message: 'Starting video generation...' })

    try {
      const result = await videoGeneratorService.generateVideo(generatedContent, {
        format: videoFormat,
        withVoiceover: true,
        secondsPerScene: 5,
        onProgress: (progress) => {
          setVideoProgress(progress)
        }
      })

      setVideoResult(result)
      toast.success(`Video generated! ${result.duration}s, ${result.scenes.length} scenes`)
    } catch (error) {
      console.error('Video generation failed:', error)
      toast.error('Video generation failed: ' + error.message)
    } finally {
      setIsGeneratingVideo(false)
    }
  }

  const handleUploadToYouTube = async () => {
    if (!videoResult?.blob) {
      toast.error('No video to upload')
      return
    }

    const token = localStorage.getItem('youtube_access_token')
    if (!token) {
      toast.error('Please connect YouTube first from Connections page')
      return
    }

    setIsUploadingToYouTube(true)

    try {
      // Extract title from content
      const lines = generatedContent.split('\n').filter(l => l.trim())
      const title = lines[0]?.replace(/[*#🎬]/g, '').trim().slice(0, 100) || 'AI Generated Video'
      const description = generatedContent.slice(0, 5000)

      // Create form data for resumable upload
      const metadata = {
        snippet: {
          title: title,
          description: description + '\n\n---\nGenerated with ViralCraft AI',
          tags: ['AI', 'ViralCraft', 'content', 'automation'],
          categoryId: '22'
        },
        status: {
          privacyStatus: 'unlisted', // Start as unlisted for safety
          selfDeclaredMadeForKids: false
        }
      }

      // Step 1: Initialize resumable upload
      const initResponse = await fetch(
        'https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json; charset=UTF-8',
            'X-Upload-Content-Length': videoResult.blob.size,
            'X-Upload-Content-Type': 'video/webm'
          },
          body: JSON.stringify(metadata)
        }
      )

      if (!initResponse.ok) {
        const errorData = await initResponse.json().catch(() => ({}))
        throw new Error(errorData.error?.message || `Upload init failed: ${initResponse.status}`)
      }

      const uploadUrl = initResponse.headers.get('Location')

      // Step 2: Upload video file
      const uploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'video/webm',
          'Content-Length': videoResult.blob.size
        },
        body: videoResult.blob
      })

      if (!uploadResponse.ok) {
        throw new Error(`Video upload failed: ${uploadResponse.status}`)
      }

      const videoData = await uploadResponse.json()
      const videoUrl = `https://youtube.com/watch?v=${videoData.id}`

      toast.success(
        <div>
          <p>Video uploaded to YouTube!</p>
          <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
            Watch on YouTube
          </a>
        </div>,
        { duration: 10000 }
      )
    } catch (error) {
      console.error('YouTube upload failed:', error)
      toast.error('Upload failed: ' + error.message)
    } finally {
      setIsUploadingToYouTube(false)
    }
  }

  const toggleVoiceover = () => {
    if (isPlayingVoiceover) {
      videoGeneratorService.stopVoiceover()
      setIsPlayingVoiceover(false)
    } else if (videoResult?.scenes) {
      videoGeneratorService.playVoiceover(videoResult.scenes)
      setIsPlayingVoiceover(true)
      if (videoRef.current) videoRef.current.play()
    }
  }

  const handleDownloadVideo = () => {
    if (!videoResult?.url) return
    const a = document.createElement('a')
    a.href = videoResult.url
    a.download = `viralcraft-video-${Date.now()}.webm`
    a.click()
    toast.success('Video downloaded!')
  }

  const selectedPlatformData = platforms.find(p => p.id === selectedPlatform)
  const PlatformIcon = selectedPlatformData?.icon

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                AI Content Generator
              </h1>
              <p className="text-gray-600">
                Create viral content for any platform with the power of AI
              </p>
            </div>

            {/* Usage Stats */}
            <div className="text-right">
              <div className="card p-4 min-w-[200px]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Current Plan</span>
                  <div className="flex items-center space-x-1">
                    <Crown className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-bold text-purple-600 capitalize">
                      {user?.plan || 'Free'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">This Month</span>
                  <div className="flex items-center space-x-1">
                    {remainingGenerations === 'Unlimited' ? (
                      <span className="text-sm font-bold text-green-600">Unlimited</span>
                    ) : (
                      <>
                        <Zap className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-bold text-gray-900">
                          {remainingGenerations || 0} left
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {user?.plan === 'free' && (
                  <button
                    onClick={() => setShowUpgradeModal(true)}
                    className="w-full mt-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-xs font-medium py-2 px-3 rounded-lg transition-all duration-200"
                  >
                    Upgrade for Unlimited
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Configuration Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Platform Selection */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Platform</h3>
              <div className="grid grid-cols-1 gap-3">
                {platforms.map((platform) => {
                  const Icon = platform.icon
                  return (
                    <button
                      key={platform.id}
                      onClick={() => setSelectedPlatform(platform.id)}
                      className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all ${
                        selectedPlatform === platform.id
                          ? 'border-purple-300 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${platform.bg}`}>
                          <Icon className={`h-5 w-5 ${platform.color}`} />
                        </div>
                        <span className="font-medium text-gray-900">{platform.name}</span>
                      </div>
                      {selectedPlatform === platform.id && (
                        <CheckCircle className="h-5 w-5 text-purple-600" />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Content Type */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Type</h3>
              <div className="space-y-2">
                {contentTypes[selectedPlatform]?.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setContentType(type.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      contentType === type.id
                        ? 'bg-purple-50 border-2 border-purple-300'
                        : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                    }`}
                  >
                    <div className="font-medium text-gray-900">{type.name}</div>
                    <div className="text-sm text-gray-600">{type.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Options */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Customization</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tone</label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  >
                    {tones.map(t => (
                      <option key={t} value={t} className="capitalize">{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Length</label>
                  <div className="space-y-2">
                    {lengths.map(length => (
                      <button
                        key={length.id}
                        onClick={() => setContentLength(length.id)}
                        className={`w-full text-left p-2 rounded-lg text-sm transition-all ${
                          contentLength === length.id
                            ? 'bg-purple-50 border border-purple-300'
                            : 'bg-gray-50 hover:bg-gray-100 border border-transparent'
                        }`}
                      >
                        <div className="font-medium">{length.name}</div>
                        <div className="text-gray-600">{length.description}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Generation Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="card p-6 h-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  {PlatformIcon && (
                    <div className={`p-2 rounded-lg ${selectedPlatformData?.bg}`}>
                      <PlatformIcon className={`h-5 w-5 ${selectedPlatformData?.color}`} />
                    </div>
                  )}
                  <h2 className="text-xl font-semibold text-gray-900">
                    Generate {contentTypes[selectedPlatform]?.find(t => t.id === contentType)?.name}
                  </h2>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setPrompt('')
                      setGeneratedContent('')
                    }}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Clear all"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Prompt Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What do you want to create content about?
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., 'How to start a successful YouTube channel' or 'Morning routines that boost productivity'"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 resize-none"
                  rows={3}
                />
                <div className="flex items-center justify-between mt-2">
                  <p className="text-sm text-gray-500">
                    Be specific for better results
                  </p>
                  <span className="text-sm text-gray-400">
                    {prompt.length}/500
                  </span>
                </div>
              </div>

              {/* Generate Button */}
              {remainingGenerations === 0 ? (
                <button
                  onClick={() => setShowUpgradeModal(true)}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
                >
                  <Crown className="h-5 w-5 mr-2" />
                  Upgrade to Generate More Content
                </button>
              ) : (
                <button
                  onClick={generateContent}
                  disabled={isGenerating || !prompt.trim()}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      Generating magical content...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5 mr-2" />
                      Generate Content with AI
                    </>
                  )}
                </button>
              )}

              {/* Generated Content */}
              {generatedContent && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mt-8"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Generated Content</h3>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={copyToClipboard}
                        className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium text-sm"
                      >
                        <Copy className="h-4 w-4" />
                        <span>Copy</span>
                      </button>
                      <button className="flex items-center space-x-2 text-green-600 hover:text-green-700 font-medium text-sm">
                        <Download className="h-4 w-4" />
                        <span>Save</span>
                      </button>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200">
                    <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono leading-relaxed">
                      {generatedContent}
                    </pre>
                  </div>

                  {/* Platform Selection for Posting */}
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-3">📤 Post to Platforms:</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {[
                        { id: 'youtube', name: 'YouTube', color: 'bg-red-500' },
                        { id: 'instagram', name: 'Instagram', color: 'bg-purple-500' },
                        { id: 'twitter', name: 'Twitter', color: 'bg-blue-500' },
                        { id: 'facebook', name: 'Facebook', color: 'bg-blue-600' }
                      ].map(platform => (
                        <button
                          key={platform.id}
                          onClick={() => togglePlatformSelection(platform.id)}
                          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                            selectedPostingPlatforms.includes(platform.id)
                              ? `${platform.color} text-white`
                              : connectedPlatforms[platform.id]
                                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          {platform.name}
                          {!connectedPlatforms[platform.id] && ' (Connect first)'}
                          {selectedPostingPlatforms.includes(platform.id) && ' ✓'}
                        </button>
                      ))}
                    </div>

                    {/* Scheduling Options */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <input
                        type="date"
                        value={scheduleDate}
                        onChange={(e) => setScheduleDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="Schedule Date"
                      />
                      <input
                        type="time"
                        value={scheduleTime}
                        onChange={(e) => setScheduleTime(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="Schedule Time"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 mt-6">
                    <button
                      onClick={handlePostNow}
                      disabled={isPosting || selectedPostingPlatforms.length === 0}
                      className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                    >
                      {isPosting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                      <span>{isPosting ? 'Posting...' : 'Post Now'}</span>
                    </button>

                    <button
                      onClick={handleSchedulePost}
                      disabled={isPosting || !scheduleDate || !scheduleTime || selectedPostingPlatforms.length === 0}
                      className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                    >
                      {isPosting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Calendar className="h-4 w-4" />
                      )}
                      <span>{isPosting ? 'Scheduling...' : 'Schedule Post'}</span>
                    </button>

                    <button
                      onClick={generateContent}
                      disabled={isGenerating}
                      className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                    >
                      <RefreshCw className={`h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
                      <span>{isGenerating ? 'Generating...' : 'Regenerate'}</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Video Generation Section */}
              {generatedContent && selectedPlatform === 'youtube' && contentType === 'script' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8"
                >
                  <div className="card p-6 border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Video className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">Auto-Generate Video</h3>
                          <p className="text-sm text-gray-600">Create faceless video from your script - like FaceReels!</p>
                        </div>
                      </div>
                    </div>

                    {/* Video Format Selection */}
                    <div className="flex gap-3 mb-4">
                      <button
                        onClick={() => setVideoFormat('vertical')}
                        className={`flex-1 p-3 rounded-lg border-2 text-center transition-all ${
                          videoFormat === 'vertical'
                            ? 'border-purple-400 bg-purple-100'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-2xl mb-1">📱</div>
                        <div className="font-medium text-sm">Vertical 9:16</div>
                        <div className="text-xs text-gray-500">Shorts / Reels</div>
                      </button>
                      <button
                        onClick={() => setVideoFormat('horizontal')}
                        className={`flex-1 p-3 rounded-lg border-2 text-center transition-all ${
                          videoFormat === 'horizontal'
                            ? 'border-purple-400 bg-purple-100'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-2xl mb-1">🖥️</div>
                        <div className="font-medium text-sm">Horizontal 16:9</div>
                        <div className="text-xs text-gray-500">YouTube Video</div>
                      </button>
                    </div>

                    {/* Generate Video Button */}
                    {!videoResult && (
                      <button
                        onClick={handleGenerateVideo}
                        disabled={isGeneratingVideo}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all flex items-center justify-center"
                      >
                        {isGeneratingVideo ? (
                          <>
                            <Loader2 className="h-5 w-5 animate-spin mr-2" />
                            {videoProgress.message || 'Generating video...'}
                          </>
                        ) : (
                          <>
                            <Video className="h-5 w-5 mr-2" />
                            Generate Video from Script
                          </>
                        )}
                      </button>
                    )}

                    {/* Progress Bar */}
                    {isGeneratingVideo && (
                      <div className="mt-4">
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all duration-300"
                            style={{ width: `${videoProgress.progress}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2 text-center">
                          {videoProgress.progress}% - {videoProgress.message}
                        </p>
                      </div>
                    )}

                    {/* Video Preview */}
                    {videoResult && (
                      <div className="mt-4">
                        <div className={`relative mx-auto bg-black rounded-lg overflow-hidden ${
                          videoFormat === 'vertical' ? 'max-w-[280px]' : 'max-w-full'
                        }`}>
                          <video
                            ref={videoRef}
                            src={videoResult.url}
                            controls
                            className="w-full"
                            style={{ aspectRatio: videoFormat === 'vertical' ? '9/16' : '16/9' }}
                          />
                        </div>

                        <div className="mt-2 text-center text-sm text-gray-600">
                          {videoResult.scenes.length} scenes | {videoResult.duration}s duration | {videoFormat === 'vertical' ? '1080x1920' : '1920x1080'}
                        </div>

                        {/* Video Action Buttons */}
                        <div className="flex flex-wrap gap-3 mt-4 justify-center">
                          <button
                            onClick={toggleVoiceover}
                            className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                          >
                            {isPlayingVoiceover ? (
                              <VolumeX className="h-4 w-4" />
                            ) : (
                              <Volume2 className="h-4 w-4" />
                            )}
                            <span>{isPlayingVoiceover ? 'Stop Voiceover' : 'Play with Voiceover'}</span>
                          </button>

                          <button
                            onClick={handleDownloadVideo}
                            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                          >
                            <Download className="h-4 w-4" />
                            <span>Download Video</span>
                          </button>

                          <button
                            onClick={handleUploadToYouTube}
                            disabled={isUploadingToYouTube || !connectedPlatforms.youtube}
                            className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                          >
                            {isUploadingToYouTube ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Upload className="h-4 w-4" />
                            )}
                            <span>{isUploadingToYouTube ? 'Uploading...' : 'Upload to YouTube'}</span>
                          </button>

                          <button
                            onClick={() => { setVideoResult(null); setVideoProgress({ progress: 0, message: '' }) }}
                            className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                          >
                            <RefreshCw className="h-4 w-4" />
                            <span>Regenerate</span>
                          </button>
                        </div>

                        {!connectedPlatforms.youtube && (
                          <p className="text-sm text-amber-600 mt-3 text-center">
                            Connect YouTube from Connections page to upload directly
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Tips */}
              <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start space-x-3">
                  <Wand2 className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900 mb-2">Pro Tips for Better Content:</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Be specific about your target audience</li>
                      <li>• Include trending keywords in your prompt</li>
                      <li>• Mention your niche or industry for better context</li>
                      <li>• Try different tones to match your brand voice</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Upgrade Modal */}
        <UpgradeModal
          isOpen={showUpgradeModal}
          onClose={() => setShowUpgradeModal(false)}
          currentPlan={user?.plan || 'free'}
          remainingGenerations={remainingGenerations}
        />
      </div>
    </div>
  )
}

export default ContentGenerator
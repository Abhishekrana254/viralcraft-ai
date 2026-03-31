import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  Heart,
  MessageCircle,
  Share,
  Calendar,
  Filter,
  Download,
  Youtube,
  Instagram,
  Twitter,
  ArrowUpRight,
  ArrowDownLeft
} from 'lucide-react'

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d')
  const [selectedPlatform, setSelectedPlatform] = useState('all')

  const periods = [
    { id: '7d', name: '7 Days' },
    { id: '30d', name: '30 Days' },
    { id: '90d', name: '90 Days' },
    { id: '1y', name: '1 Year' }
  ]

  const platforms = [
    { id: 'all', name: 'All Platforms' },
    { id: 'youtube', name: 'YouTube', icon: Youtube, color: 'text-red-600' },
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'text-pink-600' },
    { id: 'twitter', name: 'Twitter', icon: Twitter, color: 'text-blue-600' }
  ]

  const overviewStats = [
    {
      title: 'Total Reach',
      value: '2.4M',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Total Impressions',
      value: '8.7M',
      change: '+8.3%',
      trend: 'up',
      icon: Eye,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Engagement Rate',
      value: '6.8%',
      change: '-2.1%',
      trend: 'down',
      icon: Heart,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50'
    },
    {
      title: 'Click-through Rate',
      value: '3.2%',
      change: '+15.7%',
      trend: 'up',
      icon: Share,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ]

  const topPosts = [
    {
      id: 1,
      platform: 'youtube',
      title: '10 AI Tools That Will Change Your Life',
      views: 125000,
      likes: 8200,
      comments: 432,
      shares: 890,
      publishedAt: '2 days ago',
      thumbnail: '/api/placeholder/120/68'
    },
    {
      id: 2,
      platform: 'instagram',
      title: 'Morning routine for productivity',
      views: 67000,
      likes: 4500,
      comments: 234,
      shares: 567,
      publishedAt: '1 day ago',
      thumbnail: '/api/placeholder/120/68'
    },
    {
      id: 3,
      platform: 'twitter',
      title: 'Thread: Building in public journey',
      views: 45000,
      likes: 2800,
      comments: 145,
      shares: 340,
      publishedAt: '3 hours ago',
      thumbnail: '/api/placeholder/120/68'
    }
  ]

  const platformStats = [
    {
      platform: 'YouTube',
      icon: Youtube,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      followers: '125K',
      posts: 47,
      avgViews: '12.4K',
      engagement: '7.8%',
      growth: '+18.5%'
    },
    {
      platform: 'Instagram',
      icon: Instagram,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      followers: '89K',
      posts: 156,
      avgViews: '8.9K',
      engagement: '5.6%',
      growth: '+12.3%'
    },
    {
      platform: 'Twitter',
      icon: Twitter,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      followers: '34K',
      posts: 89,
      avgViews: '3.2K',
      engagement: '4.1%',
      growth: '+8.7%'
    }
  ]

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'youtube': return Youtube
      case 'instagram': return Instagram
      case 'twitter': return Twitter
      default: return BarChart3
    }
  }

  const getPlatformColor = (platform) => {
    switch (platform) {
      case 'youtube': return 'text-red-600'
      case 'instagram': return 'text-pink-600'
      case 'twitter': return 'text-blue-600'
      default: return 'text-gray-600'
    }
  }

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
              <p className="text-gray-600">Track your content performance across all platforms</p>
            </div>

            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              >
                {platforms.map(platform => (
                  <option key={platform.id} value={platform.id}>
                    {platform.name}
                  </option>
                ))}
              </select>

              <div className="flex bg-gray-100 rounded-lg p-1">
                {periods.map(period => (
                  <button
                    key={period.id}
                    onClick={() => setSelectedPeriod(period.id)}
                    className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                      selectedPeriod === period.id
                        ? 'bg-white text-purple-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {period.name}
                  </button>
                ))}
              </div>

              <button className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Overview Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {overviewStats.map((stat) => {
            const Icon = stat.icon
            const TrendIcon = stat.trend === 'up' ? ArrowUpRight : ArrowDownLeft
            return (
              <div key={stat.title} className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className={`flex items-center text-sm font-medium ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendIcon className="h-4 w-4 mr-1" />
                    {stat.change}
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                </div>
              </div>
            )
          })}
        </motion.div>

        {/* Charts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid lg:grid-cols-2 gap-8 mb-8"
        >
          {/* Engagement Chart */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Engagement Over Time</h3>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-1" />
                Last {periods.find(p => p.id === selectedPeriod)?.name}
              </div>
            </div>

            <div className="h-64 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Interactive Chart</p>
                <p className="text-sm text-gray-500">Engagement trends visualization</p>
              </div>
            </div>
          </div>

          {/* Platform Distribution */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Platform Distribution</h3>
              <div className="flex items-center text-sm text-gray-500">
                <TrendingUp className="h-4 w-4 mr-1" />
                Views by Platform
              </div>
            </div>

            <div className="h-64 bg-gradient-to-br from-pink-50 to-orange-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-orange-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <p className="text-gray-600 font-medium">Pie Chart</p>
                <p className="text-sm text-gray-500">Platform performance breakdown</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Platform Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid md:grid-cols-3 gap-6 mb-8"
        >
          {platformStats.map((platform) => {
            const Icon = platform.icon
            return (
              <div key={platform.platform} className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${platform.bgColor}`}>
                      <Icon className={`h-5 w-5 ${platform.color}`} />
                    </div>
                    <h3 className="font-semibold text-gray-900">{platform.platform}</h3>
                  </div>
                  <span className={`text-sm font-medium ${
                    platform.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {platform.growth}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-lg font-bold text-gray-900">{platform.followers}</p>
                    <p className="text-xs text-gray-600">Followers</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">{platform.posts}</p>
                    <p className="text-xs text-gray-600">Posts</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">{platform.avgViews}</p>
                    <p className="text-xs text-gray-600">Avg Views</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">{platform.engagement}</p>
                    <p className="text-xs text-gray-600">Engagement</p>
                  </div>
                </div>
              </div>
            )
          })}
        </motion.div>

        {/* Top Performing Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Top Performing Posts</h3>
            <button className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium text-sm">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Content</th>
                  <th className="text-center py-3 px-2 text-sm font-medium text-gray-500">Views</th>
                  <th className="text-center py-3 px-2 text-sm font-medium text-gray-500">Likes</th>
                  <th className="text-center py-3 px-2 text-sm font-medium text-gray-500">Comments</th>
                  <th className="text-center py-3 px-2 text-sm font-medium text-gray-500">Shares</th>
                  <th className="text-right py-3 px-2 text-sm font-medium text-gray-500">Published</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {topPosts.map((post) => {
                  const PlatformIcon = getPlatformIcon(post.platform)
                  return (
                    <tr key={post.id} className="hover:bg-gray-50">
                      <td className="py-4 px-2">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                              <PlatformIcon className={`h-6 w-6 ${getPlatformColor(post.platform)}`} />
                            </div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-gray-900 truncate">{post.title}</p>
                            <p className="text-sm text-gray-500 capitalize">{post.platform}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-2 text-center">
                        <div className="flex items-center justify-center">
                          <Eye className="h-4 w-4 text-gray-400 mr-1" />
                          <span className="text-sm font-medium text-gray-900">
                            {formatNumber(post.views)}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-2 text-center">
                        <div className="flex items-center justify-center">
                          <Heart className="h-4 w-4 text-gray-400 mr-1" />
                          <span className="text-sm font-medium text-gray-900">
                            {formatNumber(post.likes)}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-2 text-center">
                        <div className="flex items-center justify-center">
                          <MessageCircle className="h-4 w-4 text-gray-400 mr-1" />
                          <span className="text-sm font-medium text-gray-900">
                            {formatNumber(post.comments)}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-2 text-center">
                        <div className="flex items-center justify-center">
                          <Share className="h-4 w-4 text-gray-400 mr-1" />
                          <span className="text-sm font-medium text-gray-900">
                            {formatNumber(post.shares)}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-2 text-right text-sm text-gray-500">
                        {post.publishedAt}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Analytics
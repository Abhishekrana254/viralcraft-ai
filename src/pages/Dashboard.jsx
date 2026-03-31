import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  PlusCircle,
  TrendingUp,
  Users,
  Eye,
  Heart,
  MessageCircle,
  Calendar,
  Zap,
  Youtube,
  Instagram,
  Twitter,
  ArrowUpRight,
  BarChart3
} from 'lucide-react'
import { useAuthStore } from '../store/authStore'

const Dashboard = () => {
  const { user } = useAuthStore()

  const stats = [
    {
      title: 'Total Views',
      value: '2.4M',
      change: '+12.5%',
      icon: Eye,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Engagement Rate',
      value: '8.7%',
      change: '+2.3%',
      icon: Heart,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50'
    },
    {
      title: 'Followers Growth',
      value: '15.2K',
      change: '+18.4%',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Content Generated',
      value: '847',
      change: '+45.2%',
      icon: Zap,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ]

  const recentPosts = [
    {
      id: 1,
      platform: 'youtube',
      title: '10 AI Tools That Will Change Your Life',
      views: '125K',
      likes: '8.2K',
      comments: '432',
      status: 'published',
      publishedAt: '2 hours ago'
    },
    {
      id: 2,
      platform: 'instagram',
      title: 'Daily motivation for entrepreneurs',
      views: '45K',
      likes: '3.1K',
      comments: '187',
      status: 'scheduled',
      publishedAt: 'Tomorrow at 9:00 AM'
    },
    {
      id: 3,
      platform: 'twitter',
      title: 'Thread: How I grew my following with AI',
      views: '28K',
      likes: '1.8K',
      comments: '95',
      status: 'published',
      publishedAt: '1 day ago'
    }
  ]

  const upcomingTasks = [
    {
      id: 1,
      title: 'Review and approve 5 pending posts',
      time: '2:00 PM',
      priority: 'high'
    },
    {
      id: 2,
      title: 'YouTube video upload: "AI Marketing Tips"',
      time: '4:30 PM',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Engage with comments on Instagram',
      time: '6:00 PM',
      priority: 'low'
    }
  ]

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'youtube':
        return Youtube
      case 'instagram':
        return Instagram
      case 'twitter':
        return Twitter
      default:
        return Zap
    }
  }

  const getPlatformColor = (platform) => {
    switch (platform) {
      case 'youtube':
        return 'text-red-600'
      case 'instagram':
        return 'text-pink-600'
      case 'twitter':
        return 'text-blue-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-gray-600 mt-2">
              Here's what's happening with your content today
            </p>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <Link
            to="/create"
            className="card p-6 hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600">
                  Create Content
                </h3>
                <p className="text-gray-600 text-sm">Generate AI-powered posts</p>
              </div>
              <PlusCircle className="h-8 w-8 text-purple-600 group-hover:scale-110 transition-transform" />
            </div>
          </Link>

          <Link
            to="/analytics"
            className="card p-6 hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                  Analytics
                </h3>
                <p className="text-gray-600 text-sm">View detailed insights</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-600 group-hover:scale-110 transition-transform" />
            </div>
          </Link>

          <div className="card p-6 hover:shadow-md transition-all duration-200 group cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600">
                  Schedule Posts
                </h3>
                <p className="text-gray-600 text-sm">Plan your content calendar</p>
              </div>
              <Calendar className="h-8 w-8 text-green-600 group-hover:scale-110 transition-transform" />
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={stat.title} className="card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    <p className="text-sm text-green-600 mt-1 flex items-center">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      {stat.change}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </div>
            )
          })}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Posts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2 card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Posts</h2>
              <Link to="/analytics" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                View all
              </Link>
            </div>

            <div className="space-y-4">
              {recentPosts.map((post) => {
                const PlatformIcon = getPlatformIcon(post.platform)
                return (
                  <div key={post.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-white rounded-lg">
                        <PlatformIcon className={`h-5 w-5 ${getPlatformColor(post.platform)}`} />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{post.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <span className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            {post.views}
                          </span>
                          <span className="flex items-center">
                            <Heart className="h-4 w-4 mr-1" />
                            {post.likes}
                          </span>
                          <span className="flex items-center">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            {post.comments}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          post.status === 'published'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {post.status}
                      </span>
                      <p className="text-sm text-gray-500 mt-1">{post.publishedAt}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Upcoming Tasks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Today's Tasks</h2>
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>

            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-start space-x-3">
                  <div
                    className={`w-3 h-3 rounded-full mt-1 ${
                      task.priority === 'high'
                        ? 'bg-red-400'
                        : task.priority === 'medium'
                        ? 'bg-yellow-400'
                        : 'bg-green-400'
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{task.title}</p>
                    <p className="text-xs text-gray-500">{task.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 py-2 px-4 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors font-medium text-sm">
              View Full Calendar
            </button>
          </motion.div>
        </div>

        {/* Performance Chart Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="card p-6 mt-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Performance Overview</h2>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm bg-purple-100 text-purple-600 rounded-lg">7D</button>
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">30D</button>
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">90D</button>
            </div>
          </div>

          <div className="h-64 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <p className="text-gray-600">Interactive charts coming soon!</p>
              <p className="text-sm text-gray-500">Track your content performance over time</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard
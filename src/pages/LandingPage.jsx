import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Zap,
  Sparkles,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  PlayCircle,
  ArrowRight,
  Star,
  Youtube,
  Instagram,
  Twitter
} from 'lucide-react'

const LandingPage = () => {
  const features = [
    {
      icon: Zap,
      title: 'AI-Powered Content Creation',
      description: 'Generate viral content ideas, scripts, and posts in seconds with our advanced AI models.'
    },
    {
      icon: Clock,
      title: 'Automate Everything',
      description: 'Schedule posts, reply to comments, and manage multiple platforms on autopilot.'
    },
    {
      icon: TrendingUp,
      title: 'Trend Analysis',
      description: 'Stay ahead with real-time trend analysis and performance optimization suggestions.'
    },
    {
      icon: Users,
      title: 'Multi-Platform Support',
      description: 'Manage YouTube, Instagram, TikTok, Twitter, and more from one dashboard.'
    }
  ]

  const testimonials = [
    {
      name: 'Raj Kumar',
      role: 'YouTube Creator',
      followers: '2.5M',
      content: 'ViralCraft AI helped me grow from 100K to 2.5M subscribers in just 6 months. The content suggestions are incredible!',
      rating: 5
    },
    {
      name: 'Priya Sharma',
      role: 'Instagram Influencer',
      followers: '890K',
      content: 'I save 15 hours per week with ViralCraft AI. The automation features are a game-changer for content creators.',
      rating: 5
    },
    {
      name: 'Arjun Singh',
      role: 'Digital Marketer',
      followers: '1.2M',
      content: 'The AI-generated content performs 300% better than my manual posts. ROI is incredible!',
      rating: 5
    }
  ]

  const stats = [
    { number: '50K+', label: 'Active Creators' },
    { number: '10M+', label: 'Content Pieces Generated' },
    { number: '400%', label: 'Average Growth Increase' },
    { number: '15hrs', label: 'Saved Per Week' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
            >
              Create Viral Content
              <br />
              <span className="text-gradient">Effortlessly</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto"
            >
              AI-powered platform that automates your content creation, scheduling, and optimization across all social media platforms.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Link to="/signup" className="btn-primary text-lg">
                <Sparkles className="mr-2 h-5 w-5" />
                Start Creating for Free
              </Link>
              <button className="btn-secondary text-lg flex items-center justify-center">
                <PlayCircle className="mr-2 h-5 w-5" />
                Watch Demo
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex justify-center space-x-8 text-gray-400"
            >
              <Youtube className="h-8 w-8" />
              <Instagram className="h-8 w-8" />
              <Twitter className="h-8 w-8" />
              <div className="flex items-center">
                <span className="text-sm">+ 10 more platforms</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need to Go Viral
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful AI tools that work together to amplify your content and grow your audience across all platforms.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card p-6 text-center hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Trusted by Top Creators
            </h2>
            <p className="text-xl text-gray-600">
              See what successful creators are saying about ViralCraft AI
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card p-6"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-semibold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">
                      {testimonial.role} • {testimonial.followers} followers
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Ready to Go Viral?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join 50,000+ creators who are already using ViralCraft AI to grow their audience and increase engagement.
          </p>
          <Link to="/signup" className="btn-primary text-lg inline-flex items-center">
            Get Started for Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <p className="text-sm text-gray-500 mt-4">
            No credit card required • 7-day free trial • Cancel anytime
          </p>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
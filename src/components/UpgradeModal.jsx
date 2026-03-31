import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { X, Crown, Sparkles, Zap, ArrowRight } from 'lucide-react'

const UpgradeModal = ({ isOpen, onClose, currentPlan, remainingGenerations }) => {
  if (!isOpen) return null

  const plans = {
    free: {
      name: 'Free',
      limit: '5 AI generations/month',
      current: true
    },
    starter: {
      name: 'Starter',
      price: '$29',
      limit: '50 AI generations/month',
      features: ['3 platforms', 'Basic templates', 'Standard support']
    },
    creator: {
      name: 'Creator',
      price: '$79',
      limit: 'Unlimited generations',
      features: ['All platforms', 'Premium templates', 'Priority support', 'Auto-posting'],
      popular: true
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Crown className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Upgrade Required</h2>
                <p className="text-sm text-gray-600">Unlock unlimited AI power</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Current Status */}
        <div className="p-6 bg-red-50 border-b border-gray-200">
          <div className="text-center">
            <div className="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full mb-3">
              <Zap className="h-4 w-4 mr-1" />
              Limit Reached
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              You've used all {plans[currentPlan]?.limit || '5 generations'} this month
            </h3>
            <p className="text-gray-600 text-sm">
              Upgrade to continue creating viral content with AI
            </p>
          </div>
        </div>

        {/* Plans */}
        <div className="p-6">
          <div className="space-y-4">
            {Object.entries(plans).map(([planId, plan]) => {
              if (planId === currentPlan) return null

              return (
                <div
                  key={planId}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    plan.popular
                      ? 'border-purple-300 bg-purple-50 ring-2 ring-purple-100'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-gray-900">{plan.name}</h4>
                        {plan.popular && (
                          <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{plan.limit}</p>
                      {plan.features && (
                        <ul className="text-xs text-gray-500 mt-2 space-y-1">
                          {plan.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center">
                              <div className="w-1 h-1 bg-gray-400 rounded-full mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">{plan.price}</div>
                      <div className="text-xs text-gray-500">/month</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* CTA Button */}
          <div className="mt-6">
            <Link
              to="/pricing"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
            >
              <Sparkles className="h-5 w-5 mr-2" />
              Upgrade Now
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>

          {/* Benefits */}
          <div className="mt-6 p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Why upgrade?</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>✨ Unlimited AI content generation</li>
              <li>🚀 Advanced viral content templates</li>
              <li>📈 Auto-posting to all platforms</li>
              <li>💡 Priority customer support</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default UpgradeModal
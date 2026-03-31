import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  CheckCircle,
  X,
  Zap,
  Crown,
  Star,
  Sparkles,
  ArrowRight,
  Users,
  BarChart3,
  Calendar,
  MessageSquare,
  Palette,
  Globe
} from 'lucide-react'

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false)

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for individual creators getting started',
      icon: Zap,
      monthlyPrice: 29,
      annualPrice: 290,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      popular: false,
      features: [
        'Generate up to 50 AI posts per month',
        '3 social media platforms',
        'Basic content templates',
        'Standard support',
        'Analytics dashboard',
        'Content scheduling (up to 10 posts)',
      ],
      limitations: [
        'Limited to 50 posts/month',
        'Basic templates only',
        'Standard support only'
      ]
    },
    {
      id: 'creator',
      name: 'Creator',
      description: 'Ideal for growing influencers and content creators',
      icon: Crown,
      monthlyPrice: 79,
      annualPrice: 790,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-300',
      popular: true,
      features: [
        'Generate unlimited AI content',
        'All social media platforms',
        'Premium content templates',
        'Advanced AI customization',
        'Priority support',
        'Detailed analytics & insights',
        'Unlimited scheduling',
        'Auto-posting',
        'Comment auto-replies',
        'Hashtag optimization',
        'Competitor analysis'
      ],
      limitations: [
        'Single user account'
      ]
    },
    {
      id: 'agency',
      name: 'Agency',
      description: 'For teams and agencies managing multiple clients',
      icon: Users,
      monthlyPrice: 199,
      annualPrice: 1990,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      popular: false,
      features: [
        'Everything in Creator plan',
        'Up to 10 team members',
        'Client management dashboard',
        'White-label reports',
        'Advanced team collaboration',
        'Custom branding',
        'API access',
        'Dedicated account manager',
        'Custom integrations',
        'Advanced workflow automation',
        'Priority feature requests'
      ],
      limitations: []
    }
  ]

  const featuresComparison = [
    {
      category: 'Content Generation',
      features: [
        { name: 'AI Posts per month', starter: '50', creator: 'Unlimited', agency: 'Unlimited' },
        { name: 'Platforms supported', starter: '3', creator: 'All', agency: 'All' },
        { name: 'Content templates', starter: 'Basic', creator: 'Premium', agency: 'Premium + Custom' },
        { name: 'AI customization', starter: false, creator: true, agency: true }
      ]
    },
    {
      category: 'Automation',
      features: [
        { name: 'Auto-posting', starter: false, creator: true, agency: true },
        { name: 'Scheduled posts', starter: '10', creator: 'Unlimited', agency: 'Unlimited' },
        { name: 'Auto-replies', starter: false, creator: true, agency: true },
        { name: 'Hashtag optimization', starter: false, creator: true, agency: true }
      ]
    },
    {
      category: 'Analytics & Support',
      features: [
        { name: 'Analytics dashboard', starter: true, creator: true, agency: true },
        { name: 'Detailed insights', starter: false, creator: true, agency: true },
        { name: 'White-label reports', starter: false, creator: false, agency: true },
        { name: 'Support level', starter: 'Standard', creator: 'Priority', agency: 'Dedicated' }
      ]
    }
  ]

  const faqs = [
    {
      question: 'Can I change plans anytime?',
      answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.'
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes, we offer a 7-day free trial for all plans. No credit card required to start.'
    },
    {
      question: 'What platforms do you support?',
      answer: 'We support YouTube, Instagram, TikTok, Twitter, LinkedIn, Facebook, Pinterest, and more. New platforms are added regularly.'
    },
    {
      question: 'How does the AI content generation work?',
      answer: 'Our AI uses advanced language models trained on viral content patterns to generate engaging posts, scripts, and captions tailored to your audience and brand voice.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'Yes, we offer a 30-day money-back guarantee. If you\'re not satisfied with our service, we\'ll provide a full refund.'
    },
    {
      question: 'Can I cancel anytime?',
      answer: 'Absolutely. You can cancel your subscription at any time. You\'ll continue to have access until the end of your billing period.'
    }
  ]

  const getPrice = (plan) => {
    return isAnnual ? plan.annualPrice : plan.monthlyPrice
  }

  const getSavings = (plan) => {
    const annualMonthly = plan.annualPrice / 12
    const savings = ((plan.monthlyPrice - annualMonthly) / plan.monthlyPrice) * 100
    return Math.round(savings)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="gradient-bg py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            Simple, Transparent
            <span className="text-gradient block">Pricing</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
          >
            Choose the perfect plan to supercharge your content creation with AI.
            All plans include our core features with no hidden fees.
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center justify-center mb-12"
          >
            <span className={`mr-3 ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isAnnual ? 'bg-purple-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`ml-3 ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
              Annual
            </span>
            <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
              Save up to 30%
            </span>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 -mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => {
              const Icon = plan.icon
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative bg-white rounded-2xl shadow-lg border-2 ${
                    plan.popular ? 'border-purple-300 scale-105' : plan.borderColor
                  } overflow-hidden`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-center py-2 text-sm font-medium">
                      <Star className="inline-block h-4 w-4 mr-1" />
                      Most Popular
                    </div>
                  )}

                  <div className={`p-8 ${plan.popular ? 'pt-16' : ''}`}>
                    <div className="flex items-center mb-4">
                      <div className={`p-3 rounded-lg ${plan.bgColor} mr-3`}>
                        <Icon className={`h-6 w-6 ${plan.color}`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                        <p className="text-gray-600 text-sm">{plan.description}</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex items-baseline">
                        <span className="text-5xl font-bold text-gray-900">
                          ${getPrice(plan)}
                        </span>
                        <span className="text-gray-600 ml-2">
                          /{isAnnual ? 'year' : 'month'}
                        </span>
                      </div>
                      {isAnnual && (
                        <p className="text-green-600 text-sm font-medium mt-1">
                          Save {getSavings(plan)}% with annual billing
                        </p>
                      )}
                    </div>

                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      to="/signup"
                      className={`w-full py-3 px-6 rounded-lg font-semibold text-center block transition-all duration-200 ${
                        plan.popular
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                      }`}
                    >
                      {plan.popular ? 'Get Started' : 'Choose Plan'}
                    </Link>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Compare Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See exactly what's included in each plan to make the best choice for your needs.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-6 text-lg font-semibold text-gray-900">Features</th>
                  <th className="text-center py-4 px-6">
                    <div className="text-lg font-semibold text-gray-900">Starter</div>
                    <div className="text-sm text-gray-500">${plans[0].monthlyPrice}/month</div>
                  </th>
                  <th className="text-center py-4 px-6 bg-purple-50 relative">
                    <div className="absolute top-0 left-0 right-0 bg-purple-600 text-white text-xs py-1 text-center">
                      Most Popular
                    </div>
                    <div className="text-lg font-semibold text-gray-900 mt-4">Creator</div>
                    <div className="text-sm text-gray-500">${plans[1].monthlyPrice}/month</div>
                  </th>
                  <th className="text-center py-4 px-6">
                    <div className="text-lg font-semibold text-gray-900">Agency</div>
                    <div className="text-sm text-gray-500">${plans[2].monthlyPrice}/month</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {featuresComparison.map((category, categoryIndex) => (
                  <React.Fragment key={category.category}>
                    <tr className="bg-gray-50">
                      <td colSpan={4} className="py-3 px-6 font-semibold text-gray-900">
                        {category.category}
                      </td>
                    </tr>
                    {category.features.map((feature, featureIndex) => (
                      <tr key={featureIndex} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-6 text-gray-700">{feature.name}</td>
                        <td className="py-3 px-6 text-center">
                          {typeof feature.starter === 'boolean' ? (
                            feature.starter ? (
                              <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-gray-300 mx-auto" />
                            )
                          ) : (
                            <span className="text-gray-700">{feature.starter}</span>
                          )}
                        </td>
                        <td className="py-3 px-6 text-center bg-purple-50">
                          {typeof feature.creator === 'boolean' ? (
                            feature.creator ? (
                              <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-gray-300 mx-auto" />
                            )
                          ) : (
                            <span className="text-gray-700">{feature.creator}</span>
                          )}
                        </td>
                        <td className="py-3 px-6 text-center">
                          {typeof feature.agency === 'boolean' ? (
                            feature.agency ? (
                              <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-gray-300 mx-auto" />
                            )
                          ) : (
                            <span className="text-gray-700">{feature.agency}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 gradient-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">
              Got questions? We've got answers. Can't find what you're looking for?{' '}
              <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">
                Contact us
              </a>
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Sparkles className="h-12 w-12 text-purple-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Go Viral with AI?
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Join thousands of creators who are already using ViralCraft AI to grow their audience
              and create engaging content effortlessly.
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <p className="text-gray-400 text-sm mt-4">
              No credit card required • 7-day free trial • Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Pricing
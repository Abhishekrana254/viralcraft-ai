import React from 'react'
import { motion } from 'framer-motion'
import { Shield, ArrowLeft, CheckCircle, Lock, Eye, Database, Users } from 'lucide-react'
import { Link } from 'react-router-dom'

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <div className="mt-4">
            <Link
              to="/"
              className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="prose prose-lg max-w-none">
            <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <p className="text-blue-900 font-medium mb-1">Last Updated: {new Date().toLocaleDateString()}</p>
                  <p className="text-blue-800 text-sm">
                    This Privacy Policy is effective immediately and applies to all users of ViralCraft AI.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Database className="h-6 w-6 text-purple-600 mr-2" />
              Information We Collect
            </h2>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Personal Information</h3>
            <ul className="space-y-2 mb-6">
              <li>• <strong>Account Information:</strong> Name, email address, profile information</li>
              <li>• <strong>Social Media Accounts:</strong> When you connect your social media accounts (YouTube, Instagram, Twitter), we access your profile information and posting permissions</li>
              <li>• <strong>Content Data:</strong> AI-generated content you create using our platform</li>
              <li>• <strong>Usage Analytics:</strong> How you interact with our platform, features used, and performance data</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Social Media Platform Access</h3>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-6">
              <p className="text-yellow-800">
                <strong>Important:</strong> When you connect social media accounts, we only access the minimum permissions necessary to post content on your behalf. We never access private messages, personal posts, or other sensitive data.
              </p>
            </div>

            <ul className="space-y-2 mb-6">
              <li>• <strong>YouTube:</strong> Channel information, video upload permissions, account statistics</li>
              <li>• <strong>Instagram:</strong> Business/Creator account info, posting permissions (requires Business or Creator account)</li>
              <li>• <strong>Twitter:</strong> Profile information, tweet posting permissions</li>
              <li>• <strong>Facebook:</strong> Page management permissions (for Facebook Pages only)</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Eye className="h-6 w-6 text-purple-600 mr-2" />
              How We Use Your Information
            </h2>

            <ul className="space-y-2 mb-6">
              <li>• <strong>Content Creation:</strong> Generate AI-powered content based on your inputs and preferences</li>
              <li>• <strong>Social Media Posting:</strong> Post content to your connected social media accounts as instructed</li>
              <li>• <strong>Analytics & Insights:</strong> Provide performance analytics and content recommendations</li>
              <li>• <strong>Account Management:</strong> Manage your subscription, usage limits, and account settings</li>
              <li>• <strong>Platform Improvement:</strong> Analyze usage patterns to improve our services (anonymized data only)</li>
              <li>• <strong>Customer Support:</strong> Respond to your questions and provide technical assistance</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Users className="h-6 w-6 text-purple-600 mr-2" />
              Information Sharing
            </h2>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-6">
              <p className="text-green-800">
                <strong>We do NOT sell your personal information.</strong> We only share information in the limited circumstances described below.
              </p>
            </div>

            <ul className="space-y-2 mb-6">
              <li>• <strong>Social Media Platforms:</strong> When you authorize posting, we send content to your connected accounts (YouTube, Instagram, Twitter, etc.)</li>
              <li>• <strong>Service Providers:</strong> Trusted third-party services that help us operate our platform (hosting, analytics, customer support)</li>
              <li>• <strong>Legal Requirements:</strong> If required by law, regulation, or legal process</li>
              <li>• <strong>Business Transfers:</strong> In case of merger, acquisition, or sale of business assets</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Lock className="h-6 w-6 text-purple-600 mr-2" />
              Data Security & Storage
            </h2>

            <ul className="space-y-2 mb-6">
              <li>• <strong>Encryption:</strong> All data transmitted to and from our servers is encrypted using industry-standard SSL/TLS</li>
              <li>• <strong>Access Control:</strong> Your social media tokens are securely stored and only used for authorized posting</li>
              <li>• <strong>Data Retention:</strong> We retain your data only as long as necessary to provide our services</li>
              <li>• <strong>Regular Audits:</strong> We regularly review our security practices and update them as needed</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights & Controls</h2>

            <ul className="space-y-2 mb-6">
              <li>• <strong>Access:</strong> Request a copy of your personal information</li>
              <li>• <strong>Correction:</strong> Update or correct your personal information</li>
              <li>• <strong>Deletion:</strong> Request deletion of your account and associated data</li>
              <li>• <strong>Disconnection:</strong> Disconnect social media accounts at any time</li>
              <li>• <strong>Data Portability:</strong> Request your data in a machine-readable format</li>
              <li>• <strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Social Media Platform Policies</h2>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
              <p className="text-blue-800 mb-2">
                <strong>Important:</strong> Your use of connected social media platforms is subject to their respective privacy policies and terms of service:
              </p>
              <ul className="space-y-1 text-blue-700">
                <li>• <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline">Google/YouTube Privacy Policy</a></li>
                <li>• <a href="https://help.instagram.com/519522125107875" target="_blank" rel="noopener noreferrer" className="underline">Instagram Privacy Policy</a></li>
                <li>• <a href="https://twitter.com/privacy" target="_blank" rel="noopener noreferrer" className="underline">Twitter Privacy Policy</a></li>
                <li>• <a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer" className="underline">Facebook Privacy Policy</a></li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies & Tracking</h2>

            <ul className="space-y-2 mb-6">
              <li>• <strong>Essential Cookies:</strong> Required for basic platform functionality and user authentication</li>
              <li>• <strong>Analytics Cookies:</strong> Help us understand how users interact with our platform (Google Analytics)</li>
              <li>• <strong>Social Media Tokens:</strong> Stored securely to maintain your connected account sessions</li>
              <li>• <strong>Preference Cookies:</strong> Remember your settings and preferences</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">International Users</h2>

            <p className="mb-6">
              ViralCraft AI is operated from the United States. If you are accessing our service from outside the US, please be aware that your information may be transferred to, stored, and processed in the US where our servers are located and our central database is operated.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>

            <p className="mb-6">
              Our service is not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information, please contact us immediately.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>

            <p className="mb-6">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this policy.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>

            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
              <h3 className="text-xl font-semibold mb-4">Questions About Your Privacy?</h3>
              <p className="mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <ul className="space-y-2">
                <li>• <strong>Email:</strong> privacy@viralcraft.ai</li>
                <li>• <strong>Support:</strong> Visit our help center or contact customer support</li>
                <li>• <strong>Address:</strong> ViralCraft AI Privacy Team</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
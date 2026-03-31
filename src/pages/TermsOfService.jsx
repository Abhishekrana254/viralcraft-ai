import React from 'react'
import { motion } from 'framer-motion'
import { FileText, ArrowLeft, CheckCircle, AlertTriangle, Gavel, CreditCard, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'

const TermsOfService = () => {
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
              <FileText className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Please read these terms carefully before using ViralCraft AI. By using our service, you agree to these terms.
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
                    These Terms of Service are effective immediately and apply to all users of ViralCraft AI.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>

            <p className="mb-6">
              By accessing and using ViralCraft AI ("Service", "Platform", "We", "Our"), you accept and agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Service.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Gavel className="h-6 w-6 text-purple-600 mr-2" />
              2. Service Description
            </h2>

            <p className="mb-4">ViralCraft AI provides:</p>
            <ul className="space-y-2 mb-6">
              <li>• <strong>AI Content Generation:</strong> Automated creation of social media content using artificial intelligence</li>
              <li>• <strong>Social Media Integration:</strong> Direct posting to connected social media platforms (YouTube, Instagram, Twitter, Facebook)</li>
              <li>• <strong>Content Scheduling:</strong> Automated posting at optimal times across multiple platforms</li>
              <li>• <strong>Analytics & Insights:</strong> Performance tracking and content optimization recommendations</li>
              <li>• <strong>Content Management:</strong> Organization and management of your created content</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Account Requirements</h2>

            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 mb-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-orange-600 mt-1" />
                <div>
                  <p className="text-orange-800 font-medium mb-1">Important Account Requirements:</p>
                  <ul className="text-orange-700 text-sm space-y-1">
                    <li>• <strong>Age:</strong> You must be at least 18 years old to use this service</li>
                    <li>• <strong>Instagram:</strong> Business or Creator account required for connection</li>
                    <li>• <strong>YouTube:</strong> Google account must be linked to your YouTube channel</li>
                    <li>• <strong>Accuracy:</strong> All account information must be accurate and up-to-date</li>
                  </ul>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Social Media Platform Integration</h2>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Platform Requirements</h3>
            <ul className="space-y-2 mb-4">
              <li>• <strong>YouTube:</strong> Active YouTube channel with Google account linked. You must have upload permissions.</li>
              <li>• <strong>Instagram:</strong> Business or Creator account required. Personal accounts cannot be connected.</li>
              <li>• <strong>Twitter:</strong> Active Twitter account with posting permissions.</li>
              <li>• <strong>Facebook:</strong> Facebook Page access (personal profiles not supported).</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Platform Compliance</h3>
            <div className="bg-red-50 p-4 rounded-lg border border-red-200 mb-6">
              <p className="text-red-800">
                <strong>Critical:</strong> You are responsible for ensuring all content posted through ViralCraft AI complies with each platform's community guidelines, terms of service, and content policies. Violations may result in account suspension or termination by the respective platforms.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <CreditCard className="h-6 w-6 text-purple-600 mr-2" />
              5. Subscription & Billing
            </h2>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Subscription Plans</h3>
            <ul className="space-y-2 mb-4">
              <li>• <strong>Free Plan:</strong> 5 AI content generations per month</li>
              <li>• <strong>Starter Plan:</strong> $29/month - 50 content generations</li>
              <li>• <strong>Creator Plan:</strong> $79/month - Unlimited content generations</li>
              <li>• <strong>Agency Plan:</strong> $199/month - Team features and priority support</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Billing Terms</h3>
            <ul className="space-y-2 mb-6">
              <li>• <strong>Billing Cycle:</strong> Monthly subscriptions are billed in advance</li>
              <li>• <strong>Auto-Renewal:</strong> Subscriptions automatically renew unless cancelled</li>
              <li>• <strong>Price Changes:</strong> We may change prices with 30 days notice</li>
              <li>• <strong>Refunds:</strong> No refunds for partial months of service</li>
              <li>• <strong>Usage Limits:</strong> Exceeding plan limits may result in additional charges or service suspension</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Acceptable Use Policy</h2>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Permitted Uses</h3>
            <ul className="space-y-2 mb-4">
              <li>• Creating original, high-quality content for your own social media accounts</li>
              <li>• Managing content for clients (with proper authorization)</li>
              <li>• Educational and commercial content creation within platform guidelines</li>
              <li>• Building your personal or business brand through authentic content</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Prohibited Uses</h3>
            <div className="bg-red-50 p-4 rounded-lg border border-red-200 mb-6">
              <p className="text-red-800 font-medium mb-2">You may NOT use ViralCraft AI to:</p>
              <ul className="text-red-700 space-y-1 text-sm">
                <li>• Generate spam, misleading, or deceptive content</li>
                <li>• Create content that violates platform community guidelines</li>
                <li>• Impersonate others or create fake accounts</li>
                <li>• Generate content promoting illegal activities</li>
                <li>• Create hate speech, harassment, or discriminatory content</li>
                <li>• Violate intellectual property rights</li>
                <li>• Engage in coordinated inauthentic behavior</li>
                <li>• Use the service for competitive analysis or reverse engineering</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Content & Intellectual Property</h2>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Your Content</h3>
            <ul className="space-y-2 mb-4">
              <li>• You retain ownership of content you create using ViralCraft AI</li>
              <li>• You are responsible for ensuring your content doesn't infringe on others' rights</li>
              <li>• You grant us a limited license to process and post your content as instructed</li>
              <li>• You represent that you have the right to use all elements in your content</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Our Service</h3>
            <ul className="space-y-2 mb-6">
              <li>• ViralCraft AI platform, AI models, and technology remain our property</li>
              <li>• You may not copy, modify, or create derivative works of our service</li>
              <li>• Our trademarks, logos, and brand elements are protected</li>
              <li>• We may use anonymized usage data to improve our service</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Shield className="h-6 w-6 text-purple-600 mr-2" />
              8. Privacy & Data Security
            </h2>

            <p className="mb-6">
              Your privacy is important to us. Our use of your personal information is governed by our
              <Link to="/privacy-policy" className="text-purple-600 hover:text-purple-700 font-medium"> Privacy Policy</Link>,
              which is incorporated into these Terms by reference. Key points:
            </p>

            <ul className="space-y-2 mb-6">
              <li>• We securely store your social media tokens and use them only for authorized posting</li>
              <li>• We do not sell or share your personal information with third parties</li>
              <li>• You can disconnect social media accounts and delete your data at any time</li>
              <li>• We implement industry-standard security measures to protect your data</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Service Availability & Support</h2>

            <ul className="space-y-2 mb-6">
              <li>• <strong>Uptime:</strong> We strive for 99.9% uptime but cannot guarantee uninterrupted service</li>
              <li>• <strong>Maintenance:</strong> Planned maintenance will be announced in advance when possible</li>
              <li>• <strong>Support:</strong> Customer support available via email and in-app messaging</li>
              <li>• <strong>Updates:</strong> We regularly update and improve our service</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Limitation of Liability</h2>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-6">
              <p className="text-yellow-800">
                <strong>Important:</strong> ViralCraft AI is provided "as is" without warranties. We are not liable for any damages arising from your use of the service, including but not limited to account suspensions on social media platforms, lost content, or business interruption.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Account Termination</h2>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">By You</h3>
            <ul className="space-y-2 mb-4">
              <li>• You may cancel your subscription at any time through your account settings</li>
              <li>• Cancellation takes effect at the end of the current billing period</li>
              <li>• You can request account deletion and data removal</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">By Us</h3>
            <ul className="space-y-2 mb-6">
              <li>• We may suspend or terminate accounts that violate these Terms</li>
              <li>• We may terminate the service with 30 days notice</li>
              <li>• Immediate termination for severe violations or illegal activity</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Changes to Terms</h2>

            <p className="mb-6">
              We may modify these Terms from time to time. We will notify you of significant changes via email or through the platform. Continued use of the service after changes constitutes acceptance of the new Terms.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Governing Law</h2>

            <p className="mb-6">
              These Terms are governed by the laws of the United States and the State of California. Any disputes will be resolved in the courts of California.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Contact Information</h2>

            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
              <h3 className="text-xl font-semibold mb-4">Questions About These Terms?</h3>
              <p className="mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <ul className="space-y-2">
                <li>• <strong>Email:</strong> legal@viralcraft.ai</li>
                <li>• <strong>Support:</strong> support@viralcraft.ai</li>
                <li>• <strong>Address:</strong> ViralCraft AI Legal Team</li>
              </ul>
              <div className="mt-4 pt-4 border-t border-purple-400">
                <p className="text-sm text-purple-100">
                  By using ViralCraft AI, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default TermsOfService
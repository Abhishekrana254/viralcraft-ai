import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import axios from 'axios'

const OAuthCallback = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [status, setStatus] = useState('processing') // processing, success, error
  const [message, setMessage] = useState('Connecting your account...')
  const [platform, setPlatform] = useState('')

  useEffect(() => {
    const handleOAuthCallback = async () => {
      const urlParams = new URLSearchParams(location.search)
      const code = urlParams.get('code')
      const state = urlParams.get('state')
      const error = urlParams.get('error')
      const platform = location.pathname.split('/auth/')[1]

      setPlatform(platform)

      if (error) {
        setStatus('error')
        setMessage(`${platform} connection was cancelled or failed`)
        return
      }

      if (!code) {
        setStatus('error')
        setMessage('No authorization code received')
        return
      }

      try {
        setMessage(`Completing ${platform} connection...`)

        // Exchange code for access token
        const result = await exchangeCodeForToken(platform, code)

        if (result.success) {
          // Store tokens
          localStorage.setItem(`${platform}_access_token`, result.accessToken)
          if (result.refreshToken) {
            localStorage.setItem(`${platform}_refresh_token`, result.refreshToken)
          }

          setStatus('success')
          setMessage(`${platform} connected successfully!`)

          // Close popup and notify parent
          if (window.opener) {
            window.opener.postMessage({
              type: 'oauth_success',
              platform,
              data: result
            }, window.location.origin)
            window.close()
          } else {
            // Redirect to connections page
            setTimeout(() => navigate('/connections'), 2000)
          }
        } else {
          throw new Error(result.error)
        }
      } catch (error) {
        console.error(`${platform} OAuth error:`, error)
        setStatus('error')
        setMessage(`Failed to connect ${platform}: ${error.message}`)
      }
    }

    handleOAuthCallback()
  }, [location, navigate])

  const exchangeCodeForToken = async (platform, code) => {
    try {
      switch (platform) {
        case 'youtube':
          return await exchangeYouTubeCode(code)
        case 'instagram':
          return await exchangeInstagramCode(code)
        case 'twitter':
          return await exchangeTwitterCode(code)
        default:
          throw new Error(`Unsupported platform: ${platform}`)
      }
    } catch (error) {
      console.error('Token exchange failed:', error)
      return { success: false, error: error.message }
    }
  }

  const exchangeYouTubeCode = async (code) => {
    const clientId = import.meta.env.VITE_YOUTUBE_CLIENT_ID
    const clientSecret = import.meta.env.VITE_YOUTUBE_CLIENT_SECRET
    const redirectUri = `${window.location.origin}/auth/youtube`

    const response = await axios.post('https://oauth2.googleapis.com/token', {
      client_id: clientId,
      client_secret: clientSecret,
      code: code,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri
    })

    return {
      success: true,
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token,
      expiresIn: response.data.expires_in
    }
  }

  const exchangeInstagramCode = async (code) => {
    const clientId = import.meta.env.VITE_INSTAGRAM_CLIENT_ID
    const clientSecret = import.meta.env.VITE_INSTAGRAM_CLIENT_SECRET
    const redirectUri = `${window.location.origin}/auth/instagram`

    // Step 1: Exchange code for short-lived token
    const shortTokenResponse = await axios.post('https://api.instagram.com/oauth/access_token', {
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri,
      code: code
    })

    // Step 2: Exchange for long-lived token
    const longTokenResponse = await axios.get('https://graph.instagram.com/access_token', {
      params: {
        grant_type: 'ig_exchange_token',
        client_secret: clientSecret,
        access_token: shortTokenResponse.data.access_token
      }
    })

    return {
      success: true,
      accessToken: longTokenResponse.data.access_token,
      expiresIn: longTokenResponse.data.expires_in
    }
  }

  const exchangeTwitterCode = async (code) => {
    const clientId = import.meta.env.VITE_TWITTER_CLIENT_ID
    const codeVerifier = localStorage.getItem('twitter_code_verifier')
    const redirectUri = `${window.location.origin}/auth/twitter`

    const response = await axios.post('https://api.twitter.com/2/oauth2/token', {
      client_id: clientId,
      code: code,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri,
      code_verifier: codeVerifier
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    // Clean up code verifier
    localStorage.removeItem('twitter_code_verifier')

    return {
      success: true,
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token,
      expiresIn: response.data.expires_in
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4"
      >
        <div className="text-center">
          {status === 'processing' && (
            <>
              <div className="flex items-center justify-center mb-6">
                <Loader2 className="h-12 w-12 text-purple-600 animate-spin" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Connecting {platform}...
              </h2>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="flex items-center justify-center mb-6">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Connection Successful!
              </h2>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="flex items-center justify-center mb-6">
                <AlertCircle className="h-12 w-12 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Connection Failed
              </h2>
            </>
          )}

          <p className="text-gray-600 mb-6">{message}</p>

          {status === 'success' && (
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-800">
                🎉 Your {platform} account is now connected! You can now create automated content series and schedule posts.
              </p>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-4">
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-sm text-red-800 mb-2">
                  Connection failed. Please try again or contact support if the issue persists.
                </p>
              </div>
              <button
                onClick={() => window.close()}
                className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          )}

          {status === 'processing' && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                Please wait while we securely connect your account...
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default OAuthCallback
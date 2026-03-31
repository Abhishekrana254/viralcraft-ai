// Real Social Media API Integration Service
import axios from 'axios'

class SocialMediaService {
  constructor() {
    this.baseURL = 'https://api.vercel.com' // We'll use Vercel functions as proxy
    this.connections = {}
  }

  // YouTube API Integration
  async connectYouTube() {
    try {
      // Step 1: Redirect to YouTube OAuth
      const clientId = import.meta.env.VITE_YOUTUBE_CLIENT_ID
      const redirectUri = `${window.location.origin}/auth/youtube`
      const scope = 'https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube'

      const authUrl = `https://accounts.google.com/o/oauth2/auth?` +
        `client_id=${clientId}&` +
        `redirect_uri=${redirectUri}&` +
        `scope=${scope}&` +
        `response_type=code&` +
        `access_type=offline&` +
        `prompt=consent`

      // Open OAuth popup
      const popup = window.open(authUrl, 'youtube-auth', 'width=500,height=600')

      return new Promise((resolve, reject) => {
        const checkClosed = setInterval(() => {
          if (popup.closed) {
            clearInterval(checkClosed)
            // Check if authentication was successful
            this.verifyYouTubeConnection().then(resolve).catch(reject)
          }
        }, 1000)
      })
    } catch (error) {
      console.error('YouTube connection failed:', error)
      throw new Error('Failed to connect YouTube account')
    }
  }

  async verifyYouTubeConnection() {
    try {
      const token = localStorage.getItem('youtube_access_token')
      if (!token) throw new Error('No YouTube token found')

      // Verify token by getting channel info
      const response = await axios.get('https://www.googleapis.com/youtube/v3/channels', {
        params: {
          part: 'snippet,statistics',
          mine: true
        },
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const channelData = response.data.items[0]
      this.connections.youtube = {
        connected: true,
        channelId: channelData.id,
        channelName: channelData.snippet.title,
        subscriberCount: channelData.statistics.subscriberCount,
        connectedAt: new Date().toISOString()
      }

      return { success: true, data: this.connections.youtube }
    } catch (error) {
      console.error('YouTube verification failed:', error)
      return { success: false, error: error.message }
    }
  }

  // Instagram Business API Integration
  async connectInstagram() {
    try {
      const clientId = import.meta.env.VITE_INSTAGRAM_CLIENT_ID
      const redirectUri = `${window.location.origin}/auth/instagram`
      const scope = 'instagram_basic,instagram_content_publish,pages_read_engagement'

      const authUrl = `https://api.instagram.com/oauth/authorize?` +
        `client_id=${clientId}&` +
        `redirect_uri=${redirectUri}&` +
        `scope=${scope}&` +
        `response_type=code`

      const popup = window.open(authUrl, 'instagram-auth', 'width=500,height=600')

      return new Promise((resolve, reject) => {
        const checkClosed = setInterval(() => {
          if (popup.closed) {
            clearInterval(checkClosed)
            this.verifyInstagramConnection().then(resolve).catch(reject)
          }
        }, 1000)
      })
    } catch (error) {
      console.error('Instagram connection failed:', error)
      throw new Error('Failed to connect Instagram account')
    }
  }

  async verifyInstagramConnection() {
    try {
      const token = localStorage.getItem('instagram_access_token')
      if (!token) throw new Error('No Instagram token found')

      // Get Instagram Business Account info
      const response = await axios.get(`https://graph.facebook.com/v18.0/me/accounts`, {
        params: {
          access_token: token,
          fields: 'instagram_business_account'
        }
      })

      const igAccount = response.data.data[0]?.instagram_business_account
      if (!igAccount) throw new Error('No Instagram Business account found')

      this.connections.instagram = {
        connected: true,
        accountId: igAccount.id,
        connectedAt: new Date().toISOString()
      }

      return { success: true, data: this.connections.instagram }
    } catch (error) {
      console.error('Instagram verification failed:', error)
      return { success: false, error: error.message }
    }
  }

  // Twitter API v2 Integration
  async connectTwitter() {
    try {
      const clientId = import.meta.env.VITE_TWITTER_CLIENT_ID
      const redirectUri = `${window.location.origin}/auth/twitter`
      const scope = 'tweet.read tweet.write users.read offline.access'

      // Twitter OAuth 2.0 PKCE flow
      const codeVerifier = this.generateCodeVerifier()
      const codeChallenge = await this.generateCodeChallenge(codeVerifier)

      localStorage.setItem('twitter_code_verifier', codeVerifier)

      const authUrl = `https://twitter.com/i/oauth2/authorize?` +
        `response_type=code&` +
        `client_id=${clientId}&` +
        `redirect_uri=${redirectUri}&` +
        `scope=${scope}&` +
        `state=twitter&` +
        `code_challenge=${codeChallenge}&` +
        `code_challenge_method=S256`

      const popup = window.open(authUrl, 'twitter-auth', 'width=500,height=600')

      return new Promise((resolve, reject) => {
        const checkClosed = setInterval(() => {
          if (popup.closed) {
            clearInterval(checkClosed)
            this.verifyTwitterConnection().then(resolve).catch(reject)
          }
        }, 1000)
      })
    } catch (error) {
      console.error('Twitter connection failed:', error)
      throw new Error('Failed to connect Twitter account')
    }
  }

  async verifyTwitterConnection() {
    try {
      const token = localStorage.getItem('twitter_access_token')
      if (!token) throw new Error('No Twitter token found')

      // Get user info
      const response = await axios.get('https://api.twitter.com/2/users/me', {
        params: {
          'user.fields': 'username,name,public_metrics'
        },
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const userData = response.data.data
      this.connections.twitter = {
        connected: true,
        userId: userData.id,
        username: userData.username,
        name: userData.name,
        followers: userData.public_metrics?.followers_count || 0,
        connectedAt: new Date().toISOString()
      }

      return { success: true, data: this.connections.twitter }
    } catch (error) {
      console.error('Twitter verification failed:', error)
      return { success: false, error: error.message }
    }
  }

  // Content Posting Functions

  async postToYouTube(content) {
    try {
      const token = localStorage.getItem('youtube_access_token')
      if (!token) throw new Error('YouTube not connected')

      // Upload video to YouTube
      const uploadResponse = await axios.post('https://www.googleapis.com/upload/youtube/v3/videos', {
        snippet: {
          title: content.title,
          description: content.description,
          tags: content.tags || [],
          categoryId: '22' // People & Blogs
        },
        status: {
          privacyStatus: content.privacy || 'public',
          publishAt: content.scheduledTime || null
        }
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        params: {
          part: 'snippet,status'
        }
      })

      return {
        success: true,
        platform: 'youtube',
        postId: uploadResponse.data.id,
        url: `https://youtube.com/watch?v=${uploadResponse.data.id}`
      }
    } catch (error) {
      console.error('YouTube posting failed:', error)
      return { success: false, error: error.message }
    }
  }

  async postToInstagram(content) {
    try {
      const token = localStorage.getItem('instagram_access_token')
      const accountId = this.connections.instagram?.accountId
      if (!token || !accountId) throw new Error('Instagram not connected')

      // Create media object
      const mediaResponse = await axios.post(`https://graph.facebook.com/v18.0/${accountId}/media`, {
        image_url: content.imageUrl,
        caption: content.caption,
        access_token: token
      })

      // Publish the media
      const publishResponse = await axios.post(`https://graph.facebook.com/v18.0/${accountId}/media_publish`, {
        creation_id: mediaResponse.data.id,
        access_token: token
      })

      return {
        success: true,
        platform: 'instagram',
        postId: publishResponse.data.id,
        url: `https://instagram.com/p/${publishResponse.data.id}`
      }
    } catch (error) {
      console.error('Instagram posting failed:', error)
      return { success: false, error: error.message }
    }
  }

  async postToTwitter(content) {
    try {
      const token = localStorage.getItem('twitter_access_token')
      if (!token) throw new Error('Twitter not connected')

      const response = await axios.post('https://api.twitter.com/2/tweets', {
        text: content.text
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      return {
        success: true,
        platform: 'twitter',
        postId: response.data.data.id,
        url: `https://twitter.com/i/status/${response.data.data.id}`
      }
    } catch (error) {
      console.error('Twitter posting failed:', error)
      return { success: false, error: error.message }
    }
  }

  // Multi-platform posting
  async postToAllPlatforms(content, platforms = ['youtube', 'instagram', 'twitter']) {
    const results = []

    for (const platform of platforms) {
      try {
        let result
        switch (platform) {
          case 'youtube':
            result = await this.postToYouTube(content.youtube || content)
            break
          case 'instagram':
            result = await this.postToInstagram(content.instagram || content)
            break
          case 'twitter':
            result = await this.postToTwitter(content.twitter || content)
            break
          default:
            continue
        }
        results.push({ platform, ...result })
      } catch (error) {
        results.push({
          platform,
          success: false,
          error: error.message
        })
      }
    }

    return results
  }

  // Utility functions
  generateCodeVerifier() {
    const array = new Uint8Array(32)
    crypto.getRandomValues(array)
    return btoa(String.fromCharCode.apply(null, array))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '')
  }

  async generateCodeChallenge(verifier) {
    const encoder = new TextEncoder()
    const data = encoder.encode(verifier)
    const digest = await crypto.subtle.digest('SHA-256', data)
    return btoa(String.fromCharCode.apply(null, new Uint8Array(digest)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '')
  }

  // Get connection status
  getConnectionStatus() {
    return {
      youtube: this.connections.youtube?.connected || false,
      instagram: this.connections.instagram?.connected || false,
      twitter: this.connections.twitter?.connected || false,
      facebook: this.connections.facebook?.connected || false
    }
  }

  // Disconnect platform
  async disconnect(platform) {
    delete this.connections[platform]
    localStorage.removeItem(`${platform}_access_token`)
    localStorage.removeItem(`${platform}_refresh_token`)
    return { success: true }
  }
}

// Export singleton instance
export const socialMediaService = new SocialMediaService()
export default socialMediaService
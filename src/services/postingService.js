import socialMediaService from './socialMediaService'
import toast from 'react-hot-toast'

class PostingService {
  constructor() {
    this.scheduledPosts = JSON.parse(localStorage.getItem('scheduledPosts')) || []
  }

  // Enhanced content generation with platform-specific formatting
  formatContentForPlatforms(generatedContent, platforms) {
    const formatted = {}

    platforms.forEach(platform => {
      switch (platform) {
        case 'youtube':
          formatted.youtube = {
            title: this.truncateText(generatedContent.split('\n')[0].replace(/\*\*/g, ''), 100),
            description: this.formatYouTubeDescription(generatedContent),
            tags: this.extractHashtags(generatedContent),
            privacy: 'public',
            category: '22' // People & Blogs
          }
          break

        case 'instagram':
          formatted.instagram = {
            caption: this.formatInstagramCaption(generatedContent),
            imageUrl: null, // Will be generated separately
            hashtags: this.extractHashtags(generatedContent, 30)
          }
          break

        case 'twitter':
          formatted.twitter = {
            text: this.formatTwitterText(generatedContent)
          }
          break

        case 'facebook':
          formatted.facebook = {
            message: this.formatFacebookPost(generatedContent)
          }
          break
      }
    })

    return formatted
  }

  // Format content specifically for YouTube
  formatYouTubeDescription(content) {
    // Extract main content and format for YouTube
    let description = content
      .replace(/\*\*/g, '') // Remove markdown bold
      .replace(/\*([^*]+)\*/g, '$1') // Remove markdown italic
      .trim()

    // Add standard YouTube elements
    description += '\n\n'
    description += '🔔 Subscribe for more content!\n'
    description += '👍 Like if this helped you!\n'
    description += '💬 Comment with your thoughts!\n\n'
    description += '📱 Follow us on other platforms:\n'
    description += '• Instagram: @viralcraftai\n'
    description += '• Twitter: @viralcraftai\n\n'
    description += '#AIContent #ViralContent #ContentCreation'

    return this.truncateText(description, 5000) // YouTube description limit
  }

  // Format content for Instagram
  formatInstagramCaption(content) {
    let caption = content
      .replace(/\*\*(.+?)\*\*/g, '$1') // Remove bold markdown
      .replace(/\*(.+?)\*/g, '$1') // Remove italic markdown
      .trim()

    // Add Instagram-specific elements
    caption += '\n\n'
    caption += '• • •\n'
    caption += '🔥 Follow @viralcraftai for daily AI content\n'
    caption += '💡 Save this post for later\n'
    caption += '📩 DM us for collaboration\n\n'

    // Add hashtags
    const hashtags = this.extractHashtags(content, 20)
    if (hashtags.length > 0) {
      caption += hashtags.map(tag => `#${tag}`).join(' ')
    }

    return this.truncateText(caption, 2200) // Instagram caption limit
  }

  // Format content for Twitter
  formatTwitterText(content) {
    let text = content
      .replace(/\*\*(.+?)\*\*/g, '$1')
      .replace(/\*(.+?)\*/g, '$1')
      .trim()

    // Add Twitter-specific elements
    text += '\n\n🧵 Thread ⬇️'
    text += '\n\n#AI #ContentCreation #Viral'

    return this.truncateText(text, 280) // Twitter character limit
  }

  // Format content for Facebook
  formatFacebookPost(content) {
    let post = content.replace(/\*\*/g, '').replace(/\*/g, '').trim()

    post += '\n\n'
    post += '👉 Follow our page for more amazing content!\n'
    post += '💬 What do you think? Let us know in the comments!\n'
    post += '🔄 Share with friends who need to see this!\n\n'
    post += '#AIContent #SocialMedia #ContentCreation'

    return post
  }

  // Extract hashtags from content
  extractHashtags(content, maxTags = 10) {
    // Extract existing hashtags
    const existingTags = content.match(/#\w+/g) || []

    // Generate relevant hashtags based on content
    const autoTags = []
    const words = content.toLowerCase().split(/\W+/)

    // Common content-related tags
    const tagMap = {
      'ai': ['AI', 'ArtificialIntelligence', 'MachineLearning'],
      'content': ['Content', 'ContentCreator', 'ContentMarketing'],
      'social': ['SocialMedia', 'Marketing', 'DigitalMarketing'],
      'business': ['Business', 'Entrepreneur', 'Startup'],
      'tips': ['Tips', 'Advice', 'HowTo'],
      'viral': ['Viral', 'Trending', 'Popular'],
      'youtube': ['YouTube', 'Video', 'Creator'],
      'instagram': ['Instagram', 'Insta', 'Photo']
    }

    words.forEach(word => {
      if (tagMap[word]) {
        autoTags.push(...tagMap[word])
      }
    })

    // Combine and deduplicate
    const allTags = [...existingTags.map(tag => tag.replace('#', '')), ...autoTags]
    const uniqueTags = [...new Set(allTags)].slice(0, maxTags)

    return uniqueTags
  }

  // Truncate text to specified length
  truncateText(text, maxLength) {
    if (text.length <= maxLength) return text
    return text.substr(0, maxLength - 3) + '...'
  }

  // Post content to multiple platforms
  async postToMultiplePlatforms(generatedContent, platforms, scheduleTime = null) {
    try {
      // Format content for each platform
      const formattedContent = this.formatContentForPlatforms(generatedContent, platforms)

      if (scheduleTime) {
        // Schedule for later posting
        return await this.schedulePost(formattedContent, platforms, scheduleTime)
      } else {
        // Post immediately
        return await this.postImmediately(formattedContent, platforms)
      }
    } catch (error) {
      console.error('Multi-platform posting failed:', error)
      toast.error('Failed to post content')
      return { success: false, error: error.message }
    }
  }

  // Post immediately to all platforms
  async postImmediately(formattedContent, platforms) {
    const results = []
    let successCount = 0

    for (const platform of platforms) {
      try {
        const content = formattedContent[platform]
        if (!content) continue

        const result = await socialMediaService.postToAllPlatforms(
          { [platform]: content },
          [platform]
        )

        if (result[0]?.success) {
          successCount++
          results.push({
            platform,
            success: true,
            url: result[0].url,
            postId: result[0].postId
          })

          toast.success(`Posted to ${platform}! 🎉`)
        } else {
          results.push({
            platform,
            success: false,
            error: result[0]?.error || 'Unknown error'
          })

          toast.error(`Failed to post to ${platform}`)
        }
      } catch (error) {
        results.push({
          platform,
          success: false,
          error: error.message
        })
      }
    }

    const overallSuccess = successCount > 0
    if (overallSuccess) {
      toast.success(`Successfully posted to ${successCount}/${platforms.length} platforms! 🚀`)
    }

    return {
      success: overallSuccess,
      results,
      successCount,
      totalPlatforms: platforms.length
    }
  }

  // Schedule post for later
  async schedulePost(formattedContent, platforms, scheduleTime) {
    const scheduledPost = {
      id: Date.now().toString(),
      content: formattedContent,
      platforms,
      scheduleTime: new Date(scheduleTime).toISOString(),
      status: 'scheduled',
      createdAt: new Date().toISOString()
    }

    this.scheduledPosts.push(scheduledPost)
    this.saveScheduledPosts()

    toast.success(`Post scheduled for ${new Date(scheduleTime).toLocaleString()}! ⏰`)

    return {
      success: true,
      scheduledPostId: scheduledPost.id,
      scheduleTime: scheduledPost.scheduleTime
    }
  }

  // Get scheduled posts
  getScheduledPosts() {
    return this.scheduledPosts.sort((a, b) => new Date(a.scheduleTime) - new Date(b.scheduleTime))
  }

  // Cancel scheduled post
  cancelScheduledPost(postId) {
    this.scheduledPosts = this.scheduledPosts.filter(post => post.id !== postId)
    this.saveScheduledPosts()
    toast.success('Scheduled post cancelled')
  }

  // Process scheduled posts (this would run on a server in production)
  async processScheduledPosts() {
    const now = new Date()
    const postsToProcess = this.scheduledPosts.filter(
      post => post.status === 'scheduled' && new Date(post.scheduleTime) <= now
    )

    for (const post of postsToProcess) {
      try {
        const result = await this.postImmediately(post.content, post.platforms)

        // Update post status
        const postIndex = this.scheduledPosts.findIndex(p => p.id === post.id)
        if (postIndex !== -1) {
          this.scheduledPosts[postIndex].status = result.success ? 'posted' : 'failed'
          this.scheduledPosts[postIndex].results = result.results
        }
      } catch (error) {
        console.error('Scheduled post processing failed:', error)
      }
    }

    this.saveScheduledPosts()
  }

  // Save scheduled posts to localStorage
  saveScheduledPosts() {
    localStorage.setItem('scheduledPosts', JSON.stringify(this.scheduledPosts))
  }

  // Get posting analytics
  getPostingAnalytics() {
    const analytics = {
      totalPosts: this.scheduledPosts.length,
      postedCount: this.scheduledPosts.filter(p => p.status === 'posted').length,
      scheduledCount: this.scheduledPosts.filter(p => p.status === 'scheduled').length,
      failedCount: this.scheduledPosts.filter(p => p.status === 'failed').length,
      platformBreakdown: {}
    }

    // Calculate platform breakdown
    this.scheduledPosts.forEach(post => {
      post.platforms.forEach(platform => {
        if (!analytics.platformBreakdown[platform]) {
          analytics.platformBreakdown[platform] = 0
        }
        analytics.platformBreakdown[platform]++
      })
    })

    return analytics
  }
}

// Export singleton instance
export const postingService = new PostingService()
export default postingService
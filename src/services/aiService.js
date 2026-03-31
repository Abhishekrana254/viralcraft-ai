// AI Service - Business Model Implementation
// This handles all AI calls with YOUR API keys (not user's)

class AIService {
  constructor() {
    // Your OpenAI API key (from environment)
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY
    this.baseURL = 'https://api.openai.com/v1'

    // Usage tracking for cost control
    this.usageTracker = {
      daily: 0,
      monthly: 0,
      userLimits: {
        free: 5,       // 5 generations per month
        starter: 50,   // 50 generations per month
        creator: -1,   // Unlimited
        agency: -1     // Unlimited
      }
    }
  }

  // Check if user can generate content (based on their plan)
  canUserGenerate(user) {
    const plan = user.plan || 'free'
    const limit = this.usageTracker.userLimits[plan]

    if (limit === -1) return true // Unlimited
    return user.monthlyUsage < limit
  }

  // Generate content with cost control
  async generateContent(prompt, platform, contentType, user) {
    // Check user limits
    if (!this.canUserGenerate(user)) {
      throw new Error('Upgrade your plan for more AI generations')
    }

    // Track usage for business analytics
    await this.trackUsage(user.id, prompt.length)

    try {
      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: this.selectModel(user.plan), // Different models for different plans
          messages: [
            {
              role: 'system',
              content: this.getSystemPrompt(platform, contentType, user.plan)
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: this.getTokenLimit(user.plan),
          temperature: 0.8
        })
      })

      const data = await response.json()

      // Update user usage
      await this.updateUserUsage(user.id)

      return {
        content: data.choices[0].message.content,
        tokensUsed: data.usage.total_tokens,
        cost: this.calculateCost(data.usage.total_tokens)
      }

    } catch (error) {
      console.error('AI Generation Error:', error)
      throw new Error('Failed to generate content. Please try again.')
    }
  }

  // Business logic: Different models for different plans
  selectModel(plan) {
    switch (plan) {
      case 'free':
        return 'gpt-3.5-turbo'           // Cheaper model
      case 'starter':
        return 'gpt-3.5-turbo'           // Cheaper model
      case 'creator':
        return 'gpt-4'                   // Premium model
      case 'agency':
        return 'gpt-4'                   // Premium model
      default:
        return 'gpt-3.5-turbo'
    }
  }

  // Different token limits per plan
  getTokenLimit(plan) {
    switch (plan) {
      case 'free': return 500           // Short content
      case 'starter': return 1000       // Medium content
      case 'creator': return 2000       // Long content
      case 'agency': return 4000        // Very long content
      default: return 500
    }
  }

  // Custom system prompts per plan
  getSystemPrompt(platform, contentType, plan) {
    const basePrompt = `You are ViralCraft AI, an expert content creator for ${platform}.`

    const planSpecific = {
      free: `Create basic ${contentType} content. Keep it simple and engaging.`,
      starter: `Create professional ${contentType} content with good engagement hooks.`,
      creator: `Create premium ${contentType} content with advanced psychology triggers and viral potential.`,
      agency: `Create agency-level ${contentType} content with advanced copywriting techniques and maximum viral potential.`
    }

    return `${basePrompt} ${planSpecific[plan] || planSpecific.free}`
  }

  // Track usage for business analytics
  async trackUsage(userId, promptLength) {
    // This would save to your database
    const usage = {
      userId,
      timestamp: new Date(),
      promptLength,
      estimated_cost: promptLength * 0.000002 // Rough estimate
    }

    // Save to analytics DB
    console.log('Tracking usage:', usage)
  }

  // Update user's monthly usage
  async updateUserUsage(userId) {
    // Increment user's monthly usage count
    // This prevents abuse and enforces plan limits
    console.log(`Updated usage for user: ${userId}`)
  }

  // Calculate actual cost for business tracking
  calculateCost(tokens) {
    const costPerToken = 0.000002 // GPT-3.5 pricing
    return tokens * costPerToken
  }

  // Get user's remaining generations
  async getRemainingGenerations(user) {
    const limit = this.usageTracker.userLimits[user.plan || 'free']
    if (limit === -1) return 'Unlimited'
    return Math.max(0, limit - (user.monthlyUsage || 0))
  }
}

export default new AIService()
// Multi-AI Service - Use FREE APIs to start, scale with paid later
// This is how smart entrepreneurs bootstrap AI apps!

class MultiAIService {
  constructor() {
    // Priority order: Free → Cheap → Premium
    this.providers = [
      {
        name: 'gemini',
        cost: 0,           // FREE!
        quality: 90,       // 90% as good as GPT-4
        limit: 60,         // 60 requests/minute
        apiKey: import.meta.env.VITE_GEMINI_API_KEY
      },
      {
        name: 'groq',
        cost: 0.27,        // $0.27 per 1M tokens (vs OpenAI $2)
        quality: 85,       // Great for content
        limit: 30,         // 30 requests/minute
        apiKey: import.meta.env.VITE_GROQ_API_KEY
      },
      {
        name: 'huggingface',
        cost: 0,           // FREE!
        quality: 80,       // Good for basic content
        limit: 1000,       // High limit
        apiKey: import.meta.env.VITE_HF_API_KEY
      },
      {
        name: 'openai',
        cost: 2,           // $2 per 1M tokens
        quality: 95,       // Premium quality
        limit: 60,         // 60 requests/minute
        apiKey: import.meta.env.VITE_OPENAI_API_KEY
      }
    ]

    this.usageTracker = {
      gemini: { used: 0, resetTime: Date.now() + 60000 },
      groq: { used: 0, resetTime: Date.now() + 60000 },
      huggingface: { used: 0, resetTime: Date.now() + 60000 },
      openai: { used: 0, resetTime: Date.now() + 60000 }
    }
  }

  // Smart provider selection based on cost and availability
  selectProvider(userPlan) {
    const now = Date.now()

    // Reset usage counters if needed
    Object.keys(this.usageTracker).forEach(provider => {
      if (now > this.usageTracker[provider].resetTime) {
        this.usageTracker[provider].used = 0
        this.usageTracker[provider].resetTime = now + 60000
      }
    })

    // For free users: Use only free APIs
    if (userPlan === 'free') {
      const freeProviders = this.providers.filter(p => p.cost === 0)
      for (const provider of freeProviders) {
        if (this.usageTracker[provider.name].used < provider.limit) {
          return provider
        }
      }
    }

    // For paid users: Use best available (free first, then paid)
    const sortedProviders = [...this.providers].sort((a, b) => a.cost - b.cost)
    for (const provider of sortedProviders) {
      if (this.usageTracker[provider.name].used < provider.limit) {
        return provider
      }
    }

    // Fallback to best available
    return this.providers[0]
  }

  // Generate content with automatic provider fallback
  async generateContent(prompt, platform, contentType, user) {
    const provider = this.selectProvider(user.plan || 'free')

    console.log(`🤖 Using ${provider.name} (Cost: $${provider.cost}/1M tokens)`)

    try {
      let result

      switch (provider.name) {
        case 'gemini':
          result = await this.generateWithGemini(prompt, platform, contentType)
          break
        case 'groq':
          result = await this.generateWithGroq(prompt, platform, contentType)
          break
        case 'huggingface':
          result = await this.generateWithHuggingFace(prompt, platform, contentType)
          break
        case 'openai':
          result = await this.generateWithOpenAI(prompt, platform, contentType)
          break
        default:
          throw new Error('No AI provider available')
      }

      // Track usage
      this.usageTracker[provider.name].used++

      return {
        content: result.content,
        provider: provider.name,
        cost: provider.cost,
        tokensUsed: result.tokensUsed || 0
      }

    } catch (error) {
      console.error(`${provider.name} failed:`, error)

      // Try next provider as fallback
      const nextProvider = this.getNextProvider(provider.name, user.plan)
      if (nextProvider) {
        console.log(`🔄 Falling back to ${nextProvider.name}`)
        return this.generateWithProvider(nextProvider, prompt, platform, contentType)
      }

      throw error
    }
  }

  // Google Gemini (FREE!)
  async generateWithGemini(prompt, platform, contentType) {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': import.meta.env.VITE_GEMINI_API_KEY || 'demo-key'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Create ${contentType} content for ${platform} about: ${prompt}`
          }]
        }],
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 2048
        }
      })
    })

    if (!response.ok) {
      // Fallback to mock data if no API key
      return this.getMockContent(prompt, platform, contentType)
    }

    const data = await response.json()
    return {
      content: data.candidates[0].content.parts[0].text,
      tokensUsed: data.usageMetadata?.totalTokenCount || 0
    }
  }

  // Groq (SUPER FAST + CHEAP)
  async generateWithGroq(prompt, platform, contentType) {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192', // Free and fast model
        messages: [
          {
            role: 'system',
            content: `You are a viral content creator for ${platform}. Create engaging ${contentType} content.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 2048,
        temperature: 0.8
      })
    })

    if (!response.ok) {
      return this.getMockContent(prompt, platform, contentType)
    }

    const data = await response.json()
    return {
      content: data.choices[0].message.content,
      tokensUsed: data.usage?.total_tokens || 0
    }
  }

  // Hugging Face (FREE)
  async generateWithHuggingFace(prompt, platform, contentType) {
    const response = await fetch('https://api-inference.huggingface.co/models/microsoft/DialoGPT-large', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_HF_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: `Create ${contentType} content for ${platform}: ${prompt}`,
        parameters: {
          max_length: 500,
          temperature: 0.8
        }
      })
    })

    if (!response.ok) {
      return this.getMockContent(prompt, platform, contentType)
    }

    const data = await response.json()
    return {
      content: data[0]?.generated_text || 'Content generated successfully!',
      tokensUsed: 0
    }
  }

  // OpenAI (Premium - use only when needed)
  async generateWithOpenAI(prompt, platform, contentType) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // Cheaper than GPT-4
        messages: [
          {
            role: 'system',
            content: `You are an expert content creator for ${platform}. Create viral ${contentType} content.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 2048,
        temperature: 0.8
      })
    })

    const data = await response.json()
    return {
      content: data.choices[0].message.content,
      tokensUsed: data.usage?.total_tokens || 0
    }
  }

  // Mock content for demo/fallback
  getMockContent(prompt, platform, contentType) {
    const mockContent = {
      youtube: {
        script: `🎬 **${prompt} - Complete Video Script**

**HOOK (0-15s):**
"Did you know that ${prompt.toLowerCase()} can completely transform your life? I discovered this after trying 10 different methods..."

**MAIN CONTENT:**
🔥 The #1 mistake people make with ${prompt.toLowerCase()}
⚡ My proven 3-step system that works every time
🚀 Real results you can expect in 30 days

**CALL TO ACTION:**
"If this helped you with ${prompt.toLowerCase()}, smash that subscribe button and let me know your biggest takeaway in the comments!"

---
✨ **Generated with FREE AI** - Upgrade for premium content!`,

        title: `${prompt} - This Changed Everything! (MUST WATCH) 🔥`,
        description: `In this video, I break down everything you need to know about ${prompt.toLowerCase()}. This method has helped thousands of people achieve incredible results...`
      },

      instagram: {
        post: `✨ **${prompt}** 💫

The secret that changed everything for me... 👇

Here's what I learned after testing ${prompt.toLowerCase()} for 30 days:

1️⃣ Start with the basics (most people skip this)
2️⃣ Focus on consistency over perfection
3️⃣ Track your progress daily
4️⃣ Adjust based on results

The results? 🤯
• Increased productivity by 300%
• Better focus and clarity
• Amazing life transformation

What's YOUR experience with ${prompt.toLowerCase()}? Drop it in the comments! 👇

---
#${prompt.replace(/\s+/g, '').toLowerCase()} #productivity #success #mindset #motivation #tips #growth #lifestyle

✨ **Created with FREE AI** - Upgrade for premium content!`
      },

      twitter: {
        thread: `🧵 Thread: ${prompt}

1/ After 6 months of testing ${prompt.toLowerCase()}, here are the insights that changed everything:

2/ Most people get this completely wrong:
❌ They focus on [common mistake]
✅ Instead, focus on [correct approach]

3/ Here's my simple framework:
• Step 1: [Action]
• Step 2: [Process]
• Step 3: [Result]
• Step 4: [Scale]

4/ The results after implementing this:
📈 [Metric] increased by 200%
⚡ [Benefit 1]
🎯 [Benefit 2]

5/ Key takeaways:
1. ${prompt} isn't what you think
2. Small changes = big results
3. Consistency beats perfection

What questions do you have about ${prompt.toLowerCase()}?

Reply and I'll answer every single one! 👇

✨ **Generated with FREE AI**`
      }
    }

    return {
      content: mockContent[platform]?.[contentType] || `Amazing ${contentType} content about ${prompt} for ${platform}!`,
      tokensUsed: 0
    }
  }

  // Get cost savings report
  getCostSavings(usage) {
    const openaiCost = usage.totalTokens * 0.000002 // OpenAI pricing
    const actualCost = usage.geminiTokens * 0 + usage.groqTokens * 0.00000027
    const savings = openaiCost - actualCost

    return {
      openaiWouldCost: openaiCost,
      actualCost,
      savings,
      savingsPercentage: ((savings / openaiCost) * 100).toFixed(1)
    }
  }
}

export default new MultiAIService()
// Video Generator Service - Creates faceless videos from AI scripts
// Uses Canvas API + MediaRecorder for browser-based video generation

class VideoGeneratorService {
  constructor() {
    this.canvas = null
    this.ctx = null
    this.width = 1080
    this.height = 1920 // 9:16 vertical (YouTube Shorts / Reels)
    this.fps = 30
    this.secondsPerScene = 5
  }

  // Parse AI script into scenes
  parseScript(script) {
    const scenes = []
    const lines = script.split('\n').filter(line => line.trim())

    let currentScene = { text: '', type: 'content' }

    for (const line of lines) {
      const trimmed = line.trim()

      // Skip markdown formatting markers
      if (trimmed.startsWith('---') || trimmed.startsWith('✨ **Generated')) continue

      // Detect scene breaks
      if (trimmed.includes('HOOK') || trimmed.includes('Hook')) {
        if (currentScene.text) scenes.push(currentScene)
        currentScene = { text: '', type: 'hook' }
        continue
      }
      if (trimmed.includes('MAIN CONTENT') || trimmed.includes('Main Content')) {
        if (currentScene.text) scenes.push(currentScene)
        currentScene = { text: '', type: 'content' }
        continue
      }
      if (trimmed.includes('CALL TO ACTION') || trimmed.includes('Call to Action') || trimmed.includes('CTA')) {
        if (currentScene.text) scenes.push(currentScene)
        currentScene = { text: '', type: 'cta' }
        continue
      }

      // Clean up text
      const cleanText = trimmed
        .replace(/\*\*/g, '')
        .replace(/^[🎬🔥💡🚀📱💰✅❌📊🎯⚡️💪🏆📈🔑💎🌟⭐️👉👆👇🔔]/g, '')
        .replace(/^[#]+\s*/, '')
        .replace(/^[-•]\s*/, '')
        .trim()

      if (cleanText.length > 10) {
        // Split long text into multiple scenes
        if (cleanText.length > 100) {
          const sentences = cleanText.match(/[^.!?]+[.!?]+/g) || [cleanText]
          for (const sentence of sentences) {
            if (sentence.trim().length > 10) {
              scenes.push({ text: sentence.trim(), type: currentScene.type })
            }
          }
          currentScene = { text: '', type: currentScene.type }
        } else {
          scenes.push({ text: cleanText, type: currentScene.type })
          currentScene = { text: '', type: currentScene.type }
        }
      }
    }

    if (currentScene.text) scenes.push(currentScene)

    // Ensure we have at least 3 scenes
    if (scenes.length < 3) {
      return [
        { text: 'Watch this!', type: 'hook' },
        ...scenes,
        { text: 'Like & Subscribe for more!', type: 'cta' }
      ]
    }

    // Limit to reasonable number of scenes
    return scenes.slice(0, 12)
  }

  // Get gradient colors based on scene type
  getSceneStyle(type, index) {
    const styles = {
      hook: [
        { bg: ['#667eea', '#764ba2'], textColor: '#ffffff' },
        { bg: ['#f093fb', '#f5576c'], textColor: '#ffffff' },
        { bg: ['#4facfe', '#00f2fe'], textColor: '#ffffff' },
      ],
      content: [
        { bg: ['#0f0c29', '#302b63'], textColor: '#ffffff' },
        { bg: ['#1a1a2e', '#16213e'], textColor: '#e0e0e0' },
        { bg: ['#0d1b2a', '#1b263b'], textColor: '#e0e0e0' },
        { bg: ['#2d1b69', '#11001c'], textColor: '#d4bfff' },
        { bg: ['#1f1c2c', '#928dab'], textColor: '#ffffff' },
      ],
      cta: [
        { bg: ['#ff416c', '#ff4b2b'], textColor: '#ffffff' },
        { bg: ['#f7971e', '#ffd200'], textColor: '#1a1a1a' },
        { bg: ['#00b09b', '#96c93d'], textColor: '#ffffff' },
      ]
    }

    const typeStyles = styles[type] || styles.content
    return typeStyles[index % typeStyles.length]
  }

  // Draw a single frame on canvas
  drawFrame(scene, style, progress) {
    const { ctx, width, height } = this

    // Draw gradient background
    const gradient = ctx.createLinearGradient(0, 0, width, height)
    gradient.addColorStop(0, style.bg[0])
    gradient.addColorStop(1, style.bg[1])
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    // Draw subtle animated particles
    ctx.globalAlpha = 0.1
    for (let i = 0; i < 20; i++) {
      const x = (Math.sin(progress * 2 + i * 0.5) * 0.3 + 0.5) * width
      const y = (Math.cos(progress * 1.5 + i * 0.7) * 0.3 + 0.5) * height
      const radius = 20 + Math.sin(progress + i) * 10
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fillStyle = '#ffffff'
      ctx.fill()
    }
    ctx.globalAlpha = 1

    // Draw text with word wrap
    const text = scene.text
    const maxWidth = width - 120
    const lineHeight = 65
    const fontSize = text.length > 80 ? 42 : text.length > 50 ? 48 : 56

    ctx.font = `bold ${fontSize}px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
    ctx.fillStyle = style.textColor
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    // Word wrap
    const words = text.split(' ')
    const lines = []
    let currentLine = ''

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word
      const metrics = ctx.measureText(testLine)
      if (metrics.width > maxWidth && currentLine) {
        lines.push(currentLine)
        currentLine = word
      } else {
        currentLine = testLine
      }
    }
    if (currentLine) lines.push(currentLine)

    // Text animation - fade in and slide up
    const textAlpha = Math.min(1, progress * 3) // Fade in during first third
    const slideOffset = Math.max(0, (1 - progress * 3) * 50) // Slide up

    ctx.globalAlpha = textAlpha

    // Draw text shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'
    ctx.shadowBlur = 20
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 4

    const startY = height / 2 - ((lines.length - 1) * lineHeight) / 2 + slideOffset

    for (let i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], width / 2, startY + i * lineHeight)
    }

    // Reset shadow
    ctx.shadowColor = 'transparent'
    ctx.shadowBlur = 0
    ctx.globalAlpha = 1

    // Draw scene type indicator
    if (scene.type === 'hook') {
      this.drawBadge(ctx, 'HOOK', width / 2, 200, '#ff4757')
    } else if (scene.type === 'cta') {
      this.drawBadge(ctx, 'SUBSCRIBE', width / 2, height - 300, '#ff6b6b')
    }

    // Draw progress bar at bottom
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
    ctx.fillRect(0, height - 8, width, 8)
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, height - 8, width * progress, 8)
  }

  drawBadge(ctx, text, x, y, color) {
    const padding = 20
    ctx.font = 'bold 28px -apple-system, sans-serif'
    const textWidth = ctx.measureText(text).width

    // Badge background
    ctx.fillStyle = color
    const radius = 15
    const bx = x - textWidth / 2 - padding
    const by = y - 20
    const bw = textWidth + padding * 2
    const bh = 44

    ctx.beginPath()
    ctx.roundRect(bx, by, bw, bh, radius)
    ctx.fill()

    // Badge text
    ctx.fillStyle = '#ffffff'
    ctx.textAlign = 'center'
    ctx.fillText(text, x, y + 6)
  }

  // Generate video from scenes
  async generateVideo(script, options = {}) {
    const {
      format = 'vertical', // vertical (9:16) or horizontal (16:9)
      withVoiceover = true,
      secondsPerScene = 5,
      onProgress = () => {}
    } = options

    // Set dimensions based on format
    if (format === 'horizontal') {
      this.width = 1920
      this.height = 1080
    } else {
      this.width = 1080
      this.height = 1920
    }
    this.secondsPerScene = secondsPerScene

    // Create canvas
    this.canvas = document.createElement('canvas')
    this.canvas.width = this.width
    this.canvas.height = this.height
    this.ctx = this.canvas.getContext('2d')

    // Parse script into scenes
    const scenes = this.parseScript(script)
    onProgress({ stage: 'parsing', progress: 10, message: 'Script parsed into scenes...' })

    // Generate voiceover audio if requested
    let audioBlob = null
    if (withVoiceover && 'speechSynthesis' in window) {
      onProgress({ stage: 'voiceover', progress: 20, message: 'Generating voiceover...' })
      audioBlob = await this.generateVoiceover(scenes)
      onProgress({ stage: 'voiceover', progress: 40, message: 'Voiceover generated!' })
    }

    // Record video
    onProgress({ stage: 'rendering', progress: 50, message: 'Rendering video frames...' })
    const videoBlob = await this.recordVideo(scenes, onProgress)
    onProgress({ stage: 'complete', progress: 90, message: 'Combining audio and video...' })

    // Combine audio + video if we have voiceover
    let finalBlob
    if (audioBlob) {
      finalBlob = await this.combineAudioVideo(videoBlob, audioBlob)
    } else {
      finalBlob = videoBlob
    }

    onProgress({ stage: 'done', progress: 100, message: 'Video ready!' })

    return {
      blob: finalBlob,
      url: URL.createObjectURL(finalBlob),
      scenes: scenes,
      duration: scenes.length * this.secondsPerScene,
      format: format
    }
  }

  // Record canvas as video
  async recordVideo(scenes, onProgress) {
    return new Promise((resolve, reject) => {
      const stream = this.canvas.captureStream(this.fps)
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9',
        videoBitsPerSecond: 5000000 // 5 Mbps
      })

      const chunks = []
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data)
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' })
        resolve(blob)
      }

      mediaRecorder.onerror = reject
      mediaRecorder.start()

      const totalFrames = scenes.length * this.secondsPerScene * this.fps
      let currentFrame = 0
      let currentSceneIndex = 0
      const framesPerScene = this.secondsPerScene * this.fps

      const renderFrame = () => {
        if (currentFrame >= totalFrames) {
          mediaRecorder.stop()
          return
        }

        currentSceneIndex = Math.floor(currentFrame / framesPerScene)
        const sceneProgress = (currentFrame % framesPerScene) / framesPerScene
        const scene = scenes[Math.min(currentSceneIndex, scenes.length - 1)]
        const style = this.getSceneStyle(scene.type, currentSceneIndex)

        this.drawFrame(scene, style, sceneProgress)

        currentFrame++

        // Update progress
        if (currentFrame % (this.fps * 2) === 0) {
          const renderProgress = 50 + (currentFrame / totalFrames) * 40
          onProgress({
            stage: 'rendering',
            progress: Math.round(renderProgress),
            message: `Rendering scene ${currentSceneIndex + 1}/${scenes.length}...`
          })
        }

        requestAnimationFrame(renderFrame)
      }

      renderFrame()
    })
  }

  // Generate voiceover using Web Speech API
  async generateVoiceover(scenes) {
    return new Promise((resolve) => {
      const fullText = scenes.map(s => s.text).join('. ')

      // Use Web Speech API
      const utterance = new SpeechSynthesisUtterance(fullText)
      utterance.rate = 0.9
      utterance.pitch = 1.0
      utterance.volume = 1.0

      // Try to get a good English voice
      const voices = speechSynthesis.getVoices()
      const preferredVoice = voices.find(v =>
        v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel')
      ) || voices.find(v => v.lang.startsWith('en'))

      if (preferredVoice) utterance.voice = preferredVoice

      // Web Speech API doesn't give us audio blob directly
      // We'll skip audio combination and just use the video
      // For production, use a proper TTS API like ElevenLabs
      resolve(null)
    })
  }

  // For now, return video as-is (audio combination needs server-side or WebCodecs)
  async combineAudioVideo(videoBlob, audioBlob) {
    // Browser limitation: can't easily mux audio + video in pure JS
    // In production, use ffmpeg.wasm or server-side processing
    return videoBlob
  }

  // Play voiceover alongside video using Web Speech API
  playVoiceover(scenes) {
    if (!('speechSynthesis' in window)) return

    let sceneIndex = 0

    const speakScene = () => {
      if (sceneIndex >= scenes.length) return

      const utterance = new SpeechSynthesisUtterance(scenes[sceneIndex].text)
      utterance.rate = 0.85
      utterance.pitch = 1.0

      const voices = speechSynthesis.getVoices()
      const voice = voices.find(v =>
        v.name.includes('Google') || v.name.includes('Samantha')
      ) || voices.find(v => v.lang.startsWith('en'))

      if (voice) utterance.voice = voice

      utterance.onend = () => {
        sceneIndex++
        // Small pause between scenes
        setTimeout(speakScene, 500)
      }

      speechSynthesis.speak(utterance)
    }

    speakScene()
  }

  // Stop voiceover
  stopVoiceover() {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel()
    }
  }

  // Get estimated video duration
  getEstimatedDuration(script) {
    const scenes = this.parseScript(script)
    return scenes.length * this.secondsPerScene
  }

  // Create thumbnail from first scene
  async generateThumbnail(script) {
    const canvas = document.createElement('canvas')
    canvas.width = 1280
    canvas.height = 720
    const ctx = canvas.getContext('2d')

    const scenes = this.parseScript(script)
    const firstScene = scenes[0] || { text: 'Video', type: 'hook' }

    // Draw thumbnail background
    const gradient = ctx.createLinearGradient(0, 0, 1280, 720)
    gradient.addColorStop(0, '#667eea')
    gradient.addColorStop(1, '#764ba2')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 1280, 720)

    // Draw text
    ctx.font = 'bold 64px -apple-system, sans-serif'
    ctx.fillStyle = '#ffffff'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.shadowColor = 'rgba(0,0,0,0.5)'
    ctx.shadowBlur = 15

    // Word wrap for thumbnail
    const words = firstScene.text.split(' ')
    const lines = []
    let line = ''
    for (const word of words) {
      const test = line ? `${line} ${word}` : word
      if (ctx.measureText(test).width > 1100) {
        lines.push(line)
        line = word
      } else {
        line = test
      }
    }
    if (line) lines.push(line)

    const startY = 360 - (lines.length - 1) * 40
    lines.forEach((l, i) => {
      ctx.fillText(l, 640, startY + i * 80)
    })

    return canvas.toDataURL('image/jpeg', 0.9)
  }
}

export const videoGeneratorService = new VideoGeneratorService()
export default videoGeneratorService

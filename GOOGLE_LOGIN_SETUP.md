# 🔐 Google Login Setup Guide (15 Minutes)

## 🚀 **Firebase Setup for Google Auth**

### **Step 1: Create Firebase Project (5 min)**
1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Click "Create a project"
3. Project name: "ViralCraft AI"
4. Enable Google Analytics (optional)
5. Click "Create project"

### **Step 2: Setup Authentication (5 min)**
1. Go to "Authentication" → "Sign-in method"
2. Click "Google" → Enable
3. Add your email as authorized domain
4. Copy the config object

### **Step 3: Add to App (5 min)**
1. Install Firebase: `npm install firebase`
2. Add config to `.env`:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   ```
3. Update authStore.js with Firebase auth
4. Google login buttons will work!

---

## ⚡ **OR LAUNCH NOW, ADD LATER:**

**95% of successful SaaS apps launch with basic auth first!**

---

**Your choice: Add now (15 min) or launch first? 🤔**
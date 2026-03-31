import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth'
import { auth, googleProvider } from '../config/firebase'

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      // Email/Password Login
      login: async (email, password) => {
        set({ isLoading: true })
        try {
          const result = await signInWithEmailAndPassword(auth, email, password)
          const user = {
            id: result.user.uid,
            email: result.user.email,
            name: result.user.displayName || email.split('@')[0],
            plan: 'free', // Default free plan
            usageCount: 0,
            createdAt: new Date().toISOString()
          }

          set({
            user,
            isAuthenticated: true,
            isLoading: false
          })
          return { success: true }
        } catch (error) {
          set({ isLoading: false })
          return { success: false, error: error.message }
        }
      },

      // Email/Password Signup
      signup: async (name, email, password) => {
        set({ isLoading: true })
        try {
          const result = await createUserWithEmailAndPassword(auth, email, password)

          // Update profile with display name
          await updateProfile(result.user, { displayName: name })

          const user = {
            id: result.user.uid,
            email: result.user.email,
            name: name,
            plan: 'free', // Default free plan
            usageCount: 0,
            createdAt: new Date().toISOString()
          }

          set({
            user,
            isAuthenticated: true,
            isLoading: false
          })
          return { success: true }
        } catch (error) {
          set({ isLoading: false })
          return { success: false, error: error.message }
        }
      },

      // Google Authentication
      googleLogin: async () => {
        set({ isLoading: true })
        try {
          const result = await signInWithPopup(auth, googleProvider)
          const user = {
            id: result.user.uid,
            email: result.user.email,
            name: result.user.displayName,
            plan: 'free', // Default free plan
            usageCount: 0,
            createdAt: new Date().toISOString(),
            photoURL: result.user.photoURL
          }

          set({
            user,
            isAuthenticated: true,
            isLoading: false
          })
          return { success: true }
        } catch (error) {
          set({ isLoading: false })
          return { success: false, error: error.message }
        }
      },

      // Logout action
      logout: async () => {
        try {
          await signOut(auth)
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false
          })
          return { success: true }
        } catch (error) {
          return { success: false, error: error.message }
        }
      },

      // Update usage count
      updateUsage: () => {
        const { user } = get()
        if (user) {
          set({
            user: {
              ...user,
              usageCount: user.usageCount + 1
            }
          })
        }
      },

      // Initialize auth state
      initialize: () => {
        set({ isLoading: true })

        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
          if (firebaseUser) {
            const user = {
              id: firebaseUser.uid,
              email: firebaseUser.email,
              name: firebaseUser.displayName || firebaseUser.email?.split('@')[0],
              plan: 'free', // Default - you can fetch from database
              usageCount: 0, // Default - you can fetch from database
              photoURL: firebaseUser.photoURL,
              createdAt: new Date().toISOString()
            }

            set({
              user,
              isAuthenticated: true,
              isLoading: false
            })
          } else {
            set({
              user: null,
              isAuthenticated: false,
              isLoading: false
            })
          }
        })

        return unsubscribe
      }
    }),
    {
      name: 'viralcraft-auth',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
)

export { useAuthStore }
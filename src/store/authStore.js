import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      // Login action
      login: async (email, password) => {
        set({ isLoading: true })
        try {
          // Simulate API call - replace with actual authentication
          await new Promise(resolve => setTimeout(resolve, 1000))

          if (email && password) {
            const user = {
              id: '1',
              email,
              name: email.split('@')[0],
              plan: 'starter',
              createdAt: new Date().toISOString()
            }

            set({
              user,
              isAuthenticated: true,
              isLoading: false
            })
            return { success: true }
          } else {
            throw new Error('Invalid credentials')
          }
        } catch (error) {
          set({ isLoading: false })
          return { success: false, error: error.message }
        }
      },

      // Signup action
      signup: async (name, email, password) => {
        set({ isLoading: true })
        try {
          // Simulate API call - replace with actual registration
          await new Promise(resolve => setTimeout(resolve, 1000))

          const user = {
            id: Date.now().toString(),
            email,
            name,
            plan: 'starter',
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

      // Logout action
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false
        })
      },

      // Initialize auth state
      initialize: () => {
        set({ isLoading: false })
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
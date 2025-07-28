import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(false)

  const toggleTheme = () => {
    isDark.value = !isDark.value
    updateDocumentClass()
  }

  const setTheme = (dark: boolean) => {
    isDark.value = dark
    updateDocumentClass()
  }

  const updateDocumentClass = () => {
    if (isDark.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // Initialize theme on store creation
  const initTheme = () => {
    const stored = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    isDark.value = stored ? stored === 'dark' : prefersDark
    updateDocumentClass()
  }

  // Save theme preference
  const saveThemePreference = () => {
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  }

  return {
    isDark,
    toggleTheme,
    setTheme,
    initTheme,
    saveThemePreference
  }
})
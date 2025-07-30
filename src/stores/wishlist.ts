import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface WishlistItem {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  colors: string[]
  isNew: boolean
  isOnSale: boolean
}

export const useWishlistStore = defineStore('wishlist', () => {
  const items = ref<WishlistItem[]>([])
  const isOpen = ref(false)

  const itemsCount = computed(() => items.value.length)

  const isEmpty = computed(() => items.value.length === 0)

  const isInWishlist = (productId: number) => {
    return items.value.some(item => item.id === productId)
  }

  const addItem = (product: WishlistItem) => {
    const existingItem = items.value.find(item => item.id === product.id)
    
    if (!existingItem) {
      items.value.push(product)
      saveToLocalStorage()
    }
  }

  const removeItem = (productId: number) => {
    const index = items.value.findIndex(item => item.id === productId)
    if (index > -1) {
      items.value.splice(index, 1)
      saveToLocalStorage()
    }
  }

  const toggleItem = (product: WishlistItem) => {
    if (isInWishlist(product.id)) {
      removeItem(product.id)
    } else {
      addItem(product)
    }
  }

  const clearWishlist = () => {
    items.value = []
    saveToLocalStorage()
  }

  const toggleWishlist = () => {
    isOpen.value = !isOpen.value
  }

  const openWishlist = () => {
    isOpen.value = true
  }

  const closeWishlist = () => {
    isOpen.value = false
  }

  const saveToLocalStorage = () => {
    try {
      localStorage.setItem('luxe-wishlist', JSON.stringify(items.value))
    } catch (error) {
      console.error('Error saving wishlist to localStorage:', error)
    }
  }

  const loadFromLocalStorage = () => {
    try {
      const saved = localStorage.getItem('luxe-wishlist')
      if (saved) {
        items.value = JSON.parse(saved)
      }
    } catch (error) {
      console.error('Error loading wishlist from localStorage:', error)
      items.value = []
    }
  }

  loadFromLocalStorage()

  return {
    items,
    isOpen,
    
    itemsCount,
    isEmpty,
    isInWishlist,
    
    addItem,
    removeItem,
    toggleItem,
    clearWishlist,
    toggleWishlist,
    openWishlist,
    closeWishlist,
    loadFromLocalStorage
  }
})
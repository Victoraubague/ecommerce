import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface CartItem {
  id: number
  name: string
  price: number
  image: string
  category: string
  color?: string
  quantity: number
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  const isOpen = ref(false)

  const itemsCount = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })

  const totalPrice = computed(() => {
    return items.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  })

  const subtotal = computed(() => {
    return items.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  })

  const isEmpty = computed(() => items.value.length === 0)

  const addItem = (product: Omit<CartItem, 'quantity'>, color?: string) => {
    const existingItem = items.value.find(
      item => item.id === product.id && item.color === color
    )

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      items.value.push({
        ...product,
        color,
        quantity: 1
      })
    }

    saveToLocalStorage()
  }

  const removeItem = (id: number, color?: string) => {
    const index = items.value.findIndex(
      item => item.id === id && item.color === color
    )
    if (index > -1) {
      items.value.splice(index, 1)
      saveToLocalStorage()
    }
  }

  const updateQuantity = (id: number, quantity: number, color?: string) => {
    const item = items.value.find(
      item => item.id === id && item.color === color
    )
    if (item) {
      if (quantity <= 0) {
        removeItem(id, color)
      } else {
        item.quantity = quantity
        saveToLocalStorage()
      }
    }
  }

  const clearCart = () => {
    items.value = []
    saveToLocalStorage()
  }

  const toggleCart = () => {
    isOpen.value = !isOpen.value
  }

  const openCart = () => {
    isOpen.value = true
  }

  const closeCart = () => {
    isOpen.value = false
  }

  const saveToLocalStorage = () => {
    try {
      localStorage.setItem('luxe-cart', JSON.stringify(items.value))
    } catch (error) {
      console.error('Error saving cart to localStorage:', error)
    }
  }

  const loadFromLocalStorage = () => {
    try {
      const saved = localStorage.getItem('luxe-cart')
      if (saved) {
        items.value = JSON.parse(saved)
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error)
      items.value = []
    }
  }

  loadFromLocalStorage()

  return {
    items,
    isOpen,
    
    itemsCount,
    totalPrice,
    subtotal,
    isEmpty,
    
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
    loadFromLocalStorage
  }
})
export interface Product {
  id: number
  name: string
  category: string
  price: number
  originalPrice?: number
  image: string
  colors?: string[]
  isNew: boolean
  isOnSale: boolean
  categoryId?: number
}

export interface Collection {
  id: number
  name: string
  description: string
  image: string
  itemCount: number
  startingPrice: number
}

export interface Category {
  id: number
  name: string
}

export interface CartItem {
  id: number
  name: string
  price: number
  image: string
  category: string
  quantity?: number
}

export interface WishlistItem extends Product {}
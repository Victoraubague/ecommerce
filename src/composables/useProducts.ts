import { ref, computed } from 'vue'
import type { Product, Category } from '@/types'

const products = ref<Product[]>([
  {
    id: 1,
    name: 'VESTE OVERSIZE EN LAINE',
    category: 'Vêtements',
    price: 890,
    originalPrice: 1200,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80',
    colors: ['#000000', '#8B4513', '#556B2F'],
    isNew: false,
    isOnSale: true,
    categoryId: 1
  },
  {
    id: 2,
    name: 'SAC À MAIN STRUCTURÉ',
    category: 'Maroquinerie',
    price: 1450,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80',
    colors: ['#000000', '#8B4513', '#FFFFFF'],
    isNew: true,
    isOnSale: false,
    categoryId: 4
  },
  {
    id: 3,
    name: 'PULL COL ROULÉ EN CACHEMIRE',
    category: 'Vêtements',
    price: 650,
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80',
    colors: ['#000000', '#FFFFFF', '#C0C0C0'],
    isNew: true,
    isOnSale: false,
    categoryId: 1
  },
  {
    id: 4,
    name: 'BOTTINES EN CUIR',
    category: 'Chaussures',
    price: 750,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80',
    colors: ['#000000', '#8B4513'],
    isNew: false,
    isOnSale: false,
    categoryId: 3
  },
  {
    id: 5,
    name: 'LUNETTES DE SOLEIL',
    category: 'Accessoires',
    price: 380,
    originalPrice: 450,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80',
    colors: ['#000000', '#8B4513'],
    isNew: false,
    isOnSale: true,
    categoryId: 2
  },
  {
    id: 6,
    name: 'MANTEAU LONG EN CACHEMIRE',
    category: 'Vêtements',
    price: 1890,
    image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&q=80',
    colors: ['#000000', '#8B4513', '#556B2F'],
    isNew: true,
    isOnSale: false,
    categoryId: 1
  },
  {
    id: 7,
    name: 'PORTEFEUILLE EN CUIR',
    category: 'Maroquinerie',
    price: 290,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80',
    colors: ['#000000', '#8B4513'],
    isNew: false,
    isOnSale: false,
    categoryId: 4
  },
  {
    id: 8,
    name: 'ÉCHARPE EN SOIE',
    category: 'Accessoires',
    price: 280,
    originalPrice: 350,
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&q=80',
    colors: ['#000000', '#8B4513', '#556B2F', '#800080'],
    isNew: false,
    isOnSale: true,
    categoryId: 2
  },
  {
    id: 9,
    name: 'SNEAKERS PREMIUM',
    category: 'Chaussures',
    price: 450,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80',
    colors: ['#FFFFFF', '#000000'],
    isNew: true,
    isOnSale: false,
    categoryId: 3
  }
])

const categories = ref<Category[]>([
  { id: 0, name: 'TOUT' },
  { id: 1, name: 'VÊTEMENTS' },
  { id: 2, name: 'ACCESSOIRES' },
  { id: 3, name: 'CHAUSSURES' },
  { id: 4, name: 'MAROQUINERIE' }
])

export function useProducts() {
  const selectedCategory = ref(0)
  const sortBy = ref('newest')
  const collectionFilter = ref<string | null>(null)

  const filteredProducts = computed(() => {
    let filtered = products.value
    
    // Filtre par collection (basé sur le nom de la collection)
    if (collectionFilter.value) {
      filtered = filtered.filter(product => {
        // Mapping collection -> catégorie pour la démo
        const collectionCategoryMap: Record<string, number[]> = {
          'Heritage': [1, 4], // Vêtements + Maroquinerie
          'Moderne': [1, 3], // Vêtements + Chaussures
          'Essentiels': [1, 2], // Vêtements + Accessoires
          'Soirée': [1, 2], // Vêtements + Accessoires
          'Cuir': [4], // Maroquinerie
          'Accessoires': [2] // Accessoires
        }
        const allowedCategories = collectionCategoryMap[collectionFilter.value!] || []
        return allowedCategories.includes(product.categoryId || 0)
      })
    }
    
    // Filtre par catégorie
    if (selectedCategory.value !== 0) {
      filtered = filtered.filter(product => product.categoryId === selectedCategory.value)
    }
    
    // Tri
    switch (sortBy.value) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
    }
    
    return filtered
  })

  const setCollectionFilter = (collection: string | null) => {
    collectionFilter.value = collection
    selectedCategory.value = 0 // Reset category filter
  }

  const clearFilters = () => {
    collectionFilter.value = null
    selectedCategory.value = 0
  }

  const viewProduct = (product: Product) => {
    console.log(`Viewing product ${product.id}`)
  }

  const quickView = (product: Product) => {
    console.log(`Quick view for product ${product.id}`)
  }

  return {
    products: filteredProducts,
    categories,
    selectedCategory,
    sortBy,
    collectionFilter,
    setCollectionFilter,
    clearFilters,
    viewProduct,
    quickView
  }
}
<template>
  <div class="shopping-page">
    <!-- Header Section -->
    <section class="shopping-header">
      <div class="container">
        <div class="shopping-header-content">
          <h1 class="shopping-title">BOUTIQUE</h1>
          <div class="header-divider"></div>
          <p class="shopping-subtitle">NOUVELLE COLLECTION AUTOMNE/HIVER</p>
        </div>
      </div>
    </section>

    <!-- Filters Section -->
    <section class="filters-section">
      <div class="container">
        <div class="filters-container">
          <div class="filter-group">
            <button 
              v-for="category in categories" 
              :key="category.id"
              :class="['filter-btn', { 'active': selectedCategory === category.id }]"
              @click="selectedCategory = category.id"
            >
              {{ category.name }}
            </button>
          </div>
          <div class="sort-group">
            <select v-model="sortBy" class="sort-select">
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="name">Nom</option>
              <option value="newest">Nouveautés</option>
            </select>
          </div>
        </div>
      </div>
    </section>

    <!-- Products Grid -->
    <section class="products-section">
      <div class="container">
        <div class="products-grid">
          <div 
            v-for="product in filteredProducts" 
            :key="product.id"
            class="product-card"
            @click="viewProduct(product.id)"
          >
            <div class="product-image-container">
              <img 
                :src="product.image"
                :alt="product.name"
                class="product-image"
              >
              <div class="product-overlay">
                <button class="quick-view-btn">APERÇU RAPIDE</button>
                <button class="add-to-cart-btn">AJOUTER AU PANIER</button>
              </div>
              <div v-if="product.isNew" class="product-badge new">NOUVEAU</div>
              <div v-if="product.isOnSale" class="product-badge sale">SOLDE</div>
            </div>
            <div class="product-info">
              <h3 class="product-name">{{ product.name }}</h3>
              <p class="product-category">{{ product.category }}</p>
              <div class="product-price">
                <span v-if="product.originalPrice" class="original-price">{{ product.originalPrice }}€</span>
                <span class="current-price">{{ product.price }}€</span>
              </div>
              <div class="product-colors">
                <div 
                  v-for="color in product.colors" 
                  :key="color"
                  :class="['color-swatch', color]"
                  :style="{ backgroundColor: color }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="newsletter-section">
      <div class="container">
        <div class="newsletter-content">
          <h2 class="newsletter-title">RESTEZ INFORMÉ</h2>
          <p class="newsletter-desc">Recevez en avant-première les nouvelles collections et offres exclusives</p>
          <form @submit.prevent="subscribeNewsletter" class="newsletter-form">
            <input 
              v-model="email" 
              type="email" 
              placeholder="Votre adresse email"
              class="newsletter-input"
              required
            >
            <button type="submit" class="newsletter-btn">S'ABONNER</button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Product {
  id: number
  name: string
  category: string
  price: number
  originalPrice?: number
  image: string
  colors: string[]
  isNew: boolean
  isOnSale: boolean
  categoryId: number
}

interface Category {
  id: number
  name: string
}

const selectedCategory = ref(0)
const sortBy = ref('newest')
const email = ref('')

const categories = ref<Category[]>([
  { id: 0, name: 'TOUT' },
  { id: 1, name: 'VÊTEMENTS' },
  { id: 2, name: 'ACCESSOIRES' },
  { id: 3, name: 'CHAUSSURES' },
  { id: 4, name: 'MAROQUINERIE' }
])

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

const filteredProducts = computed(() => {
  let filtered = selectedCategory.value === 0 
    ? products.value 
    : products.value.filter(product => product.categoryId === selectedCategory.value)
  
  // Sort products
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

const viewProduct = (productId: number) => {
  console.log(`Viewing product ${productId}`)
}

const subscribeNewsletter = () => {
  if (email.value) {
    console.log(`Subscribing email: ${email.value}`)
    email.value = ''
  }
}
</script>

<style scoped>
.shopping-page {
  min-height: 100vh;
  background-color: #ffffff;
}

/* Header Section */
.shopping-header {
  background-color: #f8f8f8;
  padding: 4rem 0;
  text-align: center;
}

.shopping-title {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 300;
  letter-spacing: 0.2em;
  margin: 0;
  color: #000000;
}

.header-divider {
  width: 60px;
  height: 1px;
  background-color: #000000;
  margin: 1.5rem auto;
}

.shopping-subtitle {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  margin: 0;
  color: #666666;
  text-transform: uppercase;
}

/* Filters Section */
.filters-section {
  background-color: #ffffff;
  padding: 2rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.filters-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

@media (max-width: 768px) {
  .filters-container {
    flex-direction: column;
    gap: 1rem;
  }
}

.filter-group {
  display: flex;
  gap: 0;
}

.filter-btn {
  background: transparent;
  border: 1px solid #e0e0e0;
  border-right: none;
  color: #666666;
  padding: 0.75rem 1.5rem;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-btn:first-child {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.filter-btn:last-child {
  border-right: 1px solid #e0e0e0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.filter-btn:hover,
.filter-btn.active {
  background-color: #000000;
  color: #ffffff;
  border-color: #000000;
}

.sort-select {
  background: transparent;
  border: 1px solid #e0e0e0;
  color: #666666;
  padding: 0.75rem 1rem;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%2C9%2012%2C15%2018%2C9%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 12px;
  padding-right: 2.5rem;
}

/* Products Section */
.products-section {
  background-color: #ffffff;
  padding: 4rem 0;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

@media (min-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1200px) {
  .products-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.product-card {
  cursor: pointer;
  transition: all 0.3s ease;
}

.product-card:hover {
  transform: translateY(-2px);
}

.product-image-container {
  position: relative;
  overflow: hidden;
  aspect-ratio: 3/4;
  background-color: #f8f8f8;
  margin-bottom: 1rem;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.product-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  padding: 1rem;
  transform: translateY(100%);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.product-card:hover .product-overlay {
  transform: translateY(0);
}

.quick-view-btn,
.add-to-cart-btn {
  background: transparent;
  border: 1px solid #ffffff;
  color: #ffffff;
  padding: 0.5rem 1rem;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 0.625rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-to-cart-btn {
  background-color: #ffffff;
  color: #000000;
}

.quick-view-btn:hover {
  background-color: #ffffff;
  color: #000000;
}

.add-to-cart-btn:hover {
  background-color: #000000;
  color: #ffffff;
}

.product-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.625rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  z-index: 2;
}

.product-badge.new {
  background-color: #000000;
  color: #ffffff;
}

.product-badge.sale {
  background-color: #ff4444;
  color: #ffffff;
}

.product-info {
  text-align: center;
}

.product-name {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
  color: #000000;
  text-transform: uppercase;
}

.product-category {
  font-size: 0.75rem;
  color: #666666;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.product-price {
  margin-bottom: 0.75rem;
}

.original-price {
  font-size: 0.75rem;
  color: #999999;
  text-decoration: line-through;
  margin-right: 0.5rem;
}

.current-price {
  font-size: 0.875rem;
  font-weight: 500;
  color: #000000;
}

.product-colors {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.color-swatch {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid #e0e0e0;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.color-swatch:hover {
  transform: scale(1.2);
}

/* Newsletter Section */
.newsletter-section {
  background-color: #000000;
  color: #ffffff;
  padding: 4rem 0;
  text-align: center;
}

.newsletter-title {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 1.5rem;
  font-weight: 300;
  letter-spacing: 0.15em;
  margin-bottom: 1rem;
}

.newsletter-desc {
  font-size: 0.875rem;
  opacity: 0.8;
  margin-bottom: 2rem;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.newsletter-form {
  display: flex;
  max-width: 400px;
  margin: 0 auto;
  gap: 0;
}

@media (max-width: 640px) {
  .newsletter-form {
    flex-direction: column;
    gap: 1rem;
  }
}

.newsletter-input {
  flex: 1;
  padding: 1rem 1.5rem;
  background-color: #ffffff;
  border: none;
  color: #000000;
  font-size: 0.875rem;
  outline: none;
}

.newsletter-btn {
  background-color: #000000;
  border: 1px solid #ffffff;
  color: #ffffff;
  padding: 1rem 2rem;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.newsletter-btn:hover {
  background-color: #ffffff;
  color: #000000;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .shopping-header {
    padding: 3rem 0;
  }
  
  .products-section {
    padding: 3rem 0;
  }
  
  .newsletter-section {
    padding: 3rem 0;
  }
}
</style>
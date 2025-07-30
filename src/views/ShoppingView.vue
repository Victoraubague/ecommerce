<template>
  <div class="shopping-page">
    <PageHero 
      :title="collectionFilter ? `COLLECTION ${collectionFilter.toUpperCase()}` : 'BOUTIQUE'" 
      :subtitle="collectionFilter ? `Découvrez notre collection ${collectionFilter}` : 'NOUVELLE COLLECTION AUTOMNE/HIVER'"
    />

    <FilterGroup 
      :categories="categories"
      :selectedCategory="selectedCategory"
      :sortBy="sortBy"
      @categoryChange="selectedCategory = $event"
      @sortChange="sortBy = $event"
    />

    <section class="products-section">
      <div class="container">
        <div v-if="collectionFilter" class="active-filters">
          <div class="filter-tag">
            Collection: {{ collectionFilter }}
            <button @click="clearFilters" class="remove-filter">×</button>
          </div>
        </div>
        <div class="products-grid">
          <ProductCard
            v-for="product in products" 
            :key="product.id"
            :product="product"
            :isInWishlist="wishlistStore.isInWishlist(product.id)"
            @click="navigateToProduct"
            @quickView="quickView"
            @addToCart="addToCart"
            @toggleWishlist="toggleWishlist"
          />
        </div>
      </div>
    </section>

    <NewsletterSection @subscribe="subscribe" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'
import { PageHero, FilterGroup, ProductCard, NewsletterSection } from '@/components/ui'
import { useProducts } from '@/composables/useProducts'
import { useNewsletter } from '@/composables/useNewsletter'
import type { Product } from '@/types'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

const { 
  products, 
  categories, 
  selectedCategory, 
  sortBy, 
  collectionFilter,
  setCollectionFilter,
  clearFilters,
  viewProduct, 
  quickView 
} = useProducts()
const { subscribe } = useNewsletter()

// Récupérer le filtre collection depuis l'URL
onMounted(() => {
  const collectionParam = route.query.collection as string
  if (collectionParam) {
    setCollectionFilter(collectionParam)
  }
})

const navigateToProduct = (product: Product) => {
  router.push(`/product/${product.id}`)
}

const addToCart = (product: Product) => {
  cartStore.addItem({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    category: product.category
  })
}

const toggleWishlist = (product: Product) => {
  wishlistStore.toggleItem({
    id: product.id,
    name: product.name,
    price: product.price,
    originalPrice: product.originalPrice,
    image: product.image,
    category: product.category,
    colors: product.colors,
    isNew: product.isNew,
    isOnSale: product.isOnSale
  })
}
</script>

<style scoped>
.shopping-page {
  min-height: 100vh;
  background-color: #ffffff;
}

.products-section {
  background-color: #ffffff;
  padding: 4rem 0;
}

.active-filters {
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
}

.filter-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #000000;
  color: #ffffff;
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.remove-filter {
  background: none;
  border: none;
  color: #ffffff;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0;
  line-height: 1;
}

.remove-filter:hover {
  opacity: 0.7;
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

@media (max-width: 768px) {
  .products-section {
    padding: 3rem 0;
  }
}
</style>
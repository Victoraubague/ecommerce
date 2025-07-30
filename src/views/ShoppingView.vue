<template>
  <div class="shopping-page">
    <PageHero 
      title="BOUTIQUE" 
      subtitle="NOUVELLE COLLECTION AUTOMNE/HIVER"
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
        <div class="products-grid">
          <ProductCard
            v-for="product in products" 
            :key="product.id"
            :product="product"
            :isInWishlist="wishlistStore.isInWishlist(product.id)"
            @click="viewProduct"
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
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'
import { PageHero, FilterGroup, ProductCard, NewsletterSection } from '@/components/ui'
import { useProducts } from '@/composables/useProducts'
import { useNewsletter } from '@/composables/useNewsletter'
import type { Product } from '@/types'

const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

const { products, categories, selectedCategory, sortBy, viewProduct, quickView } = useProducts()
const { subscribe } = useNewsletter()

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
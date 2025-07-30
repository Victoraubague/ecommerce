<template>
  <div 
    class="product-card"
    @click="$emit('click', product)"
  >
    <div class="product-image-container">
      <img 
        :src="product.image"
        :alt="product.name"
        class="product-image"
      >
      <div class="product-overlay">
        <BaseButton 
          @click.stop="$emit('quickView', product)" 
          variant="minimal"
          size="sm"
        >
          APERÇU RAPIDE
        </BaseButton>
        <BaseButton 
          @click.stop="$emit('addToCart', product)" 
          variant="secondary"
          size="sm"
        >
          AJOUTER AU PANIER
        </BaseButton>
      </div>
      <button 
        @click.stop="$emit('toggleWishlist', product)"
        :class="['wishlist-btn', { 'active': isInWishlist }]"
        title="Ajouter aux favoris"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </button>
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
      <div v-if="product.colors" class="product-colors">
        <div 
          v-for="color in product.colors" 
          :key="color"
          :class="['color-swatch', color]"
          :style="{ backgroundColor: color }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from './BaseButton.vue'
import type { Product } from '@/types'

interface Props {
  product: Product
  isInWishlist?: boolean
}

defineProps<Props>()

defineEmits<{
  click: [product: Product]
  quickView: [product: Product]
  addToCart: [product: Product]
  toggleWishlist: [product: Product]
}>()
</script>

<style scoped>
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

.wishlist-btn {
  position: absolute;
  top: 1rem;
  left: 1rem;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 2;
  opacity: 0;
}

.product-card:hover .wishlist-btn {
  opacity: 1;
}

.wishlist-btn svg {
  width: 18px;
  height: 18px;
  stroke-width: 1.5;
  color: #666666;
  transition: all 0.3s ease;
}

.wishlist-btn:hover svg,
.wishlist-btn.active svg {
  color: #ff4444;
}

.wishlist-btn.active {
  background: rgba(255, 68, 68, 0.1);
  opacity: 1;
}

.wishlist-btn.active svg {
  fill: #ff4444;
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
</style>
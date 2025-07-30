<template>
  <Teleport to="body">
    <div v-if="wishlistStore.isOpen" class="wishlist-overlay" @click="wishlistStore.closeWishlist">
      <div class="wishlist-sidebar" @click.stop>
        <div class="wishlist-header">
          <h2 class="wishlist-title">FAVORIS</h2>
          <button @click="wishlistStore.closeWishlist" class="wishlist-close-btn">
            <svg class="close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div class="wishlist-content">
          <div v-if="wishlistStore.isEmpty" class="wishlist-empty">
            <div class="empty-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </div>
            <h3 class="empty-title">AUCUN FAVORI</h3>
            <p class="empty-desc">Ajoutez vos pièces préférées à votre liste de souhaits</p>
            <button @click="goToShopping" class="btn-shop">DÉCOUVRIR</button>
          </div>

          <div v-else class="wishlist-items">
            <div v-for="item in wishlistStore.items" :key="item.id" class="wishlist-item">
              <div class="item-image">
                <img :src="item.image" :alt="item.name" class="item-img">
                <div v-if="item.isNew" class="item-badge new">NOUVEAU</div>
                <div v-if="item.isOnSale" class="item-badge sale">SOLDE</div>
              </div>
              
              <div class="item-details">
                <h4 class="item-name">{{ item.name }}</h4>
                <p class="item-category">{{ item.category }}</p>
                <div class="item-colors">
                  <div 
                    v-for="color in item.colors" 
                    :key="color"
                    class="color-swatch"
                    :style="{ backgroundColor: color }"
                  ></div>
                </div>
                <div class="item-price">
                  <span v-if="item.originalPrice" class="original-price">{{ item.originalPrice }}€</span>
                  <span class="current-price">{{ item.price }}€</span>
                </div>
              </div>

              <div class="item-actions">
                <button 
                  @click="addToCart(item)"
                  class="add-to-cart-btn"
                  title="Ajouter au panier"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z"></path>
                    <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z"></path>
                    <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6"></path>
                  </svg>
                </button>
                
                <button 
                  @click="removeFromWishlist(item)"
                  class="remove-btn"
                  title="Supprimer des favoris"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <polyline points="3,6 5,6 21,6"></polyline>
                    <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-if="!wishlistStore.isEmpty" class="wishlist-footer">
          <div class="wishlist-actions">
            <button @click="clearWishlist" class="btn-outline">VIDER LA LISTE</button>
            <button @click="addAllToCart" class="btn-primary">TOUT AJOUTER AU PANIER</button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useWishlistStore } from '@/stores/wishlist'
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'
import type { WishlistItem } from '@/stores/wishlist'

const wishlistStore = useWishlistStore()
const cartStore = useCartStore()
const router = useRouter()

const addToCart = (item: WishlistItem) => {
  cartStore.addItem({
    id: item.id,
    name: item.name,
    price: item.price,
    image: item.image,
    category: item.category
  })
  
  // Optionnel : retirer de la wishlist après ajout au panier
  // wishlistStore.removeItem(item.id)
}

const removeFromWishlist = (item: WishlistItem) => {
  wishlistStore.removeItem(item.id)
}

const goToShopping = () => {
  wishlistStore.closeWishlist()
  router.push('/shopping')
}

const clearWishlist = () => {
  if (confirm('Êtes-vous sûr de vouloir vider votre liste de favoris ?')) {
    wishlistStore.clearWishlist()
  }
}

const addAllToCart = () => {
  wishlistStore.items.forEach(item => {
    cartStore.addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category
    })
  })
  
  // Optionnel : vider la wishlist après ajout
  // wishlistStore.clearWishlist()
  
  // Fermer la wishlist et ouvrir le panier
  wishlistStore.closeWishlist()
  cartStore.openCart()
}
</script>

<style scoped>
.wishlist-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 9999;
  animation: fadeIn 0.3s ease;
}

.wishlist-sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 480px;
  height: 100vh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  animation: slideInRight 0.3s ease;
}

@media (max-width: 640px) {
  .wishlist-sidebar {
    max-width: 100%;
  }
}

.wishlist-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  border-bottom: 1px solid #f0f0f0;
}

.wishlist-title {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 1.25rem;
  font-weight: 300;
  letter-spacing: 0.15em;
  margin: 0;
  color: #000000;
}

.wishlist-close-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: #666666;
  transition: color 0.3s ease;
}

.wishlist-close-btn:hover {
  color: #000000;
}

.close-icon {
  width: 20px;
  height: 20px;
  stroke-width: 1.5;
}

.wishlist-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem 2rem;
}

.wishlist-empty {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 2rem;
  color: #e0e0e0;
}

.empty-icon svg {
  width: 100%;
  height: 100%;
  stroke-width: 1;
}

.empty-title {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 1.1rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
  color: #000000;
}

.empty-desc {
  font-size: 0.875rem;
  color: #666666;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.btn-shop {
  background-color: #000000;
  color: #ffffff;
  border: none;
  padding: 1rem 2rem;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-shop:hover {
  background-color: #333333;
}

.wishlist-items {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.wishlist-item {
  display: flex;
  gap: 1rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #f0f0f0;
}

.wishlist-item:last-child {
  border-bottom: none;
}

.item-image {
  position: relative;
  flex-shrink: 0;
  width: 100px;
  height: 130px;
  overflow: hidden;
}

.item-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-badge {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.625rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  z-index: 2;
}

.item-badge.new {
  background-color: #000000;
  color: #ffffff;
}

.item-badge.sale {
  background-color: #ff4444;
  color: #ffffff;
}

.item-details {
  flex: 1;
  min-width: 0;
}

.item-name {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
  color: #000000;
  text-transform: uppercase;
}

.item-category {
  font-size: 0.75rem;
  color: #666666;
  margin-bottom: 0.75rem;
  text-transform: uppercase;
}

.item-colors {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.color-swatch {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid #e0e0e0;
}

.item-price {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.original-price {
  font-size: 0.75rem;
  color: #999999;
  text-decoration: line-through;
}

.current-price {
  font-size: 0.875rem;
  font-weight: 500;
  color: #000000;
}

.item-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-end;
}

.add-to-cart-btn,
.remove-btn {
  width: 36px;
  height: 36px;
  background: none;
  border: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-to-cart-btn:hover {
  border-color: #000000;
  background-color: #000000;
  color: #ffffff;
}

.remove-btn:hover {
  border-color: #ff4444;
  color: #ff4444;
}

.add-to-cart-btn svg,
.remove-btn svg {
  width: 16px;
  height: 16px;
  stroke-width: 1.5;
}

.wishlist-footer {
  border-top: 1px solid #f0f0f0;
  padding: 2rem;
}

.wishlist-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.btn-outline,
.btn-primary {
  padding: 1rem 2rem;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.btn-outline {
  background: transparent;
  border: 1px solid #000000;
  color: #000000;
}

.btn-outline:hover {
  background-color: #000000;
  color: #ffffff;
}

.btn-primary {
  background-color: #000000;
  border: 1px solid #000000;
  color: #ffffff;
}

.btn-primary:hover {
  background-color: #333333;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideInRight {
  from { 
    opacity: 0;
    transform: translateX(100%); 
  }
  to { 
    opacity: 1;
    transform: translateX(0); 
  }
}
</style>
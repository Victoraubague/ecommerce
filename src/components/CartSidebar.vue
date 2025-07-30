<template>
  <Teleport to="body">
    <div v-if="cartStore.isOpen" class="cart-overlay" @click="cartStore.closeCart">
      <div class="cart-sidebar" @click.stop>
        <div class="cart-header">
          <h2 class="cart-title">PANIER</h2>
          <button @click="cartStore.closeCart" class="cart-close-btn">
            <svg class="close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div class="cart-content">
          <div v-if="cartStore.isEmpty" class="cart-empty">
            <div class="empty-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z"></path>
                <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z"></path>
                <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6"></path>
              </svg>
            </div>
            <h3 class="empty-title">VOTRE PANIER EST VIDE</h3>
            <p class="empty-desc">Découvrez nos collections et ajoutez vos pièces préférées</p>
            <button @click="goToShopping" class="btn-shop">DÉCOUVRIR</button>
          </div>

          <div v-else class="cart-items">
            <div v-for="item in cartStore.items" :key="`${item.id}-${item.color}`" class="cart-item">
              <div class="item-image">
                <img :src="item.image" :alt="item.name" class="item-img">
              </div>
              
              <div class="item-details">
                <h4 class="item-name">{{ item.name }}</h4>
                <p class="item-category">{{ item.category }}</p>
                <div v-if="item.color" class="item-color">
                  <span class="color-label">Couleur:</span>
                  <div 
                    class="color-dot" 
                    :style="{ backgroundColor: item.color }"
                  ></div>
                </div>
                <div class="item-price">{{ item.price }}€</div>
              </div>

              <div class="item-controls">
                <div class="quantity-controls">
                  <button 
                    @click="decreaseQuantity(item)"
                    class="quantity-btn"
                    :disabled="item.quantity <= 1"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </button>
                  <span class="quantity">{{ item.quantity }}</span>
                  <button 
                    @click="increaseQuantity(item)"
                    class="quantity-btn"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </button>
                </div>
                
                <button 
                  @click="removeItem(item)"
                  class="remove-btn"
                  title="Supprimer"
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

        <div v-if="!cartStore.isEmpty" class="cart-footer">
          <div class="cart-summary">
            <div class="summary-row">
              <span class="summary-label">SOUS-TOTAL</span>
              <span class="summary-value">{{ cartStore.totalPrice }}€</span>
            </div>
            <div class="summary-row">
              <span class="summary-label">LIVRAISON</span>
              <span class="summary-value">GRATUITE</span>
            </div>
            <div class="summary-row total">
              <span class="summary-label">TOTAL</span>
              <span class="summary-value">{{ cartStore.totalPrice }}€</span>
            </div>
          </div>

          <div class="cart-actions">
            <button @click="viewCart" class="btn-outline">VOIR LE PANIER</button>
            <button @click="checkout" class="btn-primary">COMMANDER</button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'
import type { CartItem } from '@/stores/cart'

const cartStore = useCartStore()
const router = useRouter()

const increaseQuantity = (item: CartItem) => {
  cartStore.updateQuantity(item.id, item.quantity + 1, item.color)
}

const decreaseQuantity = (item: CartItem) => {
  cartStore.updateQuantity(item.id, item.quantity - 1, item.color)
}

const removeItem = (item: CartItem) => {
  cartStore.removeItem(item.id, item.color)
}

const goToShopping = () => {
  cartStore.closeCart()
  router.push('/shopping')
}

const viewCart = () => {
  cartStore.closeCart()
  router.push('/cart')
}

const checkout = () => {
  cartStore.closeCart()
  router.push('/checkout')
}
</script>

<style scoped>
.cart-overlay {
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

.cart-sidebar {
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
  .cart-sidebar {
    max-width: 100%;
  }
}

.cart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  border-bottom: 1px solid #f0f0f0;
}

.cart-title {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 1.25rem;
  font-weight: 300;
  letter-spacing: 0.15em;
  margin: 0;
  color: #000000;
}

.cart-close-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: #666666;
  transition: color 0.3s ease;
}

.cart-close-btn:hover {
  color: #000000;
}

.close-icon {
  width: 20px;
  height: 20px;
  stroke-width: 1.5;
}

.cart-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem 2rem;
}

.cart-empty {
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

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.cart-item {
  display: flex;
  gap: 1rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #f0f0f0;
}

.cart-item:last-child {
  border-bottom: none;
}

.item-image {
  flex-shrink: 0;
  width: 80px;
  height: 100px;
  overflow: hidden;
}

.item-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

.item-color {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.color-label {
  font-size: 0.75rem;
  color: #666666;
}

.color-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid #e0e0e0;
}

.item-price {
  font-size: 0.875rem;
  font-weight: 500;
  color: #000000;
}

.item-controls {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quantity-btn {
  width: 28px;
  height: 28px;
  background: none;
  border: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.quantity-btn:hover:not(:disabled) {
  border-color: #000000;
}

.quantity-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.quantity-btn svg {
  width: 12px;
  height: 12px;
  stroke-width: 2;
}

.quantity {
  font-size: 0.875rem;
  font-weight: 400;
  min-width: 2rem;
  text-align: center;
}

.remove-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  color: #999999;
  transition: color 0.3s ease;
}

.remove-btn:hover {
  color: #ff4444;
}

.remove-btn svg {
  width: 16px;
  height: 16px;
  stroke-width: 1.5;
}

.cart-footer {
  border-top: 1px solid #f0f0f0;
  padding: 2rem;
}

.cart-summary {
  margin-bottom: 2rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.summary-row.total {
  padding-top: 0.75rem;
  border-top: 1px solid #e0e0e0;
  font-weight: 500;
}

.summary-label {
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  color: #666666;
  text-transform: uppercase;
}

.summary-row.total .summary-label {
  color: #000000;
}

.summary-value {
  font-size: 0.875rem;
  font-weight: 400;
  color: #000000;
}

.cart-actions {
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
<template>
  <div class="cart-page">
    <div class="container">
      <div class="cart-header">
        <h1 class="cart-title">VOTRE PANIER</h1>
      </div>

      <div v-if="cartStore.isEmpty" class="cart-empty">
        <div class="empty-content">
          <div class="empty-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z"></path>
              <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z"></path>
              <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6"></path>
            </svg>
          </div>
          <h2 class="empty-title">VOTRE PANIER EST VIDE</h2>
          <p class="empty-desc">Découvrez nos collections et ajoutez vos pièces préférées</p>
          <BaseButton @click="goToShopping" variant="primary" size="lg">
            DÉCOUVRIR NOS COLLECTIONS
          </BaseButton>
        </div>
      </div>

      <div v-else class="cart-content">
        <div class="cart-items">
          <div class="items-header">
            <span class="header-product">PRODUIT</span>
            <span class="header-quantity">QUANTITÉ</span>
            <span class="header-price">PRIX</span>
            <span class="header-total">TOTAL</span>
            <span class="header-action"></span>
          </div>

          <div v-for="item in cartStore.items" :key="`${item.id}-${item.color}`" class="cart-item">
            <div class="item-product">
              <div class="item-image">
                <img :src="item.image" :alt="item.name" class="product-img">
              </div>
              <div class="item-info">
                <h3 class="item-name">{{ item.name }}</h3>
                <p class="item-category">{{ item.category }}</p>
                <div v-if="item.color" class="item-color">
                  <span class="color-label">Couleur:</span>
                  <div 
                    class="color-dot" 
                    :style="{ backgroundColor: item.color }"
                  ></div>
                </div>
              </div>
            </div>

            <div class="item-quantity">
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
            </div>

            <div class="item-price">{{ item.price }}€</div>
            <div class="item-total">{{ item.price * item.quantity }}€</div>
            
            <div class="item-action">
              <button 
                @click="removeItem(item)"
                class="remove-btn"
                title="Supprimer du panier"
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

        <div class="cart-summary">
          <div class="summary-section">
            <h3 class="summary-title">RÉSUMÉ DE COMMANDE</h3>
            
            <div class="summary-details">
              <div class="summary-row">
                <span class="summary-label">Sous-total ({{ cartStore.itemsCount }} {{ cartStore.itemsCount > 1 ? 'articles' : 'article' }})</span>
                <span class="summary-value">{{ cartStore.subtotal }}€</span>
              </div>
              <div class="summary-row">
                <span class="summary-label">Livraison</span>
                <span class="summary-value free">GRATUITE</span>
              </div>
              <div class="summary-row total">
                <span class="summary-label">Total</span>
                <span class="summary-value">{{ cartStore.totalPrice }}€</span>
              </div>
            </div>

            <div class="cart-actions">
              <BaseButton @click="continueShopping" variant="secondary" size="lg">
                CONTINUER MES ACHATS
              </BaseButton>
              <BaseButton @click="proceedToCheckout" variant="primary" size="lg">
                FINALISER MA COMMANDE
              </BaseButton>
            </div>

            <div class="cart-features">
              <div class="feature-item">
                <span class="feature-icon">🚚</span>
                <span class="feature-text">Livraison gratuite en France</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">🔄</span>
                <span class="feature-text">Retours gratuits sous 30 jours</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">🛡️</span>
                <span class="feature-text">Garantie à vie</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { BaseButton } from '@/components/ui'
import type { CartItem } from '@/stores/cart'

const router = useRouter()
const cartStore = useCartStore()

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
  router.push('/shopping')
}

const continueShopping = () => {
  router.push('/shopping')
}

const proceedToCheckout = () => {
  router.push('/checkout')
}
</script>

<style scoped>
.cart-page {
  min-height: 100vh;
  background-color: #ffffff;
  padding: 2rem 0;
}

.cart-header {
  text-align: center;
  margin-bottom: 3rem;
}

.cart-title {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 300;
  letter-spacing: 0.15em;
  margin: 0;
  color: #000000;
}

.cart-empty {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  text-align: center;
}

.empty-content {
  max-width: 400px;
}

.empty-icon {
  width: 100px;
  height: 100px;
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
  font-size: 1.5rem;
  font-weight: 300;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
  color: #000000;
}

.empty-desc {
  font-size: 1rem;
  color: #666666;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.cart-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
}

@media (min-width: 1024px) {
  .cart-content {
    grid-template-columns: 2fr 1fr;
    gap: 4rem;
  }
}

.cart-items {
  background-color: #ffffff;
}

.items-header {
  display: none;
  grid-template-columns: 2fr 1fr 1fr 1fr auto;
  gap: 2rem;
  padding: 1rem 0;
  border-bottom: 2px solid #000000;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #000000;
}

@media (min-width: 768px) {
  .items-header {
    display: grid;
  }
}

.cart-item {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 2rem 0;
  border-bottom: 1px solid #f0f0f0;
}

@media (min-width: 768px) {
  .cart-item {
    grid-template-columns: 2fr 1fr 1fr 1fr auto;
    gap: 2rem;
    align-items: center;
  }
}

.item-product {
  display: flex;
  gap: 1rem;
}

.item-image {
  flex-shrink: 0;
  width: 100px;
  height: 120px;
  overflow: hidden;
}

.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-info {
  flex: 1;
}

.item-name {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
  color: #000000;
  text-transform: uppercase;
}

.item-category {
  font-size: 0.875rem;
  color: #666666;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

.item-color {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.color-label {
  font-size: 0.75rem;
  color: #666666;
}

.color-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid #e0e0e0;
}

.item-quantity {
  display: flex;
  justify-content: flex-start;
}

@media (min-width: 768px) {
  .item-quantity {
    justify-content: center;
  }
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  border: 1px solid #e0e0e0;
  padding: 0.5rem;
}

.quantity-btn {
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.quantity-btn:hover:not(:disabled) {
  background-color: #f0f0f0;
}

.quantity-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.quantity-btn svg {
  width: 16px;
  height: 16px;
  stroke-width: 2;
}

.quantity {
  font-size: 1rem;
  font-weight: 400;
  min-width: 2rem;
  text-align: center;
}

.item-price,
.item-total {
  font-size: 1rem;
  font-weight: 400;
  color: #000000;
  text-align: left;
}

@media (min-width: 768px) {
  .item-price,
  .item-total {
    text-align: center;
  }
}

.item-action {
  display: flex;
  justify-content: flex-start;
}

@media (min-width: 768px) {
  .item-action {
    justify-content: center;
  }
}

.remove-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: #999999;
  transition: color 0.3s ease;
}

.remove-btn:hover {
  color: #ff4444;
}

.remove-btn svg {
  width: 20px;
  height: 20px;
  stroke-width: 1.5;
}

.cart-summary {
  background-color: #f8f8f8;
  padding: 2rem;
  height: fit-content;
}

.summary-title {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 1.25rem;
  font-weight: 300;
  letter-spacing: 0.1em;
  margin-bottom: 2rem;
  color: #000000;
}

.summary-details {
  margin-bottom: 2rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

.summary-row.total {
  font-size: 1.125rem;
  font-weight: 500;
  padding-top: 1rem;
  border-top: 1px solid #e0e0e0;
}

.summary-label {
  color: #666666;
}

.summary-row.total .summary-label {
  color: #000000;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.summary-value {
  font-weight: 400;
  color: #000000;
}

.summary-value.free {
  color: #28a745;
  font-weight: 500;
}

.cart-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.cart-features {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.feature-icon {
  font-size: 1.25rem;
}

.feature-text {
  font-size: 0.75rem;
  color: #666666;
}

@media (max-width: 768px) {
  .cart-item {
    padding: 1.5rem 0;
  }
  
  .item-price::before {
    content: 'Prix: ';
    font-weight: 500;
    color: #666666;
  }
  
  .item-total::before {
    content: 'Total: ';
    font-weight: 500;
    color: #666666;
  }
}
</style>
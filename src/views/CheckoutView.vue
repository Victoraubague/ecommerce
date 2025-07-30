<template>
  <div class="checkout-page">
    <div class="container">
      <div class="checkout-header">
        <h1 class="checkout-title">FINALISER LA COMMANDE</h1>
        <div class="checkout-steps">
          <div :class="['step', { 'active': currentStep === 1, 'completed': currentStep > 1 }]">
            <span class="step-number">1</span>
            <span class="step-label">Informations</span>
          </div>
          <div :class="['step', { 'active': currentStep === 2, 'completed': currentStep > 2 }]">
            <span class="step-number">2</span>
            <span class="step-label">Livraison</span>
          </div>
          <div :class="['step', { 'active': currentStep === 3 }]">
            <span class="step-number">3</span>
            <span class="step-label">Paiement</span>
          </div>
        </div>
      </div>

      <div class="checkout-grid">
        <div class="checkout-form">
          <!-- Étape 1: Informations personnelles -->
          <div v-if="currentStep === 1" class="checkout-step">
            <h2 class="step-title">INFORMATIONS PERSONNELLES</h2>
            <form @submit.prevent="nextStep" class="form">
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">PRÉNOM</label>
                  <input 
                    v-model="orderForm.firstName"
                    type="text" 
                    class="form-input"
                    required
                  >
                </div>
                <div class="form-group">
                  <label class="form-label">NOM</label>
                  <input 
                    v-model="orderForm.lastName"
                    type="text" 
                    class="form-input"
                    required
                  >
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">EMAIL</label>
                <input 
                  v-model="orderForm.email"
                  type="email" 
                  class="form-input"
                  required
                >
              </div>

              <div class="form-group">
                <label class="form-label">TÉLÉPHONE</label>
                <input 
                  v-model="orderForm.phone"
                  type="tel" 
                  class="form-input"
                  required
                >
              </div>

              <BaseButton type="submit" variant="primary" size="lg" class="next-btn">
                CONTINUER
              </BaseButton>
            </form>
          </div>

          <!-- Étape 2: Adresse de livraison -->
          <div v-if="currentStep === 2" class="checkout-step">
            <h2 class="step-title">ADRESSE DE LIVRAISON</h2>
            <form @submit.prevent="nextStep" class="form">
              <div class="form-group">
                <label class="form-label">ADRESSE</label>
                <input 
                  v-model="orderForm.address"
                  type="text" 
                  class="form-input"
                  placeholder="Numéro et nom de rue"
                  required
                >
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">CODE POSTAL</label>
                  <input 
                    v-model="orderForm.zipCode"
                    type="text" 
                    class="form-input"
                    required
                  >
                </div>
                <div class="form-group">
                  <label class="form-label">VILLE</label>
                  <input 
                    v-model="orderForm.city"
                    type="text" 
                    class="form-input"
                    required
                  >
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">PAYS</label>
                <select v-model="orderForm.country" class="form-select" required>
                  <option value="FR">France</option>
                  <option value="BE">Belgique</option>
                  <option value="CH">Suisse</option>
                  <option value="LU">Luxembourg</option>
                </select>
              </div>

              <div class="delivery-options">
                <h3 class="options-title">MODE DE LIVRAISON</h3>
                <div class="delivery-option">
                  <label class="option-label">
                    <input 
                      v-model="orderForm.deliveryMethod"
                      type="radio" 
                      value="standard"
                      class="option-radio"
                    >
                    <div class="option-content">
                      <div class="option-info">
                        <span class="option-name">Livraison Standard</span>
                        <span class="option-time">3-5 jours ouvrés</span>
                      </div>
                      <span class="option-price">GRATUIT</span>
                    </div>
                  </label>
                </div>
                <div class="delivery-option">
                  <label class="option-label">
                    <input 
                      v-model="orderForm.deliveryMethod"
                      type="radio" 
                      value="express"
                      class="option-radio"
                    >
                    <div class="option-content">
                      <div class="option-info">
                        <span class="option-name">Livraison Express</span>
                        <span class="option-time">24-48h</span>
                      </div>
                      <span class="option-price">15€</span>
                    </div>
                  </label>
                </div>
              </div>

              <div class="form-actions">
                <BaseButton @click="previousStep" variant="secondary" size="lg">
                  RETOUR
                </BaseButton>
                <BaseButton type="submit" variant="primary" size="lg">
                  CONTINUER
                </BaseButton>
              </div>
            </form>
          </div>

          <!-- Étape 3: Paiement -->
          <div v-if="currentStep === 3" class="checkout-step">
            <h2 class="step-title">PAIEMENT</h2>
            <form @submit.prevent="submitOrder" class="form">
              <div class="payment-methods">
                <h3 class="methods-title">MODE DE PAIEMENT</h3>
                <div class="payment-method">
                  <label class="method-label">
                    <input 
                      v-model="orderForm.paymentMethod"
                      type="radio" 
                      value="card"
                      class="method-radio"
                    >
                    <span class="method-name">Carte bancaire</span>
                  </label>
                </div>
                <div class="payment-method">
                  <label class="method-label">
                    <input 
                      v-model="orderForm.paymentMethod"
                      type="radio" 
                      value="paypal"
                      class="method-radio"
                    >
                    <span class="method-name">PayPal</span>
                  </label>
                </div>
              </div>

              <div v-if="orderForm.paymentMethod === 'card'" class="card-form">
                <div class="form-group">
                  <label class="form-label">NUMÉRO DE CARTE</label>
                  <input 
                    v-model="orderForm.cardNumber"
                    type="text" 
                    class="form-input"
                    placeholder="1234 5678 9012 3456"
                    required
                  >
                </div>

                <div class="form-row">
                  <div class="form-group">
                    <label class="form-label">EXPIRATION</label>
                    <input 
                      v-model="orderForm.cardExpiry"
                      type="text" 
                      class="form-input"
                      placeholder="MM/AA"
                      required
                    >
                  </div>
                  <div class="form-group">
                    <label class="form-label">CVV</label>
                    <input 
                      v-model="orderForm.cardCvv"
                      type="text" 
                      class="form-input"
                      placeholder="123"
                      required
                    >
                  </div>
                </div>

                <div class="form-group">
                  <label class="form-label">NOM SUR LA CARTE</label>
                  <input 
                    v-model="orderForm.cardName"
                    type="text" 
                    class="form-input"
                    required
                  >
                </div>
              </div>

              <div class="form-actions">
                <BaseButton @click="previousStep" variant="secondary" size="lg">
                  RETOUR
                </BaseButton>
                <BaseButton 
                  type="submit" 
                  variant="primary" 
                  size="lg"
                  :loading="isSubmitting"
                >
                  FINALISER LA COMMANDE
                </BaseButton>
              </div>
            </form>
          </div>
        </div>

        <!-- Résumé de commande -->
        <div class="order-summary">
          <h3 class="summary-title">RÉSUMÉ DE COMMANDE</h3>
          
          <div class="cart-items">
            <div 
              v-for="item in cartStore.items" 
              :key="item.id"
              class="cart-item"
            >
              <img :src="item.image" :alt="item.name" class="item-image">
              <div class="item-info">
                <div class="item-name">{{ item.name }}</div>
                <div class="item-details">
                  <span class="item-quantity">{{ item.quantity }}x</span>
                  <span class="item-price">{{ item.price }}€</span>
                </div>
              </div>
            </div>
          </div>

          <div class="order-totals">
            <div class="total-line">
              <span>Sous-total</span>
              <span>{{ cartStore.subtotal }}€</span>
            </div>
            <div class="total-line">
              <span>Livraison</span>
              <span>{{ deliveryPrice }}€</span>
            </div>
            <div class="total-line total">
              <span>Total</span>
              <span>{{ totalPrice }}€</span>
            </div>
          </div>

          <div class="security-info">
            <div class="security-item">
              <span class="security-icon">🔒</span>
              <span class="security-text">Paiement sécurisé</span>
            </div>
            <div class="security-item">
              <span class="security-icon">🚚</span>
              <span class="security-text">Livraison gratuite</span>
            </div>
            <div class="security-item">
              <span class="security-icon">🔄</span>
              <span class="security-text">Retours 30 jours</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { BaseButton } from '@/components/ui'

const router = useRouter()
const cartStore = useCartStore()

const currentStep = ref(1)
const isSubmitting = ref(false)

const orderForm = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  zipCode: '',
  city: '',
  country: 'FR',
  deliveryMethod: 'standard',
  paymentMethod: 'card',
  cardNumber: '',
  cardExpiry: '',
  cardCvv: '',
  cardName: ''
})

const deliveryPrice = computed(() => {
  return orderForm.deliveryMethod === 'express' ? 15 : 0
})

const totalPrice = computed(() => {
  return cartStore.subtotal + deliveryPrice.value
})

const nextStep = () => {
  if (currentStep.value < 3) {
    currentStep.value++
  }
}

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const submitOrder = async () => {
  isSubmitting.value = true
  
  try {
    // Simuler l'envoi de commande
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log('Order submitted:', orderForm)
    console.log('Cart items:', cartStore.items)
    
    // Vider le panier
    cartStore.clearCart()
    
    // Rediriger vers une page de confirmation
    router.push('/order-success')
    
  } catch (error) {
    console.error('Error submitting order:', error)
    alert('Une erreur est survenue. Veuillez réessayer.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.checkout-page {
  min-height: 100vh;
  background-color: #ffffff;
  padding: 2rem 0;
}

.checkout-header {
  text-align: center;
  margin-bottom: 3rem;
}

.checkout-title {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 300;
  letter-spacing: 0.15em;
  margin-bottom: 2rem;
  color: #000000;
}

.checkout-steps {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
}

.step {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  opacity: 0.5;
  transition: opacity 0.3s ease;
}

.step.active,
.step.completed {
  opacity: 1;
}

.step-number {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #e0e0e0;
  color: #666666;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 500;
}

.step.active .step-number {
  background-color: #000000;
  color: #ffffff;
}

.step.completed .step-number {
  background-color: #28a745;
  color: #ffffff;
}

.step-label {
  font-size: 0.875rem;
  font-weight: 400;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.checkout-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
}

@media (min-width: 1024px) {
  .checkout-grid {
    grid-template-columns: 2fr 1fr;
    gap: 4rem;
  }
}

.checkout-step {
  max-width: 600px;
}

.step-title {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 1.25rem;
  font-weight: 300;
  letter-spacing: 0.1em;
  margin-bottom: 2rem;
  color: #000000;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .form-row {
    grid-template-columns: 1fr 1fr;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  color: #000000;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

.form-input,
.form-select {
  padding: 1rem 0;
  border: none;
  border-bottom: 1px solid #e0e0e0;
  background: transparent;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 0.875rem;
  color: #000000;
  transition: border-color 0.3s ease;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-bottom-color: #000000;
}

.form-select {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%2C9%2012%2C15%2018%2C9%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 0 center;
  background-size: 16px;
  padding-right: 2rem;
}

.delivery-options {
  margin-top: 1rem;
}

.options-title,
.methods-title {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
  color: #000000;
  text-transform: uppercase;
}

.delivery-option,
.payment-method {
  border: 1px solid #e0e0e0;
  margin-bottom: 0.5rem;
  transition: border-color 0.3s ease;
}

.delivery-option:hover,
.payment-method:hover {
  border-color: #000000;
}

.option-label,
.method-label {
  display: flex;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
}

.option-radio,
.method-radio {
  margin-right: 1rem;
}

.option-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.option-name,
.method-name {
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.option-time {
  font-size: 0.75rem;
  color: #666666;
}

.option-price {
  font-weight: 500;
  color: #000000;
}

.card-form {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e0e0e0;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.next-btn {
  margin-top: 2rem;
}

.order-summary {
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

.cart-items {
  margin-bottom: 2rem;
}

.cart-item {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e0e0e0;
}

.item-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
}

.item-name {
  font-size: 0.875rem;
  font-weight: 400;
  margin-bottom: 0.25rem;
}

.item-details {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #666666;
}

.order-totals {
  margin-bottom: 2rem;
}

.total-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.total-line.total {
  font-weight: 500;
  font-size: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e0e0e0;
}

.security-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.security-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.security-icon {
  font-size: 1rem;
}

.security-text {
  font-size: 0.75rem;
  color: #666666;
}
</style>
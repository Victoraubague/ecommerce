<template>
  <div class="order-success-page">
    <div class="container">
      <div class="success-content">
        <div class="success-icon">
          <div class="checkmark">✓</div>
        </div>
        
        <h1 class="success-title">COMMANDE CONFIRMÉE</h1>
        <p class="success-subtitle">
          Merci pour votre commande ! Vous recevrez un email de confirmation sous peu.
        </p>

        <div class="order-details">
          <div class="detail-item">
            <span class="detail-label">Numéro de commande</span>
            <span class="detail-value">#{{ orderNumber }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Date de commande</span>
            <span class="detail-value">{{ orderDate }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Livraison estimée</span>
            <span class="detail-value">{{ deliveryDate }}</span>
          </div>
        </div>

        <div class="success-actions">
          <BaseButton @click="continueShopping" variant="primary" size="lg">
            CONTINUER MES ACHATS
          </BaseButton>
          <BaseButton @click="viewAccount" variant="secondary" size="lg">
            VOIR MES COMMANDES
          </BaseButton>
        </div>

        <div class="next-steps">
          <h3 class="steps-title">PROCHAINES ÉTAPES</h3>
          <div class="steps-list">
            <div class="step-item">
              <div class="step-number">1</div>
              <div class="step-content">
                <h4 class="step-title">Confirmation par email</h4>
                <p class="step-desc">Vous recevrez un email de confirmation avec tous les détails de votre commande.</p>
              </div>
            </div>
            <div class="step-item">
              <div class="step-number">2</div>
              <div class="step-content">
                <h4 class="step-title">Préparation</h4>
                <p class="step-desc">Nos artisans préparent soigneusement votre commande dans nos ateliers.</p>
              </div>
            </div>
            <div class="step-item">
              <div class="step-number">3</div>
              <div class="step-content">
                <h4 class="step-title">Expédition</h4>
                <p class="step-desc">Votre commande sera expédiée et vous recevrez un numéro de suivi.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { BaseButton } from '@/components/ui'

const router = useRouter()

const orderNumber = ref('')
const orderDate = ref('')
const deliveryDate = ref('')

const generateOrderNumber = () => {
  return Math.random().toString(36).substr(2, 9).toUpperCase()
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

const continueShopping = () => {
  router.push('/shopping')
}

const viewAccount = () => {
  router.push('/account')
}

onMounted(() => {
  orderNumber.value = generateOrderNumber()
  const today = new Date()
  orderDate.value = formatDate(today)
  
  const delivery = new Date()
  delivery.setDate(delivery.getDate() + 5)
  deliveryDate.value = formatDate(delivery)
})
</script>

<style scoped>
.order-success-page {
  min-height: 100vh;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  padding: 2rem 0;
}

.success-content {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.success-icon {
  margin-bottom: 2rem;
}

.checkmark {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #28a745;
  color: #ffffff;
  font-size: 2.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.success-title {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 300;
  letter-spacing: 0.15em;
  margin-bottom: 1rem;
  color: #000000;
}

.success-subtitle {
  font-size: 1.125rem;
  color: #666666;
  margin-bottom: 3rem;
  line-height: 1.6;
}

.order-details {
  background-color: #f8f8f8;
  padding: 2rem;
  margin-bottom: 3rem;
  border-radius: 0;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e0e0e0;
}

.detail-item:last-child {
  border-bottom: none;
}

.detail-label {
  font-size: 0.875rem;
  color: #666666;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.detail-value {
  font-size: 0.875rem;
  font-weight: 500;
  color: #000000;
}

.success-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 4rem;
}

@media (min-width: 640px) {
  .success-actions {
    flex-direction: row;
    justify-content: center;
  }
}

.next-steps {
  text-align: left;
  background-color: #f8f8f8;
  padding: 2rem;
}

.steps-title {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 1.25rem;
  font-weight: 300;
  letter-spacing: 0.1em;
  margin-bottom: 2rem;
  color: #000000;
  text-align: center;
}

.steps-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.step-item {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #000000;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-title {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
  color: #000000;
  text-transform: uppercase;
}

.step-desc {
  font-size: 0.875rem;
  color: #666666;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .success-actions {
    flex-direction: column;
  }
  
  .next-steps {
    padding: 1.5rem;
  }
  
  .step-item {
    gap: 1rem;
  }
}
</style>
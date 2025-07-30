<template>
  <section class="cta-section">
    <div class="container">
      <div class="cta-grid">

        <div class="cta-content">
          <div class="cta-header">
            <div class="brand-divider cta-divider"></div>
            <h2 class="section-title cta-title">
              <span class="cta-title-main">L'Art de</span>
              <span class="cta-title-accent">l'Excellence</span>
            </h2>
            <p class="cta-description">
              Chaque création témoigne d'un savoir-faire transmis de génération en génération. 
              Une approche authentique du luxe, loin des artifices.
            </p>
          </div>

          <div class="cta-values">
            <div class="cta-value">
              <div class="cta-value-mark"></div>
              <div class="cta-value-content">
                <h3 class="cta-value-title">Artisanat Français</h3>
                <p class="cta-value-text">Façonnage traditionnel dans nos ateliers parisiens depuis quatre générations.</p>
              </div>
            </div>
            
            <div class="cta-value">
              <div class="cta-value-mark"></div>
              <div class="cta-value-content">
                <h3 class="cta-value-title">Matières Nobles</h3>
                <p class="cta-value-text">Sélection rigoureuse des plus belles fibres naturelles européennes.</p>
              </div>
            </div>
            
            <div class="cta-value">
              <div class="cta-value-mark"></div>
              <div class="cta-value-content">
                <h3 class="cta-value-title">Pièces Uniques</h3>
                <p class="cta-value-text">Productions limitées pour préserver l'exclusivité de chaque création.</p>
              </div>
            </div>
          </div>

          <button @click="goToShopping" class="btn-secondary cta-button">DÉCOUVRIR NOS CRÉATIONS</button>
        </div>

        <div class="newsletter-container">
          <div class="newsletter-card">
            <h3 class="newsletter-title">Correspondance Privée</h3>
            <p class="newsletter-description">
              Recevez en avant-première nos nouvelles créations et invitations à nos événements exclusifs.
            </p>
            
            <form @submit.prevent="subscribeNewsletter" class="newsletter-form">
              <input 
                v-model="email"
                type="email" 
                placeholder="Votre adresse email"
                class="input-luxury newsletter-input"
                required
              >
              <button 
                type="submit"
                :disabled="isSubscribing"
                class="btn-primary newsletter-submit"
              >
                <span v-if="!isSubscribing">REJOINDRE</span>
                <span v-else>TRAITEMENT...</span>
              </button>
            </form>
            
            <p v-if="subscriptionMessage" class="newsletter-message" :class="subscriptionSuccess ? 'newsletter-success' : 'newsletter-error'">
              {{ subscriptionMessage }}
            </p>

            <div class="newsletter-partners">
              <p class="text-caption newsletter-partners-label">PARTENAIRES D'EXCELLENCE</p>
              <div class="newsletter-partners-list">
                <span class="newsletter-partner">HERMÈS</span>
                <span class="newsletter-partner">CHANEL</span>
                <span class="newsletter-partner">DIOR</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const isSubscribing = ref(false)
const subscriptionMessage = ref('')
const subscriptionSuccess = ref(false)

const goToShopping = () => {
  router.push('/shopping')
}

const subscribeNewsletter = async () => {
  isSubscribing.value = true
  subscriptionMessage.value = ''
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    subscriptionSuccess.value = true
    subscriptionMessage.value = 'Merci pour votre inscription !'
    email.value = ''
  } catch (error) {
    subscriptionSuccess.value = false
    subscriptionMessage.value = 'Une erreur est survenue. Veuillez réessayer.'
  } finally {
    isSubscribing.value = false
  }
}

</script>

<style scoped>

.cta-section {
  background-color: var(--bg-primary);
  padding: var(--space-32) 0;
  position: relative;
}

.cta-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--color-neutral-100) 0%, var(--color-neutral-200) 100%);
  opacity: 0.3;
}

.cta-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-20);
  align-items: flex-start;
  position: relative;
  z-index: 1;
}

@media (min-width: 1024px) {
  .cta-grid {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-24);
  }
}

.cta-content {
  color: var(--text-primary);
}

.cta-header {
  margin-bottom: var(--space-16);
}

.cta-divider {
  background-color: var(--text-primary);
}

.cta-title {
  color: var(--text-primary);
  margin: var(--space-8) 0 var(--space-12);
}

.cta-title-main {
  display: block;
  font-weight: var(--font-weight-light);
}

.cta-title-accent {
  display: block;
  font-style: italic;
  font-weight: var(--font-weight-normal);
  margin-top: var(--space-2);
}

.cta-description {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  line-height: var(--line-height-relaxed);
}

.cta-values {
  margin-bottom: var(--space-16);
}

.cta-value {
  display: flex;
  align-items: flex-start;
  gap: var(--space-6);
  margin-bottom: var(--space-8);
}

.cta-value:last-child {
  margin-bottom: 0;
}

.cta-value-mark {
  width: 1px;
  height: var(--space-12);
  background-color: var(--text-primary);
  margin-top: var(--space-2);
  flex-shrink: 0;
}

.cta-value-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}

.cta-value-text {
  color: var(--text-secondary);
  line-height: var(--line-height-relaxed);
}

.cta-button {
  color: var(--text-primary);
  border-color: var(--text-primary);
}

.cta-button:hover {
  background-color: var(--text-primary);
  color: var(--text-inverse);
}

.newsletter-container {
  margin-top: var(--space-16);
}

@media (min-width: 1024px) {
  .newsletter-container {
    margin-top: 0;
  }
}

.newsletter-card {
  border: 1px solid var(--border-strong);
  padding: var(--space-12);
  background-color: var(--bg-elevated);
  box-shadow: var(--shadow-subtle);
}

.newsletter-title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-light);
  color: var(--text-primary);
  margin-bottom: var(--space-6);
}

.newsletter-description {
  color: var(--text-secondary);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--space-8);
}

.newsletter-form {
  margin-bottom: var(--space-6);
}

.newsletter-input {
  margin-bottom: var(--space-6);
  color: var(--text-primary);
  border-color: var(--border-strong);
}

.newsletter-input::placeholder {
  color: var(--text-muted);
}

.newsletter-input:focus {
  border-color: var(--text-primary);
}

.newsletter-submit {
  background-color: var(--text-primary);
  color: var(--text-inverse);
}

.newsletter-submit:hover {
  background-color: var(--text-secondary);
  color: var(--text-inverse);
}

.newsletter-message {
  font-size: var(--font-size-sm);
  margin-top: var(--space-6);
}

.newsletter-success {
  color: var(--text-primary);
}

.newsletter-error {
  color: var(--color-error);
}

.newsletter-partners {
  margin-top: var(--space-12);
  padding-top: var(--space-8);
  border-top: 1px solid var(--border-strong);
}

.newsletter-partners-label {
  color: var(--text-muted);
  margin-bottom: var(--space-4);
}

.newsletter-partners-list {
  display: flex;
  align-items: center;
  gap: var(--space-8);
  opacity: 0.6;
}

.newsletter-partner {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-light);
  color: var(--text-secondary);
}
</style>
<template>
  <footer class="app-footer">
    <div class="container">

      <div class="footer-main">
        <div class="footer-grid">

          <div class="footer-brand">
            <div class="footer-brand-header">
              <div class="brand-divider"></div>
              <h3 class="footer-brand-title">LUXE</h3>
            </div>
            <p class="footer-brand-description">
              Créateur français de pièces d'exception, 
              alliant savoir-faire traditionnel et élégance contemporaine 
              depuis 2020.
            </p>

            <div class="footer-social">
              <a href="#" class="social-link" aria-label="Instagram">
                <svg class="social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="m16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" class="social-link" aria-label="Pinterest">
                <svg class="social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                </svg>
              </a>
              <a href="#" class="social-link" aria-label="Facebook">
                <svg class="social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>
          </div>

          <div class="footer-column">
            <h4 class="footer-column-title">Collections</h4>
            <ul class="footer-links">
              <li><router-link to="/products/heritage" class="footer-link">Héritage</router-link></li>
              <li><router-link to="/products/contemporary" class="footer-link">Contemporain</router-link></li>
              <li><router-link to="/products/essentials" class="footer-link">Essentiels</router-link></li>
              <li><router-link to="/products/limited" class="footer-link">Éditions Limitées</router-link></li>
              <li><router-link to="/products/accessories" class="footer-link">Accessoires</router-link></li>
            </ul>
          </div>

          <div class="footer-column">
            <h4 class="footer-column-title">Services</h4>
            <ul class="footer-links">
              <li><router-link to="/services/personal-styling" class="footer-link">Conseil Personnel</router-link></li>
              <li><router-link to="/services/alterations" class="footer-link">Retouches</router-link></li>
              <li><router-link to="/services/care" class="footer-link">Entretien</router-link></li>
              <li><router-link to="/services/appointments" class="footer-link">Rendez-vous</router-link></li>
              <li><router-link to="/services/vip" class="footer-link">Service VIP</router-link></li>
            </ul>
          </div>

          <div class="footer-column">
            <h4 class="footer-column-title">Assistance</h4>
            <ul class="footer-links">
              <li><router-link to="/help/contact" class="footer-link">Nous Contacter</router-link></li>
              <li><router-link to="/help/size-guide" class="footer-link">Guide des Tailles</router-link></li>
              <li><router-link to="/help/shipping" class="footer-link">Livraison</router-link></li>
              <li><router-link to="/help/returns" class="footer-link">Retours & Échanges</router-link></li>
              <li><router-link to="/help/faq" class="footer-link">FAQ</router-link></li>
            </ul>
          </div>

          <div class="footer-newsletter">
            <h4 class="footer-column-title">Correspondance</h4>
            <p class="newsletter-description">
              Recevez nos actualités et invitations exclusives.
            </p>
            
            <form @submit.prevent="subscribeNewsletter" class="newsletter-form">
              <input 
                v-model="email"
                type="email"
                placeholder="Votre email"
                class="input-luxury newsletter-input"
                required
              >
              <button 
                type="submit"
                :disabled="isSubscribing"
                class="btn-secondary newsletter-submit"
              >
                <span v-if="!isSubscribing">S'INSCRIRE</span>
                <span v-else>...</span>
              </button>
            </form>
            
            <p v-if="subscriptionMessage" 
               class="newsletter-message" 
               :class="subscriptionSuccess ? 'newsletter-success' : 'newsletter-error'">
              {{ subscriptionMessage }}
            </p>
          </div>
          
        </div>
      </div>

      <div class="footer-bottom">
        <div class="footer-bottom-content">

          <div class="footer-legal">
            <router-link to="/legal/privacy" class="legal-link">Confidentialité</router-link>
            <router-link to="/legal/terms" class="legal-link">Conditions d'Utilisation</router-link>
            <router-link to="/legal/cookies" class="legal-link">Cookies</router-link>
          </div>

          <div class="footer-payments">
            <span class="payment-label">PAIEMENTS ACCEPTÉS</span>
            <div class="payment-methods">
              <div class="payment-method" title="Visa">VISA</div>
              <div class="payment-method" title="Mastercard">MC</div>
              <div class="payment-method" title="American Express">AMEX</div>
              <div class="payment-method" title="PayPal">PP</div>
            </div>
          </div>

          <div class="footer-copyright">
            <p class="copyright-text">
              © {{ currentYear }} LUXE. Tous droits réservés.
            </p>
            <p class="made-with">
              Conçu à Paris avec attention aux détails.
            </p>
          </div>
          
        </div>
      </div>
      
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const email = ref('')
const isSubscribing = ref(false)
const subscriptionMessage = ref('')
const subscriptionSuccess = ref(false)

const currentYear = computed(() => new Date().getFullYear())

</script>

<style scoped>
.app-footer {
  background-color: var(--bg-inverse);
  color: var(--text-inverse);
  margin-top: var(--space-32);
}

.footer-main {
  padding: var(--space-20) 0 var(--space-16);
}

.footer-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-12);
}

@media (min-width: 640px) {
  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-16);
  }
}

@media (min-width: 1024px) {
  .footer-grid {
    grid-template-columns: 1.5fr repeat(4, 1fr);
    gap: var(--space-20);
  }
}

.footer-brand {
  max-width: 20rem;
}

.footer-brand-header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-6);
}

.footer-brand-title {
  font-family: var(--font-display);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-normal);
  color: var(--text-inverse);
  letter-spacing: 0.1em;
  margin: 0;
}

.footer-brand-description {
  color: var(--text-inverse);
  opacity: 0.8;
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--space-8);
}

.footer-social {
  display: flex;
  gap: var(--space-4);
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--space-10);
  height: var(--space-10);
  color: var(--text-inverse);
  opacity: 0.7;
  transition: opacity var(--transition-fast);
  text-decoration: none;
}

.social-link:hover {
  opacity: 1;
}

.social-icon {
  width: var(--space-5);
  height: var(--space-5);
  stroke-width: 1.5;
}

.footer-column-title {
  font-family: var(--font-primary);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-inverse);
  margin-bottom: var(--space-6);
}

.footer-links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.footer-link {
  color: var(--text-inverse);
  opacity: 0.8;
  text-decoration: none;
  font-size: var(--font-size-sm);
  transition: opacity var(--transition-fast);
  line-height: var(--line-height-relaxed);
}

.footer-link:hover {
  opacity: 1;
}

.footer-newsletter {
  max-width: 20rem;
}

.newsletter-description {
  color: var(--text-inverse);
  opacity: 0.8;
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--space-6);
  font-size: var(--font-size-sm);
}

.newsletter-form {
  margin-bottom: var(--space-4);
}

.newsletter-input {
  width: 100%;
  background-color: transparent;
  border-color: var(--text-inverse);
  color: var(--text-inverse);
  margin-bottom: var(--space-4);
}

.newsletter-input::placeholder {
  color: var(--text-inverse);
  opacity: 0.6;
}

.newsletter-input:focus {
  border-color: var(--text-inverse);
  opacity: 1;
}

.newsletter-submit {
  width: 100%;
  background-color: transparent;
  color: var(--text-inverse);
  border-color: var(--text-inverse);
  font-size: var(--font-size-sm);
}

.newsletter-submit:hover {
  background-color: var(--text-inverse);
  color: var(--bg-inverse);
}

.newsletter-message {
  font-size: var(--font-size-sm);
  margin-top: var(--space-3);
}

.newsletter-success {
  color: var(--color-success);
}

.newsletter-error {
  color: var(--color-error);
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: var(--space-8) 0;
}

.footer-bottom-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
  align-items: center;
}

@media (min-width: 768px) {
  .footer-bottom-content {
    grid-template-columns: 1fr auto 1fr;
    gap: var(--space-8);
  }
}

.footer-legal {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-6);
}

.legal-link {
  font-family: var(--font-primary);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-xs);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-inverse);
  opacity: 0.7;
  text-decoration: none;
  transition: opacity var(--transition-fast);
}

.legal-link:hover {
  opacity: 1;
}

.footer-payments {
  text-align: center;
}

.payment-label {
  font-family: var(--font-primary);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-inverse);
  opacity: 0.6;
  display: block;
  margin-bottom: var(--space-3);
}

.payment-methods {
  display: flex;
  gap: var(--space-3);
  justify-content: center;
}

.payment-method {
  font-family: var(--font-primary);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-xs);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-inverse);
  opacity: 0.7;
  padding: var(--space-1) var(--space-2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-sm);
}

.footer-copyright {
  text-align: center;
}

@media (min-width: 768px) {
  .footer-copyright {
    text-align: right;
  }
}

.copyright-text {
  font-family: var(--font-primary);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-inverse);
  opacity: 0.7;
  margin-bottom: var(--space-1);
}

.made-with {
  font-family: var(--font-primary);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-inverse);
  opacity: 0.5;
  font-style: italic;
}

@media (max-width: 767px) {
  .footer-bottom-content {
    text-align: center;
  }
  
  .footer-legal {
    justify-content: center;
  }
}
</style>
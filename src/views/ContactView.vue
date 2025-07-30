<template>
  <div class="contact-page">
    <PageHero 
      title="CONTACT" 
      subtitle="NOUS SOMMES À VOTRE ÉCOUTE"
    />

    <section class="contact-info-section">
      <div class="container">
        <div class="contact-info-grid">
          <div class="contact-info-item">
            <div class="contact-icon">
              <div class="icon-square"></div>
            </div>
            <h3 class="contact-info-title">BOUTIQUE PARIS</h3>
            <div class="contact-info-details">
              <p>25 Avenue des Champs-Élysées</p>
              <p>75008 Paris, France</p>
              <p class="contact-hours">Lun-Sam: 10h-19h</p>
            </div>
          </div>
          
          <div class="contact-info-item">
            <div class="contact-icon">
              <div class="icon-circle-contact"></div>
            </div>
            <h3 class="contact-info-title">TÉLÉPHONE</h3>
            <div class="contact-info-details">
              <p>+33 1 42 86 88 88</p>
              <p>Service Client</p>
              <p class="contact-hours">Lun-Ven: 9h-18h</p>
            </div>
          </div>

          <div class="contact-info-item">
            <div class="contact-icon">
              <div class="icon-diamond"></div>
            </div>
            <h3 class="contact-info-title">EMAIL</h3>
            <div class="contact-info-details">
              <p>contact@luxe.fr</p>
              <p>Demandes générales</p>
              <p class="contact-hours">Réponse sous 24h</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <ContactForm @submit="submitContactForm" />

    <section class="services-section">
      <div class="container">
        <div class="services-header">
          <h2 class="services-title">NOS SERVICES</h2>
          <div class="services-divider"></div>
        </div>
        <div class="services-grid">
          <div class="service-card">
            <h3 class="service-title">CONSEIL PERSONNALISÉ</h3>
            <p class="service-desc">
              Nos experts vous accompagnent dans le choix de vos pièces 
              selon vos goûts et votre morphologie.
            </p>
          </div>
          <div class="service-card">
            <h3 class="service-title">LIVRAISON PREMIUM</h3>
            <p class="service-desc">
              Livraison gratuite en France métropolitaine, 
              emballage soigné dans nos coffrets signature.
            </p>
          </div>
          <div class="service-card">
            <h3 class="service-title">RETOUCHES</h3>
            <p class="service-desc">
              Service de retouches dans nos ateliers 
              pour un ajustement parfait.
            </p>
          </div>
          <div class="service-card">
            <h3 class="service-title">GARANTIE VIE</h3>
            <p class="service-desc">
              Nos artisans s'engagent à réparer 
              et entretenir vos pièces à vie.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="map-section">
      <div class="map-placeholder">
        <div class="map-content">
          <h3 class="map-title">TROUVEZ-NOUS</h3>
          <p class="map-address">
            25 Avenue des Champs-Élysées<br>
            75008 Paris, France
          </p>
          <div class="map-transport">
            <div class="transport-item">
              <span class="transport-type">MÉTRO</span>
              <span class="transport-info">George V (Ligne 1)</span>
            </div>
            <div class="transport-item">
              <span class="transport-type">BUS</span>
              <span class="transport-info">Lignes 28, 32, 73</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { PageHero, ContactForm } from '@/components/ui'
import { useContact } from '@/composables/useContact'

const { submitContactForm } = useContact()
</script>

<style scoped>
.contact-page {
  min-height: 100vh;
  background-color: #ffffff;
}

.contact-info-section {
  padding: 6rem 0;
  background-color: #ffffff;
}

.contact-info-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
}

@media (min-width: 768px) {
  .contact-info-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.contact-info-item {
  text-align: center;
  padding: 2rem;
}

.contact-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-square,
.icon-circle-contact,
.icon-diamond {
  border: 2px solid #000000;
}

.icon-square {
  width: 30px;
  height: 30px;
  background: transparent;
}

.icon-circle-contact {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: transparent;
}

.icon-diamond {
  width: 30px;
  height: 30px;
  background: transparent;
  transform: rotate(45deg);
}

.contact-info-title {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
  color: #000000;
  text-transform: uppercase;
}

.contact-info-details p {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 0.875rem;
  font-weight: 300;
  line-height: 1.6;
  color: #333333;
  margin-bottom: 0.25rem;
}

.contact-hours {
  color: #666666 !important;
  font-style: italic;
}

.services-section {
  padding: 6rem 0;
  background-color: #ffffff;
}

.services-header {
  text-align: center;
  margin-bottom: 4rem;
}

.services-title {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 300;
  letter-spacing: 0.15em;
  margin-bottom: 1.5rem;
  color: #000000;
}

.services-divider {
  width: 60px;
  height: 1px;
  background-color: #000000;
  margin: 0 auto;
}

.services-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 768px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .services-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.service-card {
  padding: 2rem;
  text-align: center;
  border: 1px solid #f0f0f0;
  transition: border-color 0.3s ease;
}

.service-card:hover {
  border-color: #000000;
}

.service-title {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
  color: #000000;
  text-transform: uppercase;
}

.service-desc {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 0.75rem;
  font-weight: 300;
  line-height: 1.6;
  color: #666666;
}

.map-section {
  background-color: #f8f8f8;
}

.map-placeholder {
  height: 400px;
  background: linear-gradient(135deg, #e0e0e0 0%, #f0f0f0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.map-content {
  text-align: center;
  color: #000000;
}

.map-title {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 1.5rem;
  font-weight: 300;
  letter-spacing: 0.15em;
  margin-bottom: 1rem;
}

.map-address {
  font-size: 0.875rem;
  font-weight: 300;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: #333333;
}

.map-transport {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.transport-item {
  display: flex;
  justify-content: center;
  gap: 1rem;
  align-items: center;
}

.transport-type {
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  color: #000000;
  text-transform: uppercase;
  min-width: 60px;
}

.transport-info {
  font-size: 0.75rem;
  font-weight: 300;
  color: #666666;
}

@media (max-width: 768px) {
  .contact-info-section,
  .services-section {
    padding: 4rem 0;
  }
}
</style>
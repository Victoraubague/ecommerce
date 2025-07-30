<template>
  <section class="hero-section">
    <div class="container">
      <div class="hero-grid">
        
        <!-- Content Left -->
        <div class="hero-content">
          <!-- Brand Mark -->
          <div class="brand-divider"></div>
          
          <h1 class="hero-title">
            <span class="hero-title-main">Élégance</span>
            <span class="hero-title-accent">Intemporelle</span>
          </h1>
          
          <p class="hero-description">
            Une collection soigneusement sélectionnée où chaque pièce raconte une histoire d'artisanat et de raffinement.
          </p>
          
          <!-- CTA -->
          <button @click="goToShopping" class="btn-primary hero-cta">
            DÉCOUVRIR
          </button>
          
          <!-- Stats -->
          <div class="hero-stats">
            <div class="hero-stat">
              <div class="hero-stat-value">Depuis 2020</div>
              <div class="hero-stat-label">Artisanat français</div>
            </div>
            <div class="hero-stat">
              <div class="hero-stat-value">500+</div>
              <div class="hero-stat-label">Créations uniques</div>
            </div>
            <div class="hero-stat">
              <div class="hero-stat-value">Mondial</div>
              <div class="hero-stat-label">Livraison gratuite</div>
            </div>
          </div>
        </div>
        
        <!-- Hero Image Right -->
        <div class="hero-image-container">
          <div class="hero-image-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"
              alt="Collection Heritage"
              class="hero-image"
            >
            
            <!-- Image Overlay -->
            <div class="hero-image-overlay">
              <p class="text-caption">COLLECTION HERITAGE</p>
              <p class="hero-overlay-text">
                Pièces intemporelles conçues pour durer, inspirées par l'héritage artisanal français.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goToShopping = () => {
  router.push('/shopping')
}
</script>

<style scoped>
.hero-section {
  min-height: 80vh;
  display: flex;
  align-items: center;
  background-color: var(--bg-primary);
  position: relative;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-16);
  align-items: center;
  padding: var(--space-32) 0;
}

@media (min-width: 1024px) {
  .hero-grid {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-24);
  }
}

.hero-content {
  order: 2;
}

@media (min-width: 1024px) {
  .hero-content {
    order: 1;
    max-width: 32rem;
  }
}

.hero-title {
  margin: var(--space-8) 0 var(--space-12);
}

.hero-title-main {
  display: block;
  font-weight: var(--font-weight-light);
}

.hero-title-accent {
  display: block;
  font-style: italic;
  font-weight: var(--font-weight-normal);
  margin-top: var(--space-2);
}

.hero-description {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--space-16);
}

.hero-cta {
  margin-bottom: var(--space-20);
}

.hero-stats {
  display: flex;
  align-items: center;
  gap: var(--space-8);
  padding-top: var(--space-8);
  border-top: 1px solid var(--border-default);
}

.hero-stat {
  text-align: center;
}

.hero-stat-value {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
  margin-bottom: var(--space-1);
}

.hero-stat-label {
  font-size: var(--font-size-xs);
  color: var(--text-muted);
}

.hero-image-container {
  order: 1;
}

@media (min-width: 1024px) {
  .hero-image-container {
    order: 2;
  }
}

.hero-image-wrapper {
  position: relative;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 4/5;
}

.hero-image-overlay {
  position: absolute;
  bottom: var(--space-8);
  left: var(--space-8);
  background-color: var(--bg-elevated);
  backdrop-filter: blur(8px);
  padding: var(--space-6);
  max-width: 20rem;
}

.hero-overlay-text {
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  line-height: var(--line-height-relaxed);
  margin-top: var(--space-2);
}

</style>
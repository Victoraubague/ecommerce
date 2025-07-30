<template>
  <div class="collections-page">
    <!-- Hero Section -->
    <section class="collections-hero">
      <div class="hero-background"></div>
      <div class="container">
        <div class="collections-hero-content">
          <h1 class="collections-hero-title">
            COLLECTIONS
          </h1>
          <div class="hero-divider"></div>
          <p class="collections-hero-description">
            EXPLORATION DU STYLE CONTEMPORAIN
          </p>
        </div>
      </div>
    </section>

    <!-- Collections Grid -->
    <section class="collections-grid-section">
      <div class="container">
        <div class="collections-grid">
          <div 
            v-for="collection in collections" 
            :key="collection.id"
            class="collection-card"
            @click="viewCollection(collection.id)"
          >
            <div class="collection-image-container">
              <img 
                :src="collection.image"
                :alt="collection.name"
                class="collection-image"
              >
              <div class="collection-overlay">
                <div class="collection-info">
                  <h3 class="collection-name">{{ collection.name.toUpperCase() }}</h3>
                  <div class="collection-details">
                    <span class="collection-count">{{ collection.itemCount }} PIÈCES</span>
                    <span class="collection-price">{{ collection.startingPrice }}€</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Statement Section -->
    <section class="statement-section">
      <div class="container">
        <div class="statement-content">
          <h2 class="statement-title">CRÉATIVITÉ SANS LIMITES</h2>
          <p class="statement-text">
            Chaque collection représente une vision unique, 
            une approche moderne de l'élégance intemporelle.
          </p>
        </div>
      </div>
    </section>

    <!-- Large Featured Collection -->
    <section class="large-featured-section">
      <div class="large-featured-image">
        <img 
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80"
          alt="Collection Heritage"
          class="large-image"
        >
      </div>
      <div class="large-featured-content">
        <div class="container">
          <div class="featured-info">
            <h3 class="featured-collection-name">HERITAGE</h3>
            <p class="featured-collection-desc">
              L'artisanat traditionnel français réinterprété avec une vision contemporaine. 
              Une célébration de l'excellence et du savoir-faire ancestral.
            </p>
            <div class="featured-specs">
              <div class="spec-item">
                <span class="spec-label">ÉDITION</span>
                <span class="spec-value">LIMITÉE</span>
              </div>
              <div class="spec-item">
                <span class="spec-label">PIÈCES</span>
                <span class="spec-value">25</span>
              </div>
              <div class="spec-item">
                <span class="spec-label">ORIGINE</span>
                <span class="spec-value">FRANCE</span>
              </div>
            </div>
            <button class="btn-minimal featured-cta">
              DÉCOUVRIR LA COLLECTION
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Collection {
  id: number
  name: string
  description: string
  image: string
  itemCount: number
  startingPrice: number
}

const collections = ref<Collection[]>([
  {
    id: 1,
    name: "Heritage",
    description: "Pièces intemporelles inspirées de l'artisanat traditionnel français",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80",
    itemCount: 25,
    startingPrice: 180
  },
  {
    id: 2,
    name: "Moderne",
    description: "Lignes épurées et coupes contemporaines pour un style urbain",
    image: "https://images.unsplash.com/photo-1578662996442-7cfa79e83d57?w=600&q=80",
    itemCount: 32,
    startingPrice: 120
  },
  {
    id: 3,
    name: "Essentiels",
    description: "Les basiques revisités avec une attention particulière aux détails",
    image: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600&q=80",
    itemCount: 18,
    startingPrice: 95
  },
  {
    id: 4,
    name: "Soirée",
    description: "Élégance raffinée pour vos occasions spéciales",
    image: "https://images.unsplash.com/photo-1583627149055-72e92d8c5d4c?w=600&q=80",
    itemCount: 15,
    startingPrice: 350
  },
  {
    id: 5,
    name: "Cuir",
    description: "Maroquinerie d'exception en cuir italien sélectionné",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&q=80",
    itemCount: 12,
    startingPrice: 450
  },
  {
    id: 6,
    name: "Accessoires",
    description: "Finitions parfaites pour compléter votre style",
    image: "https://images.unsplash.com/photo-1506629905327-b58f4ae08b9e?w=600&q=80",
    itemCount: 28,
    startingPrice: 65
  }
])

const email = ref('')

const viewCollection = (collectionId: number) => {
  console.log(`Viewing collection ${collectionId}`)
  // Navigation logic would go here
}

const subscribeNewsletter = () => {
  if (email.value) {
    console.log(`Subscribing email: ${email.value}`)
    // Newsletter subscription logic would go here
    email.value = ''
  }
}
</script>

<style scoped>
.collections-page {
  min-height: 100vh;
  background-color: #ffffff;
}

/* Hero Section - Inspired by luxury brands */
.collections-hero {
  position: relative;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000000;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, #000000 0%, #1a1a1a 100%);
  opacity: 0.9;
}

.collections-hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: #ffffff;
}

.collections-hero-title {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: clamp(3rem, 8vw, 8rem);
  font-weight: 300;
  letter-spacing: 0.2em;
  margin: 0;
  line-height: 0.9;
}

.hero-divider {
  width: 60px;
  height: 1px;
  background-color: #ffffff;
  margin: 2rem auto;
}

.collections-hero-description {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  letter-spacing: 0.15em;
  margin: 0;
  text-transform: uppercase;
}

/* Collections Grid - Minimal luxury style */
.collections-grid-section {
  background-color: #ffffff;
  padding: 6rem 0;
}

.collections-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 0;
}

@media (min-width: 768px) {
  .collections-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1200px) {
  .collections-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.collection-card {
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  border: 1px solid #f0f0f0;
}

.collection-card:hover {
  border-color: #000000;
}

.collection-image-container {
  position: relative;
  overflow: hidden;
  aspect-ratio: 3/4;
  background-color: #f8f8f8;
}

.collection-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.collection-card:hover .collection-image {
  transform: scale(1.02);
}

.collection-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 1.5rem;
  transform: translateY(100%);
  transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.collection-card:hover .collection-overlay {
  transform: translateY(0);
}

.collection-info {
  text-align: center;
}

.collection-name {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 1.1rem;
  font-weight: 300;
  letter-spacing: 0.1em;
  margin-bottom: 0.75rem;
  color: #000000;
}

.collection-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.05em;
  color: #666666;
  text-transform: uppercase;
}

/* Statement Section */
.statement-section {
  background-color: #f8f8f8;
  padding: 4rem 0;
  text-align: center;
}

.statement-content {
  max-width: 600px;
  margin: 0 auto;
}

.statement-title {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 300;
  letter-spacing: 0.15em;
  margin-bottom: 1.5rem;
  color: #000000;
}

.statement-text {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.6;
  color: #666666;
  margin: 0;
}

/* Large Featured Section */
.large-featured-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  background-color: #000000;
}

.large-featured-image {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.large-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.6;
}

.large-featured-content {
  position: relative;
  z-index: 2;
  width: 100%;
  padding: 4rem 0;
}

.featured-info {
  max-width: 500px;
  color: #ffffff;
  margin-left: auto;
  margin-right: 4rem;
}

@media (max-width: 768px) {
  .featured-info {
    margin: 0 auto;
    text-align: center;
  }
}

.featured-collection-name {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 300;
  letter-spacing: 0.2em;
  margin-bottom: 2rem;
  line-height: 1;
}

.featured-collection-desc {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.6;
  margin-bottom: 3rem;
  opacity: 0.9;
}

.featured-specs {
  display: flex;
  gap: 3rem;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

@media (max-width: 640px) {
  .featured-specs {
    flex-direction: column;
    gap: 1rem;
  }
}

.spec-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.spec-label {
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  opacity: 0.7;
  text-transform: uppercase;
}

.spec-value {
  font-size: 0.875rem;
  font-weight: 300;
  letter-spacing: 0.05em;
}

.btn-minimal {
  background: transparent;
  border: 1px solid #ffffff;
  color: #ffffff;
  padding: 1rem 2rem;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-minimal:hover {
  background-color: #ffffff;
  color: #000000;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .collections-hero {
    min-height: 60vh;
  }
  
  .collections-grid-section {
    padding: 3rem 0;
  }
  
  .statement-section {
    padding: 3rem 0;
  }
  
  .large-featured-section {
    min-height: 80vh;
  }
  
  .featured-info {
    margin: 0 1rem;
    text-align: center;
  }
  
  .featured-specs {
    justify-content: center;
  }
}
</style>
<template>
  <div class="collections-page">
    <PageHero 
      title="COLLECTIONS" 
      subtitle="EXPLORATION DU STYLE CONTEMPORAIN"
      dark 
    />

    <section class="collections-grid-section">
      <div class="container">
        <div class="collections-grid">
          <CollectionCard 
            v-for="collection in collections" 
            :key="collection.id"
            :collection="collection"
            @click="viewCollection"
          />
        </div>
      </div>
    </section>

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
            <BaseButton variant="minimal">
              DÉCOUVRIR LA COLLECTION
            </BaseButton>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { PageHero, CollectionCard, BaseButton } from '@/components/ui'
import { useCollections } from '@/composables/useCollections'

const { collections, viewCollection } = useCollections()
</script>

<style scoped>
.collections-page {
  min-height: 100vh;
  background-color: #ffffff;
}

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
  color: #ffffff;
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

@media (max-width: 768px) {
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
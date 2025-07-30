<template>
  <div class="maison-page">
    <PageHero 
      title="MAISON" 
      subtitle="L'ART DE L'EXCELLENCE FRANÇAISE"
    />

    <section class="story-section">
      <div class="container">
        <div class="story-grid">
          <div class="story-content">
            <h2 class="story-title">NOTRE HISTOIRE</h2>
            <div class="story-text">
              <p>
                Fondée en 1892 dans les ateliers parisiens, notre maison incarne plus d'un siècle 
                de savoir-faire exceptionnel. Chaque création naît de la rencontre entre tradition 
                artisanale et innovation contemporaine.
              </p>
              <p>
                Nous perpétuons l'héritage des maîtres artisans français, transmettant de génération 
                en génération les techniques les plus raffinées de la haute couture et de la maroquinerie.
              </p>
            </div>
            <div class="story-stats">
              <div class="stat-item">
                <div class="stat-number">1892</div>
                <div class="stat-label">FONDATION</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">130+</div>
                <div class="stat-label">ANNÉES D'EXPERTISE</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">50</div>
                <div class="stat-label">ARTISANS</div>
              </div>
            </div>
          </div>
          <div class="story-image">
            <img 
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"
              alt="Atelier artisanal"
              class="story-img"
            >
          </div>
        </div>
      </div>
    </section>

    <section class="values-section">
      <div class="container">
        <div class="values-header">
          <h2 class="values-title">NOS VALEURS</h2>
          <div class="values-divider"></div>
        </div>
        <div class="values-grid">
          <ValueCard 
            v-for="value in values" 
            :key="value.title"
            :title="value.title"
            :description="value.description"
            :icon="value.icon"
          />
        </div>
      </div>
    </section>

    <section class="philosophy-section">
      <div class="container">
        <div class="philosophy-content">
          <blockquote class="philosophy-quote">
            "L'élégance n'est pas se faire remarquer,
            c'est se faire retenir."
          </blockquote>
          <div class="philosophy-author">
            — GEORGES BRUMMELL
          </div>
          <p class="philosophy-text">
            Cette philosophie guide chacune de nos créations.
            Nous croyons en la beauté discrète, celle qui révèle
            sa richesse au fil du temps et des regards.
          </p>
        </div>
      </div>
    </section>

    <section class="materials-section">
      <div class="container">
        <div class="materials-header">
          <h2 class="materials-title">MATIÈRES D'EXCEPTION</h2>
          <p class="materials-subtitle">
            Nous sélectionnons les plus belles matières du monde entier
          </p>
        </div>
        <div class="materials-grid">
          <MaterialCard 
            v-for="material in materials" 
            :key="material.name"
            :material="material"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { PageHero, ValueCard, MaterialCard } from '@/components/ui'
import { useMaison } from '@/composables/useMaison'

const { materials, values } = useMaison()
</script>

<style scoped>
.maison-page {
  min-height: 100vh;
  background-color: #ffffff;
}

.story-section {
  padding: 6rem 0;
  background-color: #ffffff;
}

.story-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  align-items: center;
}

@media (min-width: 1024px) {
  .story-grid {
    grid-template-columns: 1fr 1fr;
    gap: 6rem;
  }
}

.story-title {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 300;
  letter-spacing: 0.15em;
  margin-bottom: 2rem;
  color: #000000;
}

.story-text p {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.8;
  color: #333333;
  margin-bottom: 1.5rem;
}

.story-stats {
  display: flex;
  gap: 3rem;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e0e0e0;
}

@media (max-width: 640px) {
  .story-stats {
    flex-direction: column;
    gap: 1.5rem;
  }
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 2rem;
  font-weight: 300;
  color: #000000;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  color: #666666;
  text-transform: uppercase;
}

.story-image {
  position: relative;
}

.story-img {
  width: 100%;
  height: 500px;
  object-fit: cover;
}

.values-section {
  padding: 6rem 0;
  background-color: #f8f8f8;
}

.values-header {
  text-align: center;
  margin-bottom: 4rem;
}

.values-title {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 300;
  letter-spacing: 0.15em;
  margin-bottom: 1.5rem;
  color: #000000;
}

.values-divider {
  width: 60px;
  height: 1px;
  background-color: #000000;
  margin: 0 auto;
}

.values-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
}

@media (min-width: 768px) {
  .values-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.materials-section {
  padding: 6rem 0;
  background-color: #ffffff;
}

.materials-header {
  text-align: center;
  margin-bottom: 4rem;
}

.materials-title {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 300;
  letter-spacing: 0.15em;
  margin-bottom: 1rem;
  color: #000000;
}

.materials-subtitle {
  font-size: 0.875rem;
  color: #666666;
  font-weight: 300;
}

.materials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.philosophy-section {
  padding: 6rem 0;
  background-color: #000000;
  color: #ffffff;
  text-align: center;
}

.philosophy-content {
  max-width: 800px;
  margin: 0 auto;
}

.philosophy-quote {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 300;
  font-style: italic;
  line-height: 1.4;
  margin: 0 0 2rem 0;
}

.philosophy-author {
  font-size: 0.875rem;
  font-weight: 400;
  letter-spacing: 0.15em;
  margin-bottom: 3rem;
  opacity: 0.8;
  text-transform: uppercase;
}

.philosophy-text {
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.8;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .story-section,
  .values-section,
  .materials-section,
  .philosophy-section {
    padding: 4rem 0;
  }
  
  .story-stats {
    justify-content: center;
  }
}
</style>
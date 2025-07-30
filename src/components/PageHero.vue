<template>
  <section :class="['page-hero', heroClass]">
    <div v-if="backgroundImage" class="hero-background" :style="{ backgroundImage: `url(${backgroundImage})` }"></div>
    <div class="container">
      <div class="hero-content">
        <h1 class="hero-title">{{ title }}</h1>
        <div class="hero-divider"></div>
        <p v-if="subtitle" class="hero-subtitle">{{ subtitle }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  title: string
  subtitle?: string
  backgroundImage?: string
  heroClass?: string
}

defineProps<Props>()
</script>

<style scoped>
.page-hero {
  min-height: 80vh;
  background-color: #f8f8f8;
  padding: 4rem 0;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: cover;
  background-position: center;
  opacity: 0.1;
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-title {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 300;
  letter-spacing: 0.2em;
  margin: 0;
  color: #000000;
}

.hero-divider {
  width: 60px;
  height: 1px;
  background-color: #000000;
  margin: 2rem auto;
}

.hero-subtitle {
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  color: #666666;
  margin: 0;
}

@media (max-width: 768px) {
  .page-hero {
    min-height: 60vh;
    padding: 2rem 0;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 0.9rem;
  }
}
</style>
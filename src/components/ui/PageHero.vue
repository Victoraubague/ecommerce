<template>
  <section :class="['page-hero', { 'dark': dark }]">
    <div v-if="backgroundImage" class="hero-background">
      <img :src="backgroundImage" :alt="title" class="hero-bg-image">
      <div v-if="dark" class="hero-bg-overlay"></div>
    </div>
    
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
  dark?: boolean
}

withDefaults(defineProps<Props>(), {
  dark: false
})
</script>

<style scoped>
.page-hero {
  position: relative;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
  text-align: center;
  overflow: hidden;
}

.page-hero.dark {
  background-color: #000000;
  color: #ffffff;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.hero-bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-bg-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, #000000 0%, #1a1a1a 100%);
  opacity: 0.9;
}

.hero-content {
  position: relative;
  z-index: 2;
  color: inherit;
}

.hero-title {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: clamp(2.5rem, 6vw, 6rem);
  font-weight: 300;
  letter-spacing: 0.2em;
  margin: 0;
  line-height: 0.9;
}

.page-hero.dark .hero-title {
  color: #ffffff;
}

.hero-divider {
  width: 60px;
  height: 1px;
  background-color: currentColor;
  margin: 2rem auto;
}

.hero-subtitle {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  letter-spacing: 0.15em;
  margin: 0;
  text-transform: uppercase;
  opacity: 0.8;
}

@media (max-width: 768px) {
  .page-hero {
    min-height: 60vh;
  }
}
</style>
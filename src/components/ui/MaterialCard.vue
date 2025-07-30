<template>
  <div class="material-card">
    <div class="material-image">
      <img 
        :src="material.image"
        :alt="material.name"
        class="material-img"
      >
    </div>
    <div class="material-info">
      <h3 class="material-name">{{ material.name }}</h3>
      <p class="material-origin">{{ material.origin }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Material {
  name: string
  origin: string
  image: string
}

interface Props {
  material: Material
}

defineProps<Props>()
</script>

<style scoped>
.material-card {
  text-align: center;
  transition: transform 0.3s ease;
}

.material-card:hover {
  transform: translateY(-5px);
}

.material-image {
  overflow: hidden;
  aspect-ratio: 1;
  margin-bottom: 1rem;
}

.material-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.material-card:hover .material-img {
  transform: scale(1.05);
}

.material-name {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  margin-bottom: 0.25rem;
  color: #000000;
  text-transform: uppercase;
}

.material-origin {
  font-size: 0.75rem;
  color: #666666;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
</style>
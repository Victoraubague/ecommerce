<template>
  <div 
    class="collection-card"
    @click="$emit('click', collection.id)"
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
</template>

<script setup lang="ts">
import type { Collection } from '@/types'

interface Props {
  collection: Collection
}

defineProps<Props>()

defineEmits<{
  click: [collectionId: number]
}>()
</script>

<style scoped>
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
</style>
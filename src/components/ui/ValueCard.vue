<template>
  <div class="value-card">
    <div class="value-icon">
      <div :class="iconClass"></div>
    </div>
    <h3 class="value-title">{{ title }}</h3>
    <p class="value-desc">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  title: string
  description: string
  icon: 'line' | 'circle' | 'triangle'
}

const props = defineProps<Props>()

const iconClass = computed(() => `icon-${props.icon}`)
</script>

<style scoped>
.value-card {
  text-align: center;
  padding: 2rem;
}

.value-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-line,
.icon-circle,
.icon-triangle {
  border: 2px solid #000000;
}

.icon-line {
  width: 40px;
  height: 2px;
  background-color: #000000;
  border: none;
}

.icon-circle {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: transparent;
}

.icon-triangle {
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 26px solid #000000;
  background: transparent;
}

.value-title {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 1.1rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
  color: #000000;
  text-transform: uppercase;
}

.value-desc {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 0.875rem;
  font-weight: 300;
  line-height: 1.6;
  color: #666666;
}
</style>
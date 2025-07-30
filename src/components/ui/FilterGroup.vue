<template>
  <div class="filters-section">
    <div class="container">
      <div class="filters-container">
        <div class="filter-group">
          <button 
            v-for="category in categories" 
            :key="category.id"
            :class="['filter-btn', { 'active': selectedCategory === category.id }]"
            @click="$emit('categoryChange', category.id)"
          >
            {{ category.name }}
          </button>
        </div>
        <div class="sort-group">
          <select 
            :value="sortBy" 
            @change="$emit('sortChange', ($event.target as HTMLSelectElement).value)"
            class="sort-select"
          >
            <option v-for="option in sortOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Category } from '@/types'

interface SortOption {
  value: string
  label: string
}

interface Props {
  categories: Category[]
  selectedCategory: number
  sortBy: string
  sortOptions?: SortOption[]
}

withDefaults(defineProps<Props>(), {
  sortOptions: () => [
    { value: 'price-asc', label: 'Prix croissant' },
    { value: 'price-desc', label: 'Prix décroissant' },
    { value: 'name', label: 'Nom' },
    { value: 'newest', label: 'Nouveautés' }
  ]
})

defineEmits<{
  categoryChange: [categoryId: number]
  sortChange: [sortValue: string]
}>()
</script>

<style scoped>
.filters-section {
  background-color: #ffffff;
  padding: 2rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.filters-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

@media (max-width: 768px) {
  .filters-container {
    flex-direction: column;
    gap: 1rem;
  }
}

.filter-group {
  display: flex;
  gap: 0;
}

.filter-btn {
  background: transparent;
  border: 1px solid #e0e0e0;
  border-right: none;
  color: #666666;
  padding: 0.75rem 1.5rem;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-btn:first-child {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.filter-btn:last-child {
  border-right: 1px solid #e0e0e0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.filter-btn:hover,
.filter-btn.active {
  background-color: #000000;
  color: #ffffff;
  border-color: #000000;
}

.sort-select {
  background: transparent;
  border: 1px solid #e0e0e0;
  color: #666666;
  padding: 0.75rem 1rem;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%2C9%2012%2C15%2018%2C9%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 12px;
  padding-right: 2.5rem;
}
</style>
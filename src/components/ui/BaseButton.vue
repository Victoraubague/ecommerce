<template>
  <button 
    :class="[
      'base-btn',
      `btn-${variant}`,
      `btn-${size}`,
      { 'btn-loading': loading }
    ]"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="btn-spinner"></span>
    <slot v-else />
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'minimal' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  loading: false,
  disabled: false
})

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<style scoped>
.base-btn {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-weight: 400;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.base-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}


.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.625rem;
}

.btn-md {
  padding: 1rem 2rem;
  font-size: 0.75rem;
}

.btn-lg {
  padding: 1.25rem 2.5rem;
  font-size: 0.875rem;
}


.btn-primary {
  background-color: #000000;
  color: #ffffff;
  border: 1px solid #000000;
}

.btn-primary:hover:not(:disabled) {
  background-color: #333333;
}

.btn-secondary {
  background-color: #ffffff;
  color: #000000;
  border: 1px solid #000000;
}

.btn-secondary:hover:not(:disabled) {
  background-color: #000000;
  color: #ffffff;
}

.btn-minimal {
  background: transparent;
  color: #ffffff;
  border: 1px solid #ffffff;
}

.btn-minimal:hover:not(:disabled) {
  background-color: #ffffff;
  color: #000000;
}

.btn-ghost {
  background: transparent;
  color: #666666;
  border: 1px solid #e0e0e0;
}

.btn-ghost:hover:not(:disabled) {
  background-color: #000000;
  color: #ffffff;
  border-color: #000000;
}


.btn-loading {
  pointer-events: none;
}

.btn-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
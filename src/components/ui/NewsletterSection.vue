<template>
  <section class="newsletter-section">
    <div class="container">
      <div class="newsletter-content">
        <h2 class="newsletter-title">{{ title }}</h2>
        <p class="newsletter-desc">{{ description }}</p>
        <form @submit.prevent="handleSubmit" class="newsletter-form">
          <input 
            v-model="email" 
            type="email" 
            :placeholder="placeholder"
            class="newsletter-input"
            required
          >
          <BaseButton 
            type="submit" 
            variant="minimal"
            :loading="loading"
          >
            {{ buttonText }}
          </BaseButton>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from './BaseButton.vue'

interface Props {
  title?: string
  description?: string
  placeholder?: string
  buttonText?: string
}

withDefaults(defineProps<Props>(), {
  title: 'RESTEZ INFORMÉ',
  description: 'Recevez en avant-première les nouvelles collections et offres exclusives',
  placeholder: 'Votre adresse email',
  buttonText: "S'ABONNER"
})

const emit = defineEmits<{
  subscribe: [email: string]
}>()

const email = ref('')
const loading = ref(false)

const handleSubmit = async () => {
  if (!email.value) return
  
  loading.value = true
  try {
    emit('subscribe', email.value)
    email.value = ''
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.newsletter-section {
  background-color: #000000;
  color: #ffffff;
  padding: 4rem 0;
  text-align: center;
}

.newsletter-title {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 1.5rem;
  font-weight: 300;
  letter-spacing: 0.15em;
  margin-bottom: 1rem;
}

.newsletter-desc {
  font-size: 0.875rem;
  opacity: 0.8;
  margin-bottom: 2rem;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.newsletter-form {
  display: flex;
  max-width: 400px;
  margin: 0 auto;
  gap: 0;
}

@media (max-width: 640px) {
  .newsletter-form {
    flex-direction: column;
    gap: 1rem;
  }
}

.newsletter-input {
  flex: 1;
  padding: 1rem 1.5rem;
  background-color: #ffffff;
  border: none;
  color: #000000;
  font-size: 0.875rem;
  outline: none;
}

@media (max-width: 768px) {
  .newsletter-section {
    padding: 3rem 0;
  }
}
</style>
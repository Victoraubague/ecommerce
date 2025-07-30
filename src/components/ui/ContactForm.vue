<template>
  <div class="contact-form-section">
    <div class="container">
      <div class="contact-form-grid">
        <div class="form-content">
          <h2 class="form-title">ÉCRIVEZ-NOUS</h2>
          <p class="form-description">
            Notre équipe se fera un plaisir de répondre à toutes vos questions 
            concernant nos collections, nos services ou votre commande.
          </p>
          
          <form @submit.prevent="handleSubmit" class="contact-form">
            <div class="form-row">
              <div class="form-group">
                <label for="firstName" class="form-label">PRÉNOM</label>
                <input 
                  v-model="form.firstName"
                  type="text" 
                  id="firstName"
                  class="form-input"
                  required
                >
              </div>
              <div class="form-group">
                <label for="lastName" class="form-label">NOM</label>
                <input 
                  v-model="form.lastName"
                  type="text" 
                  id="lastName"
                  class="form-input"
                  required
                >
              </div>
            </div>

            <div class="form-group">
              <label for="email" class="form-label">EMAIL</label>
              <input 
                v-model="form.email"
                type="email" 
                id="email"
                class="form-input"
                required
              >
            </div>

            <div class="form-group">
              <label for="phone" class="form-label">TÉLÉPHONE</label>
              <input 
                v-model="form.phone"
                type="tel" 
                id="phone"
                class="form-input"
              >
            </div>

            <div class="form-group">
              <label for="subject" class="form-label">SUJET</label>
              <select v-model="form.subject" id="subject" class="form-select" required>
                <option value="">Sélectionnez un sujet</option>
                <option value="information">Demande d'information</option>
                <option value="order">Question sur une commande</option>
                <option value="appointment">Prise de rendez-vous</option>
                <option value="after-sales">Service après-vente</option>
                <option value="press">Demande presse</option>
                <option value="other">Autre</option>
              </select>
            </div>

            <div class="form-group">
              <label for="message" class="form-label">MESSAGE</label>
              <textarea 
                v-model="form.message"
                id="message"
                rows="6"
                class="form-textarea"
                placeholder="Décrivez votre demande..."
                required
              ></textarea>
            </div>

            <div class="form-group">
              <label class="form-checkbox-label">
                <input 
                  v-model="form.newsletter"
                  type="checkbox" 
                  class="form-checkbox"
                >
                <span class="checkbox-custom"></span>
                J'accepte de recevoir les actualités et offres exclusives
              </label>
            </div>

            <BaseButton 
              type="submit" 
              :loading="loading"
              variant="primary"
            >
              ENVOYER LE MESSAGE
            </BaseButton>
          </form>
        </div>

        <div class="form-image">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80"
            alt="Service client"
            class="form-img"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import BaseButton from './BaseButton.vue'

const loading = ref(false)

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  newsletter: false
})

const emit = defineEmits<{
  submit: [formData: typeof form]
}>()

const handleSubmit = async () => {
  loading.value = true
  try {
    emit('submit', { ...form })
    
    Object.assign(form, {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      newsletter: false
    })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.contact-form-section {
  padding: 6rem 0;
  background-color: #f8f8f8;
}

.contact-form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  align-items: start;
}

@media (min-width: 1024px) {
  .contact-form-grid {
    grid-template-columns: 1fr 1fr;
    gap: 6rem;
  }
}

.form-title {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 300;
  letter-spacing: 0.15em;
  margin-bottom: 1.5rem;
  color: #000000;
}

.form-description {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 0.875rem;
  font-weight: 300;
  line-height: 1.6;
  color: #666666;
  margin-bottom: 3rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .form-row {
    grid-template-columns: 1fr 1fr;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  color: #000000;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

.form-input,
.form-select,
.form-textarea {
  padding: 1rem 0;
  border: none;
  border-bottom: 1px solid #e0e0e0;
  background: transparent;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 0.875rem;
  color: #000000;
  transition: border-color 0.3s ease;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-bottom-color: #000000;
}

.form-select {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%2C9%2012%2C15%2018%2C9%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 0 center;
  background-size: 16px;
  padding-right: 2rem;
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.form-checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 300;
  line-height: 1.4;
  color: #666666;
}

.form-checkbox {
  display: none;
}

.checkbox-custom {
  display: block;
  width: 16px;
  height: 16px;
  border: 1px solid #e0e0e0;
  background: #ffffff;
  position: relative;
  flex-shrink: 0;
  margin-top: 2px;
  transition: all 0.3s ease;
}

.form-checkbox:checked + .checkbox-custom {
  background-color: #000000;
  border-color: #000000;
}

.form-checkbox:checked + .checkbox-custom::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 5px;
  width: 4px;
  height: 8px;
  border: solid #ffffff;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.form-image {
  position: relative;
}

.form-img {
  width: 100%;
  height: 500px;
  object-fit: cover;
}

@media (max-width: 768px) {
  .contact-form-section {
    padding: 4rem 0;
  }
  
  .contact-form-grid {
    gap: 3rem;
  }
  
  .form-image {
    order: -1;
  }
  
  .form-img {
    height: 300px;
  }
}
</style>
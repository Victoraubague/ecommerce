interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  subject: string
  message: string
  newsletter: boolean
}

export function useContact() {
  const submitContactForm = async (formData: ContactFormData) => {
    console.log('Contact form submitted:', formData)
    
    // Simuler un délai d'envoi
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Ici on pourrait ajouter l'appel API
    alert('Votre message a été envoyé avec succès!')
  }

  return {
    submitContactForm
  }
}
export function useNewsletter() {
  const subscribe = (emailAddress: string) => {
    console.log(`Subscribing email: ${emailAddress}`)
    // Ici on pourrait ajouter l'appel API
  }

  return {
    subscribe
  }
}
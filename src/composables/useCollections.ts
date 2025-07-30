import { ref } from 'vue'
import type { Collection } from '@/types'

const collections = ref<Collection[]>([
  {
    id: 1,
    name: "Heritage",
    description: "Pièces intemporelles inspirées de l'artisanat traditionnel français",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80",
    itemCount: 25,
    startingPrice: 180
  },
  {
    id: 2,
    name: "Moderne",
    description: "Lignes épurées et coupes contemporaines pour un style urbain",
    image: "https://images.unsplash.com/photo-1578662996442-7cfa79e83d57?w=600&q=80",
    itemCount: 32,
    startingPrice: 120
  },
  {
    id: 3,
    name: "Essentiels",
    description: "Les basiques revisités avec une attention particulière aux détails",
    image: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600&q=80",
    itemCount: 18,
    startingPrice: 95
  },
  {
    id: 4,
    name: "Soirée",
    description: "Élégance raffinée pour vos occasions spéciales",
    image: "https://images.unsplash.com/photo-1583627149055-72e92d8c5d4c?w=600&q=80",
    itemCount: 15,
    startingPrice: 350
  },
  {
    id: 5,
    name: "Cuir",
    description: "Maroquinerie d'exception en cuir italien sélectionné",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&q=80",
    itemCount: 12,
    startingPrice: 450
  },
  {
    id: 6,
    name: "Accessoires",
    description: "Finitions parfaites pour compléter votre style",
    image: "https://images.unsplash.com/photo-1506629905327-b58f4ae08b9e?w=600&q=80",
    itemCount: 28,
    startingPrice: 65
  }
])

export function useCollections() {
  const viewCollection = (collectionId: number) => {
    console.log(`Viewing collection ${collectionId}`)
  }

  return {
    collections,
    viewCollection
  }
}
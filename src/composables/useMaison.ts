import { ref } from 'vue'

interface Material {
  name: string
  origin: string
  image: string
}

interface Value {
  title: string
  description: string
  icon: 'line' | 'circle' | 'triangle'
}

const materials = ref<Material[]>([
  {
    name: 'CUIR ITALIEN',
    origin: 'TOSCANE',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&q=80'
  },
  {
    name: 'CACHEMIRE',
    origin: 'ÉCOSSE',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&q=80'
  },
  {
    name: 'SOIE',
    origin: 'LYON',
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&q=80'
  },
  {
    name: 'MÉRINOS',
    origin: 'AUSTRALIE',
    image: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400&q=80'
  }
])

const values = ref<Value[]>([
  {
    title: 'EXCELLENCE',
    description: 'Chaque détail est pensé, chaque couture maîtrisée. Nous ne transigeons jamais sur la qualité.',
    icon: 'line'
  },
  {
    title: 'HÉRITAGE',
    description: 'Les techniques ancestrales rencontrent l\'innovation pour créer l\'intemporel.',
    icon: 'circle'
  },
  {
    title: 'CRÉATIVITÉ',
    description: 'L\'audace créative guide chacune de nos collections, repoussant les limites du possible.',
    icon: 'triangle'
  }
])

export function useMaison() {
  return {
    materials,
    values
  }
}
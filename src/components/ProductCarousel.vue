<template>
  <section class="products-section">
    <div class="container">
      <!-- Section Header -->
      <div class="products-header">
        <div class="products-header-content">
          <div class="products-header-left">
            <div class="brand-divider"></div>
            <h2 class="section-title">
              <span class="products-title-main">Sélection</span>
              <span class="products-title-accent">Signature</span>
            </h2>
          </div>
          <p class="products-description">
            Pièces d'exception sélectionnées pour leur caractère unique et leur qualité irréprochable.
          </p>
        </div>
      </div>

      <div class="products-carousel">
        <div 
          class="products-viewport"
          @touchstart="handleTouchStart"
          @touchmove="handleTouchMove"
          @touchend="handleTouchEnd"
        >
          <div 
            class="products-track"
            :style="{ transform: `translateX(-${currentSlide * (100 / visibleProducts)}%)` }"
          >
            <div 
              v-for="product in products" 
              :key="product.id"
              class="product-slide"
              :style="{ width: `${100 / visibleProducts}%` }"
            >
              <div class="product-card">
                <div class="product-image-container">
                  <img 
                    :src="`https://images.unsplash.com/photo-${getUnsplashId(product.id)}?w=600&q=80`"
                    :alt="product.name"
                    class="product-image"
                    loading="lazy"
                  >

                  <div v-if="product.badge" class="product-badge">
                    {{ product.badge }}
                  </div>

                  <div class="product-cta">
                    <button class="btn-secondary product-btn">
                      VOIR DÉTAILS
                    </button>
                  </div>
                </div>

                <div class="product-info">
                  <h3 class="product-title">{{ product.name }}</h3>
                  <p class="product-description">{{ product.description }}</p>

                  <div class="product-footer">
                    <div class="product-price">
                      <span class="product-price-current">{{ product.price }}€</span>
                      <span v-if="product.originalPrice" class="product-price-original">{{ product.originalPrice }}€</span>
                    </div>
                    <div v-if="product.colors" class="product-colors">
                      <div 
                        v-for="color in product.colors.slice(0, 2)" 
                        :key="color" 
                        class="product-color"
                        :style="{ backgroundColor: color }"
                      ></div>
                      <span v-if="product.colors.length > 2" class="product-colors-more">
                        +{{ product.colors.length - 2 }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="products-navigation">
          <button 
            v-if="canGoPrev"
            @click="prevSlide"
            class="nav-button nav-prev"
          >
            <div class="nav-line"></div>
            <span class="text-caption">PRÉCÉDENT</span>
          </button>
          
          <div class="nav-counter text-mono">
            {{ String(currentSlide + 1).padStart(2, '0') }} / {{ String(totalSlides).padStart(2, '0') }}
          </div>
          
          <button 
            v-if="canGoNext"
            @click="nextSlide"
            class="nav-button nav-next"
          >
            <span class="text-caption">SUIVANT</span>
            <div class="nav-line"></div>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Product {
  id: number
  name: string
  description: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  badge?: string
  colors?: string[]
}

const products = ref<Product[]>([
  {
    id: 1,
    name: "Manteau Cachemire Heritage",
    description: "Manteau en cachemire pur, taillé dans la tradition artisanale française",
    price: 890,
    originalPrice: 1290,
    rating: 4.9,
    reviews: 47,
    badge: "SOLDES",
    colors: ["#8B7355", "#2D2926", "#F5F5DC"]
  },
  {
    id: 2,
    name: "Chemise Lin Naturel",
    description: "Chemise en lin européen, coupe intemporelle et finitions main",
    price: 245,
    rating: 4.8,
    reviews: 32,
    colors: ["#F5F5DC", "#2D2926"]
  },
  {
    id: 3,
    name: "Pantalon Laine Mérinos",
    description: "Pantalon tailleur en laine mérinos, coupe droite élégante",
    price: 420,
    rating: 4.7,
    reviews: 28,
    badge: "NOUVEAU",
    colors: ["#2D2926", "#4A4A4A", "#8B7355"]
  },
  {
    id: 4,
    name: "Robe Soie Sauvage",
    description: "Robe en soie sauvage tissée artisanalement, pièce d'exception",
    price: 650,
    rating: 4.9,
    reviews: 18,
    colors: ["#DEB887", "#8B7355", "#2D2926"]
  },
  {
    id: 5,
    name: "Veste Cuir Nappa",
    description: "Veste en cuir nappa italien, travail artisanal d'exception",
    price: 1250,
    originalPrice: 1590,
    rating: 4.8,
    reviews: 15,
    badge: "ÉDITION LIMITÉE",
    colors: ["#2D2926", "#8B4513"]
  }
])


const getUnsplashId = (productId: number): string => {
  const unsplashIds = [
    '1496048262-ee491fcd4fbc',
    '1578662996442-7cfa79e83d57',
    '1594736797933-d0501ba2fe65',
    '1583627149055-72e92d8c5d4c',
    '1551698618-1dfe5d97d256'
  ]
  return unsplashIds[productId - 1] || unsplashIds[0]
}

const currentSlide = ref(0)
const visibleProducts = ref(4)
const touchStartX = ref(0)
const touchEndX = ref(0)

const totalSlides = computed(() => Math.max(0, products.value.length - visibleProducts.value + 1))
const canGoPrev = computed(() => currentSlide.value > 0)
const canGoNext = computed(() => currentSlide.value < totalSlides.value - 1)
const showNavigation = computed(() => products.value.length > visibleProducts.value)
const showDots = computed(() => totalSlides.value > 1)

const nextSlide = () => {
  if (canGoNext.value) {
    currentSlide.value++
  }
}

const prevSlide = () => {
  if (canGoPrev.value) {
    currentSlide.value--
  }
}

const goToSlide = (index: number) => {
  if (index >= 0 && index < totalSlides.value) {
    currentSlide.value = index
  }
}

const handleTouchStart = (e: TouchEvent) => {
  touchStartX.value = e.touches[0].clientX
}

const handleTouchMove = (e: TouchEvent) => {
  touchEndX.value = e.touches[0].clientX
}

const handleTouchEnd = () => {
  const diff = touchStartX.value - touchEndX.value
  const threshold = 50

  if (Math.abs(diff) > threshold) {
    if (diff > 0) {
      nextSlide()
    } else {
      prevSlide()
    }
  }
}

const updateVisibleProducts = () => {
  const width = window.innerWidth
  if (width < 640) {
    visibleProducts.value = 1
  } else if (width < 768) {
    visibleProducts.value = 2
  } else if (width < 1024) {
    visibleProducts.value = 3
  } else {
    visibleProducts.value = 4
  }

  if (currentSlide.value >= totalSlides.value) {
    currentSlide.value = Math.max(0, totalSlides.value - 1)
  }
}

const autoPlay = ref(true)
const autoPlayInterval = ref<number | null>(null)

const startAutoPlay = () => {
  if (autoPlay.value) {
    autoPlayInterval.value = setInterval(() => {
      if (canGoNext.value) {
        nextSlide()
      } else {
        currentSlide.value = 0
      }
    }, 4000)
  }
}

const stopAutoPlay = () => {
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value)
    autoPlayInterval.value = null
  }
}

onMounted(() => {
  updateVisibleProducts()
  window.addEventListener('resize', updateVisibleProducts)
  startAutoPlay()
})

onUnmounted(() => {
  window.removeEventListener('resize', updateVisibleProducts)
  stopAutoPlay()
})
</script>

<style scoped>
.products-section {
  background-color: var(--bg-secondary);
  padding: var(--space-32) 0;
}

.products-header {
  margin-bottom: var(--space-20);
}

.products-header-content {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-16);
  margin-bottom: var(--space-8);
}

@media (max-width: 768px) {
  .products-header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-8);
  }
}

.products-title-main {
  display: block;
  font-weight: var(--font-weight-light);
}

.products-title-accent {
  display: block;
  font-style: italic;
  font-weight: var(--font-weight-normal);
  margin-top: var(--space-2);
}

.products-description {
  max-width: 24rem;
  font-size: var(--font-size-base);
  color: var(--text-secondary);
  line-height: var(--line-height-relaxed);
  text-align: right;
}

@media (max-width: 768px) {
  .products-description {
    text-align: left;
  }
}

.products-carousel {
  position: relative;
}

.products-viewport {
  overflow: hidden;
}

.products-track {
  display: flex;
  transition: transform var(--transition-slow) ease-in-out;
}

.product-slide {
  flex-shrink: 0;
  padding: 0 var(--space-3);
}

.product-card {
  cursor: pointer;
  height: 100%;
}

.product-image-container {
  position: relative;
  overflow: hidden;
  aspect-ratio: 3/4;
  margin-bottom: var(--space-6);
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slower) ease-out;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.product-badge {
  position: absolute;
  top: var(--space-4);
  left: var(--space-4);
  background-color: var(--bg-inverse);
  color: var(--text-inverse);
  padding: var(--space-1) var(--space-3);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.product-cta {
  position: absolute;
  bottom: var(--space-4);
  left: var(--space-4);
  right: var(--space-4);
  opacity: 0;
  transition: opacity var(--transition-normal);
}

.product-card:hover .product-cta {
  opacity: 1;
}

.product-btn {
  width: 100%;
  font-size: var(--font-size-sm);
}

.product-info {
  padding: 0 var(--space-1);
}

.product-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-light);
  color: var(--text-primary);
  margin-bottom: var(--space-2);
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-description {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--space-4);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: var(--space-3);
}

.product-price {
  display: flex;
  align-items: baseline;
  gap: var(--space-2);
}

.product-price-current {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
}

.product-price-original {
  font-size: var(--font-size-sm);
  color: var(--text-muted);
  text-decoration: line-through;
}

.product-colors {
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.product-color {
  width: var(--space-3);
  height: var(--space-3);
  border-radius: 50%;
  border: 1px solid var(--border-strong);
}

.product-colors-more {
  font-size: var(--font-size-xs);
  color: var(--text-muted);
  margin-left: var(--space-1);
}


.products-navigation {
  position: absolute;
  bottom: calc(-1 * var(--space-16));
  right: 0;
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.nav-button {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--text-secondary);
  background: none;
  border: none;
  cursor: pointer;
  transition: color var(--transition-fast);
}

.nav-button:hover {
  color: var(--text-primary);
}

.nav-line {
  width: var(--space-8);
  height: 1px;
  background-color: var(--border-strong);
  transition: background-color var(--transition-fast);
}

.nav-button:hover .nav-line {
  background-color: var(--text-primary);
}

.nav-counter {
  font-size: var(--font-size-xs);
  color: var(--text-muted);
}
</style>
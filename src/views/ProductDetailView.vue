<template>
  <div class="product-detail-page" v-if="product">
    <div class="container">
      <div class="product-detail-grid">
        <div class="product-images">
          <div class="main-image">
            <img 
              :src="selectedImage" 
              :alt="product.name"
              class="product-main-img"
            >
          </div>
          <div class="image-thumbnails" v-if="product.images && product.images.length > 1">
            <div 
              v-for="(image, index) in product.images" 
              :key="index"
              :class="['thumbnail', { 'active': selectedImage === image }]"
              @click="selectedImage = image"
            >
              <img :src="image" :alt="`${product.name} ${index + 1}`">
            </div>
          </div>
        </div>

        <div class="product-info">
          <div class="product-header">
            <h1 class="product-title">{{ product.name }}</h1>
            <div class="product-category">{{ product.category }}</div>
            <div class="product-pricing">
              <span v-if="product.originalPrice" class="original-price">{{ product.originalPrice }}€</span>
              <span class="current-price">{{ product.price }}€</span>
            </div>
            <div class="product-badges">
              <span v-if="product.isNew" class="badge new">NOUVEAU</span>
              <span v-if="product.isOnSale" class="badge sale">SOLDE</span>
            </div>
          </div>

          <div class="product-description">
            <p>{{ product.description || 'Pièce d\'exception alliant élégance et savoir-faire artisanal. Confectionnée dans nos ateliers français avec les plus belles matières sélectionnées.' }}</p>
          </div>

          <div class="product-details">
            <h3 class="details-title">DÉTAILS</h3>
            <ul class="details-list">
              <li>Matière premium sélectionnée</li>
              <li>Confection artisanale française</li>
              <li>Finitions soignées à la main</li>
              <li>Garantie à vie</li>
            </ul>
          </div>

          <div class="product-colors" v-if="product.colors && product.colors.length > 0">
            <h3 class="colors-title">COULEURS DISPONIBLES</h3>
            <div class="colors-grid">
              <div 
                v-for="color in product.colors" 
                :key="color"
                :class="['color-option', { 'selected': selectedColor === color }]"
                :style="{ backgroundColor: color }"
                @click="selectedColor = color"
                :title="getColorName(color)"
              ></div>
            </div>
          </div>

          <div class="product-actions">
            <BaseButton 
              @click="addToCart" 
              variant="primary"
              size="lg"
              class="add-to-cart"
            >
              AJOUTER AU PANIER - {{ product.price }}€
            </BaseButton>
            
            <BaseButton 
              @click="toggleWishlist" 
              :variant="isInWishlist ? 'primary' : 'secondary'"
              size="lg"
              class="add-to-wishlist"
            >
              {{ isInWishlist ? 'RETIRER DES FAVORIS' : 'AJOUTER AUX FAVORIS' }}
            </BaseButton>
          </div>

          <div class="product-services">
            <div class="service-item">
              <span class="service-icon">🚚</span>
              <div class="service-info">
                <div class="service-title">LIVRAISON GRATUITE</div>
                <div class="service-desc">En France métropolitaine</div>
              </div>
            </div>
            <div class="service-item">
              <span class="service-icon">🔄</span>
              <div class="service-info">
                <div class="service-title">RETOURS 30 JOURS</div>
                <div class="service-desc">Satisfait ou remboursé</div>
              </div>
            </div>
            <div class="service-item">
              <span class="service-icon">🛡️</span>
              <div class="service-info">
                <div class="service-title">GARANTIE VIE</div>
                <div class="service-desc">Réparations incluses</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <section class="related-products">
      <div class="container">
        <h2 class="related-title">VOUS POURRIEZ AUSSI AIMER</h2>
        <div class="related-grid">
          <ProductCard
            v-for="relatedProduct in relatedProducts" 
            :key="relatedProduct.id"
            :product="relatedProduct"
            :isInWishlist="wishlistStore.isInWishlist(relatedProduct.id)"
            @click="goToProduct"
            @quickView="quickView"
            @addToCart="addToCartRelated"
            @toggleWishlist="toggleWishlistRelated"
          />
        </div>
      </div>
    </section>
  </div>

  <div v-else class="loading-state">
    <div class="container">
      <p>Chargement du produit...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'
import { BaseButton, ProductCard } from '@/components/ui'
import { useProducts } from '@/composables/useProducts'
import type { Product } from '@/types'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const { products: allProducts, quickView } = useProducts()

const product = ref<Product | null>(null)
const selectedImage = ref('')
const selectedColor = ref('')
const relatedProducts = ref<Product[]>([])

const isInWishlist = computed(() => 
  product.value ? wishlistStore.isInWishlist(product.value.id) : false
)

const loadProduct = () => {
  const productId = parseInt(route.params.id as string)
  const foundProduct = allProducts.value.find(p => p.id === productId)
  
  if (foundProduct) {
    product.value = {
      ...foundProduct,
      images: [foundProduct.image, foundProduct.image, foundProduct.image],
      description: 'Pièce d\'exception alliant élégance et savoir-faire artisanal. Confectionnée dans nos ateliers français avec les plus belles matières sélectionnées.'
    }
    selectedImage.value = foundProduct.image
    selectedColor.value = foundProduct.colors?.[0] || ''
    
    // Produits similaires (même catégorie)
    relatedProducts.value = allProducts.value
      .filter(p => p.categoryId === foundProduct.categoryId && p.id !== foundProduct.id)
      .slice(0, 4)
  }
}

const addToCart = () => {
  if (!product.value) return
  
  cartStore.addItem({
    id: product.value.id,
    name: product.value.name,
    price: product.value.price,
    image: product.value.image,
    category: product.value.category
  })
}

const toggleWishlist = () => {
  if (!product.value) return
  
  wishlistStore.toggleItem({
    id: product.value.id,
    name: product.value.name,
    price: product.value.price,
    originalPrice: product.value.originalPrice,
    image: product.value.image,
    category: product.value.category,
    colors: product.value.colors,
    isNew: product.value.isNew,
    isOnSale: product.value.isOnSale
  })
}

const goToProduct = (selectedProduct: Product) => {
  router.push(`/product/${selectedProduct.id}`)
}

const addToCartRelated = (selectedProduct: Product) => {
  cartStore.addItem({
    id: selectedProduct.id,
    name: selectedProduct.name,
    price: selectedProduct.price,
    image: selectedProduct.image,
    category: selectedProduct.category
  })
}

const toggleWishlistRelated = (selectedProduct: Product) => {
  wishlistStore.toggleItem({
    id: selectedProduct.id,
    name: selectedProduct.name,
    price: selectedProduct.price,
    originalPrice: selectedProduct.originalPrice,
    image: selectedProduct.image,
    category: selectedProduct.category,
    colors: selectedProduct.colors,
    isNew: selectedProduct.isNew,
    isOnSale: selectedProduct.isOnSale
  })
}

const getColorName = (color: string) => {
  const colorNames: Record<string, string> = {
    '#000000': 'Noir',
    '#FFFFFF': 'Blanc',
    '#8B4513': 'Marron',
    '#556B2F': 'Vert olive',
    '#C0C0C0': 'Gris',
    '#800080': 'Violet'
  }
  return colorNames[color] || 'Couleur'
}

onMounted(loadProduct)
</script>

<style scoped>
.product-detail-page {
  min-height: 100vh;
  background-color: #ffffff;
  padding: 2rem 0;
}

.product-detail-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  margin-bottom: 4rem;
}

@media (min-width: 1024px) {
  .product-detail-grid {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
  }
}

.product-images {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.main-image {
  aspect-ratio: 3/4;
  overflow: hidden;
  background-color: #f8f8f8;
}

.product-main-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-thumbnails {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
}

.thumbnail {
  width: 80px;
  height: 80px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.3s ease;
  flex-shrink: 0;
}

.thumbnail.active {
  border-color: #000000;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-header {
  margin-bottom: 2rem;
}

.product-title {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 300;
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
  color: #000000;
  text-transform: uppercase;
}

.product-category {
  font-size: 0.875rem;
  color: #666666;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.product-pricing {
  margin-bottom: 1rem;
}

.original-price {
  font-size: 1rem;
  color: #999999;
  text-decoration: line-through;
  margin-right: 1rem;
}

.current-price {
  font-size: 1.5rem;
  font-weight: 500;
  color: #000000;
}

.product-badges {
  display: flex;
  gap: 0.5rem;
}

.badge {
  padding: 0.25rem 0.5rem;
  font-size: 0.625rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.badge.new {
  background-color: #000000;
  color: #ffffff;
}

.badge.sale {
  background-color: #ff4444;
  color: #ffffff;
}

.product-description {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e0e0e0;
}

.product-description p {
  font-size: 1rem;
  line-height: 1.6;
  color: #333333;
}

.product-details {
  margin-bottom: 2rem;
}

.details-title {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
  color: #000000;
  text-transform: uppercase;
}

.details-list {
  list-style: none;
  padding: 0;
}

.details-list li {
  font-size: 0.875rem;
  color: #666666;
  margin-bottom: 0.5rem;
  padding-left: 1rem;
  position: relative;
}

.details-list li:before {
  content: '•';
  position: absolute;
  left: 0;
  color: #000000;
}

.product-colors {
  margin-bottom: 2rem;
}

.colors-title {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
  color: #000000;
  text-transform: uppercase;
}

.colors-grid {
  display: flex;
  gap: 0.5rem;
}

.color-option {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #e0e0e0;
  cursor: pointer;
  transition: all 0.3s ease;
}

.color-option.selected {
  border-color: #000000;
  transform: scale(1.1);
}

.product-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 3rem;
}

@media (min-width: 640px) {
  .product-actions {
    flex-direction: row;
  }
}

.add-to-cart,
.add-to-wishlist {
  flex: 1;
}

.product-services {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.service-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #f0f0f0;
}

.service-icon {
  font-size: 1.5rem;
}

.service-title {
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  color: #000000;
  text-transform: uppercase;
  margin-bottom: 0.25rem;
}

.service-desc {
  font-size: 0.75rem;
  color: #666666;
}

.related-products {
  padding: 4rem 0;
  background-color: #f8f8f8;
}

.related-title {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 300;
  letter-spacing: 0.15em;
  text-align: center;
  margin-bottom: 3rem;
  color: #000000;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.loading-state {
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
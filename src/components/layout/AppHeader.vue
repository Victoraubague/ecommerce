<template>
  <header class="app-header">
    <div class="container">
      <div class="header-content">

        <div class="header-brand">
          <router-link to="/" class="brand-link">
            <div class="brand-divider brand-logo"></div>
            <span class="brand-text">LUXE</span>
          </router-link>
        </div>

        <nav class="header-nav" aria-label="Navigation principale">
          <ul class="nav-list">
            <li class="nav-item">
              <router-link to="/products" class="nav-link">COLLECTIONS</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/about" class="nav-link">MAISON</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/contact" class="nav-link">CONTACT</router-link>
            </li>
          </ul>
        </nav>

        <div class="header-actions">
          <button
            @click="toggleSearch"
            class="header-action-btn"
            aria-label="Rechercher"
          >
            <svg class="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>

          <button 
            @click="toggleWishlist"
            class="header-action-btn"
            aria-label="Liste de souhaits"
          >
            <svg class="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <span v-if="wishlistCount > 0" class="header-badge">{{ wishlistCount }}</span>
          </button>

          <button 
            @click="toggleCart"
            class="header-action-btn"
            aria-label="Panier"
          >
            <svg class="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z"></path>
              <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z"></path>
              <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6"></path>
            </svg>
            <span v-if="cartCount > 0" class="header-badge">{{ cartCount }}</span>
          </button>

          <button 
            @click="toggleMobileMenu"
            class="header-mobile-toggle"
            aria-label="Menu mobile"
          >
            <div class="hamburger" :class="{ active: isMobileMenuOpen }">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </div>

      <div v-if="isSearchOpen" class="header-search">
        <div class="search-container">
          <input 
            ref="searchInput"
            v-model="searchQuery"
            type="text"
            placeholder="Rechercher des produits..."
            class="input-luxury search-input"
            @keyup.enter="performSearch"
          >
          <button 
            @click="performSearch"
            class="btn-primary search-submit"
          >
            RECHERCHER
          </button>
        </div>
      </div>
    </div>

    <div v-if="isMobileMenuOpen" class="mobile-menu">
      <nav class="mobile-nav" aria-label="Navigation mobile">
        <ul class="mobile-nav-list">
          <li class="mobile-nav-item">
            <router-link to="/products" class="mobile-nav-link" @click="closeMobileMenu">
              COLLECTIONS
            </router-link>
          </li>
          <li class="mobile-nav-item">
            <router-link to="/about" class="mobile-nav-link" @click="closeMobileMenu">
              MAISON
            </router-link>
          </li>
          <li class="mobile-nav-item">
            <router-link to="/contact" class="mobile-nav-link" @click="closeMobileMenu">
              CONTACT
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'


const isSearchOpen = ref(false)
const isMobileMenuOpen = ref(false)
const searchQuery = ref('')
const searchInput = ref<HTMLInputElement | null>(null)

const wishlistCount = ref(2)
const cartCount = ref(1)

const toggleSearch = async () => {
  isSearchOpen.value = !isSearchOpen.value
  if (isSearchOpen.value) {
    await nextTick()
    searchInput.value?.focus()
  }
}

const toggleWishlist = () => {
  console.log('Toggle wishlist')
}

const toggleCart = () => {
  console.log('Toggle cart')
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const performSearch = () => {
  if (searchQuery.value.trim()) {
    console.log('Search for:', searchQuery.value)
    isSearchOpen.value = false
    searchQuery.value = ''
  }
}
</script>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  background-color: var(--bg-elevated);
  border-bottom: 1px solid var(--border-default);
  z-index: var(--z-sticky);
  backdrop-filter: blur(8px);
  transition: all var(--transition-fast);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4) 0;
}

.header-brand {
  flex-shrink: 0;
}

.brand-link {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  text-decoration: none;
  color: var(--text-primary);
  transition: color var(--transition-fast);
}

.brand-link:hover {
  color: var(--text-secondary);
}

.brand-logo {
  width: var(--space-8);
  height: 1px;
  background-color: var(--text-primary);
  transition: background-color var(--transition-fast);
}

.brand-text {
  font-family: var(--font-display);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-normal);
  letter-spacing: 0.1em;
}

.header-nav {
  display: none;
}

@media (min-width: 768px) {
  .header-nav {
    display: block;
  }
}

.nav-list {
  display: flex;
  align-items: center;
  gap: var(--space-8);
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  font-family: var(--font-primary);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color var(--transition-fast);
  position: relative;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--text-primary);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 0;
  width: 0;
  height: 1px;
  background-color: var(--text-primary);
  transition: width var(--transition-normal);
}

.nav-link:hover::after,
.nav-link.router-link-active::after {
  width: 100%;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.header-action-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--space-10);
  height: var(--space-10);
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  transition: color var(--transition-fast);
}

.header-action-btn:hover {
  color: var(--text-primary);
}

.header-icon {
  width: var(--space-5);
  height: var(--space-5);
  stroke-width: 1.5;
}

.header-badge {
  position: absolute;
  top: -2px;
  right: -2px;
  background-color: var(--text-primary);
  color: var(--text-inverse);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  padding: 2px 6px;
  border-radius: var(--radius-full);
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-mobile-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--space-10);
  height: var(--space-10);
  background: none;
  border: none;
  cursor: pointer;
}

@media (min-width: 768px) {
  .header-mobile-toggle {
    display: none;
  }
}

.hamburger {
  position: relative;
  width: 20px;
  height: 16px;
}

.hamburger span {
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--text-primary);
  transition: all var(--transition-normal);
}

.hamburger span:nth-child(1) { top: 0; }
.hamburger span:nth-child(2) { top: 7px; }
.hamburger span:nth-child(3) { bottom: 0; }

.hamburger.active span:nth-child(1) {
  transform: rotate(45deg);
  top: 7px;
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
}

.hamburger.active span:nth-child(3) {
  transform: rotate(-45deg);
  bottom: 7px;
}

.header-search {
  padding: var(--space-6) 0;
  border-top: 1px solid var(--border-default);
  animation: slideDown var(--transition-normal) ease-out;
}

.search-container {
  display: flex;
  gap: var(--space-4);
  align-items: flex-end;
}

.search-input {
  flex: 1;
  font-size: var(--font-size-lg);
}

.search-submit {
  flex-shrink: 0;
}

.mobile-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: var(--bg-elevated);
  border-bottom: 1px solid var(--border-default);
  animation: slideDown var(--transition-normal) ease-out;
}

@media (min-width: 768px) {
  .mobile-menu {
    display: none;
  }
}

.mobile-nav-list {
  list-style: none;
  margin: 0;
  padding: var(--space-6) 0;
}

.mobile-nav-item {
  border-bottom: 1px solid var(--border-default);
}

.mobile-nav-item:last-child {
  border-bottom: none;
}

.mobile-nav-link {
  display: block;
  padding: var(--space-4) var(--space-4);
  font-family: var(--font-primary);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-secondary);
  text-decoration: none;
  transition: all var(--transition-fast);
}

.mobile-nav-link:hover,
.mobile-nav-link.router-link-active {
  color: var(--text-primary);
  background-color: var(--bg-primary);
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
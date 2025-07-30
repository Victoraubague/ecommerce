<template>
  <div id="app" class="app-layout">
    <AppHeader />
    
    <main class="app-main">
      <RouterView />
    </main>
    
    <AppFooter />
    
    <CartSidebar />
    <WishlistSidebar />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import CartSidebar from '@/components/CartSidebar.vue'
import WishlistSidebar from '@/components/WishlistSidebar.vue'
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-primary);
  color: var(--text-primary);
}

.app-main {
  flex: 1;
}
</style>
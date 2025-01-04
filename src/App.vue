<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div>
      <RouterLink to="/">Home</RouterLink>
    </div>
    <div>
      <RouterLink to="/idol">Idol</RouterLink>
    </div>
    <div>
      <RouterLink to="/card">Card</RouterLink>
    </div>
    <div>
      <RouterLink to="/schedule">Schedule</RouterLink>
    </div>
  </header>
  <RouterView />
</template>

<style scoped>
</style>

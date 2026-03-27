<template>
  <div class="card-list">
    <Card v-for="(card, i) in cards" :key="i" :card="card" />
  </div>
</template>

<script setup>
import Card from './Card.vue';

const props = defineProps(['cards']);
</script>

<style scoped>
.card-list {
  display: flex;
  gap: 10px;
}
</style>

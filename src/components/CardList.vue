<template>
  <div class="card-list">
    <Card
      v-for="(card, i) in cards"
      :key="i"
      :card="card"
      :highlight="isHighlight(card)"
    />
  </div>
</template>

<script setup>
import Card from './Card.vue';

const props = defineProps(['cards', 'highlightCards']);

function isHighlight(card) {
  if (!props.highlightCards) return false;

  return props.highlightCards.some(
    (c) => c.suit === card.suit && c.rank === card.rank,
  );
}
</script>
<style scoped>
.card-list {
  display: flex;
  gap: 10px;
}
</style>

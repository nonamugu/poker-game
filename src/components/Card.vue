<template>
  <div class="card">
    <div>{{ card.rank }}</div>
    <div>{{ symbol }}</div>
  </div>
</template>

<script setup>
const props = defineProps(['card']);

const symbolMap = {
  spade: '♠',
  heart: '♥',
  diamond: '♦',
  club: '♣',
};

const symbol = symbolMap[props.card.suit];
</script>

<style scoped>
.card {
  width: 60px;
  height: 90px;
  border: 1px solid #333;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
}
</style>

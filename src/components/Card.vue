<template>
  <div class="card" :class="{ highlight, red: isRed }">
    <div class="rank">{{ card.rank }}</div>
    <div class="suit">{{ symbol }}</div>
  </div>
</template>

<script setup>
const props = defineProps(['card', 'highlight']);

const symbolMap = {
  spade: '♠',
  heart: '♥',
  diamond: '♦',
  club: '♣',
};

const symbol = symbolMap[props.card.suit];

const isRed = props.card.suit === 'heart' || props.card.suit === 'diamond';
</script>

<style scoped>
.card {
  width: 60px;
  height: 90px;
  border: 1px solid #333;
  border-radius: 8px;
  background: white;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  transition: 0.2s;

  opacity: 0;
  transform: translateY(20px);
  animation: deal 0.3s forwards;
}

@keyframes deal {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.red {
  color: red;
}

.player.loser {
  opacity: 0.5;
}

.highlight {
  border: 3px solid gold;
  box-shadow: 0 0 10px gold;
  transform: translateY(-10px) scale(1.05);
  z-index: 2;
}
</style>

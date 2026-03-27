<template>
  <div>
    <h2>내 카드</h2>
    <CardList :cards="playerCards" :highlightCards="bestCards" />

    <h2>보드</h2>
    <CardList :cards="boardCards" :highlightCards="bestCards" />

    <HandResult :hand="bestHand" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { usePoker } from './composables/usePoker';

import CardList from './components/CardList.vue';
import HandResult from './components/HandResult.vue';

const { playerCards, boardCards, bestHand, bestCards, init } = usePoker();

onMounted(() => {
  init();
});
</script>

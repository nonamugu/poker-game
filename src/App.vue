<script setup>
import { onMounted } from 'vue';
import { usePoker } from './composables/usePoker';

import CardList from './components/CardList.vue';
import HandResult from './components/HandResult.vue';

const { playerCards, boardCards, bestHand, init } = usePoker();

onMounted(() => {
  init();
});
</script>

<template>
  <div>
    <h2>보드</h2>
    <CardList :cards="boardCards" />

    <h2>내 카드</h2>
    <CardList :cards="playerCards" />

    <HandResult :hand="bestHand" />
  </div>
</template>

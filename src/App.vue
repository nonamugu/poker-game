<script setup>
import { onMounted } from 'vue';
import { usePoker } from './composables/usePoker';

import CardList from './components/CardList.vue';
import HandResult from './components/HandResult.vue';

const { playerCards, boardCards, bestHand, bestCards, stage, init, nextStage } =
  usePoker();

onMounted(() => {
  init();
});
</script>

<template>
  <div>
    <h2>내 카드</h2>
    <CardList :cards="playerCards" :highlightCards="bestCards" />

    <h2>보드</h2>
    <CardList :cards="boardCards" :highlightCards="bestCards" />

    <button @click="nextStage">
      {{
        stage === 'init'
          ? '플랍 보기'
          : stage === 'flop'
            ? '턴 보기'
            : stage === 'turn'
              ? '리버 보기'
              : '다시 시작'
      }}
    </button>

    <HandResult v-if="stage === 'river' || stage === 'end'" :hand="bestHand" />
  </div>
</template>

<template>
  <div>
    <div v-for="player in players" :key="player.id" class="player">
      <h3>
        {{ player.name }}
        <span v-if="winners.includes(player.id)">🏆 승리!</span>
      </h3>
      <CardList
        :cards="player.cards"
        :hidden="player.id !== 1 && stage !== 'river'"
      />
      <HandResult v-if="stage === 'river'" :hand="player.bestHand" />
    </div>

    <h2>보드</h2>
    <CardList :cards="boardCards" />

    <button @click="nextStage" :disabled="isDealing">다음</button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { usePoker } from './composables/usePoker';

import CardList from './components/CardList.vue';
import HandResult from './components/HandResult.vue';

const {
  // playerCards,
  players,
  boardCards,
  // bestHand,
  // bestCards,
  winners,
  stage,
  init,
  nextStage,
  isDealing,
} = usePoker();

onMounted(() => {
  init();
});

// function getHandText(hand) {
//   if (!hand) return '';

//   const name = HAND_NAME[hand.rank];
//   const main = hand.main.map((v) => RANKS[v]).join(', ');
//   const kickers = hand.kickers.map((v) => RANKS[v]).join(', ');

//   return `${name} (${main}) / 킥커: ${kickers}`;
// }
</script>

<style>
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.player {
  margin-bottom: 20px;
}

.player h3 {
  display: flex;
  gap: 10px;
  align-items: center;
}
</style>

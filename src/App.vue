<template>
  <div>
    <div
      v-for="player in players"
      :key="player.id"
      :class="{ loser: stage === 'river' && !winners.includes(player.id) }"
    >
      <h2>
        {{ player.name }}
        <span v-if="winners.includes(player.id)">🏆 승리!</span>
      </h2>
      <HandResult v-if="stage === 'river'" :hand="player.bestHand" />
      <CardList
        :cards="player.cards"
        :highlightCards="getHighlightCards(player)"
        :hidden="player.id !== 1 && stage !== 'river'"
      />
    </div>

    <h2>보드</h2>
    <CardList :cards="boardCards" :highlightCards="getBoardHighlights()" />
    <button @click="nextStage" :disabled="isDealing">
      {{
        stage === 'init'
          ? '플랍'
          : stage === 'flop'
            ? '턴'
            : stage === 'turn'
              ? '리버'
              : '다시 시작'
      }}
    </button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { usePoker } from './composables/usePoker';

import CardList from './components/CardList.vue';
import HandResult from './components/HandResult.vue';

const {
  players,
  boardCards,
  winners,
  stage,
  init,
  nextStage,
  isDealing,
  getBoardHighlights,
  getHighlightCards,
} = usePoker();

onMounted(() => {
  init();
});
</script>

<style>
button {
  width: 120px;
  height: 40px;
  margin: 10px;
  background-color: aquamarine;
  border: 0.5px solid green;
  border-radius: 10px;
}
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

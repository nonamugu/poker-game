import { ref } from 'vue';
import { createDeck, shuffle } from '../utils/deck';
import { getCombinations } from '../utils/combinations';
import { evaluateHand } from '../utils/handEvaluator';

export function usePoker() {
  const playerCards = ref([]);
  const boardCards = ref([]);
  const bestHand = ref(null);

  function init() {
    const deck = createDeck();
    shuffle(deck);

    // 👉 내 카드 2장
    playerCards.value = [deck.pop(), deck.pop()];

    // 👉 보드 5장
    boardCards.value = [];
    for (let i = 0; i < 5; i++) {
      boardCards.value.push(deck.pop());
    }

    calculateBestHand();
  }

  function calculateBestHand() {
    const allCards = [...playerCards.value, ...boardCards.value];

    const combos = getCombinations(allCards, 5);

    let best = null;

    combos.forEach((combo) => {
      const result = evaluateHand(combo);

      if (!best || compareHands(result, best) > 0) {
        best = result;
      }
    });

    bestHand.value = best;
  }

  function compareHands(a, b) {
    if (a.rank !== b.rank) return a.rank - b.rank;

    for (let i = 0; i < a.main.length; i++) {
      if (a.main[i] !== b.main[i]) return a.main[i] - b.main[i];
    }

    for (let i = 0; i < a.kickers.length; i++) {
      if (a.kickers[i] !== b.kickers[i]) return a.kickers[i] - b.kickers[i];
    }

    return 0;
  }

  return {
    playerCards,
    boardCards,
    bestHand,
    init,
  };
}

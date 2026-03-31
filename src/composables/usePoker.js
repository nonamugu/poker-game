import { ref } from 'vue';
import { createDeck, shuffle } from '../utils/deck';
import { getCombinations } from '../utils/combinations';
import { evaluateHand } from '../utils/handEvaluator';

export function usePoker() {
  const deck = ref([]);

  const playerCards = ref([]);
  const boardCards = ref([]);
  const bestHand = ref(null);
  const bestCards = ref([]);

  const stage = ref('init');

  function init() {
    deck.value = createDeck();
    shuffle(deck.value);

    playerCards.value = [deck.value.pop(), deck.value.pop()];
    boardCards.value = [];

    stage.value = 'init';
  }
  function nextStage() {
    if (stage.value === 'init') {
      boardCards.value.push(deck.value.pop());
      boardCards.value.push(deck.value.pop());
      boardCards.value.push(deck.value.pop());
      stage.value = 'flop';
    } else if (stage.value === 'flop') {
      boardCards.value.push(deck.value.pop());
      stage.value = 'turn';
    } else if (stage.value === 'turn') {
      boardCards.value.push(deck.value.pop());
      stage.value = 'river';

      calculateBestHand();
    } else if (stage.value === 'river') {
      stage.value = 'end';
    }
  }

  function calculateBestHand() {
    const allCards = [...playerCards.value, ...boardCards.value];
    const combos = getCombinations(allCards, 5);

    let best = null;
    let bestCombo = null;

    combos.forEach((combo) => {
      const result = evaluateHand(combo);

      if (!best || compareHands(result, best) > 0) {
        best = result;
        bestCombo = combo;
      }
    });

    bestHand.value = best;
    bestCards.value = bestCombo;
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
    bestCards,
    stage,
    init,
    nextStage,
  };
}

import { ref } from 'vue';
import { createDeck, shuffle } from '../utils/deck';
import { getCombinations } from '../utils/combinations';
import { evaluateHand } from '../utils/handEvaluator';

export function usePoker() {
  const deck = ref([]);
  const boardCards = ref([]);

  const stage = ref('init');
  const isDealing = ref(false);

  const players = ref([
    { id: 1, name: '나', cards: [], bestHand: null, bestCards: [] },
    { id: 2, name: '상대1', cards: [], bestHand: null, bestCards: [] },
    { id: 3, name: '상대2', cards: [], bestHand: null, bestCards: [] },
  ]);

  const winners = ref([]);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function init() {
    winners.value = [];
    deck.value = createDeck();
    shuffle(deck.value);

    players.value.forEach((p) => {
      p.cards = [];
      p.bestHand = null;
    });

    boardCards.value = [];

    for (let i = 0; i < 2; i++) {
      for (const player of players.value) {
        player.cards.push(deck.value.pop());
        await sleep(200);
      }
    }

    stage.value = 'init';
  }

  async function nextStage() {
    if (isDealing.value) return;

    isDealing.value = true;

    if (stage.value === 'init') {
      await dealFlop();
      stage.value = 'flop';
    } else if (stage.value === 'flop') {
      boardCards.value.push(deck.value.pop());
      stage.value = 'turn';
    } else if (stage.value === 'turn') {
      boardCards.value.push(deck.value.pop());
      stage.value = 'river';

      calculateAllHands();
      findWinners();
    } else if (stage.value === 'river') {
      await init();
    }

    isDealing.value = false;
  }

  async function dealFlop() {
    for (let i = 0; i < 3; i++) {
      boardCards.value.push(deck.value.pop());
      await sleep(300);
    }
  }

  function calculateAllHands() {
    players.value.forEach((player) => {
      const allCards = [...player.cards, ...boardCards.value];
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

      player.bestHand = best;
      player.bestCards = bestCombo;
    });
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

  function findWinners() {
    let best = null;
    winners.value = [];

    players.value.forEach((player) => {
      if (!best || compareHands(player.bestHand, best) > 0) {
        best = player.bestHand;
        winners.value = [player.id];
      } else if (compareHands(player.bestHand, best) === 0) {
        winners.value.push(player.id);
      }
    });
  }

  function getBoardHighlights() {
    if (stage.value !== 'river') return [];

    const winner = players.value.find((p) => winners.value.includes(p.id));

    if (!winner) return [];

    return winner.bestCards;
  }

  function getHighlightCards(player) {
    // 리버 전에는 없음
    if (stage.value !== 'river') return [];

    // 승자가 아니면 강조 없음
    if (!winners.value.includes(player.id)) return [];

    return player.bestCards;
  }

  return {
    players,
    boardCards,
    stage,
    winners,
    init,
    nextStage,
    getBoardHighlights,
    getHighlightCards,
  };
}

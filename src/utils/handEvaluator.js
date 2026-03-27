// utils/handEvaluator.js
import { HAND_RANK, RANKS } from '../constants/poker';

function getRankValue(rank) {
  return RANKS.indexOf(rank);
}

export function evaluateHand(cards) {
  const ranks = cards.map((c) => c.rank);
  const suits = cards.map((c) => c.suit);

  const values = ranks.map(getRankValue).sort((a, b) => b - a);

  const countMap = {};
  values.forEach((v) => {
    countMap[v] = (countMap[v] || 0) + 1;
  });

  const groups = Object.entries(countMap)
    .map(([v, count]) => ({ value: Number(v), count }))
    .sort((a, b) => b.count - a.count || b.value - a.value);

  const isFlush = suits.every((s) => s === suits[0]);

  const unique = [...new Set(values)].sort((a, b) => b - a);
  let isStraight = false;

  if (unique.length === 5 && unique[0] - unique[4] === 4) {
    isStraight = true;
  }

  // 👉 족보 판단 + 상세정보
  if (isStraight && isFlush) {
    return { rank: HAND_RANK.STRAIGHT_FLUSH, main: [unique[0]], kickers: [] };
  }

  if (groups[0].count === 4) {
    return {
      rank: HAND_RANK.FOUR_OF_A_KIND,
      main: [groups[0].value],
      kickers: [groups[1].value],
    };
  }

  if (groups[0].count === 3 && groups[1].count === 2) {
    return {
      rank: HAND_RANK.FULL_HOUSE,
      main: [groups[0].value, groups[1].value],
      kickers: [],
    };
  }

  if (isFlush) {
    return {
      rank: HAND_RANK.FLUSH,
      main: values,
      kickers: [],
    };
  }

  if (isStraight) {
    return {
      rank: HAND_RANK.STRAIGHT,
      main: [unique[0]],
      kickers: [],
    };
  }

  if (groups[0].count === 3) {
    return {
      rank: HAND_RANK.THREE_OF_A_KIND,
      main: [groups[0].value],
      kickers: groups.slice(1).map((g) => g.value),
    };
  }

  if (groups[0].count === 2 && groups[1].count === 2) {
    return {
      rank: HAND_RANK.TWO_PAIR,
      main: [groups[0].value, groups[1].value],
      kickers: [groups[2].value],
    };
  }

  if (groups[0].count === 2) {
    return {
      rank: HAND_RANK.ONE_PAIR,
      main: [groups[0].value],
      kickers: groups.slice(1).map((g) => g.value),
    };
  }

  return {
    rank: HAND_RANK.HIGH_CARD,
    main: [values[0]],
    kickers: values.slice(1),
  };
}

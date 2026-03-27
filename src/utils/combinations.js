export function getCombinations(cards, count) {
  const result = [];

  function helper(start, combo) {
    if (combo.length === count) {
      result.push([...combo]);
      return;
    }

    for (let i = start; i < cards.length; i++) {
      combo.push(cards[i]);
      helper(i + 1, combo);
      combo.pop();
    }
  }

  helper(0, []);
  return result;
}

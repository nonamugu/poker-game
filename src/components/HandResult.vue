<script setup>
import { computed } from 'vue';
import { HAND_NAME, RANKS } from '../constants/poker';

const props = defineProps(['hand']);

const text = computed(() => {
  if (!props.hand) return '';

  const name = HAND_NAME[props.hand.rank];
  const main = props.hand.main.map((v) => RANKS[v]).join(', ');
  const kickers = props.hand.kickers.map((v) => RANKS[v]).join(', ');

  return `${name} (${main}) / 키커: ${kickers}`;
});
</script>

<template>
  <div>
    <h3>{{ text }}</h3>
  </div>
</template>

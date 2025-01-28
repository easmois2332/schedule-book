<script setup>
const props = defineProps(['cards'])
const cards = props.cards;
const vocalCards = cards.getVocalCardDetail();
const danceCards = cards.getDanceCardDetail();
const visualCards = cards.getVisualCardDetail();

console.log(cards.getVocalCardDetail());
console.log(cards.getDanceCardDetail());
console.log(cards.getVisualCardDetail());
</script>

<template>
  <h1>サポートカード一覧</h1>
</template>

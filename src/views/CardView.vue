<script setup>
import Cards from "@/classes/cards";

const props = defineProps(['cardList'])
const cards = new Cards(props.cardList);

console.log(cards.getCardDetail(1, 39));
console.log(cards.getAllCardDetail());

console.log(cards.getCard(1));
console.log(cards.getAllCard());
</script>

<template>
  <h1>サポートカード一覧</h1>
</template>

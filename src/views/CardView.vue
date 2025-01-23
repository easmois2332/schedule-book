<script setup>
import {cards} from "@/consts/cardConst";
import CardDetail from "@/classes/cardDetail";

const cardLists = [];

// サポートカードのリストを作成
for (let index in cards) {
  let cardDetail = new CardDetail(cards[index]);
  console.log(cardDetail.getCardDetails());
  cardLists.push(cardDetail.getCardDetails());
}
</script>

<template>
  <h1>サポートカード一覧</h1>
  <table v-for="card in cardLists" :key="card.id">
    <thead>
      <tr><th>{{ card.type }}</th><th>{{ card.name }}</th></tr>
    </thead>
    <tbody>
      <tr><td>{{ card.plan }}</td><td>{{ card.rarity_display }} Lv.{{ card.level }}</td></tr>
      <tr><td colspan="2">{{ card.events.event_2_display }}</td></tr>
      <tr><td>{{ card.ability_1_display }}</td><td>{{ card.ability_2_display }}</td></tr>
      <tr><td>{{ card.ability_3_display }}</td><td>{{ card.ability_4_display }}</td></tr>
      <tr><td>{{ card.ability_5_display }}</td><td>{{ card.ability_6_display }}</td></tr>
    </tbody>
  </table>
</template>

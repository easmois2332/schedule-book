<script setup>
import {cards} from "@/consts/cards";
import CardDetails from "@/classes/cardDetails";

const cardLists = [];
const saveLists = [];

// サポートカードのリストを作成
for (let index in cards) {
  let cardDetails = new CardDetails(cards[index]);
  console.log(cardDetails.getCardDetails());
  cardLists.push(cardDetails.getCardDetails());
}
</script>

<template>
  <h1>card page</h1>
  <div>サポートカード一覧</div>
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
  <div>保存したサポートカードの一覧</div>
  <table v-for="save in saveLists" :key="save.id">
    <thead>
      <tr><th>{{ save.type }}</th><th>{{ save.name }}</th></tr>
    </thead>
    <tbody>
      <tr><td>{{ save.plan }}</td><td>{{ save.rarity_display }} Lv.{{ save.level }}</td></tr>
      <tr><td colspan="2">{{ save.events.event_2_display }}</td></tr>
      <tr><td>{{ save.ability_1_display }}</td><td>{{ save.ability_2_display }}</td></tr>
      <tr><td>{{ save.ability_3_display }}</td><td>{{ save.ability_4_display }}</td></tr>
      <tr><td>{{ save.ability_5_display }}</td><td>{{ save.ability_6_display }}</td></tr>
    </tbody>
  </table>
</template>

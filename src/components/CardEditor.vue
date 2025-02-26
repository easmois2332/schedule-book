<script setup>
import {ref} from "vue";
import Items from "@/classes/items";

const props = defineProps(['cards', 'saveId', 'cardId', 'cardLevel'])
const emit = defineEmits(['close'])
const cards = props.cards;
const items = new Items();

let saveId = props.saveId;
let cardId = ref(props.cardId);
let cardLevel = ref(props.cardLevel);

let cardDetail = ref(null);
let cardMaxLevel = ref(60);

if (cardId.value !== null) {
  cardDetail.value = cards.getCardDetail(cardId.value, cardLevel.value);
  cardMaxLevel.value = cards.getCardFromId(cardId.value).level;
}

const buttonSelectCard = () => {
  cardId.value = Math.floor(Math.random() * 46) + 1;
  updateCardDetail();
}
const updateCardDetail = () => {
  if (cardId.value !== null) {
    cardDetail.value = cards.getCardDetail(cardId.value, cardLevel.value);
    cardMaxLevel.value = cards.getCardFromId(cardId.value).level;
  }
}
const getPItemDetail = (id) => {
  return items.getItemFromId(id);
}
const buttonSave = async () => {
  if (saveId === null) {
    await cards.insertSaveCard(cardId.value, cardLevel.value);
  } else {
    await cards.updateSaveCard(saveId, cardId.value, cardLevel.value)
  }
  emit('close');
}
const buttonDelete = async () => {
  await cards.deleteSaveCard(saveId);
  emit('close');
}
</script>

<template>
  <div class="modal-window-area" @click.self="$emit('close')">
    <div class="card-edit-modal">
      <div class="headline-area">
        <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#333333">
          <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
        </svg>
        <span class="headline-text">サポートカード管理</span>
      </div>
      <div class="card-info-area">
        <div class="card-image">
          <button class="card-select-button" :style="{ backgroundImage: [cardDetail !== null ? 'url(./image/cards/' + cardDetail.id + '.png)' : 'none']}" @click="buttonSelectCard">
            <span class="card-select-text" v-show="cardDetail === null">サポートカードを選択</span>
          </button>
        </div>
        <div class="card-info">
          <span class="card-info-text font-bold" v-if="cardDetail === null">サポートカード名</span>
          <span class="card-info-text font-bold" v-else>{{ cardDetail.name }}</span>
          <span class="card-info-text font-bold" v-if="cardDetail === null">タイプ プラン制限</span>
          <span class="card-info-text font-bold" v-else>{{ cardDetail.type_display }} {{ cardDetail.plan_display }}</span>
          <div class="card-level">
            <span class="card-level-text font-bold">Lv</span>
            <input class="card-level-number" type="number" min="1" v-bind:max="cardMaxLevel" v-model="cardLevel" @input="updateCardDetail">
          </div>
        </div>
      </div>
      <div class="card-event-headline">
        <span class="card-event-headline">サポートイベント</span>
      </div>
      <div class="card-event-area">
        <div class="card-event">
          <span class="card-event1" v-if="cardDetail === null">サポートイベント 1</span>
          <span class="card-event1" v-else-if="cardDetail.event_1 === 'get_unique_p_item'">Pアイテム<span class="font-bold">『{{ getPItemDetail(cardDetail.p_item_id).name }}』</span></span>
          <span class="card-event1" v-else-if="cardDetail.event_1 === 'get_unique_card'">スキルカード<span class="font-bold">『スキルカード名』</span></span>
        </div>
        <div class="card-event">
          <span class="card-event2" v-if="cardDetail === null">サポートイベント 2</span>
          <span class="card-event2" v-else v-html="cardDetail.event_2_display"></span>
        </div>
        <div class="card-event">
          <span class="card-event3" v-if="cardDetail === null">サポートイベント 3</span>
          <span class="card-event3" v-else v-html="cardDetail.event_3_display"></span>
        </div>
      </div>
      <div class="card-ability-headline">
        <span class="card-ability-headline">サポートアビリティ</span>
      </div>
      <div class="card-ability-area">
        <div class="card-ability">
          <span class="card-ability1" v-if="cardDetail === null">サポートアビリティ 1</span>
          <span class="card-ability1" v-else v-html="cardDetail.ability_1_display"></span>
        </div>
        <div class="card-ability">
          <span class="card-ability2" v-if="cardDetail === null">サポートアビリティ 2</span>
          <span class="card-ability2" v-else v-html="cardDetail.ability_2_display"></span>
        </div>
        <div class="card-ability">
          <span class="card-ability3" v-if="cardDetail === null">サポートアビリティ 3</span>
          <span class="card-ability3" v-else v-html="cardDetail.ability_3_display"></span>
        </div>
        <div class="card-ability">
          <span class="card-ability4" v-if="cardDetail === null">サポートアビリティ 4</span>
          <span class="card-ability4" v-else v-html="cardDetail.ability_4_display"></span>
        </div>
        <div class="card-ability">
          <span class="card-ability5" v-if="cardDetail === null">サポートアビリティ 5</span>
          <span class="card-ability5" v-else v-html="cardDetail.ability_5_display"></span>
        </div>
        <div class="card-ability">
          <span class="card-ability6" v-if="cardDetail === null">サポートアビリティ 6</span>
          <span class="card-ability6" v-else v-html="cardDetail.ability_6_display"></span>
        </div>
      </div>
      <div class="edit-button-area">
        <div class="edit-button">
          <button class="common-button" v-bind:disabled="cardId === null" @click="buttonSave">
            <span class="common-button-name">保存</span>
          </button>
        </div>
        <div class="edit-button" v-if="saveId !== null">
          <button class="common-button" @click="buttonDelete">
            <span class="common-button-name">削除</span>
          </button>
        </div>
        <div class="edit-button">
          <button class="common-button" @click="$emit('close')">
            <span class="common-button-name">キャンセル</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

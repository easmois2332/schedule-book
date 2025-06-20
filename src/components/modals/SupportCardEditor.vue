<script setup>
import SupportCardSelect from "@/components/modals/SupportCardSelect.vue";
import {ref} from "vue";
import Items from "@/classes/items";
import SkillCards from "@/classes/skillCards";

const props = defineProps(['supportCards', 'saveId', 'cardId', 'cardLevel']);
const emit = defineEmits(['editor-close']);
const cards = props.supportCards;
const items = new Items();
const skillCards = new SkillCards();

let saveId = props.saveId;
let cardId = ref(props.cardId);
let cardLevel = ref(props.cardLevel);
let cardDetail = ref(null);
let cardMaxLevel = ref(60);

let selectorOpen = ref(false);

if (cardId.value !== null) {
  cardDetail.value = cards.getCardDetail(cardId.value, cardLevel.value);
  cardMaxLevel.value = cardDetail.value.max_level;
}

const buttonSelectCard = () => {
  selectorOpen.value = true;
}
const closeSelector = (id, level) => {
  if (id !== null) {
    cardId.value = id;
    cardLevel.value = level;
    updateCardDetail();
  }
  selectorOpen.value = false;
}
const updateCardDetail = () => {
  if (cardId.value !== null) {
    cardDetail.value = cards.getCardDetail(cardId.value, cardLevel.value);
    cardMaxLevel.value = cardDetail.value.max_level;
  }
}
const getPItemDetail = (id) => {
  return items.getItemFromId(id);
}
const getSkillCardDetail = (id) => {
  return skillCards.getItemFromId(id);
}
const buttonSave = async () => {
  if (saveId === null) {
    await cards.insertSaveCard(cardId.value, cardLevel.value);
  } else {
    await cards.updateSaveCard(saveId, cardId.value, cardLevel.value)
  }
  emit('editor-close');
}
const buttonDelete = async () => {
  await cards.deleteSaveCard(saveId);
  emit('editor-close');
}
</script>

<template>
  <div class="modal-window-area" @click.self="$emit('editor-close')">
    <div class="card-edit-modal">
      <div class="headline-area">
        <div class="headline-title-area">
          <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#333333">
            <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
          </svg>
          <span class="headline-text">サポートカード管理</span>
        </div>
        <div class="headline-close-button-area">
          <button class="headline-close-button" @click="$emit('editor-close')">
            <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#333333">
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="content-area">
        <div class="card-info-area">
          <div class="card-image">
            <button class="card-select-button" :style="{ backgroundImage: [cardDetail !== null ? 'url(./image/supportCards/' + cardDetail.id + '.png)' : 'none']}" @click="buttonSelectCard">
              <span class="card-select-text" v-show="cardDetail === null">サポートカードを選択</span>
            </button>
          </div>
          <div class="card-info">
            <span class="card-info-text font-bold" v-if="cardDetail === null">サポートカード名</span>
            <span class="card-info-text font-bold" v-else>{{ cardDetail.name }}</span>
            <span class="card-info-text font-bold" v-if="cardDetail === null">タイプ プラン制限</span>
            <span class="card-info-text font-bold" v-else>{{ cardDetail.type_display }} {{ cardDetail.plan_display }}</span>
            <div class="card-level">
              <label class="basic-input-number-name font-bold">Lv</label>
              <input class="basic-input-number" type="number" min="1" v-bind:max="cardMaxLevel" v-model="cardLevel" v-bind:disabled="cardId === null" @input="updateCardDetail">
            </div>
          </div>
        </div>
        <div class="common-headline">
          <span class="common-headline-text font-bold">サポートイベント</span>
        </div>
        <div class="card-event-area">
          <div class="card-event">
            <span class="card-event1" v-if="cardDetail === null">サポートイベント 1</span>
            <span class="card-event1" v-else-if="cardDetail.event_1 === 'get_unique_p_item'">Pアイテム<span class="font-bold">『{{ getPItemDetail(cardDetail.p_item_id).name }}』</span></span>
            <span class="card-event1" v-else-if="cardDetail.event_1 === 'get_unique_card'">スキルカード<span class="font-bold">『{{ getSkillCardDetail(cardDetail.skill_card_id).name }}』</span></span>
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
        <div class="common-headline">
          <span class="common-headline-text font-bold">サポートアビリティ</span>
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
            <span class="card-ability4" v-if="cardDetail === null">サポートアビリティ 4</span>
            <span class="card-ability4" v-else v-html="cardDetail.ability_4_display"></span>
          </div>
          <div class="card-ability">
            <span class="card-ability5" v-if="cardDetail === null">サポートアビリティ 5</span>
            <span class="card-ability5" v-else v-html="cardDetail.ability_5_display"></span>
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
            <button class="common-button" @click="$emit('editor-close')">
              <span class="common-button-name">キャンセル</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Teleport to="#modal-area">
    <SupportCardSelect
        v-if="selectorOpen"
        :support-cards="cards"
        :plan-filter="null"
        @selector-close="closeSelector"
    />
  </Teleport>
</template>

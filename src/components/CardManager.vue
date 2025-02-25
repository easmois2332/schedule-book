<script setup>
import CardEditor from "@/components/CardEditor.vue";
import {ref} from "vue";
import Items from "@/classes/items";

const props = defineProps(['cards'])
const cards = props.cards;
const items = new Items();

let showEditor = ref(false);
let filterOpen = ref(false);
let filterType = ref([
  'vocal', 'dance', 'visual', 'assist',
]);
let filterPlan = ref([
  'free', 'sense', 'logic', 'anomaly',
]);
let filterEvent = ref([
  'get_unique_p_item', 'get_unique_card', 'basic_card_change', 'card_random_strengthen',
]);
let filterAbility = ref([
  'max_hp_up', 'init_p_point', 'sp_lesson_rate', 'init_parameter_up', 'parameter_bonus',
  'lesson_parameter_up', 'normal_lesson_parameter_up', 'sp_lesson_parameter_up',
  'card_strengthen_parameter_up', 'active_card_strengthen_parameter_up', 'mental_card_strengthen_parameter_up', 'card_delete_parameter_up',
  'class_parameter_up', 'gift_parameter_up', 'outing_parameter_up', 'consultation_parameter_up', 'rest_parameter_up',
  'sp_lesson_hp_recover',
]);
let cardList = ref(cards.getAllSaveCard());

const buttonFilterOpen = () => {
  filterOpen.value = !filterOpen.value;
}
const buttonFiltering = () => {
  cardList.value = cards.getSaveCardFromFilter(filterType.value, filterPlan.value, filterEvent.value, filterAbility.value);
  buttonFilterOpen();
}
const buttonFilterReset = () => {
  filterType.value = [
    'vocal', 'dance', 'visual', 'assist',
  ];
  filterPlan.value = [
    'free', 'sense', 'logic', 'anomaly',
  ];
  filterEvent.value = [
    'get_unique_p_item', 'get_unique_card', 'basic_card_change', 'card_random_strengthen',
  ];
  filterAbility.value = [
    'max_hp_up', 'init_p_point', 'sp_lesson_rate', 'init_parameter_up', 'parameter_bonus',
    'lesson_parameter_up', 'normal_lesson_parameter_up', 'sp_lesson_parameter_up',
    'card_strengthen_parameter_up', 'active_card_strengthen_parameter_up', 'mental_card_strengthen_parameter_up', 'card_delete_parameter_up',
    'class_parameter_up', 'gift_parameter_up', 'outing_parameter_up', 'consultation_parameter_up', 'rest_parameter_up',
    'sp_lesson_hp_recover',
  ];
  cardList.value = cards.getAllSaveCard();
  buttonFilterOpen();
}
const filterTypeCheckAll = () => {
  let all = [
    'vocal', 'dance', 'visual', 'assist',
  ];
  if (JSON.stringify(filterType.value).length === JSON.stringify(all).length) {
    filterType.value = [];
  } else {
    filterType.value = all;
  }
}
const filterPlanCheckAll = () => {
  let all = [
    'free', 'sense', 'logic', 'anomaly',
  ];
  if (JSON.stringify(filterPlan.value).length === JSON.stringify(all).length) {
    filterPlan.value = [];
  } else {
    filterPlan.value = all;
  }
}
const filterEventCheckAll = () => {
  let all = [
    'get_unique_p_item', 'get_unique_card', 'basic_card_change', 'card_random_strengthen',
  ];
  if (JSON.stringify(filterEvent.value).length === JSON.stringify(all).length) {
    filterEvent.value = [];
  } else {
    filterEvent.value = all;
  }
}
const filterAbilityCheckAll = () => {
  let all = [
    'max_hp_up', 'init_p_point', 'sp_lesson_rate', 'init_parameter_up', 'parameter_bonus',
    'lesson_parameter_up', 'normal_lesson_parameter_up', 'sp_lesson_parameter_up',
    'card_strengthen_parameter_up', 'active_card_strengthen_parameter_up', 'mental_card_strengthen_parameter_up', 'card_delete_parameter_up',
    'class_parameter_up', 'gift_parameter_up', 'outing_parameter_up', 'consultation_parameter_up', 'rest_parameter_up',
    'sp_lesson_hp_recover',
  ];
  if (JSON.stringify(filterAbility.value).length === JSON.stringify(all).length) {
    filterAbility.value = [];
  } else {
    filterAbility.value = all;
  }
}
const getPItemDetail = (id) => {
  return items.getItemFromId(id);
}
</script>

<template>
  <div class="card-manager-area">
    <div class="description-area">
      <span class="description">保存したサポートカードの追加、編集、削除ができます。</span>
    </div>
    <div class="card-edit-area">
      <div class="add-button">
        <button class="common-button" @click="showEditor = true">
          <span class="common-button-name">
            サポートカードを追加
          </span>
        </button>
      </div>
      <Teleport to="#modal-area">
        <CardEditor v-if="showEditor"
            :cards="cards"
            :save-id="null"
            :card-id="1"
            :card-level="1"
            @close="showEditor = false"
        />
      </Teleport>
    </div>
    <div class="card-filter-area">
      <div class="filter-button">
        <button class="common-button" @click="buttonFilterOpen">
          <span class="common-button-name">
            フィルター
          </span>
        </button>
      </div>
      <div class="card-filter-list-area" v-show="filterOpen">
        <div class="card-filter-list-header">
          <span class="card-filter-text">タイプ</span>
          <div class="card-filter-check-all" @click="filterTypeCheckAll">
            <span class="card-filter-text">一括チェック</span>
          </div>
        </div>
        <div class="card-filter-checkbox-area">
          <div class="card-filter-checkbox">
            <input class="common-checkbox" type="checkbox" id="card-filter-vocal" value="vocal" v-model="filterType">
            <label for="card-filter-vocal">ボーカル</label>
          </div>
          <div class="card-filter-checkbox">
            <input class="common-checkbox" type="checkbox" id="card-filter-dance" value="dance" v-model="filterType">
            <label for="card-filter-dance">ダンス</label>
          </div>
          <div class="card-filter-checkbox">
            <input class="common-checkbox" type="checkbox" id="card-filter-visual" value="visual" v-model="filterType">
            <label for="card-filter-visual">ビジュアル</label>
          </div>
          <div class="card-filter-checkbox">
            <input class="common-checkbox" type="checkbox" id="card-filter-assist" value="assist" v-model="filterType">
            <label for="card-filter-assist">アシスト</label>
          </div>
        </div>
        <div class="card-filter-list-header">
          <span class="card-filter-text">プラン</span>
          <div class="card-filter-check-all" @click="filterPlanCheckAll">
            <span class="card-filter-text">一括チェック</span>
          </div>
        </div>
        <div class="card-filter-checkbox-area">
          <div class="card-filter-checkbox">
            <input class="common-checkbox" type="checkbox" id="card-filter-free" value="free" v-model="filterPlan">
            <label for="card-filter-free">プラン制限なし</label>
          </div>
          <div class="card-filter-checkbox">
            <input class="common-checkbox" type="checkbox" id="card-filter-sense" value="sense" v-model="filterPlan">
            <label for="card-filter-sense">センス限定</label>
          </div>
          <div class="card-filter-checkbox">
            <input class="common-checkbox" type="checkbox" id="card-filter-logic" value="logic" v-model="filterPlan">
            <label for="card-filter-logic">ロジック限定</label>
          </div>
          <div class="card-filter-checkbox">
            <input class="common-checkbox" type="checkbox" id="card-filter-anomaly" value="anomaly" v-model="filterPlan">
            <label for="card-filter-anomaly">アノマリー限定</label>
          </div>
        </div>
        <div class="card-filter-list-header">
          <span class="card-filter-text">イベント</span>
          <div class="card-filter-check-all" @click="filterEventCheckAll">
            <span class="card-filter-text">一括チェック</span>
          </div>
        </div>
        <div class="card-filter-checkbox-area">
          <div class="card-filter-checkbox">
            <input class="common-checkbox" type="checkbox" id="card-filter-get_unique_p_item" value="get_unique_p_item" v-model="filterEvent">
            <label for="card-filter-get_unique_p_item">Pアイテムを獲得</label>
          </div>
          <div class="card-filter-checkbox">
            <input class="common-checkbox" type="checkbox" id="card-filter-get_unique_card" value="get_unique_card" v-model="filterEvent">
            <label for="card-filter-get_unique_card">スキルカードを獲得</label>
          </div>
          <div class="card-filter-checkbox">
            <input class="common-checkbox" type="checkbox" id="card-filter-basic_card_change" value="basic_card_change" v-model="filterEvent">
            <label for="card-filter-basic_card_change">ランダムな基本スキルカードを変換</label>
          </div>
          <div class="card-filter-checkbox">
            <input class="common-checkbox" type="checkbox" id="card-filter-card_random_strengthen" value="card_random_strengthen" v-model="filterEvent">
            <label for="card-filter-card_random_strengthen">ランダムなスキルカードを強化</label>
          </div>
        </div>
        <div class="card-filter-list-header">
          <span class="card-filter-text">アビリティ</span>
          <div class="card-filter-check-all" @click="filterAbilityCheckAll">
            <span class="card-filter-text">一括チェック</span>
          </div>
        </div>
        <div class="ability-filter-area">
          <span class="ability-filter-text">初期値関係</span>
          <div class="card-filter-checkbox-area">
            <div class="card-filter-checkbox">
              <input class="common-checkbox" type="checkbox" id="card-filter-max-hp-up" value="max_hp_up" v-model="filterAbility">
              <label for="card-filter-max-hp-up">最大体力増加</label>
            </div>
            <div class="card-filter-checkbox">
              <input class="common-checkbox" type="checkbox" id="card-filter-init_p_point" value="init_p_point" v-model="filterAbility">
              <label for="card-filter-init_p_point">初期Pポイント獲得</label>
            </div>
            <div class="card-filter-checkbox">
              <input class="common-checkbox" type="checkbox" id="card-filter-sp_lesson_rate" value="sp_lesson_rate" v-model="filterAbility">
              <label for="card-filter-sp_lesson_rate">SPレッスン発生率増加</label>
            </div>
            <div class="card-filter-checkbox">
              <input class="common-checkbox" type="checkbox" id="card-filter-init_parameter_up" value="init_parameter_up" v-model="filterAbility">
              <label for="card-filter-init_parameter_up">初期パラメータ上昇</label>
            </div>
            <div class="card-filter-checkbox">
              <input class="common-checkbox" type="checkbox" id="card-filter-parameter_bonus" value="parameter_bonus" v-model="filterAbility">
              <label for="card-filter-parameter_bonus">パラメータボーナス増加</label>
            </div>
          </div>
          <span class="ability-filter-text">パラメータ上昇関係</span>
          <div class="ability-filter-parameter-area">
            <div class="card-filter-checkbox-area">
              <div class="card-filter-checkbox">
                <input class="common-checkbox" type="checkbox" id="card-filter-lesson_parameter_up" value="lesson_parameter_up" v-model="filterAbility">
                <label for="card-filter-lesson_parameter_up">レッスン終了時</label>
              </div>
              <div class="card-filter-checkbox">
                <input class="common-checkbox" type="checkbox" id="card-filter-normal_lesson_parameter_up" value="normal_lesson_parameter_up" v-model="filterAbility">
                <label for="card-filter-normal_lesson_parameter_up">通常レッスン終了時</label>
              </div>
              <div class="card-filter-checkbox">
                <input class="common-checkbox" type="checkbox" id="card-filter-sp_lesson_parameter_up" value="sp_lesson_parameter_up" v-model="filterAbility">
                <label for="card-filter-sp_lesson_parameter_up">SPレッスン終了時</label>
              </div>
            </div>
            <div class="card-filter-checkbox-area">
              <div class="card-filter-checkbox">
                <input class="common-checkbox" type="checkbox" id="card-filter-card_strengthen_parameter_up" value="card_strengthen_parameter_up" v-model="filterAbility">
                <label for="card-filter-card_strengthen_parameter_up">スキルカード強化時</label>
              </div>
              <div class="card-filter-checkbox">
                <input class="common-checkbox" type="checkbox" id="card-filter-active_card_strengthen_parameter_up" value="active_card_strengthen_parameter_up" v-model="filterAbility">
                <label for="card-filter-active_card_strengthen_parameter_up">アクティブスキルカード強化時</label>
              </div>
              <div class="card-filter-checkbox">
                <input class="common-checkbox" type="checkbox" id="card-filter-mental_card_strengthen_parameter_up" value="mental_card_strengthen_parameter_up" v-model="filterAbility">
                <label for="card-filter-mental_card_strengthen_parameter_up">メンタルスキルカード強化時</label>
              </div>
              <div class="card-filter-checkbox">
                <input class="common-checkbox" type="checkbox" id="card-filter-card_delete_parameter_up" value="card_delete_parameter_up" v-model="filterAbility">
                <label for="card-filter-card_delete_parameter_up">スキルカード削除時</label>
              </div>
            </div>
            <div class="card-filter-checkbox-area">
              <div class="card-filter-checkbox">
                <input class="common-checkbox" type="checkbox" id="card-filter-class_parameter_up" value="class_parameter_up" v-model="filterAbility">
                <label for="card-filter-class_parameter_up">授業・営業終了時</label>
              </div>
              <div class="card-filter-checkbox">
                <input class="common-checkbox" type="checkbox" id="card-filter-gift_parameter_up" value="gift_parameter_up" v-model="filterAbility">
                <label for="card-filter-gift_parameter_up">活動支給・差し入れ選択時</label>
              </div>
              <div class="card-filter-checkbox">
                <input class="common-checkbox" type="checkbox" id="card-filter-outing_parameter_up" value="outing_parameter_up" v-model="filterAbility">
                <label for="card-filter-outing_parameter_up">お出かけ終了時</label>
              </div>
              <div class="card-filter-checkbox">
                <input class="common-checkbox" type="checkbox" id="card-filter-consultation_parameter_up" value="consultation_parameter_up" v-model="filterAbility">
                <label for="card-filter-consultation_parameter_up">相談選択時</label>
              </div>
              <div class="card-filter-checkbox">
                <input class="common-checkbox" type="checkbox" id="card-filter-rest_parameter_up" value="rest_parameter_up" v-model="filterAbility">
                <label for="card-filter-rest_parameter_up">休む選択時</label>
              </div>
            </div>
          </div>
          <span class="ability-filter-text">体力回復関係</span>
          <div class="card-filter-checkbox-area">
            <div class="card-filter-checkbox">
              <input class="common-checkbox" type="checkbox" id="card-filter-sp_lesson_hp_recover" value="sp_lesson_hp_recover" v-model="filterAbility">
              <label for="card-filter-sp_lesson_hp_recover">SPレッスン終了時</label>
            </div>
          </div>
        </div>
        <div class="filter-button-area">
          <div class="filter-button">
            <button class="common-button" @click="buttonFiltering">
          <span class="common-button-name">
            検索
          </span>
            </button>
          </div>
          <div class="filter-button">
            <button class="common-button" @click="buttonFilterReset">
          <span class="common-button-name">
            フィルターリセット
          </span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="card-list-area">
      <div class="card" v-bind:class="card.type" v-for="card in cardList" :key="card.id">
        <div class="card-image-area" :style="{ backgroundImage: 'url(./image/cards/' + card.id + '.png)'}">
          <div class="card-name">
            <span class="card-name-text">{{ card.name }}</span>
          </div>
          <div class="card-info">
            <span class="card-info-text">{{ card.type_display }} {{ card.plan_display }}</span>
            <span class="card-info-text">{{ card.rarity_display }} Lv{{ card.level }}</span>
          </div>
        </div>
        <div class="card-event-area" v-bind:class="card.type">
          <div class="card-event" v-if="card.event_1 === 'get_unique_p_item'">
            <span class="card-event1">Pアイテム<span class="font-bold">『{{ getPItemDetail(card.p_item_id).name }}』</span></span>
          </div>
          <div class="card-event" v-if="card.event_1 === 'get_unique_card'">
            <span class="card-event1">スキルカード<span class="font-bold">『スキルカード名』</span></span>
          </div>
          <div class="card-event" v-if="card.event_2 !== 'none'">
            <span class="card-event2" v-html="card.event_2_display"></span>
          </div>
          <div class="card-event" v-if="card.event_3 !== 'none'">
            <span class="card-event3" v-html="card.event_3_display"></span>
          </div>
        </div>
        <div class="card-ability-area">
          <div class="card-ability">
            <span class="card-ability1" v-html="card.ability_1_display"></span>
          </div>
          <div class="card-ability">
            <span class="card-ability2" v-html="card.ability_2_display"></span>
          </div>
          <div class="card-ability">
            <span class="card-ability3" v-html="card.ability_3_display"></span>
          </div>
          <div class="card-ability">
            <span class="card-ability4" v-html="card.ability_4_display"></span>
          </div>
          <div class="card-ability">
            <span class="card-ability5" v-html="card.ability_5_display"></span>
          </div>
          <div class="card-ability">
            <span class="card-ability6" v-html="card.ability_6_display"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

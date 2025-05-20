<script setup>
import {onBeforeMount, ref, watch} from "vue";
import Items from "@/classes/items";
import {abilityBasicParameterUpList, abilityExtraParameterUpList} from "@/consts/supportCardConst";

const props = defineProps(['inputData', 'basicData']);
const emit = defineEmits(['input-data-update']);

const items = new Items();

const maxParameter = 1800;
const scheduleData = {
  1: {
    'class:50': {value: 'class:50', text: '授業 +50', parameter: 50, point: 0, hp: -5},
    'class:25': {value: 'class:25', text: '授業 +25', parameter: 25, point: 0, hp: 0},
  },
  2: {
    'class:50': {value: 'class:50', text: '授業 +50', parameter: 50, point: 0, hp: -5},
    'class:25': {value: 'class:25', text: '授業 +25', parameter: 25, point: 0, hp: 0},
  },
  3: {
    'gift': {value: 'gift', text: '活動支給', parameter: 0, point: 95, hp: 0},
    'outing:rng': {value: 'outing:rng', text: 'お出かけ(ランダム)', parameter: 0, point: 0, hp: 0},
  },
  4: {
    'consultation': {value: 'consultation', text: '相談', parameter: 0, point: 0, hp: 0},
    'outing:rng': {value: 'outing:rng', text: 'お出かけ(ランダム)', parameter: 0, point: 0, hp: 0},
  },
  5: {
    'sp_lesson': {value: 'sp_lesson', text: 'SPレッスン', parameter: 90, point: 27, hp: 0},
    'lesson': {value: 'lesson', text: 'レッスン', parameter: 60, point: 14, hp: 0},
  },
  6: {
    'gift': {value: 'gift', text: '活動支給', parameter: 0, point: 95, hp: 0},
    'consultation': {value: 'consultation', text: '相談', parameter: 0, point: 0, hp: 0},
    'outing:rng': {value: 'outing:rng', text: 'お出かけ(ランダム)', parameter: 0, point: 0, hp: 0},
    'rest': {value: 'rest', text: '休む', parameter: 0, point: 0, hp: 0},
  },
  7: {
    'push_lesson': {value: 'push_lesson', text: '追い込みレッスン', parameter: 90, point: 28, hp: 0},
  },
  7.5: {
    'push_bonus': {value: 'push_bonus', text: '追い込みボーナス', parameter: 90, point: 0, hp: 0},
  },
  8: {
    'exam_1': {value: 'exam_1', text: '中間試験', parameter: 20, point: 125, hp: 0},
  },
  9: {
    'consultation': {value: 'consultation', text: '相談', parameter: 0, point: 0, hp: 0},
    'gift:rng': {value: 'gift:rng', text: '活動支給(ランダム)', parameter: 0, point: 145, hp: 0},
    'outing:rng': {value: 'outing:rng', text: 'お出かけ(ランダム)', parameter: 0, point: 0, hp: 0},
    'rest': {value: 'rest', text: '休む', parameter: 0, point: 0, hp: 0},
  },
  10: {
    'class:80': {value: 'class:80', text: '授業 +80', parameter: 80, point: 0, hp: -8},
    'class:55': {value: 'class:55', text: '授業 +55', parameter: 55, point: 0, hp: -4},
    'class:30': {value: 'class:30', text: '授業 +30', parameter: 30, point: 0, hp: 0},
    'rest': {value: 'rest', text: '休む', parameter: 0, point: 0, hp: 0},
  },
  11: {
    'sp_lesson': {value: 'sp_lesson', text: 'SPレッスン', parameter: 170, point: 28, hp: 0},
    'lesson': {value: 'lesson', text: 'レッスン', parameter: 110, point: 14, hp: 0},
    'rest': {value: 'rest', text: '休む', parameter: 0, point: 0, hp: 0},
  },
  12: {
    'class:110': {value: 'class:110', text: '授業 +110', parameter: 110, point: 0, hp: 0},
    'class:45': {value: 'class:45', text: '授業 +45', parameter: 454, point: 0, hp: -4},
    'rest': {value: 'rest', text: '休む', parameter: 0, point: 0, hp: 0},
  },
  13: {
    'gift': {value: 'gift', text: '活動支給', parameter: 0, point: 145, hp: 0},
    'outing': {value: 'outing', text: 'お出かけ', parameter: 0, point: 0, hp: 0},
    'rest': {value: 'rest', text: '休む', parameter: 0, point: 0, hp: 0},
  },
  14: {
    'sp_lesson': {value: 'sp_lesson', text: 'SPレッスン', parameter: 200, point: 28, hp: 0},
    'lesson': {value: 'lesson', text: 'レッスン', parameter: 120, point: 14, hp: 0},
    'rest': {value: 'rest', text: '休む', parameter: 0, point: 0, hp: 0},
  },
  15: {
    'sp_lesson': {value: 'sp_lesson', text: 'SPレッスン', parameter: 220, point: 28, hp: 0},
    'lesson': {value: 'lesson', text: 'レッスン', parameter: 150, point: 14, hp: 0},
    'class:110': {value: 'class:110', text: '授業 +110', parameter: 110, point: 0, hp: -8},
    'class:45': {value: 'class:45', text: '授業 +45', parameter: 45, point: 0, hp: -4},
    'rest': {value: 'rest', text: '休む', parameter: 0, point: 0, hp: 0},
  },
  16: {
    'gift': {value: 'gift', text: '活動支給', parameter: 0, point: 0, hp: 0},
    'outing': {value: 'outing', text: 'お出かけ', parameter: 0, point: 0, hp: 0},
    'consultation': {value: 'consultation', text: '相談', parameter: 0, point: 0, hp: 0},
    'rest': {value: 'rest', text: '休む', parameter: 0, point: 0, hp: 0},
  },
  17: {
    'push_lesson': {value: 'push_lesson', text: '追い込みレッスン', parameter: 165, point: 0, hp: 0},
  },
  17.5: {
    'push_bonus': {value: 'push_bonus', text: '追い込みボーナス', parameter: 145, point: 0, hp: 0},
  },
  18: {
    'exam_2': {value: 'exam_2', text: '最終試験', parameter: 30, point: 0, hp: 0},
  },
};

const abilityBasicParameterUpListAll = abilityBasicParameterUpList;
const abilityExtraParameterUpListAll = abilityExtraParameterUpList;

let inputData = ref(props.inputData);
let basicData = ref(props.basicData);

let scheduleDetailData = ref({});
let challengePItemMaxPushSum = ref(0);

const updateScheduleDetailData = () => {
}
const updateInputData = () => {
  emit('input-data-update', inputData.value);
}
const getBasicPItemDetail = (plan) => {
  return items.getHajimeMasterBasicItem(plan)
}
const getChallengePItemDetail = (categoryType, plan) => {
  return items.getChallengeItem(categoryType, plan)
}
const getPItemDetail = (id) => {
  return items.getItemFromId(id);
}
const updateChallengePItemMaxPushSum = () => {
  challengePItemMaxPushSum.value = 0;
  for (let i in inputData.value['planning']['challenge_p_item']) {
    if (inputData.value['planning']['challenge_p_item'][i] > 0) {
      challengePItemMaxPushSum.value += getPItemDetail(inputData.value['planning']['challenge_p_item'][i]).event_parameter;
    }
  }
}
const changeChallengePItem = () => {
  updateChallengePItemMaxPushSum();
  updateInputData();
}
onBeforeMount(() => {
  updateChallengePItemMaxPushSum();
})
watch(() => props.inputData, () => {
  inputData.value = props.inputData;
  updateChallengePItemMaxPushSum();
});
watch(() => props.basicData, () => {
  basicData.value = props.basicData;
});
</script>

<template>
  <div class="planning-area">
    <div class="content-area">
      <div class="schedule-area">
        <div class="common-headline">
          <span class="common-headline-text font-bold">スケジュール</span>
        </div>
        <div class="schedule">
          <table class="table schedule">
            <thead>
            <tr>
              <th class="table-header"></th>
              <th class="table-header detail"><span class="table-header-text">内容</span></th>
              <th class="table-header type"><span class="table-header-text">属性</span></th>
              <th class="table-header vocal"><span class="table-header-text">ボーカル</span></th>
              <th class="table-header dance"><span class="table-header-text">ダンス</span></th>
              <th class="table-header visual"><span class="table-header-text">ビジュアル</span></th>
              <th class="table-header point"><span class="table-header-text">合計値</span></th>
              <th class="table-header hp"><span class="table-header-text">体力</span></th>
              <th class="table-header point"><span class="table-header-text">Pポイント</span></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="i in [1,2,3,4,5,6,7,7.5,8,9,10,11,12,13,14,15,16,17,17.5,18]" :key="i">
              <th class="table-header">
                <span class="table-header-text" v-if="Number.isInteger(i)">{{ i }}</span>
              </th>
              <td class="table-data detail">
                <select class="table-select" v-model="inputData['planning']['schedule'][i]['schedule_detail']" v-if="Object.keys(scheduleData[i]).length > 1" @change="updateInputData">
                  <option class="table-option" v-for="option in scheduleData[i]" v-bind:value="option.value">{{ option.text }}</option>
                </select>
                <span class="table-data-text" v-else>{{ scheduleData[i][Object.entries(scheduleData[i])[0][0]]['text'] }}</span>
              </td>
              <td class="table-data type">
                <select class="table-select" v-model="inputData['planning']['schedule'][i]['type']" v-if="inputData['planning']['schedule'][i]['schedule_detail'].includes('lesson') || inputData['planning']['schedule'][i]['schedule_detail'].includes('class')" @change="updateInputData">
                  <option class="table-option vocal" value="vocal">ボーカル</option>
                  <option class="table-option dance" value="dance">ダンス</option>
                  <option class="table-option visual" value="visual">ビジュアル</option>
                </select>
              </td>
              <td class="table-data number vocal"><span class="table-data-text">0</span></td>
              <td class="table-data number dance"><span class="table-data-text">0</span></td>
              <td class="table-data number visual"><span class="table-data-text">0</span></td>
              <td class="table-data number point"><span class="table-data-text">0</span></td>
              <td class="table-data number hp"><span class="table-data-text">0</span></td>
              <td class="table-data number point"><span class="table-data-text">0</span></td>
            </tr>
            <tr>
              <th class="table-header"></th>
              <td class="table-data detail"><span class="table-data-text">その他上昇値</span></td>
              <td class="table-data type"></td>
              <td class="table-data number vocal"><span class="table-data-text">0</span></td>
              <td class="table-data number dance"><span class="table-data-text">0</span></td>
              <td class="table-data number visual"><span class="table-data-text">0</span></td>
              <td class="table-data number point"><span class="table-data-text">0</span></td>
              <td class="table-data number hp"><span class="table-data-text">0</span></td>
              <td class="table-data number point"><span class="table-data-text">0</span></td>
            </tr>
            <tr>
              <th class="table-header last"></th>
              <td class="table-data detail last"><span class="table-data-text font-bold last">最終評価</span></td>
              <td class="table-data type last"></td>
              <td class="table-data number vocal last"><span class="table-data-text font-bold vocal">0</span></td>
              <td class="table-data number dance last"><span class="table-data-text font-bold dance">0</span></td>
              <td class="table-data number visual last"><span class="table-data-text font-bold visual">0</span></td>
              <td class="table-data number point last"><span class="table-data-text font-bold last">0</span></td>
              <td class="table-data number hp last"><span class="table-data-text font-bold last">0</span></td>
              <td class="table-data number point last"><span class="table-data-text font-bold last">0</span></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="event-area">
        <div class="challenge-p-item-area">
          <div class="common-headline">
            <span class="common-headline-text font-bold">チャレンジPアイテム</span>
          </div>
          <div class="challenge-p-item">
            <table class="table challenge-p-item">
              <thead>
              <tr>
                <th class="table-header detail"><span class="table-header-text">内容</span></th>
                <th class="table-header count"><span class="table-header-text">上昇値</span></th>
                <th class="table-header count"><span class="table-header-text">合計値</span></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="i in 3" :key="i">
                <td class="table-data detail">
                  <select class="table-select" v-model="inputData['planning']['challenge_p_item'][i]" @change="changeChallengePItem">
                    <option class="table-option" value="0">チャレンジPアイテムなし</option>
                    <option class="table-option" v-bind:value="option.id" v-if="inputData['organization']['produce_idol']['id']" v-for="option in getChallengePItemDetail(`challenge_${i}`, ['free', basicData['produce_idol']['plan']])">{{ option.name }}</option>
                  </select>
                </td>
                <td class="table-data number count">
                  <span class="table-data-text" v-if="inputData['planning']['challenge_p_item'][i] > 0">{{ getPItemDetail(inputData['planning']['challenge_p_item'][i]).event_parameter }}</span>
                  <span class="table-data-text" v-else>0</span>
                </td>
                <td class="table-data number count" rowspan="3" v-if="i === 1">
                  <span class="table-data-text">{{ challengePItemMaxPushSum }}</span>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="produce-p-item-area">
          <div class="common-headline">
            <span class="common-headline-text font-bold">Pアイテム</span>
          </div>
          <div class="produce-p-item">
            <table class="table produce-p-item">
              <thead>
              <tr>
                <th class="table-header detail"><span class="table-header-text">内容</span></th>
                <th class="table-header count"><span class="table-header-text">上昇値</span></th>
                <th class="table-header count"><span class="table-header-text">回数</span></th>
                <th class="table-header count"><span class="table-header-text">合計値</span></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="i in 6" :key="i">
                <td class="table-data" v-bind:class="inputData['organization']['support_card'][i - 1]['id'] ? basicData['support_card'][i - 1]['type'] : 'detail'">
                  <span class="table-data-text" v-if="inputData['organization']['support_card'][i - 1]['id'] && basicData['support_card'][i - 1]['event_1'] === 'get_unique_p_item'">{{ getPItemDetail(basicData['support_card'][i - 1]['p_item_id']).name }}</span>
                  <span class="table-data-text" v-else>獲得Pアイテムなし</span>
                </td>
                <td class="table-data number" v-bind:class="inputData['organization']['support_card'][i - 1]['id'] ? basicData['support_card'][i - 1]['type'] : 'count'">
                  <span class="table-data-text" v-if="inputData['organization']['support_card'][i - 1]['id'] && basicData['support_card'][i - 1]['event_1'] === 'get_unique_p_item' && getPItemDetail(basicData['support_card'][i - 1]['p_item_id']).category_type === 'produce'">{{ getPItemDetail(basicData['support_card'][i - 1]['p_item_id']).event_parameter }}</span>
                  <span class="table-data-text" v-else></span>
                </td>
                <td class="table-data number" v-bind:class="inputData['organization']['support_card'][i - 1]['id'] ? basicData['support_card'][i - 1]['type'] : 'count'">
                  <span class="table-data-text font-bold" v-if="inputData['organization']['support_card'][i - 1]['id'] && basicData['support_card'][i - 1]['event_1'] === 'get_unique_p_item' && getPItemDetail(basicData['support_card'][i - 1]['p_item_id']).category_type === 'produce'">{{ inputData['planning']['support_card_p_item'][i] }}</span>
                  <span class="table-data-text" v-else></span>
                </td>
                <td class="table-data number" v-bind:class="inputData['organization']['support_card'][i - 1]['id'] ? basicData['support_card'][i - 1]['type'] : 'count'">
                  <span class="table-data-text">0</span>
                </td>
              </tr>
              <tr>
                <td class="table-data detail">
                  <select class="table-select" v-model="inputData['planning']['produce_p_item'][1]" @change="updateInputData">
                    <option class="table-option" value="0">はつぼしブレスレット</option>
                    <option class="table-option" v-bind:value="option.id" v-if="inputData['organization']['produce_idol']['id']" v-for="option in getBasicPItemDetail([basicData['produce_idol']['plan']])">{{ option.name }}</option>
                  </select>
                </td>
                <td class="table-data number count">
                  <span class="table-data-text"></span>
                </td>
                <td class="table-data number count">
                  <span class="table-data-text"></span>
                </td>
                <td class="table-data number count">
                  <span class="table-data-text"></span>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="support-card-event-area">
          <div class="common-headline">
            <span class="common-headline-text font-bold">サポートカードイベント</span>
          </div>
          <div class="support-card-event">
            <table class="table support-card-event">
              <thead>
              <tr>
                <th class="table-header detail"><span class="table-header-text">内容</span></th>
                <th class="table-header count"><span class="table-header-text">上昇値</span></th>
                <th class="table-header count"><span class="table-header-text">発生</span></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="i in 6" :key="i">
                <td class="table-data" v-bind:class="inputData['organization']['support_card'][i - 1]['id'] ? basicData['support_card'][i - 1]['type'] : 'detail'">
                  <span class="table-data-text" v-if="inputData['organization']['support_card'][i - 1]['id']">{{ basicData['support_card'][i - 1]['name'] }}</span>
                  <span class="table-data-text" v-else>サポートカード未選択</span>
                </td>
                <td class="table-data number" v-bind:class="inputData['organization']['support_card'][i - 1]['id'] ? basicData['support_card'][i - 1]['type'] : 'count'">
                  <span class="table-data-text" v-if="inputData['organization']['support_card'][i - 1]['id']">{{ basicData['support_card'][i - 1]['event_2_parameter'] }}</span>
                  <span class="table-data-text" v-else>0</span>
                </td>
                <td class="table-data checkbox" v-bind:class="inputData['organization']['support_card'][i - 1]['id'] ? basicData['support_card'][i - 1]['type'] : 'count'">
                  <input class="table-input-checkbox" type="checkbox" v-bind:value="true" v-model="inputData['planning']['support_card_event'][i]" @change="updateInputData">
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="support-card-ability-area">
        <div class="common-headline">
          <span class="common-headline-text font-bold">サポートカードアビリティ</span>
        </div>
        <div class="support-card-ability">
          <table class="table support-card-ability">
            <thead>
            <tr>
              <th class="table-header detail"><span class="table-header-text">内容</span></th>
              <th class="table-header vocal"><span class="table-header-text">ボーカル</span></th>
              <th class="table-header dance"><span class="table-header-text">ダンス</span></th>
              <th class="table-header visual"><span class="table-header-text">ビジュアル</span></th>
              <th class="table-header count"><span class="table-header-text">回数</span></th>
              <th class="table-header count"><span class="table-header-text">合計値</span></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="list in abilityBasicParameterUpListAll" :key="list">
              <td class="table-data detail">
                <span class="table-data-text">{{ list.text }}</span>
              </td>
              <td class="table-data number vocal">
                <span class="table-data-text" v-if="basicData['ability_list'][list.ability]">{{ basicData['ability_list'][list.ability]['vocal'] }}</span>
                <span class="table-data-text" v-else>0</span>
              </td>
              <td class="table-data number dance">
                <span class="table-data-text" v-if="basicData['ability_list'][list.ability]">{{ basicData['ability_list'][list.ability]['dance'] }}</span>
                <span class="table-data-text" v-else>0</span>
              </td>
              <td class="table-data number visual">
                <span class="table-data-text" v-if="basicData['ability_list'][list.ability]">{{ basicData['ability_list'][list.ability]['visual'] }}</span>
                <span class="table-data-text" v-else>0</span>
              </td>
              <td class="table-data number count">
                <span class="table-data-text" v-if="!list.text.includes('レッスン')">0</span>
              </td>
              <td class="table-data number count">
                <span class="table-data-text" v-if="!list.text.includes('レッスン')">0</span>
              </td>
            </tr>
            <tr v-for="list in abilityExtraParameterUpListAll" :key="list" v-show="Object.keys(basicData['ability_list']).includes(list.ability)">
              <td class="table-data detail">
                <span class="table-data-text">{{ list.text }}</span>
              </td>
              <td class="table-data number vocal">
                <span class="table-data-text" v-if="basicData['ability_list'][list.ability]">{{ basicData['ability_list'][list.ability]['vocal'] }}</span>
                <span class="table-data-text" v-else>0</span>
              </td>
              <td class="table-data number dance">
                <span class="table-data-text" v-if="basicData['ability_list'][list.ability]">{{ basicData['ability_list'][list.ability]['dance'] }}</span>
                <span class="table-data-text" v-else>0</span>
              </td>
              <td class="table-data number visual">
                <span class="table-data-text" v-if="basicData['ability_list'][list.ability]">{{ basicData['ability_list'][list.ability]['visual'] }}</span>
                <span class="table-data-text" v-else>0</span>
              </td>
              <td class="table-data number count">
                <span class="table-data-text font-bold">0</span>
              </td>
              <td class="table-data number count">
                <span class="table-data-text">0</span>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

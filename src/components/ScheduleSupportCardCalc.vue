<script setup>
import {ref, watch} from "vue";
import Items from "@/classes/items";
import {abilities, events, types} from "@/consts/supportCardConst";

const props = defineProps(['inputData', 'basicData', 'scheduleData', 'scheduleDetailCount', 'supportCards']);
const supportCards = props.supportCards;
const items = new Items();

let inputData = props.inputData;
let basicData = props.basicData;
let scheduleData = props.scheduleData;
let scheduleDetailCount = props.scheduleDetailCount;

let setting = ref([
  'init-parameter', 'parameter-bonus', 'item', 'event', 'max-level', 'save-level'
]);
let resultVocalList = ref([]);
let resultDanceList = ref([]);
let resultVisualList = ref([]);

const getBonusParameter = (parameter, parameterBonus) => {
  return Math.floor(parameter * (parameterBonus / 10).toFixed(1) / 100);
};
const calc = (cardList, saveFlag = false) => {
  // チャレンジPアイテム計算
  let addBaseParameter = 0;
  if (inputData['produce_type'] === 'hajime_master') {
    for (let i in inputData['planning']['challenge_p_item']) {
      if (inputData['planning']['challenge_p_item'][i] > 0) {
        addBaseParameter += items.getItemFromId(inputData['planning']['challenge_p_item'][i])['event_other'];
      }
    }
  }

  for (let id in cardList) {
    if (cardList[id]['type'] === types.ASSIST) {
      continue;
    }
    let parameter = 0;

    // サポートカードアビリティ計算
    let abilityList = ['ability_1', 'ability_2', 'ability_3', 'ability_4', 'ability_5', 'ability_6'];
    for (let abilityIndex in abilityList) {
      let abilityName = cardList[id][abilityList[abilityIndex]];
      if (abilityName === abilities.INIT_PARAMETER_UP && setting.value.includes('init-parameter')) {
        parameter += cardList[id][`${abilityList[abilityIndex]}_parameter`];
      } else if (abilityName === abilities.PARAMETER_BONUS && setting.value.includes('parameter-bonus')) {
        let addParameter = 0;

        // 基礎パラメータボーナス計算
        let bonus = basicData['produce_idol'][`bonus_${cardList[id]['type']}`] * 10;
        for (let memoryIndex in inputData['organization']['produce_memory']) {
          for (let abilityIndex in inputData['organization']['produce_memory'][memoryIndex]) {
            if (inputData['organization']['produce_memory'][memoryIndex][abilityIndex]['ability_type'] === cardList[id]['type'] &&
                inputData['organization']['produce_memory'][memoryIndex][abilityIndex]['ability_value'] < 10
            ) {
              bonus += (inputData['organization']['produce_memory'][memoryIndex][abilityIndex]['ability_value'] * 10);
            }
          }
        }

        // 上昇値計算
        for (let week in inputData['planning']['schedule']) {
          let schedule = inputData['planning']['schedule'][week];
          // レッスン・SPレッスン
          if ((schedule['schedule_detail'] === 'lesson' || schedule['schedule_detail'] === 'sp_lesson') && schedule['type'] === cardList[id]['type']) {
            let baseParameter = scheduleData[week][schedule['schedule_detail']]['parameter'] + addBaseParameter;
            addParameter += (getBonusParameter(baseParameter, bonus + cardList[id][`${abilityList[abilityIndex]}_parameter`] * 10) - getBonusParameter(baseParameter, bonus));
          }
          // 追い込みレッスン
          if (schedule['schedule_detail'] === 'push_lesson') {
            let baseParameter = scheduleData[week][schedule['schedule_detail']]['bonus_parameter'];
            if (schedule['type'] === cardList[id]['type']) {
              baseParameter += scheduleData[week][schedule['schedule_detail']]['parameter'];
            }
            addParameter += (getBonusParameter(baseParameter, bonus + cardList[id][`${abilityList[abilityIndex]}_parameter`] * 10) - getBonusParameter(baseParameter, bonus));
          }
          // オーディション
          if (schedule['schedule_detail'].includes('exam') && inputData['produce_type'] === 'nia_master') {
            let examIndex = schedule['schedule_detail'].substr(schedule['schedule_detail'].indexOf('_') + 1);
            let baseParameter = inputData['planning']['audition'][examIndex][`type_${basicData['produce_idol'][`${cardList[id]['type']}_priority`]}`];
            addParameter += (getBonusParameter(baseParameter, bonus + cardList[id][`${abilityList[abilityIndex]}_parameter`] * 10) - getBonusParameter(baseParameter, bonus));
          }
        }
        parameter += addParameter;
      } else if (abilityName === abilities.LESSON_PARAMETER_UP) {
        parameter += (cardList[id][`${abilityList[abilityIndex]}_parameter`] * scheduleDetailCount['lesson'][cardList[id]['type']]);
      } else if (abilityName === abilities.NORMAL_LESSON_PARAMETER_UP) {
        parameter += (cardList[id][`${abilityList[abilityIndex]}_parameter`] * scheduleDetailCount['normal_lesson'][cardList[id]['type']]);
      } else if (abilityName === abilities.SP_LESSON_PARAMETER_UP) {
        parameter += (cardList[id][`${abilityList[abilityIndex]}_parameter`] * scheduleDetailCount['sp_lesson'][cardList[id]['type']]);
      } else if (abilityName === abilities.CLASS_PARAMETER_UP) {
        parameter += (cardList[id][`${abilityList[abilityIndex]}_parameter`] * scheduleDetailCount['class']);
      } else if (abilityName === abilities.GIFT_PARAMETER_UP) {
        parameter += (cardList[id][`${abilityList[abilityIndex]}_parameter`] * scheduleDetailCount['gift']);
      } else if (abilityName === abilities.OUTING_PARAMETER_UP) {
        parameter += (cardList[id][`${abilityList[abilityIndex]}_parameter`] * scheduleDetailCount['outing']);
      } else if (abilityName === abilities.CONSULTATION_PARAMETER_UP) {
        parameter += (cardList[id][`${abilityList[abilityIndex]}_parameter`] * scheduleDetailCount['consultation']);
      } else if (abilityName === abilities.REST_PARAMETER_UP) {
        parameter += (cardList[id][`${abilityList[abilityIndex]}_parameter`] * scheduleDetailCount['rest']);
      } else if (abilityName === abilities.EXAM_PARAMETER_UP) {
        parameter += (cardList[id][`${abilityList[abilityIndex]}_parameter`] * scheduleDetailCount['exam_1']);
      } else if (inputData['planning']['support_card_ability'][abilityName]) {
        parameter += (cardList[id][`${abilityList[abilityIndex]}_parameter`] * inputData['planning']['support_card_ability'][abilityName]);
      }
    }

    // サポートカード固有Pアイテム計算
    if (cardList[id]['event_1'] === events.GET_UNIQUE_P_ITEM && setting.value.includes('item')) {
      let pItem = items.getItemFromId(cardList[id]['p_item_id']);
      if (pItem['category_type'] === 'produce' && pItem['event'] !== null) {
        if (pItem['event'].includes('lesson')) {
          parameter += (pItem['event_parameter'] * Math.min(pItem['event_count'], scheduleDetailCount[pItem['event']][pItem['type']]));
        } else if (scheduleDetailCount[pItem['event']]) {
          parameter += (pItem['event_parameter'] * Math.min(pItem['event_count'], scheduleDetailCount[pItem['event']]));
        } else if (inputData['planning']['support_card_ability'][pItem['event']]) {
          parameter += (pItem['event_parameter'] * Math.min(pItem['event_count'], inputData['planning']['support_card_ability'][pItem['event']]));
        }
      }
    }

    // サポートカードイベント計算
    if (cardList[id]['event_2'] === events.PARAMETER_UP && setting.value.includes('event')) {
      parameter += cardList[id]['event_2_parameter'];
    }

    let insertData = {
      id: cardList[id]['id'],
      name: cardList[id]['name'],
      level: cardList[id]['level'],
      parameter: parameter,
      save: saveFlag,
    };

    if (cardList[id]['type'] === types.VOCAL) {
      resultVocalList.value.push(insertData);
    }
    if (cardList[id]['type'] === types.DANCE) {
      resultDanceList.value.push(insertData);
    }
    if (cardList[id]['type'] === types.VISUAL) {
      resultVisualList.value.push(insertData);
    }
  }
}
const buttonCalc = () => {
  resultVocalList.value = [];
  resultDanceList.value = [];
  resultVisualList.value = [];
  if (setting.value.includes('max-level')) {
    let cardList = supportCards.getCardFromFilterPlan(['free', basicData['produce_idol']['plan']]);
    calc(cardList, false);
  }
  if (setting.value.includes('save-level')) {
    let saveList = supportCards.getSaveCardFromFilterPlan(['free', basicData['produce_idol']['plan']]);
    calc(saveList, true);
  }
  resultVocalList.value.sort((a, b) => {
    return b.parameter - a.parameter
  });
  resultDanceList.value.sort((a, b) => {
    return b.parameter - a.parameter
  });
  resultVisualList.value.sort((a, b) => {
    return b.parameter - a.parameter
  });
}
watch(() => props.inputData, () => {
  inputData = props.inputData;
});
watch(() => props.basicData, () => {
  basicData = props.basicData;
});
watch(() => props.scheduleData, () => {
  scheduleData = props.scheduleData;
});
watch(() => props.scheduleDetailCount, () => {
  scheduleDetailCount = props.scheduleDetailCount;
});
</script>

<template>
  <div class="support-card-calc-area">
    <div class="common-headline">
      <span class="common-headline-text font-bold">サポートカードの獲得パラメータを計算</span>
    </div>
    <div class="description-area">
      <span class="description">入力したスケジュールからサポートカードの獲得パラメータランキングを計算します。</span>
    </div>
    <div class="support-card-calc">
      <div class="calc-setting-area">
        <span class="calc-setting-text font-bold">設定</span>
        <div class="calc-setting-checkbox-area">
          <div class="calc-setting-checkbox">
            <input class="common-checkbox" type="checkbox" id="init-parameter" value="init-parameter" v-model="setting">
            <label for="init-parameter">初期パラメータ上昇を考慮する</label>
          </div>
          <div class="calc-setting-checkbox">
            <input class="common-checkbox" type="checkbox" id="parameter-bonus" value="parameter-bonus" v-model="setting">
            <label for="parameter-bonus">パラメータボーナスを考慮する</label>
          </div>
          <div class="calc-setting-checkbox">
            <input class="common-checkbox" type="checkbox" id="item" value="item" v-model="setting">
            <label for="item">サポートカード固有Pアイテムでのパラメータ上昇を考慮する</label>
          </div>
          <div class="calc-setting-checkbox">
            <input class="common-checkbox" type="checkbox" id="event" value="event" v-model="setting">
            <label for="event">サポートカードイベントでのパラメータ上昇を考慮する</label>
          </div>
          <div class="calc-setting-checkbox">
            <input class="common-checkbox" type="checkbox" id="save-level" value="save-level" v-model="setting">
            <label for="save-level">保存したサポートカードの計算を含める</label>
          </div>
          <div class="calc-setting-checkbox">
            <input class="common-checkbox" type="checkbox" id="max-level" value="max-level" v-model="setting">
            <label for="max-level">保存していないサポートカードの計算を含める</label>
          </div>
        </div>
      </div>
      <div class="calc-setting-button-area">
        <div class="calc-setting-button">
          <button class="common-button calc" @click="buttonCalc">
            <span class="common-button-name">計算</span>
          </button>
        </div>
      </div>
      <div class="calc-result-area">
        <div class="calc-area vocal">
          <table class="table calc-vocal">
            <thead>
            <tr>
              <th class="table-header vocal"><span class="table-header-text">サポートカード名</span></th>
              <th class="table-header vocal"><span class="table-header-text">レベル</span></th>
              <th class="table-header vocal"><span class="table-header-text">パラメータ</span></th>
            </tr>
            </thead>
            <tbody>
            <tr v-if="resultVocalList.length === 0">
              <td class="table-data vocal"><span class="table-data-text">サポートカード名</span></td>
              <td class="table-data number vocal"><span class="table-data-text">0</span></td>
              <td class="table-data number vocal"><span class="table-data-text">0</span></td>
            </tr>
            <tr v-for="list in resultVocalList" :key="list">
              <td class="table-data vocal"><span class="table-data-text">{{ list.name }}</span></td>
              <td class="table-data number vocal"><span class="table-data-text">{{ list.level }}</span></td>
              <td class="table-data number vocal"><span class="table-data-text">{{ list.parameter }}</span></td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="calc-area dance">
          <table class="table calc-dance">
            <thead>
            <tr>
              <th class="table-header dance"><span class="table-header-text">サポートカード名</span></th>
              <th class="table-header dance"><span class="table-header-text">レベル</span></th>
              <th class="table-header dance"><span class="table-header-text">パラメータ</span></th>
            </tr>
            </thead>
            <tbody>
            <tr v-if="resultDanceList.length === 0">
              <td class="table-data dance"><span class="table-data-text">サポートカード名</span></td>
              <td class="table-data number dance"><span class="table-data-text">0</span></td>
              <td class="table-data number dance"><span class="table-data-text">0</span></td>
            </tr>
            <tr v-for="list in resultDanceList" :key="list">
              <td class="table-data dance"><span class="table-data-text">{{ list.name }}</span></td>
              <td class="table-data number dance"><span class="table-data-text">{{ list.level }}</span></td>
              <td class="table-data number dance"><span class="table-data-text">{{ list.parameter }}</span></td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="calc-area visual">
          <table class="table calc-visual">
            <thead>
            <tr>
              <th class="table-header visual"><span class="table-header-text">サポートカード名</span></th>
              <th class="table-header visual"><span class="table-header-text">レベル</span></th>
              <th class="table-header visual"><span class="table-header-text">パラメータ</span></th>
            </tr>
            </thead>
            <tbody>
            <tr v-if="resultVisualList.length === 0">
              <td class="table-data visual"><span class="table-data-text">サポートカード名</span></td>
              <td class="table-data number visual"><span class="table-data-text">0</span></td>
              <td class="table-data number visual"><span class="table-data-text">0</span></td>
            </tr>
            <tr v-for="list in resultVisualList" :key="list">
              <td class="table-data visual"><span class="table-data-text">{{ list.name }}</span></td>
              <td class="table-data number visual"><span class="table-data-text">{{ list.level }}</span></td>
              <td class="table-data number visual"><span class="table-data-text">{{ list.parameter }}</span></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {ref, watch} from "vue";
import ScheduleOrganization from "@/components/ScheduleOrganization.vue";
import SchedulePlanningHajimeMaster from "@/components/SchedulePlanningHajimeMaster.vue";
import SchedulePlanningNextIdolAudition from "@/components/SchedulePlanningNextIdolAudition.vue";
import {abilities, types} from "@/consts/supportCardConst";

const props = defineProps(['schedules', 'scheduleData', 'idols', 'supportCards']);
const emit = defineEmits(['undo-redo-disabled']);
const id = props.scheduleData.id;
const idols = props.idols;
const supportCards = props.supportCards;

const produceTypeDisplayList = {
  hajime_master: '『初』マスター',
  nia: 'NIA',
}
const produceTypeComponentList = {
  hajime_master: {
    organization: ScheduleOrganization,
    planning: SchedulePlanningHajimeMaster
  },
  nia: {
    organization: ScheduleOrganization,
    planning: SchedulePlanningNextIdolAudition
  }
}

let saveId = props.scheduleData.save_id;
let name = props.scheduleData.name;
let data = props.scheduleData.data;
let produceType = data.produce_type;

let inputData = ref(data);
let calcData = ref({
  organization: {
    produce_idol: [],
    support_card: [],
    parameter: {
      init_vocal: 0,
      init_dance: 0,
      init_visual: 0,
      init_hp: 0,
      init_point: 0,
      bonus_vocal: 0,
      bonus_dance: 0,
      bonus_visual: 0,
      sp_lesson_rate_vocal: 0,
      sp_lesson_rate_dance: 0,
      sp_lesson_rate_visual: 0,
    },
  },
  planning: {},
});

let undoList = ref([JSON.stringify(data)]);
let redoList = ref([]);

const updateInputData = (data) => {
  inputData.value = data;
  updateCalcData();
  updateHistory();
}
const updateCalcData = () => {
  // プロデュースアイドル詳細更新
  if (inputData.value['organization']['produce_idol']['id'] !== null &&
      inputData.value['organization']['produce_idol']['training_level'] !== null &&
      inputData.value['organization']['produce_idol']['blossoming_level'] !== null &&
      inputData.value['organization']['produce_idol']['dear_level'] !== null
  ) {
    calcData.value['organization']['produce_idol'] = idols.getPIdolDetail(
        inputData.value['organization']['produce_idol']['id'],
        inputData.value['organization']['produce_idol']['training_level'],
        inputData.value['organization']['produce_idol']['blossoming_level'],
        inputData.value['organization']['produce_idol']['dear_level']
    );
  } else {
    calcData.value['organization']['produce_idol'] = null;
  }

  // サポートカード詳細更新
  for (let i in inputData.value['organization']['support_card']) {
    if (inputData.value['organization']['support_card'][i]['id'] !== null) {
      calcData.value['organization']['support_card'][i] = supportCards.getCardDetail(inputData.value['organization']['support_card'][i]['id'], inputData.value['organization']['support_card'][i]['level'])
    } else {
      calcData.value['organization']['support_card'][i] = null;
    }
  }

  // パラメータ更新
  if (calcData.value['organization']['produce_idol'] !== null) {
    calcData.value['organization']['parameter'] = {
      init_vocal: calcData.value['organization']['produce_idol']['init_vocal'],
      init_dance: calcData.value['organization']['produce_idol']['init_dance'],
      init_visual: calcData.value['organization']['produce_idol']['init_visual'],
      init_hp: calcData.value['organization']['produce_idol']['init_hp'],
      init_point: 0,
      bonus_vocal: calcData.value['organization']['produce_idol']['bonus_vocal'] * 10,
      bonus_dance: calcData.value['organization']['produce_idol']['bonus_dance'] * 10,
      bonus_visual: calcData.value['organization']['produce_idol']['bonus_visual'] * 10,
      sp_lesson_rate_vocal: calcData.value['organization']['produce_idol']['sp_lesson_rate_vocal'] * 10 + 100,
      sp_lesson_rate_dance: calcData.value['organization']['produce_idol']['sp_lesson_rate_dance'] * 10 + 100,
      sp_lesson_rate_visual: calcData.value['organization']['produce_idol']['sp_lesson_rate_visual'] * 10 + 100,
    };

    for (let i in calcData.value['organization']['support_card']) {
      if (calcData.value['organization']['support_card'][i] !== null) {
        let type = calcData.value['organization']['support_card'][i]['type'];
        let abilityList = ['ability_1', 'ability_2', 'ability_3', 'ability_4', 'ability_5', 'ability_6'];
        for (let abilityIndex in abilityList) {
          if (calcData.value['organization']['support_card'][i][abilityList[abilityIndex]] === abilities.INIT_PARAMETER_UP) {
            calcData.value['organization']['parameter'][`init_${type}`] += calcData.value['organization']['support_card'][i][`${abilityList[abilityIndex]}_parameter`];
          }
          if (calcData.value['organization']['support_card'][i][abilityList[abilityIndex]] === abilities.PARAMETER_BONUS) {
            calcData.value['organization']['parameter'][`bonus_${type}`] += calcData.value['organization']['support_card'][i][`${abilityList[abilityIndex]}_parameter`] * 10;
          }
          if (calcData.value['organization']['support_card'][i][abilityList[abilityIndex]] === abilities.MAX_HP_UP) {
            calcData.value['organization']['parameter']['init_hp'] += calcData.value['organization']['support_card'][i][`${abilityList[abilityIndex]}_parameter`];
          }
          if (calcData.value['organization']['support_card'][i][abilityList[abilityIndex]] === abilities.INIT_P_POINT) {
            calcData.value['organization']['parameter']['init_point'] += calcData.value['organization']['support_card'][i][`${abilityList[abilityIndex]}_parameter`];
          }
          if (calcData.value['organization']['support_card'][i][abilityList[abilityIndex]] === abilities.SP_LESSON_RATE) {
            if (type === types.ASSIST) {
              calcData.value['organization']['parameter']['sp_lesson_rate_vocal'] += calcData.value['organization']['support_card'][i][`${abilityList[abilityIndex]}_parameter`] * 10;
              calcData.value['organization']['parameter']['sp_lesson_rate_dance'] += calcData.value['organization']['support_card'][i][`${abilityList[abilityIndex]}_parameter`] * 10;
              calcData.value['organization']['parameter']['sp_lesson_rate_visual'] += calcData.value['organization']['support_card'][i][`${abilityList[abilityIndex]}_parameter`] * 10;
            } else {
              calcData.value['organization']['parameter'][`sp_lesson_rate_${type}`] += calcData.value['organization']['support_card'][i][`${abilityList[abilityIndex]}_parameter`] * 10;
            }
          }
        }
      }
    }

    for (let i in inputData.value['organization']['produce_memory']) {
      for (let j in inputData.value['organization']['produce_memory'][i]) {
        let type = inputData.value['organization']['produce_memory'][i][j]['ability_type'];
        switch (type) {
          case 'vocal':
          case 'dance':
          case 'visual':
            if (inputData.value['organization']['produce_memory'][i][j]['ability_value'] >= 10) {
              calcData.value['organization']['parameter'][`init_${type}`] += inputData.value['organization']['produce_memory'][i][j]['ability_value'];
            } else {
              calcData.value['organization']['parameter'][`bonus_${type}`] += inputData.value['organization']['produce_memory'][i][j]['ability_value'] * 10;
            }
            break;
          case 'point':
            calcData.value['organization']['parameter']['init_point'] += inputData.value['organization']['produce_memory'][i][j]['ability_value'];
            break;
          case 'hp-recover':
          default:
            break;
        }
      }
    }
  }
}
const updateHistory = () => {
  undoList.value.unshift(JSON.stringify(inputData.value));
  redoList.value = [];
  emit('undo-redo-disabled', id, (undoList.value.length <= 1), (redoList.value.length <= 0));
}
const buttonUndo = () => {
  if (undoList.value.length <= 1) {
    console.log('Undo is disabled.');
  } else {
    let shifted = undoList.value.shift();
    redoList.value.unshift(shifted);
    inputData.value = JSON.parse(undoList.value[0]);
    updateCalcData();
  }
  emit('undo-redo-disabled', id, (undoList.value.length <= 1), (redoList.value.length <= 0));
}
const buttonRedo = () => {
  if (redoList.value.length <= 0) {
    console.log('Redo is disabled.');
  } else {
    let shifted = redoList.value.shift();
    undoList.value.unshift(shifted);
    inputData.value = JSON.parse(shifted);
    updateCalcData();
  }
  emit('undo-redo-disabled', id, (undoList.value.length <= 1), (redoList.value.length <= 0));
}
defineExpose({buttonUndo, buttonRedo});
</script>

<template>
  <div class="headline-area">
    <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="36px" fill="#333333">
      <path d="M560-564v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-600q-38 0-73 9.5T560-564Zm0 220v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-380q-38 0-73 9t-67 27Zm0-110v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-490q-38 0-73 9.5T560-454ZM260-320q47 0 91.5 10.5T440-278v-394q-41-24-87-36t-93-12q-36 0-71.5 7T120-692v396q35-12 69.5-18t70.5-6Zm260 42q44-21 88.5-31.5T700-320q36 0 70.5 6t69.5 18v-396q-33-14-68.5-21t-71.5-7q-47 0-93 12t-87 36v394Zm-40 118q-48-38-104-59t-116-21q-42 0-82.5 11T100-198q-21 11-40.5-1T40-234v-482q0-11 5.5-21T62-752q46-24 96-36t102-12q58 0 113.5 15T480-740q51-30 106.5-45T700-800q52 0 102 12t96 36q11 5 16.5 15t5.5 21v482q0 23-19.5 35t-40.5 1q-37-20-77.5-31T700-240q-60 0-116 21t-104 59ZM280-494Z"/>
    </svg>
    <span class="headline-text">{{ produceTypeDisplayList[produceType] }}</span>
  </div>
  <div class="schedule-view-area">
    <component
        :is="produceTypeComponentList[produceType]['organization']"
        :input-data="inputData"
        :calc-data="calcData"
        :idols="idols"
        :support-cards="supportCards"
        @input-data-update="updateInputData"
    />
    <component
        :is="produceTypeComponentList[produceType]['planning']"
        :input-data="inputData"
        @input-data-update="updateInputData"
    />
  </div>
</template>

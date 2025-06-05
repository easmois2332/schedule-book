<script setup>
import {onBeforeMount, ref} from "vue";
import ScheduleOrganization from "@/components/ScheduleOrganization.vue";
import SchedulePlanningHajimeMaster from "@/components/SchedulePlanningHajimeMaster.vue";
import SchedulePlanningNextIdolAuditionMaster from "@/components/SchedulePlanningNextIdolAuditionMaster.vue";
import {abilities, types} from "@/consts/supportCardConst";

const props = defineProps(['schedules', 'scheduleData', 'idols', 'supportCards']);
const emit = defineEmits(['undo-redo-disabled']);
const id = props.scheduleData.id;
const idols = props.idols;
const supportCards = props.supportCards;
const planningViewRef = ref();

const produceTypeDisplayList = {
  hajime_master: '定期公演『初』 マスター',
  nia_master: 'NEXT IDOL AUDITION マスター',
}
const produceTypeComponentList = {
  hajime_master: {
    organization: ScheduleOrganization,
    planning: SchedulePlanningHajimeMaster,
    minDearLevel: 10,
  },
  nia_master: {
    organization: ScheduleOrganization,
    planning: SchedulePlanningNextIdolAuditionMaster,
    minDearLevel: 20,
  }
}

let saveId = props.scheduleData.save_id;
let name = props.scheduleData.name;
let data = props.scheduleData.data;
let produceType = data.produce_type;

let inputData = ref(data);
let basicData = ref({
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
  ability_list: {},
});

let undoList = ref([JSON.stringify(data)]);
let redoList = ref([]);

const updateInputData = (data) => {
  inputData.value = data;
  updateBasicData();
  planningViewRef.value.updatePlanningData();
  updateHistory();
}
const updateBasicData = () => {
  // プロデュースアイドル詳細更新
  basicData.value['produce_idol'] = idols.getPIdolDetail(
      inputData.value['organization']['produce_idol']['id'],
      inputData.value['organization']['produce_idol']['training_level'],
      inputData.value['organization']['produce_idol']['blossoming_level'],
      inputData.value['organization']['produce_idol']['dear_level']
  );

  // サポートカード詳細更新
  for (let i in inputData.value['organization']['support_card']) {
    basicData.value['support_card'][i] = supportCards.getCardDetail(inputData.value['organization']['support_card'][i]['id'], inputData.value['organization']['support_card'][i]['level']);
  }

  // パラメータ更新
  if (basicData.value['produce_idol'] !== null) {
    basicData.value['parameter'] = {
      init_vocal: basicData.value['produce_idol']['init_vocal'],
      init_dance: basicData.value['produce_idol']['init_dance'],
      init_visual: basicData.value['produce_idol']['init_visual'],
      init_hp: basicData.value['produce_idol']['init_hp'],
      init_point: 0,
      bonus_vocal: basicData.value['produce_idol']['bonus_vocal'] * 10,
      bonus_dance: basicData.value['produce_idol']['bonus_dance'] * 10,
      bonus_visual: basicData.value['produce_idol']['bonus_visual'] * 10,
      sp_lesson_rate_vocal: basicData.value['produce_idol']['sp_lesson_rate_vocal'] * 10 + 100,
      sp_lesson_rate_dance: basicData.value['produce_idol']['sp_lesson_rate_dance'] * 10 + 100,
      sp_lesson_rate_visual: basicData.value['produce_idol']['sp_lesson_rate_visual'] * 10 + 100,
    };
    basicData.value['ability_list'] = {};

    for (let cardIndex in basicData.value['support_card']) {
      if (basicData.value['support_card'][cardIndex] !== null) {
        let type = basicData.value['support_card'][cardIndex]['type'];
        let abilityList = ['ability_1', 'ability_2', 'ability_3', 'ability_4', 'ability_5', 'ability_6'];
        for (let abilityIndex in abilityList) {
          let abilityName = basicData.value['support_card'][cardIndex][abilityList[abilityIndex]];
          switch (abilityName) {
            case abilities.INIT_PARAMETER_UP:
              basicData.value['parameter'][`init_${type}`] += basicData.value['support_card'][cardIndex][`${abilityList[abilityIndex]}_parameter`];
              break;
            case abilities.PARAMETER_BONUS:
              basicData.value['parameter'][`bonus_${type}`] += basicData.value['support_card'][cardIndex][`${abilityList[abilityIndex]}_parameter`] * 10;
              break;
            case abilities.MAX_HP_UP:
              basicData.value['parameter']['init_hp'] += basicData.value['support_card'][cardIndex][`${abilityList[abilityIndex]}_parameter`];
              break;
            case abilities.INIT_P_POINT:
              basicData.value['parameter']['init_point'] += basicData.value['support_card'][cardIndex][`${abilityList[abilityIndex]}_parameter`];
              break;
            case abilities.SP_LESSON_RATE:
              if (type === types.ASSIST) {
                basicData.value['parameter']['sp_lesson_rate_vocal'] += basicData.value['support_card'][cardIndex][`${abilityList[abilityIndex]}_parameter`] * 10;
                basicData.value['parameter']['sp_lesson_rate_dance'] += basicData.value['support_card'][cardIndex][`${abilityList[abilityIndex]}_parameter`] * 10;
                basicData.value['parameter']['sp_lesson_rate_visual'] += basicData.value['support_card'][cardIndex][`${abilityList[abilityIndex]}_parameter`] * 10;
              } else {
                basicData.value['parameter'][`sp_lesson_rate_${type}`] += basicData.value['support_card'][cardIndex][`${abilityList[abilityIndex]}_parameter`] * 10;
              }
              break;
            case abilities.LESSON_P_POINT_UP:
            case abilities.SP_LESSON_P_POINT_UP:
            case abilities.CONSULTATION_DRINK_SALE:
              if (!basicData.value['ability_list'][abilityName]) {
                basicData.value['ability_list'][abilityName] = {vocal: 0, dance: 0, visual: 0};
              }
              if (type === types.ASSIST) {
                basicData.value['ability_list'][abilityName]['vocal'] += basicData.value['support_card'][cardIndex][`${abilityList[abilityIndex]}_parameter`] * 10;
                basicData.value['ability_list'][abilityName]['dance'] += basicData.value['support_card'][cardIndex][`${abilityList[abilityIndex]}_parameter`] * 10;
                basicData.value['ability_list'][abilityName]['visual'] += basicData.value['support_card'][cardIndex][`${abilityList[abilityIndex]}_parameter`] * 10;
              } else {
                basicData.value['ability_list'][abilityName][type] += basicData.value['support_card'][cardIndex][`${abilityList[abilityIndex]}_parameter`] * 10;
              }
              break;
            default:
              if (!basicData.value['ability_list'][abilityName]) {
                basicData.value['ability_list'][abilityName] = {vocal: 0, dance: 0, visual: 0};
              }
              if (type === types.ASSIST || abilityName === abilities.GIFT_HP_RECOVER || abilityName === abilities.EXAM_HP_RECOVER) {
                basicData.value['ability_list'][abilityName]['vocal'] += basicData.value['support_card'][cardIndex][`${abilityList[abilityIndex]}_parameter`];
                basicData.value['ability_list'][abilityName]['dance'] += basicData.value['support_card'][cardIndex][`${abilityList[abilityIndex]}_parameter`];
                basicData.value['ability_list'][abilityName]['visual'] += basicData.value['support_card'][cardIndex][`${abilityList[abilityIndex]}_parameter`];
              } else {
                basicData.value['ability_list'][abilityName][type] += basicData.value['support_card'][cardIndex][`${abilityList[abilityIndex]}_parameter`];
              }
              break;
          }
        }
      }
    }

    for (let memoryIndex in inputData.value['organization']['produce_memory']) {
      for (let abilityIndex in inputData.value['organization']['produce_memory'][memoryIndex]) {
        let type = inputData.value['organization']['produce_memory'][memoryIndex][abilityIndex]['ability_type'];
        switch (type) {
          case 'vocal':
          case 'dance':
          case 'visual':
            if (inputData.value['organization']['produce_memory'][memoryIndex][abilityIndex]['ability_value'] >= 10) {
              basicData.value['parameter'][`init_${type}`] += inputData.value['organization']['produce_memory'][memoryIndex][abilityIndex]['ability_value'];
            } else {
              basicData.value['parameter'][`bonus_${type}`] += inputData.value['organization']['produce_memory'][memoryIndex][abilityIndex]['ability_value'] * 10;
            }
            break;
          case 'point':
            basicData.value['parameter']['init_point'] += inputData.value['organization']['produce_memory'][memoryIndex][abilityIndex]['ability_value'];
            break;
          case 'hp-recover':
          default:
            break;
        }
      }
    }
  } else {
    basicData.value['parameter'] = {
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
    };
    basicData.value['ability_list'] = {}
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
    updateBasicData();
    planningViewRef.value.updatePlanningData();
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
    updateBasicData();
    planningViewRef.value.updatePlanningData();
  }
  emit('undo-redo-disabled', id, (undoList.value.length <= 1), (redoList.value.length <= 0));
}

onBeforeMount(() => {
  updateBasicData();
})
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
        :basic-data="basicData"
        :idols="idols"
        :support-cards="supportCards"
        :min-dear-level="produceTypeComponentList[produceType]['minDearLevel']"
        @input-data-update="updateInputData"
    />
    <component
        :is="produceTypeComponentList[produceType]['planning']"
        :input-data="inputData"
        :basic-data="basicData"
        ref="planningViewRef"
        @input-data-update="updateInputData"
    />
  </div>
</template>

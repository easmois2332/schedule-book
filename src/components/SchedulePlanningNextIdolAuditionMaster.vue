<script setup>
import {onBeforeMount, ref, watch} from "vue";
import Items from "@/classes/items";
import {abilities, abilityBasicParameterUpList, abilityExtraParameterUpList} from "@/consts/supportCardConst";
import CommonInputModal from "@/components/inputModals/CommonInputModal.vue";

const props = defineProps(['inputData', 'basicData']);
const emit = defineEmits(['input-data-update']);

const items = new Items();

const maxParameter = 2300;
const scheduleData = {
  1: {
    sp_lesson: {value: 'sp_lesson', text: '自主SPレッスン', parameter: 100, point: 20, hp: -8, fan: 0},
    lesson: {value: 'lesson', text: '自主レッスン', parameter: 80, point: 20, hp: -6, fan: 0},
  },
  2: {
    class_hp: {value: 'class_hp', text: '営業(リゾート施設)', parameter: 80, point: 0, hp: 10, fan: 4215},
    class_drink: {value: 'class_drink', text: '授業(企業イベント)', parameter: 80, point: 0, hp: 0, fan: 4680},
    class_point: {value: 'class_point', text: '授業(自治体イベント)', parameter: 80, point: 50, hp: -5, fan: 4680},
    class_card: {value: 'class_card', text: '営業(商業施設)', parameter: 80, point: 0, hp: -5, fan: 4680},
    rest: {value: 'rest', text: '休む', parameter: 0, point: 0, hp: 0, fan: 0},
  },
  3: {
    outing: {value: 'outing', text: 'お出かけ', parameter: 0, point: 0, hp: 0, fan: 0},
    gift: {value: 'gift', text: '差し入れ', parameter: 0, point: 80, hp: 0, fan: 0},
    rest: {value: 'rest', text: '休む', parameter: 0, point: 0, hp: 0, fan: 0},
  },
  4: {
    sp_lesson: {value: 'sp_lesson', text: '自主SPレッスン', parameter: 100, point: 20, hp: -8, fan: 0},
    lesson: {value: 'lesson', text: '自主レッスン', parameter: 80, point: 20, hp: -6, fan: 0},
    rest: {value: 'rest', text: '休む', parameter: 0, point: 0, hp: 0, fan: 0},
  },
  5: {
    class_hp: {value: 'class_hp', text: '営業(リゾート施設)', parameter: 80, point: 0, hp: 10, fan: 4215},
    class_drink: {value: 'class_drink', text: '授業(企業イベント)', parameter: 80, point: 0, hp: 0, fan: 4680},
    class_point: {value: 'class_point', text: '授業(自治体イベント)', parameter: 80, point: 50, hp: -5, fan: 4680},
    class_card: {value: 'class_card', text: '営業(商業施設)', parameter: 80, point: 0, hp: -5, fan: 4680},
    rest: {value: 'rest', text: '休む', parameter: 0, point: 0, hp: 0, fan: 0},
  },
  6: {
    outing: {value: 'outing', text: 'お出かけ', parameter: 0, point: 0, hp: 0, fan: 0},
    consultation: {value: 'consultation', text: '相談', parameter: 0, point: 0, hp: 0, fan: 0},
    rest: {value: 'rest', text: '休む', parameter: 0, point: 0, hp: 0, fan: 0},
  },
  7: {
    class_hp: {value: 'class_hp', text: '営業(リゾート施設)', parameter: 80, point: 0, hp: 10, fan: 4215},
    class_drink: {value: 'class_drink', text: '授業(企業イベント)', parameter: 80, point: 0, hp: 0, fan: 4680},
    class_point: {value: 'class_point', text: '授業(自治体イベント)', parameter: 80, point: 50, hp: -5, fan: 4680},
    class_card: {value: 'class_card', text: '営業(商業施設)', parameter: 80, point: 0, hp: -5, fan: 4680},
    rest: {value: 'rest', text: '休む', parameter: 0, point: 0, hp: 0, fan: 0},
  },
  8: {
    coaching: {value: 'coaching', text: '特別指導', parameter: 0, point: 0, hp: 0, fan: 0},
  },
  9: {
    exam_1: {value: 'exam_1', text: '1次オーディション', parameter: 0, point: 100, hp: 0, fan: 0},
  },
  10: {
    outing: {value: 'outing', text: 'お出かけ', parameter: 0, point: 0, hp: 0, fan: 0},
    gift: {value: 'gift', text: '差し入れ', parameter: 0, point: 80, hp: 0, fan: 0},
    rest: {value: 'rest', text: '休む', parameter: 0, point: 0, hp: 0, fan: 0},
  },
  11: {
    sp_lesson: {value: 'sp_lesson', text: '自主SPレッスン', parameter: 120, point: 25, hp: -8, fan: 0},
    lesson: {value: 'lesson', text: '自主レッスン', parameter: 100, point: 25, hp: -6, fan: 0},
    rest: {value: 'rest', text: '休む', parameter: 0, point: 0, hp: 0, fan: 0},
  },
  12: {
    class_hp: {value: 'class_hp', text: '営業(リゾート施設)', parameter: 110, point: 0, hp: 10, fan: 5625},
    class_drink: {value: 'class_drink', text: '授業(企業イベント)', parameter: 110, point: 0, hp: 0, fan: 6240},
    class_point: {value: 'class_point', text: '授業(自治体イベント)', parameter: 110, point: 50, hp: -5, fan: 6240},
    class_card: {value: 'class_card', text: '営業(商業施設)', parameter: 110, point: 0, hp: -5, fan: 6240},
    rest: {value: 'rest', text: '休む', parameter: 0, point: 0, hp: 0, fan: 0},
  },
  13: {
    outing: {value: 'outing', text: 'お出かけ', parameter: 0, point: 0, hp: 0, fan: 0},
    consultation: {value: 'consultation', text: '相談', parameter: 0, point: 0, hp: 0, fan: 0},
    gift: {value: 'gift', text: '差し入れ', parameter: 0, point: 80, hp: 0, fan: 0},
    rest: {value: 'rest', text: '休む', parameter: 0, point: 0, hp: 0, fan: 0},
  },
  14: {
    sp_lesson: {value: 'sp_lesson', text: '自主SPレッスン', parameter: 120, point: 25, hp: -8, fan: 0},
    lesson: {value: 'lesson', text: '自主レッスン', parameter: 100, point: 25, hp: -6, fan: 0},
    rest: {value: 'rest', text: '休む', parameter: 0, point: 0, hp: 0, fan: 0},
  },
  15: {
    class_hp: {value: 'class_hp', text: '営業(リゾート施設)', parameter: 110, point: 0, hp: 10, fan: 5625},
    class_drink: {value: 'class_drink', text: '授業(企業イベント)', parameter: 110, point: 0, hp: 0, fan: 6240},
    class_point: {value: 'class_point', text: '授業(自治体イベント)', parameter: 110, point: 50, hp: -5, fan: 6240},
    class_card: {value: 'class_card', text: '営業(商業施設)', parameter: 110, point: 0, hp: -5, fan: 6240},
    rest: {value: 'rest', text: '休む', parameter: 0, point: 0, hp: 0, fan: 0},
  },
  16: {
    coaching: {value: 'coaching', text: '特別指導', parameter: 0, point: 0, hp: 0, fan: 0},
  },
  17: {
    exam_2: {value: 'exam_2', text: '2次オーディション', parameter: 0, point: 150, hp: 0, fan: 0},
  },
  18: {
    outing: {value: 'outing', text: 'お出かけ', parameter: 0, point: 0, hp: 0, fan: 0},
    gift: {value: 'gift', text: '差し入れ', parameter: 0, point: 90, hp: 0, fan: 0},
    rest: {value: 'rest', text: '休む', parameter: 0, point: 0, hp: 0, fan: 0},
  },
  19: {
    sp_lesson: {value: 'sp_lesson', text: '自主SPレッスン', parameter: 150, point: 30, hp: -8, fan: 0},
    lesson: {value: 'lesson', text: '自主レッスン', parameter: 120, point: 30, hp: -6, fan: 0},
    rest: {value: 'rest', text: '休む', parameter: 0, point: 0, hp: 0, fan: 0},
  },
  20: {
    class_hp: {value: 'class_hp', text: '営業(リゾート施設)', parameter: 130, point: 0, hp: 10, fan: 7185},
    class_drink: {value: 'class_drink', text: '授業(企業イベント)', parameter: 130, point: 0, hp: 0, fan: 7800},
    class_point: {value: 'class_point', text: '授業(自治体イベント)', parameter: 130, point: 50, hp: -5, fan: 7800},
    class_card: {value: 'class_card', text: '営業(商業施設)', parameter: 130, point: 0, hp: -5, fan: 7800},
    rest: {value: 'rest', text: '休む', parameter: 0, point: 0, hp: 0, fan: 0},
  },
  21: {
    consultation: {value: 'consultation', text: '相談', parameter: 0, point: 0, hp: 0, fan: 0},
    gift: {value: 'gift', text: '差し入れ', parameter: 0, point: 90, hp: 0, fan: 0},
    coaching: {value: 'coaching', text: '特別指導', parameter: 0, point: 0, hp: 0, fan: 0},
    rest: {value: 'rest', text: '休む', parameter: 0, point: 0, hp: 0, fan: 0},
  },
  22: {
    sp_lesson: {value: 'sp_lesson', text: '自主SPレッスン', parameter: 150, point: 30, hp: -8, fan: 0},
    lesson: {value: 'lesson', text: '自主レッスン', parameter: 120, point: 30, hp: -6, fan: 0},
    rest: {value: 'rest', text: '休む', parameter: 0, point: 0, hp: 0, fan: 0},
  },
  23: {
    class_hp: {value: 'class_hp', text: '営業(リゾート施設)', parameter: 130, point: 0, hp: 10, fan: 7185},
    class_drink: {value: 'class_drink', text: '授業(企業イベント)', parameter: 130, point: 0, hp: 0, fan: 7800},
    class_point: {value: 'class_point', text: '授業(自治体イベント)', parameter: 130, point: 50, hp: -5, fan: 7800},
    class_card: {value: 'class_card', text: '営業(商業施設)', parameter: 130, point: 0, hp: -5, fan: 7800},
    rest: {value: 'rest', text: '休む', parameter: 0, point: 0, hp: 0, fan: 0},
  },
  24: {
    sp_lesson: {value: 'sp_lesson', text: '自主SPレッスン', parameter: 150, point: 30, hp: -8, fan: 0},
    lesson: {value: 'lesson', text: '自主レッスン', parameter: 120, point: 30, hp: -6, fan: 0},
    rest: {value: 'rest', text: '休む', parameter: 0, point: 0, hp: 0, fan: 0},
  },
  25: {
    outing: {value: 'outing', text: 'お出かけ', parameter: 0, point: 0, hp: 0, fan: 0},
    consultation: {value: 'consultation', text: '相談', parameter: 0, point: 0, hp: 0, fan: 0},
    coaching: {value: 'coaching', text: '特別指導', parameter: 0, point: 0, hp: 0, fan: 0},
    rest: {value: 'rest', text: '休む', parameter: 0, point: 0, hp: 0, fan: 0},
  },
  26: {
    exam_3: {value: 'exam_3', text: '最終オーディション', parameter: 0, point: 0, hp: 0, fan: 0},
  },
};
const resultData = {
  'SSS+': {rank: 'SSS+', point: 23000},
  'SSS': {rank: 'SSS', point: 20000},
  'SS+': {rank: 'SS+', point: 18000},
  'SS': {rank: 'SS', point: 16000},
  'S+': {rank: 'S+', point: 14500},
  'S': {rank: 'S', point: 13000},
  'A+': {rank: 'A+', point: 11500},
  'A': {rank: 'A', point: 10000},
  'B+': {rank: 'B+', point: 8000},
  'B': {rank: 'B', point: 6000},
  'C+': {rank: 'C+', point: 4500},
  'C': {rank: 'C', point: 3000},
};

const abilityBasicParameterUpListAll = abilityBasicParameterUpList;
const abilityExtraParameterUpListAll = abilityExtraParameterUpList;

let inputData = ref(props.inputData);
let basicData = ref(props.basicData);

let scheduleDetailCount = ref({});
let scheduleDetailData = ref({});
let resultScoreList = ref({});
let challengePItemAuditionBonus = ref(0);

let commonInputModalScheduleHpOpen = ref(false);
let commonInputModalSchedulePointOpen = ref(false);
let commonInputModalSupportCardPItemOpen = ref(false);
let commonInputModalPItemNiaKeyHolderOpen = ref(false);
let commonInputModalSupportCardAbilityOpen = ref(false);

const updateInputData = () => {
  emit('input-data-update', inputData.value);
}
const getBonusIncludedParameter = (parameter, parameterBonus) => {
  return Math.floor(
      parameter +
      parameter * (parameterBonus / 10).toFixed(1) / 100
  );
};
const updateScheduleDetailCount = () => {
  scheduleDetailCount.value = {
    lesson: {
      vocal: 0,
      dance: 0,
      visual: 0,
    },
    normal_lesson: {
      vocal: 0,
      dance: 0,
      visual: 0,
    },
    sp_lesson: {
      vocal: 0,
      dance: 0,
      visual: 0,
    },
    class: 0,
    gift: 0,
    outing: 0,
    consultation: 0,
    coaching: 0,
    rest: 0,
    exam_1: 0,
    exam: 0,
  };
  if (inputData.value['organization']['produce_idol']['id'] !== null && basicData.value['produce_idol']) {
    for (let week = 1; week <= 26; week++) {
      let inputScheduleData = inputData.value['planning']['schedule'][week];
      switch (inputScheduleData['schedule_detail']) {
        case 'lesson':
          scheduleDetailCount.value['lesson'][inputScheduleData['type']]++;
          scheduleDetailCount.value['normal_lesson'][inputScheduleData['type']]++;
          break;
        case 'sp_lesson':
          scheduleDetailCount.value['lesson'][inputScheduleData['type']]++;
          scheduleDetailCount.value['sp_lesson'][inputScheduleData['type']]++;
          break;
        case inputScheduleData['schedule_detail'].includes('class') && inputScheduleData['schedule_detail']:
          scheduleDetailCount.value['class']++;
          break;
        case 'gift':
          scheduleDetailCount.value['gift']++;
          break;
        case 'outing':
          scheduleDetailCount.value['outing']++;
          break;
        case 'consultation':
          scheduleDetailCount.value['consultation']++;
          break;
        case 'coaching':
          scheduleDetailCount.value['coaching']++;
          break;
        case 'rest':
          scheduleDetailCount.value['rest']++;
          break;
        case 'exam_1':
          scheduleDetailCount.value['exam_1']++;
        case 'exam_2':
        case 'exam_3':
          scheduleDetailCount.value['exam']++;
          break;
        default:
          break;
      }
    }
  }
}
const updateScheduleDetailData = () => {
  if (inputData.value['organization']['produce_idol']['id'] !== null && basicData.value['produce_idol']) {
    let maxHp = basicData.value['parameter']['init_hp'];
    let parameter = {
      vocal: basicData.value['parameter']['init_vocal'],
      dance: basicData.value['parameter']['init_dance'],
      visual: basicData.value['parameter']['init_visual'],
      point: basicData.value['parameter']['init_point'],
      hp: basicData.value['parameter']['init_hp'],
      fan: 0,
    }
    let niaPassCaseCount = 0;

    // 1~26週目
    for (let week = 1; week <= 26; week++) {
      let inputScheduleData = inputData.value['planning']['schedule'][week];
      let basicParameter = scheduleData[week][inputScheduleData['schedule_detail']]['parameter'];
      let basicPoint = scheduleData[week][inputScheduleData['schedule_detail']]['point'];
      let pointUpRate = 0;

      // スケジュール内容での獲得パラメータ
      if (inputScheduleData['schedule_detail'] === 'lesson' || inputScheduleData['schedule_detail'] === 'sp_lesson') {
        if (inputScheduleData['type'] !== null) {
          parameter[inputScheduleData['type']] += getBonusIncludedParameter(basicParameter, basicData.value['parameter'][`bonus_${inputScheduleData['type']}`]);
        }
        parameter['point'] += scheduleData[week][inputScheduleData['schedule_detail']]['point'];
        parameter['hp'] += scheduleData[week][inputScheduleData['schedule_detail']]['hp'];
        parameter['fan'] += scheduleData[week][inputScheduleData['schedule_detail']]['fan'];
      } else if (inputScheduleData['schedule_detail'] === 'exam_1' || inputScheduleData['schedule_detail'] === 'exam_2' || inputScheduleData['schedule_detail'] === 'exam_3') {
        parameter['point'] += scheduleData[week][inputScheduleData['schedule_detail']]['point'];
        parameter['hp'] += Math.round(maxHp * 0.5);
        parameter['fan'] += scheduleData[week][inputScheduleData['schedule_detail']]['fan'];
      } else {
        if (inputScheduleData['type'] !== null) {
          parameter[inputScheduleData['type']] += basicParameter;
        } else {
          parameter['vocal'] += basicParameter;
          parameter['dance'] += basicParameter;
          parameter['visual'] += basicParameter;
        }
        parameter['point'] += scheduleData[week][inputScheduleData['schedule_detail']]['point'];
        parameter['hp'] += scheduleData[week][inputScheduleData['schedule_detail']]['hp'];
        parameter['fan'] += scheduleData[week][inputScheduleData['schedule_detail']]['fan'];
      }

      // Pポイント調整処理
      parameter['point'] += inputScheduleData['point'];

      // 体力調整処理
      parameter['hp'] += inputScheduleData['hp'];
      if (parameter['hp'] < 0) {
        parameter['hp'] = 0;
      }

      // サポートカードアビリティでの獲得パラメータ
      switch (inputScheduleData['schedule_detail']) {
        case 'lesson':
          // パラメータ
          if (basicData.value['ability_list'][abilities.LESSON_PARAMETER_UP]) {
            parameter[inputScheduleData['type']] += basicData.value['ability_list'][abilities.LESSON_PARAMETER_UP][inputScheduleData['type']];
          }
          if (basicData.value['ability_list'][abilities.NORMAL_LESSON_PARAMETER_UP]) {
            parameter[inputScheduleData['type']] += basicData.value['ability_list'][abilities.NORMAL_LESSON_PARAMETER_UP][inputScheduleData['type']];
          }

          // Pポイント
          if (basicData.value['ability_list'][abilities.LESSON_P_POINT_UP]) {
            pointUpRate += basicData.value['ability_list'][abilities.LESSON_P_POINT_UP][inputScheduleData['type']];
          }
          if (pointUpRate !== 0) {
            parameter['point'] += getBonusIncludedParameter(basicPoint, pointUpRate);
          } else {
            parameter['point'] += basicPoint;
          }
          break;
        case 'sp_lesson':
          // パラメータ
          if (basicData.value['ability_list'][abilities.LESSON_PARAMETER_UP]) {
            parameter[inputScheduleData['type']] += basicData.value['ability_list'][abilities.LESSON_PARAMETER_UP][inputScheduleData['type']];
          }
          if (basicData.value['ability_list'][abilities.SP_LESSON_PARAMETER_UP]) {
            parameter[inputScheduleData['type']] += basicData.value['ability_list'][abilities.SP_LESSON_PARAMETER_UP][inputScheduleData['type']];
          }

          // Pポイント
          if (basicData.value['ability_list'][abilities.LESSON_P_POINT_UP]) {
            pointUpRate += basicData.value['ability_list'][abilities.LESSON_P_POINT_UP][inputScheduleData['type']];
          }
          if (basicData.value['ability_list'][abilities.SP_LESSON_P_POINT_UP]) {
            pointUpRate += basicData.value['ability_list'][abilities.SP_LESSON_P_POINT_UP][inputScheduleData['type']];
          }
          if (pointUpRate !== 0) {
            parameter['point'] += getBonusIncludedParameter(basicPoint, pointUpRate);
          } else {
            parameter['point'] += basicPoint;
          }

          // 体力
          if (basicData.value['ability_list'][abilities.SP_LESSON_HP_RECOVER]) {
            parameter['hp'] += basicData.value['ability_list'][abilities.SP_LESSON_HP_RECOVER][inputScheduleData['type']];
          }
          break;
        case inputScheduleData['schedule_detail'].includes('class') && inputScheduleData['schedule_detail']:
          // パラメータ
          if (basicData.value['ability_list'][abilities.CLASS_PARAMETER_UP]) {
            parameter['vocal'] += basicData.value['ability_list'][abilities.CLASS_PARAMETER_UP]['vocal'];
            parameter['dance'] += basicData.value['ability_list'][abilities.CLASS_PARAMETER_UP]['dance'];
            parameter['visual'] += basicData.value['ability_list'][abilities.CLASS_PARAMETER_UP]['visual'];
          }
          break;
        case 'gift':
          // パラメータ
          if (basicData.value['ability_list'][abilities.GIFT_PARAMETER_UP]) {
            parameter['vocal'] += basicData.value['ability_list'][abilities.GIFT_PARAMETER_UP]['vocal'];
            parameter['dance'] += basicData.value['ability_list'][abilities.GIFT_PARAMETER_UP]['dance'];
            parameter['visual'] += basicData.value['ability_list'][abilities.GIFT_PARAMETER_UP]['visual'];
          }

          // 体力
          if (basicData.value['ability_list'][abilities.GIFT_HP_RECOVER]) {
            parameter['hp'] -= basicData.value['ability_list'][abilities.GIFT_HP_RECOVER]['vocal'];
          }
          break;
        case 'outing':
          // パラメータ
          if (basicData.value['ability_list'][abilities.OUTING_PARAMETER_UP]) {
            parameter['vocal'] += basicData.value['ability_list'][abilities.OUTING_PARAMETER_UP]['vocal'];
            parameter['dance'] += basicData.value['ability_list'][abilities.OUTING_PARAMETER_UP]['dance'];
            parameter['visual'] += basicData.value['ability_list'][abilities.OUTING_PARAMETER_UP]['visual'];
          }
          break;
        case 'consultation':
          // パラメータ
          if (basicData.value['ability_list'][abilities.CONSULTATION_PARAMETER_UP]) {
            parameter['vocal'] += basicData.value['ability_list'][abilities.CONSULTATION_PARAMETER_UP]['vocal'];
            parameter['dance'] += basicData.value['ability_list'][abilities.CONSULTATION_PARAMETER_UP]['dance'];
            parameter['visual'] += basicData.value['ability_list'][abilities.CONSULTATION_PARAMETER_UP]['visual'];
          }
          break;
        case 'rest':
          // パラメータ
          if (basicData.value['ability_list'][abilities.REST_PARAMETER_UP]) {
            parameter['vocal'] += basicData.value['ability_list'][abilities.REST_PARAMETER_UP]['vocal'];
            parameter['dance'] += basicData.value['ability_list'][abilities.REST_PARAMETER_UP]['dance'];
            parameter['visual'] += basicData.value['ability_list'][abilities.REST_PARAMETER_UP]['visual'];
          }

          // 体力
          parameter['hp'] += Math.round(maxHp * 0.7);
          break;
        case 'exam_1':
          // パラメータ
          if (basicData.value['ability_list'][abilities.EXAM_PARAMETER_UP]) {
            parameter['vocal'] += basicData.value['ability_list'][abilities.EXAM_PARAMETER_UP]['vocal'];
            parameter['dance'] += basicData.value['ability_list'][abilities.EXAM_PARAMETER_UP]['dance'];
            parameter['visual'] += basicData.value['ability_list'][abilities.EXAM_PARAMETER_UP]['visual'];
          }

          // 体力
          if (basicData.value['ability_list'][abilities.EXAM_HP_RECOVER]) {
            parameter['hp'] -= basicData.value['ability_list'][abilities.EXAM_HP_RECOVER]['vocal'];
          }
          break;
        case 'exam_2':
          break;
        case 'exam_3':
          break;
        default:
          break;
      }

      // N.I.AパスケースでのPポイント獲得
      if (inputData.value['planning']['produce_p_item'][2] === 19 && week >= 10 && inputScheduleData['schedule_detail'] === 'class_point' && niaPassCaseCount < 2) {
        parameter['point'] += 40;
        niaPassCaseCount++;
      }

      // はつぼしブレスレットでの体力消費
      if (inputData.value['planning']['produce_p_item'][3] === 2 && week >= 18 && inputScheduleData['schedule_detail'] === 'sp_lesson') {
        parameter['hp'] -= 3;
      }

      // 最大上限判定
      parameter['vocal'] = Math.min(maxParameter, parameter['vocal']);
      parameter['dance'] = Math.min(maxParameter, parameter['dance']);
      parameter['visual'] = Math.min(maxParameter, parameter['visual']);
      parameter['hp'] = Math.min(maxHp, parameter['hp']);

      // 最小下限判定
      if (parameter['hp'] < 0) {
        parameter['hp'] = 0;
      }

      // 合計値計算
      scheduleDetailData.value[week] = {...parameter};
      scheduleDetailData.value[week]['sum'] = parameter['vocal'] + parameter['dance'] + parameter['visual'];
    }

    // その他獲得パラメータ
    // Pアイテム
    for (let i in inputData.value['planning']['support_card_p_item']) {
      if (basicData.value['support_card'][i]) {
        parameter[basicData.value['support_card'][i]['type']] += getPItemParameterSum(i);
      }
    }
    parameter['fan'] += inputData.value['planning']['produce_p_item'][1] * 3000;

    // サポートカードイベント
    for (let i in inputData.value['planning']['support_card_event']) {
      if (inputData.value['planning']['support_card_event'][i]) {
        parameter[basicData.value['support_card'][i]['type']] += basicData.value['support_card'][i]['event_2_parameter'];
      }
    }

    // サポートカードアビリティ
    for (let i in abilityExtraParameterUpListAll) {
      if (basicData.value['ability_list'][abilityExtraParameterUpListAll[i]['ability']] && inputData.value['planning']['support_card_ability'][abilityExtraParameterUpListAll[i]['ability']]) {
        parameter['vocal'] += basicData.value['ability_list'][abilityExtraParameterUpListAll[i]['ability']]['vocal'] * inputData.value['planning']['support_card_ability'][abilityExtraParameterUpListAll[i]['ability']];
        parameter['dance'] += basicData.value['ability_list'][abilityExtraParameterUpListAll[i]['ability']]['dance'] * inputData.value['planning']['support_card_ability'][abilityExtraParameterUpListAll[i]['ability']];
        parameter['visual'] += basicData.value['ability_list'][abilityExtraParameterUpListAll[i]['ability']]['visual'] * inputData.value['planning']['support_card_ability'][abilityExtraParameterUpListAll[i]['ability']];
      }
    }

    // 最大上限判定
    parameter['vocal'] = Math.min(maxParameter, parameter['vocal']);
    parameter['dance'] = Math.min(maxParameter, parameter['dance']);
    parameter['visual'] = Math.min(maxParameter, parameter['visual']);
    parameter['hp'] = Math.min(maxHp, parameter['hp']);

    // 最小下限判定
    if (parameter['hp'] < 0) {
      parameter['hp'] = 0;
    }

    // 合計値計算
    scheduleDetailData.value['other'] = {...parameter};
    scheduleDetailData.value['other']['sum'] = parameter['vocal'] + parameter['dance'] + parameter['visual'];

    // 最終評価
    scheduleDetailData.value['result'] = {...parameter};
    scheduleDetailData.value['result']['sum'] = parameter['vocal'] + parameter['dance'] + parameter['visual'];
  } else {
    scheduleDetailData.value = {};
  }
}
const updateScheduleDetail = (week) => {
  if (!inputData.value['planning']['schedule'][week]['schedule_detail'].includes('class') && !inputData.value['planning']['schedule'][week]['schedule_detail'].includes('lesson')) {
    inputData.value['planning']['schedule'][week]['type'] = null;
  } else if (inputData.value['planning']['schedule'][week]['type'] === null) {
    inputData.value['planning']['schedule'][week]['type'] = 'vocal';
  }
  updateInputData();
}
const getResultScore = (resultPoint, parameter) => {
  const calcList = [
    {score: 40001, magnification: 0.01, addition: 3250},
    {score: 30001, magnification: 0.02, addition: 2850},
    {score: 20001, magnification: 0.04, addition: 2250},
    {score: 10001, magnification: 0.08, addition: 1450},
    {score: 5001, magnification: 0.15, addition: 750},
    {score: 0, magnification: 0.30, addition: 0},
  ];
  let requiredPoint = resultPoint - (parameter * 2.3).toFixed(0) - 1700;

  for (let i in calcList) {
    let requiredScore = ((requiredPoint - calcList[i]['addition']) / calcList[i]['magnification']).toFixed(0);
    if (requiredScore >= calcList[i]['score']) {
      return requiredScore;
    }
  }
  return 0;
}
const updateResultScoreList = () => {
  if (scheduleDetailData.value['result']) {
    for (let rank in resultData) {
      resultScoreList.value[rank] = getResultScore(resultData[rank]['point'], scheduleDetailData.value['result']['sum']);
    }
  } else {
    resultScoreList.value = {};
  }
}
const getChallengePItemDetail = (categoryType, plan) => {
  return items.getNiaMasterChallengeItem(categoryType, plan)
}
const updateChallengePItemMaxPushSum = () => {
  challengePItemAuditionBonus.value = 0;
  for (let i in inputData.value['planning']['challenge_p_item']) {
    if (inputData.value['planning']['challenge_p_item'][i] > 0) {
      challengePItemAuditionBonus.value += getPItemDetail(inputData.value['planning']['challenge_p_item'][i]).event_other;
    }
  }
}
const changeChallengePItem = () => {
  updateChallengePItemMaxPushSum();
  updateInputData();
}
const getPItemDetail = (id) => {
  return items.getItemFromId(id);
}
const getPItemParameterSum = (index) => {
  if (!basicData.value['support_card'][index] || basicData.value['support_card'][index]['event_1'] !== 'get_unique_p_item') {
    return 0;
  }
  return getPItemDetail(basicData.value['support_card'][index]['p_item_id']).event_parameter * inputData.value['planning']['support_card_p_item'][index];
}
const getBasicPItemDetail = (plan) => {
  return items.getNiaMasterBasicLessonItem(plan);
}
const getSupportCardAbilityParameterSum = (ability, count) => {
  if (!basicData.value['ability_list'][ability]) {
    return 0;
  }
  if (!count) {
    count = 0;
  }
  return (basicData.value['ability_list'][ability]['vocal'] * count)
      + (basicData.value['ability_list'][ability]['dance'] * count)
      + (basicData.value['ability_list'][ability]['visual'] * count);
}
const updatePlanningData = () => {
  updateScheduleDetailCount();
  updateScheduleDetailData();
  updateResultScoreList();
}
const getPItemCountMaxValue = (id) => {
  let pItem = getPItemDetail(id);
  if (pItem.event === null) {
    return pItem.event_count;
  } else if (pItem.event.includes('lesson')) {
    return Math.min(pItem.event_count, scheduleDetailCount.value[pItem.event][pItem.type]);
  } else {
    return Math.min(pItem.event_count, scheduleDetailCount.value[pItem.event]);
  }
}
const inputScheduleHpAdjustment = (index) => {
  commonInputModalScheduleHpOpen.value = index;
}
const closeScheduleHpAdjustment = (inputValue) => {
  if (inputValue !== null) {
    inputData.value['planning']['schedule'][commonInputModalScheduleHpOpen.value]['hp'] = inputValue;
    updateInputData();
  }
  commonInputModalScheduleHpOpen.value = false;
}
const inputSchedulePointAdjustment = (index) => {
  commonInputModalSchedulePointOpen.value = index;
}
const closeSchedulePointAdjustment = (inputValue) => {
  if (inputValue !== null) {
    inputData.value['planning']['schedule'][commonInputModalSchedulePointOpen.value]['point'] = inputValue;
    updateInputData();
  }
  commonInputModalSchedulePointOpen.value = false;
}
const inputPItemCount = (index) => {
  if (inputData.value['organization']['support_card'][index]['id'] &&
      basicData.value['support_card'][index]['event_1'] === 'get_unique_p_item' &&
      getPItemDetail(basicData.value['support_card'][index]['p_item_id'])['category_type'] === 'produce'
  ) {
    commonInputModalSupportCardPItemOpen.value = index;
  }
}
const closePItemCount = (inputValue) => {
  if (inputValue !== null) {
    inputData.value['planning']['support_card_p_item'][commonInputModalSupportCardPItemOpen.value] = inputValue;
    updateInputData();
  }
  commonInputModalSupportCardPItemOpen.value = false;
}
const inputPItemNiaKeyHolderCount = () => {
  commonInputModalPItemNiaKeyHolderOpen.value = true;
}
const closePItemNiaKeyHolderCount = (inputValue) => {
  if (inputValue !== null) {
    inputData.value['planning']['produce_p_item'][1] = inputValue;
    updateInputData();
  }
  commonInputModalPItemNiaKeyHolderOpen.value = false;
}
const inputSupportCardAbilityCount = (index) => {
  commonInputModalSupportCardAbilityOpen.value = index;
}
const closeSupportCardAbilityCount = (inputValue) => {
  if (inputValue !== null) {
    inputData.value['planning']['support_card_ability'][commonInputModalSupportCardAbilityOpen.value] = inputValue;
    updateInputData();
  }
  commonInputModalSupportCardAbilityOpen.value = false;
}
onBeforeMount(() => {
  updateChallengePItemMaxPushSum();
  updatePlanningData();
})
watch(() => props.inputData, () => {
  inputData.value = props.inputData;
  updateChallengePItemMaxPushSum();
  updatePlanningData();
});
watch(() => props.basicData, () => {
  basicData.value = props.basicData;
  updateChallengePItemMaxPushSum();
  updatePlanningData();
});
defineExpose({updatePlanningData});
</script>

<template>
  <div class="planning-area">
    <div class="content-area">
      <div class="schedule-area">
        <div class="common-headline">
          <span class="common-headline-text font-bold">スケジュール</span>
        </div>
        <div class="schedule-content-area">
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
                <th class="table-header point"><span class="table-header-text">ファン数</span></th>
                <th class="table-header hp"><span class="table-header-text">体力</span></th>
                <th class="table-header point"><span class="table-header-text">Pポイント</span></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="i in 26" :key="i">
                <th class="table-header">
                  <span class="table-header-text">{{ i }}</span>
                </th>
                <td class="table-data detail">
                  <select class="table-select" v-model="inputData['planning']['schedule'][i]['schedule_detail']" v-if="Object.keys(scheduleData[i]).length > 1" @change="updateScheduleDetail(i)">
                    <option class="table-option" v-for="option in scheduleData[i]" v-bind:value="option.value">{{ option.text }}</option>
                  </select>
                  <span class="table-data-text" v-else>{{ scheduleData[i][Object.entries(scheduleData[i])[0][0]]['text'] }}</span>
                </td>
                <td class="table-data type">
                  <select class="table-select" v-bind:class="inputData['planning']['schedule'][i]['type']" v-model="inputData['planning']['schedule'][i]['type']" v-if="inputData['planning']['schedule'][i]['schedule_detail'].includes('lesson') || inputData['planning']['schedule'][i]['schedule_detail'].includes('class')" @change="updateInputData">
                    <option class="table-option vocal" value="vocal">ボーカル</option>
                    <option class="table-option dance" value="dance">ダンス</option>
                    <option class="table-option visual" value="visual">ビジュアル</option>
                  </select>
                </td>
                <td class="table-data number vocal">
                  <span class="table-data-text" v-if="scheduleDetailData[i]">{{ scheduleDetailData[i]['vocal'] }}</span>
                  <span class="table-data-text" v-else>0</span>
                </td>
                <td class="table-data number dance">
                  <span class="table-data-text" v-if="scheduleDetailData[i]">{{ scheduleDetailData[i]['dance'] }}</span>
                  <span class="table-data-text" v-else>0</span>
                </td>
                <td class="table-data number visual">
                  <span class="table-data-text" v-if="scheduleDetailData[i]">{{ scheduleDetailData[i]['visual'] }}</span>
                  <span class="table-data-text" v-else>0</span>
                </td>
                <td class="table-data number point">
                  <span class="table-data-text" v-if="scheduleDetailData[i]">{{ scheduleDetailData[i]['sum'] }}</span>
                  <span class="table-data-text" v-else>0</span>
                </td>
                <td class="table-data number point">
                  <span class="table-data-text" v-if="scheduleDetailData[i]">{{ scheduleDetailData[i]['fan'] }}</span>
                  <span class="table-data-text" v-else>0</span>
                </td>
                <td class="table-data number hp input" @click="inputScheduleHpAdjustment(i)">
                  <span class="table-data-text" v-if="scheduleDetailData[i]">{{ scheduleDetailData[i]['hp'] }}</span>
                  <span class="table-data-text" v-else>0</span>
                  <Teleport to="#modal-area">
                    <CommonInputModal
                        v-if="commonInputModalScheduleHpOpen === i"
                        :input-value="inputData['planning']['schedule'][i]['hp']"
                        :min-value="-99"
                        :max-value="99"
                        :headline="'体力を調整'"
                        :description="i + '週目でサポートカードアビリティ、はつぼしブレスレット発動前に消費・回復した体力'"
                        @input-close="closeScheduleHpAdjustment"
                    />
                  </Teleport>
                </td>
                <td class="table-data number point input" @click="inputSchedulePointAdjustment(i)">
                  <span class="table-data-text" v-if="scheduleDetailData[i]">{{ scheduleDetailData[i]['point'] }}</span>
                  <span class="table-data-text" v-else>0</span>
                  <Teleport to="#modal-area">
                    <CommonInputModal
                        v-if="commonInputModalSchedulePointOpen === i"
                        :input-value="inputData['planning']['schedule'][i]['point']"
                        :min-value="-999"
                        :max-value="999"
                        :headline="'Pポイントを調整'"
                        :description="i + '週目で獲得・消費したPポイント'"
                        @input-close="closeSchedulePointAdjustment"
                    />
                  </Teleport>
                </td>
              </tr>
              <tr>
                <th class="table-header"></th>
                <td class="table-data detail"><span class="table-data-text">その他獲得パラメータ</span></td>
                <td class="table-data type"></td>
                <td class="table-data number vocal">
                  <span class="table-data-text" v-if="scheduleDetailData['other']">{{ scheduleDetailData['other']['vocal'] }}</span>
                  <span class="table-data-text" v-else>0</span>
                </td>
                <td class="table-data number dance">
                  <span class="table-data-text" v-if="scheduleDetailData['other']">{{ scheduleDetailData['other']['dance'] }}</span>
                  <span class="table-data-text" v-else>0</span>
                </td>
                <td class="table-data number visual">
                  <span class="table-data-text" v-if="scheduleDetailData['other']">{{ scheduleDetailData['other']['visual'] }}</span>
                  <span class="table-data-text" v-else>0</span>
                </td>
                <td class="table-data number point">
                  <span class="table-data-text" v-if="scheduleDetailData['other']">{{ scheduleDetailData['other']['sum'] }}</span>
                  <span class="table-data-text" v-else>0</span>
                </td>
                <td class="table-data number point">
                  <span class="table-data-text" v-if="scheduleDetailData['other']">{{ scheduleDetailData['other']['fan'] }}</span>
                  <span class="table-data-text" v-else>0</span>
                </td>
                <td class="table-data number hp"></td>
                <td class="table-data number point"></td>
              </tr>
              <tr>
                <th class="table-header last"></th>
                <td class="table-data detail last"><span class="table-data-text font-bold last">最終パラメータ</span></td>
                <td class="table-data type last"></td>
                <td class="table-data number vocal last">
                  <span class="table-data-text font-bold vocal" v-if="scheduleDetailData['result']">{{ scheduleDetailData['result']['vocal'] }}</span>
                  <span class="table-data-text font-bold vocal" v-else>0</span>
                </td>
                <td class="table-data number dance last">
                  <span class="table-data-text font-bold dance" v-if="scheduleDetailData['result']">{{ scheduleDetailData['result']['dance'] }}</span>
                  <span class="table-data-text font-bold dance" v-else>0</span>
                </td>
                <td class="table-data number visual last">
                  <span class="table-data-text font-bold visual" v-if="scheduleDetailData['result']">{{ scheduleDetailData['result']['visual'] }}</span>
                  <span class="table-data-text font-bold visual" v-else>0</span>
                </td>
                <td class="table-data number point last">
                  <span class="table-data-text font-bold last" v-if="scheduleDetailData['result']">{{ scheduleDetailData['result']['sum'] }}</span>
                  <span class="table-data-text font-bold last" v-else>0</span>
                </td>
                <td class="table-data number point last">
                  <span class="table-data-text font-bold last" v-if="scheduleDetailData['result']">{{ scheduleDetailData['result']['fan'] }}</span>
                  <span class="table-data-text font-bold last" v-else>0</span>
                </td>
                <td class="table-data number hp last"></td>
                <td class="table-data number point last"></td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="result">
            <table class="table result">
              <thead>
              <tr>
                <th class="table-header detail"><span class="table-header-text">最終試験獲得スコア</span></th>
                <th class="table-header point"><span class="table-header-text">評価ランク</span></th>
                <th class="table-header point"><span class="table-header-text">評価値</span></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="result in resultData">
                <td class="table-data number detail">
                  <span class="table-data-text" v-if="resultScoreList[result.rank]">{{ resultScoreList[result.rank] }}</span>
                  <span class="table-data-text" v-else>0</span>
                </td>
                <td class="table-data point">
                  <span class="table-data-text">{{ result.rank }}</span>
                </td>
                <td class="table-data number point">
                  <span class="table-data-text">{{ result.point }}</span>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="event-area">
        <div class="challenge-p-item-area">
          <div class="common-headline">
            <span class="common-headline-text font-bold">チャレンジPアイテム</span>
          </div>
          <div class="challenge-p-item-content-area">
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
                      <option class="table-option" v-bind:value="0">チャレンジPアイテムなし</option>
                      <option class="table-option" v-bind:value="option.id" v-if="inputData['organization']['produce_idol']['id']" v-for="option in getChallengePItemDetail(`challenge_${i}`, ['free', basicData['produce_idol']['plan']])">{{ option.name }}</option>
                    </select>
                  </td>
                  <td class="table-data number count">
                    <span class="table-data-text" v-if="inputData['planning']['challenge_p_item'][i] > 0">{{ getPItemDetail(inputData['planning']['challenge_p_item'][i]).event_other }}</span>
                    <span class="table-data-text" v-else>0</span>
                  </td>
                  <td class="table-data number count" rowspan="3" v-if="i === 1">
                    <span class="table-data-text">{{ challengePItemAuditionBonus }}</span>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="produce-p-item-area">
          <div class="common-headline">
            <span class="common-headline-text font-bold">Pアイテム</span>
          </div>
          <div class="produce-p-item-content-area">
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
                  <td class="table-data" v-bind:class="inputData['organization']['support_card'][i]['id'] ? basicData['support_card'][i]['type'] : 'detail'">
                    <span class="table-data-text" v-bind:title="getPItemDetail(basicData['support_card'][i]['p_item_id']).event_text" v-if="inputData['organization']['support_card'][i]['id'] && basicData['support_card'][i]['event_1'] === 'get_unique_p_item'">{{ getPItemDetail(basicData['support_card'][i]['p_item_id']).name }}</span>
                    <span class="table-data-text" v-else>獲得Pアイテムなし</span>
                  </td>
                  <td class="table-data number" v-bind:class="inputData['organization']['support_card'][i]['id'] ? basicData['support_card'][i]['type'] : 'count'">
                    <span class="table-data-text" v-if="inputData['organization']['support_card'][i]['id'] && basicData['support_card'][i]['event_1'] === 'get_unique_p_item' && getPItemDetail(basicData['support_card'][i]['p_item_id']).category_type === 'produce'">{{ getPItemDetail(basicData['support_card'][i]['p_item_id']).event_parameter }}</span>
                    <span class="table-data-text" v-else></span>
                  </td>
                  <td class="table-data number input" v-bind:class="inputData['organization']['support_card'][i]['id'] ? basicData['support_card'][i]['type'] : 'count'" @click="inputPItemCount(i)">
                    <span class="table-data-text font-bold" v-if="inputData['organization']['support_card'][i]['id'] && basicData['support_card'][i]['event_1'] === 'get_unique_p_item' && getPItemDetail(basicData['support_card'][i]['p_item_id']).category_type === 'produce'">{{ inputData['planning']['support_card_p_item'][i] }}</span>
                    <span class="table-data-text" v-else></span>
                    <Teleport to="#modal-area">
                      <CommonInputModal
                          v-if="commonInputModalSupportCardPItemOpen === i"
                          :input-value="inputData['planning']['support_card_p_item'][i] ? inputData['planning']['support_card_p_item'][i] : 0"
                          :min-value="0"
                          :max-value="getPItemCountMaxValue(basicData['support_card'][i]['p_item_id'])"
                          :headline="'発動回数を編集'"
                          :description="getPItemDetail(basicData['support_card'][i]['p_item_id']).name + 'の発動回数'"
                          @input-close="closePItemCount"
                      />
                    </Teleport>
                  </td>
                  <td class="table-data number" v-bind:class="inputData['organization']['support_card'][i]['id'] ? basicData['support_card'][i]['type'] : 'count'">
                    <span class="table-data-text">{{ getPItemParameterSum(i) }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="table-data detail">
                    <span class="table-data-text">N.I.Aキーホルダー</span>
                  </td>
                  <td class="table-data number count">
                    <span class="table-data-text">3000</span>
                  </td>
                  <td class="table-data number count input" @click="inputPItemNiaKeyHolderCount">
                    <span class="table-data-text">{{ inputData['planning']['produce_p_item'][1] }}</span>
                    <Teleport to="#modal-area">
                      <CommonInputModal
                          v-if="commonInputModalPItemNiaKeyHolderOpen"
                          :input-value="inputData['planning']['produce_p_item'][1]"
                          :min-value="0"
                          :max-value="99"
                          :headline="'発動回数を編集'"
                          :description="'N.I.Aキーホルダーの発動回数'"
                          @input-close="closePItemNiaKeyHolderCount"
                      />
                    </Teleport>
                  </td>
                  <td class="table-data number count">
                    <span class="table-data-text">{{ 3000 * inputData['planning']['produce_p_item'][1] }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="table-data detail">
                    <select class="table-select" v-model="inputData['planning']['produce_p_item'][2]" @change="updateInputData">
                      <option class="table-option" v-bind:value="17">N.I.Aスマホリング</option>
                      <option class="table-option" v-bind:value="18">N.I.Aトートバッグ</option>
                      <option class="table-option" v-bind:value="19">N.I.Aパスケース</option>
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
                <tr>
                  <td class="table-data detail">
                    <select class="table-select" v-model="inputData['planning']['produce_p_item'][3]" @change="updateInputData">
                      <option class="table-option" v-bind:value="2">はつぼしブレスレット</option>
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
        </div>
        <div class="support-card-event-area">
          <div class="common-headline">
            <span class="common-headline-text font-bold">サポートカードイベント</span>
          </div>
          <div class="support-card-event-content-area">
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
                  <td class="table-data" v-bind:class="inputData['organization']['support_card'][i]['id'] ? basicData['support_card'][i]['type'] : 'detail'">
                    <span class="table-data-text" v-if="inputData['organization']['support_card'][i]['id']">{{ basicData['support_card'][i]['name'] }}</span>
                    <span class="table-data-text" v-else>サポートカード未選択</span>
                  </td>
                  <td class="table-data number" v-bind:class="inputData['organization']['support_card'][i]['id'] ? basicData['support_card'][i]['type'] : 'count'">
                    <span class="table-data-text" v-if="inputData['organization']['support_card'][i]['id'] && (basicData['support_card'][i]['type'] !== 'assist')">{{ basicData['support_card'][i]['event_2_parameter'] }}</span>
                    <span class="table-data-text" v-else>0</span>
                  </td>
                  <td class="table-data checkbox" v-bind:class="inputData['organization']['support_card'][i]['id'] ? basicData['support_card'][i]['type'] : 'count'">
                    <input class="table-input-checkbox" type="checkbox" v-bind:value="true" v-model="inputData['planning']['support_card_event'][i]" v-show="inputData['organization']['support_card'][i]['id']" @change="updateInputData">
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="support-card-ability-area">
        <div class="common-headline">
          <span class="common-headline-text font-bold">サポートカードアビリティ</span>
        </div>
        <div class="support-card-ability-content-area">
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
                  <span class="table-data-text" v-bind:class="{'font-bold': Object.keys(basicData['ability_list']).includes(list.ability)}">{{ list.text }}</span>
                </td>
                <td class="table-data number vocal">
                  <span class="table-data-text" v-bind:class="{'font-bold': Object.keys(basicData['ability_list']).includes(list.ability)}" v-if="basicData['ability_list'][list.ability]">{{ basicData['ability_list'][list.ability]['vocal'] }}</span>
                  <span class="table-data-text" v-else>0</span>
                </td>
                <td class="table-data number dance">
                  <span class="table-data-text" v-bind:class="{'font-bold': Object.keys(basicData['ability_list']).includes(list.ability)}" v-if="basicData['ability_list'][list.ability]">{{ basicData['ability_list'][list.ability]['dance'] }}</span>
                  <span class="table-data-text" v-else>0</span>
                </td>
                <td class="table-data number visual">
                  <span class="table-data-text" v-bind:class="{'font-bold': Object.keys(basicData['ability_list']).includes(list.ability)}" v-if="basicData['ability_list'][list.ability]">{{ basicData['ability_list'][list.ability]['visual'] }}</span>
                  <span class="table-data-text" v-else>0</span>
                </td>
                <td class="table-data number count">
                  <span class="table-data-text" v-bind:class="{'font-bold': Object.keys(basicData['ability_list']).includes(list.ability)}" v-if="!list.text.includes('レッスン')">{{ scheduleDetailCount[list.schedule] }}</span>
                </td>
                <td class="table-data number count">
                  <span class="table-data-text" v-bind:class="{'font-bold': Object.keys(basicData['ability_list']).includes(list.ability)}" v-if="!list.text.includes('レッスン')">{{ getSupportCardAbilityParameterSum(list.ability, scheduleDetailCount[list.schedule]) }}</span>
                </td>
              </tr>
              </tbody>
            </table>
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
              <tr v-for="list in abilityExtraParameterUpListAll" :key="list">
                <td class="table-data detail">
                  <span class="table-data-text" v-bind:class="{'font-bold': Object.keys(basicData['ability_list']).includes(list.ability)}">{{ list.text }}</span>
                </td>
                <td class="table-data number vocal">
                  <span class="table-data-text" v-bind:class="{'font-bold': Object.keys(basicData['ability_list']).includes(list.ability)}" v-if="basicData['ability_list'][list.ability]">{{ basicData['ability_list'][list.ability]['vocal'] }}</span>
                  <span class="table-data-text" v-else>0</span>
                </td>
                <td class="table-data number dance">
                  <span class="table-data-text" v-bind:class="{'font-bold': Object.keys(basicData['ability_list']).includes(list.ability)}" v-if="basicData['ability_list'][list.ability]">{{ basicData['ability_list'][list.ability]['dance'] }}</span>
                  <span class="table-data-text" v-else>0</span>
                </td>
                <td class="table-data number visual">
                  <span class="table-data-text" v-bind:class="{'font-bold': Object.keys(basicData['ability_list']).includes(list.ability)}" v-if="basicData['ability_list'][list.ability]">{{ basicData['ability_list'][list.ability]['visual'] }}</span>
                  <span class="table-data-text" v-else>0</span>
                </td>
                <td class="table-data number count input" @click="inputSupportCardAbilityCount(list.ability)">
                  <span class="table-data-text" v-bind:class="{'font-bold': Object.keys(basicData['ability_list']).includes(list.ability)}" v-if="inputData['planning']['support_card_ability'][list.ability]">{{ inputData['planning']['support_card_ability'][list.ability] }}</span>
                  <span class="table-data-text" v-bind:class="{'font-bold': Object.keys(basicData['ability_list']).includes(list.ability)}" v-else>0</span>
                  <Teleport to="#modal-area">
                    <CommonInputModal
                        v-if="commonInputModalSupportCardAbilityOpen === list.ability"
                        :input-value="inputData['planning']['support_card_ability'][list.ability] ? inputData['planning']['support_card_ability'][list.ability] : 0"
                        :min-value="0"
                        :max-value="99"
                        :headline="'発動回数を編集'"
                        :description="list.text + 'の発動回数'"
                        @input-close="closeSupportCardAbilityCount"
                    />
                  </Teleport>
                </td>
                <td class="table-data number count">
                  <span class="table-data-text" v-bind:class="{'font-bold': Object.keys(basicData['ability_list']).includes(list.ability)}">{{ getSupportCardAbilityParameterSum(list.ability, inputData['planning']['support_card_ability'][list.ability]) }}</span>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

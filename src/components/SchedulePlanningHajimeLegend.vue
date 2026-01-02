<script setup>
import {onBeforeMount, ref, watch} from "vue";
import Items from "@/classes/items";
import {abilities, abilityBasicParameterUpList, abilityExtraParameterUpList} from "@/consts/supportCardConst";
import {resultDataList, resultScoreCalcList} from "@/consts/resultConst";
import CommonInputModal from "@/components/smallModals/CommonInputModal.vue";
import ScheduleHpAndPointInputModal from "@/components/smallModals/ScheduleHpAndPointInputModal.vue";
import ExamResultInputModal from "@/components/smallModals/ExamResultInputModal.vue";
import ScheduleSupportCardCalc from "@/components/ScheduleSupportCardCalc.vue";

const props = defineProps(['inputData', 'basicData', 'idols', 'supportCards']);
const emit = defineEmits(['input-data-update']);

const items = new Items();

const maxParameter = 2800;
const scheduleData = {
  1: {
    class: {value: 'class', text: '授業', parameter: 100, point: 0, hp: -5},
  },
  2: {
    class: {value: 'class', text: '授業', parameter: 100, point: 0, hp: -5},
  },
  3: {
    outing: {value: 'outing', text: 'おでかけ', parameter: 0, point: -80, hp: 0},
    gift: {value: 'gift', text: '活動支給', parameter: 0, point: 180, hp: 0},
  },
  4: {
    sp_legend_lesson: {value: 'sp_legend_lesson', text: 'SPレジェンドレッスン', parameter: 85, bonus_parameter: 75, point: 80, hp: 0},
    legend_lesson: {value: 'legend_lesson', text: 'レジェンドレッスン', parameter: 60, bonus_parameter: 60, point: 80, hp: 0},
  },
  5: {
    outing: {value: 'outing', text: 'おでかけ', parameter: 0, point: -80, hp: 0},
    consultation: {value: 'consultation', text: '相談', parameter: 0, point: 0, hp: 0},
    gift: {value: 'gift', text: '活動支給', parameter: 0, point: 180, hp: 0},
    rest: {value: 'rest', text: '休む', parameter: 0, point: 0, hp: 0},
  },
  6: {
    class: {value: 'class', text: '授業', parameter: 150, point: 0, hp: -6},
    rest: {value: 'rest', text: '休む', parameter: 0, point: 0, hp: 0},
  },
  7: {
    sp_legend_lesson: {value: 'sp_legend_lesson', text: 'SPレジェンドレッスン', parameter: 120, bonus_parameter: 90, point: 80, hp: 0},
    legend_lesson: {value: 'legend_lesson', text: 'レジェンドレッスン', parameter: 90, bonus_parameter: 70, point: 80, hp: 0},
    rest: {value: 'rest', text: '休む', parameter: 0, point: 0, hp: 0},
  },
  8: {
    consultation: {value: 'consultation', text: '相談', parameter: 0, point: 0, hp: 0},
    rest: {value: 'rest', text: '休む', parameter: 0, point: 0, hp: 0},
  },
  9: {
    coaching: {value: 'coaching', text: '特別指導', parameter: 0, point: 0, hp: 0},
    rest: {value: 'rest', text: '休む', parameter: 0, point: 0, hp: 0},
  },
  10: {
    exam_1: {value: 'exam_1', text: '中間試験', parameter: 80, point: 0, hp: 0},
  },
  11: {
    outing: {value: 'outing', text: 'おでかけ', parameter: 0, point: -80, hp: 0},
    gift: {value: 'gift', text: '活動支給', parameter: 0, point: 180, hp: 0},
    rest: {value: 'rest', text: '休む', parameter: 0, point: 0, hp: 0},
  },
  12: {
    sp_legend_lesson: {value: 'sp_legend_lesson', text: 'SPレジェンドレッスン', parameter: 190, bonus_parameter: 120, point: 80, hp: 0},
    legend_lesson: {value: 'legend_lesson', text: 'レジェンドレッスン', parameter: 155, bonus_parameter: 175, point: 80, hp: 0},
    rest: {value: 'rest', text: '休む', parameter: 0, point: 0, hp: 0},
  },
  13: {
    outing: {value: 'outing', text: 'おでかけ', parameter: 0, point: -80, hp: 0},
    consultation: {value: 'consultation', text: '相談', parameter: 0, point: 0, hp: 0},
    gift: {value: 'gift', text: '活動支給', parameter: 0, point: 180, hp: 0},
    rest: {value: 'rest', text: '休む', parameter: 0, point: 0, hp: 0},
  },
  14: {
    sp_legend_lesson: {value: 'sp_legend_lesson', text: 'SPレジェンドレッスン', parameter: 280, bonus_parameter: 180, point: 80, hp: 0},
    legend_lesson: {value: 'legend_lesson', text: 'レジェンドレッスン', parameter: 245, bonus_parameter: 135, point: 80, hp: 0},
    rest: {value: 'rest', text: '休む', parameter: 0, point: 0, hp: 0},
  },
  15: {
    class: {value: 'class', text: '授業', parameter: 200, point: 0, hp: -8},
    rest: {value: 'rest', text: '休む', parameter: 0, point: 0, hp: 0},
  },
  16: {
    sp_legend_lesson: {value: 'sp_legend_lesson', text: 'SPレジェンドレッスン', parameter: 455, bonus_parameter: 255, point: 80, hp: 0},
    legend_lesson: {value: 'legend_lesson', text: 'レジェンドレッスン', parameter: 395, bonus_parameter: 235, point: 80, hp: 0},
    rest: {value: 'rest', text: '休む', parameter: 0, point: 0, hp: 0},
  },
  17: {
    consultation: {value: 'consultation', text: '相談', parameter: 0, point: 0, hp: 0},
    coaching: {value: 'coaching', text: '特別指導', parameter: 0, point: 0, hp: 0},
    rest: {value: 'rest', text: '休む', parameter: 0, point: 0, hp: 0},
  },
  18: {
    exam_2: {value: 'exam_2', text: '最終試験', parameter: 120, point: 0, hp: 0},
  },
};
const resultData = resultDataList;
const resultCalcList1 = resultScoreCalcList['hajime_legend_exam_1'];
const resultCalcList2 = resultScoreCalcList['hajime_legend_exam_2'];

const abilityBasicParameterUpListAll = abilityBasicParameterUpList;
const abilityExtraParameterUpListAll = abilityExtraParameterUpList;

let inputData = ref(props.inputData);
let basicData = ref(props.basicData);

let scheduleDetailCount = ref({});
let scheduleDetailData = ref({});
let resultScoreList = ref({});
let challengePItemMaxPushSum = ref(0);

let commonInputModalChallengePItemOpen = ref(false);
let commonInputModalSupportCardPItemOpen = ref(false);
let commonInputModalSupportCardAbilityOpen = ref(false);
let scheduleHpAndPointInputModalOpen = ref(false);
let examResultInputModalOpen = ref(false);

const updateInputData = () => {
  emit('input-data-update', inputData.value);
}
const getBonusIncludedParameter = (parameter, parameterBonus) => {
  return Math.floor(
      parameter +
      parameter * (parameterBonus / 10).toFixed(1) / 100
  );
};
const getExamResultScore = (score, resultCalcList) => {
  let resultScore = 0;
  for (let i in resultCalcList) {
    if (score >= resultCalcList[i]['score']) {
      resultScore = Math.trunc((score * resultCalcList[i]['magnification']) + resultCalcList[i]['addition']);
      break;
    }
  }
  return resultScore;
}
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
    exam: 0,
  };
  if (inputData.value['organization']['produce_idol']['id'] !== null && basicData.value['produce_idol']) {
    for (let week = 1; week <= 18; week++) {
      let inputScheduleData = inputData.value['planning']['schedule'][week];
      switch (inputScheduleData['schedule_detail']) {
        case 'legend_lesson':
          scheduleDetailCount.value['lesson'][inputScheduleData['type']]++;
          scheduleDetailCount.value['normal_lesson'][inputScheduleData['type']]++;
          break;
        case 'sp_legend_lesson':
          scheduleDetailCount.value['lesson'][inputScheduleData['type']]++;
          scheduleDetailCount.value['sp_lesson'][inputScheduleData['type']]++;
          break;
        case 'class':
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
        case 'exam_2':
          if (scheduleDetailCount.value['exam'] < 2) {
            scheduleDetailCount.value['exam']++;
          }
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
    }
    let coachingCount = 0;

    // 1~18週目
    for (let week = 1; week <= 18; week++) {
      let inputScheduleData = inputData.value['planning']['schedule'][week];
      let basicParameter = scheduleData[week][inputScheduleData['schedule_detail']]['parameter'];
      let basicPoint = scheduleData[week][inputScheduleData['schedule_detail']]['point'];
      let pointUpRate = 0;

      // スケジュール内容での獲得パラメータ
      if (inputScheduleData['schedule_detail'] === 'legend_lesson' || inputScheduleData['schedule_detail'] === 'sp_legend_lesson') {
        let bonusParameter = Math.trunc((scheduleData[week][inputScheduleData['schedule_detail']]['bonus_parameter'] + challengePItemMaxPushSum.value) / 3);
        let bonusParameterRemainder = (scheduleData[week][inputScheduleData['schedule_detail']]['bonus_parameter'] + challengePItemMaxPushSum.value) % 3;
        if (inputScheduleData['type'] === 'vocal') {
          parameter['vocal'] += getBonusIncludedParameter((basicParameter + bonusParameter + bonusParameterRemainder), basicData.value['parameter']['bonus_vocal']);
          parameter['dance'] += getBonusIncludedParameter(bonusParameter, basicData.value['parameter']['bonus_dance']);
          parameter['visual'] += getBonusIncludedParameter(bonusParameter, basicData.value['parameter']['bonus_visual']);
        } else if (inputScheduleData['type'] === 'dance') {
          parameter['vocal'] += getBonusIncludedParameter(bonusParameter, basicData.value['parameter']['bonus_vocal']);
          parameter['dance'] += getBonusIncludedParameter((basicParameter + bonusParameter + bonusParameterRemainder), basicData.value['parameter']['bonus_dance']);
          parameter['visual'] += getBonusIncludedParameter(bonusParameter, basicData.value['parameter']['bonus_visual']);
        } else if (inputScheduleData['type'] === 'visual') {
          parameter['vocal'] += getBonusIncludedParameter(bonusParameter, basicData.value['parameter']['bonus_vocal']);
          parameter['dance'] += getBonusIncludedParameter(bonusParameter, basicData.value['parameter']['bonus_dance']);
          parameter['visual'] += getBonusIncludedParameter((basicParameter + bonusParameter + bonusParameterRemainder), basicData.value['parameter']['bonus_visual']);
        }
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
      }

      // サポートカードアビリティでの獲得パラメータ
      switch (inputScheduleData['schedule_detail']) {
        case 'legend_lesson':
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
        case 'sp_legend_lesson':
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
          if (basicData.value['ability_list'][abilities.ALL_TYPE_SP_LESSON_HP_RECOVER]) {
            parameter['hp'] += basicData.value['ability_list'][abilities.ALL_TYPE_SP_LESSON_HP_RECOVER]['vocal'];
          }
          break;
        case 'class':
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
            parameter['hp'] += basicData.value['ability_list'][abilities.GIFT_HP_RECOVER]['vocal'];
          }
          break;
        case 'outing':
          // パラメータ
          if (basicData.value['ability_list'][abilities.OUTING_PARAMETER_UP]) {
            parameter['vocal'] += basicData.value['ability_list'][abilities.OUTING_PARAMETER_UP]['vocal'];
            parameter['dance'] += basicData.value['ability_list'][abilities.OUTING_PARAMETER_UP]['dance'];
            parameter['visual'] += basicData.value['ability_list'][abilities.OUTING_PARAMETER_UP]['visual'];
          }

          // 体力
          parameter['hp'] += Math.round(maxHp * 0.4);
          break;
        case 'consultation':
          // パラメータ
          if (basicData.value['ability_list'][abilities.CONSULTATION_PARAMETER_UP]) {
            parameter['vocal'] += basicData.value['ability_list'][abilities.CONSULTATION_PARAMETER_UP]['vocal'];
            parameter['dance'] += basicData.value['ability_list'][abilities.CONSULTATION_PARAMETER_UP]['dance'];
            parameter['visual'] += basicData.value['ability_list'][abilities.CONSULTATION_PARAMETER_UP]['visual'];
          }
          break;
        case 'coaching':
          // パラメータ
          if (basicData.value['ability_list'][abilities.COACHING_PARAMETER_UP] && coachingCount < 3) {
            parameter['vocal'] += basicData.value['ability_list'][abilities.COACHING_PARAMETER_UP]['vocal'];
            parameter['dance'] += basicData.value['ability_list'][abilities.COACHING_PARAMETER_UP]['dance'];
            parameter['visual'] += basicData.value['ability_list'][abilities.COACHING_PARAMETER_UP]['visual'];
          }
          coachingCount++;
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
          parameter['hp'] += Math.round(maxHp * 0.7);
          if (basicData.value['ability_list'][abilities.EXAM_HP_RECOVER]) {
            parameter['hp'] += basicData.value['ability_list'][abilities.EXAM_HP_RECOVER]['vocal'];
          }
          break;
        case 'exam_2':
          // パラメータ
          if (basicData.value['ability_list'][abilities.EXAM_PARAMETER_UP]) {
            parameter['vocal'] += basicData.value['ability_list'][abilities.EXAM_PARAMETER_UP]['vocal'];
            parameter['dance'] += basicData.value['ability_list'][abilities.EXAM_PARAMETER_UP]['dance'];
            parameter['visual'] += basicData.value['ability_list'][abilities.EXAM_PARAMETER_UP]['visual'];
          }

          // 体力
          parameter['hp'] += Math.round(maxHp * 0.7);
          break;
        default:
          break;
      }

      // Pポイント調整処理
      parameter['point'] += inputScheduleData['point'];

      // 体力調整処理
      parameter['hp'] += inputScheduleData['hp'];
      if (parameter['hp'] < 0) {
        parameter['hp'] = 0;
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
    // チャレンジPアイテム
    let challengePItemId = inputData.value['planning']['challenge_p_item'][1];
    if (challengePItemId >= 32004 && challengePItemId <= 32006) {
      parameter[getPItemDetail(challengePItemId).type] += getChallengePItemParameterSum(challengePItemId);
    }

    // Pアイテム
    for (let i in inputData.value['planning']['support_card_p_item']) {
      if (basicData.value['support_card'][i]) {
        parameter[basicData.value['support_card'][i]['type']] += getPItemParameterSum(i);
      }
    }

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
    let resultScore1 = getExamResultScore(inputData.value['planning']['exam'][1], resultCalcList1);
    let resultScore2 = getExamResultScore(inputData.value['planning']['exam'][2], resultCalcList2);
    scheduleDetailData.value['result'] = {...parameter};
    scheduleDetailData.value['result']['sum'] = parameter['vocal'] + parameter['dance'] + parameter['visual'];
    scheduleDetailData.value['result']['resultScore'] = Math.trunc(scheduleDetailData.value['result']['sum'] * 2.1) + resultScore1 + resultScore2;
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
  let requiredPoint = resultPoint - parameter;

  for (let i in resultCalcList2) {
    let requiredScore = Math.trunc((requiredPoint - resultCalcList2[i]['addition']) / resultCalcList2[i]['magnification']);
    if (requiredScore >= 2000001) {
      return '不可能';
    }
    if (requiredScore >= resultCalcList2[i]['score']) {
      return requiredScore;
    }
  }
  return 0;
}
const updateResultScoreList = () => {
  if (scheduleDetailData.value['result']) {
    let parameter = Math.trunc(scheduleDetailData.value['result']['sum'] * 2.1);
    let score1 = getExamResultScore(inputData.value['planning']['exam'][1], resultCalcList1);
    for (let rank in resultData) {
      resultScoreList.value[rank] = getResultScore(resultData[rank]['point'], parameter + score1);
    }
  } else {
    resultScoreList.value = {};
  }
}
const getChallengePItemDetail = (categoryType, plan) => {
  return items.getHajimeLegendChallengeItem(categoryType, plan)
}
const updateChallengePItemMaxPushSum = () => {
  challengePItemMaxPushSum.value = 0;
  for (let i in inputData.value['planning']['challenge_p_item']) {
    if (inputData.value['planning']['challenge_p_item'][i] > 0) {
      challengePItemMaxPushSum.value += getPItemDetail(inputData.value['planning']['challenge_p_item'][i]).event_other;
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
const getChallengePItemParameterSum = (id) => {
  if (id >= 32004 && id <= 32006) {
    return getPItemDetail(id).event_parameter * inputData.value['planning']['produce_p_item'][1];
  }
  return 0;
}
const getPItemParameterSum = (index) => {
  if (!basicData.value['support_card'][index] || basicData.value['support_card'][index]['event_1'] !== 'get_unique_p_item') {
    return 0;
  }
  return getPItemDetail(basicData.value['support_card'][index]['p_item_id']).event_parameter * inputData.value['planning']['support_card_p_item'][index];
}
const getBasicPItemDetail = (plan) => {
  return items.getHajimeLegendBasicLessonItem(plan);
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
  if (pItem.event === null || pItem.event.includes('parameter_up')) {
    return pItem.event_count;
  } else if (pItem.event.includes('lesson')) {
    return Math.min(pItem.event_count, scheduleDetailCount.value[pItem.event][pItem.type]);
  } else {
    return Math.min(pItem.event_count, scheduleDetailCount.value[pItem.event]);
  }
}
const inputScheduleHpAndPointAdjustment = (index) => {
  scheduleHpAndPointInputModalOpen.value = index;
}
const closeScheduleHpAndPointAdjustment = (hp, point) => {
  if ((hp !== null) && (point !== null)) {
    inputData.value['planning']['schedule'][scheduleHpAndPointInputModalOpen.value]['hp'] = hp;
    inputData.value['planning']['schedule'][scheduleHpAndPointInputModalOpen.value]['point'] = point;
    updateInputData();
  }
  scheduleHpAndPointInputModalOpen.value = false;
}
const inputChallengePItemCount = () => {
  commonInputModalChallengePItemOpen.value = true;
}
const closeChallengePItemCount = (inputValue) => {
  if (inputValue !== null) {
    inputData.value['planning']['produce_p_item'][1] = inputValue;
    updateInputData();
  }
  commonInputModalChallengePItemOpen.value = false;
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
const inputExamResult = () => {
  examResultInputModalOpen.value = true;
}
const closeExamResult = (score1, score2) => {
  if (score1 !== null && score2 !== null) {
    inputData.value['planning']['exam'][1] = score1;
    inputData.value['planning']['exam'][2] = score2;
    updateInputData();
  }
  examResultInputModalOpen.value = false;
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
            <table class="table schedule-hajime">
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
              <tr v-for="i in 18" :key="i">
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
                <td class="table-data number hp input" @click="inputScheduleHpAndPointAdjustment(i)">
                  <span class="table-data-text" v-if="scheduleDetailData[i]">{{ scheduleDetailData[i]['hp'] }}</span>
                  <span class="table-data-text" v-else>0</span>
                </td>
                <td class="table-data number point input" @click="inputScheduleHpAndPointAdjustment(i)">
                  <span class="table-data-text" v-if="scheduleDetailData[i]">{{ scheduleDetailData[i]['point'] }}</span>
                  <span class="table-data-text" v-else>0</span>
                </td>
                <Teleport to="#modal-area">
                  <ScheduleHpAndPointInputModal
                      v-if="scheduleHpAndPointInputModalOpen === i"
                      :week="i"
                      :max-hp="basicData['parameter']['init_hp']"
                      :hp="inputData['planning']['schedule'][i]['hp']"
                      :point="inputData['planning']['schedule'][i]['point']"
                      @input-close="closeScheduleHpAndPointAdjustment"
                  />
                </Teleport>
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
                <td class="table-data number hp"></td>
                <td class="table-data number point"></td>
              </tr>
              <tr>
                <th class="table-header last"></th>
                <td class="table-data detail last"><span class="table-data-text font-bold last">最終評価</span></td>
                <td class="table-data type last">
                  <span class="table-data-text font-bold last" v-if="scheduleDetailData['result']">{{ scheduleDetailData['result']['resultScore'] }}</span>
                  <span class="table-data-text font-bold last" v-else>0</span>
                </td>
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
                <td class="table-data number hp last"></td>
                <td class="table-data number point last"></td>
              </tr>
              </tbody>
            </table>
            <table class="table exam">
              <thead>
              <tr>
                <th class="table-header detail"><span class="table-header-text"></span></th>
                <th class="table-header detail"><span class="table-header-text">獲得スコア</span></th>
                <th class="table-header detail"><span class="table-header-text">獲得評価値</span></th>
              </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="table-data detail">
                    <span class="table-data-text">中間試験</span>
                  </td>
                  <td class="table-data detail input" @click="inputExamResult">
                    <span class="table-data-text">{{ inputData['planning']['exam'][1] }}</span>
                  </td>
                  <td class="table-data detail input" @click="inputExamResult">
                    <span class="table-data-text">{{ getExamResultScore(inputData['planning']['exam'][1], resultCalcList1) }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="table-data detail">
                    <span class="table-data-text">最終試験</span>
                  </td>
                  <td class="table-data detail input" @click="inputExamResult">
                    <span class="table-data-text">{{ inputData['planning']['exam'][2] }}</span>
                  </td>
                  <td class="table-data detail input" @click="inputExamResult">
                    <span class="table-data-text">{{ getExamResultScore(inputData['planning']['exam'][2], resultCalcList2) }}</span>
                  </td>
                </tr>
                <Teleport to="#modal-area">
                  <ExamResultInputModal
                      v-if="examResultInputModalOpen"
                      :score_1="inputData['planning']['exam'][1]"
                      :score_2="inputData['planning']['exam'][2]"
                      @input-close="closeExamResult"
                  />
                </Teleport>
              </tbody>
            </table>
          </div>
          <div class="result">
            <table class="table result">
              <thead>
              <tr>
                <th class="table-header detail"><span class="table-header-text">最終試験必要スコア</span></th>
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
                    <span class="table-data-text">{{ challengePItemMaxPushSum }}</span>
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
                <tr v-if="inputData['planning']['challenge_p_item'][1] >= 32004 && inputData['planning']['challenge_p_item'][1] <= 32006">
                  <td class="table-data" v-bind:class="getPItemDetail(inputData['planning']['challenge_p_item'][1]).type">
                    <span class="table-data-text">{{ getPItemDetail(inputData['planning']['challenge_p_item'][1]).name }}</span>
                  </td>
                  <td class="table-data number" v-bind:class="getPItemDetail(inputData['planning']['challenge_p_item'][1]).type">
                    <span class="table-data-text">{{ getPItemDetail(inputData['planning']['challenge_p_item'][1]).event_parameter }}</span>
                  </td>
                  <td class="table-data number input" v-bind:class="getPItemDetail(inputData['planning']['challenge_p_item'][1]).type" @click="inputChallengePItemCount">
                    <span class="table-data-text font-bold">{{ inputData['planning']['produce_p_item'][1] }}</span>
                    <Teleport to="#modal-area">
                      <CommonInputModal
                          v-if="commonInputModalChallengePItemOpen"
                          :input-value="inputData['planning']['produce_p_item'][1] ? inputData['planning']['produce_p_item'][1] : 0"
                          :min-value="0"
                          :max-value="getPItemDetail(inputData['planning']['challenge_p_item'][1]).event_count"
                          :headline="'発動回数を編集'"
                          :description="getPItemDetail(inputData['planning']['challenge_p_item'][1]).name + 'の発動回数'"
                          @input-close="closeChallengePItemCount"
                      />
                    </Teleport>
                  </td>
                  <td class="table-data number" v-bind:class="getPItemDetail(inputData['planning']['challenge_p_item'][1]).type">
                    <span class="table-data-text">{{ getChallengePItemParameterSum(inputData['planning']['challenge_p_item'][1]) }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="table-data detail">
                    <select class="table-select" v-model="inputData['planning']['produce_p_item'][2]" @change="updateInputData">
                      <option class="table-option" v-bind:value="26">はつぼし記章</option>
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
  <ScheduleSupportCardCalc
      :input-data="inputData"
      :basic-data="basicData"
      :schedule-data="scheduleData"
      :schedule-detail-count="scheduleDetailCount"
      :support-cards="supportCards"
  />
</template>

<script setup>
import {ref, watch} from "vue";
import {resultDataList, resultScoreCalcList} from "@/consts/resultConst";
import {parameterList, fanList} from "@/consts/auditionConst";

const props = defineProps(['idols']);
const idols = props.idols;

let produceType = ref('hajime_master');
let inputHajimeMaster = ref({
  vocal: 0,
  dance: 0,
  visual: 0,
  score: 0,
});
let inputNiaMaster = ref({
  idol_id: 1,
  audition_bonus: 40,
  vocal: 0,
  dance: 0,
  visual: 0,
  vocal_bonus: 0,
  dance_bonus: 0,
  visual_bonus: 0,
  fan: 0,
  score: 0,
});
let resultListHajimeMaster = ref({});
let resultListNiaMaster = ref({});
let resultHajimeMaster = ref('評価ランクD: 0');
let resultNiaMaster = ref('評価ランクD: 0');

const getBonusIncludedParameter = (parameter, parameterBonus) => {
  return Math.floor(
      parameter +
      (parameter * parameterBonus).toFixed(1) / 100
  );
};
const calcLerp = (x, x0, x1, y0, y1) => {
  return Math.floor(y0 + (y1 - y0) * (x - x0) / (x1 - x0));
}

const getResultScoreHajimeMaster = (resultPoint, parameter) => {
  let requiredPoint = resultPoint - parameter - 1700;

  for (let i in resultScoreCalcList['hajime_master']) {
    let requiredScore = Math.trunc((requiredPoint - resultScoreCalcList['hajime_master'][i]['addition']) / resultScoreCalcList['hajime_master'][i]['magnification']);
    if (requiredScore >= resultScoreCalcList['hajime_master'][i]['score']) {
      return requiredScore;
    }
  }
  return 0;
}
const updateResultHajimeMaster = () => {
  let parameter = Math.trunc(
      (
          Math.min(1800, inputHajimeMaster.value['vocal'] + 30) +
          Math.min(1800, inputHajimeMaster.value['dance'] + 30) +
          Math.min(1800, inputHajimeMaster.value['visual'] + 30)
      ) * 2.3
  );

  let score = 0;
  for (let i in resultScoreCalcList['hajime_master']) {
    if (inputHajimeMaster.value['score'] >= resultScoreCalcList['hajime_master'][i]['score']) {
      score = Math.trunc((inputHajimeMaster.value['score'] * resultScoreCalcList['hajime_master'][i]['magnification']) + resultScoreCalcList['hajime_master'][i]['addition']);
      break;
    }
  }

  let result = parameter + score + 1700;
  let rank = 'D';

  for (let i in resultDataList) {
    if (result >= resultDataList[i]['point']) {
      rank = resultDataList[i]['rank'];
      break;
    }
  }

  resultHajimeMaster.value = `評価ランク${rank}: ${result}`;

  for (let rank in resultDataList) {
    resultListHajimeMaster.value[rank] = getResultScoreHajimeMaster(resultDataList[rank]['point'], parameter);
  }
};

const getResultScoreNiaMaster = (resultPoint, parameter) => {
  let requiredPoint = resultPoint - parameter;

  for (let i in resultScoreCalcList['nia_master']) {
    let requiredScore = Math.trunc((requiredPoint - resultScoreCalcList['nia_master'][i]['addition']) / resultScoreCalcList['nia_master'][i]['magnification']);
    if (requiredScore >= resultScoreCalcList['nia_master'][i]['fan']) {
      return requiredScore;
    }
  }
  return 0;
}
const updateResultNiaMaster = () => {
  let idol = idols.getIdolFromId(inputNiaMaster.value['idol_id']);
  let auditionVocal = parameterList['nia_master'][idol['parameter_type']][3]['max'][`type_${idol['vocal_priority']}`];
  let auditionDance = parameterList['nia_master'][idol['parameter_type']][3]['max'][`type_${idol['dance_priority']}`];
  let auditionVisual = parameterList['nia_master'][idol['parameter_type']][3]['max'][`type_${idol['visual_priority']}`];
  let vocal = inputNiaMaster.value['vocal'] + getBonusIncludedParameter(auditionVocal, inputNiaMaster.value['vocal_bonus']) + Math.floor(auditionVocal * inputNiaMaster.value['audition_bonus'] / 100);
  let dance = inputNiaMaster.value['dance'] + getBonusIncludedParameter(auditionDance, inputNiaMaster.value['dance_bonus']) + Math.floor(auditionDance * inputNiaMaster.value['audition_bonus'] / 100);
  let visual = inputNiaMaster.value['visual'] + getBonusIncludedParameter(auditionVisual, inputNiaMaster.value['visual_bonus']) + Math.floor(auditionVisual * inputNiaMaster.value['audition_bonus'] / 100);
  let parameter = Math.trunc(
      (
          Math.min(2300, vocal) +
          Math.min(2300, dance) +
          Math.min(2300, visual)
      ) * 2.3
  );

  let auditionFan = 0;
  if (inputNiaMaster.value['score'] > fanList['nia_master'][3]['score_max']) {
    auditionFan = fanList['nia_master'][3]['max'];
  } else if (inputNiaMaster.value['score'] > fanList['nia_master'][3]['score_2']) {
    auditionFan = calcLerp(
        inputNiaMaster.value['score'],
        fanList['nia_master'][3]['score_2'] + 1,
        fanList['nia_master'][3]['score_max'],
        fanList['nia_master'][3]['threshold_2'] + 1,
        fanList['nia_master'][3]['max']
    );
  } else if (inputNiaMaster.value['score'] > fanList['nia_master'][3]['score_1']) {
    auditionFan = calcLerp(
        inputNiaMaster.value['score'],
        fanList['nia_master'][3]['score_1'] + 1,
        fanList['nia_master'][3]['score_2'],
        fanList['nia_master'][3]['threshold_1'] + 1,
        fanList['nia_master'][3]['threshold_2']
    );
  } else {
    auditionFan = calcLerp(
        inputNiaMaster.value['score'],
        0,
        fanList['nia_master'][3]['score_1'],
        0,
        fanList['nia_master'][3]['threshold_1']
    );
  }
  let fan = inputNiaMaster.value['fan'] + auditionFan;

  let score = 0;
  for (let i in resultScoreCalcList['nia_master']) {
    if (fan >= resultScoreCalcList['nia_master'][i]['fan']) {
      score = Math.trunc((fan * resultScoreCalcList['nia_master'][i]['magnification']) + resultScoreCalcList['nia_master'][i]['addition']);
      break;
    }
  }

  let result = parameter + score;
  let rank = 'D';

  for (let i in resultDataList) {
    if (result >= resultDataList[i]['point']) {
      rank = resultDataList[i]['rank'];
      break;
    }
  }

  resultNiaMaster.value = `評価ランク${rank}: ${result}`;

  for (let rank in resultDataList) {
    resultListNiaMaster.value[rank] = getResultScoreNiaMaster(resultDataList[rank]['point'], parameter);
  }
};
</script>

<template>
  <div class="result-score-area">
    <div class="description-area">
      <span class="description">最終プロデュース評価の計算ができます。</span>
    </div>
    <div class="result-score">
      <div class="input-area">
        <div class="produce-type-area">
          <span class="font-bold">プロデュース選択</span>
          <div class="produce-type-select">
            <select class="basic-select" v-model="produceType">
              <option value="hajime_master">定期公演『初』 マスター</option>
              <option value="nia_master">NEXT IDOL AUDITION マスター</option>
            </select>
          </div>
        </div>
        <div class="calc-area hajime-master" v-show="produceType === 'hajime_master'">
          <span class="font-bold">最終試験直前のパラメータ</span>
          <div class="parameter-area">
            <div class="parameter vocal">
              <label class="basic-input-number-name font-bold">ボーカル</label>
              <input class="basic-input-number vocal" type="number" min="0" max="1800" v-model="inputHajimeMaster['vocal']" @change="updateResultHajimeMaster">
            </div>
            <div class="parameter dance">
              <label class="basic-input-number-name font-bold">ダンス</label>
              <input class="basic-input-number dance" type="number" min="0" max="1800" v-model="inputHajimeMaster['dance']" @change="updateResultHajimeMaster">
            </div>
            <div class="parameter visual">
              <label class="basic-input-number-name font-bold">ビジュアル</label>
              <input class="basic-input-number visual" type="number" min="0" max="1800" v-model="inputHajimeMaster['visual']" @change="updateResultHajimeMaster">
            </div>
          </div>
          <span class="font-bold">最終試験で獲得したスコア</span>
          <div class="score-area">
            <div class="score">
              <input class="basic-input-number score" type="number" min="0" v-model="inputHajimeMaster['score']" @change="updateResultHajimeMaster">
            </div>
          </div>
        </div>
        <div class="calc-area nia-master" v-show="produceType === 'nia_master'">
          <span class="font-bold">プロデュースアイドル</span>
          <div class="produce-idols-select">
            <select class="basic-select" v-model="inputNiaMaster['idol_id']" @change="updateResultNiaMaster">
              <option v-for="idol in idols.getAllIdol()" v-bind:value="idol.id">{{ idol.name }}</option>
            </select>
          </div>
          <span class="font-bold">オーディションボーナス</span>
          <div class="audition-area">
            <div class="audition">
              <input class="basic-input-number" type="number" min="0" max="40" step="5" v-model="inputNiaMaster['audition_bonus']" @change="updateResultNiaMaster">
            </div>
          </div>
          <span class="font-bold">最終オーディション直前のパラメータ</span>
          <div class="parameter-area">
            <div class="parameter vocal">
              <label class="basic-input-number-name font-bold">ボーカル</label>
              <input class="basic-input-number vocal" type="number" min="0" max="2300" v-model="inputNiaMaster['vocal']" @change="updateResultNiaMaster">
            </div>
            <div class="parameter dance">
              <label class="basic-input-number-name font-bold">ダンス</label>
              <input class="basic-input-number dance" type="number" min="0" max="2300" v-model="inputNiaMaster['dance']" @change="updateResultNiaMaster">
            </div>
            <div class="parameter visual">
              <label class="basic-input-number-name font-bold">ビジュアル</label>
              <input class="basic-input-number visual" type="number" min="0" max="2300" v-model="inputNiaMaster['visual']" @change="updateResultNiaMaster">
            </div>
          </div>
          <span class="font-bold">パラメータボーナス</span>
          <div class="parameter-area">
            <div class="parameter vocal">
              <label class="basic-input-number-name font-bold">ボーカル</label>
              <input class="basic-input-number vocal" type="number" min="0" step="0.1" v-model="inputNiaMaster['vocal_bonus']" @change="updateResultNiaMaster">
            </div>
            <div class="parameter dance">
              <label class="basic-input-number-name font-bold">ダンス</label>
              <input class="basic-input-number dance" type="number" min="0" step="0.1" v-model="inputNiaMaster['dance_bonus']" @change="updateResultNiaMaster">
            </div>
            <div class="parameter visual">
              <label class="basic-input-number-name font-bold">ビジュアル</label>
              <input class="basic-input-number visual" type="number" min="0" step="0.1" v-model="inputNiaMaster['visual_bonus']" @change="updateResultNiaMaster">
            </div>
          </div>
          <span class="font-bold">最終オーディション直前のファン数</span>
          <div class="fan-area">
            <div class="fan">
              <input class="basic-input-number fan" type="number" min="0" v-model="inputNiaMaster['fan']" @change="updateResultNiaMaster">
            </div>
          </div>
          <span class="font-bold">最終試験で獲得したスコア</span>
          <div class="score-area">
            <div class="score">
              <input class="basic-input-number score" type="number" min="0" v-model="inputNiaMaster['score']" @change="updateResultNiaMaster">
            </div>
          </div>
        </div>
      </div>
      <div class="result-area">
        <div class="result" v-show="produceType === 'hajime_master'">
          <span class="common-headline font-bold">{{ resultHajimeMaster }}</span>
          <div class="annotation-area">
            <span>※最終試験順位が1位の場合</span>
          </div>
        </div>
        <div class="result" v-show="produceType === 'nia_master'">
          <span class="common-headline font-bold">{{ resultNiaMaster }}</span>
          <div class="annotation-area">
            <span>※各タイプのパラメータ上昇が最大値の場合</span>
          </div>
        </div>
        <table class="table result" v-show="produceType === 'hajime_master'">
          <thead>
          <tr>
            <th class="table-header detail"><span class="table-header-text">最終試験獲得スコア</span></th>
            <th class="table-header point"><span class="table-header-text">評価ランク</span></th>
            <th class="table-header point"><span class="table-header-text">評価値</span></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="result in resultDataList">
            <td class="table-data number detail">
              <span class="table-data-text" v-if="resultListHajimeMaster[result.rank]">{{ resultListHajimeMaster[result.rank] }}</span>
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
        <table class="table result" v-show="produceType === 'nia_master'">
          <thead>
          <tr>
            <th class="table-header detail"><span class="table-header-text">必要ファン数</span></th>
            <th class="table-header point"><span class="table-header-text">評価ランク</span></th>
            <th class="table-header point"><span class="table-header-text">評価値</span></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="result in resultDataList">
            <td class="table-data number detail">
              <span class="table-data-text" v-if="resultListNiaMaster[result.rank]">{{ resultListNiaMaster[result.rank] }}</span>
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
</template>

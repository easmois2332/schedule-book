<script setup>
import {ref} from "vue";
import {resultScoreCalcList} from "@/consts/resultConst";

const props = defineProps(['score_1', 'score_2']);
const resultCalcList1 = resultScoreCalcList['hajime_legend_exam_1'];
const resultCalcList2 = resultScoreCalcList['hajime_legend_exam_2'];

let inputData = ref({
  score_1: props.score_1,
  score_2: props.score_2,
});

const buttonMinus = (score) => {
  if (inputData.value[score] > 0) {
    inputData.value[score]--;
  } else {
    inputData.value[score] = 0;
  }
}
const buttonPlus = (score, max) => {
  if (inputData.value[score] < max) {
    inputData.value[score]++;
  } else {
    inputData.value[score] = max;
  }
}
</script>

<template>
  <div class="small-modal-window-area" @click.self="$emit('input-close', Number(inputData['score_1']), Number(inputData['score_2']))">
    <div class="exam-result-input-modal">
      <div class="headline-area">
        <div class="headline-title-area">
          <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#333333">
            <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
          </svg>
          <span class="headline-text">試験で獲得した評価値を調整</span>
        </div>
        <div class="headline-close-button-area">
          <button class="headline-close-button" @click="$emit('input-close', null, null, null, null)">
            <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#333333">
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="content-area">
        <div class="color-headline">
          <span class="common-headline-text font-bold">中間試験で獲得したスコア</span>
        </div>
        <div class="exam1-area">
          <div class="score-input-area">
            <div class="input-area">
              <div class="minus-button">
                <button class="common-button minus" @click="buttonMinus('score_1')">
                  <span class="common-button-name">－</span>
                </button>
              </div>
              <input class="basic-input-number" type="number" min="0" v-bind:max="resultCalcList1[0]['score']" v-model="inputData['score_1']">
              <div class="plus-button">
                <button class="common-button plus" @click="buttonPlus('score_1', resultCalcList1[0]['score'])">
                  <span class="common-button-name">＋</span>
                </button>
              </div>
            </div>
            <div class="input-area">
              <input class="basic-input-range" type="range" v-bind:min="0" v-bind:max="resultCalcList1[0]['score']" v-model="inputData['score_1']">
            </div>
          </div>
          <div class="score-adjustment-button-area">
            <div class="adjustment-button">
              <button class="common-button adjustment" @click="inputData['score_1'] = 50001">
                <span class="common-button-name">50001</span>
              </button>
            </div>
            <div class="adjustment-button">
              <button class="common-button adjustment" @click="inputData['score_1'] = 60001">
                <span class="common-button-name">60001</span>
              </button>
            </div>
            <div class="adjustment-button">
              <button class="common-button adjustment" @click="inputData['score_1'] = 200001">
                <span class="common-button-name">200001</span>
              </button>
            </div>
          </div>
        </div>
        <div class="color-headline">
          <span class="common-headline-text font-bold">最終試験で獲得したスコア</span>
        </div>
        <div class="exam2-area">
          <div class="score-input-area">
            <div class="input-area">
              <div class="minus-button">
                <button class="common-button minus" @click="buttonMinus('score_2')">
                  <span class="common-button-name">－</span>
                </button>
              </div>
              <input class="basic-input-number" type="number" min="0" v-bind:max="resultCalcList2[0]['score']" v-model="inputData['score_2']">
              <div class="plus-button">
                <button class="common-button plus" @click="buttonPlus('score_2', resultCalcList2[0]['score'])">
                  <span class="common-button-name">＋</span>
                </button>
              </div>
            </div>
            <div class="input-area">
              <input class="basic-input-range" type="range" v-bind:min="0" v-bind:max="resultCalcList2[0]['score']" v-model="inputData['score_2']">
            </div>
          </div>
          <div class="score-adjustment-button-area">
            <div class="adjustment-button">
              <button class="common-button adjustment" @click="inputData['score_2'] = 500001">
                <span class="common-button-name">500001</span>
              </button>
            </div>
            <div class="adjustment-button">
              <button class="common-button adjustment" @click="inputData['score_2'] = 600001">
                <span class="common-button-name">600001</span>
              </button>
            </div>
            <div class="adjustment-button">
              <button class="common-button adjustment" @click="inputData['score_2'] = 2000001">
                <span class="common-button-name">2000001</span>
              </button>
            </div>
          </div>
        </div>
        <div class="edit-button-area">
          <div class="edit-button">
            <button class="common-button" @click="$emit('input-close', Number(inputData['score_1']), Number(inputData['score_2']))">
              <span class="common-button-name">保存</span>
            </button>
          </div>
          <div class="edit-button">
            <button class="common-button" @click="$emit('input-close', null, null)">
              <span class="common-button-name">キャンセル</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {parameterList, fanList} from "@/consts/auditionConst";

const props = defineProps(['vocal', 'dance', 'visual', 'fan', 'index', 'produceIdol']);
const index = props.index;
const produceIdol = props.produceIdol;

let inputData = ref({
  vocal: props.vocal,
  dance: props.dance,
  visual: props.visual,
  fan: props.fan,
  score: 0,
});

const parameterInputData = parameterList['nia_master'][produceIdol['parameter_type']][index];
const fanInputData = fanList['nia_master'][index];

const typeData = {
  1: {name: 'ボーカル', value: 'vocal'},
  2: {name: 'ダンス', value: 'dance'},
  3: {name: 'ビジュアル', value: 'visual'},
}
const auditionData = {
  1: {name: '1次オーディション'},
  2: {name: '2次オーディション'},
  3: {name: '最終オーディション'},
};

const buttonMinus = (type) => {
  if (inputData.value[type] > 0) {
    inputData.value[type]--;
  } else {
    inputData.value[type] = 0;
  }
}
const buttonPlus = (type, max) => {
  if (inputData.value[type] < max) {
    inputData.value[type]++;
  } else {
    inputData.value[type] = max;
  }
}
const calcLerp = (x, x0, x1, y0, y1) => {
  return Math.floor(y0 + (y1 - y0) * (x - x0) / (x1 - x0));
}
const buttonCalc = () => {
  if (inputData.value['score'] > fanInputData['score_max']) {
    inputData.value['fan'] = fanInputData['max'];
  } else if (inputData.value['score'] > fanInputData['score_2']) {
    inputData.value['fan'] = calcLerp(
        inputData.value['score'],
        fanInputData['score_2'] + 1,
        fanInputData['score_max'],
        fanInputData['threshold_2'] + 1,
        fanInputData['max']
    );
  } else if (inputData.value['score'] > fanInputData['score_1']) {
    inputData.value['fan'] = calcLerp(
        inputData.value['score'],
        fanInputData['score_1'] + 1,
        fanInputData['score_2'],
        fanInputData['threshold_1'] + 1,
        fanInputData['threshold_2']
    );
  } else {
    inputData.value['fan'] = calcLerp(
        inputData.value['score'],
        0,
        fanInputData['score_1'],
        0,
        fanInputData['threshold_1']
    );
  }
}
</script>

<template>
  <div class="small-modal-window-area" @click.self="$emit('input-close', inputData['vocal'], inputData['dance'], inputData['visual'], inputData['fan'])">
    <div class="audition-parameter-input-modal">
      <div class="headline-area">
        <div class="headline-title-area">
          <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#333333">
            <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
          </svg>
          <span class="headline-text">{{ auditionData[index]['name'] }}で獲得したパラメータを調整</span>
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
        <div class="parameter-area" v-bind:class="type.value" v-for="type in typeData">
          <div class="color-headline" v-bind:class="type.value">
            <span class="common-headline-text font-bold">{{ type.name }}</span>
          </div>
          <div class="parameter-input">
            <div class="input-area">
              <div class="minus-button">
                <button class="color-button minus" v-bind:class="type.value" @click="buttonMinus(type.value)">
                  <span class="color-button-name" v-bind:class="type.value">－</span>
                </button>
              </div>
              <input class="basic-input-number" type="number" min="0" v-bind:max="parameterInputData['max'][`type_${produceIdol[`${type.value}_priority`]}`]" v-model="inputData[type.value]">
              <div class="plus-button">
                <button class="color-button plus" v-bind:class="type.value" @click="buttonPlus(type.value, parameterInputData['max'][`type_${produceIdol[`${type.value}_priority`]}`])">
                  <span class="color-button-name" v-bind:class="type.value">＋</span>
                </button>
              </div>
            </div>
            <div class="input-area">
              <div class="threshold-button">
                <button class="color-button threshold" v-bind:class="type.value" @click="inputData[type.value] = parameterInputData['threshold'][`type_${produceIdol[`${type.value}_priority`]}`]">
                  <span class="color-button-name" v-bind:class="type.value">減衰値</span>
                </button>
              </div>
              <div class="max-button">
                <button class="color-button max" v-bind:class="type.value" @click="inputData[type.value] = parameterInputData['max'][`type_${produceIdol[`${type.value}_priority`]}`]">
                  <span class="color-button-name" v-bind:class="type.value">最大値</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="fan-area">
          <div class="color-headline">
            <span class="common-headline-text font-bold">ファン数</span>
          </div>
          <div class="fan-input">
            <div class="input-area">
              <div class="minus-button">
                <button class="color-button minus" @click="buttonMinus('fan')">
                  <span class="color-button-name">－</span>
                </button>
              </div>
              <input class="basic-input-number" type="number" min="0" v-bind:max="fanInputData['max']" v-model="inputData['fan']">
              <div class="plus-button">
                <button class="color-button plus" @click="buttonPlus('fan', fanInputData['max'])">
                  <span class="color-button-name">＋</span>
                </button>
              </div>
            </div>
            <div class="input-area">
              <div class="threshold-button">
                <button class="color-button threshold" @click="inputData['fan'] = fanInputData['threshold_1']">
                  <span class="color-button-name">第1減衰値</span>
                </button>
              </div>
              <div class="threshold-button">
                <button class="color-button threshold" @click="inputData['fan'] = fanInputData['threshold_2']">
                  <span class="color-button-name">第2減衰値</span>
                </button>
              </div>
              <div class="max-button">
                <button class="color-button max" @click="inputData['fan'] = fanInputData['max']">
                  <span class="color-button-name">最大値</span>
                </button>
              </div>
            </div>
          </div>
          <div class="color-headline">
            <span class="common-headline-text font-bold">獲得スコアからファン数を計算（参考値）</span>
          </div>
          <div class="score-input">
            <div class="input-area">
              <div class="input-area">
                <div class="minus-button">
                  <button class="color-button minus" @click="buttonMinus('score')">
                    <span class="color-button-name">－</span>
                  </button>
                </div>
                <input class="basic-input-number score" type="number" min="0" max="9999999" v-model="inputData['score']">
                <div class="plus-button">
                  <button class="color-button plus" @click="buttonPlus('score', 9999999)">
                    <span class="color-button-name">＋</span>
                  </button>
                </div>
              </div>
            </div>
            <div class="input-area">
              <div class="threshold-button">
                <button class="color-button score" @click="buttonCalc">
                  <span class="color-button-name">計算</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="edit-button-area">
          <div class="edit-button">
            <button class="common-button" @click="$emit('input-close', inputData['vocal'], inputData['dance'], inputData['visual'], inputData['fan'])">
              <span class="common-button-name">保存</span>
            </button>
          </div>
          <div class="edit-button">
            <button class="common-button" @click="$emit('input-close', null, null, null, null)">
              <span class="common-button-name">キャンセル</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

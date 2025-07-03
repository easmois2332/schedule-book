<script setup>
import {ref} from "vue";

const props = defineProps(['week', 'maxHp', 'hp', 'point']);
const maxHp = props.maxHp;
const week = props.week;

let hp = ref(props.hp);
let point = ref(props.point);

const buttonHpMinus = () => {
  if (hp.value > 0) {
    hp.value--;
  } else {
    hp.value = 0;
  }
}
const buttonHpPlus = () => {
  if (hp.value < maxHp) {
    hp.value++;
  } else {
    hp.value = maxHp;
  }
}
const buttonHpAdjustment = (percent) => {
  hp.value = Math.round(maxHp * percent);
}
const buttonPointMinus = () => {
  if (point.value > -999) {
    point.value--;
  } else {
    point.value = -999;
  }
}
const buttonPointPlus = () => {
  if (point.value < 999) {
    point.value++;
  } else {
    point.value = 999;
  }
}
</script>

<template>
  <div class="small-modal-window-area" @click.self="$emit('input-close', Number(hp), Number(point))">
    <div class="hp-and-point-input-modal">
      <div class="headline-area">
        <div class="headline-title-area">
          <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#333333">
            <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
          </svg>
          <span class="headline-text">{{ week }}週目の体力とPポイントを調整</span>
        </div>
        <div class="headline-close-button-area">
          <button class="headline-close-button" @click="$emit('input-close', null, null)">
            <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#333333">
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="content-area">
        <div class="color-headline">
          <span class="common-headline-text font-bold">サポートカードアビリティ、はつぼしブレスレット発動前に消費・回復した体力</span>
        </div>
        <div class="hp-area">
          <div class="hp-input-area">
            <div class="input-area">
              <div class="minus-button">
                <button class="common-button minus" @click="buttonHpMinus">
                  <span class="common-button-name">－</span>
                </button>
              </div>
              <input class="basic-input-number" type="number" v-bind:min="-maxHp" v-bind:max="maxHp" v-model="hp">
              <div class="plus-button">
                <button class="common-button plus" @click="buttonHpPlus">
                  <span class="common-button-name">＋</span>
                </button>
              </div>
            </div>
            <div class="input-area">
              <input class="basic-input-range" type="range" v-bind:min="-maxHp" v-bind:max="maxHp" v-model="hp">
            </div>
          </div>
          <div class="hp-adjustment-button-area">
            <div class="percent-button">
              <button class="common-button percent" @click="buttonHpAdjustment(0.2)">
                <span class="common-button-name">20% 回復</span>
              </button>
            </div>
            <div class="percent-button">
              <button class="common-button percent" @click="buttonHpAdjustment(0.4)">
                <span class="common-button-name">40% 回復</span>
              </button>
            </div>
            <div class="percent-button">
              <button class="common-button percent" @click="buttonHpAdjustment(0.6)">
                <span class="common-button-name">60% 回復</span>
              </button>
            </div>
          </div>
        </div>
        <div class="color-headline">
          <span class="common-headline-text font-bold">獲得・消費したPポイント</span>
        </div>
        <div class="point-area">
          <div class="point-input-area">
            <div class="input-area">
              <div class="minus-button">
                <button class="common-button minus" @click="buttonPointMinus">
                  <span class="common-button-name">－</span>
                </button>
              </div>
              <input class="basic-input-number" type="number" v-bind:min="-999" v-bind:max="999" v-model="point">
              <div class="plus-button">
                <button class="common-button plus" @click="buttonPointPlus">
                  <span class="common-button-name">＋</span>
                </button>
              </div>
            </div>
            <div class="input-area">
              <input class="basic-input-range" type="range" v-bind:min="-999" v-bind:max="999" v-model="point">
            </div>
          </div>
          <div class="point-adjustment-button-area">
            <div class="fixed-button">
              <button class="common-button fixed" @click="point = 0">
                <span class="common-button-name">0</span>
              </button>
            </div>
            <div class="fixed-button">
              <button class="common-button fixed" @click="point = -50">
                <span class="common-button-name">-50</span>
              </button>
            </div>
            <div class="fixed-button">
              <button class="common-button fixed" @click="point = -100">
                <span class="common-button-name">-100</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";

const props = defineProps(['inputValue', 'minValue', 'maxValue', 'headline', 'description']);
const headline = props.headline;
const description = props.description;

let inputValue = ref(props.inputValue);
let minValue = ref(props.minValue);
let maxValue = ref(props.maxValue);

const buttonMinus = () => {
  if (inputValue.value > minValue.value) {
    inputValue.value--;
  } else {
    inputValue.value = minValue.value;
  }
}
const buttonPlus = () => {
  if (inputValue.value < maxValue.value) {
    inputValue.value++;
  } else {
    inputValue.value = maxValue.value;
  }
}
</script>

<template>
<div class="input-modal-window-area" @click.self="$emit('input-close', inputValue)">
  <div class="common-input-modal">
    <div class="headline-area">
      <div class="headline-title-area">
        <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#333333">
          <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
        </svg>
        <span class="headline-text">{{ headline }}</span>
      </div>
      <div class="headline-close-button-area">
        <button class="headline-close-button" @click="$emit('input-close', null)">
          <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#333333">
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
          </svg>
        </button>
      </div>
    </div>
    <div class="content-area">
      <div class="description-area">
        <span class="description">{{ description }}</span>
      </div>
      <div class="input-area">
        <div class="minus-button">
          <button class="common-button minus" @click="buttonMinus">
            <span class="common-button-name">－</span>
          </button>
        </div>
        <input class="basic-input-number" type="number" v-bind:min="minValue" v-bind:max="maxValue" v-model="inputValue">
        <div class="plus-button">
          <button class="common-button plus" @click="buttonPlus">
            <span class="common-button-name">＋</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

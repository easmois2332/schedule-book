<script setup>
import {shallowRef} from "vue";
import CalcResultScore from "@/components/CalcResultScore.vue";

const props = defineProps(['idols']);
const idols = props.idols;

let currentComponent = shallowRef(CalcResultScore);
</script>

<template>
  <div class="headline-area">
    <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="36px" fill="#333333">
      <path d="M320-240h60v-80h80v-60h-80v-80h-60v80h-80v60h80v80Zm200-30h200v-60H520v60Zm0-100h200v-60H520v60Zm44-152 56-56 56 56 42-42-56-58 56-56-42-42-56 56-56-56-42 42 56 56-56 58 42 42Zm-314-70h200v-60H250v60Zm-50 472q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/>
    </svg>
    <span class="headline-text">計算機</span>
  </div>
  <div class="calc-tab-area">
    <div class="calc-tab" v-bind:class="{'common-headline': currentComponent === CalcResultScore}">
      <button class="calc-tab-button" @click="currentComponent = CalcResultScore">
        <span class="calc-tab-name">評価値</span>
      </button>
    </div>
  </div>
  <component
      :is="currentComponent"
      :idols="idols"
  />
</template>

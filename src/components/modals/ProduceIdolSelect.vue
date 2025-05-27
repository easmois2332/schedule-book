<script setup>
import {ref} from "vue";

const props = defineProps(['idols']);
const idols = props.idols;

let allIdolList = ref(idols.getAllIdol());
</script>

<template>
  <div class="modal-window-area" @click.self="$emit('selector-close', null, null, null, null)">
    <div class="produce-idol-modal">
      <div class="headline-area">
        <div class="headline-title-area">
          <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#333333">
            <path d="M80-480v-80h120v80H80Zm136 222-56-58 84-84 58 56-86 86Zm28-382-84-84 56-58 86 86-58 56Zm476 480L530-350l-50 150-120-400 400 120-148 52 188 188-80 80ZM400-720v-120h80v120h-80Zm236 80-58-56 86-86 56 56-84 86Z"/>
          </svg>
          <span class="headline-text">プロデュースアイドル選択</span>
        </div>
        <div class="headline-close-button-area">
          <button class="headline-close-button" @click="$emit('selector-close', null, null, null, null)">
            <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#333333">
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="content-area">
        <div class="idol-list-area">
          <div class="idol" v-bind:class="(idol.first_name).toLowerCase()" v-for="idol in allIdolList" :key="idol.id">
            <div class="idol-info-area color-headline" v-bind:class="(idol.first_name).toLowerCase()">
              <div class="idol-name">
                <span class="idol-name-text">{{ idol.name }}</span>
              </div>
              <div class="idol-dear-level">
                <span class="idol-dear-level-text">親愛度:{{ idol.dear_level }}</span>
              </div>
            </div>
            <div class="produce-idol-area">
              <div class="produce-idol" v-for="produce in idols.getPIdolFromIdolId(idol.id)" :key="produce.id">
                <div class="produce-idol-image-area" :style="{ backgroundImage: 'url(./image/produceIdols/' + produce.id + '.png)' }" @click="$emit('selector-close', produce.id, produce.training_level, produce.blossoming_level, idol.dear_level)">
                  <div class="produce-idol-plan-area">
                    <span class="produce-idol-plan-text">{{ produce.plan_display }}</span>
                    <span class="produce-idol-plan-text">{{ produce.effect_display }}</span>
                  </div>
                  <div class="produce-idol-level-area">
                    <span class="produce-idol-level-text">✦ {{ produce.training_level }}</span>
                    <span class="produce-idol-level-text">✤ {{ produce.blossoming_level }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

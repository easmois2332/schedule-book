<script setup>
import {ref} from "vue";

const props = defineProps(['name', 'produceIdolName']);
const emit = defineEmits(['save-close']);
const produceIdolName = props.produceIdolName;

let scheduleName = ref(props.name);

const savesScheduleName = () => {
  if (scheduleName.value === '') {
    emit('save-close', props.name);
  } else {
    emit('save-close', scheduleName.value);
  }
}
</script>

<template>
  <div class="modal-window-area" @click.self="$emit('save-close', null)">
    <div class="schedule-save-modal">
      <div class="headline-area">
        <div class="headline-title-area">
          <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#333333">
            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160v212q-19-8-39.5-10.5t-40.5.5v-169L647-760H200v560h240v80H200Zm0-640v560-560ZM520-40v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T863-260L643-40H520Zm300-263-37-37 37 37ZM580-100h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19ZM240-560h360v-160H240v160Zm240 320h4l116-115v-5q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Z"/>
          </svg>
          <span class="headline-text">名前を付けて保存</span>
        </div>
        <div class="headline-close-button-area">
          <button class="headline-close-button" @click="$emit('save-close', null)">
            <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#333333">
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="content-area">
        <div class="schedule-name-input-area">
          <div class="schedule-name-input">
            <label class="basic-input-text-name font-bold">スケジュール名</label>
            <input class="basic-input-text" type="text" maxlength="30" v-model="scheduleName">
          </div>
        </div>
        <div class="schedule-name-insert-area" v-if="produceIdolName !== null">
          <div class="produce-idol-name-insert-button">
            <button class="common-button" @click="scheduleName = produceIdolName">
              <span class="common-button-name">『{{ produceIdolName }}』を挿入</span>
            </button>
          </div>
        </div>
        <div class="edit-button-area">
          <div class="edit-button">
            <button class="common-button" @click="savesScheduleName">
              <span class="common-button-name">保存</span>
            </button>
          </div>
          <div class="edit-button">
            <button class="common-button" @click="$emit('save-close', null)">
              <span class="common-button-name">キャンセル</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

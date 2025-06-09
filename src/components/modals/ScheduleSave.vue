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
            <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
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
            <input class="basic-input-text" type="text" v-model="scheduleName">
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

<script setup>
const emit = defineEmits(['produce-type-select-close']);
</script>

<template>
  <div class="modal-window-area" @click.self="$emit('produce-type-select-close', null)">
    <div class="produce-type-select-modal">
      <div class="headline-area">
        <div class="headline-title-area">
          <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#333333">
            <path d="M80-480v-80h120v80H80Zm136 222-56-58 84-84 58 56-86 86Zm28-382-84-84 56-58 86 86-58 56Zm476 480L530-350l-50 150-120-400 400 120-148 52 188 188-80 80ZM400-720v-120h80v120h-80Zm236 80-58-56 86-86 56 56-84 86Z"/>
          </svg>
          <span class="headline-text">プロデュース選択</span>
        </div>
        <div class="headline-close-button-area">
          <button class="headline-close-button" @click="$emit('produce-type-select-close', null)">
            <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#333333">
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="content-area">
        <div class="produce-type-button-area">
          <div class="produce-type-button">
            <button class="common-button hajime-master" @click="$emit('produce-type-select-close', 'hajime_master')">
              <span class="common-button-name">定期公演『初』</span>
              <span class="common-button-name">マスター</span>
            </button>
          </div>
          <div class="produce-type-button">
            <button class="common-button nia" @click="$emit('produce-type-select-close', 'nia')">
              <span class="common-button-name">NEXT IDOL AUDITION</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";

const props = defineProps(['headline', 'description', 'yes', 'no']);
const headline = props.headline;
const description = props.description;
const yes = props.yes;
const no = props.no;
</script>

<template>
  <div class="small-modal-window-area" @click.self="$emit('modal-close', false)">
    <div class="yes-or-no-modal">
      <div class="headline-area">
        <div class="headline-title-area">
          <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#333333">
            <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
          </svg>
          <span class="headline-text" v-text="headline"></span>
        </div>
        <div class="headline-close-button-area">
          <button class="headline-close-button" @click="$emit('modal-close', false)">
            <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#333333">
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="content-area">
        <div class="description-area">
          <span class="description" style="white-space: pre-wrap" v-text="description"></span>
        </div>
        <div class="question-button-area">
          <div class="question-button">
            <button class="common-button" @click="$emit('modal-close', true)">
              <span class="common-button-name">{{ yes }}</span>
            </button>
          </div>
          <div class="question-button">
            <button class="common-button" @click="$emit('modal-close', false)">
              <span class="common-button-name">{{ no }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

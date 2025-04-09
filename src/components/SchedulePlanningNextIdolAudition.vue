<script setup>
import {ref} from "vue";

const props = defineProps(['input-data']);
const emit = defineEmits(['input-data-update']);

let inputData = ref(props["input-data"]);

const updateInputData = () => {
  emit('input-data-update', inputData);
}
</script>

<template>
  <div class="planning-area">
    <div class="common-headline">
      <span class="common-headline-text font-bold">スケジュール</span>
    </div>
  </div>
</template>

<script setup>
import {ref, watch} from "vue";

const props = defineProps(['inputData', 'basicData']);
const emit = defineEmits(['input-data-update']);

let inputData = ref(props.inputData);
let basicData = ref(props.basicData);

const updateInputData = () => {
  emit('input-data-update', inputData.value);
}
watch(() => props.inputData, () => {
  inputData.value = props.inputData;
});
watch(() => props.basicData, () => {
  basicData.value = props.basicData;
});
</script>

<template>
  <div class="planning-area">
    <div class="content-area">
    </div>
  </div>
</template>

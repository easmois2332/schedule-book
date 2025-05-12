<script setup>
import {ref} from "vue";

const props = defineProps(['inputData', 'basicData']);
const emit = defineEmits(['input-data-update']);

let inputData = ref(props.inputData);
let basicData = ref(props.basicData);

const updateInputData = () => {
  emit('input-data-update', inputData);
}
</script>

<template>
  <div class="planning-area">
    <div class="content-area">
    </div>
  </div>
</template>

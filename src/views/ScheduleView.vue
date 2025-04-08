<script setup>
import {ref} from "vue";

const props = defineProps(['schedules', 'scheduleData']);
const emit = defineEmits(['undo-redo-disabled']);
const id = props.scheduleData.id;

let saveId = props.scheduleData.save_id;
let name = props.scheduleData.name;
let data = props.scheduleData.data;

let initData = {
  'input-text-1': data['input-text-1'] ? data['input-text-1'] : '',
  'input-number-1': data['input-number-1'] ? data['input-number-1'] : '',
  'select-option-1': data['select-option-1'] ? data['select-option-1'] : '',
};
let inputData = ref(initData);

let undoList = ref([JSON.stringify(initData)]);
let redoList = ref([]);

const updateHistory = () => {
  undoList.value.unshift(JSON.stringify(inputData.value));
  redoList.value = [];
  emit('undo-redo-disabled', id, (undoList.value.length <= 1), (redoList.value.length <= 0));
}
const buttonUndo = () => {
  if (undoList.value.length <= 1) {
    console.log('Undo is disabled.');
  } else {
    let shifted = undoList.value.shift();
    redoList.value.unshift(shifted);
    inputData.value = JSON.parse(undoList.value[0]);
  }
  emit('undo-redo-disabled', id, (undoList.value.length <= 1), (redoList.value.length <= 0));
}
const buttonRedo = () => {
  if (redoList.value.length <= 0) {
    console.log('Redo is disabled.');
  } else {
    let shifted = redoList.value.shift();
    undoList.value.unshift(shifted);
    inputData.value = JSON.parse(shifted);
  }
  emit('undo-redo-disabled', id, (undoList.value.length <= 1), (redoList.value.length <= 0));
}
defineExpose({buttonUndo, buttonRedo});
</script>

<template>
  <h1>{{ name }}</h1>
  <div>
    <p>input-text-1: {{ inputData['input-text-1'] }}</p>
    <input id="input-text-1" type="text" v-model="inputData['input-text-1']" @change="updateHistory()">
  </div>
  <div>
    <p>input-number-1: {{ inputData['input-number-1'] }}</p>
    <input id="input-number-1" type="number" v-model="inputData['input-number-1']" @change="updateHistory()">
  </div>
  <div>
    <p>select-option-1: {{ inputData['select-option-1'] }}</p>
    <select id="select-option-1" v-model="inputData['select-option-1']" @change="updateHistory()">
      <option value="" disabled>タイプを選択</option>
      <option value="Vo">Vo</option>
      <option value="Da">Da</option>
      <option value="Vi">Vi</option>
    </select>
  </div>
</template>

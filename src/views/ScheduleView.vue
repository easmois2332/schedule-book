<script setup>
import {ref} from "vue";

const props = defineProps(['schedules', 'scheduleData']);
const schedules = props.schedules;
const id = props.scheduleData.id;

let saveId = props.scheduleData.save_id;
let name = props.scheduleData.name;

</script>

<template>
  <h1>{{ name }}</h1>
  <input type="text">
</template>

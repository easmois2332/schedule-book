<script setup>
import {idols, produces} from "@/consts/idolConst";

for (let index in produces) {
  let produce = produces[index];
  console.log(produce);
}
</script>

<template>
  <h1>Pアイドル一覧</h1>
</template>

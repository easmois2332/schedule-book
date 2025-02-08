<script setup>
import CardMaster from "@/components/CardMaster.vue";
import CardManager from "@/components/CardManager.vue";
import {shallowRef} from "vue";

const props = defineProps(['cards'])
const cards = props.cards;

let currentComponent = shallowRef(CardMaster);

const buttonCardMaster = () => {
  currentComponent.value = CardMaster;
}
const buttonCardManager = () => {
  currentComponent.value = CardManager;
}
</script>

<template>
  <div class="headline-area">
    <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="36px" fill="#333333">
      <path d="M880-720v480q0 33-23.5 56.5T800-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720Zm-720 80h640v-80H160v80Zm0 160v240h640v-240H160Zm0 240v-480 480Z"/>
    </svg>
    <span class="headline-text">サポートカード</span>
  </div>
  <div class="card-tab-area">
    <div class="card-tab" v-bind:class="{'active': currentComponent === CardMaster}">
      <button class="card-tab-button" @click="buttonCardMaster">
        <span class="card-tab-name">一覧</span>
      </button>
    </div>
    <div class="card-tab" v-bind:class="{'active': currentComponent === CardManager}">
      <button class="card-tab-button" @click="buttonCardManager">
        <span class="card-tab-name">管理</span>
      </button>
    </div>
  </div>
  <div class="card-view-area">
    <keep-alive>
      <component
          :is="currentComponent"
          :cards="cards"
      />
    </keep-alive>
  </div>
</template>

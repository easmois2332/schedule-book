<script setup>
import SupportCardMaster from "@/components/SupportCardMaster.vue";
import SupportCardManager from "@/components/SupportCardManager.vue";
import {shallowRef} from "vue";

const props = defineProps(['supportCards']);
const supportCards = props.supportCards;

let currentComponent = shallowRef(SupportCardMaster);

const buttonCardMaster = () => {
  currentComponent.value = SupportCardMaster;
}
const buttonCardManager = () => {
  currentComponent.value = SupportCardManager;
}
</script>

<template>
  <div class="headline-area">
    <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="36px" fill="#333333">
      <path d="M560-440h200v-80H560v80Zm0-120h200v-80H560v80ZM200-320h320v-22q0-45-44-71.5T360-440q-72 0-116 26.5T200-342v22Zm160-160q33 0 56.5-23.5T440-560q0-33-23.5-56.5T360-640q-33 0-56.5 23.5T280-560q0 33 23.5 56.5T360-480ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-480H160v480Zm0 0v-480 480Z"/>
    </svg>
    <span class="headline-text">サポートカード</span>
  </div>
  <div class="card-tab-area">
    <div class="card-tab" v-bind:class="{'common-headline': currentComponent === SupportCardMaster}">
      <button class="card-tab-button" @click="buttonCardMaster">
        <span class="card-tab-name">一覧</span>
      </button>
    </div>
    <div class="card-tab" v-bind:class="{'common-headline': currentComponent === SupportCardManager}">
      <button class="card-tab-button" @click="buttonCardManager">
        <span class="card-tab-name">管理</span>
      </button>
    </div>
  </div>
  <component
      :is="currentComponent"
      :support-cards="supportCards"
  />
</template>

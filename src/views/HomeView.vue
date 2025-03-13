<script setup>
import IdolView from "@/views/IdolView.vue";
import SupportCardView from "@/views/SupportCardView.vue";

const emit = defineEmits(['component-change', 'setting-open']);
</script>

<template>
  <div class="headline-area">
    <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="36px" fill="#333333">
      <path d="M560-564v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-600q-38 0-73 9.5T560-564Zm0 220v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-380q-38 0-73 9t-67 27Zm0-110v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-490q-38 0-73 9.5T560-454ZM260-320q47 0 91.5 10.5T440-278v-394q-41-24-87-36t-93-12q-36 0-71.5 7T120-692v396q35-12 69.5-18t70.5-6Zm260 42q44-21 88.5-31.5T700-320q36 0 70.5 6t69.5 18v-396q-33-14-68.5-21t-71.5-7q-47 0-93 12t-87 36v394Zm-40 118q-48-38-104-59t-116-21q-42 0-82.5 11T100-198q-21 11-40.5-1T40-234v-482q0-11 5.5-21T62-752q46-24 96-36t102-12q58 0 113.5 15T480-740q51-30 106.5-45T700-800q52 0 102 12t96 36q11 5 16.5 15t5.5 21v482q0 23-19.5 35t-40.5 1q-37-20-77.5-31T700-240q-60 0-116 21t-104 59ZM280-494Z"/>
    </svg>
    <span class="headline-text">スケジュールブック v1.0.0</span>
  </div>
  <div class="home-view-area">
    <div class="common-headline">
      <span class="common-headline-text font-bold">スケジュール設定</span>
    </div>
    <div class="content-area">
      <div class="content new-schedule">
        <button class="content-button new-schedule">
          <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#333333">
            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h360v80H200v560h560v-360h80v360q0 33-23.5 56.5T760-120H200Zm120-160v-80h320v80H320Zm0-120v-80h320v80H320Zm0-120v-80h320v80H320Zm360-80v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Z"/>
          </svg>
          <span class="content-button-name">新規作成</span>
        </button>
      </div>
      <div class="content open-schedule">
        <button class="content-button open-schedule">
          <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#333333">
            <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640H447l-80-80H160v480l96-320h684L837-217q-8 26-29.5 41.5T760-160H160Zm84-80h516l72-240H316l-72 240Zm0 0 72-240-72 240Zm-84-400v-80 80Z"/>
          </svg>
          <span class="content-button-name">開く</span>
        </button>
      </div>
    </div>
    <div class="common-headline">
      <span class="common-headline-text font-bold">データ管理</span>
    </div>
    <div class="content-area">
      <div class="content idol">
        <button class="content-button idol" @click="$emit('component-change', IdolView)">
          <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#333333">
            <path d="M480-240q134 0 227-93.5T800-560q0-31-5-59.5T779-675q-27 17-57 26t-62 9q-54 0-101.5-24.5T480-734q-31 45-78.5 69.5T300-640q-32 0-62-9t-57-26q-11 27-16 55.5t-5 59.5q0 133 93.5 226.5T480-240ZM360-470q21 0 35.5-14.5T410-520q0-21-14.5-35.5T360-570q-21 0-35.5 14.5T310-520q0 21 14.5 35.5T360-470Zm240 0q21 0 35.5-14.5T650-520q0-21-14.5-35.5T600-570q-21 0-35.5 14.5T550-520q0 21 14.5 35.5T600-470ZM300-720q58 0 99-41t41-99v-18q-68 8-125 43t-95 89q18 12 38 19t42 7Zm360 0q22 0 42-6.5t38-19.5q-38-54-94.5-89T520-878v18q0 58 41 99t99 41ZM88-80q-35 0-59-26T8-167l36-395q8-84 45.5-157t96-126.5q58.5-53.5 134-84T480-960q85 0 160.5 30.5t134 84Q833-792 870.5-719T916-562l36 395q3 35-21 61t-59 26H88Zm392-80q-125 0-225-69.5T110-408L88-160h784l-22-248q-45 109-144.5 178.5T480-160Zm40-718Zm-80 0Zm40 718h392H88h392Z"/>
          </svg>
          <span class="content-button-name">Pアイドル</span>
        </button>
      </div>
      <div class="content support-card">
        <button class="content-button support-card" @click="$emit('component-change', SupportCardView)">
          <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#333333">
            <path d="M560-440h200v-80H560v80Zm0-120h200v-80H560v80ZM200-320h320v-22q0-45-44-71.5T360-440q-72 0-116 26.5T200-342v22Zm160-160q33 0 56.5-23.5T440-560q0-33-23.5-56.5T360-640q-33 0-56.5 23.5T280-560q0 33 23.5 56.5T360-480ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-480H160v480Zm0 0v-480 480Z"/>
          </svg>
          <span class="content-button-name">サポートカード</span>
        </button>
      </div>
    </div>
    <div class="common-headline">
      <span class="common-headline-text font-bold">その他</span>
    </div>
    <div class="content-area">
      <div class="content calculator">
        <button class="content-button calculator">
          <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#333333">
            <path d="M320-240h60v-80h80v-60h-80v-80h-60v80h-80v60h80v80Zm200-30h200v-60H520v60Zm0-100h200v-60H520v60Zm44-152 56-56 56 56 42-42-56-58 56-56-42-42-56 56-56-56-42 42 56 56-56 58 42 42Zm-314-70h200v-60H250v60Zm-50 472q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/>
          </svg>
          <span class="content-button-name">計算機</span>
        </button>
      </div>
      <div class="content setting">
        <button class="content-button setting" @click="$emit('setting-open')">
          <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#333333">
            <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"/>
          </svg>
          <span class="content-button-name">設定</span>
        </button>
      </div>
      <div class="content help">
        <button class="content-button help">
          <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#333333">
            <path d="M478-240q21 0 35.5-14.5T528-290q0-21-14.5-35.5T478-340q-21 0-35.5 14.5T428-290q0 21 14.5 35.5T478-240Zm-36-154h74q0-33 7.5-52t42.5-52q26-26 41-49.5t15-56.5q0-56-41-86t-97-30q-57 0-92.5 30T342-618l66 26q5-18 22.5-39t53.5-21q32 0 48 17.5t16 38.5q0 20-12 37.5T506-526q-44 39-54 59t-10 73Zm38 314q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
          </svg>
          <span class="content-button-name">ヘルプ</span>
        </button>
      </div>
    </div>
  </div>
</template>

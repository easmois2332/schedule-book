<script setup>
import {onMounted, onUpdated, shallowRef} from "vue";
import {ref} from "vue";
import Schedules from "@/classes/schedules";
import Idols from "@/classes/idols";
import SupportCards from "@/classes/supportCards";
import Setting from "@/classes/setting";
import HomeView from "@/views/HomeView.vue";
import ScheduleView from "@/views/ScheduleView.vue";
import ProduceTypeSelect from "@/components/modals/ProduceTypeSelect.vue";
import IdolView from "@/views/IdolView.vue";
import SupportCardView from "@/views/SupportCardView.vue";
import SettingView from "@/components/modals/SettingView.vue";
import ScheduleOpen from "@/components/modals/ScheduleOpen.vue";

const scheduleViewRef = ref();

let currentComponent = shallowRef(HomeView);

let schedules = new Schedules();
let idols = new Idols();
let supportCards = new SupportCards();

let scheduleList = ref([]);
let currentSchedule = ref([]);
let scheduleOpenScroll = ref(false);

let produceTypeSelectOpen = ref(false);
let saveScheduleOpen = ref(false);

let setting = new Setting();
let settingOpen = ref(false);
let settingColor = ref(setting.getColor());

// ホーム
const buttonHome = () => {
  currentComponent.value = HomeView;
}

// 新規スケジュール作成
const newSchedule = (produceType) => {
  if (produceType) {
    let newSchedule = schedules.crateNewSchedule(produceType);
    newSchedule.id = schedules.createId();
    newSchedule.undo_disabled = true;
    newSchedule.redo_disabled = true;
    scheduleList.value.push(newSchedule);
    currentSchedule.value = newSchedule;
    currentComponent.value = ScheduleView;
    scheduleOpenScroll.value = true;
  }
  produceTypeSelectOpen.value = false;
}

// スケジュールを開く
const openSchedule = (scheduleData) => {
  if (scheduleData !== null) {
    let index = scheduleList.value.findIndex((schedule) => schedule.save_id === scheduleData.save_id);
    if (index === -1) {
      let openSchedule = scheduleData;
      openSchedule.id = schedules.createId();
      openSchedule.undo_disabled = true;
      openSchedule.redo_disabled = true;
      scheduleList.value.push(openSchedule);
      currentSchedule.value = openSchedule;
      currentComponent.value = ScheduleView;
    } else {
      currentSchedule.value = scheduleList.value[index];
      currentComponent.value = ScheduleView;
    }
  }
  saveScheduleOpen.value = false;
}

// Pアイドル管理
const buttonIdol = () => {
  currentComponent.value = IdolView;
}

// サポートカード管理
const buttonSupportCard = () => {
  currentComponent.value = SupportCardView;
}

// 各種計算機
const buttonCalculator = () => {
}

// サイト設定
const buttonSetting = () => {
  settingOpen.value = true;
}

// サイト設定を閉じる
const closeSetting = () => {
  settingOpen.value = false;
}

// スケジュールを保存
const buttonSave = () => {
  scheduleViewRef.value[0].buttonSave();
}

// スケジュールを別名保存
const buttonSaveAs = () => {
  scheduleViewRef.value[0].buttonSaveAs();
}

// スケジュールをDBに保存
const saveSchedule = async () => {
  let date = new Date();
  currentSchedule.value['data_version'] = schedules.getDataVersion();
  currentSchedule.value['update_data'] = date.toLocaleString();

  await schedules.updateScheduleData(
      currentSchedule.value['save_id'],
      currentSchedule.value['name'],
      currentSchedule.value['data'],
      currentSchedule.value['data_version'],
      currentSchedule.value['update_data'],
  );
}

// スケジュールをDBに新規保存
const saveNewSchedule = async (name) => {
  let date = new Date();
  currentSchedule.value['save_id'] = date.getTime();
  currentSchedule.value['name'] = name;
  currentSchedule.value['data_version'] = schedules.getDataVersion();
  currentSchedule.value['update_data'] = date.toLocaleString();
  scheduleViewRef.value[0].updateSaveId();

  await schedules.insetScheduleData(
      currentSchedule.value['save_id'],
      currentSchedule.value['name'],
      currentSchedule.value['data'],
      currentSchedule.value['data_version'],
      currentSchedule.value['update_data'],
  );
}

// スケジュールをDBに別名保存
const saveAsSchedule = async (name) => {
  let date = new Date();
  let scheduleData = {...currentSchedule.value};
  scheduleData['save_id'] = date.getTime();
  scheduleData['name'] = name;
  scheduleData['data_version'] = schedules.getDataVersion();
  scheduleData['update_data'] = date.toLocaleString();

  await schedules.insetScheduleData(
      scheduleData['save_id'],
      scheduleData['name'],
      scheduleData['data'],
      scheduleData['data_version'],
      scheduleData['update_data'],
  );

  // 別タブで開き直す
  scheduleData.id = schedules.createId();
  scheduleData.undo_disabled = true;
  scheduleData.redo_disabled = true;
  scheduleList.value.push(scheduleData);
  currentSchedule.value = scheduleData;
  currentComponent.value = ScheduleView;
}

// スケジュール編集を元に戻す
const buttonUndo = () => {
  scheduleViewRef.value[0].buttonUndo();
}

// スケジュール編集をやり直す
const buttonRedo = () => {
  scheduleViewRef.value[0].buttonRedo();
}

// スケジュール編集を元に戻す・やり直すの無効化
const buttonUndoRedoDisabled = (id, undo, redo) => {
  let index = scheduleList.value.findIndex((schedule) => schedule.id === id);
  scheduleList.value[index].undo_disabled = undo;
  scheduleList.value[index].redo_disabled = redo;
}

// スケジュールタブ
const buttonScheduleTab = (index) => {
  currentSchedule.value = scheduleList.value[index];
  currentComponent.value = ScheduleView;
}

// スケジュールタブを閉じる
const closeScheduleTab = (index) => {
  if (currentSchedule.value.id === scheduleList.value[index].id) {
    if (index === 0) {
      currentSchedule.value = scheduleList.value[1];
    } else {
      currentSchedule.value = scheduleList.value[index - 1];
    }
  }
  scheduleList.value.splice(index, 1);
  if ((scheduleList.value.length === 0) && (currentComponent.value === ScheduleView)) {
    currentComponent.value = HomeView;
  }
}

// スケジュールタブを左にスクロール
const scrollLeftScheduleTab = () => {
  document.querySelector('.schedule-tab-card-area').scrollBy({
    left: -250,
    behavior: "smooth"
  });
}

// スケジュールタブを右にスクロール
const scrollRightScheduleTab = () => {
  document.querySelector('.schedule-tab-card-area').scrollBy({
    left: 250,
    behavior: "smooth"
  });
}

// 表示しているコンポーネントを変更
const changeCurrentComponent = (component) => {
  currentComponent.value = component;
}

onMounted(() => {
  let scheduleTabArea = document.querySelector('.schedule-tab-card-area');
  scheduleTabArea.addEventListener('wheel', function (event) {
    event.preventDefault();
    scheduleTabArea.scrollLeft += event.deltaX;
    scheduleTabArea.scrollLeft += event.deltaY;
  })
});

onUpdated(() => {
  if (scheduleOpenScroll.value) {
    let scheduleTabArea = document.querySelector('.schedule-tab-card-area');
    scheduleTabArea.scroll({
      left: scheduleTabArea.scrollWidth,
      behavior: "smooth"
    });
    scheduleOpenScroll.value = false;
  }
})
</script>

<template>
  <div id="modal-area" class="modal-area" v-bind:class="settingColor"></div>
  <header id="header-area" class="header-area" v-bind:class="settingColor">
    <div class="header-tab-area">
      <div class="header-tab-left-area">
        <div class="header-tab home">
          <button class="header-tab-button home" @click="buttonHome">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
              <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/>
            </svg>
            <span class="header-tab-name">ホーム</span>
          </button>
        </div>
        <div class="header-tab new-schedule">
          <button class="header-tab-button new-schedule" @click="produceTypeSelectOpen = true">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
              <path d="M440-240h80v-120h120v-80H520v-120h-80v120H320v80h120v120ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"/>
            </svg>
            <span class="header-tab-name">新規作成</span>
          </button>
        </div>
        <div class="header-tab open-schedule">
          <button class="header-tab-button open-schedule" @click="saveScheduleOpen = true">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
              <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640H447l-80-80H160v480l96-320h684L837-217q-8 26-29.5 41.5T760-160H160Zm84-80h516l72-240H316l-72 240Zm0 0 72-240-72 240Zm-84-400v-80 80Z"/>
            </svg>
            <span class="header-tab-name">開く</span>
          </button>
        </div>
      </div>
      <div class="header-tab-right-area">
        <div class="header-tab idol">
          <button class="header-tab-button idol" @click="buttonIdol">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
              <path d="M480-240q134 0 227-93.5T800-560q0-31-5-59.5T779-675q-27 17-57 26t-62 9q-54 0-101.5-24.5T480-734q-31 45-78.5 69.5T300-640q-32 0-62-9t-57-26q-11 27-16 55.5t-5 59.5q0 133 93.5 226.5T480-240ZM360-470q21 0 35.5-14.5T410-520q0-21-14.5-35.5T360-570q-21 0-35.5 14.5T310-520q0 21 14.5 35.5T360-470Zm240 0q21 0 35.5-14.5T650-520q0-21-14.5-35.5T600-570q-21 0-35.5 14.5T550-520q0 21 14.5 35.5T600-470ZM300-720q58 0 99-41t41-99v-18q-68 8-125 43t-95 89q18 12 38 19t42 7Zm360 0q22 0 42-6.5t38-19.5q-38-54-94.5-89T520-878v18q0 58 41 99t99 41ZM88-80q-35 0-59-26T8-167l36-395q8-84 45.5-157t96-126.5q58.5-53.5 134-84T480-960q85 0 160.5 30.5t134 84Q833-792 870.5-719T916-562l36 395q3 35-21 61t-59 26H88Zm392-80q-125 0-225-69.5T110-408L88-160h784l-22-248q-45 109-144.5 178.5T480-160Zm40-718Zm-80 0Zm40 718h392H88h392Z"/>
            </svg>
            <span class="header-tab-name">Pアイドル</span>
          </button>
        </div>
        <div class="header-tab support-card">
          <button class="header-tab-button support-card" @click="buttonSupportCard">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
              <path d="M560-440h200v-80H560v80Zm0-120h200v-80H560v80ZM200-320h320v-22q0-45-44-71.5T360-440q-72 0-116 26.5T200-342v22Zm160-160q33 0 56.5-23.5T440-560q0-33-23.5-56.5T360-640q-33 0-56.5 23.5T280-560q0 33 23.5 56.5T360-480ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-480H160v480Zm0 0v-480 480Z"/>
            </svg>
            <span class="header-tab-name">サポートカード</span>
          </button>
        </div>
        <div class="header-tab calculator" @click="buttonCalculator">
          <button class="header-tab-button calculator">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
              <path d="M320-240h60v-80h80v-60h-80v-80h-60v80h-80v60h80v80Zm200-30h200v-60H520v60Zm0-100h200v-60H520v60Zm44-152 56-56 56 56 42-42-56-58 56-56-42-42-56 56-56-56-42 42 56 56-56 58 42 42Zm-314-70h200v-60H250v60Zm-50 472q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/>
            </svg>
            <span class="header-tab-name">計算機</span>
          </button>
        </div>
        <div class="header-tab setting" @click="buttonSetting">
          <button class="header-tab-button setting">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
              <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"/>
            </svg>
            <span class="header-tab-name">設定</span>
          </button>
        </div>
      </div>
    </div>
    <div class="header-operation-area">
      <div class="header-operation save">
        <button class="header-operation-button" v-bind:disabled="currentComponent !== ScheduleView" @click="buttonSave">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
            <path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z"/>
          </svg>
        </button>
      </div>
      <div class="header-operation save-as">
        <button class="header-operation-button" v-bind:disabled="currentComponent !== ScheduleView" @click="buttonSaveAs">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160v212q-19-8-39.5-10.5t-40.5.5v-169L647-760H200v560h240v80H200Zm0-640v560-560ZM520-40v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T863-260L643-40H520Zm300-263-37-37 37 37ZM580-100h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19ZM240-560h360v-160H240v160Zm240 320h4l116-115v-5q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Z"/>
          </svg>
        </button>
      </div>
      <div class="header-operation screen-shot">
        <button class="header-operation-button" v-bind:disabled="currentComponent !== ScheduleView">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
            <path d="M480-260q75 0 127.5-52.5T660-440q0-75-52.5-127.5T480-620q-75 0-127.5 52.5T300-440q0 75 52.5 127.5T480-260Zm0-80q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM160-120q-33 0-56.5-23.5T80-200v-480q0-33 23.5-56.5T160-760h126l74-80h240l74 80h126q33 0 56.5 23.5T880-680v480q0 33-23.5 56.5T800-120H160Zm0-80h640v-480H638l-73-80H395l-73 80H160v480Zm320-240Z"/>
          </svg>
        </button>
      </div>
      <div class="header-operation undo">
        <button class="header-operation-button" v-bind:disabled="(currentComponent !== ScheduleView) || currentSchedule.undo_disabled" @click="buttonUndo">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
            <path d="M280-200v-80h284q63 0 109.5-40T720-420q0-60-46.5-100T564-560H312l104 104-56 56-200-200 200-200 56 56-104 104h252q97 0 166.5 63T800-420q0 94-69.5 157T564-200H280Z"/>
          </svg>
        </button>
      </div>
      <div class="header-operation redo">
        <button class="header-operation-button" v-bind:disabled="(currentComponent !== ScheduleView) || currentSchedule.redo_disabled" @click="buttonRedo">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
            <path d="M396-200q-97 0-166.5-63T160-420q0-94 69.5-157T396-640h252L544-744l56-56 200 200-200 200-56-56 104-104H396q-63 0-109.5 40T240-420q0 60 46.5 100T396-280h284v80H396Z"/>
          </svg>
        </button>
      </div>
    </div>
    <div class="schedule-tab-area">
      <div class="schedule-tab-scroll-area">
        <div class="schedule-tab-scroll left">
          <button class="schedule-tab-scroll-button" @click="scrollLeftScheduleTab">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
              <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/>
            </svg>
          </button>
        </div>
        <div class="schedule-tab-scroll right">
          <button class="schedule-tab-scroll-button" @click="scrollRightScheduleTab">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
              <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="schedule-tab-card-area">
        <div class="schedule-tab-card" v-bind:class="{'active': (currentComponent === ScheduleView) && (currentSchedule.id === schedule.id)}" v-for="(schedule, index) in scheduleList" :key="schedule.id">
          <div class="schedule-tab-card-name-area" @click="buttonScheduleTab(index)">
            <span class="schedule-tab-card-name">{{ schedule.name }}</span>
          </div>
          <button class="schedule-tab-card-close-button" @click="closeScheduleTab(index)">
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#5f6368">
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </header>
  <div id="content-view-area" class="contents-view-area" v-bind:class="settingColor">
    <HomeView
        v-if="currentComponent === HomeView"
        @component-change="changeCurrentComponent"
        @new-schedule-open="produceTypeSelectOpen = true"
        @save-schedule-open="saveScheduleOpen = true"
        @setting-open="buttonSetting"
    />
    <IdolView
        v-if="currentComponent === IdolView"
        :idols="idols"
    />
    <SupportCardView
        v-if="currentComponent === SupportCardView"
        :support-cards="supportCards"
    />
    <keep-alive v-for="schedule in scheduleList" :key="schedule.id">
      <ScheduleView
          v-if="(currentComponent === ScheduleView) && (currentSchedule.id === schedule.id)"
          ref="scheduleViewRef"
          :schedule-data="currentSchedule"
          :idols="idols"
          :support-cards="supportCards"
          @undo-redo-disabled="buttonUndoRedoDisabled"
          @save-schedule="saveSchedule"
          @save-new-schedule="saveNewSchedule"
          @save-as-schedule="saveAsSchedule"
      />
    </keep-alive>
  </div>
  <Teleport to="#modal-area">
    <SettingView
        v-if="settingOpen"
        v-model="settingColor"
        :setting="setting"
        @setting-close="closeSetting"
    />
    <ProduceTypeSelect
        v-if="produceTypeSelectOpen"
        @produce-type-select-close="newSchedule"
    />
    <ScheduleOpen
        v-if="saveScheduleOpen"
        :schedules="schedules"
        :idols="idols"
        :schedule-list="scheduleList"
        @schedule-close="openSchedule"
    />
  </Teleport>
</template>

<style scoped>
</style>

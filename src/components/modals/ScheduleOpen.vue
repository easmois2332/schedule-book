<script setup>
import {ref} from "vue";
import ScheduleSave from "@/components/modals/ScheduleSave.vue";
import YesOrNoModal from "@/components/smallModals/YesOrNoModal.vue";

const props = defineProps(['schedules', 'idols', 'scheduleList']);
const emit = defineEmits(['schedule-close']);

const schedules = props.schedules;
const idols = props.idols;
const scheduleList = props.scheduleList;

const allIdolList = idols.getAllIdol();

let saveListHajimeMaster = [];
let saveListNiaMaster = [];
for (let index in allIdolList) {
  saveListHajimeMaster[allIdolList[index]['id']] = schedules.getSaveListFromFilter(allIdolList[index]['id'], 'hajime_master');
  saveListNiaMaster[allIdolList[index]['id']] = schedules.getSaveListFromFilter(allIdolList[index]['id'], 'nia_master');
}

let folderOpenList = ref({
  hajime_master: {
    flag: true,
    saki: true,
    temari: true,
    kotone: true,
    mao: true,
    lilja: true,
    china: true,
    sumika: true,
    hiro: true,
    sena: true,
    misuzu: true,
    ume: true,
    rinami: true,
  },
  nia_master: {
    flag: true,
    saki: true,
    temari: true,
    kotone: true,
    mao: true,
    lilja: true,
    china: true,
    sumika: true,
    hiro: true,
    sena: true,
    misuzu: true,
    ume: true,
    rinami: true,
  },
});
let scheduleSaveOpen = ref(false);
let scheduleDeleteOpen = ref(false);
let scheduleEdit = ref([]);

const produceType = {
  hajime_master: {
    name: '定期公演『初』 マスター',
    save_list: saveListHajimeMaster,
  },
  nia_master: {
    name: 'NEXT IDOL AUDITION マスター',
    save_list: saveListNiaMaster,
  }
};
const scheduleOpened = (scheduleData) => {
  let index = scheduleList.findIndex((schedule) => schedule.save_id === scheduleData.save_id);
  if (index === -1) {
    return false;
  }
  return true;
}
const buttonScheduleNameEditOpen = (type, idolId, saveId) => {
  scheduleSaveOpen.value = saveId;
  scheduleEdit.value['produce_type'] = type;
  scheduleEdit.value['idol_id'] = idolId;
}
const closeSaveAs = (name) => {
  if (name !== null) {
    let save = produceType[scheduleEdit.value['produce_type']]['save_list'][scheduleEdit.value['idol_id']];
    let index = save.findIndex((save) => save.save_id === scheduleSaveOpen.value);
    if (index !== -1) {
      save[index]['name'] = name;
      schedules.updateScheduleData(
          save[index]['save_id'],
          save[index]['name'],
          save[index]['data'],
          schedules.getDataVersion(),
          (new Date()).toLocaleString(),
      );
    }
  }
  scheduleSaveOpen.value = false;
}
const buttonScheduleDeleteOpen = (type, idolId, saveId) => {
  scheduleDeleteOpen.value = saveId;
  scheduleEdit.value['produce_type'] = type;
  scheduleEdit.value['idol_id'] = idolId;
}
const closeDelete = (bool) => {
  if (bool) {
    let save = produceType[scheduleEdit.value['produce_type']]['save_list'][scheduleEdit.value['idol_id']];
    let index = save.findIndex((save) => save.save_id === scheduleDeleteOpen.value);
    if (index !== -1) {
      save.splice(index, 1);
      schedules.deleteScheduleData(scheduleDeleteOpen.value);
    }
  }
  scheduleDeleteOpen.value = false;
}
</script>

<template>
  <div class="modal-window-area" @click.self="$emit('schedule-close', null)">
    <div class="schedule-open-modal">
      <div class="headline-area">
        <div class="headline-title-area">
          <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#333333">
            <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640H447l-80-80H160v480l96-320h684L837-217q-8 26-29.5 41.5T760-160H160Zm84-80h516l72-240H316l-72 240Zm0 0 72-240-72 240Zm-84-400v-80 80Z"/>
          </svg>
          <span class="headline-text">スケジュールを開く</span>
        </div>
        <div class="headline-close-button-area">
          <button class="headline-close-button" @click="$emit('schedule-close', null)">
            <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#333333">
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="content-area">
        <div class="save-list-area" v-bind:class="key" v-for="(data, key) in produceType">
          <div class="folder-button-area common-headline" v-bind:class="key">
            <button class="folder-button" v-bind:class="key" @click="folderOpenList[key]['flag'] = !folderOpenList[key]['flag']">
              <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="24px" fill="#faa900">
                <path v-if="folderOpenList[key]['flag']" d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640H447l-80-80H160v480l96-320h684L837-217q-8 26-29.5 41.5T760-160H160Zm84-80h516l72-240H316l-72 240Zm0 0 72-240-72 240Zm-84-400v-80 80Z"/>
                <path v-else d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H447l-80-80H160v480Zm0 0v-480 480Z"/>
              </svg>
              <span class="button-text">{{ data.name }}</span>
            </button>
          </div>
          <div class="save-list" v-bind:class="key" v-show="folderOpenList[key]['flag']">
            <div class="idol-list-area" v-bind:class="(idol.first_name).toLowerCase()" v-for="idol in allIdolList" v-show="data['save_list'][idol.id].length > 0">
              <div class="folder-button-area" v-bind:class="(idol.first_name).toLowerCase()">
                <button class="folder-button" v-bind:class="(idol.first_name).toLowerCase()" @click="folderOpenList[key][(idol.first_name).toLowerCase()] = !folderOpenList[key][(idol.first_name).toLowerCase()]">
                  <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="24px" fill="#faa900">
                    <path v-if="folderOpenList[key][(idol.first_name).toLowerCase()]" d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640H447l-80-80H160v480l96-320h684L837-217q-8 26-29.5 41.5T760-160H160Zm84-80h516l72-240H316l-72 240Zm0 0 72-240-72 240Zm-84-400v-80 80Z"/>
                    <path v-else d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H447l-80-80H160v480Zm0 0v-480 480Z"/>
                  </svg>
                  <span class="button-text">{{ idol.name }}</span>
                </button>
              </div>
              <div class="idol-list" v-bind:class="(idol.first_name).toLowerCase()" v-show="folderOpenList[key][(idol.first_name).toLowerCase()]">
                <div class="save-data" v-for="save in data['save_list'][idol.id]">
                  <div class="open-button-area">
                    <button class="open-button" v-bind:class="{'opened': scheduleOpened(save)}" @click="$emit('schedule-close', save);">
                      <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                        <path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"/>
                      </svg>
                      <span class="button-text">{{ save.name }}</span>
                    </button>
                  </div>
                  <div class="save-data-edit-button-area">
                    <div class="rename-button-area">
                      <button class="rename-button" v-bind:disabled="scheduleOpened(save)" @click="buttonScheduleNameEditOpen(key, idol.id, save.save_id)">
                        <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                          <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
                        </svg>
                      </button>
                      <Teleport to="#modal-area">
                        <ScheduleSave
                            v-if="scheduleSaveOpen === save.save_id"
                            :name="save.name"
                            :produce-idol-name="(idols.getPIdolFromId(save.data.organization.produce_idol.id))['name']"
                            @save-close="closeSaveAs"
                        />
                      </Teleport>
                    </div>
                    <div class="delete-button-area">
                      <button class="delete-button" v-bind:disabled="scheduleOpened(save)" @click="buttonScheduleDeleteOpen(key, idol.id, save.save_id)">
                        <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                          <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                        </svg>
                      </button>
                      <Teleport to="#modal-area">
                        <YesOrNoModal
                            v-if="scheduleDeleteOpen === save.save_id"
                            :headline="'スケジュールの削除'"
                            :description="'『'+ save.name +'』を削除します。\nよろしいですか？'"
                            :yes="'はい'"
                            :no="'いいえ'"
                            @modal-close="closeDelete"
                        />
                      </Teleport>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

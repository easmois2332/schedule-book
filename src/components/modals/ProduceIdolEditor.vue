<script setup>
import {ref} from "vue";

const props = defineProps(['idols', 'id', 'trainingLevel', 'blossomingLevel']);
const emit = defineEmits(['editor-close']);
const idols = props.idols;

let id = ref(props.id);
let trainingLevel = ref(props.trainingLevel);
let blossomingLevel = ref(props.blossomingLevel);
let idolDetail = ref(idols.getPIdolDetail(id.value, trainingLevel.value, blossomingLevel.value));

const buttonSave = async () => {
  await idols.updatePIdol(id.value, trainingLevel.value, blossomingLevel.value);
  emit('editor-close');
}
const updateIdolDetail = () => {
  idolDetail.value = idols.getPIdolDetail(id.value, trainingLevel.value, blossomingLevel.value);
}
</script>

<template>
  <div class="modal-window-area" @click.self="$emit('editor-close')">
    <div class="produce-idol-edit-modal">
      <div class="headline-area">
        <div class="headline-title-area">
          <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#333333">
            <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
          </svg>
          <span class="headline-text">プロデュースアイドル管理</span>
        </div>
        <div class="headline-close-button-area">
          <button class="headline-close-button" @click="$emit('editor-close')">
            <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#333333">
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="content-area">
        <div class="produce-idol-info-area">
          <div class="produce-idol-image-area">
            <div class="produce-idol-image" :style="{ backgroundImage: 'url(./image/produceIdols/' + id + '.png)' }"/>
          </div>
          <div class="produce-idol-info">
            <span class="produce-idol-info-text font-bold">{{ idolDetail.name }}</span>
<!--            <span class="produce-idol-info-text font-bold">{{ idolDetail.plan_display }}『{{ idolDetail.effect_display }}』</span>-->
            <div class="produce-idol-level">
              <div class="produce-idol-training-level">
                <label class="basic-input-number-name font-bold">特訓段階</label>
                <input class="basic-input-number" type="number" min="0" max="6" v-model="trainingLevel" @input="updateIdolDetail">
              </div>
              <div class="produce-idol-blossoming-level">
                <label class="basic-input-number-name font-bold">才能開花</label>
                <input class="basic-input-number" type="number" min="0" max="4" v-model="blossomingLevel" @input="updateIdolDetail">
              </div>
            </div>
            <div class="produce-idol-hp">
              <span class="produce-idol-hp-text font-bold">体力 </span><span class="produce-idol-hp-text">{{ idolDetail.init_hp }}</span>
            </div>
          </div>
        </div>
        <div class="produce-idol-parameter-area">
          <table class="produce-idol-parameter-table">
            <thead>
            <tr>
              <th class="table-header"></th>
              <th class="table-header-type vocal"><span class="table-header-text">ボーカル</span><span class="table-header-text-abbr">Vo</span></th>
              <th class="table-header-type dance"><span class="table-header-text">ダンス</span><span class="table-header-text-abbr">Da</span></th>
              <th class="table-header-type visual"><span class="table-header-text">ビジュアル</span><span class="table-header-text-abbr">Vi</span></th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <th class="table-header"><span class="table-header-text">初期値</span><span class="table-header-text-abbr">初期値</span></th>
              <td class="table-data vocal"><span>{{ idolDetail.init_vocal }}</span></td>
              <td class="table-data dance"><span>{{ idolDetail.init_dance }}</span></td>
              <td class="table-data visual"><span>{{ idolDetail.init_visual }}</span></td>
            </tr>
            <tr>
              <th class="table-header"><span class="table-header-text">パラメータボーナス</span><span class="table-header-text-abbr">パラボ</span></th>
              <td class="table-data vocal"><span>{{ idolDetail.bonus_vocal }}%</span></td>
              <td class="table-data dance"><span>{{ idolDetail.bonus_dance }}%</span></td>
              <td class="table-data visual"><span>{{ idolDetail.bonus_visual }}%</span></td>
            </tr>
            <tr>
              <th class="table-header"><span class="table-header-text">SPレッスン発生率</span><span class="table-header-text-abbr">SP率</span></th>
              <td class="table-data vocal"><span>+{{ idolDetail.sp_lesson_rate_vocal }}%</span></td>
              <td class="table-data dance"><span>+{{ idolDetail.sp_lesson_rate_dance }}%</span></td>
              <td class="table-data visual"><span>+{{ idolDetail.sp_lesson_rate_visual }}%</span></td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="edit-button-area">
          <div class="edit-button">
            <button class="common-button" @click="buttonSave">
              <span class="common-button-name">保存</span>
            </button>
          </div>
          <div class="edit-button">
            <button class="common-button" @click="$emit('editor-close')">
              <span class="common-button-name">キャンセル</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

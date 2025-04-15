<script setup>
import {ref} from "vue";

const props = defineProps(['input-data']);
const emit = defineEmits(['input-data-update']);

let inputData = ref(props["input-data"]);

const updateInputData = () => {
  emit('input-data-update', inputData);
}
</script>

<template>
  <div class="organization-area">
    <div class="common-headline">
      <span class="common-headline-text font-bold">編成</span>
    </div>
    <div class="content-area">
      <div class="produce-idol-area">
        <div class="produce-idol">
          <div class="produce-idol-image">
            <button class="produce-idol-select-button" :style="{ backgroundImage: 'url(./image/produceIdols/6.png)' }">
              <span class="produce-idol-select-text" v-show="false">Pアイドルを選択</span>
            </button>
          </div>
          <div class="produce-idol-level-area">
            <div class="produce-idol-level training-level">
              <label class="basic-input-number-name font-bold">特訓段階</label>
              <input class="basic-input-number" type="number" min="0" max="6">
            </div>
            <div class="produce-idol-level blossoming-level">
              <label class="basic-input-number-name font-bold">才能開花</label>
              <input class="basic-input-number" type="number" min="0" max="4">
            </div>
            <div class="produce-idol-level dear-level">
              <label class="basic-input-number-name font-bold">親愛度</label>
              <input class="basic-input-number" type="number" min="0" max="20">
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
                <th class="table-header-type hp"><span class="table-header-text">体力</span><span class="table-header-text-abbr">HP</span></th>
                <th class="table-header-type point"><span class="table-header-text">Pポイント</span><span class="table-header-text-abbr">Ⓟ</span></th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <th class="table-header"><span class="table-header-text">初期値</span><span class="table-header-text-abbr">初期値</span></th>
                <td class="table-data vocal"><span>9999</span></td>
                <td class="table-data dance"><span>9999</span></td>
                <td class="table-data visual"><span>9999</span></td>
                <td class="table-data hp"><span>9999</span></td>
                <td class="table-data point"><span>9999</span></td>
              </tr>
              <tr>
                <th class="table-header"><span class="table-header-text">パラメータボーナス</span><span class="table-header-text-abbr">パラボ</span></th>
                <td class="table-data vocal"><span>999.9%</span></td>
                <td class="table-data dance"><span>999.9%</span></td>
                <td class="table-data visual"><span>999.9%</span></td>
                <td class="table-data hp"><span>-</span></td>
                <td class="table-data point"><span>-</span></td>
              </tr>
              <tr>
                <th class="table-header"><span class="table-header-text">SPレッスン発生率</span><span class="table-header-text-abbr">SP率</span></th>
                <td class="table-data vocal"><span>100.0%</span></td>
                <td class="table-data dance"><span>100.0%</span></td>
                <td class="table-data visual"><span>100.0%</span></td>
                <td class="table-data hp"><span>-</span></td>
                <td class="table-data point"><span>-</span></td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="support-card-area">
        <div class="support-card" v-for="i in 6" :key="i">
          <div class="support-card-image">
            <button class="support-card-select-button" :style="{ backgroundImage: 'url(./image/supportCards/49.png)' }">
              <span class="support-card-select-text" v-show="false">サポートカードを選択</span>
            </button>
          </div>
          <div class="support-card-info">
            <div class="support-card-name">
              <span class="support-card-info-text font-bold">サポートカード名</span>
            </div>
            <div class="support-card-level">
              <label class="basic-input-number-name font-bold">Lv</label>
              <input class="basic-input-number" type="number" min="1">
            </div>
          </div>
        </div>
      </div>
      <div class="produce-memory-area">
      </div>
    </div>
  </div>
</template>

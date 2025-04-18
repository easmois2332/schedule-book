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
    <div class="content-area">
      <div class="produce-idol-area">
        <div class="common-headline">
          <span class="common-headline-text font-bold">プロデュースアイドル詳細</span>
        </div>
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
                <th class="table-header-type hp pc-design"><span class="table-header-text">体力</span><span class="table-header-text-abbr">HP</span></th>
                <th class="table-header-type point pc-design"><span class="table-header-text">Pポイント</span><span class="table-header-text-abbr">Ⓟ</span></th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <th class="table-header"><span class="table-header-text">初期値</span><span class="table-header-text-abbr">初期値</span></th>
                <td class="table-data vocal"><span>9999</span></td>
                <td class="table-data dance"><span>9999</span></td>
                <td class="table-data visual"><span>9999</span></td>
                <td class="table-data hp pc-design"><span>9999</span></td>
                <td class="table-data point pc-design"><span>9999</span></td>
              </tr>
              <tr>
                <th class="table-header"><span class="table-header-text">パラメータボーナス</span><span class="table-header-text-abbr">パラボ</span></th>
                <td class="table-data vocal"><span>999.9%</span></td>
                <td class="table-data dance"><span>999.9%</span></td>
                <td class="table-data visual"><span>999.9%</span></td>
                <td class="table-data hp pc-design"><span>-</span></td>
                <td class="table-data point pc-design"><span>-</span></td>
              </tr>
              <tr>
                <th class="table-header"><span class="table-header-text">SPレッスン発生率</span><span class="table-header-text-abbr">SP率</span></th>
                <td class="table-data vocal"><span>100.0%</span></td>
                <td class="table-data dance"><span>100.0%</span></td>
                <td class="table-data visual"><span>100.0%</span></td>
                <td class="table-data hp pc-design"><span>-</span></td>
                <td class="table-data point pc-design"><span>-</span></td>
              </tr>
              </tbody>
            </table>
            <table class="produce-idol-parameter-table phone-design">
              <thead>
              <tr>
                <th class="table-header"></th>
                <th class="table-header-type hp"><span class="table-header-text">体力</span><span class="table-header-text-abbr">HP</span></th>
                <th class="table-header-type point"><span class="table-header-text">Pポイント</span><span class="table-header-text-abbr">Ⓟ</span></th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <th class="table-header"><span class="table-header-text">初期値</span><span class="table-header-text-abbr">初期値</span></th>
                <td class="table-data hp"><span>9999</span></td>
                <td class="table-data point"><span>9999</span></td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="support-card-area">
        <div class="common-headline">
          <span class="common-headline-text font-bold">サポートカード詳細</span>
        </div>
        <div class="support-card">
          <div class="support-card-detail" v-bind:class="'row-' + i" v-for="i in 6" :key="i">
            <div class="support-card-image">
              <button class="support-card-select-button" :style="{ backgroundImage: 'url(./image/supportCards/'+ i +'.png)' }">
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
      </div>
      <div class="produce-memory-area">
        <div class="common-headline">
          <span class="common-headline-text font-bold">メモリー詳細</span>
        </div>
        <div class="produce-memory">
          <div class="produce-memory-detail" v-bind:class="'row-' + i" v-for="i in 4" :key="i">
            <div class="produce-memory-name">
              <span class="produce-memory-name-text font-bold">メモリー{{ i }}</span>
            </div>
            <div class="produce-memory-ability-area">
              <div class="produce-memory-ability-type-area">
                <select class="basic-select">
                  <option value="vocal">ボーカル</option>
                  <option value="point">Pポイント</option>
                  <option value="hp-recover">体力回復</option>
                </select>
              </div>
              <div class="produce-memory-ability-value-area">
                <select class="basic-select">
                  <option value="init-parameter-up-10">+10</option>
                  <option value="init-parameter-up-15">+15</option>
                  <option value="init-parameter-up-20">+20</option>
                  <option value="parameter-bonus-14">+1.4%</option>
                  <option value="parameter-bonus-21">+2.1%</option>
                  <option value="parameter-bonus-28">+2.8%</option>
                </select>
              </div>
            </div>
            <div class="produce-memory-ability-area">
              <div class="produce-memory-ability-type-area">
                <select class="basic-select">
                  <option value="dance">ダンス</option>
                  <option value="point">Pポイント</option>
                  <option value="hp-recover">体力回復</option>
                </select>
              </div>
              <div class="produce-memory-ability-value-area">
                <select class="basic-select">
                  <option value="init-parameter-up-10">+10</option>
                  <option value="init-parameter-up-15">+15</option>
                  <option value="init-parameter-up-20">+20</option>
                  <option value="parameter-bonus-14">+1.4%</option>
                  <option value="parameter-bonus-21">+2.1%</option>
                  <option value="parameter-bonus-28">+2.8%</option>
                </select>
              </div>
            </div>
            <div class="produce-memory-ability-area">
              <div class="produce-memory-ability-type-area">
                <select class="basic-select">
                  <option value="visual">ビジュアル</option>
                  <option value="point">Pポイント</option>
                  <option value="hp-recover">体力回復</option>
                </select>
              </div>
              <div class="produce-memory-ability-value-area">
                <select class="basic-select">
                  <option value="init-parameter-up-10">+10</option>
                  <option value="init-parameter-up-15">+15</option>
                  <option value="init-parameter-up-20">+20</option>
                  <option value="parameter-bonus-14">+1.4%</option>
                  <option value="parameter-bonus-21">+2.1%</option>
                  <option value="parameter-bonus-28">+2.8%</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

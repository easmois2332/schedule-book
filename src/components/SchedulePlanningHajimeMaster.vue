<script setup>
import {ref} from "vue";
import SupportCardMaster from "@/components/SupportCardMaster.vue";

const props = defineProps(['inputData', 'calcData']);
const emit = defineEmits(['input-data-update']);

let inputData = ref(props.inputData);
let calcData = ref(props.calcData);

const scheduleData = {
  1: [
    {value: 'class:50', text: '授業 +50'},
    {value: 'class:25', text: '授業 +25'},
  ],
  2: [
    {value: 'class:50', text: '授業 +50'},
    {value: 'class:25', text: '授業 +25'},
  ],
  3: [
    {value: 'gift', text: '活動支給'},
    {value: 'outing:rng', text: 'お出かけ(ランダム)'},
  ],
  4: [
    {value: 'consultation', text: '相談'},
    {value: 'outing:rng', text: 'お出かけ(ランダム)'},
  ],
  5: [
    {value: 'sp_lesson:90', text: 'SPレッスン'},
    {value: 'lesson:60', text: 'レッスン'},
  ],
  6: [
    {value: 'gift', text: '活動支給'},
    {value: 'consultation', text: '相談'},
    {value: 'outing:rng', text: 'お出かけ(ランダム)'},
    {value: 'rest', text: '休む'},
  ],
  7: [
    {value: 'push_lesson:90', text: '追い込みレッスン'},
  ],
  7.5: [
    {value: 'push_bonus:90', text: '追い込みボーナス'},
  ],
  8: [
    {value: 'exam_1:20', text: '中間試験'},
  ],
  9: [
    {value: 'consultation', text: '相談'},
    {value: 'gift:rng', text: '活動支給(ランダム)'},
    {value: 'outing:rng', text: 'お出かけ(ランダム)'},
    {value: 'rest', text: '休む'},
  ],
  10: [
    {value: 'class:80', text: '授業 +80'},
    {value: 'class:55', text: '授業 +55'},
    {value: 'class:30', text: '授業 +30'},
    {value: 'rest', text: '休む'},
  ],
  11: [
    {value: 'sp_lesson:170', text: 'SPレッスン'},
    {value: 'lesson:110', text: 'レッスン'},
    {value: 'rest', text: '休む'},
  ],
  12: [
    {value: 'class:110', text: '授業 +110'},
    {value: 'class:45', text: '授業 +45'},
    {value: 'rest', text: '休む'},
  ],
  13: [
    {value: 'gift', text: '活動支給'},
    {value: 'outing', text: 'お出かけ'},
    {value: 'rest', text: '休む'},
  ],
  14: [
    {value: 'sp_lesson:200', text: 'SPレッスン'},
    {value: 'lesson:120', text: 'レッスン'},
    {value: 'rest', text: '休む'},
  ],
  15: [
    {value: 'sp_lesson:220', text: 'SPレッスン'},
    {value: 'lesson:150', text: 'レッスン'},
    {value: 'class:110', text: '授業 +110'},
    {value: 'class:45', text: '授業 +45'},
    {value: 'rest', text: '休む'},
  ],
  16: [
    {value: 'gift', text: '活動支給'},
    {value: 'outing', text: 'お出かけ'},
    {value: 'consultation', text: '相談'},
    {value: 'rest', text: '休む'},
  ],
  17: [
    {value: 'push_lesson:165', text: '追い込みレッスン'},
  ],
  17.5: [
    {value: 'push_bonus:145', text: '追い込みボーナス'},
  ],
  18: [
    {value: 'exam_2:30', text: '最終試験'},
  ],
};

const basicParameterUpList = {
  lesson_parameter_up: 'レッスン終了時',
  normal_lesson_parameter_up: '通常レッスン終了時',
  sp_lesson_parameter_up: 'SPレッスン終了時',
  class_parameter_up: '授業終了時',
  gift_parameter_up: '活動支給選択時',
  outing_parameter_up: 'お出かけ終了時',
  consultation_parameter_up: '相談選択時',
  rest_parameter_up: '休む選択時',
  exam_parameter_up: '試験終了時',
};

const updateInputData = () => {
  emit('input-data-update', inputData);
}
</script>

<template>
  <div class="planning-area">
    <div class="content-area">
      <div class="schedule-area">
        <div class="common-headline">
          <span class="common-headline-text font-bold">スケジュール</span>
        </div>
        <div class="schedule">
          <table class="table schedule">
            <thead>
            <tr>
              <th class="table-header"></th>
              <th class="table-header detail"><span class="table-header-text">内容</span></th>
              <th class="table-header type"><span class="table-header-text">属性</span></th>
              <th class="table-header vocal"><span class="table-header-text">ボーカル</span></th>
              <th class="table-header dance"><span class="table-header-text">ダンス</span></th>
              <th class="table-header visual"><span class="table-header-text">ビジュアル</span></th>
              <th class="table-header total"><span class="table-header-text">合計値</span></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="i in [1,2,3,4,5,6,7,7.5,8,9,10,11,12,13,14,15,16,17,17.5,18]" :key="i">
              <th class="table-header"><span class="table-header-text" v-if="Number.isInteger(i)">{{ i }}</span></th>
              <td class="table-data detail">
                <select class="table-select" v-model="inputData['planning']['schedule'][i]['schedule_detail']" v-if="scheduleData[i].length > 1">
                  <option class="table-option" v-for="option in scheduleData[i]" v-bind:class="{'rng': option.value.includes(':rng')}" v-bind:value="option.value">{{ option.text }}</option>
                </select>
                <span class="table-data-text" v-else>{{ scheduleData[i][0]['text'] }}</span>
              </td>
              <td class="table-data type">
                <select class="table-select" v-model="inputData['planning']['schedule'][i]['type']" v-if="inputData['planning']['schedule'][i]['schedule_detail'].includes('lesson') || inputData['planning']['schedule'][i]['schedule_detail'].includes('class')">
                  <option class="table-option vocal" value="vocal">ボーカル</option>
                  <option class="table-option dance" value="dance">ダンス</option>
                  <option class="table-option visual" value="visual">ビジュアル</option>
                </select>
              </td>
              <td class="table-data vocal"><span class="table-data-text">0</span></td>
              <td class="table-data dance"><span class="table-data-text">0</span></td>
              <td class="table-data visual"><span class="table-data-text">0</span></td>
              <td class="table-data total"><span class="table-data-text">0</span></td>
            </tr>
            <tr>
              <th class="table-header last"></th>
              <td class="table-data detail last"><span class="table-data-text font-bold last">最終評価</span></td>
              <td class="table-data type last"></td>
              <td class="table-data vocal last"><span class="table-data-text font-bold vocal">0</span></td>
              <td class="table-data dance last"><span class="table-data-text font-bold dance">0</span></td>
              <td class="table-data visual last"><span class="table-data-text font-bold visual">0</span></td>
              <td class="table-data total last"><span class="table-data-text font-bold last">0</span></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="event-area">
        <div class="challenge-p-item-area">
          <div class="common-headline">
            <span class="common-headline-text font-bold">チャレンジPアイテム</span>
          </div>
          <div class="challenge-p-item">
            <table class="table challenge-p-item">
              <thead>
              <tr>
                <th class="table-header detail"><span class="table-header-text">内容</span></th>
                <th class="table-header total"><span class="table-header-text">上限上昇値</span></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="challengePItem in 3" :key="challengePItem">
                <td class="table-data detail"><span class="table-data-text">チャレンジPアイテム{{ challengePItem }}</span></td>
                <td class="table-data total"><span class="table-data-text">0</span></td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="produce-p-item-area">
          <div class="common-headline">
            <span class="common-headline-text font-bold">Pアイテム</span>
          </div>
          <div class="produce-p-item">
            <table class="table produce-p-item">
              <thead>
              <tr>
                <th class="table-header detail"><span class="table-header-text">内容</span></th>
                <th class="table-header vocal"><span class="table-header-text">上昇値</span></th>
                <th class="table-header count"><span class="table-header-text">回数</span></th>
                <th class="table-header total"><span class="table-header-text">合計値</span></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="producePItem in 6" :key="producePItem">
                <td class="table-data detail"><span class="table-data-text">Pアイテム{{ producePItem }}</span></td>
                <td class="table-data vocal"><span class="table-data-text">0</span></td>
                <td class="table-data count"><input class="table-input-number" type="number" min="0" max="99" value="0"></td>
                <td class="table-data total"><span class="table-data-text">0</span></td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="support-card-event-area">
          <div class="common-headline">
            <span class="common-headline-text font-bold">サポートカードイベント</span>
          </div>
          <div class="support-card-event">
            <table class="table support-card-event">
              <thead>
              <tr>
                <th class="table-header detail"><span class="table-header-text">内容</span></th>
                <th class="table-header vocal"><span class="table-header-text">上昇値</span></th>
                <th class="table-header count"><span class="table-header-text">回数</span></th>
                <th class="table-header total"><span class="table-header-text">合計値</span></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="producePItem in 6" :key="producePItem">
                <td class="table-data detail"><span class="table-data-text">サポートカード{{ producePItem }}イベント</span></td>
                <td class="table-data vocal"><span class="table-data-text">0</span></td>
                <td class="table-data count"><input class="table-input-number" type="number" min="0" max="1" value="0"></td>
                <td class="table-data total"><span class="table-data-text">0</span></td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="parameter-up-area">
        <div class="common-headline">
          <span class="common-headline-text font-bold">パラメータ上昇値</span>
        </div>
        <div class="parameter-up">
          <div class="basic-parameter-up">
            <table class="table basic-parameter-up">
              <thead>
              <tr>
                <th class="table-header detail"><span class="table-header-text">内容</span></th>
                <th class="table-header vocal"><span class="table-header-text">ボーカル</span></th>
                <th class="table-header dance"><span class="table-header-text">ダンス</span></th>
                <th class="table-header visual"><span class="table-header-text">ビジュアル</span></th>
                <th class="table-header count"><span class="table-header-text">回数</span></th>
                <th class="table-header total"><span class="table-header-text">合計値</span></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="basicParameterUp in basicParameterUpList" :key="basicParameterUp">
                <td class="table-data detail"><span class="table-data-text">{{ basicParameterUp }}</span></td>
                <td class="table-data vocal"><span class="table-data-text">0</span></td>
                <td class="table-data dance"><span class="table-data-text">0</span></td>
                <td class="table-data visual"><span class="table-data-text">0</span></td>
                <td class="table-data count"><span class="table-data-text" v-if="!basicParameterUp.includes('レッスン')">0</span></td>
                <td class="table-data total"><span class="table-data-text" v-if="!basicParameterUp.includes('レッスン')">0</span></td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="extra-parameter-up">
            <table class="table extra-parameter-up">
              <thead>
              <tr>
                <th class="table-header detail"><span class="table-header-text">内容</span></th>
                <th class="table-header vocal"><span class="table-header-text">ボーカル</span></th>
                <th class="table-header dance"><span class="table-header-text">ダンス</span></th>
                <th class="table-header visual"><span class="table-header-text">ビジュアル</span></th>
                <th class="table-header count"><span class="table-header-text">回数</span></th>
                <th class="table-header total"><span class="table-header-text">合計値</span></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="extraParameterUp in 9" :key="extraParameterUp">
                <td class="table-data detail"><span class="table-data-text">{{ extraParameterUp }}</span></td>
                <td class="table-data vocal"><span class="table-data-text">0</span></td>
                <td class="table-data dance"><span class="table-data-text">0</span></td>
                <td class="table-data visual"><span class="table-data-text">0</span></td>
                <td class="table-data count"><input class="table-input-number" type="number" min="0" max="99" value="0"></td>
                <td class="table-data total"><span class="table-data-text">0</span></td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

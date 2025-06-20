<script setup>
import {ref, watch} from "vue";
import {parameterList, fanList} from "@/consts/auditionConst";
import SupportCardSelect from "@/components/modals/SupportCardSelect.vue";
import ProduceIdolSelect from "@/components/modals/ProduceIdolSelect.vue";

const props = defineProps(['inputData', 'basicData', 'idols', 'supportCards', 'minDearLevel']);
const emit = defineEmits(['input-data-update']);
const idols = props.idols;
const supportCards = props.supportCards;
const minDearLevel = props.minDearLevel;

const produceMemoryParameterAbilityValue = [
  {value: 25, text: '+25'},
  {value: 20, text: '+20'},
  {value: 15, text: '+15'},
  {value: 10, text: '+10'},
  {value: 3.5, text: '+3.5%'},
  {value: 2.8, text: '+2.8%'},
  {value: 2.1, text: '+2.1%'},
  {value: 1.4, text: '+1.4%'},
];
const produceMemoryPointAbilityValue = [
  {value: 50, text: '+50'},
  {value: 40, text: '+40'},
  {value: 30, text: '+30'},
  {value: 20, text: '+20'},
];
const produceMemoryHpRecoverAbilityValue = [
  {value: 60, text: '60%'},
  {value: 45, text: '45%'},
  {value: 30, text: '30%'},
];
const produceMemoryAbilityValue = {
  'vocal': produceMemoryParameterAbilityValue,
  'dance': produceMemoryParameterAbilityValue,
  'visual': produceMemoryParameterAbilityValue,
  'point': produceMemoryPointAbilityValue,
  'hp-recover': produceMemoryHpRecoverAbilityValue,
}

let inputData = ref(props.inputData);
let basicData = ref(props.basicData);

let produceIdolSelectorOpen = ref(false);
let supportCardSelectorOpen = ref(false);

const updateInputData = () => {
  emit('input-data-update', inputData.value);
}
const buttonProduceIdolSelector = () => {
  produceIdolSelectorOpen.value = true;
}
const buttonSupportCardSelector = (index) => {
  supportCardSelectorOpen.value = index;
}
const closeProduceIdolSelector = (idolDetail) => {
  if (idolDetail !== null) {
    inputData.value['organization']['produce_idol']['id'] = idolDetail['id'];
    inputData.value['organization']['produce_idol']['idol_id'] = idolDetail['idol_id'];
    inputData.value['organization']['produce_idol']['training_level'] = idolDetail['training_level'];
    inputData.value['organization']['produce_idol']['blossoming_level'] = idolDetail['blossoming_level'];
    inputData.value['organization']['produce_idol']['dear_level'] = idolDetail['dear_level'];

    if (inputData.value['produce_type'] === 'nia_master') {
      for (let i = 1; i <= 3; i++) {
        inputData.value['planning']['audition'][i]['fan'] = fanList['nia_master'][i]['max'];
        inputData.value['planning']['audition'][i]['type_1'] = parameterList['nia_master'][idolDetail['parameter_type']][i]['max']['type_1'];
        inputData.value['planning']['audition'][i]['type_2'] = parameterList['nia_master'][idolDetail['parameter_type']][i]['max']['type_2'];
        inputData.value['planning']['audition'][i]['type_3'] = parameterList['nia_master'][idolDetail['parameter_type']][i]['max']['type_3'];
      }
    }
    updateInputData();
  }
  produceIdolSelectorOpen.value = false;
}
const closeSupportCardSelector = (id, level) => {
  if (id !== null) {
    inputData.value['organization']['support_card'][supportCardSelectorOpen.value]['id'] = id;
    inputData.value['organization']['support_card'][supportCardSelectorOpen.value]['level'] = level;
    updateInputData();
  }
  supportCardSelectorOpen.value = false;
}
const changeProduceMemoryAbilityType = (produceMemoryIndex, abilityIndex) => {
  let abilityType = inputData.value['organization']['produce_memory'][produceMemoryIndex][abilityIndex]['ability_type'];
  inputData.value['organization']['produce_memory'][produceMemoryIndex][abilityIndex]['ability_value'] = produceMemoryAbilityValue[abilityType][0]['value'];
  updateInputData();
}
watch(() => props.inputData, () => {
  inputData.value = props.inputData;
});
watch(() => props.basicData, () => {
  basicData.value = props.basicData;
});
</script>

<template>
  <div class="organization-area">
    <div class="content-area">
      <div class="produce-idol-area">
        <div class="common-headline">
          <span class="common-headline-text font-bold">プロデュースアイドル詳細</span>
        </div>
        <div class="produce-idol-content-area">
          <div class="produce-idol">
            <div class="produce-idol-image">
              <button class="produce-idol-select-button" :style="{ backgroundImage: [inputData['organization']['produce_idol']['id'] !== null ? 'url(./image/produceIdols/' + inputData['organization']['produce_idol']['id'] + '.png)' : 'none'] }" @click="buttonProduceIdolSelector">
                <span class="produce-idol-select-text" v-show="inputData['organization']['produce_idol']['id'] === null">Pアイドルを選択</span>
              </button>
            </div>
            <div class="produce-idol-info-area">
              <div class="produce-idol-name-area">
                <span class="produce-idol-name-text font-bold" v-if="inputData['organization']['produce_idol']['id']">{{ basicData['produce_idol']['name'] }}</span>
                <span class="produce-idol-name-text font-bold" v-else>プロデュースアイドル名</span>
              </div>
              <div class="produce-idol-level-area">
                <div class="produce-idol-level training-level">
                  <label class="basic-input-number-name font-bold">特訓段階</label>
                  <input class="basic-input-number" type="number" min="0" max="6" v-model="inputData['organization']['produce_idol']['training_level']" v-bind:disabled="inputData['organization']['produce_idol']['id'] === null" @change="updateInputData">
                </div>
                <div class="produce-idol-level blossoming-level">
                  <label class="basic-input-number-name font-bold">才能開花</label>
                  <input class="basic-input-number" type="number" min="0" max="4" v-model="inputData['organization']['produce_idol']['blossoming_level']" v-bind:disabled="inputData['organization']['produce_idol']['id'] === null" @change="updateInputData">
                </div>
                <div class="produce-idol-level dear-level">
                  <label class="basic-input-number-name font-bold">親愛度</label>
                  <input class="basic-input-number" type="number" v-bind:min="minDearLevel" max="27" v-model="inputData['organization']['produce_idol']['dear_level']" v-bind:disabled="inputData['organization']['produce_idol']['id'] === null" @change="updateInputData">
                </div>
              </div>
            </div>
            <div class="produce-idol-parameter-area">
              <table class="produce-idol-parameter-table">
                <thead>
                <tr>
                  <th class="table-header"></th>
                  <th class="table-header-type vocal"><span class="table-header-type-text">ボーカル</span></th>
                  <th class="table-header-type dance"><span class="table-header-type-text">ダンス</span></th>
                  <th class="table-header-type visual"><span class="table-header-type-text">ビジュアル</span></th>
                  <th class="table-header-type hp pc-design"><span class="table-header-type-text">体力</span></th>
                  <th class="table-header-type point pc-design"><span class="table-header-type-text">Pポイント</span></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <th class="table-header"><span class="table-header-text">初期値</span><span class="table-header-text-abbr">初期値</span></th>
                  <td class="table-data vocal"><span>{{ basicData['parameter']['init_vocal'] }}</span></td>
                  <td class="table-data dance"><span>{{ basicData['parameter']['init_dance'] }}</span></td>
                  <td class="table-data visual"><span>{{ basicData['parameter']['init_visual'] }}</span></td>
                  <td class="table-data hp pc-design"><span>{{ basicData['parameter']['init_hp'] }}</span></td>
                  <td class="table-data point pc-design"><span>{{ basicData['parameter']['init_point'] }}</span></td>
                </tr>
                <tr>
                  <th class="table-header"><span class="table-header-text">パラメータボーナス</span><span class="table-header-text-abbr">パラボ</span></th>
                  <td class="table-data vocal"><span>{{ (basicData['parameter']['bonus_vocal'] / 10).toFixed(1) }}%</span></td>
                  <td class="table-data dance"><span>{{ (basicData['parameter']['bonus_dance'] / 10).toFixed(1) }}%</span></td>
                  <td class="table-data visual"><span>{{ (basicData['parameter']['bonus_visual'] / 10).toFixed(1) }}%</span></td>
                  <td class="table-data hp pc-design"><span>-</span></td>
                  <td class="table-data point pc-design"><span>-</span></td>
                </tr>
                <tr>
                  <th class="table-header"><span class="table-header-text">SPレッスン発生率</span><span class="table-header-text-abbr">SP率</span></th>
                  <td class="table-data vocal"><span>{{ (basicData['parameter']['sp_lesson_rate_vocal'] / 10).toFixed(1) }}%</span></td>
                  <td class="table-data dance"><span>{{ (basicData['parameter']['sp_lesson_rate_dance'] / 10).toFixed(1) }}%</span></td>
                  <td class="table-data visual"><span>{{ (basicData['parameter']['sp_lesson_rate_visual'] / 10).toFixed(1) }}%</span></td>
                  <td class="table-data hp pc-design"><span>-</span></td>
                  <td class="table-data point pc-design"><span>-</span></td>
                </tr>
                </tbody>
              </table>
              <table class="produce-idol-parameter-table phone-design">
                <thead>
                <tr>
                  <th class="table-header"></th>
                  <th class="table-header-type hp"><span class="table-header-type-text">体力</span></th>
                  <th class="table-header-type point"><span class="table-header-type-text">Pポイント</span></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <th class="table-header"><span class="table-header-text">初期値</span><span class="table-header-text-abbr">初期値</span></th>
                  <td class="table-data hp"><span>{{ basicData['parameter']['init_hp'] }}</span></td>
                  <td class="table-data point"><span>{{ basicData['parameter']['init_point'] }}</span></td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="support-card-area">
        <div class="common-headline">
          <span class="common-headline-text font-bold">サポートカード詳細</span>
        </div>
        <div class="support-card-content-area">
          <div class="support-card">
            <div class="support-card-detail" v-bind:class="'row-' + i" v-for="i in 6" :key="i">
              <div class="support-card-image">
                <button class="support-card-select-button" :style="{ backgroundImage: [inputData['organization']['support_card'][i]['id'] !== null ? 'url(./image/supportCards/' + inputData['organization']['support_card'][i]['id'] + '.png)' : 'none'] }" @click="buttonSupportCardSelector(i)">
                  <span class="support-card-select-text" v-show="inputData['organization']['support_card'][i]['id'] === null">サポートカードを選択</span>
                </button>
              </div>
              <div class="support-card-info">
                <div class="support-card-name">
                  <span class="support-card-info-text font-bold" v-if="inputData['organization']['support_card'][i]['id']">{{ basicData['support_card'][i]['name'] }}</span>
                  <span class="support-card-info-text font-bold" v-else>サポートカード未選択</span>
                </div>
                <div class="support-card-level">
                  <label class="basic-input-number-name font-bold">Lv</label>
                  <input class="basic-input-number" type="number" min="1" v-bind:max="[inputData['organization']['support_card'][i]['id'] !== null ? basicData['support_card'][i]['max_level'] : 1]" v-model="inputData['organization']['support_card'][i]['level']" v-bind:disabled="inputData['organization']['support_card'][i]['id'] === null" @change="updateInputData">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="produce-memory-area">
        <div class="common-headline">
          <span class="common-headline-text font-bold">メモリー詳細</span>
        </div>
        <div class="produce-memory-content-area">
          <div class="produce-memory">
            <div class="produce-memory-detail" v-bind:class="'row-' + i" v-for="i in 4" :key="i">
              <div class="produce-memory-name">
                <span class="produce-memory-name-text font-bold">メモリー{{ i }}</span>
              </div>
              <div class="produce-memory-ability-area">
                <div class="produce-memory-ability-type-area">
                  <select class="basic-select" v-model="inputData['organization']['produce_memory'][i][1]['ability_type']" @change="changeProduceMemoryAbilityType(i, 1)">
                    <option value="vocal">ボーカル</option>
                    <option value="point">Pポイント</option>
                    <option value="hp-recover">体力回復</option>
                  </select>
                </div>
                <div class="produce-memory-ability-value-area">
                  <select class="basic-select" v-model="inputData['organization']['produce_memory'][i][1]['ability_value']" @change="updateInputData">
                    <option v-for="option in produceMemoryAbilityValue[inputData['organization']['produce_memory'][i][1]['ability_type']]" v-bind:value="option.value">{{ option.text }}</option>
                  </select>
                </div>
              </div>
              <div class="produce-memory-ability-area">
                <div class="produce-memory-ability-type-area">
                  <select class="basic-select" v-model="inputData['organization']['produce_memory'][i][2]['ability_type']" @change="changeProduceMemoryAbilityType(i, 2)">
                    <option value="dance">ダンス</option>
                    <option value="point">Pポイント</option>
                    <option value="hp-recover">体力回復</option>
                  </select>
                </div>
                <div class="produce-memory-ability-value-area">
                  <select class="basic-select" v-model="inputData['organization']['produce_memory'][i][2]['ability_value']" @change="updateInputData">
                    <option v-for="option in produceMemoryAbilityValue[inputData['organization']['produce_memory'][i][2]['ability_type']]" v-bind:value="option.value">{{ option.text }}</option>
                  </select>
                </div>
              </div>
              <div class="produce-memory-ability-area">
                <div class="produce-memory-ability-type-area">
                  <select class="basic-select" v-model="inputData['organization']['produce_memory'][i][3]['ability_type']" @change="changeProduceMemoryAbilityType(i, 3)">
                    <option value="visual">ビジュアル</option>
                    <option value="point">Pポイント</option>
                    <option value="hp-recover">体力回復</option>
                  </select>
                </div>
                <div class="produce-memory-ability-value-area">
                  <select class="basic-select" v-model="inputData['organization']['produce_memory'][i][3]['ability_value']" @change="updateInputData">
                    <option v-for="option in produceMemoryAbilityValue[inputData['organization']['produce_memory'][i][3]['ability_type']]" v-bind:value="option.value">{{ option.text }}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Teleport to="#modal-area">
    <ProduceIdolSelect
        v-if="produceIdolSelectorOpen"
        :idols="idols"
        @selector-close="closeProduceIdolSelector"
    />
    <SupportCardSelect
        v-if="supportCardSelectorOpen !== false"
        :support-cards="supportCards"
        :plan-filter="inputData['organization']['produce_idol']['id'] ? basicData['produce_idol']['plan'] : null"
        @selector-close="closeSupportCardSelector"
    />
  </Teleport>
</template>

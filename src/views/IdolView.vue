<script setup xmlns="http://www.w3.org/1999/html">
import {ref} from "vue";

const props = defineProps(['idols', 'supportCards'])
const idols = props.idols;

let allIdolList = ref(idols.getAllIdol());
</script>

<template>
  <div class="headline-area">
    <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="36px" fill="#333333">
      <path d="M480-240q134 0 227-93.5T800-560q0-31-5-59.5T779-675q-27 17-57 26t-62 9q-54 0-101.5-24.5T480-734q-31 45-78.5 69.5T300-640q-32 0-62-9t-57-26q-11 27-16 55.5t-5 59.5q0 133 93.5 226.5T480-240ZM360-470q21 0 35.5-14.5T410-520q0-21-14.5-35.5T360-570q-21 0-35.5 14.5T310-520q0 21 14.5 35.5T360-470Zm240 0q21 0 35.5-14.5T650-520q0-21-14.5-35.5T600-570q-21 0-35.5 14.5T550-520q0 21 14.5 35.5T600-470ZM300-720q58 0 99-41t41-99v-18q-68 8-125 43t-95 89q18 12 38 19t42 7Zm360 0q22 0 42-6.5t38-19.5q-38-54-94.5-89T520-878v18q0 58 41 99t99 41ZM88-80q-35 0-59-26T8-167l36-395q8-84 45.5-157t96-126.5q58.5-53.5 134-84T480-960q85 0 160.5 30.5t134 84Q833-792 870.5-719T916-562l36 395q3 35-21 61t-59 26H88Zm392-80q-125 0-225-69.5T110-408L88-160h784l-22-248q-45 109-144.5 178.5T480-160Zm40-718Zm-80 0Zm40 718h392H88h392Z"/>
    </svg>
    <span class="headline-text">Pアイドル</span>
  </div>
  <div class="idol-view-area">
    <div class="description-area">
      <span class="description">プロデュースアイドルの確認、特訓段階・才能開花の編集ができます。</span>
    </div>
    <div class="idol-list-area">
      <div class="idol" v-bind:class="(idol.first_name).toLowerCase()" v-for="idol in allIdolList" :key="idol.id">
        <div class="idol-info-area" v-bind:class="(idol.first_name).toLowerCase()">
          <div class="idol-name">
            <span class="idol-name-text">{{ idol.name }}</span>
          </div>
          <div class="idol-dear-level">
            <span class="idol-dear-level-text">親愛度:{{ idol.dear_level }}</span>
          </div>
        </div>
        <div class="produce-idol-area">
          <div class="produce-idol" v-for="produce in idols.getPIdolFromIdolId(idol.id)" :key="produce.id">
            <div class="produce-idol-image-area" :style="{ backgroundImage: 'url(./image/produceIdols/' + produce.id + '.png)' }">
              <div class="produce-idol-level-area">
                <span class="produce-idol-level-text">✨{{ produce.training_level }}</span>
                <span class="produce-idol-level-text">🍀{{ produce.blossoming_level }}</span>
              </div>
            </div>
            <div class="produce-idol-info-area">
              <div class="produce-idol-name-area">
                <span class="produce-idol-name-text">{{ produce.name }}</span>
              </div>
              <div class="produce-idol-plan-area">
                <span class="produce-idol-plan-text">{{ produce.plan_display }}『{{ produce.effect_display }}』</span>
              </div>
              <div class="produce-idol-hp-area">
                <div class="produce-idol-hp">
                  <span class="produce-idol-hp-text">体力</span>
                  <div class="produce-idol-hp-value">
                    <span class="produce-idol-hp-value-text">{{ produce.init_hp }}</span>
                  </div>
                </div>
              </div>
              <div class="produce-idol-parameter-area">
                <div class="produce-idol-parameter">
                  <span class="produce-idol-parameter-text vocal">ボーカル</span>
                  <div class="produce-idol-parameter-value vocal">
                    <span class="produce-idol-parameter-value-text">{{ produce.init_vocal }}</span>
                    <span class="produce-idol-parameter-value-text">{{ produce.bonus_vocal }}%</span>
                  </div>
                </div>
                <div class="produce-idol-parameter">
                  <span class="produce-idol-parameter-text dance">ダンス</span>
                  <div class="produce-idol-parameter-value dance">
                    <span class="produce-idol-parameter-value-text">{{ produce.init_dance }}</span>
                    <span class="produce-idol-parameter-value-text">{{ produce.bonus_dance }}%</span>
                  </div>
                </div>
                <div class="produce-idol-parameter">
                  <span class="produce-idol-parameter-text visual">ビジュアル</span>
                  <div class="produce-idol-parameter-value visual">
                    <span class="produce-idol-parameter-value-text">{{ produce.init_visual }}</span>
                    <span class="produce-idol-parameter-value-text">{{ produce.bonus_visual }}%</span>
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

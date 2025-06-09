export const rarities = {
    RARITY_R: 'r',
    RARITY_SR: 'sr',
    RARITY_SSR: 'ssr',
    RARITY_SSR_EVENT: 'ssr_event',
}

export const levels = {
    MIN_LEVEL: 1,
    R_MAX_LEVEL: 40,
    SR_MAX_LEVEL: 50,
    SSR_MAX_LEVEL: 60,
}

export const types = {
    VOCAL: 'vocal',
    DANCE: 'dance',
    VISUAL: 'visual',
    ASSIST: 'assist',
}

export const plans = {
    FREE: 'free',
    SENSE: 'sense',
    LOGIC: 'logic',
    ANOMALY: 'anomaly',
}

export const events = {
    NONE: 'none',
    // 固有Pアイテム獲得
    GET_UNIQUE_P_ITEM: 'get_unique_p_item',
    // 固有スキルカード獲得
    GET_UNIQUE_CARD: 'get_unique_card',
    // パラメータ上昇
    PARAMETER_UP: 'parameter_up',
    // HP回復
    HP_RECOVER: 'hp_recover',
    // Pポイント獲得
    GET_P_POINT: 'get_p_point',
    // 基本スキルカード変換
    BASIC_CARD_CHANGE: 'basic_card_change',
    // スキルカードランダム強化
    CARD_RANDOM_STRENGTHEN: 'card_random_strengthen',
    // トラブルカードランダム削除
    TROUBLE_CARD_DELETE: 'trouble_card_delete',
    // スキルカード選択強化
    CARD_SELECT_STRENGTHEN: 'card_select_strengthen',
    // スキルカード選択削除
    CARD_SELECT_DELETE: 'card_select_delete',
}

export const abilities = {
    NONE: 'none',
    // 初期パラメータ上昇
    INIT_PARAMETER_UP: 'init_parameter_up',
    // パラメータボーナス+
    PARAMETER_BONUS: 'parameter_bonus',
    // 最大体力上昇
    MAX_HP_UP: 'max_hp_up',
    // 初期Pポイント+
    INIT_P_POINT: 'init_p_point',
    // スキルカードサポート発生率増加
    CARD_SUPPORT_RATE: 'card_support_rate',
    // サポートカードイベント2強化
    EVENT_STRENGTHEN: 'event_strengthen',
    // SPレッスン発生率+
    SP_LESSON_RATE: 'sp_lesson_rate',
    // レッスン終了時パラメータ上昇
    LESSON_PARAMETER_UP: 'lesson_parameter_up',
    // 通常レッスン終了時パラメータ上昇
    NORMAL_LESSON_PARAMETER_UP: 'normal_lesson_parameter_up',
    // SPレッスン終了時パラメータ上昇
    SP_LESSON_PARAMETER_UP: 'sp_lesson_parameter_up',
    // スキルカード獲得時パラメータ上昇
    CARD_PARAMETER_UP: 'card_parameter_up',
    // アクティブスキルカード獲得時パラメータ上昇
    ACTIVE_CARD_PARAMETER_UP: 'active_card_parameter_up',
    // メンタルスキルカード獲得時パラメータ上昇
    MENTAL_CARD_PARAMETER_UP: 'mental_card_parameter_up',
    // 好調効果のスキルカード獲得時パラメータ上昇
    KOTYO_CARD_PARAMETER_UP: 'kotyo_card_parameter_up',
    // 集中効果のスキルカード獲得時パラメータ上昇
    SYUTYU_CARD_PARAMETER_UP: 'syutyu_card_parameter_up',
    // やる気効果のスキルカード獲得時パラメータ上昇
    YARUKI_CARD_PARAMETER_UP: 'yaruki_card_parameter_up',
    // 好印象効果のスキルカード獲得時パラメータ上昇
    KOINSYO_CARD_PARAMETER_UP: 'koinsyo_card_parameter_up',
    // 強気効果のスキルカード獲得時パラメータ上昇
    TUYOKI_CARD_PARAMETER_UP: 'tuyoki_card_parameter_up',
    // 全力効果のスキルカード獲得時パラメータ上昇
    ZENRYOKU_CARD_PARAMETER_UP: 'zenryoku_card_parameter_up',
    // 温存効果のスキルカード獲得時パラメータ上昇
    ONZON_CARD_PARAMETER_UP: 'onzon_card_parameter_up',
    // スキルカード強化時パラメータ上昇
    CARD_STRENGTHEN_PARAMETER_UP: 'card_strengthen_parameter_up',
    // アクティブスキルカード強化時パラメータ上昇
    ACTIVE_CARD_STRENGTHEN_PARAMETER_UP: 'active_card_strengthen_parameter_up',
    // メンタルスキルカード強化時パラメータ上昇
    MENTAL_CARD_STRENGTHEN_PARAMETER_UP: 'mental_card_strengthen_parameter_up',
    // スキルカード削除時パラメータ上昇
    CARD_DELETE_PARAMETER_UP: 'card_delete_parameter_up',
    // アクティブスキルカード削除時パラメータ上昇
    ACTIVE_CARD_DELETE_PARAMETER_UP: 'active_card_delete_parameter_up',
    // メンタルスキルカード削除時パラメータ上昇
    MENTAL_CARD_DELETE_PARAMETER_UP: 'mental_card_delete_parameter_up',
    // スキルカードチェンジ時パラメータ上昇
    CARD_CHANGE_PARAMETER_UP: 'card_change_parameter_up',
    // アクティブスキルカードチェンジ時パラメータ上昇
    ACTIVE_CARD_ARD_CHANGE_PARAMETER_UP: 'active_card_card_change_parameter_up',
    // メンタルスキルカードチェンジ時パラメータ上昇
    MENTAL_CARD_CARD_CHANGE_PARAMETER_UP: 'mental_card_card_change_parameter_up',
    // スキルカードカスタマイズ時パラメータ上昇
    CARD_CUSTOMIZE_PARAMETER_UP: 'card_customize_parameter_up',
    // 授業・営業終了時パラメータ上昇
    CLASS_PARAMETER_UP: 'class_parameter_up',
    // 活動支給・差し入れ選択時パラメータ上昇
    GIFT_PARAMETER_UP: 'gift_parameter_up',
    // お出かけ終了時パラメータ上昇
    OUTING_PARAMETER_UP: 'outing_parameter_up',
    // 相談選択時パラメータ上昇
    CONSULTATION_PARAMETER_UP: 'consultation_parameter_up',
    // 相談でPドリンク交換後パラメータ上昇
    CONSULTATION_DRINK_PARAMETER_UP: 'consultation_drink_parameter_up',
    // 休む選択時パラメータ上昇
    REST_PARAMETER_UP: 'rest_parameter_up',
    // Pドリンク獲得時パラメータ上昇
    DRINK_PARAMETER_UP: 'drink_parameter_up',
    // 試験・オーディション終了時パラメータ上昇
    EXAM_PARAMETER_UP: 'exam_parameter_up',
    // レッスン終了時Pポイント獲得量増加
    LESSON_P_POINT_UP: 'lesson_p_point_up',
    // SPレッスン終了時Pポイント獲得量増加
    SP_LESSON_P_POINT_UP: 'sp_lesson_p_point_up',
    // SPレッスン終了時体力回復
    SP_LESSON_HP_RECOVER: 'sp_lesson_hp_recover',
    // 活動支給・差し入れ選択時体力回復
    GIFT_HP_RECOVER: 'gift_hp_recover',
    // 試験・オーディション終了時体力回復
    EXAM_HP_RECOVER: 'exam_hp_recover',
    // 相談のPドリンク割引
    CONSULTATION_DRINK_SALE: 'consultation_drink_sale',
}

export const abilityParameterThresholds = {
    r: {
        ability_2: [1, 15, 41],
        ability_4: [5, 36, 41],
        ability_5: [10, 26, 41],
        ability_6: [21, 31, 40],
    },
    sr: {
        ability_2: [1, 31, 51],
        ability_4: [5, 46, 51],
        ability_5: [10, 41, 51],
        ability_6: [25, 36, 50],
    },
    ssr: {
        ability_2: [1, 15, 46],
        ability_4: [5, 30, 51],
        ability_5: [10, 35, 56],
        ability_6: [25, 41, 60],
    },
    ssr_event: {
        ability_2: [1, 46, 61],
        ability_4: [5, 56, 61],
        ability_5: [10, 51, 61],
        ability_6: [25, 41, 60],
    },
}

export const abilityBasicParameterUpList = [
    {
        ability: abilities.LESSON_PARAMETER_UP,
        schedule: 'lesson',
        text: 'レッスン終了時',
    },
    {
        ability: abilities.NORMAL_LESSON_PARAMETER_UP,
        schedule: 'normal_lesson',
        text: '通常レッスン終了時',
    },
    {
        ability: abilities.SP_LESSON_PARAMETER_UP,
        schedule: 'sp_lesson',
        text: 'SPレッスン終了時',
    },
    {
        ability: abilities.CLASS_PARAMETER_UP,
        schedule: 'class',
        text: '授業・営業終了時',
    },
    {
        ability: abilities.GIFT_PARAMETER_UP,
        schedule: 'gift',
        text: '活動支給・差し入れ選択時',
    },
    {
        ability: abilities.OUTING_PARAMETER_UP,
        schedule: 'outing',
        text: 'お出かけ終了時',
    },
    {
        ability: abilities.CONSULTATION_PARAMETER_UP,
        schedule: 'consultation',
        text: '相談選択時',
    },
    {
        ability: abilities.REST_PARAMETER_UP,
        schedule: 'rest',
        text: '休む選択時',
    },
    {
        ability: abilities.EXAM_PARAMETER_UP,
        schedule: 'exam_1',
        text: '試験・オーディション終了時',
    },
]

export const abilityExtraParameterUpList = [
    {
        ability: abilities.CARD_PARAMETER_UP,
        text: 'スキルカード獲得時',
    },
    {
        ability: abilities.ACTIVE_CARD_PARAMETER_UP,
        text: 'アクティブスキルカード獲得時',
    },
    {
        ability: abilities.MENTAL_CARD_PARAMETER_UP,
        text: 'メンタルスキルカード獲得時',
    },
    {
        ability: abilities.KOTYO_CARD_PARAMETER_UP,
        text: '好調効果のスキルカード獲得時',
    },
    {
        ability: abilities.SYUTYU_CARD_PARAMETER_UP,
        text: '集中効果のスキルカード獲得時',
    },
    {
        ability: abilities.KOINSYO_CARD_PARAMETER_UP,
        text: '好印象効果のスキルカード獲得時',
    },
    {
        ability: abilities.YARUKI_CARD_PARAMETER_UP,
        text: 'やる気効果のスキルカード獲得時',
    },
    {
        ability: abilities.TUYOKI_CARD_PARAMETER_UP,
        text: '強気効果のスキルカード獲得時',
    },
    {
        ability: abilities.ZENRYOKU_CARD_PARAMETER_UP,
        text: '全力効果のスキルカード獲得時',
    },
    {
        ability: abilities.ONZON_CARD_PARAMETER_UP,
        text: '温存効果のスキルカード獲得時',
    },
    {
        ability: abilities.CARD_STRENGTHEN_PARAMETER_UP,
        text: 'スキルカード強化時',
    },
    {
        ability: abilities.ACTIVE_CARD_STRENGTHEN_PARAMETER_UP,
        text: 'アクティブスキルカード強化時',
    },
    {
        ability: abilities.MENTAL_CARD_STRENGTHEN_PARAMETER_UP,
        text: 'メンタルスキルカード強化時',
    },
    {
        ability: abilities.CARD_DELETE_PARAMETER_UP,
        text: 'スキルカード削除時',
    },
    {
        ability: abilities.ACTIVE_CARD_DELETE_PARAMETER_UP,
        text: 'アクティブスキルカード削除時',
    },
    {
        ability: abilities.MENTAL_CARD_DELETE_PARAMETER_UP,
        text: 'メンタルスキルカード削除時',
    },
    {
        ability: abilities.CARD_CHANGE_PARAMETER_UP,
        text: 'スキルカードチェンジ時',
    },
    {
        ability: abilities.CARD_CUSTOMIZE_PARAMETER_UP,
        text: 'スキルカードカスタマイズ時',
    },
    {
        ability: abilities.CONSULTATION_DRINK_PARAMETER_UP,
        text: '相談でPドリンク交換後',
    },
    {
        ability: abilities.DRINK_PARAMETER_UP,
        text: 'Pドリンク獲得時',
    },
]
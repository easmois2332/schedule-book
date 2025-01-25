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
    // パラメータボーナス
    PARAMETER_BONUS: 'parameter_bonus',
    // 最大体力上昇
    MAX_HP_UP: 'max_hp_up',
    // 初期Pポイント上昇
    INIT_P_POINT: 'init_p_point',
    // スキルカードサポート発生率増加
    CARD_SUPPORT_RATE: 'card_support_rate',
    // サポートカードイベント2強化
    EVENT_STRENGTHEN: 'event_strengthen',
    // SPレッスン発生率増加
    SP_LESSON_RATE: 'sp_lesson_rate',
    // レッスン終了時パラメータ上昇
    LESSON_PARAMETER_UP: 'lesson_parameter_up',
    // 通常レッスン終了時パラメータ上昇
    NORMAL_LESSON_PARAMETER_UP: 'normal_lesson_parameter_up',
    // SPレッスン終了時パラメータ上昇
    SP_LESSON_PARAMETER_UP: 'sp_lesson_parameter_up',
    // カード獲得時パラメータ上昇
    CARD_PARAMETER_UP: 'card_parameter_up',
    // アクティブカード獲得時パラメータ上昇
    ACTIVE_CARD_PARAMETER_UP: 'active_card_parameter_up',
    // メンタルカード獲得時パラメータ上昇
    MENTAL_CARD_PARAMETER_UP: 'mental_card_parameter_up',
    // 好調効果カード獲得時パラメータ上昇
    KOTYO_CARD_PARAMETER_UP: 'kotyo_card_parameter_up',
    // スキルカード強化時パラメータ上昇
    CARD_STRENGTHEN_PARAMETER_UP: 'card_strengthen_parameter_up',
    // アクティブカード強化時パラメータ上昇
    ACTIVE_CARD_STRENGTHEN_PARAMETER_UP: 'active_card_strengthen_parameter_up',
    // メンタルカード強化時パラメータ上昇
    MENTAL_CARD_STRENGTHEN_PARAMETER_UP: 'mental_card_strengthen_parameter_up',
    // スキルカード削除時パラメータ上昇
    CARD_DELETE_PARAMETER_UP: 'card_delete_parameter_up',
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

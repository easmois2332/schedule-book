import {rarities, types, events, abilities, abilityParameterThresholds} from "@/consts/cards";

export default class CardDetail {

    card: any

    constructor(card: any) {
        this.card = card

        // アビリティパラメータを計算
        this.calcInitParameterUp();
        this.calcParameterBonus();
        this.calcMaxHpUp();
        this.calcInitPPoint();
        this.calcCardSupportRate();
        this.calcEventEnhance();
        this.calcSpLessonRate();
        this.calcLessonParameterUp();
        this.calcNormalLessonParameterUp();
        this.calcSpLessonParameterUp();
        this.calcActiveCardParameterUp();
        this.calcMentalCardParameterUp();
        this.calcGoodCardParameterUp();
        this.calcCardEnhanceParameterUp();
        this.calcActiveCardEnhanceParameterUp();
        this.calcMentalCardEnhanceParameterUp();
        this.calcCardDeleteParameterUp();
        this.calcClassesAndBusinessParameterUp();
        this.calcActivitySupportAndGiftsParameterUp();
        this.calcOutingParameterUp();
        this.calcConsultationParameterUp();
        this.calcConsultationDrinkParameterUp();
        this.calcRestParameterUp();
        this.calcExamsAndAuditionsParameterUp();
        this.calcLessonPPointUp();
        this.calcSpLessonPPointUp();
        this.calcSpLessonHpRecover();
        this.calcActivitySupportAndGiftsHpRecover();
        this.calcExamsAndAuditionsHpRecover();
        this.calcConsultationDrinkSale();

        // イベントパラメータを計算
        this.calcEventParameter();
    }

    getCardDetails() {
        return this.card
    }

    /**
     * 各アビリティのパラメータを算出する
     * @param abilityNo
     * @param parameter
     */
    private getParameter(abilityNo: string, parameter: any) {
        if (this.card.level >= abilityParameterThresholds[this.card.rarity][abilityNo][0]) {
            if (this.card.level < abilityParameterThresholds[this.card.rarity][abilityNo][1]) {
                return parameter[this.card.rarity][0];
            } else if (this.card.level < abilityParameterThresholds[this.card.rarity][abilityNo][2]) {
                return parameter[this.card.rarity][1];
            } else {
                return parameter[this.card.rarity][2];
            }
        } else {
            return 0;
        }
    }

    /**
     * 初期パラメータ上昇
     */
    private calcInitParameterUp() {
        if (this.card.ability_1 === abilities.INIT_PARAMETER_UP) {
            let parameter = 0;
            switch (this.card.rarity) {
                case rarities.RARITY_SSR:
                case rarities.RARITY_SSR_EVENT:
                    parameter = 24 + (Math.floor(this.card.level / 5) * 3);
                    break;
                case rarities.RARITY_SR:
                    if (this.card.level < 20) {
                        parameter = 18 + (Math.floor(this.card.level / 5) * 2);
                    } else {
                        parameter = 18 + (Math.floor(this.card.level / 5) * 3) - 3;
                    }
                    break;
                case rarities.RARITY_R:
                    if (this.card.level < 15) {
                        parameter = 12 + (Math.floor(this.card.level / 5) * 3);
                    } else {
                        parameter = 12 + (Math.floor(this.card.level / 5) * 2) + 2;
                    }
                    break;
                default:
                    break;
            }
            this.card.ability_1_parameter = parameter;
            this.card.ability_1_display = `初期${this.card.type}上昇+${parameter}`;
        }
    }

    /**
     * パラメータボーナス
     */
    private calcParameterBonus() {
        if (this.card.ability_1 === abilities.PARAMETER_BONUS) {
            let parameter = 0;
            switch (this.card.rarity) {
                case rarities.RARITY_SSR:
                case rarities.RARITY_SSR_EVENT:
                    parameter = 25 + (Math.floor(this.card.level / 5) * 5);
                    parameter = parameter / 10;
                    break;
                case rarities.RARITY_SR:
                    if (this.card.level < 30) {
                        parameter = 19 + (Math.floor(this.card.level / 5) * 4);
                        parameter = parameter / 10;
                    } else {
                        parameter = 19 + (Math.floor(this.card.level / 5) * 5) - 5;
                        parameter = parameter / 10;
                    }
                    break;
                case rarities.RARITY_R:
                    if (this.card.level < 40) {
                        parameter = 12 + (Math.floor(this.card.level / 5) * 4);
                        parameter = parameter / 10;
                    } else {
                        parameter = 12 + (Math.floor(this.card.level / 5) * 4) - 1;
                        parameter = parameter / 10;
                    }
                    break;
                default:
                    break;
            }
            this.card.ability_1_parameter = parameter;
            this.card.ability_1_display = `${this.card.type}パラメータボーナス+${parameter}%`;
        }
    }

    /**
     * 最大体力上昇
     */
    private calcMaxHpUp() {
        if (this.card.ability_1 === abilities.MAX_HP_UP) {
            let parameter = 0;
            switch (this.card.rarity) {
                case rarities.RARITY_SSR:
                    if (this.card.id === 1) {
                        // きみは、自慢の生徒です
                        if (this.card.level < 25) {
                            parameter = 4;
                        } else if (this.card.level < 40) {
                            parameter = 5;
                        } else if (this.card.level < 60) {
                            parameter = Math.floor(this.card.level / 5) - 2;
                        } else {
                            parameter = 9;
                        }
                    } else if (this.card.id === 36) {
                        // 食欲の秋なんです
                        if (this.card.level < 25) {
                            parameter = 4 + Math.floor(this.card.level / 5);
                        } else {
                            parameter = 9;
                        }
                    } else {
                        // 現状実装なし
                    }
                    break;
                case rarities.RARITY_SSR_EVENT:
                case rarities.RARITY_SR:
                case rarities.RARITY_R:
                default:
                    break;
            }
            this.card.ability_1_parameter = parameter;
            this.card.ability_1_display = `最大体力+${parameter}`;
        }
    }

    /**
     * 初期Pポイント上昇
     */
    private calcInitPPoint() {
        if (this.card.ability_1 === abilities.INIT_P_POINT) {
            let parameter = 0;
            switch (this.card.rarity) {
                case rarities.RARITY_SR:
                    if (this.card.id === 1001) {
                        // はじめてのお友達
                        if (this.card.level < 5) {
                            parameter = 34;
                        } else if (this.card.level < 35) {
                            parameter = 34 + (Math.floor(this.card.level / 5) * 5) + 1;
                        } else {
                            parameter = 34 + (Math.floor(this.card.level / 5) * 5) + 2;
                        }
                    } else {
                        // 現状実装なし
                    }
                    break;
                case rarities.RARITY_SSR:
                case rarities.RARITY_SSR_EVENT:
                case rarities.RARITY_R:
                default:
                    break;
            }
            this.card.ability_1_parameter = parameter;
            this.card.ability_1_display = `初期Pポイント+${parameter}`;
        } else {
            let parameter = {r: [10, 20, 20], sr: [15, 30, 30], ssr: [20, 30, 40], ssr_event: [20, 30, 30]};
            if (this.card.ability_2 === abilities.INIT_P_POINT) {
                this.card.ability_2_parameter = this.getParameter('ability_2', parameter);
                this.card.ability_2_display = `初期Pポイント+${this.card.ability_2_parameter}`;
            }
            if (this.card.ability_4 === abilities.INIT_P_POINT) {
                this.card.ability_4_parameter = this.getParameter('ability_4', parameter);
                this.card.ability_4_display = `初期Pポイント+${this.card.ability_4_parameter}`;
            }
            if (this.card.ability_5 === abilities.INIT_P_POINT) {
                this.card.ability_5_parameter = this.getParameter('ability_5', parameter);
                this.card.ability_5_display = `初期Pポイント+${this.card.ability_5_parameter}`;
            }
        }
    }

    /**
     * スキルカードサポート発生率増加
     * TODO: パラメータに影響しない為、計算せずに「0」を返す
     */
    private calcCardSupportRate() {
        if (this.card.ability_3 === abilities.CARD_SUPPORT_RATE) {
            let parameter = 0;
            // if (this.card.level >= 2) {
            //     switch (this.card.rarity) {
            //         case rarities.RARITY_SSR:
            //         case rarities.RARITY_SSR_EVENT:
            //             if (this.card.level < 11) {
            //                 parameter = (this.card.level - 1) * 1.7;
            //             } else if (this.card.level < 31) {
            //                 parameter = (this.card.level - 1) * 1.7 - 0.1;
            //             } else if (this.card.level < 51) {
            //                 parameter = (this.card.level - 1) * 1.7 - 0.2;
            //             } else {
            //                 parameter = (this.card.level - 1) * 1.7 - 0.3;
            //             }
            //             break;
            //         case rarities.RARITY_SR:
            //         case rarities.RARITY_R:
            //         default:
            //             break;
            //     }
            // }
            this.card.ability_3_parameter = parameter;
            this.card.ability_3_display = `このサポートカードのスキルカードサポート発生率を増加`;
        }
    }

    /**
     * サポートカードイベント2強化
     */
    private calcEventEnhance() {
        if (this.card.ability_6 === abilities.EVENT_ENHANCE) {
            let parameter = {r: [50, 75, 100], sr: [50, 75, 100], ssr: [50, 75, 100], ssr_event: [50, 75, 100]};
            this.card.ability_6_parameter = this.getParameter('ability_6', parameter);
            if (this.card.events.event_2 === events.PARAMETER_UP) {
                this.card.ability_6_display = `このサポートカードのイベントによるパラメータ上昇を${this.card.ability_6_parameter}%増加`;
            } else if (this.card.events.event_2 === events.GET_P_POINT) {
                this.card.ability_6_display = `このサポートカードのイベントによる獲得Pポイントを${this.card.ability_6_parameter}%増加`;
            } else if (this.card.events.event_2 === events.HP_RECOVER) {
                this.card.ability_6_display = `このサポートカードのイベントによる体力回復量を${this.card.ability_6_parameter}%増加`;
            }
        }
    }

    /**
     * SPレッスン発生率増加
     */
    private calcSpLessonRate() {
        let parameter = {r: [0, 0, 0], sr: [10.5, 21, 21], ssr: [14, 21, 28], ssr_event: [14, 21, 21]};
        let typeDisplay = this.card.type;
        if (this.card.type === types.ASSIST) {
            parameter = {r: [0, 0, 0], sr: [5.2, 10.5, 10.5], ssr: [7, 10.5, 14], ssr_event: [0, 0, 0]};
            typeDisplay = 'ボーカル、ダンス、ビジュアル全ての';
        }
        if (this.card.ability_2 === abilities.SP_LESSON_RATE) {
            this.card.ability_2_parameter = this.getParameter('ability_2', parameter);
            this.card.ability_2_display = `${typeDisplay}SPレッスン発生率+${this.card.ability_2_parameter}%`;
        }
        if (this.card.ability_4 === abilities.SP_LESSON_RATE) {
            this.card.ability_4_parameter = this.getParameter('ability_4', parameter);
            this.card.ability_4_display = `${typeDisplay}SPレッスン発生率+${this.card.ability_4_parameter}%`;
        }
        if (this.card.ability_5 === abilities.SP_LESSON_RATE) {
            this.card.ability_5_parameter = this.getParameter('ability_5', parameter);
            this.card.ability_5_display = `${typeDisplay}SPレッスン発生率+${this.card.ability_5_parameter}%`;
        }
    }

    /**
     * レッスン終了時パラメータ上昇
     */
    private calcLessonParameterUp() {
        let parameter = {r: [1, 3, 3], sr: [2, 4, 4], ssr: [3, 4, 6], ssr_event: [3, 4, 4]};
        if (this.card.ability_2 === abilities.LESSON_PARAMETER_UP) {
            this.card.ability_2_parameter = this.getParameter('ability_2', parameter);
            this.card.ability_2_display = `${this.card.type}レッスン終了時、${this.card.type}上昇+${this.card.ability_2_parameter}`;
        }
        if (this.card.ability_4 === abilities.LESSON_PARAMETER_UP) {
            this.card.ability_4_parameter = this.getParameter('ability_4', parameter);
            this.card.ability_4_display = `${this.card.type}レッスン終了時、${this.card.type}上昇+${this.card.ability_4_parameter}`;
        }
        if (this.card.ability_5 === abilities.LESSON_PARAMETER_UP) {
            this.card.ability_5_parameter = this.getParameter('ability_5', parameter);
            this.card.ability_5_display = `${this.card.type}レッスン終了時、${this.card.type}上昇+${this.card.ability_5_parameter}`;
        }
    }

    /**
     * 通常レッスン終了時パラメータ上昇
     */
    private calcNormalLessonParameterUp() {
        let parameter = {r: [5, 9, 9], sr: [7, 13, 13], ssr: [0, 0, 0], ssr_event: [0, 0, 0]};
        if (this.card.ability_2 === abilities.NORMAL_LESSON_PARAMETER_UP) {
            this.card.ability_2_parameter = this.getParameter('ability_2', parameter);
            this.card.ability_2_display = `${this.card.type}通常レッスン終了時、${this.card.type}上昇+${this.card.ability_2_parameter}`;
        }
        if (this.card.ability_4 === abilities.NORMAL_LESSON_PARAMETER_UP) {
            this.card.ability_4_parameter = this.getParameter('ability_4', parameter);
            this.card.ability_4_display = `${this.card.type}通常レッスン終了時、${this.card.type}上昇+${this.card.ability_4_parameter}`;
        }
        if (this.card.ability_5 === abilities.NORMAL_LESSON_PARAMETER_UP) {
            this.card.ability_5_parameter = this.getParameter('ability_5', parameter);
            this.card.ability_5_display = `${this.card.type}通常レッスン終了時、${this.card.type}上昇+${this.card.ability_5_parameter}`;
        }
    }

    /**
     * SPレッスン終了時パラメータ上昇
     */
    private calcSpLessonParameterUp() {
        let parameter = {r: [0, 0, 0], sr: [7, 13, 13], ssr: [9, 13, 17], ssr_event: [9, 13, 13]};
        if (this.card.ability_2 === abilities.SP_LESSON_PARAMETER_UP) {
            this.card.ability_2_parameter = this.getParameter('ability_2', parameter);
            this.card.ability_2_display = `${this.card.type}SPレッスン終了時、${this.card.type}上昇+${this.card.ability_2_parameter}`;
        }
        if (this.card.ability_4 === abilities.SP_LESSON_PARAMETER_UP) {
            this.card.ability_4_parameter = this.getParameter('ability_4', parameter);
            this.card.ability_4_display = `${this.card.type}SPレッスン終了時、${this.card.type}上昇+${this.card.ability_4_parameter}`;
        }
        if (this.card.ability_5 === abilities.SP_LESSON_PARAMETER_UP) {
            this.card.ability_5_parameter = this.getParameter('ability_5', parameter);
            this.card.ability_5_display = `${this.card.type}SPレッスン終了時、${this.card.type}上昇+${this.card.ability_5_parameter}`;
        }
    }

    /**
     * アクティブカード獲得時パラメータ上昇
     */
    private calcActiveCardParameterUp() {
        let parameter = {r: [0, 0, 0], sr: [0, 0, 0], ssr: [1, 2, 3], ssr_event: [0, 0, 0]};
        if (this.card.ability_2 === abilities.ACTIVE_CARD_PARAMETER_UP) {
            this.card.ability_2_parameter = this.getParameter('ability_2', parameter);
            this.card.ability_2_display = `アクティブスキルカード獲得時、${this.card.type}上昇+${this.card.ability_2_parameter}`;
        }
        if (this.card.ability_4 === abilities.ACTIVE_CARD_PARAMETER_UP) {
            this.card.ability_4_parameter = this.getParameter('ability_4', parameter);
            this.card.ability_4_display = `アクティブスキルカード獲得時、${this.card.type}上昇+${this.card.ability_4_parameter}`;
        }
        if (this.card.ability_5 === abilities.ACTIVE_CARD_PARAMETER_UP) {
            this.card.ability_5_parameter = this.getParameter('ability_5', parameter);
            this.card.ability_5_display = `アクティブスキルカード獲得時、${this.card.type}上昇+${this.card.ability_5_parameter}`;
        }
    }

    /**
     * メンタルカード獲得時パラメータ上昇
     */
    private calcMentalCardParameterUp() {
        let parameter = {r: [0, 0, 0], sr: [0, 0, 0], ssr: [1, 2, 3], ssr_event: [1, 2, 2]};
        if (this.card.ability_2 === abilities.MENTAL_CARD_PARAMETER_UP) {
            this.card.ability_2_parameter = this.getParameter('ability_2', parameter);
            this.card.ability_2_display = `メンタルスキルカード獲得時、${this.card.type}上昇+${this.card.ability_2_parameter}`;
        }
        if (this.card.ability_4 === abilities.MENTAL_CARD_PARAMETER_UP) {
            this.card.ability_4_parameter = this.getParameter('ability_4', parameter);
            this.card.ability_4_display = `メンタルスキルカード獲得時、${this.card.type}上昇+${this.card.ability_4_parameter}`;
        }
        if (this.card.ability_5 === abilities.MENTAL_CARD_PARAMETER_UP) {
            this.card.ability_5_parameter = this.getParameter('ability_5', parameter);
            this.card.ability_5_display = `メンタルスキルカード獲得時、${this.card.type}上昇+${this.card.ability_5_parameter}`;
        }
    }

    /**
     * 好調効果カード獲得時パラメータ上昇
     */
    private calcGoodCardParameterUp() {
        let parameter = {r: [0, 0, 0], sr: [0, 0, 0], ssr: [2, 3, 4], ssr_event: [0, 0, 0]};
        if (this.card.ability_2 === abilities.GOOD_CARD_PARAMETER_UP) {
            this.card.ability_2_parameter = this.getParameter('ability_2', parameter);
            this.card.ability_2_display = `好調効果のスキルカード獲得時、${this.card.type}上昇+${this.card.ability_2_parameter}`;
        }
        if (this.card.ability_4 === abilities.GOOD_CARD_PARAMETER_UP) {
            this.card.ability_4_parameter = this.getParameter('ability_4', parameter);
            this.card.ability_4_display = `好調効果のスキルカード獲得時、${this.card.type}上昇+${this.card.ability_4_parameter}`;
        }
        if (this.card.ability_5 === abilities.GOOD_CARD_PARAMETER_UP) {
            this.card.ability_5_parameter = this.getParameter('ability_5', parameter);
            this.card.ability_5_display = `好調効果のスキルカード獲得時、${this.card.type}上昇+${this.card.ability_5_parameter}`;
        }
    }

    /**
     * スキルカード強化時パラメータ上昇
     */
    private calcCardEnhanceParameterUp() {
        let parameter = {r: [0, 0, 0], sr: [2, 3, 3], ssr: [2, 3, 4], ssr_event: [0, 0, 0]};
        if (this.card.ability_2 === abilities.CARD_ENHANCE_PARAMETER_UP) {
            this.card.ability_2_parameter = this.getParameter('ability_2', parameter);
            this.card.ability_2_display = `スキルカード強化時、${this.card.type}上昇+${this.card.ability_2_parameter}`;
        }
        if (this.card.ability_4 === abilities.CARD_ENHANCE_PARAMETER_UP) {
            this.card.ability_4_parameter = this.getParameter('ability_4', parameter);
            this.card.ability_4_display = `スキルカード強化時、${this.card.type}上昇+${this.card.ability_4_parameter}`;
        }
        if (this.card.ability_5 === abilities.CARD_ENHANCE_PARAMETER_UP) {
            this.card.ability_5_parameter = this.getParameter('ability_5', parameter);
            this.card.ability_5_display = `スキルカード強化時、${this.card.type}上昇+${this.card.ability_5_parameter}`;
        }
    }

    /**
     * アクティブカード強化時パラメータ上昇
     */
    private calcActiveCardEnhanceParameterUp() {
        let parameter = {r: [0, 0, 0], sr: [0, 0, 0], ssr: [0, 0, 0], ssr_event: [0, 0, 0]};
        if (this.card.ability_2 === abilities.ACTIVE_CARD_ENHANCE_PARAMETER_UP) {
            this.card.ability_2_parameter = this.getParameter('ability_2', parameter);
            this.card.ability_2_display = `アクティブスキルカード強化時、${this.card.type}上昇+${this.card.ability_2_parameter}`;
        }
        if (this.card.ability_4 === abilities.ACTIVE_CARD_ENHANCE_PARAMETER_UP) {
            this.card.ability_4_parameter = this.getParameter('ability_4', parameter);
            this.card.ability_4_display = `アクティブスキルカード強化時、${this.card.type}上昇+${this.card.ability_4_parameter}`;
        }
        if (this.card.ability_5 === abilities.ACTIVE_CARD_ENHANCE_PARAMETER_UP) {
            this.card.ability_5_parameter = this.getParameter('ability_5', parameter);
            this.card.ability_5_display = `アクティブスキルカード強化時、${this.card.type}上昇+${this.card.ability_5_parameter}`;
        }
    }

    /**
     * メンタルカード強化時パラメータ上昇
     */
    private calcMentalCardEnhanceParameterUp() {
        let parameter = {r: [0, 0, 0], sr: [0, 0, 0], ssr: [5, 7, 9], ssr_event: [5, 7, 7]};
        if (this.card.ability_2 === abilities.MENTAL_CARD_ENHANCE_PARAMETER_UP) {
            this.card.ability_2_parameter = this.getParameter('ability_2', parameter);
            this.card.ability_2_display = `メンタルスキルカード強化時、${this.card.type}上昇+${this.card.ability_2_parameter}`;
        }
        if (this.card.ability_4 === abilities.MENTAL_CARD_ENHANCE_PARAMETER_UP) {
            this.card.ability_4_parameter = this.getParameter('ability_4', parameter);
            this.card.ability_4_display = `メンタルスキルカード強化時、${this.card.type}上昇+${this.card.ability_4_parameter}`;
        }
        if (this.card.ability_5 === abilities.MENTAL_CARD_ENHANCE_PARAMETER_UP) {
            this.card.ability_5_parameter = this.getParameter('ability_5', parameter);
            this.card.ability_5_display = `メンタルスキルカード強化時、${this.card.type}上昇+${this.card.ability_5_parameter}`;
        }
    }

    /**
     * スキルカード削除時パラメータ上昇
     */
    private calcCardDeleteParameterUp() {
        let parameter = {r: [0, 0, 0], sr: [4, 8, 8], ssr: [0, 0, 0], ssr_event: [0, 0, 0]};
        if (this.card.ability_2 === abilities.CARD_DELETE_PARAMETER_UP) {
            this.card.ability_2_parameter = this.getParameter('ability_2', parameter);
            this.card.ability_2_display = `スキルカード削除時、${this.card.type}上昇+${this.card.ability_2_parameter}`;
        }
        if (this.card.ability_4 === abilities.CARD_DELETE_PARAMETER_UP) {
            this.card.ability_4_parameter = this.getParameter('ability_4', parameter);
            this.card.ability_4_display = `スキルカード削除時、${this.card.type}上昇+${this.card.ability_4_parameter}`;
        }
        if (this.card.ability_5 === abilities.CARD_DELETE_PARAMETER_UP) {
            this.card.ability_5_parameter = this.getParameter('ability_5', parameter);
            this.card.ability_5_display = `スキルカード削除時、${this.card.type}上昇+${this.card.ability_5_parameter}`;
        }
    }

    /**
     * 授業・営業終了時パラメータ上昇
     */
    private calcClassesAndBusinessParameterUp() {
        let parameter = {r: [2, 3, 3], sr: [3, 5, 5], ssr: [4, 5, 7], ssr_event: [0, 0, 0]};
        if (this.card.ability_2 === abilities.CLASSES_AND_BUSINESS_PARAMETER_UP) {
            this.card.ability_2_parameter = this.getParameter('ability_2', parameter);
            this.card.ability_2_display = `授業・営業終了時、${this.card.type}上昇+${this.card.ability_2_parameter}`;
        }
        if (this.card.ability_4 === abilities.CLASSES_AND_BUSINESS_PARAMETER_UP) {
            this.card.ability_4_parameter = this.getParameter('ability_4', parameter);
            this.card.ability_4_display = `授業・営業終了時、${this.card.type}上昇+${this.card.ability_4_parameter}`;
        }
        if (this.card.ability_5 === abilities.CLASSES_AND_BUSINESS_PARAMETER_UP) {
            this.card.ability_5_parameter = this.getParameter('ability_5', parameter);
            this.card.ability_5_display = `授業・営業終了時、${this.card.type}上昇+${this.card.ability_5_parameter}`;
        }
    }

    /**
     * 活動支給・差し入れ選択時パラメータ上昇
     */
    private calcActivitySupportAndGiftsParameterUp() {
        let parameter = {r: [4, 8, 8], sr: [6, 11, 11], ssr: [9, 12, 17], ssr_event: [0, 0, 0]};
        if (this.card.ability_2 === abilities.ACTIVITY_SUPPORT_AND_GIFTS_PARAMETER_UP) {
            this.card.ability_2_parameter = this.getParameter('ability_2', parameter);
            this.card.ability_2_display = `活動支給・差し入れ選択時、${this.card.type}上昇+${this.card.ability_2_parameter}`;
        }
        if (this.card.ability_4 === abilities.ACTIVITY_SUPPORT_AND_GIFTS_PARAMETER_UP) {
            this.card.ability_4_parameter = this.getParameter('ability_4', parameter);
            this.card.ability_4_display = `活動支給・差し入れ選択時、${this.card.type}上昇+${this.card.ability_4_parameter}`;
        }
        if (this.card.ability_5 === abilities.ACTIVITY_SUPPORT_AND_GIFTS_PARAMETER_UP) {
            this.card.ability_5_parameter = this.getParameter('ability_5', parameter);
            this.card.ability_5_display = `活動支給・差し入れ選択時、${this.card.type}上昇+${this.card.ability_5_parameter}`;
        }
    }

    /**
     * お出かけ終了時パラメータ上昇
     */
    private calcOutingParameterUp() {
        let parameter = {r: [4, 7, 7], sr: [5, 10, 10], ssr: [8, 11, 15], ssr_event: [0, 0, 0]};
        if (this.card.ability_2 === abilities.OUTING_PARAMETER_UP) {
            this.card.ability_2_parameter = this.getParameter('ability_2', parameter);
            this.card.ability_2_display = `お出かけ終了時、${this.card.type}上昇+${this.card.ability_2_parameter}`;
        }
        if (this.card.ability_4 === abilities.OUTING_PARAMETER_UP) {
            this.card.ability_4_parameter = this.getParameter('ability_4', parameter);
            this.card.ability_4_display = `お出かけ終了時、${this.card.type}上昇+${this.card.ability_4_parameter}`;
        }
        if (this.card.ability_5 === abilities.OUTING_PARAMETER_UP) {
            this.card.ability_5_parameter = this.getParameter('ability_5', parameter);
            this.card.ability_5_display = `お出かけ終了時、${this.card.type}上昇+${this.card.ability_5_parameter}`;
        }
    }

    /**
     * 相談選択時パラメータ上昇
     */
    private calcConsultationParameterUp() {
        let parameter = {r: [0, 0, 0], sr: [4, 8, 8], ssr: [6, 8, 11], ssr_event: [6, 8, 8]};
        if (this.card.ability_2 === abilities.CONSULTATION_PARAMETER_UP) {
            this.card.ability_2_parameter = this.getParameter('ability_2', parameter);
            this.card.ability_2_display = `相談選択時、${this.card.type}上昇+${this.card.ability_2_parameter}`;
        }
        if (this.card.ability_4 === abilities.CONSULTATION_PARAMETER_UP) {
            this.card.ability_4_parameter = this.getParameter('ability_4', parameter);
            this.card.ability_4_display = `相談選択時、${this.card.type}上昇+${this.card.ability_4_parameter}`;
        }
        if (this.card.ability_5 === abilities.CONSULTATION_PARAMETER_UP) {
            this.card.ability_5_parameter = this.getParameter('ability_5', parameter);
            this.card.ability_5_display = `相談選択時、${this.card.type}上昇+${this.card.ability_5_parameter}`;
        }
    }

    /**
     * 相談でPドリンク交換後パラメータ上昇
     */
    private calcConsultationDrinkParameterUp() {
        let parameter = {r: [0, 0, 0], sr: [4, 8, 8], ssr: [6, 8, 11], ssr_event: [0, 0, 0]};
        if (this.card.ability_2 === abilities.CONSULTATION_DRINK_PARAMETER_UP) {
            this.card.ability_2_parameter = this.getParameter('ability_2', parameter);
            this.card.ability_2_display = `相談でPドリンク交換後、${this.card.type}上昇+${this.card.ability_2_parameter}`;
        }
        if (this.card.ability_4 === abilities.CONSULTATION_DRINK_PARAMETER_UP) {
            this.card.ability_4_parameter = this.getParameter('ability_4', parameter);
            this.card.ability_4_display = `相談でPドリンク交換後、${this.card.type}上昇+${this.card.ability_4_parameter}`;
        }
        if (this.card.ability_5 === abilities.CONSULTATION_DRINK_PARAMETER_UP) {
            this.card.ability_5_parameter = this.getParameter('ability_5', parameter);
            this.card.ability_5_display = `相談でPドリンク交換後、${this.card.type}上昇+${this.card.ability_5_parameter}`;
        }
    }

    /**
     * 休む選択時パラメータ上昇
     */
    private calcRestParameterUp() {
        let parameter = {r: [6, 11, 11], sr: [9, 17, 17], ssr: [11, 17, 22], ssr_event: [0, 0, 0]};
        if (this.card.ability_2 === abilities.REST_PARAMETER_UP) {
            this.card.ability_2_parameter = this.getParameter('ability_2', parameter);
            this.card.ability_2_display = `休む選択時、${this.card.type}上昇+${this.card.ability_2_parameter}`;
        }
        if (this.card.ability_4 === abilities.REST_PARAMETER_UP) {
            this.card.ability_4_parameter = this.getParameter('ability_4', parameter);
            this.card.ability_4_display = `休む選択時、${this.card.type}上昇+${this.card.ability_4_parameter}`;
        }
        if (this.card.ability_5 === abilities.REST_PARAMETER_UP) {
            this.card.ability_5_parameter = this.getParameter('ability_5', parameter);
            this.card.ability_5_display = `休む選択時、${this.card.type}上昇+${this.card.ability_5_parameter}`;
        }
    }

    /**
     * 試験・オーディション終了時パラメータ上昇
     */
    private calcExamsAndAuditionsParameterUp() {
        let parameter = {r: [0, 0, 0], sr: [9, 17, 17], ssr: [11, 17, 22], ssr_event: [11, 17, 17]};
        if (this.card.ability_2 === abilities.EXAMS_AND_AUDITIONS_PARAMETER_UP) {
            this.card.ability_2_parameter = this.getParameter('ability_2', parameter);
            this.card.ability_2_display = `試験・オーディション終了時、${this.card.type}上昇+${this.card.ability_2_parameter}`;
        }
        if (this.card.ability_4 === abilities.EXAMS_AND_AUDITIONS_PARAMETER_UP) {
            this.card.ability_4_parameter = this.getParameter('ability_4', parameter);
            this.card.ability_4_display = `試験・オーディション終了時、${this.card.type}上昇+${this.card.ability_4_parameter}`;
        }
        if (this.card.ability_5 === abilities.EXAMS_AND_AUDITIONS_PARAMETER_UP) {
            this.card.ability_5_parameter = this.getParameter('ability_5', parameter);
            this.card.ability_5_display = `試験・オーディション終了時、${this.card.type}上昇+${this.card.ability_5_parameter}`;
        }
    }

    /**
     * レッスン終了時Pポイント獲得量増加
     */
    private calcLessonPPointUp() {
        let parameter = {r: [0, 0, 0], sr: [8.3, 16.5, 16.5], ssr: [11, 16.5, 22], ssr_event: [0, 0, 0]};
        if (this.card.ability_2 === abilities.LESSON_P_POINT_UP) {
            this.card.ability_2_parameter = this.getParameter('ability_2', parameter);
            this.card.ability_2_display = `レッスン終了時、Pポイント獲得量増加+${this.card.ability_2_parameter}%`;
        }
        if (this.card.ability_4 === abilities.LESSON_P_POINT_UP) {
            this.card.ability_4_parameter = this.getParameter('ability_4', parameter);
            this.card.ability_4_display = `レッスン終了時、Pポイント獲得量増加+${this.card.ability_4_parameter}%`;
        }
        if (this.card.ability_5 === abilities.LESSON_P_POINT_UP) {
            this.card.ability_5_parameter = this.getParameter('ability_5', parameter);
            this.card.ability_5_display = `レッスン終了時、Pポイント獲得量増加+${this.card.ability_5_parameter}%`;
        }
    }

    /**
     * SPレッスン終了時Pポイント獲得量増加
     */
    private calcSpLessonPPointUp() {
        let parameter = {r: [0, 0, 0], sr: [0, 0, 0], ssr: [22, 33, 45], ssr_event: [22, 33, 33]};
        if (this.card.ability_2 === abilities.SP_LESSON_P_POINT_UP) {
            this.card.ability_2_parameter = this.getParameter('ability_2', parameter);
            this.card.ability_2_display = `${this.card.type}SPレッスン終了時、Pポイント獲得量増加+${this.card.ability_2_parameter}%`;
        }
        if (this.card.ability_4 === abilities.SP_LESSON_P_POINT_UP) {
            this.card.ability_4_parameter = this.getParameter('ability_4', parameter);
            this.card.ability_4_display = `${this.card.type}SPレッスン終了時、Pポイント獲得量増加+${this.card.ability_4_parameter}%`;
        }
        if (this.card.ability_5 === abilities.SP_LESSON_P_POINT_UP) {
            this.card.ability_5_parameter = this.getParameter('ability_5', parameter);
            this.card.ability_5_display = `${this.card.type}SPレッスン終了時、Pポイント獲得量増加+${this.card.ability_5_parameter}%`;
        }
    }

    /**
     * SPレッスン終了時体力回復
     */
    private calcSpLessonHpRecover() {
        let parameter = {r: [0, 0, 0], sr: [3, 5, 5], ssr: [4, 5, 7], ssr_event: [4, 5, 5]};
        if (this.card.type === types.ASSIST) {
            parameter = {r: [0, 0, 0], sr: [0, 0, 0], ssr: [2, 3, 4], ssr_event: [0, 0, 0]};
        }
        if (this.card.ability_2 === abilities.SP_LESSON_HP_RECOVER) {
            this.card.ability_2_parameter = this.getParameter('ability_2', parameter);
            this.card.ability_2_display = `${this.card.type}SPレッスン終了時、体力回復${this.card.ability_2_parameter}`;
        }
        if (this.card.ability_4 === abilities.SP_LESSON_HP_RECOVER) {
            this.card.ability_4_parameter = this.getParameter('ability_4', parameter);
            this.card.ability_4_display = `${this.card.type}SPレッスン終了時、体力回復${this.card.ability_4_parameter}`;
        }
        if (this.card.ability_5 === abilities.SP_LESSON_HP_RECOVER) {
            this.card.ability_5_parameter = this.getParameter('ability_5', parameter);
            this.card.ability_5_display = `${this.card.type}SPレッスン終了時、体力回復${this.card.ability_5_parameter}`;
        }
    }

    /**
     * 活動支給・差し入れ選択時体力回復
     */
    private calcActivitySupportAndGiftsHpRecover() {
        let parameter = {r: [0, 0, 0], sr: [0, 0, 0], ssr: [0, 0, 0], ssr_event: [3, 4, 4]};
        if (this.card.ability_2 === abilities.ACTIVITY_SUPPORT_AND_GIFTS_HP_RECOVER) {
            this.card.ability_2_parameter = this.getParameter('ability_2', parameter);
            this.card.ability_2_display = `活動支給・差し入れ選択時、体力回復${this.card.ability_2_parameter}`;
        }
        if (this.card.ability_4 === abilities.ACTIVITY_SUPPORT_AND_GIFTS_HP_RECOVER) {
            this.card.ability_4_parameter = this.getParameter('ability_4', parameter);
            this.card.ability_4_display = `活動支給・差し入れ選択時、体力回復${this.card.ability_4_parameter}`;
        }
        if (this.card.ability_5 === abilities.ACTIVITY_SUPPORT_AND_GIFTS_HP_RECOVER) {
            this.card.ability_5_parameter = this.getParameter('ability_5', parameter);
            this.card.ability_5_display = `活動支給・差し入れ選択時、体力回復${this.card.ability_5_parameter}`;
        }
    }

    /**
     * 試験・オーディション終了時体力回復
     */
    private calcExamsAndAuditionsHpRecover() {
        let parameter = {r: [0, 0, 0], sr: [0, 0, 0], ssr: [4, 6, 8], ssr_event: [0, 0, 0]};
        if (this.card.ability_2 === abilities.EXAMS_AND_AUDITIONS_HP_RECOVER) {
            this.card.ability_2_parameter = this.getParameter('ability_2', parameter);
            this.card.ability_2_display = `試験・オーディション終了時、体力回復${this.card.ability_2_parameter}`;
        }
        if (this.card.ability_4 === abilities.EXAMS_AND_AUDITIONS_HP_RECOVER) {
            this.card.ability_4_parameter = this.getParameter('ability_4', parameter);
            this.card.ability_4_display = `試験・オーディション終了時、体力回復${this.card.ability_4_parameter}`;
        }
        if (this.card.ability_5 === abilities.EXAMS_AND_AUDITIONS_HP_RECOVER) {
            this.card.ability_5_parameter = this.getParameter('ability_5', parameter);
            this.card.ability_5_display = `試験・オーディション終了時、体力回復${this.card.ability_5_parameter}`;
        }
    }

    /**
     * 相談のPドリンク割引
     */
    private calcConsultationDrinkSale() {
        let parameter = {r: [0, 0, 0], sr: [7.9, 15.8, 15.8], ssr: [0, 0, 0], ssr_event: [0, 0, 0]};
        if (this.card.ability_2 === abilities.CONSULTATION_DRINK_SALE) {
            this.card.ability_2_parameter = this.getParameter('ability_2', parameter);
            this.card.ability_2_display = `相談のPドリンクを${this.card.ability_2_parameter}%割引`;
        }
        if (this.card.ability_4 === abilities.CONSULTATION_DRINK_SALE) {
            this.card.ability_4_parameter = this.getParameter('ability_4', parameter);
            this.card.ability_4_display = `相談のPドリンクを${this.card.ability_4_parameter}%割引`;
        }
        if (this.card.ability_5 === abilities.CONSULTATION_DRINK_SALE) {
            this.card.ability_5_parameter = this.getParameter('ability_5', parameter);
            this.card.ability_5_display = `相談のPドリンクを${this.card.ability_5_parameter}%割引`;
        }
    }

    /**
     * サポートカードイベント2の上昇値を算出する
     */
    private calcEventParameter() {
        if (this.card.events.event_2 === events.PARAMETER_UP) {
            switch (this.card.rarity) {
                case rarities.RARITY_SSR:
                case rarities.RARITY_SSR_EVENT:
                    this.card.events.event_2_parameter = 20 + (20 * (this.card.ability_6_parameter / 100))
                    this.card.events.event_2_display = `${this.card.type}上昇+${this.card.events.event_2_parameter}`;
                    break;
                case rarities.RARITY_SR:
                    this.card.events.event_2_parameter = 15 + (15 * (this.card.ability_6_parameter / 100))
                    this.card.events.event_2_display = `${this.card.type}上昇+${this.card.events.event_2_parameter}`;
                    break;
                case rarities.RARITY_R:
                    this.card.events.event_2_parameter = 10 + (10 * (this.card.ability_6_parameter / 100))
                    this.card.events.event_2_display = `${this.card.type}上昇+${this.card.events.event_2_parameter}`;
                    break;
                default:
                    break;
            }
        }
        if (this.card.events.event_2 === events.HP_RECOVER) {
            switch (this.card.rarity) {
                case rarities.RARITY_SSR:
                    this.card.events.event_2_parameter = 7 + (7 * (this.card.ability_6_parameter / 100))
                    this.card.events.event_2_display = `体力回復${this.card.events.event_2_parameter}`;
                    break;
                case rarities.RARITY_SSR_EVENT:
                case rarities.RARITY_SR:
                case rarities.RARITY_R:
                default:
                    break;
            }
        }
        if (this.card.events.event_2 === events.GET_P_POINT) {
            switch (this.card.rarity) {
                case rarities.RARITY_SR:
                    this.card.events.event_2_parameter = 25 + (25 * (this.card.ability_6_parameter / 100))
                    this.card.events.event_2_display = `Pポイント+${this.card.events.event_2_parameter}`;
                    break;
                case rarities.RARITY_SSR:
                case rarities.RARITY_SSR_EVENT:
                case rarities.RARITY_R:
                default:
                    break;
            }
        }
    }
}
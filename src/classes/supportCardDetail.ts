import {rarities, types, plans, events, abilities, abilityParameterThresholds} from "@/consts/supportCardConst";

export default class SupportCardDetail {

    card: any

    constructor(card: any) {
        this.card = card;

        // 表示用
        this.getDisplayText();

        // アビリティパラメータを計算
        this.calcInitParameterUp();
        this.calcParameterBonus();
        this.calcMaxHpUp();
        this.calcInitPPoint();
        this.calcCardSupportRate();
        this.calcEventStrengthen();
        this.calcSpLessonRate();
        this.calcLessonParameterUp();
        this.calcNormalLessonParameterUp();
        this.calcSpLessonParameterUp();
        this.calcCardParameterUp();
        this.calcActiveCardParameterUp();
        this.calcMentalCardParameterUp();
        this.calcKotyoCardParameterUp();
        this.calcKoinsyoCardParameterUp();
        this.calcCardStrengthenParameterUp();
        this.calcActiveCardStrengthenParameterUp();
        this.calcMentalCardStrengthenParameterUp();
        this.calcCardDeleteParameterUp();
        this.calcClassParameterUp();
        this.calcGiftParameterUp();
        this.calcOutingParameterUp();
        this.calcConsultationParameterUp();
        this.calcConsultationDrinkParameterUp();
        this.calcRestParameterUp();
        this.calcExamParameterUp();
        this.calcLessonPPointUp();
        this.calcSpLessonPPointUp();
        this.calcSpLessonHpRecover();
        this.calcGiftHpRecover();
        this.calcExamHpRecover();
        this.calcConsultationDrinkSale();

        // イベントパラメータを計算
        this.calcEventParameter();
    }

    getDetails() {
        return this.card;
    }

    private getDisplayText() {
        switch (this.card.rarity) {
            case rarities.RARITY_SSR:
            case rarities.RARITY_SSR_EVENT:
                this.card.rarity_display = 'SSR';
                break;
            case rarities.RARITY_SR:
                this.card.rarity_display = 'SR';
                break;
            case rarities.RARITY_R:
                this.card.rarity_display = 'R';
                break;
            default:
                break;
        }
        switch (this.card.type) {
            case types.VOCAL:
                this.card.type_display = 'ボーカル';
                break;
            case types.DANCE:
                this.card.type_display = 'ダンス';
                break;
            case types.VISUAL:
                this.card.type_display = 'ビジュアル';
                break;
            case types.ASSIST:
                this.card.type_display = 'アシスト';
                break;
            default:
                break;
        }
        switch (this.card.plan) {
            case plans.FREE:
                this.card.plan_display = 'プラン制限なし';
                break;
            case plans.SENSE:
                this.card.plan_display = 'センス限定';
                break;
            case plans.LOGIC:
                this.card.plan_display = 'ロジック限定';
                break;
            case plans.ANOMALY:
                this.card.plan_display = 'アノマリー限定';
                break;
            default:
                break;
        }
        switch (this.card.event_3) {
            case events.GET_P_POINT:
                this.card.event_3_display = 'Pポイント+10';
                break;
            case events.BASIC_CARD_CHANGE:
                this.card.event_3_display = 'ランダムな名前に「基本」を含むスキルカードを異なるスキルカードにチェンジ';
                break;
            case events.CARD_RANDOM_STRENGTHEN:
                this.card.event_3_display = 'ランダムなスキルカードを強化';
                break;
            case events.TROUBLE_CARD_DELETE:
                this.card.event_3_display = 'ランダムなトラブルカードを削除';
                break;
            case events.CARD_SELECT_STRENGTHEN:
                this.card.event_3_display = 'スキルカードを選択して強化';
                break;
            case events.CARD_SELECT_DELETE:
                this.card.event_3_display = 'スキルカードを選択して削除';
                break;
            default:
                break;
        }
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
            this.card.ability_1_display = `初期${this.card.type_display}上昇<span class="font-bold">+${parameter}</span>`;
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
            this.card.ability_1_display = `${this.card.type_display}パラメータボーナス<span class="font-bold">+${parameter}%</span>`;
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
                    if (this.card.id === 17) {
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
            this.card.ability_1_display = `最大体力<span class="font-bold">+${parameter}</span>`;
        } else {
            let parameter = {r: [0, 0, 0], sr: [2, 3, 3], ssr: [0, 0, 0], ssr_event: [0, 0, 0]};
            if (this.card.ability_2 === abilities.MAX_HP_UP) {
                this.card.ability_2_parameter = this.getParameter('ability_2', parameter);
                this.card.ability_2_display = `最大体力<span class="font-bold">+${this.card.ability_2_parameter}</span>`;
            }
            if (this.card.ability_4 === abilities.MAX_HP_UP) {
                this.card.ability_4_parameter = this.getParameter('ability_4', parameter);
                this.card.ability_4_display = `最大体力<span class="font-bold">+${this.card.ability_4_parameter}</span>`;
            }
            if (this.card.ability_5 === abilities.MAX_HP_UP) {
                this.card.ability_5_parameter = this.getParameter('ability_5', parameter);
                this.card.ability_5_display = `最大体力<span class="font-bold">+${this.card.ability_5_parameter}</span>`;
            }
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
                    if (this.card.id === 1015) {
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
            this.card.ability_1_display = `初期Pポイント<span class="font-bold">+${parameter}</span>`;
        } else {
            let parameter = {r: [10, 20, 20], sr: [15, 30, 30], ssr: [20, 30, 40], ssr_event: [20, 30, 30]};
            if (this.card.ability_2 === abilities.INIT_P_POINT) {
                this.card.ability_2_parameter = this.getParameter('ability_2', parameter);
                this.card.ability_2_display = `初期Pポイント<span class="font-bold">+${this.card.ability_2_parameter}</span>`;
            }
            if (this.card.ability_4 === abilities.INIT_P_POINT) {
                this.card.ability_4_parameter = this.getParameter('ability_4', parameter);
                this.card.ability_4_display = `初期Pポイント<span class="font-bold">+${this.card.ability_4_parameter}</span>`;
            }
            if (this.card.ability_5 === abilities.INIT_P_POINT) {
                this.card.ability_5_parameter = this.getParameter('ability_5', parameter);
                this.card.ability_5_display = `初期Pポイント<span class="font-bold">+${this.card.ability_5_parameter}</span>`;
            }
        }
    }

    /**
     * スキルカードサポート発生率増加
     * TODO: パラメータに影響しない為、計算せずに「0」を返す
     */
    private calcCardSupportRate() {
        if (this.card.ability_3 === abilities.CARD_SUPPORT_RATE) {
            this.card.ability_3_parameter = 0;
            this.card.ability_3_display = `このサポートカードのスキルカードサポート発生率を増加`;
        }
    }

    /**
     * サポートカードイベント2強化
     */
    private calcEventStrengthen() {
        if (this.card.ability_6 === abilities.EVENT_STRENGTHEN) {
            let parameter = {r: [50, 75, 100], sr: [50, 75, 100], ssr: [50, 75, 100], ssr_event: [50, 75, 100]};
            this.card.ability_6_parameter = this.getParameter('ability_6', parameter);
            if (this.card.event_2 === events.PARAMETER_UP) {
                this.card.ability_6_display = `このサポートカードのイベントによるパラメータ上昇を<span class="font-bold">${this.card.ability_6_parameter}%</span>増加`;
            } else if (this.card.event_2 === events.GET_P_POINT) {
                this.card.ability_6_display = `このサポートカードのイベントによる獲得Pポイントを<span class="font-bold">${this.card.ability_6_parameter}%</span>増加`;
            } else if (this.card.event_2 === events.HP_RECOVER) {
                this.card.ability_6_display = `このサポートカードのイベントによる体力回復量を<span class="font-bold">${this.card.ability_6_parameter}%</span>増加`;
            }
        }
    }

    /**
     * SPレッスン発生率増加
     */
    private calcSpLessonRate() {
        let parameter = {r: [0, 0, 0], sr: [10.5, 21, 21], ssr: [14, 21, 28], ssr_event: [14, 21, 21]};
        let typeDisplay = this.card.type_display;
        if (this.card.type === types.ASSIST) {
            parameter = {r: [0, 0, 0], sr: [5.2, 10.5, 10.5], ssr: [7, 10.5, 14], ssr_event: [0, 0, 0]};
            typeDisplay = 'ボーカル、ダンス、ビジュアル全ての';
        }
        if (this.card.ability_2 === abilities.SP_LESSON_RATE) {
            this.card.ability_2_parameter = this.getParameter('ability_2', parameter);
            this.card.ability_2_display = `${typeDisplay}SPレッスン発生率<span class="font-bold">+${this.card.ability_2_parameter}%</span>`;
        }
        if (this.card.ability_4 === abilities.SP_LESSON_RATE) {
            this.card.ability_4_parameter = this.getParameter('ability_4', parameter);
            this.card.ability_4_display = `${typeDisplay}SPレッスン発生率<span class="font-bold">+${this.card.ability_4_parameter}%</span>`;
        }
        if (this.card.ability_5 === abilities.SP_LESSON_RATE) {
            this.card.ability_5_parameter = this.getParameter('ability_5', parameter);
            this.card.ability_5_display = `${typeDisplay}SPレッスン発生率<span class="font-bold">+${this.card.ability_5_parameter}%</span>`;
        }
    }

    /**
     * レッスン終了時パラメータ上昇
     */
    private calcLessonParameterUp() {
        let parameter = {r: [1, 3, 3], sr: [2, 4, 4], ssr: [3, 4, 6], ssr_event: [3, 4, 4]};
        if (this.card.ability_2 === abilities.LESSON_PARAMETER_UP) {
            this.card.ability_2_parameter = this.getParameter('ability_2', parameter);
            this.card.ability_2_display = `${this.card.type_display}レッスン終了時、${this.card.type_display}上昇<span class="font-bold">+${this.card.ability_2_parameter}</span>`;
        }
        if (this.card.ability_4 === abilities.LESSON_PARAMETER_UP) {
            this.card.ability_4_parameter = this.getParameter('ability_4', parameter);
            this.card.ability_4_display = `${this.card.type_display}レッスン終了時、${this.card.type_display}上昇<span class="font-bold">+${this.card.ability_4_parameter}</span>`;
        }
        if (this.card.ability_5 === abilities.LESSON_PARAMETER_UP) {
            this.card.ability_5_parameter = this.getParameter('ability_5', parameter);
            this.card.ability_5_display = `${this.card.type_display}レッスン終了時、${this.card.type_display}上昇<span class="font-bold">+${this.card.ability_5_parameter}</span>`;
        }
    }

    /**
     * 通常レッスン終了時パラメータ上昇
     */
    private calcNormalLessonParameterUp() {
        let parameter = {r: [5, 9, 9], sr: [7, 13, 13], ssr: [0, 0, 0], ssr_event: [0, 0, 0]};
        if (this.card.ability_2 === abilities.NORMAL_LESSON_PARAMETER_UP) {
            this.card.ability_2_parameter = this.getParameter('ability_2', parameter);
            this.card.ability_2_display = `${this.card.type_display}通常レッスン終了時、${this.card.type_display}上昇<span class="font-bold">+${this.card.ability_2_parameter}</span>`;
        }
        if (this.card.ability_4 === abilities.NORMAL_LESSON_PARAMETER_UP) {
            this.card.ability_4_parameter = this.getParameter('ability_4', parameter);
            this.card.ability_4_display = `${this.card.type_display}通常レッスン終了時、${this.card.type_display}上昇<span class="font-bold">+${this.card.ability_4_parameter}</span>`;
        }
        if (this.card.ability_5 === abilities.NORMAL_LESSON_PARAMETER_UP) {
            this.card.ability_5_parameter = this.getParameter('ability_5', parameter);
            this.card.ability_5_display = `${this.card.type_display}通常レッスン終了時、${this.card.type_display}上昇<span class="font-bold">+${this.card.ability_5_parameter}</span>`;
        }
    }

    /**
     * SPレッスン終了時パラメータ上昇
     */
    private calcSpLessonParameterUp() {
        let parameter = {r: [0, 0, 0], sr: [7, 13, 13], ssr: [9, 13, 17], ssr_event: [9, 13, 13]};
        if (this.card.ability_2 === abilities.SP_LESSON_PARAMETER_UP) {
            this.card.ability_2_parameter = this.getParameter('ability_2', parameter);
            this.card.ability_2_display = `${this.card.type_display}SPレッスン終了時、${this.card.type_display}上昇<span class="font-bold">+${this.card.ability_2_parameter}</span>`;
        }
        if (this.card.ability_4 === abilities.SP_LESSON_PARAMETER_UP) {
            this.card.ability_4_parameter = this.getParameter('ability_4', parameter);
            this.card.ability_4_display = `${this.card.type_display}SPレッスン終了時、${this.card.type_display}上昇<span class="font-bold">+${this.card.ability_4_parameter}</span>`;
        }
        if (this.card.ability_5 === abilities.SP_LESSON_PARAMETER_UP) {
            this.card.ability_5_parameter = this.getParameter('ability_5', parameter);
            this.card.ability_5_display = `${this.card.type_display}SPレッスン終了時、${this.card.type_display}上昇<span class="font-bold">+${this.card.ability_5_parameter}</span>`;
        }
    }

    /**
     * カード獲得時パラメータ上昇
     */
    private calcCardParameterUp() {
        let parameter = {r: [0, 0, 0], sr: [1, 2, 2], ssr: [0, 0, 0], ssr_event: [0, 0, 0]};
        if (this.card.ability_2 === abilities.CARD_PARAMETER_UP) {
            this.card.ability_2_parameter = this.getParameter('ability_2', parameter);
            this.card.ability_2_display = `スキルカード獲得時、${this.card.type_display}上昇<span class="font-bold">+${this.card.ability_2_parameter}</span>`;
        }
        if (this.card.ability_4 === abilities.CARD_PARAMETER_UP) {
            this.card.ability_4_parameter = this.getParameter('ability_4', parameter);
            this.card.ability_4_display = `スキルカード獲得時、${this.card.type_display}上昇<span class="font-bold">+${this.card.ability_4_parameter}</span>`;
        }
        if (this.card.ability_5 === abilities.CARD_PARAMETER_UP) {
            this.card.ability_5_parameter = this.getParameter('ability_5', parameter);
            this.card.ability_5_display = `スキルカード獲得時、${this.card.type_display}上昇<span class="font-bold">+${this.card.ability_5_parameter}</span>`;
        }
    }

    /**
     * アクティブカード獲得時パラメータ上昇
     */
    private calcActiveCardParameterUp() {
        let parameter = {r: [0, 0, 0], sr: [0, 0, 0], ssr: [1, 2, 3], ssr_event: [0, 0, 0]};
        if (this.card.ability_2 === abilities.ACTIVE_CARD_PARAMETER_UP) {
            this.card.ability_2_parameter = this.getParameter('ability_2', parameter);
            this.card.ability_2_display = `アクティブスキルカード獲得時、${this.card.type_display}上昇<span class="font-bold">+${this.card.ability_2_parameter}</span>`;
        }
        if (this.card.ability_4 === abilities.ACTIVE_CARD_PARAMETER_UP) {
            this.card.ability_4_parameter = this.getParameter('ability_4', parameter);
            this.card.ability_4_display = `アクティブスキルカード獲得時、${this.card.type_display}上昇<span class="font-bold">+${this.card.ability_4_parameter}</span>`;
        }
        if (this.card.ability_5 === abilities.ACTIVE_CARD_PARAMETER_UP) {
            this.card.ability_5_parameter = this.getParameter('ability_5', parameter);
            this.card.ability_5_display = `アクティブスキルカード獲得時、${this.card.type_display}上昇<span class="font-bold">+${this.card.ability_5_parameter}</span>`;
        }
    }

    /**
     * メンタルカード獲得時パラメータ上昇
     */
    private calcMentalCardParameterUp() {
        let parameter = {r: [0, 0, 0], sr: [0, 0, 0], ssr: [1, 2, 3], ssr_event: [1, 2, 2]};
        if (this.card.ability_2 === abilities.MENTAL_CARD_PARAMETER_UP) {
            this.card.ability_2_parameter = this.getParameter('ability_2', parameter);
            this.card.ability_2_display = `メンタルスキルカード獲得時、${this.card.type_display}上昇<span class="font-bold">+${this.card.ability_2_parameter}</span>`;
        }
        if (this.card.ability_4 === abilities.MENTAL_CARD_PARAMETER_UP) {
            this.card.ability_4_parameter = this.getParameter('ability_4', parameter);
            this.card.ability_4_display = `メンタルスキルカード獲得時、${this.card.type_display}上昇<span class="font-bold">+${this.card.ability_4_parameter}</span>`;
        }
        if (this.card.ability_5 === abilities.MENTAL_CARD_PARAMETER_UP) {
            this.card.ability_5_parameter = this.getParameter('ability_5', parameter);
            this.card.ability_5_display = `メンタルスキルカード獲得時、${this.card.type_display}上昇<span class="font-bold">+${this.card.ability_5_parameter}</span>`;
        }
    }

    /**
     * 好調効果カード獲得時パラメータ上昇
     */
    private calcKotyoCardParameterUp() {
        let parameter = {r: [0, 0, 0], sr: [2, 3, 3], ssr: [2, 3, 4], ssr_event: [0, 0, 0]};
        if (this.card.ability_2 === abilities.KOTYO_CARD_PARAMETER_UP) {
            this.card.ability_2_parameter = this.getParameter('ability_2', parameter);
            this.card.ability_2_display = `好調効果のスキルカード獲得時、${this.card.type_display}上昇<span class="font-bold">+${this.card.ability_2_parameter}</span>`;
        }
        if (this.card.ability_4 === abilities.KOTYO_CARD_PARAMETER_UP) {
            this.card.ability_4_parameter = this.getParameter('ability_4', parameter);
            this.card.ability_4_display = `好調効果のスキルカード獲得時、${this.card.type_display}上昇<span class="font-bold">+${this.card.ability_4_parameter}</span>`;
        }
        if (this.card.ability_5 === abilities.KOTYO_CARD_PARAMETER_UP) {
            this.card.ability_5_parameter = this.getParameter('ability_5', parameter);
            this.card.ability_5_display = `好調効果のスキルカード獲得時、${this.card.type_display}上昇<span class="font-bold">+${this.card.ability_5_parameter}</span>`;
        }
    }

    /**
     * 好印象効果カード獲得時パラメータ上昇
     */
    private calcKoinsyoCardParameterUp() {
        let parameter = {r: [0, 0, 0], sr: [2, 3, 3], ssr: [2, 3, 4], ssr_event: [0, 0, 0]};
        if (this.card.ability_2 === abilities.KOINSYO_CARD_PARAMETER_UP) {
            this.card.ability_2_parameter = this.getParameter('ability_2', parameter);
            this.card.ability_2_display = `好印象効果のスキルカード獲得時、${this.card.type_display}上昇<span class="font-bold">+${this.card.ability_2_parameter}</span>`;
        }
        if (this.card.ability_4 === abilities.KOINSYO_CARD_PARAMETER_UP) {
            this.card.ability_4_parameter = this.getParameter('ability_4', parameter);
            this.card.ability_4_display = `好印象効果のスキルカード獲得時、${this.card.type_display}上昇<span class="font-bold">+${this.card.ability_4_parameter}</span>`;
        }
        if (this.card.ability_5 === abilities.KOINSYO_CARD_PARAMETER_UP) {
            this.card.ability_5_parameter = this.getParameter('ability_5', parameter);
            this.card.ability_5_display = `好印象効果のスキルカード獲得時、${this.card.type_display}上昇<span class="font-bold">+${this.card.ability_5_parameter}</span>`;
        }
    }

    /**
     * スキルカード強化時パラメータ上昇
     */
    private calcCardStrengthenParameterUp() {
        let parameter = {r: [0, 0, 0], sr: [2, 3, 3], ssr: [2, 3, 4], ssr_event: [0, 0, 0]};
        if (this.card.ability_2 === abilities.CARD_STRENGTHEN_PARAMETER_UP) {
            this.card.ability_2_parameter = this.getParameter('ability_2', parameter);
            this.card.ability_2_display = `スキルカード強化時、${this.card.type_display}上昇<span class="font-bold">+${this.card.ability_2_parameter}</span>`;
        }
        if (this.card.ability_4 === abilities.CARD_STRENGTHEN_PARAMETER_UP) {
            this.card.ability_4_parameter = this.getParameter('ability_4', parameter);
            this.card.ability_4_display = `スキルカード強化時、${this.card.type_display}上昇<span class="font-bold">+${this.card.ability_4_parameter}</span>`;
        }
        if (this.card.ability_5 === abilities.CARD_STRENGTHEN_PARAMETER_UP) {
            this.card.ability_5_parameter = this.getParameter('ability_5', parameter);
            this.card.ability_5_display = `スキルカード強化時、${this.card.type_display}上昇<span class="font-bold">+${this.card.ability_5_parameter}</span>`;
        }
    }

    /**
     * アクティブカード強化時パラメータ上昇
     */
    private calcActiveCardStrengthenParameterUp() {
        let parameter = {r: [0, 0, 0], sr: [4, 6, 6], ssr: [5, 7, 9], ssr_event: [5, 7, 7]};
        if (this.card.ability_2 === abilities.ACTIVE_CARD_STRENGTHEN_PARAMETER_UP) {
            this.card.ability_2_parameter = this.getParameter('ability_2', parameter);
            this.card.ability_2_display = `アクティブスキルカード強化時、${this.card.type_display}上昇<span class="font-bold">+${this.card.ability_2_parameter}</span>`;
        }
        if (this.card.ability_4 === abilities.ACTIVE_CARD_STRENGTHEN_PARAMETER_UP) {
            this.card.ability_4_parameter = this.getParameter('ability_4', parameter);
            this.card.ability_4_display = `アクティブスキルカード強化時、${this.card.type_display}上昇<span class="font-bold">+${this.card.ability_4_parameter}</span>`;
        }
        if (this.card.ability_5 === abilities.ACTIVE_CARD_STRENGTHEN_PARAMETER_UP) {
            this.card.ability_5_parameter = this.getParameter('ability_5', parameter);
            this.card.ability_5_display = `アクティブスキルカード強化時、${this.card.type_display}上昇<span class="font-bold">+${this.card.ability_5_parameter}</span>`;
        }
    }

    /**
     * メンタルカード強化時パラメータ上昇
     */
    private calcMentalCardStrengthenParameterUp() {
        let parameter = {r: [0, 0, 0], sr: [4, 6, 6], ssr: [5, 7, 9], ssr_event: [5, 7, 7]};
        if (this.card.ability_2 === abilities.MENTAL_CARD_STRENGTHEN_PARAMETER_UP) {
            this.card.ability_2_parameter = this.getParameter('ability_2', parameter);
            this.card.ability_2_display = `メンタルスキルカード強化時、${this.card.type_display}上昇<span class="font-bold">+${this.card.ability_2_parameter}</span>`;
        }
        if (this.card.ability_4 === abilities.MENTAL_CARD_STRENGTHEN_PARAMETER_UP) {
            this.card.ability_4_parameter = this.getParameter('ability_4', parameter);
            this.card.ability_4_display = `メンタルスキルカード強化時、${this.card.type_display}上昇<span class="font-bold">+${this.card.ability_4_parameter}</span>`;
        }
        if (this.card.ability_5 === abilities.MENTAL_CARD_STRENGTHEN_PARAMETER_UP) {
            this.card.ability_5_parameter = this.getParameter('ability_5', parameter);
            this.card.ability_5_display = `メンタルスキルカード強化時、${this.card.type_display}上昇<span class="font-bold">+${this.card.ability_5_parameter}</span>`;
        }
    }

    /**
     * スキルカード削除時パラメータ上昇
     */
    private calcCardDeleteParameterUp() {
        let parameter = {r: [0, 0, 0], sr: [4, 8, 8], ssr: [6, 8, 11], ssr_event: [0, 0, 0]};
        if (this.card.ability_2 === abilities.CARD_DELETE_PARAMETER_UP) {
            this.card.ability_2_parameter = this.getParameter('ability_2', parameter);
            this.card.ability_2_display = `スキルカード削除時、${this.card.type_display}上昇<span class="font-bold">+${this.card.ability_2_parameter}</span>`;
        }
        if (this.card.ability_4 === abilities.CARD_DELETE_PARAMETER_UP) {
            this.card.ability_4_parameter = this.getParameter('ability_4', parameter);
            this.card.ability_4_display = `スキルカード削除時、${this.card.type_display}上昇<span class="font-bold">+${this.card.ability_4_parameter}</span>`;
        }
        if (this.card.ability_5 === abilities.CARD_DELETE_PARAMETER_UP) {
            this.card.ability_5_parameter = this.getParameter('ability_5', parameter);
            this.card.ability_5_display = `スキルカード削除時、${this.card.type_display}上昇<span class="font-bold">+${this.card.ability_5_parameter}</span>`;
        }
    }

    /**
     * 授業・営業終了時パラメータ上昇
     */
    private calcClassParameterUp() {
        let parameter = {r: [2, 3, 3], sr: [3, 5, 5], ssr: [4, 5, 7], ssr_event: [0, 0, 0]};
        if (this.card.ability_2 === abilities.CLASS_PARAMETER_UP) {
            this.card.ability_2_parameter = this.getParameter('ability_2', parameter);
            this.card.ability_2_display = `授業・営業終了時、${this.card.type_display}上昇<span class="font-bold">+${this.card.ability_2_parameter}</span>`;
        }
        if (this.card.ability_4 === abilities.CLASS_PARAMETER_UP) {
            this.card.ability_4_parameter = this.getParameter('ability_4', parameter);
            this.card.ability_4_display = `授業・営業終了時、${this.card.type_display}上昇<span class="font-bold">+${this.card.ability_4_parameter}</span>`;
        }
        if (this.card.ability_5 === abilities.CLASS_PARAMETER_UP) {
            this.card.ability_5_parameter = this.getParameter('ability_5', parameter);
            this.card.ability_5_display = `授業・営業終了時、${this.card.type_display}上昇<span class="font-bold">+${this.card.ability_5_parameter}</span>`;
        }
    }

    /**
     * 活動支給・差し入れ選択時パラメータ上昇
     */
    private calcGiftParameterUp() {
        let parameter = {r: [4, 8, 8], sr: [6, 11, 11], ssr: [9, 12, 17], ssr_event: [0, 0, 0]};
        if (this.card.ability_2 === abilities.GIFT_PARAMETER_UP) {
            this.card.ability_2_parameter = this.getParameter('ability_2', parameter);
            this.card.ability_2_display = `活動支給・差し入れ選択時、${this.card.type_display}上昇<span class="font-bold">+${this.card.ability_2_parameter}</span>`;
        }
        if (this.card.ability_4 === abilities.GIFT_PARAMETER_UP) {
            this.card.ability_4_parameter = this.getParameter('ability_4', parameter);
            this.card.ability_4_display = `活動支給・差し入れ選択時、${this.card.type_display}上昇<span class="font-bold">+${this.card.ability_4_parameter}</span>`;
        }
        if (this.card.ability_5 === abilities.GIFT_PARAMETER_UP) {
            this.card.ability_5_parameter = this.getParameter('ability_5', parameter);
            this.card.ability_5_display = `活動支給・差し入れ選択時、${this.card.type_display}上昇<span class="font-bold">+${this.card.ability_5_parameter}</span>`;
        }
    }

    /**
     * お出かけ終了時パラメータ上昇
     */
    private calcOutingParameterUp() {
        let parameter = {r: [4, 7, 7], sr: [5, 10, 10], ssr: [8, 11, 15], ssr_event: [0, 0, 0]};
        if (this.card.ability_2 === abilities.OUTING_PARAMETER_UP) {
            this.card.ability_2_parameter = this.getParameter('ability_2', parameter);
            this.card.ability_2_display = `お出かけ終了時、${this.card.type_display}上昇<span class="font-bold">+${this.card.ability_2_parameter}</span>`;
        }
        if (this.card.ability_4 === abilities.OUTING_PARAMETER_UP) {
            this.card.ability_4_parameter = this.getParameter('ability_4', parameter);
            this.card.ability_4_display = `お出かけ終了時、${this.card.type_display}上昇<span class="font-bold">+${this.card.ability_4_parameter}</span>`;
        }
        if (this.card.ability_5 === abilities.OUTING_PARAMETER_UP) {
            this.card.ability_5_parameter = this.getParameter('ability_5', parameter);
            this.card.ability_5_display = `お出かけ終了時、${this.card.type_display}上昇<span class="font-bold">+${this.card.ability_5_parameter}</span>`;
        }
    }

    /**
     * 相談選択時パラメータ上昇
     */
    private calcConsultationParameterUp() {
        let parameter = {r: [0, 0, 0], sr: [4, 8, 8], ssr: [6, 8, 11], ssr_event: [6, 8, 8]};
        if (this.card.ability_2 === abilities.CONSULTATION_PARAMETER_UP) {
            this.card.ability_2_parameter = this.getParameter('ability_2', parameter);
            this.card.ability_2_display = `相談選択時、${this.card.type_display}上昇<span class="font-bold">+${this.card.ability_2_parameter}</span>`;
        }
        if (this.card.ability_4 === abilities.CONSULTATION_PARAMETER_UP) {
            this.card.ability_4_parameter = this.getParameter('ability_4', parameter);
            this.card.ability_4_display = `相談選択時、${this.card.type_display}上昇<span class="font-bold">+${this.card.ability_4_parameter}</span>`;
        }
        if (this.card.ability_5 === abilities.CONSULTATION_PARAMETER_UP) {
            this.card.ability_5_parameter = this.getParameter('ability_5', parameter);
            this.card.ability_5_display = `相談選択時、${this.card.type_display}上昇<span class="font-bold">+${this.card.ability_5_parameter}</span>`;
        }
    }

    /**
     * 相談でPドリンク交換後パラメータ上昇
     */
    private calcConsultationDrinkParameterUp() {
        let parameter = {r: [0, 0, 0], sr: [4, 8, 8], ssr: [6, 8, 11], ssr_event: [0, 0, 0]};
        if (this.card.ability_2 === abilities.CONSULTATION_DRINK_PARAMETER_UP) {
            this.card.ability_2_parameter = this.getParameter('ability_2', parameter);
            this.card.ability_2_display = `相談でPドリンク交換後、${this.card.type_display}上昇<span class="font-bold">+${this.card.ability_2_parameter}</span>`;
        }
        if (this.card.ability_4 === abilities.CONSULTATION_DRINK_PARAMETER_UP) {
            this.card.ability_4_parameter = this.getParameter('ability_4', parameter);
            this.card.ability_4_display = `相談でPドリンク交換後、${this.card.type_display}上昇<span class="font-bold">+${this.card.ability_4_parameter}</span>`;
        }
        if (this.card.ability_5 === abilities.CONSULTATION_DRINK_PARAMETER_UP) {
            this.card.ability_5_parameter = this.getParameter('ability_5', parameter);
            this.card.ability_5_display = `相談でPドリンク交換後、${this.card.type_display}上昇<span class="font-bold">+${this.card.ability_5_parameter}</span>`;
        }
    }

    /**
     * 休む選択時パラメータ上昇
     */
    private calcRestParameterUp() {
        let parameter = {r: [6, 11, 11], sr: [9, 17, 17], ssr: [11, 17, 22], ssr_event: [0, 0, 0]};
        if (this.card.ability_2 === abilities.REST_PARAMETER_UP) {
            this.card.ability_2_parameter = this.getParameter('ability_2', parameter);
            this.card.ability_2_display = `休む選択時、${this.card.type_display}上昇<span class="font-bold">+${this.card.ability_2_parameter}</span>`;
        }
        if (this.card.ability_4 === abilities.REST_PARAMETER_UP) {
            this.card.ability_4_parameter = this.getParameter('ability_4', parameter);
            this.card.ability_4_display = `休む選択時、${this.card.type_display}上昇<span class="font-bold">+${this.card.ability_4_parameter}</span>`;
        }
        if (this.card.ability_5 === abilities.REST_PARAMETER_UP) {
            this.card.ability_5_parameter = this.getParameter('ability_5', parameter);
            this.card.ability_5_display = `休む選択時、${this.card.type_display}上昇<span class="font-bold">+${this.card.ability_5_parameter}</span>`;
        }
    }

    /**
     * 試験・オーディション終了時パラメータ上昇
     */
    private calcExamParameterUp() {
        let parameter = {r: [0, 0, 0], sr: [9, 17, 17], ssr: [11, 17, 22], ssr_event: [11, 17, 17]};
        if (this.card.ability_2 === abilities.EXAM_PARAMETER_UP) {
            this.card.ability_2_parameter = this.getParameter('ability_2', parameter);
            this.card.ability_2_display = `試験・オーディション終了時、${this.card.type_display}上昇<span class="font-bold">+${this.card.ability_2_parameter}</span>`;
        }
        if (this.card.ability_4 === abilities.EXAM_PARAMETER_UP) {
            this.card.ability_4_parameter = this.getParameter('ability_4', parameter);
            this.card.ability_4_display = `試験・オーディション終了時、${this.card.type_display}上昇<span class="font-bold">+${this.card.ability_4_parameter}</span>`;
        }
        if (this.card.ability_5 === abilities.EXAM_PARAMETER_UP) {
            this.card.ability_5_parameter = this.getParameter('ability_5', parameter);
            this.card.ability_5_display = `試験・オーディション終了時、${this.card.type_display}上昇<span class="font-bold">+${this.card.ability_5_parameter}</span>`;
        }
    }

    /**
     * レッスン終了時Pポイント獲得量増加
     */
    private calcLessonPPointUp() {
        let parameter = {r: [0, 0, 0], sr: [8.3, 16.5, 16.5], ssr: [11, 16.5, 22], ssr_event: [0, 0, 0]};
        if (this.card.ability_2 === abilities.LESSON_P_POINT_UP) {
            this.card.ability_2_parameter = this.getParameter('ability_2', parameter);
            this.card.ability_2_display = `レッスン終了時、Pポイント獲得量増加<span class="font-bold">+${this.card.ability_2_parameter}</span>%`;
        }
        if (this.card.ability_4 === abilities.LESSON_P_POINT_UP) {
            this.card.ability_4_parameter = this.getParameter('ability_4', parameter);
            this.card.ability_4_display = `レッスン終了時、Pポイント獲得量増加<span class="font-bold">+${this.card.ability_4_parameter}</span>%`;
        }
        if (this.card.ability_5 === abilities.LESSON_P_POINT_UP) {
            this.card.ability_5_parameter = this.getParameter('ability_5', parameter);
            this.card.ability_5_display = `レッスン終了時、Pポイント獲得量増加<span class="font-bold">+${this.card.ability_5_parameter}</span>%`;
        }
    }

    /**
     * SPレッスン終了時Pポイント獲得量増加
     */
    private calcSpLessonPPointUp() {
        let parameter = {r: [0, 0, 0], sr: [0, 0, 0], ssr: [22, 33, 45], ssr_event: [22, 33, 33]};
        if (this.card.ability_2 === abilities.SP_LESSON_P_POINT_UP) {
            this.card.ability_2_parameter = this.getParameter('ability_2', parameter);
            this.card.ability_2_display = `${this.card.type_display}SPレッスン終了時、Pポイント獲得量増加<span class="font-bold">+${this.card.ability_2_parameter}%</span>`;
        }
        if (this.card.ability_4 === abilities.SP_LESSON_P_POINT_UP) {
            this.card.ability_4_parameter = this.getParameter('ability_4', parameter);
            this.card.ability_4_display = `${this.card.type_display}SPレッスン終了時、Pポイント獲得量増加<span class="font-bold">+${this.card.ability_4_parameter}%</span>`;
        }
        if (this.card.ability_5 === abilities.SP_LESSON_P_POINT_UP) {
            this.card.ability_5_parameter = this.getParameter('ability_5', parameter);
            this.card.ability_5_display = `${this.card.type_display}SPレッスン終了時、Pポイント獲得量増加<span class="font-bold">+${this.card.ability_5_parameter}%</span>`;
        }
    }

    /**
     * SPレッスン終了時体力回復
     */
    private calcSpLessonHpRecover() {
        let parameter = {r: [0, 0, 0], sr: [3, 5, 5], ssr: [4, 5, 7], ssr_event: [4, 5, 5]};
        let typeDisplay = this.card.type_display;
        if (this.card.type === types.ASSIST) {
            parameter = {r: [0, 0, 0], sr: [0, 0, 0], ssr: [2, 3, 4], ssr_event: [0, 0, 0]};
            typeDisplay = '';
        }
        if (this.card.ability_2 === abilities.SP_LESSON_HP_RECOVER) {
            this.card.ability_2_parameter = this.getParameter('ability_2', parameter);
            this.card.ability_2_display = `${typeDisplay}SPレッスン終了時、体力回復<span class="font-bold">${this.card.ability_2_parameter}</span>`;
        }
        if (this.card.ability_4 === abilities.SP_LESSON_HP_RECOVER) {
            this.card.ability_4_parameter = this.getParameter('ability_4', parameter);
            this.card.ability_4_display = `${typeDisplay}SPレッスン終了時、体力回復<span class="font-bold">${this.card.ability_4_parameter}</span>`;
        }
        if (this.card.ability_5 === abilities.SP_LESSON_HP_RECOVER) {
            this.card.ability_5_parameter = this.getParameter('ability_5', parameter);
            this.card.ability_5_display = `${typeDisplay}SPレッスン終了時、体力回復<span class="font-bold">${this.card.ability_5_parameter}</span>`;
        }
    }

    /**
     * 活動支給・差し入れ選択時体力回復
     */
    private calcGiftHpRecover() {
        let parameter = {r: [0, 0, 0], sr: [0, 0, 0], ssr: [0, 0, 0], ssr_event: [3, 4, 4]};
        if (this.card.ability_2 === abilities.GIFT_HP_RECOVER) {
            this.card.ability_2_parameter = this.getParameter('ability_2', parameter);
            this.card.ability_2_display = `活動支給・差し入れ選択時、体力回復<span class="font-bold">${this.card.ability_2_parameter}</span>`;
        }
        if (this.card.ability_4 === abilities.GIFT_HP_RECOVER) {
            this.card.ability_4_parameter = this.getParameter('ability_4', parameter);
            this.card.ability_4_display = `活動支給・差し入れ選択時、体力回復<span class="font-bold">${this.card.ability_4_parameter}</span>`;
        }
        if (this.card.ability_5 === abilities.GIFT_HP_RECOVER) {
            this.card.ability_5_parameter = this.getParameter('ability_5', parameter);
            this.card.ability_5_display = `活動支給・差し入れ選択時、体力回復<span class="font-bold">${this.card.ability_5_parameter}</span>`;
        }
    }

    /**
     * 試験・オーディション終了時体力回復
     */
    private calcExamHpRecover() {
        let parameter = {r: [0, 0, 0], sr: [0, 0, 0], ssr: [4, 6, 8], ssr_event: [0, 0, 0]};
        if (this.card.ability_2 === abilities.EXAM_HP_RECOVER) {
            this.card.ability_2_parameter = this.getParameter('ability_2', parameter);
            this.card.ability_2_display = `試験・オーディション終了時、体力回復<span class="font-bold">${this.card.ability_2_parameter}</span>`;
        }
        if (this.card.ability_4 === abilities.EXAM_HP_RECOVER) {
            this.card.ability_4_parameter = this.getParameter('ability_4', parameter);
            this.card.ability_4_display = `試験・オーディション終了時、体力回復<span class="font-bold">${this.card.ability_4_parameter}</span>`;
        }
        if (this.card.ability_5 === abilities.EXAM_HP_RECOVER) {
            this.card.ability_5_parameter = this.getParameter('ability_5', parameter);
            this.card.ability_5_display = `試験・オーディション終了時、体力回復<span class="font-bold">${this.card.ability_5_parameter}</span>`;
        }
    }

    /**
     * 相談のPドリンク割引
     */
    private calcConsultationDrinkSale() {
        let parameter = {r: [0, 0, 0], sr: [7.9, 15.8, 15.8], ssr: [0, 0, 0], ssr_event: [0, 0, 0]};
        if (this.card.ability_2 === abilities.CONSULTATION_DRINK_SALE) {
            this.card.ability_2_parameter = this.getParameter('ability_2', parameter);
            this.card.ability_2_display = `相談のPドリンクを<span class="font-bold">${this.card.ability_2_parameter}%</span>割引`;
        }
        if (this.card.ability_4 === abilities.CONSULTATION_DRINK_SALE) {
            this.card.ability_4_parameter = this.getParameter('ability_4', parameter);
            this.card.ability_4_display = `相談のPドリンクを<span class="font-bold">${this.card.ability_4_parameter}%</span>割引`;
        }
        if (this.card.ability_5 === abilities.CONSULTATION_DRINK_SALE) {
            this.card.ability_5_parameter = this.getParameter('ability_5', parameter);
            this.card.ability_5_display = `相談のPドリンクを<span class="font-bold">${this.card.ability_5_parameter}%</span>割引`;
        }
    }

    /**
     * サポートカードイベント2の上昇値を算出する
     */
    private calcEventParameter() {
        if (this.card.event_2 === events.PARAMETER_UP) {
            switch (this.card.rarity) {
                case rarities.RARITY_SSR:
                case rarities.RARITY_SSR_EVENT:
                    this.card.event_2_parameter = Math.floor(20 + (20 * (this.card.ability_6_parameter / 100)));
                    break;
                case rarities.RARITY_SR:
                    this.card.event_2_parameter = Math.floor(15 + (15 * (this.card.ability_6_parameter / 100)));
                    break;
                case rarities.RARITY_R:
                    this.card.event_2_parameter = Math.floor(10 + (10 * (this.card.ability_6_parameter / 100)));
                    break;
                default:
                    break;
            }
            this.card.event_2_display = `${this.card.type_display}上昇<span class="font-bold">+${this.card.event_2_parameter}</span>`;
        }
        if (this.card.event_2 === events.HP_RECOVER) {
            switch (this.card.rarity) {
                case rarities.RARITY_SSR:
                    this.card.event_2_parameter = Math.floor(7 + (7 * (this.card.ability_6_parameter / 100)));
                    break;
                case rarities.RARITY_SSR_EVENT:
                case rarities.RARITY_SR:
                case rarities.RARITY_R:
                default:
                    break;
            }
            this.card.event_2_display = `体力回復<span class="font-bold">${this.card.event_2_parameter}</span>`;
        }
        if (this.card.event_2 === events.GET_P_POINT) {
            switch (this.card.rarity) {
                case rarities.RARITY_SR:
                    this.card.event_2_parameter = Math.floor(25 + (25 * (this.card.ability_6_parameter / 100)));
                    break;
                case rarities.RARITY_SSR:
                case rarities.RARITY_SSR_EVENT:
                case rarities.RARITY_R:
                default:
                    break;
            }
            this.card.event_2_display = `Pポイント<span class="font-bold">+${this.card.event_2_parameter}</span>`;
        }
    }
}
import {rarities, plans, effects, abilities, types} from "@/consts/idolConst";

export default class IdolDetail {

    idol: any
    pIdol: any

    constructor(idol: any, pIdol: any) {
        this.idol = idol;
        this.pIdol = pIdol;

        // 表示用
        this.getDisplayText();

        // 初期パラメータを計算
        this.calcParameter();
    }

    getDetails() {
        return this.pIdol;
    }

    private getDisplayText() {
        this.pIdol.idol_name = this.idol.name;
        this.pIdol.parameter_type = this.idol.parameter_type;
        this.pIdol.vocal_priority = this.idol.vocal_priority;
        this.pIdol.dance_priority = this.idol.dance_priority;
        this.pIdol.visual_priority = this.idol.visual_priority;
        this.pIdol.dear_level = this.idol.dear_level;

        switch (this.pIdol.rarity) {
            case rarities.RARITY_SSR:
            case rarities.RARITY_SSR_EVENT:
                this.pIdol.rarity_display = 'SSR';
                break;
            case rarities.RARITY_SR:
                this.pIdol.rarity_display = 'SR';
                break;
            case rarities.RARITY_R:
                this.pIdol.rarity_display = 'R';
                break;
            default:
                break;
        }
        switch (this.pIdol.plan) {
            case plans.SENSE:
                this.pIdol.plan_display = 'センス';
                break;
            case plans.LOGIC:
                this.pIdol.plan_display = 'ロジック';
                break;
            case plans.ANOMALY:
                this.pIdol.plan_display = 'アノマリー';
                break;
            default:
                break;
        }
        switch (this.pIdol.effect) {
            case effects.KOTYO:
                this.pIdol.effect_display = '好調';
                break;
            case effects.SYUTYU:
                this.pIdol.effect_display = '集中';
                break;
            case effects.KOINSYO:
                this.pIdol.effect_display = '好印象';
                break;
            case effects.YARUKI:
                this.pIdol.effect_display = 'やる気';
                break;
            case effects.TUYOKI:
                this.pIdol.effect_display = '強気';
                break;
            case effects.ZENRYOKU:
                this.pIdol.effect_display = '全力';
                break;
            default:
                break;
        }
    }

    private calcParameter() {
        // 共通処理
        this.calcScoreBonus();
        this.calcBusinessFanBonus();
        this.calcAuditionFanBonus();

        switch (this.pIdol.idol_id) {
            // 花海咲季
            case 1:
                this.calcParameterSaki();
                break;

            // 月村手毬
            case 2:
                this.calcParameterTemari();
                break;

            // 藤田ことね
            case 3:
                this.calcParameterKotone();
                break;

            // 有村麻央
            case 4:
                this.calcParameterMao();
                break;

            // 葛城リーリヤ
            case 5:
                this.calcParameterLilja();
                break;

            // 倉本千奈
            case 6:
                this.calcParameterChina();
                break;

            // 紫雲清夏
            case 7:
                this.calcParameterSumika();
                break;

            // 篠澤広
            case 8:
                this.calcParameterHiro();
                break;

            // 十王星南
            case 11:
                this.calcParameterSena();
                break;

            // 秦谷美鈴
            case 12:
                this.calcParameterMisuzu();
                break;

            // 花海佑芽
            case 10:
                this.calcParameterUme();
                break;

            // 姫崎莉波
            case 9:
                this.calcParameterRinami();
                break;

            default:
                break;
        }
    }

    private calcScoreBonus() {
        let scoreBonus: number;
        switch (this.idol.dear_level) {
            case 1:
                scoreBonus = 0;
                break;
            case 2:
                scoreBonus = 5;
                break;
            case 3:
                scoreBonus = 10;
                break;
            case 4:
            case 5:
                scoreBonus = 15;
                break;
            case 6:
                scoreBonus = 20;
                break;
            case 7:
                scoreBonus = 30;
                break;
            case 8:
                scoreBonus = 40;
                break;
            default:
                scoreBonus = 50;
                break;
        }

        this.pIdol.score_bonus = scoreBonus;
    }

    private calcBusinessFanBonus() {
        let fanBonus: number;
        switch (this.idol.dear_level) {
            case 11:
                fanBonus = 5;
                break;
            case 12:
                fanBonus = 10;
                break;
            case 13:
                fanBonus = 15;
                break;
            case 14:
                fanBonus = 20;
                break;
            case 15:
                fanBonus = 25;
                break;
            case 16:
                fanBonus = 30;
                break;
            case 17:
                fanBonus = 35;
                break;
            case 18:
                fanBonus = 40;
                break;
            case 19:
            case 20:
                fanBonus = 50;
                break;
            default:
                fanBonus = 0;
                break;
        }

        this.pIdol.business_fan_bonus = fanBonus;
    }

    private calcAuditionFanBonus() {
        let fanBonus: number;
        switch (this.idol.dear_level) {
            case 11:
                fanBonus = 5;
                break;
            case 12:
                fanBonus = 10;
                break;
            case 13:
                fanBonus = 15;
                break;
            case 14:
                fanBonus = 20;
                break;
            case 15:
                fanBonus = 25;
                break;
            case 16:
                fanBonus = 30;
                break;
            case 17:
                fanBonus = 35;
                break;
            case 18:
                fanBonus = 40;
                break;
            case 19:
            case 20:
                fanBonus = 50;
                break;
            default:
                fanBonus = 0;
                break;
        }

        this.pIdol.audition_fan_bonus = fanBonus;
    }

    private calcSpLessonRate(type: string) {
        let vocal = 0, dance = 0, visual = 0;

        if (this.pIdol.training_level >= 2) {
            vocal += 5;
            dance += 5;
            visual += 5;
        }
        if (this.pIdol.training_level >= 6) {
            vocal += 10;
            dance += 10;
            visual += 10;
        }
        if (this.pIdol.ability === abilities.SEASON || this.pIdol.ability === abilities.UNIT) {
            switch (type) {
                case types.VOCAL:
                    vocal += 15;
                    break;
                case types.DANCE:
                    dance += 15;
                    break;
                case types.VISUAL:
                    visual += 15;
                    break;
                default:
                    break;
            }
        }
        this.pIdol.sp_lesson_rate_vocal = vocal;
        this.pIdol.sp_lesson_rate_dance = dance;
        this.pIdol.sp_lesson_rate_visual = visual;
    }

    private calcParameterSaki() {
        let initHp: number, initVo: number, initDa: number, initVi: number, bonusVo: number, bonusDa: number, bonusVi: number;

        // Pアイドル固有値
        switch (this.pIdol.rarity) {
            case rarities.RARITY_SSR:
            case rarities.RARITY_SSR_EVENT:
                initHp = 32;
                initVo = 75;
                initDa = 75;
                initVi = 80;
                bonusVo = 120;
                bonusDa = 120;
                bonusVi = 150;

                // 特訓
                if (this.pIdol.training_level >= 1) {
                    initVo += 10;
                    initDa += 10;
                    initVi += 10;
                }
                if (this.pIdol.training_level >= 4) {
                    initVo += 15;
                    initDa += 15;
                    initVi += 15;
                }
                if (this.pIdol.training_level >= 5) {
                    initHp += 3;
                }

                // 才能開花
                if (this.pIdol.blossoming_level >= 3) {
                    bonusVo += 30;
                    bonusDa += 30;
                    bonusVi += 20;
                }
                if (this.pIdol.blossoming_level >= 4) {
                    initHp += 3;
                }
                break;
            case rarities.RARITY_SR:
                initHp = 32;
                initVo = 70;
                initDa = 70;
                initVi = 75;
                bonusVo = 120;
                bonusDa = 120;
                bonusVi = 130;

                // 特訓
                if (this.pIdol.training_level >= 1) {
                    initVo += 10;
                    initDa += 10;
                    initVi += 10;
                }
                if (this.pIdol.training_level >= 4) {
                    initVo += 15;
                    initDa += 15;
                    initVi += 15;
                }
                if (this.pIdol.training_level >= 5) {
                    initHp += 3;
                }

                // 才能開花
                if (this.pIdol.blossoming_level >= 3) {
                    bonusVo += 20;
                    bonusDa += 20;
                    bonusVi += 10;
                }
                if (this.pIdol.blossoming_level >= 4) {
                    initHp += 3;
                }
                break;
            case rarities.RARITY_R:
                initHp = 32;
                initVo = 65;
                initDa = 65;
                initVi = 70;
                bonusVo = 110;
                bonusDa = 110;
                bonusVi = 130;

                // 特訓
                if (this.pIdol.training_level >= 1) {
                    initVo += 10;
                    initDa += 10;
                    initVi += 10;
                }
                if (this.pIdol.training_level >= 4) {
                    initVo += 15;
                    initDa += 15;
                    initVi += 15;
                }
                if (this.pIdol.training_level >= 5) {
                    initHp += 3;
                }

                // 才能開花
                if (this.pIdol.blossoming_level >= 3) {
                    bonusVo += 10;
                    bonusDa += 10;
                }
                if (this.pIdol.blossoming_level >= 4) {
                    initHp += 3;
                }
                break;
            default:
                break;
        }

        // アイドル共通値
        if (this.idol.dear_level >= 10) {
            bonusVo += 30;
            bonusDa += 30;
            bonusVi += 30;
        }
        if (this.idol.dear_level >= 20) {
            bonusVo += 15;
            bonusDa += 15;
            bonusVi += 25;
        }

        this.pIdol.init_hp = initHp;
        this.pIdol.init_vocal = initVo;
        this.pIdol.init_dance = initDa;
        this.pIdol.init_visual = initVi;
        this.pIdol.bonus_vocal = (bonusVo / 10).toFixed(1);
        this.pIdol.bonus_dance = (bonusDa / 10).toFixed(1);
        this.pIdol.bonus_visual = (bonusVi / 10).toFixed(1);

        // SPレッスン発生率
        this.calcSpLessonRate(types.VISUAL);
    }

    private calcParameterTemari() {
        let initHp: number, initVo: number, initDa: number, initVi: number, bonusVo: number, bonusDa: number, bonusVi: number;

        // Pアイドル固有値
        switch (this.pIdol.rarity) {
            case rarities.RARITY_SSR:
            case rarities.RARITY_SSR_EVENT:
                initHp = 30;
                initVo = 75;
                initDa = 65;
                initVi = 55;
                bonusVo = 240;
                bonusDa = 160;
                bonusVi = 60;

                // 特訓
                if (this.pIdol.training_level >= 1) {
                    initVo += 10;
                    initDa += 10;
                    initVi += 10;
                }
                if (this.pIdol.training_level >= 4) {
                    initVo += 15;
                    initDa += 15;
                    initVi += 15;
                }
                if (this.pIdol.training_level >= 5) {
                    initHp += 3;
                }

                // 才能開花
                if (this.pIdol.blossoming_level >= 3) {
                    bonusVo += 30;
                    bonusDa += 50;
                }
                if (this.pIdol.blossoming_level >= 4) {
                    initHp += 3;
                }
                break;
            case rarities.RARITY_SR:
                initHp = 30;
                initVo = 70;
                initDa = 60;
                initVi = 50;
                bonusVo = 240;
                bonusDa = 150;
                bonusVi = 50;

                // 特訓
                if (this.pIdol.training_level >= 1) {
                    initVo += 10;
                    initDa += 10;
                    initVi += 10;
                }
                if (this.pIdol.training_level >= 4) {
                    initVo += 15;
                    initDa += 15;
                    initVi += 15;
                }
                if (this.pIdol.training_level >= 5) {
                    initHp += 3;
                }

                // 才能開花
                if (this.pIdol.blossoming_level >= 3) {
                    bonusVo += 20;
                    bonusDa += 30;
                }
                if (this.pIdol.blossoming_level >= 4) {
                    initHp += 3;
                }
                break;
            case rarities.RARITY_R:
                initHp = 30;
                initVo = 65;
                initDa = 55;
                initVi = 45;
                bonusVo = 230;
                bonusDa = 150;
                bonusVi = 40;

                // 特訓
                if (this.pIdol.training_level >= 1) {
                    initVo += 10;
                    initDa += 10;
                    initVi += 10;
                }
                if (this.pIdol.training_level >= 4) {
                    initVo += 15;
                    initDa += 15;
                    initVi += 15;
                }
                if (this.pIdol.training_level >= 5) {
                    initHp += 3;
                }

                // 才能開花
                if (this.pIdol.blossoming_level >= 3) {
                    bonusVo += 10;
                    bonusDa += 10;
                }
                if (this.pIdol.blossoming_level >= 4) {
                    initHp += 3;
                }
                break;
            default:
                break;
        }

        // アイドル共通値
        if (this.idol.dear_level >= 10) {
            initHp += 2;
            initVo += 10;
            bonusDa += 50;
        }
        if (this.idol.dear_level >= 20) {
            initVo += 10;
            initDa += 10;
            bonusDa += 5;
            bonusVi += 25;
        }

        this.pIdol.init_hp = initHp;
        this.pIdol.init_vocal = initVo;
        this.pIdol.init_dance = initDa;
        this.pIdol.init_visual = initVi;
        this.pIdol.bonus_vocal = (bonusVo / 10).toFixed(1);
        this.pIdol.bonus_dance = (bonusDa / 10).toFixed(1);
        this.pIdol.bonus_visual = (bonusVi / 10).toFixed(1);

        // SPレッスン発生率
        this.calcSpLessonRate(types.VOCAL);
    }

    private calcParameterKotone() {
        let initHp: number, initVo: number, initDa: number, initVi: number, bonusVo: number, bonusDa: number, bonusVi: number;

        // Pアイドル固有値
        switch (this.pIdol.rarity) {
            case rarities.RARITY_SSR:
            case rarities.RARITY_SSR_EVENT:
                initHp = 27;
                initVo = 65;
                initDa = 55;
                initVi = 75;
                bonusVo = 60;
                bonusDa = 180;
                bonusVi = 220;

                // 特訓
                if (this.pIdol.training_level >= 1) {
                    initVo += 10;
                    initDa += 10;
                    initVi += 10;
                }
                if (this.pIdol.training_level >= 4) {
                    initVo += 15;
                    initDa += 15;
                    initVi += 15;
                }
                if (this.pIdol.training_level >= 5) {
                    initHp += 3;
                }

                // 才能開花
                if (this.pIdol.blossoming_level >= 3) {
                    // Yellow Big Bang！
                    if (this.pIdol.id === 12) {
                        bonusVo += 50;
                        bonusDa += 30;
                    } else {
                        bonusDa += 50;
                        bonusVi += 30;
                    }
                }
                if (this.pIdol.blossoming_level >= 4) {
                    initHp += 3;
                }
                break;
            case rarities.RARITY_SR:
                initHp = 27;
                initVo = 60;
                initDa = 50;
                initVi = 70;
                bonusVo = 50;
                bonusDa = 170;
                bonusVi = 220;

                // 特訓
                if (this.pIdol.training_level >= 1) {
                    initVo += 10;
                    initDa += 10;
                    initVi += 10;
                }
                if (this.pIdol.training_level >= 4) {
                    initVo += 15;
                    initDa += 15;
                    initVi += 15;
                }
                if (this.pIdol.training_level >= 5) {
                    initHp += 3;
                }

                // 才能開花
                if (this.pIdol.blossoming_level >= 3) {
                    bonusDa += 30;
                    bonusVi += 20;
                }
                if (this.pIdol.blossoming_level >= 4) {
                    initHp += 3;
                }
                break;
            case rarities.RARITY_R:
                initHp = 27;
                initVo = 55;
                initDa = 45;
                initVi = 65;
                bonusVo = 40;
                bonusDa = 170;
                bonusVi = 210;

                // 特訓
                if (this.pIdol.training_level >= 1) {
                    initVo += 10;
                    initDa += 10;
                    initVi += 10;
                }
                if (this.pIdol.training_level >= 4) {
                    initVo += 15;
                    initDa += 15;
                    initVi += 15;
                }
                if (this.pIdol.training_level >= 5) {
                    initHp += 3;
                }

                // 才能開花
                if (this.pIdol.blossoming_level >= 3) {
                    bonusDa += 10;
                    bonusVi += 10;
                }
                if (this.pIdol.blossoming_level >= 4) {
                    initHp += 3;
                }
                break;
            default:
                break;
        }

        // アイドル共通値
        if (this.idol.dear_level >= 10) {
            initHp += 4;
            initVi += 10;
            bonusDa += 60;
        }
        if (this.idol.dear_level >= 20) {
            initDa += 10;
            initVi += 10;
            bonusVo += 20;
            bonusDa += 5;
            bonusVi += 5;
        }

        this.pIdol.init_hp = initHp;
        this.pIdol.init_vocal = initVo;
        this.pIdol.init_dance = initDa;
        this.pIdol.init_visual = initVi;
        this.pIdol.bonus_vocal = (bonusVo / 10).toFixed(1);
        this.pIdol.bonus_dance = (bonusDa / 10).toFixed(1);
        this.pIdol.bonus_visual = (bonusVi / 10).toFixed(1);

        // SPレッスン発生率
        this.calcSpLessonRate(types.DANCE);
    }

    private calcParameterMao() {
        let initHp: number, initVo: number, initDa: number, initVi: number, bonusVo: number, bonusDa: number, bonusVi: number;

        // Pアイドル固有値
        switch (this.pIdol.rarity) {
            case rarities.RARITY_SSR:
            case rarities.RARITY_SSR_EVENT:
                initHp = 31;
                initVo = 75;
                initDa = 65;
                initVi = 55;
                bonusVo = 220;
                bonusDa = 60;
                bonusVi = 180;

                // 特訓
                if (this.pIdol.training_level >= 1) {
                    initVo += 10;
                    initDa += 10;
                    initVi += 10;
                }
                if (this.pIdol.training_level >= 4) {
                    initVo += 15;
                    initDa += 15;
                    initVi += 15;
                }
                if (this.pIdol.training_level >= 5) {
                    initHp += 3;
                }

                // 才能開花
                if (this.pIdol.blossoming_level >= 3) {
                    bonusVo += 30;
                    bonusVi += 50;
                }
                if (this.pIdol.blossoming_level >= 4) {
                    initHp += 3;
                }
                break;
            case rarities.RARITY_SR:
                initHp = 31;
                initVo = 70;
                initDa = 60;
                initVi = 50;
                bonusVo = 210;
                bonusDa = 50;
                bonusVi = 180;

                // 特訓
                if (this.pIdol.training_level >= 1) {
                    initVo += 10;
                    initDa += 10;
                    initVi += 10;
                }
                if (this.pIdol.training_level >= 4) {
                    initVo += 15;
                    initDa += 15;
                    initVi += 15;
                }
                if (this.pIdol.training_level >= 5) {
                    initHp += 3;
                }

                // 才能開花
                if (this.pIdol.blossoming_level >= 3) {
                    bonusVo += 20;
                    bonusVi += 30;
                }
                if (this.pIdol.blossoming_level >= 4) {
                    initHp += 3;
                }
                break;
            case rarities.RARITY_R:
                initHp = 31;
                initVo = 65;
                initDa = 55;
                initVi = 45;
                bonusVo = 200;
                bonusDa = 40;
                bonusVi = 180;

                // 特訓
                if (this.pIdol.training_level >= 1) {
                    initVo += 10;
                    initDa += 10;
                    initVi += 10;
                }
                if (this.pIdol.training_level >= 4) {
                    initVo += 15;
                    initDa += 15;
                    initVi += 15;
                }
                if (this.pIdol.training_level >= 5) {
                    initHp += 3;
                }

                // 才能開花
                if (this.pIdol.blossoming_level >= 3) {
                    bonusVo += 10;
                    bonusVi += 10;
                }
                if (this.pIdol.blossoming_level >= 4) {
                    initHp += 3;
                }
                break;
            default:
                break;
        }

        // アイドル共通値
        if (this.idol.dear_level >= 10) {
            initVo += 10;
            initVi += 10;
            bonusVi += 50;
        }
        if (this.idol.dear_level >= 20) {
            initVo += 15;
            initVi += 10;
            bonusDa += 20;
        }

        this.pIdol.init_hp = initHp;
        this.pIdol.init_vocal = initVo;
        this.pIdol.init_dance = initDa;
        this.pIdol.init_visual = initVi;
        this.pIdol.bonus_vocal = (bonusVo / 10).toFixed(1);
        this.pIdol.bonus_dance = (bonusDa / 10).toFixed(1);
        this.pIdol.bonus_visual = (bonusVi / 10).toFixed(1);

        // SPレッスン発生率
        this.calcSpLessonRate(types.VOCAL);
    }

    private calcParameterLilja() {
        let initHp: number, initVo: number, initDa: number, initVi: number, bonusVo: number, bonusDa: number, bonusVi: number;

        // Pアイドル固有値
        switch (this.pIdol.rarity) {
            case rarities.RARITY_SSR:
            case rarities.RARITY_SSR_EVENT:
                initHp = 28;
                initVo = 55;
                initDa = 55;
                initVi = 65;
                bonusVo = 140;
                bonusDa = 160;
                bonusVi = 180;

                // 特訓
                if (this.pIdol.training_level >= 1) {
                    // White Night! White Wish!
                    if (this.pIdol.id === 33) {
                        initVo += 10;
                        initDa += 10;
                        initVi += 10;
                    } else {
                        initHp += 3;
                    }
                }
                if (this.pIdol.training_level >= 4) {
                    // White Night! White Wish!
                    if (this.pIdol.id === 33) {
                        initVo += 15;
                        initDa += 15;
                        initVi += 15;
                    } else {
                        initVo += 20;
                        initDa += 20;
                        initVi += 20;
                    }
                }
                if (this.pIdol.training_level >= 5) {
                    initHp += 3;
                }

                // 才能開花
                if (this.pIdol.blossoming_level >= 3) {
                    bonusDa += 50;
                    bonusVi += 30;
                }
                if (this.pIdol.blossoming_level >= 4) {
                    initHp += 3;
                }
                break;
            case rarities.RARITY_SR:
                initHp = 28;
                initVo = 50;
                initDa = 50;
                initVi = 60;
                bonusVo = 130;
                bonusDa = 160;
                bonusVi = 170;

                // 特訓
                if (this.pIdol.training_level >= 1) {
                    initHp += 3;
                }
                if (this.pIdol.training_level >= 4) {
                    initVo += 20;
                    initDa += 20;
                    initVi += 20;
                }
                if (this.pIdol.training_level >= 5) {
                    initHp += 3;
                }

                // 才能開花
                if (this.pIdol.blossoming_level >= 3) {
                    bonusDa += 30;
                    bonusVi += 20;
                }
                if (this.pIdol.blossoming_level >= 4) {
                    initHp += 3;
                }
                break;
            case rarities.RARITY_R:
                initHp = 28;
                initVo = 45;
                initDa = 45;
                initVi = 55;
                bonusVo = 120;
                bonusDa = 160;
                bonusVi = 160;

                // 特訓
                if (this.pIdol.training_level >= 1) {
                    initHp += 3;
                }
                if (this.pIdol.training_level >= 4) {
                    initVo += 20;
                    initDa += 20;
                    initVi += 20;
                }
                if (this.pIdol.training_level >= 5) {
                    initHp += 3;
                }

                // 才能開花
                if (this.pIdol.blossoming_level >= 3) {
                    // 初心
                    if (this.pIdol.id === 2014) {
                        bonusDa += 50;
                        bonusVi += 30;
                    } else {
                        bonusDa += 10;
                        bonusVi += 10;
                    }
                }
                if (this.pIdol.blossoming_level >= 4) {
                    initHp += 3;
                }
                break;
            default:
                break;
        }

        // アイドル共通値
        if (this.idol.dear_level >= 10) {
            initVi += 20;
            bonusVo += 40;
            bonusDa += 40;
        }
        if (this.idol.dear_level >= 20) {
            initVo += 5;
            initDa += 25;
            initVi += 10;
        }

        this.pIdol.init_hp = initHp;
        this.pIdol.init_vocal = initVo;
        this.pIdol.init_dance = initDa;
        this.pIdol.init_visual = initVi;
        this.pIdol.bonus_vocal = (bonusVo / 10).toFixed(1);
        this.pIdol.bonus_dance = (bonusDa / 10).toFixed(1);
        this.pIdol.bonus_visual = (bonusVi / 10).toFixed(1);

        // SPレッスン発生率
        this.calcSpLessonRate(types.VISUAL);
    }

    private calcParameterChina() {
        let initHp: number, initVo: number, initDa: number, initVi: number, bonusVo: number, bonusDa: number, bonusVi: number;

        // Pアイドル固有値
        switch (this.pIdol.rarity) {
            case rarities.RARITY_SSR:
            case rarities.RARITY_SSR_EVENT:
                initHp = 23;
                initVo = 55;
                initDa = 55;
                initVi = 60;
                bonusVo = 100;
                bonusDa = 230;
                bonusVi = 190;

                // 特訓
                if (this.pIdol.training_level >= 1) {
                    initHp += 3;
                }
                if (this.pIdol.training_level >= 4) {
                    initVo += 20;
                    initDa += 20;
                    initVi += 20;
                }
                if (this.pIdol.training_level >= 5) {
                    initHp += 3;
                }

                // 才能開花
                if (this.pIdol.blossoming_level >= 3) {
                    bonusDa += 50;
                    bonusVi += 30;
                }
                if (this.pIdol.blossoming_level >= 4) {
                    initHp += 3;
                }
                break;
            case rarities.RARITY_SR:
                initHp = 23;
                initVo = 50;
                initDa = 50;
                initVi = 55;
                bonusVo = 100;
                bonusDa = 230;
                bonusVi = 170;

                // 特訓
                if (this.pIdol.training_level >= 1) {
                    initHp += 3;
                }
                if (this.pIdol.training_level >= 4) {
                    initVo += 20;
                    initDa += 20;
                    initVi += 20;
                }
                if (this.pIdol.training_level >= 5) {
                    initHp += 3;
                }

                // 才能開花
                if (this.pIdol.blossoming_level >= 3) {
                    bonusDa += 30;
                    bonusVi += 20;
                }
                if (this.pIdol.blossoming_level >= 4) {
                    initHp += 3;
                }
                break;
            case rarities.RARITY_R:
                initHp = 23;
                initVo = 45;
                initDa = 45;
                initVi = 50;
                bonusVo = 90;
                bonusDa = 230;
                bonusVi = 160;

                // 特訓
                if (this.pIdol.training_level >= 1) {
                    initHp += 3;
                }
                if (this.pIdol.training_level >= 4) {
                    initVo += 20;
                    initDa += 20;
                    initVi += 20;
                }
                if (this.pIdol.training_level >= 5) {
                    initHp += 3;
                }

                // 才能開花
                if (this.pIdol.blossoming_level >= 3) {
                    // 初心
                    if (this.pIdol.id === 2015) {
                        bonusDa += 50;
                        bonusVi += 30;
                    } else {
                        bonusDa += 10;
                        bonusVi += 10;
                    }
                }
                if (this.pIdol.blossoming_level >= 4) {
                    initHp += 3;
                }
                break;
            default:
                break;
        }

        // アイドル共通値
        if (this.idol.dear_level >= 10) {
            initHp += 2;
            initDa += 35;
            initVi += 35;
        }
        if (this.idol.dear_level >= 20) {
            initHp += 1;
            initDa += 5;
            initVi += 10;
            bonusDa += 10;
            bonusVi += 15;
        }

        this.pIdol.init_hp = initHp;
        this.pIdol.init_vocal = initVo;
        this.pIdol.init_dance = initDa;
        this.pIdol.init_visual = initVi;
        this.pIdol.bonus_vocal = (bonusVo / 10).toFixed(1);
        this.pIdol.bonus_dance = (bonusDa / 10).toFixed(1);
        this.pIdol.bonus_visual = (bonusVi / 10).toFixed(1);

        // SPレッスン発生率
        this.calcSpLessonRate(types.DANCE);
    }

    private calcParameterSumika() {
        let initHp: number, initVo: number, initDa: number, initVi: number, bonusVo: number, bonusDa: number, bonusVi: number;

        // Pアイドル固有値
        switch (this.pIdol.rarity) {
            case rarities.RARITY_SSR:
            case rarities.RARITY_SSR_EVENT:
                initHp = 30;
                initVo = 65;
                initDa = 55;
                initVi = 65;
                bonusVo = 90;
                bonusDa = 200;
                bonusVi = 200;

                // 特訓
                if (this.pIdol.training_level >= 1) {
                    initVo += 10;
                    initDa += 10;
                    initVi += 10;
                }
                if (this.pIdol.training_level >= 4) {
                    initVo += 15;
                    initDa += 15;
                    initVi += 15;
                }
                if (this.pIdol.training_level >= 5) {
                    initHp += 3;
                }

                // 才能開花
                if (this.pIdol.blossoming_level >= 3) {
                    bonusDa += 50;
                    bonusVi += 30;
                }
                if (this.pIdol.blossoming_level >= 4) {
                    initHp += 3;
                }
                break;
            case rarities.RARITY_SR:
                initHp = 30;
                initVo = 60;
                initDa = 50;
                initVi = 60;
                bonusVo = 80;
                bonusDa = 200;
                bonusVi = 190;

                // 特訓
                if (this.pIdol.training_level >= 1) {
                    initVo += 10;
                    initDa += 10;
                    initVi += 10;
                }
                if (this.pIdol.training_level >= 4) {
                    initVo += 15;
                    initDa += 15;
                    initVi += 15;
                }
                if (this.pIdol.training_level >= 5) {
                    initHp += 3;
                }

                // 才能開花
                if (this.pIdol.blossoming_level >= 3) {
                    bonusDa += 30;
                    bonusVi += 20;
                }
                if (this.pIdol.blossoming_level >= 4) {
                    initHp += 3;
                }
                break;
            case rarities.RARITY_R:
                initHp = 30;
                initVo = 55;
                initDa = 45;
                initVi = 55;
                bonusVo = 70;
                bonusDa = 200;
                bonusVi = 180;

                // 特訓
                if (this.pIdol.training_level >= 1) {
                    initVo += 10;
                    initDa += 10;
                    initVi += 10;
                }
                if (this.pIdol.training_level >= 4) {
                    initVo += 15;
                    initDa += 15;
                    initVi += 15;
                }
                if (this.pIdol.training_level >= 5) {
                    initHp += 3;
                }

                // 才能開花
                if (this.pIdol.blossoming_level >= 3) {
                    bonusDa += 10;
                    bonusVi += 10;
                }
                if (this.pIdol.blossoming_level >= 4) {
                    initHp += 3;
                }
                break;
            default:
                break;
        }

        // アイドル共通値
        if (this.idol.dear_level >= 10) {
            initDa += 5;
            bonusDa += 30;
            bonusVi += 30;
        }
        if (this.idol.dear_level >= 20) {
            initVo += 10;
            initDa += 30;
        }

        this.pIdol.init_hp = initHp;
        this.pIdol.init_vocal = initVo;
        this.pIdol.init_dance = initDa;
        this.pIdol.init_visual = initVi;
        this.pIdol.bonus_vocal = (bonusVo / 10).toFixed(1);
        this.pIdol.bonus_dance = (bonusDa / 10).toFixed(1);
        this.pIdol.bonus_visual = (bonusVi / 10).toFixed(1);

        // SPレッスン発生率
        this.calcSpLessonRate(types.DANCE);
    }

    private calcParameterHiro() {
        let initHp: number, initVo: number, initDa: number, initVi: number, bonusVo: number, bonusDa: number, bonusVi: number;

        // Pアイドル固有値
        switch (this.pIdol.rarity) {
            case rarities.RARITY_SSR:
            case rarities.RARITY_SSR_EVENT:
                initHp = 22;
                initVo = 55;
                initDa = 55;
                initVi = 60;
                bonusVo = 220;
                bonusDa = 180;
                bonusVi = 100;

                // 特訓
                if (this.pIdol.training_level >= 1) {
                    initHp += 3;
                }
                if (this.pIdol.training_level >= 4) {
                    initVo += 20;
                    initDa += 20;
                    initVi += 20;
                }
                if (this.pIdol.training_level >= 5) {
                    initHp += 3;
                }

                // 才能開花
                if (this.pIdol.blossoming_level >= 3) {
                    bonusVo += 50;
                    bonusDa += 50;
                }
                if (this.pIdol.blossoming_level >= 4) {
                    initHp += 3;
                }
                break;
            case rarities.RARITY_SR:
                initHp = 22;
                initVo = 50;
                initDa = 50;
                initVi = 55;
                bonusVo = 220;
                bonusDa = 170;
                bonusVi = 90;

                // 特訓
                if (this.pIdol.training_level >= 1) {
                    initHp += 3;
                }
                if (this.pIdol.training_level >= 4) {
                    initVo += 20;
                    initDa += 20;
                    initVi += 20;
                }
                if (this.pIdol.training_level >= 5) {
                    initHp += 3;
                }

                // 才能開花
                if (this.pIdol.blossoming_level >= 3) {
                    bonusVo += 30;
                    bonusDa += 30;
                }
                if (this.pIdol.blossoming_level >= 4) {
                    initHp += 3;
                }
                break;
            case rarities.RARITY_R:
                initHp = 22;
                initVo = 45;
                initDa = 45;
                initVi = 50;
                bonusVo = 210;
                bonusDa = 150;
                bonusVi = 80;

                // 特訓
                if (this.pIdol.training_level >= 1) {
                    initHp += 3;
                }
                if (this.pIdol.training_level >= 4) {
                    initVo += 20;
                    initDa += 20;
                    initVi += 20;
                }
                if (this.pIdol.training_level >= 5) {
                    initHp += 3;
                }

                // 才能開花
                if (this.pIdol.blossoming_level >= 3) {
                    // 初恋
                    if (this.pIdol.id === 2019) {
                        bonusVo += 10;
                        bonusDa += 10;
                    } else {
                        bonusVo += 20;
                        bonusDa += 20;
                    }
                }
                if (this.pIdol.blossoming_level >= 4) {
                    initHp += 3;
                }
                break;
            default:
                break;
        }

        // アイドル共通値
        if (this.idol.dear_level >= 10) {
            initHp += 2;
            initVo += 40;
            initDa += 40;
        }
        if (this.idol.dear_level >= 20) {
            initHp += 1;
            initVo += 10;
            initDa += 5;
            bonusVo += 10;
            bonusDa += 15;
        }

        this.pIdol.init_hp = initHp;
        this.pIdol.init_vocal = initVo;
        this.pIdol.init_dance = initDa;
        this.pIdol.init_visual = initVi;
        this.pIdol.bonus_vocal = (bonusVo / 10).toFixed(1);
        this.pIdol.bonus_dance = (bonusDa / 10).toFixed(1);
        this.pIdol.bonus_visual = (bonusVi / 10).toFixed(1);

        // SPレッスン発生率
        this.calcSpLessonRate(types.VOCAL);
    }

    private calcParameterSena() {
        let initHp: number, initVo: number, initDa: number, initVi: number, bonusVo: number, bonusDa: number, bonusVi: number;

        // Pアイドル固有値
        switch (this.pIdol.rarity) {
            case rarities.RARITY_SSR:
            case rarities.RARITY_SSR_EVENT:
                initHp = 31;
                initVo = 130;
                initDa = 100;
                initVi = 105;
                bonusVo = 110;
                bonusDa = 60;
                bonusVi = 170;

                // 特訓
                if (this.pIdol.training_level >= 1) {
                    initVo += 10;
                    initDa += 10;
                    initVi += 10;
                }
                if (this.pIdol.training_level >= 4) {
                    initVo += 15;
                    initDa += 15;
                    initVi += 15;
                }
                if (this.pIdol.training_level >= 5) {
                    initHp += 3;
                }

                // 才能開花
                if (this.pIdol.blossoming_level >= 3) {
                    bonusVo += 20;
                    bonusVi += 40;
                }
                if (this.pIdol.blossoming_level >= 4) {
                    initHp += 3;
                }
                break;
            case rarities.RARITY_SR:
                initHp = 31;
                initVo = 120;
                initDa = 90;
                initVi = 95;
                bonusVo = 100;
                bonusDa = 50;
                bonusVi = 160;

                // 特訓
                if (this.pIdol.training_level >= 1) {
                    initVo += 10;
                    initDa += 10;
                    initVi += 10;
                }
                if (this.pIdol.training_level >= 4) {
                    initVo += 15;
                    initDa += 15;
                    initVi += 15;
                }
                if (this.pIdol.training_level >= 5) {
                    initHp += 3;
                }

                // 才能開花
                if (this.pIdol.blossoming_level >= 3) {
                    bonusVo += 20;
                    bonusVi += 40;
                }
                if (this.pIdol.blossoming_level >= 4) {
                    initHp += 3;
                }
                break;
            case rarities.RARITY_R:
                initHp = 31;
                initVo = 110;
                initDa = 80;
                initVi = 85;
                bonusVo = 90;
                bonusDa = 40;
                bonusVi = 150;

                // 特訓
                if (this.pIdol.training_level >= 1) {
                    initVo += 10;
                    initDa += 10;
                    initVi += 10;
                }
                if (this.pIdol.training_level >= 4) {
                    initVo += 15;
                    initDa += 15;
                    initVi += 15;
                }
                if (this.pIdol.training_level >= 5) {
                    initHp += 3;
                }

                // 才能開花
                if (this.pIdol.blossoming_level >= 3) {
                    bonusVo += 20;
                    bonusVi += 40;
                }
                if (this.pIdol.blossoming_level >= 4) {
                    initHp += 3;
                }
                break;
            default:
                break;
        }

        // アイドル共通値
        if (this.idol.dear_level >= 10) {
            initVo += 20;
            initVi += 10;
            bonusVo += 30;
            bonusVi += 10;
        }
        if (this.idol.dear_level >= 20) {
            bonusVo += 10;
            bonusDa += 20;
            bonusVi += 25;
        }

        this.pIdol.init_hp = initHp;
        this.pIdol.init_vocal = initVo;
        this.pIdol.init_dance = initDa;
        this.pIdol.init_visual = initVi;
        this.pIdol.bonus_vocal = (bonusVo / 10).toFixed(1);
        this.pIdol.bonus_dance = (bonusDa / 10).toFixed(1);
        this.pIdol.bonus_visual = (bonusVi / 10).toFixed(1);

        // SPレッスン発生率
        this.calcSpLessonRate(types.VISUAL);
    }

    private calcParameterMisuzu() {
        let initHp: number, initVo: number, initDa: number, initVi: number, bonusVo: number, bonusDa: number, bonusVi: number;

        // Pアイドル固有値
        switch (this.pIdol.rarity) {
            case rarities.RARITY_SSR:
            case rarities.RARITY_SSR_EVENT:
                initHp = 27;
                initVo = 65;
                initDa = 70;
                initVi = 80;
                bonusVo = 220;
                bonusDa = 100;
                bonusVi = 160;

                // 特訓
                if (this.pIdol.training_level >= 1) {
                    initHp += 3;
                }
                if (this.pIdol.training_level >= 4) {
                    initVo += 20;
                    initDa += 20;
                    initVi += 20;
                }
                if (this.pIdol.training_level >= 5) {
                    initHp += 3;
                }

                // 才能開花
                if (this.pIdol.blossoming_level >= 3) {
                    bonusVo += 40;
                    bonusVi += 20;
                }
                if (this.pIdol.blossoming_level >= 4) {
                    initHp += 3;
                }
                break;
            case rarities.RARITY_SR:
                initHp = 27;
                initVo = 60;
                initDa = 65;
                initVi = 75;
                bonusVo = 210;
                bonusDa = 90;
                bonusVi = 150;

                // 特訓
                if (this.pIdol.training_level >= 1) {
                    initHp += 3;
                }
                if (this.pIdol.training_level >= 4) {
                    initVo += 20;
                    initDa += 20;
                    initVi += 20;
                }
                if (this.pIdol.training_level >= 5) {
                    initHp += 3;
                }

                // 才能開花
                if (this.pIdol.blossoming_level >= 3) {
                    bonusVo += 40;
                    bonusVi += 20;
                }
                if (this.pIdol.blossoming_level >= 4) {
                    initHp += 3;
                }
                break;
            case rarities.RARITY_R:
                initHp = 27;
                initVo = 55;
                initDa = 60;
                initVi = 70;
                bonusVo = 200;
                bonusDa = 80;
                bonusVi = 140;

                // 特訓
                if (this.pIdol.training_level >= 1) {
                    initHp += 3;
                }
                if (this.pIdol.training_level >= 4) {
                    initVo += 20;
                    initDa += 20;
                    initVi += 20;
                }
                if (this.pIdol.training_level >= 5) {
                    initHp += 3;
                }

                // 才能開花
                if (this.pIdol.blossoming_level >= 3) {
                    bonusVo += 40;
                    bonusVi += 20;
                }
                if (this.pIdol.blossoming_level >= 4) {
                    initHp += 3;
                }
                break;
            default:
                break;
        }

        // アイドル共通値
        if (this.idol.dear_level >= 10) {
            initDa += 25;
            initVi += 25;
            bonusVo += 40;
        }
        if (this.idol.dear_level >= 20) {
        }

        this.pIdol.init_hp = initHp;
        this.pIdol.init_vocal = initVo;
        this.pIdol.init_dance = initDa;
        this.pIdol.init_visual = initVi;
        this.pIdol.bonus_vocal = (bonusVo / 10).toFixed(1);
        this.pIdol.bonus_dance = (bonusDa / 10).toFixed(1);
        this.pIdol.bonus_visual = (bonusVi / 10).toFixed(1);

        // SPレッスン発生率
        this.calcSpLessonRate(types.VOCAL);
    }

    private calcParameterUme() {
        let initHp: number, initVo: number, initDa: number, initVi: number, bonusVo: number, bonusDa: number, bonusVi: number;

        // Pアイドル固有値
        switch (this.pIdol.rarity) {
            case rarities.RARITY_SSR:
            case rarities.RARITY_SSR_EVENT:
                initHp = 30;
                initVo = 50;
                initDa = 60;
                initVi = 60;
                bonusVo = 170;
                bonusDa = 200;
                bonusVi = 120;

                // 特訓
                if (this.pIdol.training_level >= 1) {
                    initVo += 10;
                    initDa += 10;
                    initVi += 10;
                }
                if (this.pIdol.training_level >= 4) {
                    initVo += 15;
                    initDa += 15;
                    initVi += 15;
                }
                if (this.pIdol.training_level >= 5) {
                    initHp += 3;
                }

                // 才能開花
                if (this.pIdol.blossoming_level >= 3) {
                    bonusVo += 30;
                    bonusDa += 50;
                }
                if (this.pIdol.blossoming_level >= 4) {
                    initHp += 3;
                }
                break;
            case rarities.RARITY_SR:
                initHp = 30;
                initVo = 45;
                initDa = 55;
                initVi = 55;
                bonusVo = 160;
                bonusDa = 200;
                bonusVi = 110;

                // 特訓
                if (this.pIdol.training_level >= 1) {
                    initVo += 10;
                    initDa += 10;
                    initVi += 10;
                }
                if (this.pIdol.training_level >= 4) {
                    initVo += 15;
                    initDa += 15;
                    initVi += 15;
                }
                if (this.pIdol.training_level >= 5) {
                    initHp += 3;
                }

                // 才能開花
                if (this.pIdol.blossoming_level >= 3) {
                    bonusVo += 20;
                    bonusDa += 30;
                }
                if (this.pIdol.blossoming_level >= 4) {
                    initHp += 3;
                }
                break;
            case rarities.RARITY_R:
                initHp = 30;
                initVo = 40;
                initDa = 50;
                initVi = 50;
                bonusVo = 160;
                bonusDa = 190;
                bonusVi = 100;

                // 特訓
                if (this.pIdol.training_level >= 1) {
                    initVo += 10;
                    initDa += 10;
                    initVi += 10;
                }
                if (this.pIdol.training_level >= 4) {
                    initVo += 15;
                    initDa += 15;
                    initVi += 15;
                }
                if (this.pIdol.training_level >= 5) {
                    initHp += 3;
                }

                // 才能開花
                if (this.pIdol.blossoming_level >= 3) {
                    bonusVo += 10;
                    bonusDa += 20;
                }
                if (this.pIdol.blossoming_level >= 4) {
                    initHp += 3;
                }
                break;
            default:
                break;
        }

        // アイドル共通値
        if (this.idol.dear_level >= 10) {
            bonusVo += 30;
            bonusDa += 30;
            bonusVi += 30;
        }
        if (this.idol.dear_level >= 20) {
            initVo += 15;
            initDa += 10;
            initVi += 15;
        }

        this.pIdol.init_hp = initHp;
        this.pIdol.init_vocal = initVo;
        this.pIdol.init_dance = initDa;
        this.pIdol.init_visual = initVi;
        this.pIdol.bonus_vocal = (bonusVo / 10).toFixed(1);
        this.pIdol.bonus_dance = (bonusDa / 10).toFixed(1);
        this.pIdol.bonus_visual = (bonusVi / 10).toFixed(1);

        // SPレッスン発生率
        this.calcSpLessonRate(types.DANCE);
    }

    private calcParameterRinami() {
        let initHp: number, initVo: number, initDa: number, initVi: number, bonusVo: number, bonusDa: number, bonusVi: number;

        // Pアイドル固有値
        switch (this.pIdol.rarity) {
            case rarities.RARITY_SSR:
            case rarities.RARITY_SSR_EVENT:
                initHp = 30;
                initVo = 60;
                initDa = 70;
                initVi = 55;
                bonusVo = 110;
                bonusDa = 190;
                bonusVi = 210;

                // 特訓
                if (this.pIdol.training_level >= 1) {
                    // L.U.V
                    if (this.pIdol.id === 28) {
                        initHp += 3;
                    } else {
                        initVo += 10;
                        initDa += 10;
                        initVi += 10;
                    }
                }
                if (this.pIdol.training_level >= 4) {
                    // L.U.V
                    if (this.pIdol.id === 28) {
                        initVo += 20;
                        initDa += 20;
                        initVi += 20;
                    } else {
                        initVo += 15;
                        initDa += 15;
                        initVi += 15;
                    }
                }
                if (this.pIdol.training_level >= 5) {
                    initHp += 3;
                }

                // 才能開花
                if (this.pIdol.blossoming_level >= 3) {
                    bonusDa += 30;
                    bonusVi += 50;
                }
                if (this.pIdol.blossoming_level >= 4) {
                    initHp += 3;
                }
                break;
            case rarities.RARITY_SR:
                initHp = 30;
                initVo = 55;
                initDa = 65;
                initVi = 50;
                bonusVo = 100;
                bonusDa = 180;
                bonusVi = 210;

                // 特訓
                if (this.pIdol.training_level >= 1) {
                    initVo += 10;
                    initDa += 10;
                    initVi += 10;
                }
                if (this.pIdol.training_level >= 4) {
                    initVo += 15;
                    initDa += 15;
                    initVi += 15;
                }
                if (this.pIdol.training_level >= 5) {
                    initHp += 3;
                }

                // 才能開花
                if (this.pIdol.blossoming_level >= 3) {
                    bonusDa += 20;
                    bonusVi += 30;
                }
                if (this.pIdol.blossoming_level >= 4) {
                    initHp += 3;
                }
                break;
            case rarities.RARITY_R:
                initHp = 30;
                initVo = 50;
                initDa = 60;
                initVi = 45;
                bonusVo = 90;
                bonusDa = 170;
                bonusVi = 210;

                // 特訓
                if (this.pIdol.training_level >= 1) {
                    initVo += 10;
                    initDa += 10;
                    initVi += 10;
                }
                if (this.pIdol.training_level >= 4) {
                    initVo += 15;
                    initDa += 15;
                    initVi += 15;
                }
                if (this.pIdol.training_level >= 5) {
                    initHp += 3;
                }

                // 才能開花
                if (this.pIdol.blossoming_level >= 3) {
                    // 初心
                    if (this.pIdol.id === 2016) {
                        bonusDa += 30;
                        bonusVi += 50;
                    } else {
                        bonusDa += 10;
                        bonusVi += 10;
                    }
                }
                if (this.pIdol.blossoming_level >= 4) {
                    initHp += 3;
                }
                break;
            default:
                break;
        }

        // アイドル共通値
        if (this.idol.dear_level >= 10) {
            initVi += 5;
            bonusDa += 25;
            bonusVi += 25;
        }
        if (this.idol.dear_level >= 20) {
            initDa += 15;
            initVi += 25;
        }

        this.pIdol.init_hp = initHp;
        this.pIdol.init_vocal = initVo;
        this.pIdol.init_dance = initDa;
        this.pIdol.init_visual = initVi;
        this.pIdol.bonus_vocal = (bonusVo / 10).toFixed(1);
        this.pIdol.bonus_dance = (bonusDa / 10).toFixed(1);
        this.pIdol.bonus_visual = (bonusVi / 10).toFixed(1);

        // SPレッスン発生率
        this.calcSpLessonRate(types.VISUAL);
    }
}
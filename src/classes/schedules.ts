export default class Schedules {

    dataVersion: string = '1.0';
    autoIncrement: number = 1;
    crateCount: number = 1;
    scheduleList: any = [];

    constructor() {
    }

    crateNewSchedule(produceType: string) {
        let newSchedule = {
            id: this.autoIncrement,
            save_id: null,
            undo_disabled: true,
            redo_disabled: true,
            name: `新規スケジュール${this.crateCount}`,
            data: this.setData(produceType),
            data_version: this.dataVersion,
        };
        this.autoIncrement++;
        this.crateCount++;

        return newSchedule;
    }

    private setData(produceType: string) {
        let planning: any;
        switch (produceType) {
            case 'hajime_master':
                planning = this.setPlanningHajime();
                break;
            case 'nia':
                planning = {};
                break;
            default:
                planning = {};
                break;
        }

        return {
            produce_type: produceType,
            organization: {
                produce_idol: {
                    id: null,
                    training_level: null,
                    blossoming_level: null,
                    dear_level: null,
                },
                support_card: {
                    1: {
                        id: null,
                        level: null,
                    },
                    2: {
                        id: null,
                        level: null,
                    },
                    3: {
                        id: null,
                        level: null,
                    },
                    4: {
                        id: null,
                        level: null,
                    },
                    5: {
                        id: null,
                        level: null,
                    },
                    6: {
                        id: null,
                        level: null,
                    },
                },
                produce_memory: {
                    1: {
                        1: {
                            ability_type: 'vocal',
                            ability_value: 20,
                        },
                        2: {
                            ability_type: 'dance',
                            ability_value: 20,
                        },
                        3: {
                            ability_type: 'visual',
                            ability_value: 20,
                        },
                    },
                    2: {
                        1: {
                            ability_type: 'vocal',
                            ability_value: 20,
                        },
                        2: {
                            ability_type: 'dance',
                            ability_value: 20,
                        },
                        3: {
                            ability_type: 'visual',
                            ability_value: 20,
                        },
                    },
                    3: {
                        1: {
                            ability_type: 'vocal',
                            ability_value: 20,
                        },
                        2: {
                            ability_type: 'dance',
                            ability_value: 20,
                        },
                        3: {
                            ability_type: 'visual',
                            ability_value: 20,
                        },
                    },
                    4: {
                        1: {
                            ability_type: 'vocal',
                            ability_value: 20,
                        },
                        2: {
                            ability_type: 'dance',
                            ability_value: 20,
                        },
                        3: {
                            ability_type: 'visual',
                            ability_value: 20,
                        },
                    },
                },
            },
            planning: planning
        }
    }

    private setPlanningHajime() {
        return {
            schedule: {
                1: {
                    schedule_detail: 'class_50',
                    type: 'vocal',
                },
                2: {
                    schedule_detail: 'class_50',
                    type: 'vocal',
                },
                3: {
                    schedule_detail: 'gift',
                    type: null,
                },
                4: {
                    schedule_detail: 'consultation',
                    type: null,
                },
                5: {
                    schedule_detail: 'sp_lesson',
                    type: 'vocal',
                },
                6: {
                    schedule_detail: 'consultation',
                    type: null,
                },
                7: {
                    schedule_detail: 'push_lesson',
                    type: 'vocal',
                },
                8: {
                    schedule_detail: 'exam_1',
                    type: null,
                },
                9: {
                    schedule_detail: 'consultation',
                    type: null,
                },
                10: {
                    schedule_detail: 'class_80',
                    type: 'vocal',
                },
                11: {
                    schedule_detail: 'sp_lesson',
                    type: 'vocal',
                },
                12: {
                    schedule_detail: 'class_110',
                    type: 'vocal',
                },
                13: {
                    schedule_detail: 'gift',
                    type: null,
                },
                14: {
                    schedule_detail: 'sp_lesson',
                    type: 'vocal',
                },
                15: {
                    schedule_detail: 'sp_lesson',
                    type: 'vocal',
                },
                16: {
                    schedule_detail: 'consultation',
                    type: null,
                },
                17: {
                    schedule_detail: 'push_lesson',
                    type: 'vocal',
                },
                18: {
                    schedule_detail: 'exam_2',
                    type: null,
                },
            },
            challenge_p_item: {
                1: 0,
                2: 0,
                3: 0,
            },
            produce_p_item: {
                1: 2,
            },
            support_card_p_item: {
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
            },
            support_card_event: {
                1: false,
                2: false,
                3: false,
                4: false,
                5: false,
                6: false,
            },
            support_card_ability: {
            },
        }
    }
}
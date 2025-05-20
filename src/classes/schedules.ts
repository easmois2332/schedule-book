export default class Schedules {

    scheduleList: any = [];
    autoIncrement: number = 1;
    crateCount: number = 1;

    constructor() {
    }

    crateNewSchedule(produceType: string) {
        let newSchedule = {
            id: this.autoIncrement,
            save_id: null,
            undo_disabled: true,
            redo_disabled: true,
            name: `新規スケジュール${this.crateCount}`,
            data: this.setData(produceType)
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
                support_card: [
                    {
                        id: null,
                        level: null
                    },
                    {
                        id: null,
                        level: null
                    },
                    {
                        id: null,
                        level: null
                    },
                    {
                        id: null,
                        level: null
                    },
                    {
                        id: null,
                        level: null
                    },
                    {
                        id: null,
                        level: null
                    },
                ],
                produce_memory: [
                    [
                        {
                            ability_type: 'vocal',
                            ability_value: 20,
                        },
                        {
                            ability_type: 'dance',
                            ability_value: 20,
                        },
                        {
                            ability_type: 'visual',
                            ability_value: 20,
                        },
                    ],
                    [
                        {
                            ability_type: 'vocal',
                            ability_value: 20,
                        },
                        {
                            ability_type: 'dance',
                            ability_value: 20,
                        },
                        {
                            ability_type: 'visual',
                            ability_value: 20,
                        },
                    ],
                    [
                        {
                            ability_type: 'vocal',
                            ability_value: 20,
                        },
                        {
                            ability_type: 'dance',
                            ability_value: 20,
                        },
                        {
                            ability_type: 'visual',
                            ability_value: 20,
                        },
                    ],
                    [
                        {
                            ability_type: 'vocal',
                            ability_value: 20,
                        },
                        {
                            ability_type: 'dance',
                            ability_value: 20,
                        },
                        {
                            ability_type: 'visual',
                            ability_value: 20,
                        },
                    ],
                ]
            },
            planning: planning
        }
    }

    private setPlanningHajime() {
        return {
            schedule: {
                1: {
                    schedule_detail: 'class:50',
                    type: 'vocal',
                },
                2: {
                    schedule_detail: 'class:50',
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
                    schedule_detail: 'sp_lesson:90',
                    type: 'vocal',
                },
                6: {
                    schedule_detail: 'consultation',
                    type: null,
                },
                7: {
                    schedule_detail: 'push_lesson:90',
                    type: 'vocal',
                },
                7.5: {
                    schedule_detail: 'push_bonus:90',
                    type: null,
                },
                8: {
                    schedule_detail: 'exam_1:20',
                    type: null,
                },
                9: {
                    schedule_detail: 'consultation',
                    type: null,
                },
                10: {
                    schedule_detail: 'class:80',
                    type: 'vocal',
                },
                11: {
                    schedule_detail: 'sp_lesson:170',
                    type: 'vocal',
                },
                12: {
                    schedule_detail: 'class:110',
                    type: 'vocal',
                },
                13: {
                    schedule_detail: 'gift',
                    type: null,
                },
                14: {
                    schedule_detail: 'sp_lesson:200',
                    type: 'vocal',
                },
                15: {
                    schedule_detail: 'sp_lesson:220',
                    type: 'vocal',
                },
                16: {
                    schedule_detail: 'consultation',
                    type: null,
                },
                17: {
                    schedule_detail: 'push_lesson:165',
                    type: 'vocal',
                },
                17.5: {
                    schedule_detail: 'push_bonus:145',
                    type: null,
                },
                18: {
                    schedule_detail: 'exam_2:30',
                    type: null,
                },
            },
            challenge_p_item: {
                1: 0,
                2: 0,
                3: 0,
            },
            produce_p_item: {
                1: 0,
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
            }
        }
    }
}
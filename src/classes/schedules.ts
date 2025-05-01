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
            data: {
                produce_type: produceType,
                organization: {
                    produce_idol: [],
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
                        {
                            ability_type_1: 'vocal',
                            ability_value_1: 'init-parameter-up-10',
                            ability_type_2: 'dance',
                            ability_value_2: 'init-parameter-up-10',
                            ability_type_3: 'visual',
                            ability_value_3: 'init-parameter-up-10',
                        },
                        {
                            ability_type_1: 'vocal',
                            ability_value_1: 'init-parameter-up-10',
                            ability_type_2: 'dance',
                            ability_value_2: 'init-parameter-up-10',
                            ability_type_3: 'visual',
                            ability_value_3: 'init-parameter-up-10',
                        },
                        {
                            ability_type_1: 'vocal',
                            ability_value_1: 'init-parameter-up-10',
                            ability_type_2: 'dance',
                            ability_value_2: 'init-parameter-up-10',
                            ability_type_3: 'visual',
                            ability_value_3: 'init-parameter-up-10',
                        },
                        {
                            ability_type_1: 'vocal',
                            ability_value_1: 'init-parameter-up-10',
                            ability_type_2: 'dance',
                            ability_value_2: 'init-parameter-up-10',
                            ability_type_3: 'visual',
                            ability_value_3: 'init-parameter-up-10',
                        },
                    ]
                },
                planning: {}
            }
        };
        this.autoIncrement++;
        this.crateCount++;

        return newSchedule;
    }
}
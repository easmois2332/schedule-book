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
                planning: {}
            }
        };
        this.autoIncrement++;
        this.crateCount++;

        return newSchedule;
    }
}
import ScheduleModel from "@/models/schedules";

export default class Schedules {

    dataVersion: string = '1.0';
    autoIncrement: number = 0;
    crateCount: number = 1;
    saveList: any = [];

    constructor() {
        this.getSaveScheduleData();
    }

    getAllSaveList() {
        return this.saveList;
    }

    getSaveListFromFilter(idolId: number, produceType: string) {
        let data = this.saveList.filter((save: any, index: number) =>
            save.data.produce_type === produceType &&
            save.data.organization.produce_idol.idol_id === idolId
        );
        return data;
    }

    crateNewSchedule(produceType: string) {
        let newSchedule = {
            save_id: null,
            name: `新規スケジュール${this.crateCount}`,
            data: this.setData(produceType),
            data_version: this.dataVersion,
            update_data: null,
        };
        this.crateCount++;

        return newSchedule;
    }

    createId() {
        this.autoIncrement++;
        return this.autoIncrement;
    }

    getDataVersion() {
        return this.dataVersion;
    }

    async getSaveScheduleData() {
        let model = new ScheduleModel();
        if (await model.connect()) {
            let data = await model.findAll();
            for (let index in data) {
                this.saveList.push(data[index]);
            }
        }
    }

    async insetScheduleData(saveId: number, name: string, data: any, dataVersion: string, updateData: string) {
        let model = new ScheduleModel();
        if (await model.connect()) {
            if (await model.insert(saveId, name, JSON.parse(JSON.stringify(data)), dataVersion, updateData)) {
                this.saveList.push({
                    save_id: saveId,
                    name: name,
                    data: JSON.parse(JSON.stringify(data)),
                    data_version: dataVersion,
                    update_data: updateData,
                });
            }
        }
    }

    async updateScheduleData(saveId: number, name: string, data: any, dataVersion: string, updateData: string) {
        let model = new ScheduleModel();
        if (await model.connect()) {
            if (await model.update(saveId, name, JSON.parse(JSON.stringify(data)), dataVersion, updateData)) {
                let index = this.saveList.findIndex((save: any) => save.save_id === saveId);
                if (index !== -1) {
                    this.saveList[index] = {
                        save_id: saveId,
                        name: name,
                        data: JSON.parse(JSON.stringify(data)),
                        data_version: dataVersion,
                        update_data: updateData,
                    };
                }
            }
        }
    }

    async deleteScheduleData(saveId: number) {
        let model = new ScheduleModel();
        if (await model.connect()) {
            if (await model.delete(saveId)) {
                let index = this.saveList.findIndex((save: any) => save.save_id === saveId);
                if (index !== -1) {
                    this.saveList.splice(index, 1);
                }
            }
        }
    }

    private setData(produceType: string) {
        let planning: any;
        switch (produceType) {
            case 'hajime_master':
                planning = this.setPlanningHajimeMaster();
                break;
            case 'nia_master':
                planning = this.setPlanningNiaMaster();
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
                    idol_id: null,
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

    private setPlanningHajimeMaster() {
        return {
            schedule: {
                1: {
                    schedule_detail: 'class_50',
                    type: 'vocal',
                    hp: 0,
                    point: 0,
                },
                2: {
                    schedule_detail: 'class_50',
                    type: 'vocal',
                    hp: 0,
                    point: 0,
                },
                3: {
                    schedule_detail: 'gift',
                    type: null,
                    hp: 0,
                    point: 0,
                },
                4: {
                    schedule_detail: 'consultation',
                    type: null,
                    hp: 0,
                    point: 0,
                },
                5: {
                    schedule_detail: 'sp_lesson',
                    type: 'vocal',
                    hp: 0,
                    point: 0,
                },
                6: {
                    schedule_detail: 'consultation',
                    type: null,
                    hp: 0,
                    point: 0,
                },
                7: {
                    schedule_detail: 'push_lesson',
                    type: 'vocal',
                    hp: 0,
                    point: 0,
                },
                8: {
                    schedule_detail: 'exam_1',
                    type: null,
                    hp: 0,
                    point: 0,
                },
                9: {
                    schedule_detail: 'consultation',
                    type: null,
                    hp: 0,
                    point: 0,
                },
                10: {
                    schedule_detail: 'class_80',
                    type: 'vocal',
                    hp: 0,
                    point: 0,
                },
                11: {
                    schedule_detail: 'sp_lesson',
                    type: 'vocal',
                    hp: 0,
                    point: 0,
                },
                12: {
                    schedule_detail: 'class_110',
                    type: 'vocal',
                    hp: 0,
                    point: 0,
                },
                13: {
                    schedule_detail: 'gift',
                    type: null,
                    hp: 0,
                    point: 0,
                },
                14: {
                    schedule_detail: 'sp_lesson',
                    type: 'vocal',
                    hp: 0,
                    point: 0,
                },
                15: {
                    schedule_detail: 'sp_lesson',
                    type: 'vocal',
                    hp: 0,
                    point: 0,
                },
                16: {
                    schedule_detail: 'consultation',
                    type: null,
                    hp: 0,
                    point: 0,
                },
                17: {
                    schedule_detail: 'push_lesson',
                    type: 'vocal',
                    hp: 0,
                    point: 0,
                },
                18: {
                    schedule_detail: 'exam_2',
                    type: null,
                    hp: 0,
                    point: 0,
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
            support_card_ability: {},
        }
    }

    private setPlanningNiaMaster() {
        return {
            schedule: {
                1: {
                    schedule_detail: 'sp_lesson',
                    type: 'vocal',
                    hp: 0,
                    point: 0,
                },
                2: {
                    schedule_detail: 'class_point',
                    type: 'vocal',
                    hp: 0,
                    point: 0,
                },
                3: {
                    schedule_detail: 'outing',
                    type: null,
                    hp: 0,
                    point: 0,
                },
                4: {
                    schedule_detail: 'sp_lesson',
                    type: 'vocal',
                    hp: 0,
                    point: 0,
                },
                5: {
                    schedule_detail: 'class_point',
                    type: 'vocal',
                    hp: 0,
                    point: 0,
                },
                6: {
                    schedule_detail: 'outing',
                    type: null,
                    hp: 0,
                    point: 0,
                },
                7: {
                    schedule_detail: 'class_point',
                    type: 'vocal',
                    hp: 0,
                    point: 0,
                },
                8: {
                    schedule_detail: 'coaching',
                    type: null,
                    hp: 0,
                    point: 0,
                },
                9: {
                    schedule_detail: 'exam_1',
                    type: null,
                    hp: 0,
                    point: 0,
                },
                10: {
                    schedule_detail: 'outing',
                    type: null,
                    hp: 0,
                    point: 0,
                },
                11: {
                    schedule_detail: 'sp_lesson',
                    type: 'vocal',
                    hp: 0,
                    point: 0,
                },
                12: {
                    schedule_detail: 'class_drink',
                    type: 'vocal',
                    hp: 0,
                    point: 0,
                },
                13: {
                    schedule_detail: 'outing',
                    type: null,
                    hp: 0,
                    point: 0,
                },
                14: {
                    schedule_detail: 'sp_lesson',
                    type: 'vocal',
                    hp: 0,
                    point: 0,
                },
                15: {
                    schedule_detail: 'class_drink',
                    type: 'vocal',
                    hp: 0,
                    point: 0,
                },
                16: {
                    schedule_detail: 'coaching',
                    type: null,
                    hp: 0,
                    point: 0,
                },
                17: {
                    schedule_detail: 'exam_2',
                    type: null,
                    hp: 0,
                    point: 0,
                },
                18: {
                    schedule_detail: 'outing',
                    type: null,
                    hp: 0,
                    point: 0,
                },
                19: {
                    schedule_detail: 'sp_lesson',
                    type: 'vocal',
                    hp: 0,
                    point: 0,
                },
                20: {
                    schedule_detail: 'class_drink',
                    type: 'vocal',
                    hp: 0,
                    point: 0,
                },
                21: {
                    schedule_detail: 'gift',
                    type: null,
                    hp: 0,
                    point: 0,
                },
                22: {
                    schedule_detail: 'sp_lesson',
                    type: 'vocal',
                    hp: 0,
                    point: 0,
                },
                23: {
                    schedule_detail: 'class_drink',
                    type: 'vocal',
                    hp: 0,
                    point: 0,
                },
                24: {
                    schedule_detail: 'sp_lesson',
                    type: 'vocal',
                    hp: 0,
                    point: 0,
                },
                25: {
                    schedule_detail: 'consultation',
                    type: null,
                    hp: 0,
                    point: 0,
                },
                26: {
                    schedule_detail: 'exam_3',
                    type: null,
                    hp: 0,
                    point: 0,
                },
            },
            audition: {
                1: {
                    type_1: 0,
                    type_2: 0,
                    type_3: 0,
                    fan: 0,
                },
                2: {
                    type_1: 0,
                    type_2: 0,
                    type_3: 0,
                    fan: 0,
                },
                3: {
                    type_1: 0,
                    type_2: 0,
                    type_3: 0,
                    fan: 0,
                },
            },
            challenge_p_item: {
                1: 0,
                2: 0,
                3: 0,
            },
            produce_p_item: {
                1: 0,
                2: 18,
                3: 2,
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
            support_card_ability: {},
        }
    }
}
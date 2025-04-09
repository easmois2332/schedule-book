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
            }
        };
        this.autoIncrement++;
        this.crateCount++;

        return newSchedule;
    }
}
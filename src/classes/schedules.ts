export default class Schedules {

    scheduleList: any = [];
    autoIncrement: number = 1;
    crateCount: number = 1;

    constructor() {
    }

    crateNewSchedule() {
        let newSchedule = {
            id: this.autoIncrement,
            save_id: null,
            name: `新規スケジュール${this.crateCount}`,
            data: [],
        };
        this.autoIncrement++;
        this.crateCount++;

        return newSchedule;
    }
}
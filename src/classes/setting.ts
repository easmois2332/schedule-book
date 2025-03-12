export default class Setting {

    colorSetting: string = 'color-setting';
    color: string = 'color-default';

    constructor() {
        this.getLocalStorage();
    }

    getColor() {
        return this.color;
    }

    setColor(value: string) {
        localStorage.setItem(this.colorSetting, value);
        this.color = value;
    }

    getLocalStorage() {
        let value = localStorage.getItem(this.colorSetting);
        if (value !== null) {
            this.color = value;
        }
    }
}
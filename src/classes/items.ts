import PItemJson from "@/assets/json/p_items.json";

export default class Items {

    masterData: any

    constructor() {
        this.masterData = PItemJson;
    }

    getItemFromId(id: number) {
        return this.masterData.find((item: any) => (item.id === id) && (item.enable === 1));
    }
}
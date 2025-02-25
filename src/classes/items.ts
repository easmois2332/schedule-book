import PItemJson from "@/assets/json/p_items.json";

export default class Items {

    itemMaster: any

    constructor() {
        this.itemMaster = PItemJson;
    }

    getItemFromId(id: number) {
        return this.itemMaster.find((item: any) => (item.id === id) && (item.enable === 1));
    }
}
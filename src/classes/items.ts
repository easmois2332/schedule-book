import PItemJson from "@/assets/json/p_items.json";

export default class Items {

    masterData: any

    constructor() {
        this.masterData = PItemJson;
    }

    getAllItem() {
        return this.masterData.filter((item: any) => item.enable === 1);
    }

    getHajimeMasterBasicItem(plan: any) {
        return this.masterData.filter((item: any) => (item.id <= 8) && plan.includes(item.plan) && (item.enable === 1));
    }

    getChallengeItem(categoryType: any, plan: any) {
        return this.masterData.filter((item: any) => categoryType.includes(item.category_type) && plan.includes(item.plan) && (item.enable === 1));
    }

    getItemFromId(id: number) {
        return this.masterData.find((item: any) => (item.id === id) && (item.enable === 1));
    }
}
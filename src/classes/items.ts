import PItemJson from "@/assets/json/p_items.json";

export default class Items {

    masterData: any

    constructor() {
        this.masterData = PItemJson;
    }

    getAllItem() {
        return this.masterData.filter((item: any) => item.enable === 1);
    }

    getHajimeMasterBasicLessonItem(plan: any) {
        return this.masterData.filter((item: any) => (item.id >= 3 && item.id <= 8) && plan.includes(item.plan) && (item.enable === 1));
    }

    getNiaMasterBasicLessonItem(plan: any) {
        return this.masterData.filter((item: any) => (item.id >= 20 && item.id <= 25) && plan.includes(item.plan) && (item.enable === 1));
    }

    getHajimeMasterChallengeItem(categoryType: any, plan: any) {
        return this.masterData.filter((item: any) => (item.id >= 30001 && item.id <= 30999) && categoryType.includes(item.category_type) && plan.includes(item.plan) && (item.enable === 1));
    }

    getNiaMasterChallengeItem(categoryType: any, plan: any) {
        return this.masterData.filter((item: any) => (item.id >= 31001 && item.id <= 31999) && categoryType.includes(item.category_type) && plan.includes(item.plan) && (item.enable === 1));
    }

    getItemFromId(id: number) {
        return this.masterData.find((item: any) => (item.id === id) && (item.enable === 1));
    }
}
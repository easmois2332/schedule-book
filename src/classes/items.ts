import PItemJson from "@/assets/json/p_items.json";

export default class Items {

    masterData: any

    constructor() {
        this.masterData = PItemJson;
    }

    getAllItem() {
        return this.masterData.filter((item: any) => item.enable === 1);
    }

    getChallengeItem1(plan: any) {
        return this.masterData.filter((item: any) => (item.category_type === 'challenge_1') && plan.includes(item.plan) && (item.enable === 1));
    }

    getChallengeItem2(plan: any) {
        return this.masterData.filter((item: any) => (item.category_type === 'challenge_2') && plan.includes(item.plan) && (item.enable === 1));
    }

    getChallengeItem3(plan: any) {
        return this.masterData.filter((item: any) => (item.category_type === 'challenge_3') && plan.includes(item.plan) && (item.enable === 1));
    }

    getItemFromId(id: number) {
        return this.masterData.find((item: any) => (item.id === id) && (item.enable === 1));
    }
}
import SkillCardJson from "@/assets/json/skill_cards.json";

export default class SkillCards {

    masterData: any

    constructor() {
        this.masterData = SkillCardJson;
    }

    getItemFromId(id: number) {
        return this.masterData.find((card: any) => (card.id === id) && (card.enable === 1));
    }
}
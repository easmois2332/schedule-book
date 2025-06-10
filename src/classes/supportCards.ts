import SupportCardJson from "@/assets/json/support_cards.json";
import SupportCardDetail from "@/classes/supportCardDetail";
import SupportCardModel from "@/models/supportCards";

export default class SupportCards {

    cardList: any = [];
    saveList: any = [];
    typeSort = {vocal: 1, dance: 2, visual: 3, assist: 4};

    constructor() {
        // サポートカードリストを作成
        this.getCardList(SupportCardJson);

        // 保存したサポートカードリストを作成
        this.getSaveCardList();
    }

    getAllCard(sortType: string = 'sort_id') {
        let list = this.cardList.filter((card: any) => card.enable === 1);
        if (sortType === 'sort_id') {
            list.sort((a: any, b: any) => {
                return b.sort_id - a.sort_id
            });
        }
        if (sortType === 'type') {
            list.sort((a: any, b: any) => {
                if (a.type === b.type) {
                    return b.sort_id - a.sort_id;
                }
                return this.typeSort[a.type] - this.typeSort[b.type]
            });
        }

        return list
    }

    getAllSaveCard(sortType: string = 'sort_id') {
        let list = this.saveList.filter((card: any) => card.enable === 1);

        if (sortType === 'sort_id') {
            list.sort((a: any, b: any) => {
                return b.sort_id - a.sort_id
            });
        }
        if (sortType === 'type') {
            list.sort((a: any, b: any) => {
                if (a.type === b.type) {
                    return b.sort_id - a.sort_id;
                }
                return this.typeSort[a.type] - this.typeSort[b.type]
            });
        }

        return list
    }

    getCardFromFilter(type: any, plan: any, event: any, ability: any, sortType: string = 'sort_id') {
        let list = this.cardList.filter((card: any) =>
            type.includes(card.type) &&
            plan.includes(card.plan) &&
            (event.includes(card.event_1) || event.includes(card.event_2) || event.includes(card.event_3)) &&
            (ability.includes(card.ability_1) || ability.includes(card.ability_2) || ability.includes(card.ability_3) || ability.includes(card.ability_4) || ability.includes(card.ability_5) || ability.includes(card.ability_6)) &&
            (card.enable === 1)
        );

        if (sortType === 'sort_id') {
            list.sort((a: any, b: any) => {
                return b.sort_id - a.sort_id
            });
        }
        if (sortType === 'type') {
            list.sort((a: any, b: any) => {
                if (a.type === b.type) {
                    return b.sort_id - a.sort_id;
                }
                return this.typeSort[a.type] - this.typeSort[b.type]
            });
        }

        return list
    }

    getSaveCardFromFilter(type: any, plan: any, event: any, ability: any, sortType: string = 'sort_id') {
        let list = this.saveList.filter((card: any) =>
            type.includes(card.type) &&
            plan.includes(card.plan) &&
            (event.includes(card.event_1) || event.includes(card.event_2) || event.includes(card.event_3)) &&
            (ability.includes(card.ability_1) || ability.includes(card.ability_2) || ability.includes(card.ability_3) || ability.includes(card.ability_4) || ability.includes(card.ability_5) || ability.includes(card.ability_6)) &&
            (card.enable === 1)
        );

        if (sortType === 'sort_id') {
            list.sort((a: any, b: any) => {
                return b.sort_id - a.sort_id
            });
        }
        if (sortType === 'type') {
            list.sort((a: any, b: any) => {
                if (a.type === b.type) {
                    return b.sort_id - a.sort_id;
                }
                return this.typeSort[a.type] - this.typeSort[b.type]
            });
        }

        return list
    }

    getCardFromId(id: number) {
        return this.cardList.find((card: any) => (card.id === id) && (card.enable === 1));
    }

    /**
     * カードIDとレベルからカード詳細を取得
     * @param id
     * @param level
     */
    getCardDetail(id: number, level: number = 1) {
        if (id === null) {
            return null;
        }
        let card = this.deepCopy(this.getCardFromId(id));
        card.level = level;
        let cardDetail = new SupportCardDetail(card);
        return cardDetail.getDetails();
    }

    async insertSaveCard(id: number, level: number) {
        let model = new SupportCardModel();
        if (await model.connect()) {
            let saveId = await model.insert(id, level);
            if (saveId) {
                let card = this.getCardDetail(id, level);
                card.save_id = saveId;
                this.saveList.push(card);
            }
        }
    }

    async updateSaveCard(saveId: number, id: number, level: number) {
        let model = new SupportCardModel();
        if (await model.connect()) {
            if (await model.update(saveId, id, level)) {
                let card = this.getCardDetail(id, level);
                card.save_id = saveId;
                let index = this.saveList.findIndex((card: any) => (card.save_id === saveId) && (card.enable === 1));
                if (index !== -1) {
                    this.saveList[index] = card;
                }
            }
        }
    }

    async deleteSaveCard(saveId: number) {
        let model = new SupportCardModel();
        if (await model.connect()) {
            if (await model.delete(saveId)) {
                let index = this.saveList.findIndex((card: any) => (card.save_id === saveId) && (card.enable === 1));
                if (index !== -1) {
                    this.saveList[index].enable = 0;
                }
            }
        }
    }

    private deepCopy(array: any) {
        return JSON.parse(JSON.stringify(array));
    }

    private getCardList(cards: any) {
        let cardList = [];
        for (let i in cards) {
            if (cards[i].enable === 1) {
                let cardDetail = new SupportCardDetail(cards[i]);
                cardList.push(cardDetail.getDetails());
            }
        }
        this.cardList = cardList;
    }

    private async getSaveCardList() {
        let saveCardList = []
        let model = new SupportCardModel();
        if (await model.connect()) {
            let cards = await model.findAll();
            saveCardList = this.getSaveCardDetailList(cards);
            this.saveList = saveCardList;
        }
    }

    private getSaveCardDetailList(cards: any) {
        let cardList = [];
        for (let i in cards) {
            let cardDetail = this.getCardDetail(cards[i].card_id, cards[i].level);
            cardDetail.save_id = i;
            cardList.push(cardDetail);
        }
        return cardList;
    }
}
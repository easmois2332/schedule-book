import CardDetail from "@/classes/cardDetail";
import CardModel from "@/models/cards";

export default class Cards {

    cardMaster: any = [];
    cardList: any = [];
    saveList: any = [];

    constructor(cardMaster: any) {
        this.cardMaster = cardMaster;

        // サポートカードリストを作成
        this.getCardList(this.deepCopy(cardMaster));

        // 保存したサポートカードリストを作成
        this.getSaveCardList();
    }

    getAllCard() {
        return this.cardList.filter((card: any) => card.enable === 1);
    }

    getAllSaveCard() {
        return this.saveList.filter((card: any) => card.enable === 1);
    }

    getCardFromFilter(type: string, plan: string, event: string, ability: string) {
        let cards = this.getAllCard();
        let result = [];
        for (let i in cards) {
            if (type.find((type: any) => (type === cards[i].type)) &&
                plan.find((plan: any) => (plan === cards[i].plan)) &&
                event.find((event: any) => (event === cards[i].event_1) || (event === cards[i].event_2) || (event === cards[i].event_3)) &&
                ability.find((ability: any) => (ability === cards[i].ability_1) || (ability === cards[i].ability_2) || (ability === cards[i].ability_3) || (ability === cards[i].ability_4) || (ability === cards[i].ability_5) || (ability === cards[i].ability_6))
            ) {
                result.push(cards[i])
            }
        }
        return result;
    }

    getSaveCardFromFilter(type: string, plan: string, event: string, ability: string) {
        let cards = this.getAllSaveCard();
        let result = [];
        for (let i in cards) {
            if (type.find((type: any) => (type === cards[i].type)) &&
                plan.find((plan: any) => (plan === cards[i].plan)) &&
                event.find((event: any) => (event === cards[i].event_1) || (event === cards[i].event_2) || (event === cards[i].event_3)) &&
                ability.find((ability: any) => (ability === cards[i].ability_1) || (ability === cards[i].ability_2) || (ability === cards[i].ability_3) || (ability === cards[i].ability_4) || (ability === cards[i].ability_5) || (ability === cards[i].ability_6))
            ) {
                result.push(cards[i])
            }
        }
        return result;
    }

    getCardFromId(id: number) {
        return this.cardList.find((card: any) => (card.id === id) && (card.enable === 1));
    }

    /**
     * カードIDとレベルからカード詳細を取得
     * @param id
     * @param level
     */
    getCardDetail(id: number, level: number) {
        let card = this.deepCopy(this.getCardFromId(id));
        card.level = level;
        let cardDetail = new CardDetail(card);
        return cardDetail.getCardDetails();
    }

    async insertSaveCard(id: number, level: number) {
        let model = new CardModel();
        if (await model.connect()) {
            let saveId = await model.insert(id, level);
            if (saveId) {
                let card = this.getCardDetail(id, level);
                card.save_id = saveId;
                this.saveList.push(card);
                console.log(this.saveList);
            }
        }
    }

    async updateSaveCard(saveId: number, id: number, level: number) {
        let model = new CardModel();
        if (await model.connect()) {
            if (await model.update(saveId, id, level)) {
                let card = this.getCardDetail(id, level);
                card.save_id = saveId;
                let index = this.saveList.findIndex((card: any) => (card.save_id == saveId) && (card.enable === 1));
                if (index !== -1) {
                    this.saveList[index] = card;
                    console.log(this.saveList);
                }
            }
        }
    }

    async deleteSaveCard(saveId: number) {
        let model = new CardModel();
        if (await model.connect()) {
            if (await model.delete(saveId)) {
                let index = this.saveList.findIndex((card: any) => (card.save_id == saveId) && (card.enable === 1));
                if (index !== -1) {
                    this.saveList[index].enable = 0;
                    console.log(this.saveList);
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
            let cardDetail = new CardDetail(cards[i]);
            cardList.push(cardDetail.getCardDetails());
        }
        this.cardList = cardList;
    }

    private async getSaveCardList() {
        let saveCardList = []
        let model = new CardModel();
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
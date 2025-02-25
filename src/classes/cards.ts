import CardDetail from "@/classes/cardDetail";
import CardModel from "@/models/cards";

export default class Cards {

    cardMaster: any
    cardList: any
    saveList: any

    constructor(cardMaster: any) {
        this.cardMaster = cardMaster;

        // サポートカードリストを作成
        this.cardList = this.getCardDetailList(this.deepCopy(cardMaster));

        // 保存したサポートカードリストを取得
        this.getSaveCardList();
        let saveCardList = [{id: 1, card_id: 1, level: 40}, {id: 2, card_id: 4, level: 50}];

        // 保存したサポートカードリストを作成
        this.saveList = this.getSaveCardDetailList(saveCardList);
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

    private getCardDetailList(cards: any) {
        let cardDetails = [];
        for (let i in cards) {
            let cardDetail = new CardDetail(cards[i]);
            cardDetails.push(cardDetail.getCardDetails());
        }
        return cardDetails;
    }

    private getSaveCardDetailList(cards: any) {
        let cardDetails = [];
        for (let i in cards) {
            let cardDetail = this.getCardDetail(cards[i].card_id, cards[i].level);
            cardDetail.save_id = cards[i].id;
            cardDetails.push(cardDetail);
        }
        return cardDetails;
    }

    private deepCopy(array: any) {
        return JSON.parse(JSON.stringify(array));
    }

    private async getSaveCardList() {
        let model = new CardModel();
        let msg1 = await model.connect();
        console.log(msg1);
        let msg2 = await model.findAll();
        console.log(msg2);
    }
}
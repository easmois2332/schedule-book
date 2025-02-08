import CardDetail from "@/classes/cardDetail";
import {types} from "@/consts/cardConst";

export default class Cards {

    cardMaster: any
    cardList: any
    saveList: any

    constructor(cardMaster: any, saveList: any) {
        this.cardMaster = cardMaster;

        // サポートカードリストを作成
        this.cardList = this.getCardDetailList(this.deepCopy(cardMaster));

        // TODO: 保存したサポートカードリストを作成
        this.saveList = saveList;
    }

    getAllCard() {
        return this.cardList.filter((card: any) => card.enable === 1);
    }

    getVocalCard() {
        return this.cardList.filter((card: any) => (card.type === types.VOCAL) && (card.enable === 1));
    }

    getDanceCard() {
        return this.cardList.filter((card: any) => (card.type === types.DANCE) && (card.enable === 1));
    }

    getVisualCard() {
        return this.cardList.filter((card: any) => (card.type === types.VISUAL) && (card.enable === 1));
    }

    getAssistCard() {
        return this.cardList.filter((card: any) => (card.type === types.ASSIST) && (card.enable === 1));
    }

    getCardFromId(id: any) {
        return this.cardList.find((card: any) => (card.id === id) && (card.enable === 1));
    }

    getCardFromFilter(type: any, plan: any, event: any, ability: any) {
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

    /**
     * カードIDとレベルからカード詳細を取得
     * @param id
     * @param level
     */
    getCardDetail(id: any, level: any) {
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

    private deepCopy(array: any) {
        return JSON.parse(JSON.stringify(array));
    }
}
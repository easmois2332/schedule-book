import CardDetail from "@/classes/cardDetail";
import {types} from "@/consts/cardConst";

export default class Cards {

    cardMaster: any
    saveList: any

    constructor(cardMaster: any, saveList: any) {
        this.cardMaster = cardMaster;
        this.saveList = saveList;
    }

    getAllCard() {
        return this.cardMaster.find((card: any) => card.enable === 1);
    }

    getVocalCard() {
        return this.cardMaster.find((card: any) => (card.type === types.VOCAL) && (card.enable === 1));
    }

    getDanceCard() {
        return this.cardMaster.find((card: any) => (card.type === types.DANCE) && (card.enable === 1));
    }

    getVisualCard() {
        return this.cardMaster.find((card: any) => (card.type === types.VISUAL) && (card.enable === 1));
    }

    getCard(id: any) {
        return this.cardMaster.find((card: any) => (card.id === id) && (card.enable === 1));
    }

    getAllCardDetail() {
        let cardMaster = this.deepCopy(this.getAllCard());
        return this.getCardDetailList(cardMaster);
    }

    getVocalCardDetail() {
        let cardMaster = this.deepCopy(this.getVocalCard());
        return this.getCardDetailList(cardMaster);
    }

    getDanceCardDetail() {
        let cardMaster = this.deepCopy(this.getDanceCard());
        return this.getCardDetailList(cardMaster);
    }

    getVisualCardDetail() {
        let cardMaster = this.deepCopy(this.getVisualCard());
        return this.getCardDetailList(cardMaster);
    }

    /**
     * カードIDとレベルからカード詳細を取得
     * @param id
     * @param level
     */
    getCardDetail(id: any, level: any) {
        let card = this.deepCopy(this.getCard(id));
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
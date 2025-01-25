import CardDetail from "@/classes/cardDetail";

export default class Cards {

    cardList: any

    constructor(cardList: any) {
        this.cardList = cardList;
    }

    getCard(id: any) {
        return this.cardList.find((card: bigint) => (card.id === id) && (card.enable === 1));
    }

    getAllCard() {
        return this.cardList;
    }

    /**
     * カードIDとレベルからカード詳細を取得
     * @param id
     * @param level
     */
    getCardDetail(id: any, level: any) {
        let findCard = this.cardList.find((card: bigint) => (card.id === id) && (card.enable === 1));
        if (!findCard) {
            return [];
        }

        let card = JSON.parse(JSON.stringify(findCard));
        card.level = level;
        let cardDetail = new CardDetail(card);
        return cardDetail.getCardDetails();
    }

    /**
     * レベルMAXの全カードのカード詳細を取得
     */
    getAllCardDetail() {
        let cardList = JSON.parse(JSON.stringify(this.cardList));
        let cardDetails = [];
        for (let i in cardList) {
            let cardDetail = new CardDetail(cardList[i]);
            cardDetails.push(cardDetail.getCardDetails());
        }
        return cardDetails;
    }
}
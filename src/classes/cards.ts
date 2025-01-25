import CardDetail from "@/classes/cardDetail";

export default class Cards {

    cardList: any

    constructor(cardList: any) {
        this.cardList = cardList;
    }

    getCardList() {
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
     * レベルMAXの全カードのCard詳細を取得
     */
    getAllCardDetail() {
        let cards = [];
        for (let i in this.cardList) {
            let cardDetail = new CardDetail(this.cardList[i]);
            cards.push(cardDetail.getCardDetails());
        }
        return cards;
    }
}
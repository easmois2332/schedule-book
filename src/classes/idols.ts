import IdolJson from "@/assets/json/idols.json"
import PIdolJson from "@/assets/json/p_idols.json"
import {DEAR_MAX_LEVEL, TRAINING_MAX_LEVEL, BLOSSOMING_MAX_LEVEL} from "@/consts/idolConst";
import IdolDetail from "@/classes/idolDetail";

export default class Idols {

    idolList: any = [];
    pIdolList: any = [];

    constructor() {
        // アイドルのリストを作成
        this.getIdolList(IdolJson);

        // プロデュースアイドルのリストを作成
        this.getPIdolList(PIdolJson);
    }

    getAllIdol() {
        return this.idolList.filter((idol: any) => idol.enable === 1);
    }

    getIdolFromId(id: number) {
        return this.idolList.find((idol: any) => (idol.id === id) && (idol.enable === 1));
    }

    getAllPIdol() {
        return this.pIdolList.filter((pIdol: any) => pIdol.enable === 1);
    }

    getPIdolFromId(id: number) {
        return this.pIdolList.find((pIdol: any) => (pIdol.id === id) && (pIdol.enable === 1));
    }

    getPIdolFromIdolId(idolId: number) {
        return this.pIdolList.filter((pIdol: any) => (pIdol.idol_id === idolId) && (pIdol.enable === 1));
    }

    /**
     * プロデュースアイドルIDと各レベルからプロデュースアイドル詳細を取得
     * @param id
     * @param trainingLevel
     * @param blossomingLevel
     * @param dearLevel
     */
    getPIdolDetail(id: number, trainingLevel: number = TRAINING_MAX_LEVEL, blossomingLevel: number = BLOSSOMING_MAX_LEVEL, dearLevel: number = DEAR_MAX_LEVEL) {
        let pIdol = this.deepCopy(this.getPIdolFromId(id))
        let idol = this.deepCopy(this.getIdolFromId(pIdol.idol_id));
        pIdol.training_level = trainingLevel;
        pIdol.blossoming_level = blossomingLevel;
        idol.dear_level = dearLevel;
        let idolDetail = new IdolDetail(idol, pIdol);
        return idolDetail.getDetails();
    }

    private deepCopy(array: any) {
        return JSON.parse(JSON.stringify(array));
    }

    private getIdolList(idols: any) {
        let idolList = [];
        let dearLevelList = [];

        for (let i in idols) {
            if (idols[i].enable === 1) {
                let idol = idols[i];
                if (i in dearLevelList) {
                    idol.dear_level = dearLevelList[i].dear_level;
                } else {
                    idol.dear_level = DEAR_MAX_LEVEL;
                }
                idolList.push(idol);
            }
        }
        this.idolList = idolList;
    }

    private getPIdolList(pIdols: any) {
        let pIdolList = [];
        let saveLevelList = [];

        for (let i in pIdols) {
            if (pIdols[i].enable === 1) {
                let idol = this.getIdolFromId(pIdols[i].idol_id);
                let pIdol = pIdols[i];
                if (i in saveLevelList) {
                    pIdol.training_level = saveLevelList[i].training_level;
                    pIdol.blossoming_level = saveLevelList[i].blossoming_level;
                } else {
                    pIdol.training_level = TRAINING_MAX_LEVEL;
                    pIdol.blossoming_level = BLOSSOMING_MAX_LEVEL;
                }
                let idolDetail = new IdolDetail(idol, pIdol);
                pIdolList.push(idolDetail.getDetails());
            }
        }
        this.pIdolList = pIdolList;
    }
}
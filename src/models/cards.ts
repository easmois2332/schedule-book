export default class Cards {

    dbName: string = 'schedule-book';
    storeName: string = 'cards';
    db: IDBDatabase = null;

    constructor() {
    }

    async connect() {
        const promise: Promise<string> = new Promise<string>((resolve: any, reject: any) => {
            let indexedDB = window.indexedDB;
            let request = indexedDB.open(this.dbName);

            // 初回・DBバージョンが変わった場合
            request.onupgradeneeded = (event: any) => {
                this.db = (<IDBRequest>event.target).result;
                this.db.createObjectStore(this.storeName, {autoIncrement: true});
            }
            // 既にDBが存在している場合
            request.onsuccess = (event: any) => {
                this.db = (<IDBRequest>event.target).result;
                resolve('indexedDB open success.');
            }
            // エラーが発生した場合
            request.onerror = (event: any) => {
                console.log(event.message);
                reject('indexedDB open error.');
            }
        });
        return promise;
    }

    async findAll() {
        const promise: Promise<string> = new Promise<string>((resolve: any, reject: any) => {
            let trans = this.db.transaction(this.storeName, 'readonly');
            let store = trans.objectStore(this.storeName);
            let request = store.openCursor();

            request.onsuccess = (event: any) => {
                resolve(<IDBCursorWithValue>(<IDBRequest>event.target).result);
            }
            request.onerror = (event: any) => {
                console.log(event.message);
                reject('indexedDB cursor error.');
            }

        });
        return promise;
    }

    async update(id: number, card_id: number, level: number) {
        const promise: Promise<string> = new Promise<string>((resolve: any, reject: any) => {
            let trans = this.db.transaction(this.storeName, 'readwrite');
            let store = trans.objectStore(this.storeName);
            let request = store.put({id: id, card_id: card_id, level: level});

            request.onsuccess = (event: any) => {
                resolve('indexedDB put success.');
            }
            request.onerror = (event: any) => {
                console.log(event.message);
                reject('indexedDB put error.');
            }

        });
        return promise;
    }

    async delete(id: number) {
        const promise: Promise<string> = new Promise<string>((resolve: any, reject: any) => {
            let trans = this.db.transaction(this.storeName, 'readwrite');
            let store = trans.objectStore(this.storeName);
            let request = store.delete(id);

            request.onsuccess = (event: any) => {
                resolve('indexedDB delete success.');
            }
            request.onerror = (event: any) => {
                console.log(event.message);
                reject('indexedDB delete error.');
            }

        });
        return promise;
    }
}

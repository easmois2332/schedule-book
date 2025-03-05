export default class SupportCards {

    dbName: string = 'schedule-book';
    storeName: string = 'cards';
    db: IDBDatabase = null;

    constructor() {
    }

    async connect() {
        const promise: Promise<boolean> = new Promise<string>((resolve: any, reject: any) => {
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
                resolve(true);
            }
            // エラーが発生した場合
            request.onerror = (event: any) => {
                console.log(event.message);
                reject(false);
            }
        });
        return promise;
    }

    async findAll() {
        const promise: Promise<any> = new Promise<string>((resolve: any, reject: any) => {
            let trans = this.db.transaction(this.storeName, 'readonly');
            let store = trans.objectStore(this.storeName);
            let request = store.openCursor();
            let list = [];

            request.onsuccess = (event: any) => {
                let cursor = <IDBCursorWithValue>(<IDBRequest>event.target).result;
                if (cursor) {
                    list[cursor.key] = cursor.value;
                    cursor.continue();
                } else {
                    resolve(list);
                }
            }
            request.onerror = (event: any) => {
                console.log(event.message);
                reject([]);
            }

        });
        return promise;
    }

    async insert(card_id: number, level: number) {
        const promise: Promise<boolean> = new Promise<string>((resolve: any, reject: any) => {
            let trans = this.db.transaction(this.storeName, 'readwrite');
            let store = trans.objectStore(this.storeName);
            let request = store.add({card_id: card_id, level: level});

            request.onsuccess = (event: any) => {
                resolve(<IDBCursorWithValue>(<IDBRequest>event.target).result);
            }
            request.onerror = (event: any) => {
                console.log(event.message);
                reject(false);
            }

        });
        return promise;
    }

    async update(key: number, card_id: number, level: number) {
        const promise: Promise<boolean> = new Promise<string>((resolve: any, reject: any) => {
            let trans = this.db.transaction(this.storeName, 'readwrite');
            let store = trans.objectStore(this.storeName);
            let request = store.put({card_id: card_id, level: level}, Number(key));

            request.onsuccess = (event: any) => {
                resolve(true);
            }
            request.onerror = (event: any) => {
                console.log(event.message);
                reject(false);
            }

        });
        return promise;
    }

    async delete(key: number) {
        const promise: Promise<boolean> = new Promise<string>((resolve: any, reject: any) => {
            let trans = this.db.transaction(this.storeName, 'readwrite');
            let store = trans.objectStore(this.storeName);
            let request = store.delete(Number(key));

            request.onsuccess = (event: any) => {
                resolve(true);
            }
            request.onerror = (event: any) => {
                console.log(event.message);
                reject(false);
            }

        });
        return promise;
    }
}

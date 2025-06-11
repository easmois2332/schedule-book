export default abstract class IndexedDB {

    dbName: string = 'schedule-book';
    dbVersion: number = 1;
    db: IDBDatabase = null;

    constructor() {
    }

    async connect() {
        const promise: Promise<boolean> = new Promise<string>((resolve: any, reject: any) => {
            let indexedDB = window.indexedDB;
            let request = indexedDB.open(this.dbName, this.dbVersion);

            // 初回・DBバージョンが変わった場合
            request.onupgradeneeded = (event: any) => {
                this.db = (<IDBRequest>event.target).result;
                if (!this.db.objectStoreNames.contains('produce-idols')) {
                    this.db.createObjectStore('produce-idols', {keyPath: 'id'});
                }
                if (!this.db.objectStoreNames.contains('support-cards')) {
                    this.db.createObjectStore('support-cards', {autoIncrement: true});
                }
                if (!this.db.objectStoreNames.contains('schedules')) {
                    this.db.createObjectStore('schedules', {keyPath: 'save_id'});
                }
            }
            // 既にDBが存在している場合
            request.onsuccess = (event: any) => {
                this.db = (<IDBRequest>event.target).result;
                resolve(true);
            }
            // エラーが発生した場合
            request.onerror = (event: any) => {
                console.error(event.message);
                reject(false);
            }
        });
        return promise;
    }
}
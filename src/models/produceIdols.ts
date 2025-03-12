import IndexedDB from "@/models/indexedDB";

export default class ProduceIdols extends IndexedDB {

    storeName: string = 'produce-idols';

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

    async update(key: number, trainingLevel: number, blossomingLevel: number) {
        const promise: Promise<boolean> = new Promise<string>((resolve: any, reject: any) => {
            let trans = this.db.transaction(this.storeName, 'readwrite');
            let store = trans.objectStore(this.storeName);
            let request = store.put({id: key, training_level: trainingLevel, blossoming_level: blossomingLevel});

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
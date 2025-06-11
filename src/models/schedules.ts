import IndexedDB from "@/models/indexedDB";

export default class Schedules extends IndexedDB {

    storeName: string = 'schedules';

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
                console.error(event.message);
                reject([]);
            }

        });
        return promise;
    }

    async insert(saveId: number, name: string, data: any, dataVersion: string, updateData: string) {
        const promise: Promise<boolean> = new Promise<string>((resolve: any, reject: any) => {
            let trans = this.db.transaction(this.storeName, 'readwrite');
            let store = trans.objectStore(this.storeName);
            let request = store.add(
                {
                    save_id: saveId,
                    name: name,
                    data: data,
                    data_version: dataVersion,
                    update_data: updateData,
                },
            );

            request.onsuccess = (event: any) => {
                resolve(<IDBCursorWithValue>(<IDBRequest>event.target).result);
            }
            request.onerror = (event: any) => {
                console.error(event.message);
                reject(false);
            }

        });
        return promise;
    }

    async update(saveId: number, name: string, data: any, dataVersion: string, updateData: string) {
        const promise: Promise<boolean> = new Promise<string>((resolve: any, reject: any) => {
            let trans = this.db.transaction(this.storeName, 'readwrite');
            let store = trans.objectStore(this.storeName);
            let request = store.put(
                {
                    save_id: saveId,
                    name: name,
                    data: data,
                    data_version: dataVersion,
                    update_data: updateData,
                },
            );

            request.onsuccess = (event: any) => {
                resolve(true);
            }
            request.onerror = (event: any) => {
                console.error(event.message);
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
                console.error(event.message);
                reject(false);
            }

        });
        return promise;
    }
}
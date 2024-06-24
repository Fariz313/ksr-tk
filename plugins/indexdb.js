// plugins/indexdb.js
import SimpleCrypto from "simple-crypto-js"
export default defineNuxtPlugin(() => {
  const dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open("ksr-tk-db", 1);

    request.onerror = function (event) {
      console.log("Database error: " + event.target.errorCode);
      reject(event.target.errorCode);
    };

    request.onsuccess = function (event) {
      const db = event.target.result;
      console.log("Database opened successfully");
      resolve(db);
    };

    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("users")) {
        const objectStore = db.createObjectStore("users", { keyPath: "id" });
        objectStore.createIndex("name", "name", { unique: false });
        objectStore.createIndex("email", "email", { unique: true });
        objectStore.createIndex("password", "password", { unique: false });
        console.log("Object store and indexes created");
      }
      if (!db.objectStoreNames.contains("products")) {
        const objectStore = db.createObjectStore("products", { keyPath: "id" });
        objectStore.createIndex("name", "name", { unique: false });
        objectStore.createIndex("code", "code", { unique: true });
        objectStore.createIndex("barcode", "barcode", { unique: false });
        objectStore.createIndex("category", "category", { unique: false });
        objectStore.createIndex("price", "price", { unique: false });
        console.log("Object store and indexes created");
      }
      if (!db.objectStoreNames.contains("transactions")) {
        const objectStore = db.createObjectStore("transactions", { keyPath: "id" });
        objectStore.createIndex("nota", "nota", { unique: false });
        objectStore.createIndex("customer", "customer", { unique: false });
        objectStore.createIndex("total", "total", { unique: false });
        objectStore.createIndex("reciver", "reciver", { unique: false });
        objectStore.createIndex("items", "items", { unique: false });
        objectStore.createIndex("created_at", "created_at", { unique: false });
        console.log("Object store and indexes created");
      }
    };
  });
  const simpleCrypto = new SimpleCrypto("a very secret key xxxx")
  return {
    provide: {
      indexdb: dbPromise,
      simpleCrypto:simpleCrypto
    },
  };
});

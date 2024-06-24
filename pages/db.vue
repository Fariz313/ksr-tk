<template>
    <div>
      <button @click="addCustomer">Add Customer</button>
      <button @click="getCustomer(1)">Get Customer with ID 1</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      async addCustomer() {
        const db = await this.$indexdb;
        const transaction = db.transaction(["users"], "readwrite");
        const objectStore = transaction.objectStore("users");
  
        const customer = { id: 1, name: "joan", email: "joans" };
        const request = objectStore.add(customer);
  
        request.onsuccess = function(event) {
          console.log("Customer added: ", customer);
        };
  
        request.onerror = function(event) {
          console.log("Add customer error: " + event.target.errorCode);
        };
      },
      async getCustomer(id) {
        const db = await this.$indexdb;
        const transaction = db.transaction(["users"]);
        const objectStore = transaction.objectStore("users");
        const request = objectStore.getAll();
  
        request.onsuccess = function(event) {
          if (request.result) {
            console.log("Customer: ", request.result);
          } else {
            console.log("No customer found with id: " + id);
          }
        };
  
        request.onerror = function(event) {
          console.log("Get customer error: " + event.target.errorCode);
        };
      },
    },
  };
  </script>
   
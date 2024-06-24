<template>
    <div>
        <div class="flex">
            <!-- Modal toggle -->
            <button @click="openFormAddProduct" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
        text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
        my-4" type="button">
                Tambah Produk
            </button>
            <button @click="exportAllData" class="block text-white bg-lime-500 hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg 
        text-sm px-5 py-2.5 text-center dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800
        my-4" type="button">
                Export All Data
            </button>
        </div>
        <form @submit.prevent="fetchData" class="w-full">
            <div class="flex">
                <label for="search-dropdown" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your
                    Email</label>
                <button id="dropdown-button" data-dropdown-toggle="dropdown"
                    class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                    type="button">All categories <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 1 4 4 4-4" />
                    </svg></button>
                <div id="dropdown"
                    class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                        <li>
                            <button type="button"
                                class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mockups</button>
                        </li>
                        <li>
                            <button type="button"
                                class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Templates</button>
                        </li>
                        <li>
                            <button type="button"
                                class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Design</button>
                        </li>
                        <li>
                            <button type="button"
                                class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Logos</button>
                        </li>
                    </ul>
                </div>
                <div class="relative w-full">
                    <input v-model="name" type="search" id="search-dropdown"
                        class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                        placeholder="Search Mockups, Logos, Design Templates..."  />
                    <button type="submit"
                        class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                        <span class="sr-only">Search</span>
                    </button>
                </div>
            </div>
        </form>
        <button data-modal-target="crud-modal" style="display: hidden;"></button>
        <!-- Main modal -->
        <div id="crud-modal" tabindex="-1" aria-hidden="true"
            class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="relative p-4 w-full max-w-lg max-h-full">
                <!-- Modal content -->
                <FormProduct v-if="renderComponent" :title="formTitle" :target="formTarget" :item="formTargetItem"
                    @submit-product="(d) => formProduk(d)" @close-modal="closeModal" />
            </div>
        </div>





        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Nama Produk
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Kode Produk
                        </th>
                        <!-- <th scope="col" class="px-6 py-3">
                            Barcode
                        </th> -->
                        <th scope="col" class="px-6 py-3">
                            Kategori
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Harga
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Stock
                        </th>
                        <th style="min-width: 160px !important;" scope="col" class="px-6 py-3">

                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item, index in products"
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ item.name }}
                        </th>
                        <td class="px-6 py-4">
                            {{ item.code }}
                        </td>
                        <!-- <td class="px-6 py-4">
                            {{ item.barcode }}
                        </td> -->
                        <td class="px-6 py-4">
                            {{ item.category }}
                        </td>
                        <td class="px-6 py-4">
                            {{ item.price }}
                        </td>
                        <td class="px-6 py-4">
                            {{ item.stock }}
                        </td>
                        <td class="px-6 py-4">
                            <button type="button" @click="openFormEditProduct(item)"
                                class="text-yellow-400 bg-transparent ms-4">
                                EDIT
                            </button>
                            <button type="button" @click="removeData(item.id)" class="text-red-400 bg-transparent ms-4">
                                DELETE
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>
<script>
import nuxtStorage from 'nuxt-storage';
import { v4 as uuidv4 } from 'uuid';
import { Modal } from 'flowbite';

export default {
    data() {
        return {
            category:null,
            name:null,
            products: [],
            formTarget: 'create',
            formTargetItem: {},
            formTitle: 'Buat Produk Baru',
            formTargetId: '',
            renderComponent: true,
        }
    },
    methods: {
        async rerender() {
            this.renderComponent = false;
            await this.$nextTick();
            this.renderComponent = true;
        },
        async fetchData() {
            const db = await this.$indexdb;
            const transaction = db.transaction(["products"]);
            const objectStore = transaction.objectStore("products");
            const request = objectStore.getAll();
            request.onsuccess = (event) => {
                let products = request.result
                // Filter by category if provided
                if (this.category) {
                    products = products.filter(product => product.category === category);
                }

                // Filter by name if provided
                if (this.name) {
                    const nameLower = this.name.toLowerCase();
                    products = products.filter(product => product.name.toLowerCase().includes(nameLower));
                }

                // Sort by name
                products.sort((a, b) => a.name.localeCompare(b.name));

                this.products = products;
            }
        },
        async openFormAddProduct() {
            console.log('add');
            const $targetEl = document.getElementById('crud-modal');
            const modal = new Modal($targetEl);
            this.formTarget = 'create'
            this.formTitle = 'Buat Produk Baru'
            await this.rerender();
            modal.show();
        },
        async openFormEditProduct(item) {
            console.log('edit');
            const $targetEl = document.getElementById('crud-modal');
            const modal = new Modal($targetEl);
            this.formTarget = 'update';
            this.formTitle = 'Edit Produk Baru';
            this.formTargetId = item.id
            this.formTargetItem = item
            await this.rerender();
            modal.show();
        },
        closeModal() {
            const $targetEl = document.getElementById('crud-modal');
            const modal = new Modal($targetEl);
            modal.hide();

        },
        async formProduk(form) {
            let products = { 'id': uuidv4(), ...form };
            const db = await this.$indexdb;
            const transaction = db.transaction(["products"], "readwrite");
            const objectStore = transaction.objectStore("products");
            const request = objectStore.add(products);
            request.onsuccess = (event2) => {
                console.log("Product added");
                this.fetchData();
            };
            request.onerror = function (event) {
                console.log("Add customer error: " + event.target.errorCode);
            };
        },

        removeData(id) {
            nuxtStorage.localStorage.setData('products', this.products.filter(item => item.id !== id), 9999, 'd');
            this.fetchData();
        },
        searchById(id) {
            return this.products.find(item => item.id === id);
        },
        exportAllData() {
            this.$excelExport("Produk", this.products)
        },
        
    },
    mounted() {
        this.fetchData();
    }
}
</script>

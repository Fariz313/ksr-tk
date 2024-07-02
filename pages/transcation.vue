<template>
    <div>
        <!-- Modal toggle -->
        <button @click="openFormAddTransaction" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
            text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
            my-4" type="button">
            Tambah Transaksi
        </button>
        <button data-modal-target="crud-modal" style="display: hidden;"></button>
        <!-- Main modal -->
        <div id="crud-modal" tabindex="-1" aria-hidden="true"
            class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="relative p-4 w-full max-w-xl max-h-full">
                <!-- Modal content -->
                <FormTransaction v-if="renderComponent" :title="formTitle" :target="formTarget" :item="formTargetItem"
                    :products="products" @submit-transaction="(d) => formTransaksi(d)" @close-modal="closeModal" />
            </div>
        </div>



        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="p-4">
                            <div class="flex items-center">
                                <input id="checkbox-all" type="checkbox"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="checkbox-all" class="sr-only">checkbox</label>
                            </div>
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Nomor Nota
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Nama Customer
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Nama Penerima
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Barang
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Total
                        </th>
                        <th scope="col" class="px-6 py-3">

                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item, index in transactions"
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td class="w-4 p-4">
                            <div class="flex items-center">
                                <input id="checkbox-table-1" type="checkbox"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="checkbox-table-1" class="sr-only">checkbox</label>
                            </div>
                        </td>
                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ item.nota }}
                        </td>
                        <td class="px-6 py-4">
                            {{ item.customer }}
                        </td>
                        <td class="px-6 py-4">
                            {{ item.reciver }}
                        </td>
                        <td class="px-6 py-4">
                            <ul>
                                <li v-for="itm,idx in item.items">
                                    {{ itm.item.name }} (Rp.{{$commafy(itm.price)}})
                                </li>
                            </ul>
                        </td>
                        <td class="px-6 py-4">
                            Rp.{{ $commafy(item.total) }}
                        </td>
                        <td class="px-6 py-4">
                            <button type="button" @click="exportKwitansi(item.id)" class="text-white py-2 px-3 bg-green-400 ms-4">
                                Export Kwitansi
                            </button>
                            <button type="button" @click="exportSJ(item.id)" class="text-white py-2 px-3 bg-green-400 ms-4">
                                Export Surat jalan
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
            transactions: [],
            products: [],
            formTarget: 'create',
            formTargetItem: {},
            formTitle: 'Buat Transaksi Baru',
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
        async fetchDataProduct() {
            const db = await this.$indexdb;
            const transaction = db.transaction(["products"]);
            const objectStore = transaction.objectStore("products");
            const request = objectStore.getAll();
            request.onsuccess = (event) => {
                let products = request.result
                this.products = products;
                console.log('p',this.products);
            }
        },
        async fetchData(){
            await this.fetchDataProduct()
            const db = await this.$indexdb;
            const transaction = db.transaction(["transactions"]);
            const objectStore = transaction.objectStore("transactions");
            const request = objectStore.getAll();
            request.onsuccess = (event) => {
                let transaction = request.result
                this.transactions = transaction;
            }
        },
        async openFormAddTransaction() {
            console.log('add');
            const $targetEl = document.getElementById('crud-modal');
            const modal = new Modal($targetEl);
            this.formTarget = 'create'
            this.formTitle = 'Buat Transaksi Baru'
            await this.rerender();
            modal.show();
        },
        async openFormEditTransaction(item) {
            console.log('edit');
            const $targetEl = document.getElementById('crud-modal');
            const modal = new Modal($targetEl);
            this.formTarget = 'update';
            this.formTitle = 'Edit Transaksi Baru';
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
        formTransaksi(form) {
            let transactions = nuxtStorage.localStorage.getData('transactions');
            if (!transactions) {
                transactions = []
            }
            if (this.formTarget == 'create') {
                transactions.push({ 'id': uuidv4(), ...form });
            } else {
                transactions = this.updateData(this.formTargetId, form)
            }
            nuxtStorage.localStorage.setData('transactions', transactions, 9999, 'd')
            this.transactions = transactions
        },

        removeData(id) {
            nuxtStorage.localStorage.setData('transactions', this.transactions.filter(item => item.id !== id), 9999, 'd');
            this.fetchData();
        },
        updateData(id, newData) {
            return this.transactions.map(item =>
                item.id === id ? { ...item, ...newData } : item
            );
        },
        searchById(id) {
            return this.transactions.find(item => item.id === id);
        }
    },
    mounted() {
        let loggin = nuxtStorage.localStorage.getData('loggin');
        if(!loggin){
            this.$router.push("/");
        }
        this.fetchData();
    }
}
</script>

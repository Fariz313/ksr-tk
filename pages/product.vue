<template>
    <div>




        <!-- Modal toggle -->
        <button @click="openFormAddProduct" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
            text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
            my-4" type="button">
            Tambah Produk
        </button>
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
                        <th scope="col" class="p-4">
                            <div class="flex items-center">
                                <input id="checkbox-all" type="checkbox"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="checkbox-all" class="sr-only">checkbox</label>
                            </div>
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Nama Produk
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Kode Produk
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Barcode
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Kategori
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Harga
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Stock
                        </th>
                        <th scope="col" class="px-6 py-3">

                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item, index in products"
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td class="w-4 p-4">
                            <div class="flex items-center">
                                <input id="checkbox-table-1" type="checkbox"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="checkbox-table-1" class="sr-only">checkbox</label>
                            </div>
                        </td>
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ item.name }}
                        </th>
                        <td class="px-6 py-4">
                            {{ item.code }}
                        </td>
                        <td class="px-6 py-4">
                            {{ item.barcode }}
                        </td>
                        <td class="px-6 py-4">
                            {{ item.category }}
                        </td>
                        <td class="px-6 py-4">
                            {{ item.price }}
                        </td>
                        <td class="px-6 py-4">
                            {{ item.category }}
                        </td>
                        <td class="px-6 py-4">
                            <button type="button" @click="openFormEditProduct(item)"
                                class="text-blue-400 bg-transparent ms-4">
                                STOCK
                            </button>
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
        fetchData() {
            let products = nuxtStorage.localStorage.getData('products');
            this.products = products;
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
        formProduk(form) {
            let products = nuxtStorage.localStorage.getData('products');
            if (!products) {
                products = []
            }
            if (this.formTarget == 'create') {
                products.push({ 'id': uuidv4(), ...form });
            } else {
                products = this.updateData(this.formTargetId, form)
            }
            nuxtStorage.localStorage.setData('products', products, 9999, 'd')
            this.products = products
        },

        removeData(id) {
            nuxtStorage.localStorage.setData('products', this.products.filter(item => item.id !== id), 9999, 'd');
            this.fetchData();
        },
        updateData(id, newData) {
            return this.products.map(item =>
                item.id === id ? { ...item, ...newData } : item
            );
        },
        searchById(id) {
            return this.products.find(item => item.id === id);
        }
    },
    mounted() {
        this.fetchData();
    }
}
</script>

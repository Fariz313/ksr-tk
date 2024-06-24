<template>
    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                {{ title }} Transaksi Baru
            </h3>
            <button @click="$emit('closeModal')" type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="crud-modal">
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span class="sr-only">Close modal</span>
            </button>
        </div>
        <!-- Modal body -->
        <form @submit.prevent="submitEmiting" class="p-4 md:p-5">
            <div class="grid gap-4 mb-4 grid-cols-2">
                <div class="col-span-2">
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama
                        Customer</label>
                    <input v-model="form.customer" type="text" name="customer" id="customer"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Masukan Nama Customer" required>
                </div>
                <div class="col-span-2">
                    <label for="nota" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">No
                        Nota</label>
                    <input v-model="form.nota" type="number" name="nota" id="nota"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Masukan Nomor Nota" required>
                </div>
                <div class="col-span-2">
                    <label for="nota" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Barang
                        <button @click="addItem" type="button" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 
                            focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm 
                             text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
                             px-2 py-1">+ Tambah
                        </button></label>
                    <div v-for="item,index in form.items" class="flex mb-2">
                        <select @change="changeItem($event,index)" v-model="form.items[index].item"   type="number"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Masukan Kode Produk" required>
                            <option value="" disabled>Pilih Barang</option>
                            <option v-for="itm,indx in products" :value="itm">{{ itm.name }}</option>
                        </select>
                        <input v-model="form.items[index].amount" @input="updateTotalPrice" item.amount type="number"
                            class="w-1/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Jumlah" required>
                        <button @click="removeItem(index)" type="button" 
                            class="text-white inline-flex items-center bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                            Hapus
                        </button>
                    </div>

                </div>
                <div class="col-span-2">
                    <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total
                        Transaksi</label>
                    <input v-model="form.total" readonly type="number" name="total" id="total"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Masukan Kategroi Produk" required>
                </div>
                <div class="col-span-2">
                    <label for="name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Penerima</label>
                    <input v-model="form.reciver" type="text" name="reciver" id="reciver"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Scan/Masukan Nomor Barcode" required>
                </div>
            </div>
            <button type="submit"
                class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clip-rule="evenodd"></path>
                </svg>
                Submit
            </button>
        </form>
    </div>
</template>
<script>
export default {
    props: {
        title: String,
        target: String,
        item: Object,
        products:Array,
    },
    data() {
        return {
            transactions: [],
            form: {
                customer: "",
                nota: "",
                total: "",
                reciver: "",
                items: [{
                    item: "",
                    amount: "",
                    price: ""
                }],
            }
        }
    },
    methods: {
        submitEmiting() {
            this.$emit('submitTransaction', this.form)
        },
        addItem() {
            this.form.items.push({
                item: "",
                amount: "",
                price: ""
            })
            console.log(this.form.items);
        },
        changeItem(event,index){
            let item = this.form.items[index].item;
            this.form.items[index].price = item.price
        },
        removeItem(index){
            this.form.items.splice(index,1)
            this.updateTotalPrice()
        },
        updateTotalPrice(){
            this.form.total = 0;
            this.form.items.forEach(item => {
                console.log(item);
                if(typeof item.amount === "number") {
                    this.form.total += item.price*item.amount;            
                }
            });
        }
    },
    mounted() {
        console.log('opened');
        console.log(this.products);
        if (this.target != 'create') {
            console.log(this.item);
            this.form.customer = this.item.customer
            this.form.nota = this.item.nota
            this.form.total = this.item.total
            this.form.reciver = this.item.reciver
            this.form.items = this.item.items
        }
    }
}
</script>

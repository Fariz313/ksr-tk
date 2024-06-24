<template>
    <div>
        <section class="bg-gray-50 dark:bg-gray-900">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                        alt="logo">
                    KSR Sistem
                </a>
                <div
                    class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1
                            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form @submit.prevent="login" class="space-y-4 md:space-y-6" action="#">
                            <div v-if="failLogin" @click="failLogin = !failLogin"
                                class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                                role="alert">
                                Email atau Password anda <span class="font-medium">Salah!</span>
                            </div>
                            <div>
                                <label for="email"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                    email</label>
                                <input v-model="email" type="email" name="email" id="email"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@company.com" required="">
                            </div>
                            <div>
                                <label for="password"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input v-model="password" type="password" name="password" id="password"
                                    placeholder="••••••••"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required="">
                            </div>
                            <div class="flex items-center justify-between">
                                <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox"
                                            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800">
                                    </div>
                                    <div class="ml-3 text-sm">
                                        <label for="remember" class="text-gray-500 dark:text-gray-300">Remember
                                            me</label>
                                    </div>
                                </div>
                                <a href="#"
                                    class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot
                                    password?</a>
                            </div>
                            <button type="submit" class=" w-full bg-blue-500 p-2 rounded text-white">
                                Login
                            </button>
                            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <a href="#"
                                    class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign
                                    up</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import nuxtStorage from 'nuxt-storage';
import Swal from 'sweetalert2'

definePageMeta({
    layout: 'clear'
})
export default {
    data() {
        return {
            email: "",
            password: "",
            failLogin: false
        }
    },
    methods: {
        async login() {
            const email = this.email
            const password = this.password
            const db = await this.$indexdb;
            let transaction = db.transaction(["users"], "readonly");
            let objectStore = transaction.objectStore("users");
            let index = objectStore.index("email");
            let request = index.get(email);
            request.onsuccess = async (event) =>{
                let user = request.result;
                const decrypted = await this.decryptor(user.password);
                console.log("log login", user);
                if (user && decrypted === password) {
                    this.$router.push("/product");
                } else {
                    Swal.fire({
                        title: 'Not Valid!',
                        text: 'Email atau Password salah',
                        icon: 'error',
                        confirmButtonText: 'Cool'
                    });
                }
            };

            request.onerror = function (event) {
                console.error("Error fetching user: " + event.target.errorCode);
                Swal.fire({
                    title: 'Error!',
                    text: 'An error occurred while fetching user data',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                });
            };
        },
        async checkAndCreateUser() {
            const default_password = this.$simpleCrypto.encrypt('password');
            try {
                const db = await this.$indexdb;
                const transaction = db.transaction(["users"]);
                const objectStore = transaction.objectStore("users");
                const request = objectStore.getAll();
                request.onsuccess = function (event) {
                    if (request.result) {
                        if (request.result.length < 1) {
                            console.log("lets create users");
                            const transaction2 = db.transaction(["users"], "readwrite");
                            const objectStore2 = transaction2.objectStore("users");
                            const customer = { id: 1, name: "Admin", email: "email@mail.mail", password: default_password };
                            const request2 = objectStore2.add(customer);

                            request2.onsuccess = function (event2) {
                                console.log("User added");
                            };

                            request.onerror = function (event) {
                                console.log("Add customer error: " + event.target.errorCode);
                            };
                        }
                    } else {
                        console.log("No users found ");
                        const transaction2 = db.transaction(["users"], "readwrite");
                        const objectStore2 = transaction2.objectStore("users");
                        const default_password = this.$simpleCrypto.encrypt('plainText');
                        const customer = { id: 1, name: "Admin", email: "email@mail.mail", password: default_password };
                        const request2 = objectStore2.add(customer);

                        request2.onsuccess = function (event2) {
                            console.log("User added");
                        };

                        request.onerror = function (event) {
                            console.log("Add customer error: " + event.target.errorCode);
                        };
                    }
                };
            } catch (error) {
                console.log(error);
            }
        },
        async decryptor(encrypt) {
            let decrypt = await this.$simpleCrypto.decrypt(encrypt)
            return decrypt;

        }
    },
    async mounted() {
        this.checkAndCreateUser()
    }
}
</script>

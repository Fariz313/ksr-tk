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
// import sqlite3 from 'sqlite3'

import { initFlowbite } from 'flowbite';
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
        login() {
            if (this.email == "email@mail.com" && this.password == "password") {
                this.$router.push("/dashboard")
            } else {
                this.failLogin = true
            }
            const db = new sqlite3.Database('~/database/database.db', sqlite3.OPEN_READWRITE, (err) => {
                if (err) return console.error(err.message)
            })
            let sql = "SELECT * FROM user WHERE email='" + this.email + "' AND password=" + this.password
            db.all(sql, [], (err, rows) => {
                if (err) {
                    this.failLogin = true
                } else {
                    rows.forEach(row => {
                        this.$router.push("/dashboard")
                    });
                    this.failLogin = true
                }
            })
        },
    },
    mounted() {
    }
}
</script>

<template>
    <div class="flex w-screen">
        <div class="flex w-1/2">
            <img src="https://flowbite.com/docs/images/logo.svg" class="h-24" alt="Flowbite Logo" />
            <div class="text-center">
                <h1 class="text-2xl font-bold">Bengkel Flowbite</h1>
                <h1>Terima Pengerjaan</h1>
                <p class="text-xs border-2 border-transparent border-b-black">Las Bubut - Grinding - Sekrap - Cutting
                    Plat</p>
                <p class="text-xs">xxxx. jl xxxx rt xx rw xx <br> 08222000333</p>
            </div>
        </div>
        <div>
            <h1>Malang,{{dateNow}}</h1>
            <p>Kepada Yth. :{{ }}</p>
        </div>
    </div>
</template>
<script>
definePageMeta({
    layout: 'clear'
})
export default {
    data() {
        return {
            dateNow: "",
            transaction: {}
        }
    },
    method: {
        formatDate(date, format) {
            const map = {
                mm: date.getMonth() + 1,
                dd: date.getDate(),
                yy: date.getFullYear().toString().slice(-2),
                yyyy: date.getFullYear()
            }

            return format.replace(/mm|dd|yy|yyy/gi, matched => map[matched])
        }
    },
    mounted() {
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        const id = this.$route.query.id
        // this.dateNow = this.formatDate(today,"dd-mm-yy")
        console.log(id)
        // print();
    }
}
</script>
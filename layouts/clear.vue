
import Navbar from '../components/navbar.vue';
<template>
    <div class="h-screen">
        <slot />
    </div>
</template>
<script>
export default{
    mounted() {
        initFlowbite();
    }
}
</script>

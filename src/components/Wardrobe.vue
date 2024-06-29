<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Showcase from './Showcase.vue';
import Backpack from './Backpack.vue';

const showcase = ref()
const backpack = ref()

onMounted(() => {
    showcase.value.setImg([{type: 'base', img: new URL(`../assets/img/base/girl.png`, import.meta.url).href}])
    showcase.value.setImg([{type: 'cset', img: new URL(`../assets/img/cset/girl/1_u_cset1462.png`, import.meta.url).href}])
    showcase.value.setImg([{type: 'hair', img: new URL(`../assets/img/hair/girl/1_f_hair754.png`, import.meta.url).href}])
    showcase.value.setImg([{type: 'glas', img: new URL(`../assets/img/glas/girl/1_f_glas103_Animate.png`, import.meta.url).href}])
})
</script>

<template>
    <div class="wardrobe-container">
        <Showcase ref="showcase" class="showcase" />
        <Backpack ref="backpack" class="backpack" />
    </div>
</template>

<style scoped>
    .wardrobe-container {
        position: absolute;
        top: 0%; left: 0%;
        min-width: 100%; min-height: 100%;

        justify-content: center;
        align-items: center;

        display: flex;
        gap: 20px;
    }

    .debug {
        display: none;
        background-color: rgba(255, 0, 0, 0.2);
    }
</style>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useImageStore } from '@/stores/image'
import { useCollectionStore } from '@/stores/collection';
import { useConst } from '@/hooks/useConst';
import Showcase from './Showcase.vue';
import Backpack from './Backpack.vue';

const imageStore = useImageStore()
const pageStore = useCollectionStore()

const showcase = ref()
const backpack = ref()

onMounted(() => {
    imageStore.setImage('base', useConst().GIRL_BASE_IMG)
    imageStore.setImage('cset', new URL('../assets/img/cset/girl/1_f_cset853.png', import.meta.url).href)
    imageStore.setImage('hair', new URL('../assets/img/hair/girl/1_f_hair754.png', import.meta.url).href)
    imageStore.setImage('glas', new URL('../assets/img/glas/girl/1_f_glas103_Animate.png', import.meta.url).href)
    imageStore.setImage('glam', new URL('../assets/img/glas/girl/2_f_glas103.png', import.meta.url).href)
    pageStore.setType('cset')
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
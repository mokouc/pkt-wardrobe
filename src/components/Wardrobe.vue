<script setup lang="ts">
import { onMounted, ref, defineExpose } from 'vue'
import Showcase from './Showcase.vue';
import Backpack from './Backpack.vue';

const showcase = ref()
const backpack = ref()

const handleToggleGender = (gender: string) => {
    // backpack.value.setList('cset', new URL(`../assets/list/${gender}/csetList.json`, import.meta.url).href)
    backpack.value.setGender(gender)
}

const handleClickItem = (value: any) => {
    switch (value.type) {
        case 'glas': showcase.value.setGlas(value.name)
            break;
        case 'hair': showcase.value.setHair(value.name)
            break;
        case 'cset': showcase.value.setCset(value.name)
            break;
    }
}

onMounted(() => {
    showcase.value.setGlas('1_f_glas131_Animate.png')
    showcase.value.setHair('1_f_hair754[天使街女发].png')
    showcase.value.setCset('1_u_cset2254.png')

})

</script>

<template>
    <div class="wardrobe-container">
        <Showcase ref="showcase" class="showcase" @toggle-gender="handleToggleGender" :genderNumber="0"/>
        <Backpack ref="backpack" class="backpack" @click-item="handleClickItem" :glasList="null"/>
    </div>
</template>

<style scoped>
    .wardrobe-container {
        position: relative;

        position: absolute;
        top: 50%; left: 50%;
        transform: translate(-50%, -50%);

        display: flex;
        gap: 20px;
    }
</style>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Showcase from './Showcase.vue';
import Backpack from './Backpack.vue';

const showcase = ref()
const backpack = ref()

const handleToggleGender = (gender: string) => {
    backpack.value.setGender(gender)
}

const handleClickItem = (value: any) => {
    console.log(value.img)
    switch (value.type) {
        case 'cset': showcase.value.setCsetImg(value.img) 
            break;
        case 'glas': showcase.value.setGlasImg(value.img)
            break;
        case 'hair': showcase.value.setHairImg(value.img)
            break;
    }
}

onMounted(() => {
    showcase.value.setGlas('1_f_glas103_Animate[星途女瞳].png')
    showcase.value.setHair('1_f_hair754[天使街女发].png')
    showcase.value.setCset('1_u_cset1462[白猫女装].png')
})

</script>

<template>
    <div class="wardrobe-container">
        <Showcase ref="showcase" class="showcase" @toggle-gender="handleToggleGender" :genderNumber="0"/>
        <Backpack ref="backpack" class="backpack" @click-item="handleClickItem" :type="'cset'" gender="girl"/>
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
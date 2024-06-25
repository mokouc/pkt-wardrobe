<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Showcase from './Showcase.vue';
import Backpack from './Backpack.vue';
import SHowcaseTest from './ShowcaseTest.vue';

const showcase = ref()
const backpack = ref()

const handleToggleGender = (gender: string) => {
    backpack.value.setGender(gender)
}

const handleClickItem = (value: any) => {
    switch (value.type) {
        case 'cset': showcase.value.setCsetImg(value.img) 
            break;
        case 'hair': showcase.value.setHairImg(value.img)
            break;
        case 'glas': showcase.value.setGlas(value.name)
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
        <!-- <SHowcaseTest ref="showcase" class="showcase"  @toggle-gender="handleToggleGender" :genderNumber="0"/> -->
        <Showcase ref="showcase" class="showcase" @toggle-gender="handleToggleGender" :genderNumber="0"/>
        <Backpack ref="backpack" class="backpack" @click-item="handleClickItem" :type="'cset'" gender="girl"/>
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
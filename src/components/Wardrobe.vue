<script setup lang="ts">
import { onMounted, ref } from 'vue'
// import Showcase from './Showcase.vue';
import Backpack from './Backpack.vue';
import SHowcaseTest from './ShowcaseTest.vue';

const showcase = ref()
const backpack = ref()

const handleToggleGender = (gender: string) => {
    backpack.value.setGender(gender)
}

const handleClickItem = (value: any) => showcase.value.setImg(value.type, value.img)

onMounted(() => {
    // showcase.value.setImg('base', new URL(`../assets/img/base/girl.png`, import.meta.url).href)
    // showcase.value.setImg('cset', new URL(`../assets/img/cset/girl/1_u_cset1462.png`, import.meta.url).href)
    // showcase.value.setImg('hair', new URL(`../assets/img/hair/girl/1_f_hair754.png`, import.meta.url).href)
    // showcase.value.setImg('glas', new URL(`../assets/img/glas/girl/1_f_glas103_Animate.png`, import.meta.url).href)
})

</script>

<template>
    <div class="wardrobe-container">
        <SHowcaseTest ref="showcase" class="showcase" />
        <!-- <Showcase ref="showcase" class="showcase" @toggle-gender="handleToggleGender" :genderNum="0"/> -->
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

    .showcase {
        /* scale: 4; */
        /* -webkit-transform: scale(4); 
        -moz-transform: scale(4);    
        -ms-transform: scale(4);     
        -o-transform: scale(4);      
        transform: scale(4);          */
    }

    .debug {
        display: none;
        background-color: rgba(255, 0, 0, 0.2);
    }
</style>
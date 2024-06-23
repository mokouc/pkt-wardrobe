<script setup lang="ts">
import { ref, defineExpose, onMounted } from 'vue'

const props = withDefaults(defineProps<{
    genderNum: number
}>(), {
    genderNum: 0
})

const GENDER_DEFINE = ['girl', 'boy']
var genderNum = props.genderNum

const gender = ref(GENDER_DEFINE[genderNum])

const base = ref(new URL(`../assets/img/base/${gender.value}.png`, import.meta.url).href)

const glas = ref()
const mini = ref()
const hair = ref()
const cset = ref()

const setGlas = (name: string) => setGlasImg(getGlasImg(name))
const setHair = (name: string) => setHairImg(getHairImg(name))
const setCset = (name: string) => setCsetImg(getCsetImg(name))

const setGlasImg = (img: {glas: string, mini: string}) => {glas.value = img.glas; mini.value = img.mini}
const setHairImg = (img: string) => hair.value = img
const setCsetImg = (img: string) => cset.value = img

const getGlasImg = (name: string) => { return {glas: getAssetImg('glas', name), mini: getAssetImg('glas', name.replace('1', '2').replace('_Animate', ''))}}
const getHairImg = (name: string) => getAssetImg('hair', name)
const getCsetImg = (name: string) => getAssetImg('cset', name)
const getAssetImg = (type: string, name: string) => new URL(`../assets/img/${type}/${gender.value}/${name}`, import.meta.url).href

const toggleGender = () => {
    genderNum = (genderNum + 1) % 2
    gender.value = GENDER_DEFINE[genderNum]
    base.value = new URL(`../assets/img/base/${gender.value}.png`, import.meta.url).href
    return gender.value
}

defineExpose({ setGlas, setHair, setCset, setGlasImg, setHairImg, setCsetImg})

</script>

<template>
    <div class="showcase-container">
        <div class="canva">
            <div class="base">
                <img :src="base"class="img base" alt="">
            </div>

            <div class="full">
                <img :src="hair" class="hair back" style="top: -150px; left: -600px;" alt="">
                <img :src="glas" class="glas" alt="">
                <img :src="cset" class="cset" style="top: -300px; left: -600px;" alt="">
                <img :src="hair" class="hair front" style="top: 0px; left: -600px;" alt="">
            </div>

            <div class="mini front">
                <img :src="mini" class="glas" style="top: 0px;" alt="">
                <img :src="cset" class="cset" style="top: -60px;" alt="">
                <img :src="cset" class="cset" style="top: -300px;" alt="">
                <img :src="cset" class="cset" style="top: -120px;" alt="">
                <img :src="hair" class="hair" style="top: 0px;" alt="">
            </div>

            <div class="mini back">
                <img :src="cset" class="cset" style="top: -480px;" alt="">
                <img :src="cset" class="cset" style="top: -720px;" alt="">
                <img :src="cset" class="cset" style="top: -120px;" alt="">
                <img :src="hair" class="hair" style="top: -420px;" alt="">
            </div>

            <div class="toggle" @click="$emit('toggle-gender', toggleGender())"></div>
        </div>
    </div>
</template>

<style scoped>
    .showcase-container {
        position: relative;
        width: 572px; height: 608px;
        overflow: hidden;
    }

    .canva {
        scale: 4;
        /* transform-origin: top left; */
    }

    .canva > div {
        position: absolute;
        overflow: hidden;
    }

    .base {
        width: 143px; height: 152px;
    }

    .full {
        top: 1px; left: 1px;
        width: 100px; height: 150px;
    }

    .mini.front {
        top: 30px; left: 102px;
        width: 40px; height: 60px;
    }

    .mini.back {
        top: 91px; left: 102px;
        width: 40px; height: 60px;
    }

    .toggle {
        position: absolute;
        top: 1px; left: 102px;
        width: 40px; height: 28px;
        /* background-color: rgba(255, 0, 0, 0.2); */
    }

    img{
        position: absolute;
        image-rendering: pixelated;
    }
</style>
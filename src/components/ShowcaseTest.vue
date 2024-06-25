<script setup lang="ts">
import { ref, defineExpose, onMounted } from 'vue'

const props = withDefaults(defineProps<{
    genderNum: number
}>(), {
    genderNum: 0
})

const GENDER_DEFINE = ['girl', 'boy']
const CANVAS_WIDTH = 143
const CANVAS_HEIGHT = 152
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
// const setCsetImg = (img: string) => cset.value = img
const setCsetImg = (img: string) => {
    imgs.value['cset'].img = img
    drawImgs()
}

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

// const canvas = ref<any>() 
const canvas = ref<HTMLCanvasElement>()

const imgs = ref<any>({
    base: { img: base.value, sx: 0, sy: 0, sw: CANVAS_WIDTH, sh: CANVAS_HEIGHT, x: 0, y: 0, w: CANVAS_WIDTH, h: CANVAS_HEIGHT},
    cset: { img: null, sx: 600, sy: 300, sw: 200, sh: 300, x: 0, y: 0, w: 200, h: 300 }
})

const posi = ref<any>({
    main: {
        base: { index: 0, sx: 0, sy: 0, sw: CANVAS_WIDTH, sh: CANVAS_HEIGHT, x: 0, y: 0, w: CANVAS_WIDTH, h: CANVAS_HEIGHT },
        cset: { index: 1, sx: 600, sy: 300, sw: 200, sh: 300, x: 0, y: 0, w: 200, h: 300 },
        glas: { index: 3, sx: 600, sy: 300, sw: 200, sh: 300, x: 0, y: 0, w: 200, h: 300 },
        hairb: { index: 2, sx: 600, sy: 300, sw: 200, sh: 300, x: 0, y: 0, w: 200, h: 300 },
        hairf: { index: 4, sx: 600, sy: 300, sw: 200, sh: 300, x: 0, y: 0, w: 200, h: 300 },
    },
    minif: {
        cset: { index: 1, sx: 600, sy: 300, sw: 200, sh: 300, x: 0, y: 0, w: 200, h: 300 },
        glas: { index: 3, sx: 600, sy: 300, sw: 200, sh: 300, x: 0, y: 0, w: 200, h: 300 },
        hair: { index: 2, sx: 600, sy: 300, sw: 200, sh: 300, x: 0, y: 0, w: 200, h: 300 },
    },
    minib: {
        cset: { index: 1, sx: 600, sy: 300, sw: 200, sh: 300, x: 0, y: 0, w: 200, h: 300 },
        glas: { index: 3, sx: 600, sy: 300, sw: 200, sh: 300, x: 0, y: 0, w: 200, h: 300 },
        hair: { index: 2, sx: 600, sy: 300, sw: 200, sh: 300, x: 0, y: 0, w: 200, h: 300 },
    }
})

const drawImg = (item: any) => {
    const ctx = canvas.value?.getContext('2d')
    ctx?.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    const image = new Image()
    image.src = item.img
    image.onload = () => ctx?.drawImage(image, item.sx, item.sy, item.sw, item.sh, item.x, item.y, item.w, item.h)
}

const drawImgs = () => {
    for (var i in imgs.value)
        for (var key in imgs.value[i])
            drawImg(imgs.value[i][key])
}

onMounted(() => {
    // drawImg(base.value)
    // drawCset(getCsetImg('1_u_cset1462[白猫女装].png'))
    drawImgs()
})

</script>

<template>
    <div class="showcase-container">
        <canvas id="canvas" ref="canvas" class="canvas"  style="image-rendering: pixelated;"
            :width="CANVAS_WIDTH" :height="CANVAS_HEIGHT"
        ></canvas>
    </div>
</template>

<style scoped>
    .showcase-container {
        position: relative;
        width: 572px; height: 608px;
        overflow: hidden;
    }

    .canva {
        /* scale: 4; */
        -webkit-transform: scale(4); /* Safari and Chrome */
        -moz-transform: scale(4);    /* Firefox */
        -ms-transform: scale(4);     /* Internet Explorer */
        -o-transform: scale(4);      /* Opera */
        transform: scale(4);         /* Standard */
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
    }

    img{
        position: absolute;
        image-rendering: pixelated;
    }
</style>
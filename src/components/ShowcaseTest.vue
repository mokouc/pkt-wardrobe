<script setup lang="ts">
import { ref, defineExpose, onMounted, watch } from 'vue'

const GENDER_DEFINE = ['girl', 'boy']
const CANVAS_WIDTH = 143 
const CANVAS_HEIGHT = 152

const canvas = ref<HTMLCanvasElement>()

const baseImg = ref(new Image())
const csetImg = ref(new Image())
const hairImg = ref(new Image())
const glasImg = ref(new Image())

baseImg.value.onload = () => drawImgs()
csetImg.value.onload = () => drawImgs()
hairImg.value.onload = () => drawImgs()
glasImg.value.onload = () => drawImgs()

const imgs = ref<any>({
    base: baseImg.value,
    cset: csetImg.value,
    hair: hairImg.value,
    glas: glasImg.value
})

const pos = ref<any>({
    main: [
        { type: 'hair', sx: 600, sy: 150, sw: 100, sh: 150, x: 1, y: 1, w: 100, h: 150 },
        { type: 'base', sx: 0, sy: 0, sw: CANVAS_WIDTH, sh: CANVAS_HEIGHT, x: 0, y: 0, w: CANVAS_WIDTH, h: CANVAS_HEIGHT },
        { type: 'glas', sx: 0, sy: 0, sw: 100, sh: 150, x: 1, y: 1, w: 100, h: 150 },
        { type: 'cset', sx: 600, sy: 300, sw: 100, sh: 150, x: 1, y: 1, w: 100, h: 150 },
        { type: 'hair', sx: 600, sy: 0, sw: 100, sh: 150, x: 1, y: 1, w: 100, h: 150 }
    ],
    mini: [
        { type: 'hair', sx: 0, sy: 0, sw: 40, sh: 60, x: 102, y: 30, w: 40, h: 60 },        // mini front hair
        { type: 'cset', sx: 0, sy: 60, sw: 40, sh: 60, x: 102, y: 30, w: 40, h: 60 },       // mini front body
        { type: 'cset', sx: 0, sy: 300, sw: 40, sh: 60, x: 102, y: 30, w: 40, h: 60 },      // mini front leg
        { type: 'cset', sx: 0, sy: 120, sw: 40, sh: 60, x: 102, y: 30, w: 40, h: 60 },      // mini front hand
        { type: 'cset', sx: 0, sy: 480, sw: 40, sh: 60, x: 102, y: 91, w: 40, h: 60 },      // mini back body
        { type: 'cset', sx: 0, sy: 720, sw: 40, sh: 60, x: 102, y: 91, w: 40, h: 60 },      // mini back leg
        { type: 'cset', sx: 0, sy: 600, sw: 40, sh: 60, x: 102, y: 91, w: 40, h: 60 },      // mini back hand
        { type: 'hair', sx: 0, sy: 420, sw: 40, sh: 60, x: 102, y: 91, w: 40, h: 60 },      // mini back hair
    ]
})

const setImg = (type: string, img: string) => { imgs.value[type].src = img }
const drawImgs = () => {
    const ctx = canvas.value?.getContext('2d')
    ctx?.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    for (var key in pos.value) {
        for (var idx in pos.value[key]) {
            const p = pos.value[key][idx]
            const img = imgs.value[p.type]
            if (img.src == undefined)
                return
            ctx?.drawImage(img, p.sx, p.sy, p.sw, p.sh, p.x, p.y, p.w, p.h)
        }
    }
}

onMounted(() => {
    setImg('base', new URL(`../assets/img/base/girl.png`, import.meta.url).href)
    setImg('cset', new URL(`../assets/img/cset/girl/1_u_cset1462.png`, import.meta.url).href)
    setImg('hair', new URL(`../assets/img/hair/girl/1_f_hair754.png`, import.meta.url).href)
    setImg('glas', new URL(`../assets/img/glas/girl/1_f_glas103_Animate.png`, import.meta.url).href)
})

defineExpose({ setImg })

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

    .canvas {
        position: relative;
        width: 572px; height: 608px;
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
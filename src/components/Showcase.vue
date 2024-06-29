<script setup lang="ts">
import { ref, defineExpose, watch } from 'vue'
import { useWardrobeStore } from '@/stores/wardrobe'
import { useImageStore } from '@/stores/image'
import { usePositionStore } from '@/stores/position'

const CANVAS_WIDTH = 143 
const CANVAS_HEIGHT = 152

const canvas = ref<HTMLCanvasElement>()

const gender = useWardrobeStore().getGender
const pos = usePositionStore().pos
const imgs = useImageStore().imgs

const setImg = (items: any) => items.forEach((item: any) => imgs.get(item.type).src = item.img)
const drawImgs = () => {
    const ctx = canvas.value?.getContext('2d')
    ctx?.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    pos.forEach((p: any) => ctx?.drawImage(imgs.get(p.type), p.sx, p.sy, p.sw, p.sh, p.x, p.y, p.w, p.h))
}

watch(() => gender, () => {
    alert(gender)
})

useImageStore().setOnload(drawImgs)

defineExpose({ setImg })
</script>

<template>
    <div class="showcase-container">
        <canvas ref="canvas" class="canvas" style="image-rendering: pixelated;"
            :width="CANVAS_WIDTH" :height="CANVAS_HEIGHT"
        ></canvas>
        <div class="toggle" @click="useWardrobeStore().toggleGender"></div>
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
        top: 4px; left: 408px;
        width: 160px; height: 112px;
    }
</style>
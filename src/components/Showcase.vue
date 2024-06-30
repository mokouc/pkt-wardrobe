<script setup lang="ts">
import { ref } from 'vue'
import { useConst } from "@/hooks/useConst"
import { usePosition } from '@/hooks/usePosition'
import { useWardrobeStore } from '@/stores/wardrobe'
import { useImageStore } from '@/stores/image'

const { CANVAS_WIDTH, CANVAS_HEIGHT } = useConst()
const position = usePosition()

const imageStore = useImageStore()
const { toggleGender } = useWardrobeStore()

const canvas = ref<HTMLCanvasElement>()

const drawImages = () => {
    const ctx = canvas.value?.getContext('2d')
    ctx?.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    position.forEach((pos: any) => {
        const image = imageStore.getImage(pos.type)
        try {
            ctx?.drawImage(image, pos.sx, pos.sy, pos.sw, pos.sh, pos.x, pos.y, pos.w, pos.h)
        } catch (e) {
            console.info('not found img: ' + image.src)
        }
    })
}
useImageStore().setOnload(drawImages)
</script>

<template>
    <div class="showcase-container">
        <canvas ref="canvas" class="canvas" style="image-rendering: pixelated;"
            :width="CANVAS_WIDTH" :height="CANVAS_HEIGHT"
        ></canvas>
        <div class="toggle" @click="toggleGender"></div>
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
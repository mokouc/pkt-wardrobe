<script setup lang="ts">
import { useConst } from '@/hooks/useConst';
import { onMounted, ref, toRef, watch } from 'vue';

const props = defineProps<{ item: any }>()

const { ITEM_CELL_WIDTH, ITEM_CELL_HEIGHT, FACE_BASE_IMG } = useConst()

const item = toRef(props, 'item')

const canvas = ref()
const ctx = ref()

const base = new Image()
base.src = FACE_BASE_IMG

const image = new Image()
image.src = item.value.img
image.onload = () => drawImages()

const drawImages = () => {
    switch (item.value.type) {
        case 'cset': drawCsetItem()
            break
        case 'hair': drawHairItem()
            break
        case 'glas': drawGlasItem()
            break
    }
}

const drawCsetItem = () => {
    ctx.value?.drawImage(image, 615, 355, ITEM_CELL_WIDTH, ITEM_CELL_HEIGHT, 0, 0, ITEM_CELL_WIDTH, ITEM_CELL_HEIGHT)
}

const drawHairItem = () => {
    ctx.value?.drawImage(image, 615, 156, ITEM_CELL_WIDTH, ITEM_CELL_HEIGHT, 0, 0, ITEM_CELL_WIDTH, ITEM_CELL_HEIGHT)
    ctx.value?.drawImage(base, 0, 0, ITEM_CELL_WIDTH, ITEM_CELL_HEIGHT, 0, 0, ITEM_CELL_WIDTH, ITEM_CELL_HEIGHT)
    ctx.value?.drawImage(image, 615, 6, ITEM_CELL_WIDTH, ITEM_CELL_HEIGHT, 0, 0, ITEM_CELL_WIDTH, ITEM_CELL_HEIGHT)
}

const drawGlasItem = () => {
    ctx.value?.drawImage(base, 0, 0, ITEM_CELL_WIDTH, ITEM_CELL_HEIGHT, 0, 0, ITEM_CELL_WIDTH, ITEM_CELL_HEIGHT)
    ctx.value?.drawImage(image, 15, 7, ITEM_CELL_WIDTH, ITEM_CELL_HEIGHT, 0, 0, ITEM_CELL_WIDTH, ITEM_CELL_HEIGHT)
}

watch(() => item.value, item => {
    ctx.value.clearRect(0, 0, ITEM_CELL_WIDTH, ITEM_CELL_HEIGHT)
    image.src = item?.img
})

onMounted(() => ctx.value = canvas.value.getContext('2d'))
</script>
<template>
    <div class="cell-container">
        <div class="image">
            <canvas ref="canvas" class="canvas" :width="ITEM_CELL_WIDTH" :height="ITEM_CELL_HEIGHT" :title="item?.title"></canvas>
        </div>
        <div class="label">
            <span>{{ item?.title || item?.name }}</span>
        </div>
    </div>
</template>

<style scoped>
    .cell-container {
        position: relative;
        width: 140px; height: 165px;
        width: 126px; height: 140px;
    }

    .image {
        position: relative;
        width: 140px; height: 140px;
        width: 126px; height: 126px;
        overflow: hidden;
        border: solid 3px rgb(245, 245, 245);
        box-sizing: border-box; 
        background-color: rgb(250, 250, 250);
    }

    .canvas {
        position: relative;
        width: 280px; height: 280px;
        width: 252px; height: 252px;
        image-rendering: pixelated;
    }

    .label {
        position: relative;
        width: 140px;
        height: 20px;
        font-size: 14px;
        display: flex;
        justify-content: center;
        overflow: hidden;
    }
</style>
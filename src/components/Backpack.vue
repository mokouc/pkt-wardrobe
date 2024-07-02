<script setup lang="ts">
import { useImageStore } from '@/stores/image'
import { storeToRefs } from 'pinia'
import { useCollectionStore } from '@/stores/collection'
import { useConst } from '@/hooks/useConst'
import ItemCell from './ItemCell.vue'
import { ref } from 'vue'

const { PAGE_SIZE } = useConst()

const imageStore = useImageStore()
const collectionStore = useCollectionStore()
const collectionStoreRef = storeToRefs(collectionStore)

const items = collectionStoreRef.getItems
const type = collectionStoreRef.getType
const collection = collectionStoreRef.getCollection

const clickItem = (item: any) => {
    imageStore.setImage(type.value, item.img)
    if (type.value == 'glas') {
        const img = new URL(`../assets/img/glas/${item.gender}/${item.name.replace('_Animate', '')}`, import.meta.url).href
        console.log(img)
        imageStore.setImage('glam', img)
    }
}

const isJump = ref(false)
const input = ref()

const jump = () => {
    collectionStore.setPage(input.value.value)
    isJump.value = !isJump.value
}

document.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Escape')
        isJump.value = !isJump.value
});
</script>

<template>
    <div class="backpack-container">
        <div class="tabs top">
            <div class="button" :class="{'selected': type == 'cset'}" @click="collectionStore.setType('cset')" >套装</div>
            <div class="button" :class="{'selected': type == 'hair'}" @click="collectionStore.setType('hair')" >头发</div>
            <div class="button" :class="{'selected': type == 'glas'}" @click="collectionStore.setType('glas')" >眼瞳</div>
        </div>
        <div class="items">
            <ItemCell v-for="(i, index) in PAGE_SIZE"
                :class="{'hide': items[i - 1] == undefined}"
                :item="items[index]"
                @click="clickItem(items[index])" />
        </div>
        <div class="tabs bottom">
            <div class="button" @click="collectionStore.setPage(collection.page - 1)"><</div>
            <div class="button page">
                <span ref="page" :class="{'hide': isJump}" @click="isJump = !isJump">{{ collection.page }} / {{ collection.total }}</span>
                <div class="jump" :class="{'hide': !isJump}">
                    <input ref="input" class="input" type="number" :value="collection.page" @keypress.enter="jump" />
                    <span class="go" @click="jump">Go</span>
                </div>
            </div>
            <div class="button" @click="collectionStore.setPage(collection.page + 1)">></div>
        </div>
    </div>
</template>

<style>
    .backpack-container {
        position: relative;
        width: max-content; height: 608px;
        
        border: solid 4px rgb(178, 178, 178);
        box-sizing: border-box; 

        transform-origin: top left;
        overflow: hidden;
    }

    .tabs {
        width: 100%; height: 50px;
        background-color: rgb(231, 231, 231);
    }
    
    .tabs.top {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
    }

    .tabs.bottom {
        display: flex;
        justify-content: center;
        background-color: rgb(231, 231, 231);
    }

    .button {
        width: 100%; height: 50px;

        font-size: 20px;
        color: rgb(100, 100, 100);

        display: flex;
        justify-content: center;
        align-items: center;
        
        background-color: rgb(231, 231, 231);
        cursor: pointer;

        user-select: none;
    }

    .tabs.bottom > .button {
        width: 100px; height: 50px;
    }

    .button.selected {
        background-color: white;
    }

    .button.page > * {
        position: absolute;
    }

    .items {
        position: relative;
        width: fit-content; height: 500px;

        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(3, 1fr);

        justify-items: center;
        align-items: center;

        column-gap: 10px;
        margin-left: 10px; 
        margin-right: 10px;
    }

    .jump {
        position: relative;
        width: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }

    .input {
        width: 20px; height: 20px;
    }

    .go {
        width: 30px;
        align-items: center;
    }

    input::-webkit-outer-spin-button, input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    .hide {
        visibility: hidden
    }
</style>
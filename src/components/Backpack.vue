<script setup lang="ts">
import { useImageStore } from '@/stores/image'
import { storeToRefs } from 'pinia'
import { useCollectionStore } from '@/stores/collection'
import { useConst } from '@/hooks/useConst'
import ItemCell from './ItemCell.vue'

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
        const img = new URL(`../assets/img/glas/${item.gender}/${item.name.replace('1', '2').replace('_Animate', '')}`, import.meta.url).href
        console.log(img)
        imageStore.setImage('glam', img)
    }
}
</script>

<template>
    <div class="backpack-container">
        <div class="tabs top">
            <div class="tab" :class="{'selected': type == 'cset'}" @click="collectionStore.setType('cset')" >套装</div>
            <div class="tab" :class="{'selected': type == 'hair'}" @click="collectionStore.setType('hair')" >头发</div>
            <div class="tab" :class="{'selected': type == 'glas'}" @click="collectionStore.setType('glas')" >眼瞳</div>
        </div>
        <div class="items">
            <ItemCell v-for="(i, index) in PAGE_SIZE"
                :class="{'hide': items[i - 1] == undefined}"
                :item="items[index]"
                @click="clickItem(items[index])" />
        </div>
        <div class="tabs bottom">
            <div class="tab" @click="collectionStore.prePage"><</div>
            <div class="tab">{{ collection.page }} / {{ collection.total }}</div>
            <div class="tab" @click="collectionStore.nextPage">></div>
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

    .tab {
        width: 100%; height: 50px;

        font-size: 20px;
        color: rgb(100, 100, 100);

        display: flex;
        justify-content: center;
        align-items: center;
        
        background-color: rgb(231, 231, 231);
        cursor: pointer;
    }

    .tabs.bottom > .tab {
        width: 100px; height: 50px;
    }

    .tab.selected {
        background-color: white;
    }

    .items {
        position: relative;
        width: fit-content; height: 500px;

        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(3, 1fr);

        justify-items: center;
        align-items: center;

        gap: 10px;
        margin-left: 10px; margin-right: 10px;
    }

    .hide {
        visibility: hidden;
    }
</style>
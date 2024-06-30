<script setup lang="ts">
import { useImageStore } from '@/stores/image'
import { storeToRefs } from 'pinia'
import { useItemStore } from '@/stores/collection'
import { useConst } from '@/hooks/useConst'

const { PAGE_SIZE } = useConst()

const pageStore = useItemStore()

const type = storeToRefs(pageStore).getType
const collection = storeToRefs(pageStore).getCollection
const items = storeToRefs(pageStore).getItems

const clickItem = (event: any) => useImageStore().setImage(type.value, event.target.src)
</script>

<template>
    <div class="backpack-container">
        <div class="tabs top">
            <div class="tab" :class="{'selected': type == 'cset'}" @click="pageStore.setType('cset')" >套装</div>
            <div class="tab" :class="{'selected': type == 'hair'}" @click="pageStore.setType('hair')" >头发</div>
            <div class="tab" :class="{'selected': type == 'glas'}" @click="pageStore.setType('glas')" >眼瞳</div>
        </div>
        <div class="items">
            <div class="item" v-for="(i, index) in PAGE_SIZE" :class="{'hide': items[i - 1] == undefined}">  
                <div class="canva">
                    <img alt="" class="itemImg back" :class="type" :src="items[i - 1]?.img" />
                    <img alt="" class="baseImg" :class="type" :src="useConst().FACE_BASE_IMG" />
                    <img alt="" class="itemImg front" 
                        :class="type" 
                        :src="items[index]?.img" 
                        :title="items[index]?.title" 
                        :name="items[index]?.name"
                        @click="clickItem($event)"
                    />
                </div>
            </div>
        </div>
        <div class="tabs bottom">
            <div class="tab" @click="pageStore.prePage"><</div>
            <div class="tab">{{ collection.page }} / {{ collection.total }}</div>
            <div class="tab" @click="pageStore.nextPage">></div>
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

    .item {
        position: relative;
        width: 140px; height: 140px;
        overflow: hidden;
        border: solid 3px rgb(245, 245, 245);
        background-color: rgb(250, 250, 250);
    }

    .item.hide {
        visibility: hidden;
    }

    .canva {
        /* scale: 2; */
        -webkit-transform: scale(2); /* Safari and Chrome */
        -moz-transform: scale(2);    /* Firefox */
        -ms-transform: scale(2);     /* Internet Explorer */
        -o-transform: scale(2);      /* Opera */
        transform: scale(2);         /* Standard */

        transform-origin: top left;
    }

    .itemImg.glas {
        top: -7px; left: -15px;
    }

    .itemImg.hair.front {
        top: -6px; left: -615px;
    }

    .itemImg.hair.back{
        top: -156px; left: -615px;
    }

    .itemImg.cset {
        top: -355px; left: -615px;
    }

    .baseImg.cset {
        visibility: hidden;
    }

    img{
        position: absolute;
        image-rendering: pixelated;
    }
</style>
<script setup lang="ts">
import { onMounted, ref, defineExpose } from 'vue'
import girlGlasList from '@/assets/list/girl/glasList.json'
import girlHairList from '@/assets/list/girl/hairList.json'
import girlCsetList from '@/assets/list/girl/csetList.json'
import boyGlasList from '@/assets/list/boy/glasList.json'
import boyHairList from '@/assets/list/boy/hairList.json'
import boyCsetList from '@/assets/list/boy/csetList.json'

const items = ref()

const glasTab = ref()
const hairTab = ref()
const csetTab = ref()

const gender = ref('girl')

const getTotal = (list: any) => Math.floor(Object.keys(list).length / 12) + 1

const base = ref(new URL(`../assets/img/wardrobe/base/face.png`, import.meta.url).href)

const tabInfo = ref({tab: null, type: null, list: null, page: 0, total: 0})
const tabInfos = ref<Map<any, any>>(new Map([
    ['girl-cset', {tab: csetTab, type: 'cset', list: girlCsetList, page: 1, total: getTotal(girlCsetList)}],
    ['girl-hair', {tab: hairTab, type: 'hair', list: girlHairList, page: 1, total: getTotal(girlHairList)}],
    ['girl-glas', {tab: glasTab, type: 'glas', list: girlGlasList, page: 1, total: getTotal(girlGlasList)}],
    ['boy-cset', {tab: csetTab, type: 'cset', list: boyCsetList, page: 1, total: getTotal(boyCsetList)}],
    ['boy-hair', {tab: hairTab, type: 'hair', list: boyHairList, page: 1, total: getTotal(boyHairList)}],
    ['boy-glas', {tab: glasTab, type: 'glas', list: boyGlasList, page: 1, total: getTotal(boyGlasList)}],
]))

const clickTab = (type: any) => {
    tabInfo.value = tabInfos.value.get(`${gender.value}-${type}`)
    setPage(tabInfo.value.list, tabInfo.value.page)
}

const clickItem = (event: any) => { return {type: tabInfo.value.type, name: event.target.alt, res: event.target.src}}

const setGender = (genderTo: string) => {
    gender.value = genderTo
    clickTab(tabInfo.value.type)
}

const setPage = (list: any, page: number) => {
    tabInfo.value.page = page;

    const offset = (tabInfo.value.page - 1) * 12
    const keys = Object.keys(list)
    const nodes = ref(items.value.childNodes)

    for (var i = 0; i < 12; i++) {
        const item = i + offset >= keys.length ? undefined : keys[i + offset]
        const canva = nodes.value[i + 1].childNodes[0]
        const img = new URL(`../assets/img/wardrobe/${tabInfo.value.type}/${gender.value}/` + item, import.meta.url).href
        canva.childNodes[0].src = item == undefined ? '' : img
        canva.childNodes[1].src = item == undefined ? '' : base.value
        canva.childNodes[2].src = item == undefined ? '' : img
        canva.childNodes[2].alt = item == undefined ? '' : item
        canva.childNodes[2].title = item == undefined ? '' : list[item]
    }
}

defineExpose({ setGender })

onMounted(() => {
    clickTab('cset')
})

</script>

<template>
    <div class="backpack-container">
        <div class="tabs top">
            <div class="tab" :class="{'selected': tabInfo.type == 'cset'}" ref="csetTab" @click="clickTab('cset')" >套装</div>
            <div class="tab" :class="{'selected': tabInfo.type == 'hair'}" ref="hairTab" @click="clickTab('hair')" >头发</div>
            <div class="tab" :class="{'selected': tabInfo.type == 'glas'}" ref="glasTab" @click="clickTab('glas')" >眼瞳</div>
        </div>
        <div ref="items" class="items">
            <div class="item" v-for="i in 12">
                <div class="canva">
                    <img class="itemImg back" :class="tabInfo.type" @click="$emit('click-item', clickItem($event))" alt="" />
                    <img class="baseImg" :class="tabInfo.type" alt="" />
                    <img class="itemImg front" :class="tabInfo.type" @click="$emit('click-item', clickItem($event))" alt="" />
                </div>
            </div>
        </div>
        <div class="tabs bottom">
            <div class="tab" @click="setPage(tabInfo.list, Math.max(tabInfo.page - 1, 1))"><</div>
            <div class="tab">{{ tabInfo?.page }} / {{ tabInfo?.total }}</div>
            <div class="tab" @click="setPage(tabInfo.list, Math.min(tabInfo.page + 1, tabInfo.total))">></div>
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
        /* background-color: rgba(255, 0, 0, 0.2); */
    }

    .canva {
        scale: 2;
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

    .baseImg.cset, .baseImg.hide {
        visibility: hidden;
    }

    img{
        position: absolute;
        image-rendering: pixelated;
    }
</style>
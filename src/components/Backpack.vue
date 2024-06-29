<script setup lang="ts">
import { onMounted, ref, defineExpose } from 'vue'
import { useWardrobeStore } from '@/stores/wardrobe'
import { useImageStore } from '@/stores/image'
import girlGlasList from '@/assets/list/girl/glasList.json'
import girlHairList from '@/assets/list/girl/hairList.json'
import girlCsetList from '@/assets/list/girl/csetList.json'
import boyGlasList from '@/assets/list/boy/glasList.json'
import boyHairList from '@/assets/list/boy/hairList.json'
import boyCsetList from '@/assets/list/boy/csetList.json'

const FACE_IMG: string = new URL(`../assets/img/base/face.png`, import.meta.url).href
const PAGE_SIZE: number = 12

const type = ref('cset')

const imgs = useImageStore()
const gender = useWardrobeStore().getGender

const base = ref(FACE_IMG)
const items = ref<any[]>([])

const infos = ref<any>({
    cset: {
        boy: {json: boyCsetList, list: [], page: 1, total: 1 },
        girl: {json: girlCsetList, list: [], page: 1, total: 1 },
    },
    hair: {
        boy: {json: boyHairList, list: [], page: 1, total: 1 },
        girl: {json: girlHairList, list: [], page: 1, total: 1 },
    },
    glas: {
        boy: {json: boyGlasList, list: [], page: 1, total: 1 },
        girl: {json: girlGlasList, list: [], page: 1, total: 1 },
    },
})

const buildList = () => {
    for (var type in infos.value) {
        for (var gender in infos.value[type]) {
            const elem = infos.value[type][gender]
            for (var name in elem.json)
                elem.list.push({
                    img: new URL(`../assets/img/${type}/${gender}/${name}`, import.meta.url).href, 
                    title: elem.json[name] == '' ? name : elem.json[name],
                    name: name,
                })
            elem.total = Math.floor(elem.list.length / PAGE_SIZE) + 1
        }
    }
}

const setType = (typeTo: any) => {
    type.value = typeTo
    setPage(type.value, gender, infos.value[type.value][gender].page)
}

const setGender = () => setPage(
    type.value, gender, infos.value[type.value][gender].page
)

const setPage = async (type: string, gender: string, page: number) => {
    infos.value[type][gender].page = page;
    const offset = (infos.value[type][gender].page - 1) * PAGE_SIZE
    const list = infos.value[type][gender].list
    items.value.length = 0;
    for (var i = 0; i < PAGE_SIZE; i++)
        items.value[i] = list[i + offset]
}

const clickItem = (event: any) => imgs.setImage(type.value, event.target.src)

onMounted(() => {
    buildList()
    setPage(type.value, gender, 1)
})

defineExpose({ setGender })

</script>

<template>
    <div class="backpack-container">
        <div class="tabs top">
            <div class="tab" :class="{'selected': type == 'cset'}" @click="setType('cset')" >套装</div>
            <div class="tab" :class="{'selected': type == 'hair'}" @click="setType('hair')" >头发</div>
            <div class="tab" :class="{'selected': type == 'glas'}" @click="setType('glas')" >眼瞳</div>
        </div>
        <div class="items">
            <div class="item" v-for="(i, index) in PAGE_SIZE" :class="{'hide': items[i - 1] == undefined}">  
                <div class="canva">
                    <img alt="" class="itemImg back" :class="type" :src="items[i - 1]?.img" />
                    <img alt="" class="baseImg" :class="type" :src="base" />
                    <img alt="" class="itemImg front" 
                        :class="type" 
                        :src="items[index]?.img" 
                        :title="items[index]?.title" 
                        :name="items[index]?.name"
                        @click="$emit('click-item', clickItem($event))"
                    />
                </div>
            </div>
        </div>
        <div class="tabs bottom">
            <div class="tab" @click="setPage(type, gender, Math.max(infos[type][gender].page - 1, 1))"><</div>
            <div class="tab">{{ infos[type][gender].page }} / {{ infos[type][gender].total }}</div>
            <div class="tab" @click="setPage(type, gender, Math.min(infos[type][gender].page + 1, infos[type][gender].total))">></div>
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
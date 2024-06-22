<script setup lang="ts">
import { onMounted, ref, defineExpose } from 'vue'
import girlGlasList from '@/assets/list/girl/glasList.json'
import girlHairList from '@/assets/list/girl/hairList.json'
import girlCsetList from '@/assets/list/girl/csetList.json'
import boyGlasList from '@/assets/list/boy/glasList.json'
import boyHairList from '@/assets/list/boy/hairList.json'
import boyCsetList from '@/assets/list/boy/csetList.json'

const props = withDefaults(defineProps<{
    type: string
    gender: string
}>(), {
    type: 'cset',
    gender: 'girl'
})

const PAGE_SIZE: number = 12

const type = ref(props.type)
const gender = ref(props.gender)

const face = ref(new URL(`../assets/img/wardrobe/base/face.png`, import.meta.url).href)
const itemImgs = ref<any[]>([])

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
                    img: new URL(`../assets/img/wardrobe/${type}/${gender}/${name}`, import.meta.url).href, 
                    name: elem.json[name] == '' ? name : elem.json[name]
                })
            elem.total = Math.floor(elem.list.length / PAGE_SIZE) + 1
        }
    }
}

const clickTab = (typeTo: any) => {
    type.value = typeTo
    setPage(type.value, gender.value, infos.value[type.value][gender.value].page)
}

const setGender = (genderTo: string) => {
    gender.value = genderTo
    setPage(type.value, gender.value, infos.value[type.value][gender.value].page)
}

const setPage = (type: string, gender: string, page: number) => {
    infos.value[type][gender].page = page;

    const offset = (infos.value[type][gender].page - 1) * PAGE_SIZE
    const list = infos.value[type][gender].list

    for (var i = 0; i < PAGE_SIZE; i++)
        itemImgs.value[i] = list[i + offset]
}

const clickItem = (event: any) => { 
    return {type: type.value, res: event.target.src, name: event.target.title}
}

defineExpose({ setGender })

onMounted(() => {
    buildList()
    setPage(type.value, gender.value, 1)
})

</script>

<template>
    <div class="backpack-container">
        <div class="tabs top">
            <div class="tab" :class="{'selected': type == 'cset'}" @click="clickTab('cset')" >套装</div>
            <div class="tab" :class="{'selected': type == 'hair'}" @click="clickTab('hair')" >头发</div>
            <div class="tab" :class="{'selected': type == 'glas'}" @click="clickTab('glas')" >眼瞳</div>
        </div>
        <div class="items">
            <div class="item" v-for="i in 12">  
                <div class="canva">
                    <img class="itemImg back" :src="itemImgs[i - 1]?.img" :class="type" alt="" />
                    <img class="baseImg" :src="itemImgs[i - 1] == undefined ? '' : face" :class="type" alt="" />
                    <img class="itemImg front" :src="itemImgs[i - 1]?.img" :title="itemImgs[i - 1]?.name" :class="type" @click="$emit('click-item', clickItem($event))" alt="" />
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
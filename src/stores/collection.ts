import { defineStore } from "pinia"
import girlGlasList from '@/assets/json/girl/glasList.json'
import girlHairList from '@/assets/json/girl/hairList.json'
import girlCsetList from '@/assets/json/girl/csetList.json'
import boyGlasList from '@/assets/json/boy/glasList.json'
import boyHairList from '@/assets/json/boy/hairList.json'
import boyCsetList from '@/assets/json/boy/csetList.json'
import allCsetList from '@/assets/json/all/csetList.json'
import { computed, ref } from "vue"
import { useConst } from '@/hooks/useConst'

export const useCollectionStore = defineStore('collection', () => {

    const { PAGE_SIZE } = useConst()

    const build = (json: any, type: string, gender: string) => {
        let list = []
        for (var name in json) {
            if (type == 'glas' && !name.includes('Animate'))
                continue
            list.push({ 
                name: name,
                title: json[name],
                img: new URL(`../assets/img/${type}/${gender}/${name}`, import.meta.url).href, 
                type: type,
                gender: gender
            })
        }
        list = list.sort((a, b) => a.name.length == b.name.length ? (a.name > b.name ? 1 : -1) : a.name.length - b.name.length)
        return { type: type, gender: gender, list: list, page: 1, total: Math.floor(list.length / PAGE_SIZE) + 1}
    }
    
    const collections = ref<any>({
        cset: {
            boy: build(boyCsetList, 'cset', 'boy'),
            girl: build(girlCsetList, 'cset', 'girl'),
            all: build(allCsetList, 'cset', 'all')
        },
        hair: {
            boy: build(boyHairList, 'hair', 'boy'),
            girl: build(girlHairList, 'hair', 'girl'),
            all: build({}, 'hair', 'all')
        },
        glas: {
            boy: build(boyGlasList, 'glas', 'boy'),
            girl: build(girlGlasList, 'glas', 'girl'),
            all: build({}, 'glas', 'all')
        }
    })
    
    const getCollection = computed(() => collections.value[getType.value][gender.value])

    const getItems = computed(() => {
        const items = []
        const offset = (getCollection.value.page - 1) * PAGE_SIZE  
        for (let i = 0; i < PAGE_SIZE; i++)
            if (i + offset < getCollection.value.list?.length)
                items[i] = getCollection.value.list[i + offset]
        return items
    })

    let code = 0;
    
    const type = ref('cset')
    const gender = ref('girl')

    const getType = computed(() => type.value)
    const setType = (target: string) => type.value = target;

    const getGender = computed(() => gender.value)
    const toggleGender = () => {
        code = (code + 1) % 3
        switch(code) {
            case 0: gender.value = 'girl'
                break
            case 1: gender.value = 'boy'
                break
            case 2: gender.value = 'all'
                break
        }
        return gender.value
    }
    
    const setPage = (page: number) => getCollection.value.page = Math.max(Math.min(page, getCollection.value.total), 1)

    return { getCollection, getItems, getType, getGender, setType, setPage, toggleGender }
})
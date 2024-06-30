import { defineStore, storeToRefs } from "pinia"
import girlGlasList from '@/assets/list/girl/glasList.json'
import girlHairList from '@/assets/list/girl/hairList.json'
import girlCsetList from '@/assets/list/girl/csetList.json'
import boyGlasList from '@/assets/list/boy/glasList.json'
import boyHairList from '@/assets/list/boy/hairList.json'
import boyCsetList from '@/assets/list/boy/csetList.json'
import { computed, ref } from "vue"
import { useConst } from '@/hooks/useConst'
import { useWardrobeStore } from '@/stores/wardrobe'

export const useCollectionStore = defineStore('collection', () => {

    const { PAGE_SIZE } = useConst()

    const build = (json: any, type: string, gender: string) => {
        const list = []
        for (var name in json)
            list.push({ 
                type: type,
                gender: gender,
                name: name,
                img: new URL(`../assets/img/${type}/${gender}/${name}`, import.meta.url).href, 
                title: json[name] == '' ? name : json[name]
            })
        return { type: type, gender: gender, list: list, page: 1, total: Math.floor(list.length / PAGE_SIZE) + 1}
    }
    
    const collections = ref<any>({
        cset: {
            boy: build(boyCsetList, 'cset', 'boy'),
            girl: build(girlCsetList, 'cset', 'girl'),
        },
        hair: {
            boy: build(boyHairList, 'hair', 'boy'),
            girl: build(girlHairList, 'hair', 'girl'),
        },
        glas: {
            boy: build(boyGlasList, 'glas', 'boy'),
            girl: build(girlGlasList, 'glas', 'girl'),
        }
    })

    const getCollection = computed(() => collections.value[getType.value][gender.value])

    const getItems = computed(() => {
        const items = []
        const offset = (getCollection.value.page - 1) * PAGE_SIZE  
        for (let i = 0; i < PAGE_SIZE; i++)
            items[i] = getCollection.value.list[i + offset]
        return items
    })
    
    const type = ref('cset')
    const gender = storeToRefs(useWardrobeStore()).getGender

    const getType = computed(() => type.value)
    const setType = (target: string) => type.value = target;

    const prePage = () => getCollection.value.page = Math.max(getCollection.value.page - 1, 1)
    const nextPage = () => getCollection.value.page = Math.min(getCollection.value.page + 1, getCollection.value.total)

    return { getCollection, getItems, getType, setType, prePage, nextPage }
})
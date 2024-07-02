import { defineStore, storeToRefs } from "pinia"
import girlGlasList from '@/assets/json/girl/glasList.json'
import girlHairList from '@/assets/json/girl/hairList.json'
import girlCsetList from '@/assets/json/girl/csetList.json'
import boyGlasList from '@/assets/json/boy/glasList.json'
import boyHairList from '@/assets/json/boy/hairList.json'
import boyCsetList from '@/assets/json/boy/csetList.json'
import { computed, onMounted, ref } from "vue"
import { useConst } from '@/hooks/useConst'
import { useWardrobeStore } from '@/stores/wardrobe'

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
        list = list.sort((a, b) => a.name.length > b.name.length || a.name > b.name ? 1 : -1)
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
    
    const setPage = (page: number) => getCollection.value.page = Math.max(Math.min(page, getCollection.value.total), 1)

    return { getCollection, getItems, getType, setType, setPage }
})
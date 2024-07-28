import { defineStore, storeToRefs } from "pinia"
import { computed, ref, watch } from 'vue'
import { useConst } from "@/hooks/useConst"

export const useShowcaseStore = defineStore('showcaseStore', () => {
    
    const { BOY_BASE_IMG, GIRL_BASE_IMG } = useConst()

    const gender = ref('girl')

    const images = new Map()
    images.set('base', new Image())
    images.set('cset', new Image())
    images.set('hair', new Image())
    images.set('glas', new Image())
    images.set('glam', new Image())

    const getImage = (type: string) => images.get(type)
    const setImage = (type: string, img: string) => images.get(type).src = img
    
    const getGender = computed(() => gender.value)
    const toggleGender = () => gender.value = (gender.value == 'girl' ? 'boy' : 'girl')

    const setOnload = (fun: any) => images.forEach((img: HTMLImageElement) => img.onload = fun)
    const setImageByItem = ({type, img}: {type: string, img: string}) => setImage(type, img)
    
    watch(() => gender.value, gender => setImage('base', gender == 'girl' ? GIRL_BASE_IMG : BOY_BASE_IMG))

    return { getImage, getGender, setImage, setOnload, setImageByItem, toggleGender }
})
import { defineStore, storeToRefs } from "pinia"
import { watch } from 'vue'
import { useWardrobeStore } from "./wardrobe"
import { useConst } from "@/hooks/useConst"

export const useImageStore = defineStore('image', () => {
    
    const { GIRL_BASE_IMG, BOY_BASE_IMG } = useConst()

    const gender = storeToRefs(useWardrobeStore()).getGender

    const images = new Map()
    images.set('base', new Image())
    images.set('cset', new Image())
    images.set('hair', new Image())
    images.set('glas', new Image())
    images.set('glam', new Image())

    const getImage = (type: string) => images.get(type)
    const setImage = (type: string, img: string) => images.get(type).src = img

    const setOnload = (fun: any) => images.forEach((img: HTMLImageElement) => img.onload = fun)
    const setImageByItem = ({type, img}: {type: string, img: string}) => setImage(type, img)
    
    watch(() => gender.value, gender => setImage('base', gender == 'girl' ? GIRL_BASE_IMG : BOY_BASE_IMG))

    return { getImage, setImage, setOnload, setImageByItem }
})
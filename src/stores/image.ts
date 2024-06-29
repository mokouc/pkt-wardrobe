import { defineStore } from "pinia"
import { computed, reactive } from "vue"

export const useImageStore = defineStore('image', () => {
    const images = new Map()
    images.set('base', new Image())
    images.set('cset', new Image())
    images.set('hair', new Image())
    images.set('glas', new Image())
    images.set('glam', new Image())

    const getImages = computed(() => images)
    
    const setImage = (type: string, img: string) => images.get(type).src = img
    const setOnload = (fun: any) => images.forEach((img: HTMLImageElement) => img.onload = fun)

    return { imgs: getImages, setImage, setOnload }
})
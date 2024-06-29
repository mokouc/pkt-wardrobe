import { defineStore } from "pinia"
import { computed, ref } from "vue"

export const useWardrobeStore = defineStore('wardrobe', () => {
    const gender = ref('girl')

    const getGender = computed(() => gender.value)
    
    const toggleGender = () => gender.value = (gender.value == 'girl' ? 'boy' : 'girl')

    return { getGender, toggleGender }
})
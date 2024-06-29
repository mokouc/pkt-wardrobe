import { defineStore } from "pinia"
import { computed } from "vue"

const CANVAS_WIDTH = 143 
const CANVAS_HEIGHT = 152

export const usePositionStore = defineStore('position', () => {
    const position = [
        { type: 'hair', sx: 600, sy: 150, sw: 100, sh: 150, x: 1, y: 1, w: 100, h: 150 },
        { type: 'base', sx: 0, sy: 0, sw: CANVAS_WIDTH, sh: CANVAS_HEIGHT, x: 0, y: 0, w: CANVAS_WIDTH, h: CANVAS_HEIGHT },
        { type: 'glas', sx: 0, sy: 0, sw: 100, sh: 150, x: 1, y: 1, w: 100, h: 150 },
        { type: 'cset', sx: 600, sy: 300, sw: 100, sh: 150, x: 1, y: 1, w: 100, h: 150 },
        { type: 'hair', sx: 600, sy: 0, sw: 100, sh: 150, x: 1, y: 1, w: 100, h: 150 },
        { type: 'hair', sx: 0, sy: 0, sw: 40, sh: 60, x: 102, y: 30, w: 40, h: 60 },        // mini front hair
        { type: 'cset', sx: 0, sy: 60, sw: 40, sh: 60, x: 102, y: 30, w: 40, h: 60 },       // mini front body
        { type: 'cset', sx: 0, sy: 300, sw: 40, sh: 60, x: 102, y: 30, w: 40, h: 60 },      // mini front leg
        { type: 'cset', sx: 0, sy: 120, sw: 40, sh: 60, x: 102, y: 30, w: 40, h: 60 },      // mini front hand
        { type: 'cset', sx: 0, sy: 480, sw: 40, sh: 60, x: 102, y: 91, w: 40, h: 60 },      // mini back body
        { type: 'cset', sx: 0, sy: 720, sw: 40, sh: 60, x: 102, y: 91, w: 40, h: 60 },      // mini back leg
        { type: 'cset', sx: 0, sy: 600, sw: 40, sh: 60, x: 102, y: 91, w: 40, h: 60 },      // mini back hand
        { type: 'hair', sx: 0, sy: 420, sw: 40, sh: 60, x: 102, y: 91, w: 40, h: 60 },      // mini back hair
    ]

    const pos = computed(() => position)

    return { pos }
})
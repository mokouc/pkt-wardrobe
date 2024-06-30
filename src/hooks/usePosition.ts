import { useConst } from "./useConst"

export const usePosition = () => {
    
    const { SHOWCASE_WIDTH, SHOWCASE_HEIGHT } = useConst()

    const position = [
        // main
        { type: 'hair', sx: 600, sy: 150, sw: 100, sh: 150, x: 1, y: 1, w: 100, h: 150 },
        { type: 'base', sx: 0, sy: 0, sw: SHOWCASE_WIDTH, sh: SHOWCASE_HEIGHT, x: 0, y: 0, w: SHOWCASE_WIDTH, h: SHOWCASE_HEIGHT },
        { type: 'glas', sx: 0, sy: 0, sw: 100, sh: 150, x: 1, y: 1, w: 100, h: 150 },
        { type: 'cset', sx: 600, sy: 300, sw: 100, sh: 150, x: 1, y: 1, w: 100, h: 150 },
        { type: 'hair', sx: 600, sy: 0, sw: 100, sh: 150, x: 1, y: 1, w: 100, h: 150 },
        // mini
        { type: 'glam', sx: 0, sy: 0, sw: 40, sh: 60, x: 102, y: 30, w: 40, h: 60 },        // front glas
        { type: 'hair', sx: 0, sy: 0, sw: 40, sh: 60, x: 102, y: 30, w: 40, h: 60 },        // front hair
        { type: 'cset', sx: 0, sy: 60, sw: 40, sh: 60, x: 102, y: 30, w: 40, h: 60 },       // front body
        { type: 'cset', sx: 0, sy: 300, sw: 40, sh: 60, x: 102, y: 30, w: 40, h: 60 },      // front leg
        { type: 'cset', sx: 0, sy: 120, sw: 40, sh: 60, x: 102, y: 30, w: 40, h: 60 },      // front hand
        { type: 'cset', sx: 0, sy: 480, sw: 40, sh: 60, x: 102, y: 91, w: 40, h: 60 },      // back body
        { type: 'cset', sx: 0, sy: 720, sw: 40, sh: 60, x: 102, y: 91, w: 40, h: 60 },      // back leg
        { type: 'cset', sx: 0, sy: 600, sw: 40, sh: 60, x: 102, y: 91, w: 40, h: 60 },      // back hand
        { type: 'hair', sx: 0, sy: 420, sw: 40, sh: 60, x: 102, y: 91, w: 40, h: 60 },      // back hair
    ]

    return { position }
}
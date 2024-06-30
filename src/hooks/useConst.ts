
export const useConst = () => {
    
    const SHOWCASE_WIDTH = 143 
    const SHOWCASE_HEIGHT = 152

    const ITEM_CELL_WIDTH = 140
    const ITEM_CELL_HEIGHT = 140

    const PAGE_SIZE = 12

    const BOY_BASE_IMG = new URL('../assets/img/base/boy.png', import.meta.url).href
    const GIRL_BASE_IMG = new URL('../assets/img/base/girl.png', import.meta.url).href
    const FACE_BASE_IMG = new URL('../assets/img/base/face.png', import.meta.url).href

    return { SHOWCASE_WIDTH, SHOWCASE_HEIGHT, ITEM_CELL_WIDTH, ITEM_CELL_HEIGHT, PAGE_SIZE, BOY_BASE_IMG, GIRL_BASE_IMG, FACE_BASE_IMG }
}
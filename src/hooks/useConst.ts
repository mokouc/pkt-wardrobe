
export const useConst = () => {
    
    const CANVAS_WIDTH = 143 
    const CANVAS_HEIGHT = 152

    const PAGE_SIZE = 12

    const FACE_BASE_IMG = new URL('../assets/img/base/face.png', import.meta.url).href
    const GIRL_BASE_IMG = new URL('../assets/img/base/girl.png', import.meta.url).href
    const BOY_BASE_IMG = new URL('../assets/img/base/boy.png', import.meta.url).href

    return { CANVAS_WIDTH, CANVAS_HEIGHT, PAGE_SIZE, FACE_BASE_IMG, BOY_BASE_IMG, GIRL_BASE_IMG}
}
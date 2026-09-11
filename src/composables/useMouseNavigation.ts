import {ref} from "vue";

// 鼠标导航Composable
export function useMouseNavigation() {
    const mouseSelectedIndex = ref(-1)

    const setMouseSelectedIndex = (index: number) => {
        mouseSelectedIndex.value = index
    }

    const resetMouseSelection = () => {
        mouseSelectedIndex.value = -1
    }

    return {
        mouseSelectedIndex,
        setMouseSelectedIndex,
        resetMouseSelection
    }
}
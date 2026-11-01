import {ref, type Ref, nextTick} from "vue"

interface UseKeyboardNavigationOptions {
    dataList: Ref<string[]>
    containerRef: Ref<HTMLElement | null>
    onSelect?: (item: string) => void
}

// 键盘导航Composable
export function useKeyboardNavigation(options: UseKeyboardNavigationOptions) {
    const {dataList, containerRef, onSelect} = options
    const keyboardSelectedIndex = ref(-1)
    // 键盘导航启动的状态
    const isKeyboardNavigating = ref(false)

    // 自动滚动到可视区域
    const scrollToSelected = () => {
        if (!containerRef.value || keyboardSelectedIndex.value < 0) return
        void nextTick(() => {
            const el = containerRef.value instanceof HTMLElement
                ? containerRef.value
                : (containerRef.value as any).$el as HTMLElement
            const selectedElement = el?.querySelector('.selected') as HTMLElement
            if (selectedElement) {
                selectedElement.scrollIntoView({block: 'nearest', behavior: 'smooth'})
            }
        })
    }

    // 按键监听, 切换选项
    const handleKeyDown = (e: KeyboardEvent) => {
        if (!dataList.value.length) return
        switch(e.key) {
            case 'ArrowDown':
                e.preventDefault()
                isKeyboardNavigating.value = true
                keyboardSelectedIndex.value = (keyboardSelectedIndex.value + 1) % dataList.value.length
                scrollToSelected()
                break
            case 'ArrowUp':
                e.preventDefault()
                isKeyboardNavigating.value = true
                keyboardSelectedIndex.value = keyboardSelectedIndex.value <= 0 ? dataList.value.length - 1 : keyboardSelectedIndex.value - 1
                scrollToSelected()
                break
            case 'Enter':
                if (isKeyboardNavigating.value && keyboardSelectedIndex.value >= 0 && keyboardSelectedIndex.value < dataList.value.length) {
                    e.preventDefault()
                    onSelect?.(dataList.value[keyboardSelectedIndex.value])
                }
                break
        }
    }

    // 重置键盘选择函数
    const resetKeyboardSelection = () => {
        keyboardSelectedIndex.value = -1
        isKeyboardNavigating.value = false
    }

    // 设置键盘选中索引函数
    const setKeyboardSelectedIndex = (index: number) => {
        keyboardSelectedIndex.value = index
        isKeyboardNavigating.value = false
    }

    return {
        keyboardSelectedIndex,
        isKeyboardNavigating,
        handleKeyDown,
        resetKeyboardSelection,
        setKeyboardSelectedIndex
    }
}
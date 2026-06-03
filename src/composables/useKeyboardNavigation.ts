import {ref, type Ref, nextTick} from "vue"

interface UseKeyboardNavigationOptions {
    dataList: Ref<string[]>
    containerRef: Ref<HTMLElement | null>
    onSelect?: (item: string) => void
}

export function useKeyboardNavigation(options: UseKeyboardNavigationOptions) {
    const {dataList, containerRef, onSelect} = options
    const selectedIndex = ref(-1)
    const isKeyboardNavigating = ref(false)

    const scrollToSelected = () => {
        if (!containerRef.value || selectedIndex.value < 0) return
        nextTick(() => {
            const selectedElement = containerRef.value?.querySelector('.selected') as HTMLElement
            if (selectedElement) {
                selectedElement.scrollIntoView({block: 'nearest', behavior: 'smooth'})
            }
        })
    }

    const handleKeyDown = (e: KeyboardEvent) => {
        if (!dataList.value.length) return

        switch(e.key) {
            case 'ArrowDown':
                e.preventDefault()
                isKeyboardNavigating.value = true
                selectedIndex.value = (selectedIndex.value + 1) % dataList.value.length
                scrollToSelected()
                break
            case 'ArrowUp':
                e.preventDefault()
                isKeyboardNavigating.value = true
                selectedIndex.value = selectedIndex.value <= 0 ? dataList.value.length - 1 : selectedIndex.value - 1
                scrollToSelected()
                break
            case 'Enter':
                if (selectedIndex.value >= 0 && selectedIndex.value < dataList.value.length) {
                    e.preventDefault()
                    onSelect?.(dataList.value[selectedIndex.value])
                }
                break
        }
    }

    const handleMouseMove = () => {
        isKeyboardNavigating.value = false
        selectedIndex.value = -1
    }

    const resetSelection = () => {
        selectedIndex.value = -1
        isKeyboardNavigating.value = false
    }

    return {
        selectedIndex,
        isKeyboardNavigating,
        handleKeyDown,
        handleMouseMove,
        resetSelection
    }
}
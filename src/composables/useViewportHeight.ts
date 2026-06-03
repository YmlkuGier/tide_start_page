import {nextTick, type Ref} from "vue"

export function useViewportHeight(containerRef: Ref<HTMLElement | null>) {
    const adjustHeightToFitViewport = () => {
        if (!containerRef.value) return
        const viewportHeight = window.innerHeight
        const rect = containerRef.value.getBoundingClientRect()
        const bottomSpace = viewportHeight - rect.top
        const maxHeight = Math.max(bottomSpace - 20, 100)
        containerRef.value.style.maxHeight = `${maxHeight}px`
        containerRef.value.style.overflowY = 'auto'
    }

    const initHeightAdjustment = () => {
        nextTick(() => {
            adjustHeightToFitViewport()
        })
    }

    return {
        adjustHeightToFitViewport,
        initHeightAdjustment
    }
}
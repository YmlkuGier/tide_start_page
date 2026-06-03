import {nextTick, type Ref} from "vue"

export function useViewportHeight(containerRef: Ref<HTMLElement | null>) {
    const adjustHeightToFitViewport = () => {
        if (!containerRef.value) return
        // 处理组件实例的情况，通过 $el 获取实际 DOM 元素
        const element = (containerRef.value as any).$el || containerRef.value
        if (!(element instanceof HTMLElement)) return
        const viewportHeight = window.innerHeight
        const rect = element.getBoundingClientRect()
        const bottomSpace = viewportHeight - rect.top
        const maxHeight = Math.max(bottomSpace - 20, 100)
        element.style.maxHeight = `${maxHeight}px`
        element.style.overflowY = 'auto'
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
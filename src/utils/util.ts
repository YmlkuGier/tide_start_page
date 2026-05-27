import {onMounted, onBeforeUnmount, type Ref} from "vue";

export const useClickOutside = (
    elementRef: Ref<HTMLElement | null>,
    callback: () => void
) => {

    const handler = (event: MouseEvent) => {
        const target = event.target as Node

        if (
            elementRef.value &&
            !elementRef.value.contains(target)
        ) {
            callback()
        }
    }

    onMounted(() => {
        document.addEventListener('mousedown', handler)
    })

    onBeforeUnmount(() => {
        document.removeEventListener('mousedown', handler)
    })
}
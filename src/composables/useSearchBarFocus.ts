import {ref} from "vue";

const expand = ref(false);

export function useSearchBarFocus(event: { key: string; keyCode: number; preventDefault: () => void; stopPropagation: () => void }) {
    if (event.key === 'Tab' || event.keyCode === 9) {
        // 阻止浏览器默认行为
        event.preventDefault()

        // 阻止事件冒泡到父级
        event.stopPropagation()

        if (!expand.value) {
            console.log(expand.value)
            document.getElementById("input")?.focus()
            expand.value = true
        } else {
            document.getElementById("input")?.blur()
            expand.value = false
        }
    }
}
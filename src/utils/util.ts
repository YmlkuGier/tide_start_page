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

export const debounce = (
    fn: Function,
    delay: number
) => {
    let t: number | null = null
    return function (this: any) {
        if (t !== null) {
            clearTimeout(t)
        }
        t = setTimeout(() => {
            fn.call(this)
        }, delay)
    }
}

export const keyLabels: Record<string, string> = {
    ' ': 'Space',
    Escape: 'Esc',
    ArrowDown: 'ArrowDown',
    ArrowLeft: 'ArrowLeft',
    ArrowRight: 'ArrowRight',
    ArrowUp: 'ArrowUp',
    Backquote: 'Backquote',
    Backspace: 'Backspace',
    Delete: 'Delete',
    Enter: 'Enter',
    Insert: 'Insert',
    PageDown: 'PageDown',
    PageUp: 'PageUp',
    Tab: 'Tab',
    '+': 'Plus',
    '-': 'Minus',
    '=': 'Equal',
    ',': 'Comma',
    '.': 'Period',
    '/': 'Slash',
    '\\': 'Backslash',
    ';': 'Semicolon',
    "'": 'Quote',
    '[': 'BracketLeft',
    ']': 'BracketRight',
}
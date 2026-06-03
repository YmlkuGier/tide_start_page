import {ref} from "vue"
import _ from "lodash"

export function useSearchSuggestion() {
    const suggestList = ref<string[]>([])

    const getSuggest = _.debounce(async (val: string) => {
        if (!val) {
            suggestList.value = []
            return
        }
        try {
            const isExtension = window.location.protocol === 'chrome-extension:' ||
                window.location.protocol === 'moz-extension:' ||
                window.location.protocol === 'safari-extension:'
            const apiUrl = isExtension
                ? `https://suggestion.baidu.com/su?wd=${encodeURIComponent(val)}`
                : `/baidu/su?wd=${encodeURIComponent(val)}`
            const res = await fetch(apiUrl)
            const buffer = await res.arrayBuffer()
            const bytes = new Uint8Array(buffer)
            let text: string
            try {
                const decoder = new TextDecoder('gbk')
                text = decoder.decode(bytes)
            } catch (e) {
                const blob = new Blob([bytes])
                text = await blob.text()
            }
            const start = text.indexOf('[')
            const end = text.lastIndexOf(']') + 1
            suggestList.value = JSON.parse(text.slice(start, end))
        } catch (error) {
            console.error('获取搜索建议失败:', error)
            suggestList.value = []
        }
    }, 200)

    const clearSuggestions = () => {
        suggestList.value = []
    }

    return {
        suggestList,
        getSuggest,
        clearSuggestions
    }
}
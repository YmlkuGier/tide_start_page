import {ref} from "vue"
import { HistoryRepository } from "@/database/history"

export function useSearchHistory() {
    const historyList = ref<string[]>([])

    const addSearchHistory = async (keyword: string) => {
        await HistoryRepository.add(keyword)
    }

    return {
        historyList,
        addSearchHistory
    }
}
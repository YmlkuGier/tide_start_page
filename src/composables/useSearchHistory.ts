import { HistoryRepository } from "@/database/history"
import {onMounted, type Ref, ref} from "vue";

interface HistoryItem {
    id: number
    keyword: string
}

export function useSearchHistory() {

    const searchHistory: Ref<HistoryItem[]> = ref([])

    const addSearchHistory = async (keyword: string) => {
        await HistoryRepository.add(keyword)
        searchHistory.value = await getSearchHistory()
    }

    const getSearchHistory = async () => {
        const records = await HistoryRepository.getAll()
        return records.map((record: any) => ({
            id: record.id,
            keyword: record.keyword
        }))
    }

    const deleteSearchHistory = async (id: number) => {
        if (!id) return
        await HistoryRepository.delete(id)
        searchHistory.value = await getSearchHistory()
    }

    onMounted(async () => {
        searchHistory.value = await getSearchHistory()
    })

    return {
        searchHistory,
        addSearchHistory,
        getSearchHistory,
        deleteSearchHistory
    }
}
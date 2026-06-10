import { HistoryRepository } from "@/database/history"
import {onMounted, type Ref, ref} from "vue";

export function useSearchHistory() {

    const searchHistory: Ref<string[]> = ref([])

    const addSearchHistory = async (keyword: string) => {
        await HistoryRepository.add(keyword)
        searchHistory.value = await getSearchHistory()
    }

    const getSearchHistory = async () => {
        const records = await HistoryRepository.getAll()
        return records.map((record: any) => record.keyword)
    }

    onMounted(async () => {
        searchHistory.value = await getSearchHistory()
    })

    return {
        searchHistory,
        addSearchHistory,
        getSearchHistory
    }
}
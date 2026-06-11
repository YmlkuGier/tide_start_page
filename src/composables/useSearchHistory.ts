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

    const deleteSearchHistory = async (keyword: string) => {
        const id = await HistoryRepository.getIdByKeyword(keyword)
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
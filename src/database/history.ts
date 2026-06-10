import { db } from "@/database"

export class HistoryRepository {

    static async add(keyword: string) {
        if (!keyword.trim()) return
        await db.table("searchHistory").add({
            keyword: keyword.trim()
        })
    }

    static async delete(id: number) {
        if (!id || id <= 0) return
        await db.table("searchHistory").delete(id)
    }

}
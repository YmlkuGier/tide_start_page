import { db } from "@/database"

export class HistoryRepository {

    static async add(keyword: string) {
        if (!keyword.trim()) return
        await db.table("searchHistory").add({
            keyword: keyword.trim()
        })
    }

    static async getAll() {
        return db.table("searchHistory").limit(10).toArray()
    }

    static async delete(id: number) {
        if (!id || id <= 0) return
        await db.table("searchHistory").delete(id)
    }

    static async getIdByKeyword(keyword: string) {
        if (!keyword.trim()) return null
        const record = await db.table("searchHistory").filter(item => item.keyword === keyword.trim()).first()
        return record ? record.id : null
    }

}
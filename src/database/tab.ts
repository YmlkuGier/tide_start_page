import { db } from "@/database"

export class TabRepository {

    static async add(tabName: string, tabUrl: string, tabHotkey: string, tabIcon: Blob | null) {
        if (!tabName.trim() || !tabUrl.trim() || !tabHotkey.trim()) return
        await db.table("tabBar").add({
            tabName: tabName,
            tabUrl: tabUrl,
            tabHotkey: tabHotkey,
            tabIcon: tabIcon
        })
    }

    static async getAll() {
        return db.table("tabBar").orderBy('id').reverse().limit(10).toArray()
    }

    static async getTabById(id: number) {
        if (!id || id <= 0) return
        return await db.table("tabBar").get(id)
    }

    static async updateTabById(id: number, tabName: string, tabUrl: string, tabHotkey: string, tabIcon: Blob) {
        if (!id || id <= 0) return
        if (!tabName.trim() || !tabUrl.trim() || !tabHotkey.trim() || tabIcon.size<=0) return
        await db.table("tabBar").update(
            id,
            {
                tabName: tabName,
                tabUrl: tabUrl,
                tabHotkey: tabHotkey,
                tabIcon: tabIcon
            },
        )
    }

    static async delete(id: number) {
        if (!id || id <= 0) return
        await db.table("tabBar").delete(id)
    }

}

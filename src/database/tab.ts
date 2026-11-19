import { db } from "@/database"
import {notify} from "@/components/notification";

// 书签栏数据库控制函数
export class TabRepository {

    static async add(tabName: string, tabUrl: string, tabHotkey: string, tabIcon: Blob | null): Promise<boolean> {
        if (!tabName.trim() || !tabUrl.trim()) {
            notify({ type: "warning", title: "添加失败", message: "书签名或书签url为空" })
            return false
        }
        try {
            await db.table("tabBar").add({
                tabName: tabName,
                tabUrl: tabUrl,
                tabHotkey: tabHotkey,
                tabIcon: tabIcon
            })
        } catch (e: unknown) {
            if (e instanceof Error) {
                notify({ type: "error", title: "添加失败", message: e.message })
            } else {
                notify({ type: "error", title: "添加失败", message: "未知错误" })
                console.error(e)
            }
            return false
        }
        notify({ type: "success", title: "添加成功", message: "书签添加成功" })
        return true
    }

    static async getAll() {
        return db.table("tabBar").orderBy('id').reverse().limit(10).toArray()
    }

    static async getTabById(id: number) {
        if (!id || id <= 0) return
        return await db.table("tabBar").get(id)
    }

    static async updateTabById(id: number, tabName: string, tabUrl: string, tabHotkey: string, tabIcon: Blob | null): Promise<boolean> {
        if (!id || id <= 0) {
            notify({ type: "warning", title: "修改失败", message: "书签不存在" })
            return false
        }
        if (!tabName.trim() || !tabUrl.trim()) {
            notify({ type: "warning", title: "修改失败", message: "书签名或书签url为空" })
            return false
        }
        try {
            await db.table("tabBar").update(
                id,
                {
                    tabName: tabName,
                    tabUrl: tabUrl,
                    tabHotkey: tabHotkey,
                    tabIcon: tabIcon
                },
            )
        } catch (e: unknown) {
            if (e instanceof Error) {
                notify({ type: "error", title: "添加失败", message: e.message })
            } else {
                notify({ type: "error", title: "添加失败", message: "未知错误" })
                console.error(e)
            }
            return false
        }
        notify({ type: "success", title: "修改成功", message: "书签修改成功" })
        return true
    }

    static async delete(id: number): Promise<boolean> {
        if (!id || id <= 0) {
            notify({ type: "warning", title: "删除失败", message: "书签不存在" })
            return false
        }
        try {
            await db.table("tabBar").delete(id)
        } catch (e: unknown) {
            if (e instanceof Error) {
                notify({ type: "error", title: "删除失败", message: e.message })
            } else {
                notify({ type: "error", title: "删除失败", message: "未知错误" })
                console.error(e)
            }
            return false
        }
        notify({ type: "success", title: "删除成功", message: "书签删除成功" })
        return true
    }

}

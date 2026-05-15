import { createRouter, createWebHistory } from 'vue-router';
import Homepage from "../view/homepage.vue";
import SettingsPage from "../view/SettingsPage.vue";
import AboutPage from "@/view/setting/aboutPage.vue";

const routes = [
    {
        path: '/',
        name: 'Homepage',
        component: Homepage
    },
    {
        path: '/settings',
        name: 'Settings',
        component: SettingsPage,
        redirect: '/settings/about',
        children: [
            {
                path: 'about',
                name: 'about',
                component: AboutPage
            }
        ]
    }
]

// 创建路由实例
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

// 导出
export default router
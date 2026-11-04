import {createRouter, createWebHashHistory} from 'vue-router';
import Homepage from "@/view/HomePage.vue";
import SettingsPage from "@/view/SettingsPage.vue";
import AboutSettingsPage from "@/view/setting/AboutSettingsPage.vue";
import TabBarSettingsPage from "@/view/setting/TabBarSettingsPage.vue";

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
                component: AboutSettingsPage
            },
            {
                path: 'tab-bar',
                name: 'tab-bar',
                component: TabBarSettingsPage
            }
        ]
    }
]

// 创建路由实例
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// 导出
export default router
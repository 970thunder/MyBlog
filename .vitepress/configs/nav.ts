/* configs/nav.ts */
import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
    { text: '主治医生', link: '/' },
    { text: 'Examples', link: '/markdown-examples' },
    { text: 'VitePress', link: 'https://vitepress.dev/' },
    {
        text: '下拉模板',
        items: [
            { text: '病历档案室', link: '' },
            { text: '院内公告', link: '/Type.md' },
        ],
    },

]
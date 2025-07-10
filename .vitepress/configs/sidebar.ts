/* configs/nav.ts */
import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] = {
    '/HRlog/': [
        {
            text: '高危日志',
            collapsed: false,
            items: [
                { text: 'algorithm', link: '/HRlog/algorithm' },
                { text: '出院', link: '/' }
            ]
        }
    ],

    '/FRA/': [
        {
            text: '零碎疗养区',
            collapsed: false,
            items: [
                { text: 'markdown-examples', link: '/FRA/markdown-examples' },
                { text: 'api-examples', link: '/FRA/api-examples' },
            ]
        }
    ],

    '/CCAR/': [
        {
            text: '核心崩溃分析室',
            collapsed: false,
            items: [
                { text: '前言', link: '/CCAR/前言' },
                { text: 'Cloudflare挂载静态网站', link: '/CCAR/Cloudflare挂载静态网站' },
            ]
        }
    ],

    '/Broadcasting/': [
        {
            text: '系统广播',
            collapsed: false,
            items: [
                { text: '系统广播', link: '/Broadcasting/系统广播' },
                { text: '样式优化', link: '/Broadcasting/Type' },
            ]
        }
    ],

    '/MRware/': [
        {
            text: '病历仓库',
            collapsed: false,
            items: [
                { text: '前言', link: '/MRware/前言' },
            ]
        }
    ],

    '/Pward/': [
        {
            text: '庄生晓梦',
            collapsed: false,
            items: [
                { text: '前言', link: '/Pward/前言' },
            ]
        }
    ],

    '/SP/': [
        {
            text: '庄生晓梦',
            collapsed: false,
            items: [
                { text: '前言', link: '/SP/前言' },
                { text: '中钥存储仓', link: '/SP/中钥存储仓' },
                { text: '西钥储蓄库', link: '/SP/西钥储蓄库' },
            ]
        }
    ],
}

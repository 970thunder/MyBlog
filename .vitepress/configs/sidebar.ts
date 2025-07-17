/* configs/nav.ts */
import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] = {
    '/HRlog/': [
        {
            text: '高危日志 | 算法',
            collapsed: false,
            items: [
                { text: '前言', link: '/HRlog/前言' },
                { text: 'algorithm', link: '/HRlog/algorithm' },
                { text: '出院', link: '/' }
            ]
        }
    ],

    '/FRA/': [
        {
            text: '零碎疗养区 | 八股',
            collapsed: false,
            items: [
                { text: '前言', link: '/FRA/前言' },
                { text: 'markdown-examples', link: '/FRA/markdown-examples' },
                { text: 'api-examples', link: '/FRA/api-examples' },
            ]
        }
    ],

    '/CCAR/': [
        {
            text: '核心崩溃分析室 | 运维',
            collapsed: false,
            items: [
                { text: '前言', link: '/CCAR/前言' },
                { text: 'Cloudflare挂载静态网站', link: '/CCAR/Cloudflare挂载静态网站' },
                { text: 'https协议请求http报错', link: '/CCAR/https协议请求http报错' },
                { text: '网页刷新报错404', link: '/CCAR/网页刷新报错404' },
            ]
        }
    ],

    '/Broadcasting': [
        {
            text: '系统广播 | 公告',
            collapsed: false,
            items: [
                { text: '系统广播', link: '/Broadcasting/系统广播' },
                { text: '样式优化', link: '/Broadcasting/Type' },
            ]
        }
    ],

    '/notes': [
        {
            text: '简记 | 随手记录',
            collapsed: false,
            items: [
                { text: '偶尔用到的小技巧', link: '/notes/前言' },
                { text: 'cron规则', link: '/notes/cron规则' },
            ]
        }
    ],

    '/MRware/': [
        {
            text: '病历仓库 | 博客',
            collapsed: false,
            items: [
                { text: '前言', link: '/MRware/前言' },
                { text: 'NoneBot搭建QQ机器人', link: '/MRware/nonebot搭建QQ机器人教程' },
                { text: '分类模型的构建', link: '/MRware/分类模型的构建' },
            ]
        }
    ],

    '/Pward/': [
        {
            text: '庄生晓梦 | 灵感',
            collapsed: false,
            items: [
                { text: '前言', link: '/Pward/前言' },
            ]
        }
    ],

    '/SP/': [
        {
            text: '药房重地 | 软件推荐',
            collapsed: false,
            items: [
                { text: '前言', link: '/SP/前言' },
                { text: '中钥存储仓', link: '/SP/中钥存储仓' },
                { text: '西钥储蓄库', link: '/SP/西钥储蓄库' },
            ]
        }
    ],
}

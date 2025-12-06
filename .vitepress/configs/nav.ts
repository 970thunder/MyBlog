/* configs/nav.ts */
import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
    { text: '参观', link: '/' },
    { text: '核心崩溃分析室', link: '/CCAR/前言' },
    { text: '病历仓库', link: '/MRware/前言' },
    { text: '高危日志', link: '/HRlog/前言' },
    { text: '零碎疗养区', link: '/FRA/前言' },
    {
        text: 'software药房', 
        items: [
            { text: '中钥存储仓', link: '/SP/中钥存储仓' },
            { text: '西钥储蓄库', link: '/SP/西钥储蓄库' },
        ],
     },
    {
        text: '庄生晓梦',
        items: [
            // { text: 'AI简历', link: 'http://www.hyper99.shop/' },
            { text: '站点云集', link: '/Pward/站点云集' },
            { text: '妄想症病房', link: '/Pward/前言' },
        ]
    },
    {
        text: '系统广播',
        items: [
            { text: '院内公告', link: '/Broadcasting/系统广播' },
            { text: '简记', link: '/notes/前言' },
        ],
    },
    { text: '院长档案', link: '/Deanfile' },

]
/* configs/nav.ts */
import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
    { text: '参观', link: '/' },
    { text: '核心崩溃分析室', link: '/markdown-examples' },
    { text: '零碎疗养区', link: '/FRA/markdown-examples' },
    { text: '高危日志', link: '/HRlog/algorithm' },
    { text: '病历仓库', link: '/' },
    { text: '妄想症病房', link: 'http://47.122.119.35/' },
    {
        text: 'software药房', 
        items: [
            { text: '中钥存储仓', link: '/' },
            { text: '西钥储蓄库', link: '/' },
        ],
     },
    {
        text: '系统广播',
        items: [
            { text: '病区广播', link: '' },
            { text: '院内公告', link: '/Type.md' },
        ],
    },
    { text: '院长档案', link: '/' },

]
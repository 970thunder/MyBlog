/* configs/nav.ts */
import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] = {
    '/HRlog/': [
        {
            text: '📂高危日志 | 算法',
            collapsed: false,
            items: [
                { text: '📑前言', link: '/HRlog/前言' },
                { text: '📑算法', link: '/HRlog/algorithm' },
                { text: '📑出院', link: '/' }
            ]
        }
    ],

    '/FRA/': [
        {
            text: '零碎疗养区 | 八股',
            collapsed: false,
            items: [    
                { text: '📑前言', link: '/FRA/前言' },
                { text: '📑markdown-examples', link: '/FRA/markdown-examples' },
                { text: '📑api-examples', link: '/FRA/api-examples' },
            ]
        }
    ],

    '/CCAR/': [
        {
            text: '核心崩溃分析室 | 运维',
            collapsed: false,
            items: [
                { text: '📑前言', link: '/CCAR/前言' },
                { text: '📑Cloudflare挂载静态网站', link: '/CCAR/Cloudflare挂载静态网站' },
                { text: '📑https协议请求http报错', link: '/CCAR/https协议请求http报错' },
                { text: '📑网页刷新报错404', link: '/CCAR/网页刷新报错404' },
            ]
        }
    ],

    '/Broadcasting': [
        {
            text: '📂系统广播 | 公告',
            collapsed: false,
            items: [
                { text: '📑系统广播', link: '/Broadcasting/系统广播' },
                { text: '📑样式优化', link: '/Broadcasting/Type' },
            ]
        }
    ],

    '/notes': [
        {
            text: '📂简记 | 随手记录',
            collapsed: false,
            items: [
                { text: '📑偶尔用到的小技巧', link: '/notes/前言' },
                { text: '📑cron规则', link: '/notes/cron规则' },
                { text: '📑github提交规范', link: '/notes/Github提交规范' },
            ]
        }
    ],

    '/MRware/': [
        {
            text: '📂病历仓库 | 博客',
            collapsed: false,
            items: [
                { text: '📑前言', link: '/MRware/前言' },
                { text: '📑NoneBot搭建QQ机器人', link: '/MRware/nonebot搭建QQ机器人教程' },
                { text: '📑菜品分类模型的构建', link: '/MRware/分类模型的构建' },
                { text: '📑资源预加载', link: '/MRware/资源预加载' },
                { text: '📑网站加载速度优化', link: '/MRware/网站提速教程' },
                { 
                    text: '📂HarmonyOS开发',
                    items: [
                        { text: '📑用户协议首选项', link: '/MRware/HarmonyOS/用户协议首选项' },
                        { text: '📑关系型数据库', link: '/MRware/HarmonyOS/关系型数据库示例' },
                    ]
                },
            ]
        }
    ],

    '/Pward/': [
        {
            text: '📂庄生晓梦 | 灵感',
            collapsed: false,
            items: [
                {
                    text: '📂随时蹦出来的想法',
                    collapsed: false,
                    items: [
                        { text: '📑稀奇古怪的想法', link: '/Pward/前言' },
                        { text: '📑搭建二级域名网站', link: '/Pward/搭建DNS域名服务网站' },
                        { text: '📑前端的代码仓库', link: '/Pward/前端的代码仓库' },
                    ]
                },
                { text: '🌐 站点云集', link: '/Pward/站点云集' },
                { text: '🌏 Github军火库', link: '/Pward/Github军火库' },
            ]
        }
    ],

    '/SP/': [
        {
            text: '📂药房重地 | 软件推荐',
            collapsed: false,
            items: [
                { text: '📑前言', link: '/SP/前言' },
                { text: '📑中钥存储仓', link: '/SP/中钥存储仓' },
                { text: '📑西钥储蓄库', link: '/SP/西钥储蓄库' },
            ]
        }
    ],
}

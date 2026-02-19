/* configs/nav.ts */
import type { DefaultTheme } from "vitepress"

export const sidebar: DefaultTheme.Config['sidebar'] = {
  "/HRlog/": [
    {
      "text": "📂高危日志 | 算法",
      "collapsed": false,
      "items": [
        {
          "text": "📑前言",
          "link": "/HRlog/前言"
        },
        {
          "text": "📑算法",
          "link": "/HRlog/algorithm"
        },
        {
          "text": "📑出院",
          "link": "/"
        }
      ]
    }
  ],
  "/FRA/": [
    {
      "text": "零碎疗养区 | 八股",
      "collapsed": false,
      "items": [
        {
          "text": "前言",
          "link": "/FRA/前言"
        },
        {
          "text": "爪洼岛语录",
          "items": [
            {
              "text": "基本数据类型",
              "link": "/FRA/Java八大基本数据类型"
            },
            {
              "text": "项目技术点",
              "link": "/FRA/项目技术点"
            },
            {
              "text": "最大同时请求数",
              "link": "/FRA/springboot最大并发请求"
            },
            {
              "text": "#{}和${}的区别",
              "link": "/FRA/1"
            },
            {
              "text": "==和equals的区别",
              "link": "/FRA/2"
            },
            {
              "text": "list set map的区别",
              "link": "/FRA/list set map的区别"
            }
          ]
        },
        {
          "text": "前端大杂烩",
          "items": [
            {
              "text": "post和get的区别",
              "link": "/FRA/post和get的区别"
            },
            {
              "text": "v-show与v-if",
              "link": "/FRA/v-show与v-if"
            },
            {
              "text": "Vue组件通信方式",
              "link": "/FRA/Vue组件通信方式"
            }
          ]
        },
        {
          "text": "📑缓存击穿缓存雪崩缓存穿透",
          "link": "/FRA/缓存击穿缓存雪崩缓存穿透"
        }
      ]
    }
  ],
  "/CCAR/": [
    {
      "text": "核心崩溃分析室 | 运维",
      "collapsed": false,
      "items": [
        {
          "text": "📑前言",
          "link": "/CCAR/前言"
        },
        {
          "text": "📑Cloudflare挂载静态网站",
          "link": "/CCAR/Cloudflare挂载静态网站"
        },
        {
          "text": "📑https协议请求http报错",
          "link": "/CCAR/https协议请求http报错"
        },
        {
          "text": "📑网页刷新报错404",
          "link": "/CCAR/网页刷新报错404"
        },
        {
          "text": "📑Docker从入门到入土",
          "link": "/CCAR/Docker从入门到入土"
        }
      ]
    }
  ],
  "/Broadcasting": [
    {
      "text": "📂系统广播 | 公告",
      "collapsed": false,
      "items": [
        {
          "text": "📑系统广播",
          "link": "/Broadcasting/系统广播"
        },
        {
          "text": "📑样式优化",
          "link": "/Broadcasting/Type"
        }
      ]
    }
  ],
  "/notes": [
    {
      "text": "📂简记 | 随手记录",
      "collapsed": false,
      "items": [
        {
          "text": "📑偶尔用到的小技巧",
          "link": "/notes/前言"
        },
        {
          "text": "📑cron规则",
          "link": "/notes/cron规则"
        },
        {
          "text": "📑github提交规范",
          "link": "/notes/Github提交规范"
        },
        {
          "text": "📑服务器命令",
          "link": "/notes/服务器命令"
        },
        {
          "text": "📑spring自动生成数据表",
          "link": "/notes/spring自动生成数据表"
        }
      ]
    },
    {
      "text": "📂漂泊旅记 | 记录",
      "collapsed": false,
      "items": [
        {
          "text": "🚅初来乍到",
          "link": "/notes/date/初来乍到"
        }
      ]
    }
  ],
  "/MRware/": [
    {
      "text": "📂病历仓库 | 博客",
      "collapsed": false,
      "items": [
        {
          "text": "📑前言",
          "link": "/MRware/前言"
        },
        {
          "text": "📑NoneBot搭建QQ机器人",
          "link": "/MRware/nonebot搭建QQ机器人教程"
        },
        {
          "text": "📑菜品分类模型的构建",
          "link": "/MRware/分类模型的构建"
        },
        {
          "text": "📑资源预加载",
          "link": "/MRware/资源预加载"
        },
        {
          "text": "📑网站加载速度优化",
          "link": "/MRware/网站提速教程"
        },
        {
          "text": "📑DOM解析错误处理",
          "link": "/MRware/前端处理响应防DOM解析"
        },
        {
          "text": "📂HarmonyOS开发",
          "items": [
            {
              "text": "📑用户协议首选项",
              "link": "/MRware/HarmonyOS/用户协议首选项"
            },
            {
              "text": "📑关系型数据库",
              "link": "/MRware/HarmonyOS/关系型数据库示例"
            }
          ]
        },
        {
          "text": "📑Github登录验证OAuth2开发教程",
          "link": "/MRware/Github登录验证OAuth2开发教程"
        },
        {
          "text": "📑二级域名分发网站开发经历",
          "link": "/MRware/二级域名分发网站开发经历"
        },
        {
          "text": "📑装机清单-垃圾佬捡配件",
          "link": "/MRware/装机清单-垃圾佬捡配件"
        },
        {
          "text": "📑OpenClaw教程（原ClawBot）",
          "link": "/MRware/OpenClaw教程（原ClawBot）"
        },
        {
          "text": "📑装机清单-1500元ITX小钢炮",
          "link": "/MRware/装机清单-1500元ITX小钢炮"
        }
      ]
    }
  ],
  "/Pward/": [
    {
      "text": "📂庄生晓梦 | 灵感",
      "collapsed": false,
      "items": [
        {
          "text": "📂随时蹦出来的想法",
          "collapsed": false,
          "items": [
            {
              "text": "📑稀奇古怪的想法",
              "link": "/Pward/前言"
            },
            {
              "text": "📑搭建二级域名网站",
              "link": "/Pward/搭建DNS域名服务网站"
            },
            {
              "text": "📑前端的代码仓库",
              "link": "/Pward/前端的代码仓库"
            }
          ]
        },
        {
          "text": "🌐 站点云集",
          "link": "/Pward/站点云集"
        },
        {
          "text": "🌏 Github军火库",
          "link": "/Pward/Github军火库"
        }
      ]
    }
  ],
  "/SP/": [
    {
      "text": "📂药房重地 | 软件推荐",
      "collapsed": false,
      "items": [
        {
          "text": "📑前言",
          "link": "/SP/前言"
        },
        {
          "text": "📑中钥存储仓",
          "link": "/SP/中钥存储仓"
        },
        {
          "text": "📑西钥储蓄库",
          "link": "/SP/西钥储蓄库"
        }
      ]
    }
  ]
}

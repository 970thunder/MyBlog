import { defineConfig } from 'vitepress'
import { nav, sidebar } from './configs'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'
import vitepressProtectPlugin from "vitepress-protect-plugin"

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Hyper的伊甸花园",
  description: "小泥人Hyper的个人博客网站",
  //设置输出目录
  outDir: "dist",
  //设置源目录
  srcDir: "./src",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // 顶部导航栏
    nav,
    // 左上角文字
    siteTitle: "记录神经缝隙溜出的奇思妙想🍄",
    // 侧边栏
    sidebar,

    // footer: {
    //   message: ``,
    //   copyright: ``,
    // },

    docFooter: {
      prev: "往上看看",
      next: "往下走走",
    },

    // https://vitepress.dev/zh/reference/default-theme-config#outline
    outline: {
      level: [2, 3],
      label: "《 区 块 地 图 》",
    },

    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "short", // full
        timeStyle: "short", // medium
      },
    },

    // GitHub链接
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/970thunder'
      },
      {
        icon: {
          svg: '<svg t="1752133611591" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5761" width="64" height="64"><path d="M512 0c282.784 0 512 229.216 512 512s-229.216 512-512 512S0 794.784 0 512 229.216 0 512 0z m189.952 752l11.2-108.224c-31.904 9.536-100.928 16.128-147.712 16.128-134.464 0-205.728-47.296-195.328-146.304 11.584-110.688 113.152-145.696 232.64-145.696 54.784 0 122.432 8.8 151.296 18.336L768 272.704C724.544 262.24 678.272 256 599.584 256c-203.2 0-388.704 94.88-406.4 263.488C178.336 660.96 303.584 768 535.616 768c80.672 0 138.464-6.432 166.336-16z" fill="#8a8a8a" p-id="5762"></path></svg>'
        },
        link: 'https://blog.csdn.net/neadsc',
        // You can include a custom label for accessibility too (optional but recommended):
        ariaLabel: 'csdn'
      }
    ],

    //Algolia搜索纯中文版
    search: {
      provider: 'algolia',
      options: {
        appId: '160HE7DIP7',
        apiKey: 'c69dea4704a3ce5e229a7ace14d196bd',
        indexName: 'doc',
        locales: {
          root: {
            placeholder: '搜索文档',
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                searchBox: {
                  resetButtonTitle: '清除查询条件',
                  resetButtonAriaLabel: '清除查询条件',
                  cancelButtonText: '取消',
                  cancelButtonAriaLabel: '取消'
                },
                startScreen: {
                  recentSearchesTitle: '搜索历史',
                  noRecentSearchesText: '没有搜索历史',
                  saveRecentSearchButtonTitle: '保存至搜索历史',
                  removeRecentSearchButtonTitle: '从搜索历史中移除',
                  favoriteSearchesTitle: '收藏',
                  removeFavoriteSearchButtonTitle: '从收藏中移除'
                },
                errorScreen: {
                  titleText: '无法获取结果',
                  helpText: '你可能需要检查你的网络连接'
                },
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭',
                  searchByText: '搜索提供者'
                },
                noResultsScreen: {
                  noResultsText: '无法找到相关结果',
                  suggestedQueryText: '你可以尝试查询',
                  reportMissingResultsText: '你认为该查询应该有结果？',
                  reportMissingResultsLinkText: '点击反馈'
                },
              },
            },
          },
        },
      },
    },
  },
  head: [

    ["link", { rel: "shortcut icon", href: "/favicon-16x16.ico" }],
    // [
    //   "link",
    //   {
    //     rel: "apple-touch-icon",
    //     sizes: "180x180",
    //     href: "/favicon-180x180.png",
    //   },
    // ],
    // [
    //   "link",
    //   {
    //     rel: "icon",
    //     type: "image/png",
    //     sizes: "32x32",
    //     href: "/favicon-32x32.png",
    //   },
    // ],
    // [
    //   "link",
    //   {
    //     rel: "icon",
    //     type: "image/png",
    //     sizes: "16x16",
    //     href: "/favicon-180x180.png",
    //   },
    // ]
  ],

  //markdown配置
  markdown: {

    lineNumbers: true,
    config: (md) => {

      md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
        let htmlResult = slf.renderToken(tokens, idx, options);
        if (tokens[idx].tag === 'h1') htmlResult += `<ArticleMetadata />`;
        return htmlResult;
      }

      md.use(groupIconMdPlugin) //代码组图标

      // 代码组中添加图片
      md.use((md) => {
        const defaultRender = md.render
        md.render = (...args) => {
          const [content, env] = args
          const currentLang = env?.localeIndex || 'root'
          const isHomePage = env?.path === '/' || env?.relativePath === 'index.md'  // 判断是否是首页

          if (isHomePage) {
            return defaultRender.apply(md, args) // 如果是首页，直接渲染内容
          }
          // 调用原始渲染
          let defaultContent = defaultRender.apply(md, args)
          // 替换内容
          if (currentLang === 'root') {
            defaultContent = defaultContent.replace(/提醒/g, '提醒')
              .replace(/建议/g, '建议')
              .replace(/重要/g, '重要')
              .replace(/警告/g, '警告')
              .replace(/注意/g, '注意')
          } else if (currentLang === 'ko') {
            // 韩文替换
            defaultContent = defaultContent.replace(/提醒/g, '알림')
              .replace(/建议/g, '팁')
              .replace(/重要/g, '중요')
              .replace(/警告/g, '경고')
              .replace(/注意/g, '주의')
          }
          // 返回渲染的内容
          return defaultContent
        }

        // 获取原始的 fence 渲染规则
        const defaultFence = md.renderer.rules.fence?.bind(md.renderer.rules) ?? ((...args) => args[0][args[1]].content);

        // 重写 fence 渲染规则
        md.renderer.rules.fence = (tokens, idx, options, env, self) => {
          const token = tokens[idx];
          const info = token.info.trim();

          // 判断是否为 md:img 类型的代码块
          if (info.includes('md:img')) {
            // 只渲染图片，不再渲染为代码块
            return `<div class="rendered-md">${md.render(token.content)}</div>`;
          }

          // 其他代码块按默认规则渲染（如 java, js 等）
          return defaultFence(tokens, idx, options, env, self);
        };

      })
    },

    image: {
      // 开启图片懒加载
      lazyLoading: true
    },
  },

  //启用深色模式
  appearance: 'dark',

  vite: {
    resolve: {
      preserveSymlinks: true,
    },
    plugins: [
      groupIconVitePlugin(), //代码组图标
      vitepressProtectPlugin({
        disableF12: true, // 禁用F12开发者模式
        disableCopy: true, // 禁用文本复制
        disableSelect: true, // 禁用文本选择
      }),      
    ],
  },
})

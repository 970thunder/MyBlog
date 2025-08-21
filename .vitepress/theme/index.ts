/* .vitepress/theme/index.ts */
import DefaultTheme from 'vitepress/theme'
import './style/index.css'
import 'virtual:group-icons.css' //代码组样式
import giscusTalk from 'vitepress-plugin-comment-with-giscus';
import { useData, useRoute, inBrowser } from 'vitepress';
import busuanzi from 'busuanzi.pure.js';
import bsz from "./components/bsz.vue"
import MyLayout from './components/MyLayout.vue' // 导入布局组件
import Mycomponent from "./components/Mycomponent.vue"
import update from "./components/update.vue"
import ArticleMetadata from "./components/ArticleMetadata.vue"
import SiteCards from "./components/SiteCards.vue"
import GithubCards from "./components/GithubCards.vue"
import { NProgress } from 'nprogress-v2/dist/index.js' // 进度条组件
import 'nprogress-v2/dist/index.css' // 进度条样式


export default {
    extends: DefaultTheme,
    // ...DefaultTheme, //或者这样写也可
    Layout: MyLayout, // 应用布局组件

    setup() {
        // Get frontmatter and route
        const { frontmatter } = useData();
        const route = useRoute();

        // giscus配置
        giscusTalk({
            repo: '970thunder/BlogDiscussion', //仓库
            repoId: 'R_kgDOPJnw2g', //仓库ID
            category: 'General', // 讨论分类
            categoryId: 'DIC_kwDOPJnw2s4CssxW', //讨论分类ID
            mapping: 'pathname',
            inputPosition: 'bottom',
            lang: 'zh-CN',
        },
            {
                frontmatter, route
            },
            //默认值为true，表示已启用，此参数可以忽略；
            //如果为false，则表示未启用
            //您可以使用"comment:true"序言在页面上单独启用它
            true
        );
    },
    enhanceApp({ app, router }) {
        // 注册全局组件
        app.component('Mycomponent', Mycomponent)
        app.component('update', update)
        app.component('ArticleMetadata', ArticleMetadata)
        app.component('SiteCards', SiteCards)
        app.component('GithubCards', GithubCards)
        if (inBrowser) {
            NProgress.configure({ showSpinner: false })
            router.onBeforeRouteChange = () => {
                NProgress.start() // 开始进度条
            }

            router.onAfterRouteChanged = () => {
                busuanzi.fetch()
                NProgress.done() // 停止进度条
            }
        }

        // 在客户端添加保护代码
        if (typeof window !== 'undefined') {
            // 禁用右键和F12
            document.addEventListener('contextmenu', e => e.preventDefault())
            document.addEventListener('keydown', e => {
                if (e.key === 'F12' ||
                    (e.ctrlKey && e.shiftKey && e.key === 'I') ||
                    (e.ctrlKey && e.shiftKey && e.key === 'C') ||
                    (e.ctrlKey && e.key === 'u')) {
                    e.preventDefault()
                }
            })

            // 禁用选择和复制
            document.addEventListener('selectstart', e => e.preventDefault())
            document.addEventListener('copy', e => e.preventDefault())

            // CSS 样式禁用选择
            const style = document.createElement('style')
            style.textContent = `
        * {
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
          user-select: none !important;
        }
        
        /* 禁用拖拽 */
        img, a {
          -webkit-user-drag: none !important;
          user-drag: none !important;
        }
      `
            document.head.appendChild(style)
        }
    },
}
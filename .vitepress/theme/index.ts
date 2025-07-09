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
            //您可以使用“comment:true”序言在页面上单独启用它
            true
        );
    },
    enhanceApp({ app, router }) {
        // 注册全局组件
        app.component('Mycomponent', Mycomponent)
        app.component('update' , update)
        app.component('ArticleMetadata', ArticleMetadata)
        if (inBrowser) {
            router.onAfterRouteChanged = () => {
                busuanzi.fetch()
            }
        }
    },
}
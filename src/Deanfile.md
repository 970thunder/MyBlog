---
layout: page
---
<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers,
  VPTeamPageSection,
} from 'vitepress/theme'

const coreMembers = [
  {
    avatar: './public/logo-preview.png',
    name: '小泥人Hyper',
    // title: '创始人',
    // links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' }
    // ],
  }
]

const partners = [
//   {
//     avatar: 'https://www.github.com/yyx990803.png',
//     name: 'Evan You',
//     title: '创始人',
//     links: [
//       { icon: 'github', link: 'https://github.com/yyx990803' },
//       { icon: 'twitter', link: 'https://twitter.com/youyuxi' }
//     ],
//   },
//   {
//     avatar: 'https://www.github.com/kiaking.png',
//     name: 'Kia King Ishii',
//     title: '开发者',
//     links: [
//       { icon: 'github', link: 'https://github.com/kiaking' },
//       { icon: 'twitter', link: 'https://twitter.com/KiaKing85' },
//     ],
//   },
]
</script>

<VPTeamPage>
  <!-- <VPTeamPageTitle>
    <template #title>我们的团队</template>
    <template #lead>
    VitePress 的开发由一个国际化的团队指导，
    其中一些成员选择在下方展示。
    </template>
  </VPTeamPageTitle> -->
  <VPTeamMembers size="medium" :members="coreMembers" class='large'/>
  <!-- <VPTeamPageSection>
    <template #title>合作伙伴</template>
    <template #lead>
    这是我们的合作伙伴。
    </template>
    <template #members>
      <VPTeamMembers size="small" :members="partners" />
    </template>
  </VPTeamPageSection> -->
</VPTeamPage>
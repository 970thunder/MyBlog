import fs from 'fs'
import path from 'path'

const SRC_DIR = path.resolve(process.cwd(), 'src')
const OUTPUT_FILE = path.resolve(process.cwd(), '.vitepress', 'configs', 'sidebar.ts')

const groupLabels = {
  HRlog: '📂高危日志 | 算法',
  FRA: '零碎疗养区 | 八股',
  CCAR: '核心崩溃分析室 | 运维',
  Broadcasting: '📂系统广播 | 公告',
  notes: '📂简记 | 随手记录',
  MRware: '📂病历仓库 | 博客',
  Pward: '📂庄生晓梦 | 灵感',
  SP: '📂药房重地 | 软件推荐'
}

const prefixOverrides = {
  Broadcasting: '/Broadcasting',
  notes: '/notes'
}

function getDirEntries(dir) {
  return fs.readdirSync(dir, { withFileTypes: true })
}

function getMdFiles(dir) {
  return getDirEntries(dir).filter(d => d.isFile() && d.name.toLowerCase().endsWith('.md'))
}

function sortItems(items) {
  return items.sort((a, b) => {
    const aIsPreface = a.text.includes('前言')
    const bIsPreface = b.text.includes('前言')
    if (aIsPreface && !bIsPreface) return -1
    if (!aIsPreface && bIsPreface) return 1
    return a.text.localeCompare(b.text, 'zh')
  })
}

function buildItemsForDir(category, dir, baseParts) {
  const files = getMdFiles(dir).map(d => {
    const nameWithoutExt = d.name.replace(/\.md$/i, '')
    const link = `/${[category, ...baseParts, nameWithoutExt].join('/')}`
    return { text: `📑${nameWithoutExt}`, link }
  })
  const subDirs = getDirEntries(dir).filter(d => d.isDirectory())
  const subGroups = subDirs.map(sd => {
    const subDirPath = path.join(dir, sd.name)
    const items = buildItemsForDir(category, subDirPath, [...baseParts, sd.name])
    return { text: `📂${sd.name}`, items }
  })
  return [...sortItems(files), ...subGroups.sort((a, b) => a.text.localeCompare(b.text, 'zh'))]
}

function buildSidebar() {
  const entries = getDirEntries(SRC_DIR).filter(d => d.isDirectory() && d.name !== 'public')
  const result = {}
  for (const entry of entries) {
    const category = entry.name
    const prefix = prefixOverrides[category] ?? `/${category}/`
    const groupText = groupLabels[category] ?? `📂${category}`
    const items = buildItemsForDir(category, path.join(SRC_DIR, category), [])
    result[prefix] = [{ text: groupText, collapsed: false, items }]
  }
  return result
}

function writeSidebarFile(sidebarObj) {
  const header = '/* configs/nav.ts */\nimport type { DefaultTheme } from \"vitepress\"\n\n'
  const body = `export const sidebar: DefaultTheme.Config['sidebar'] = ${JSON.stringify(sidebarObj, null, 2)}\n`
  fs.writeFileSync(OUTPUT_FILE, header + body, 'utf-8')
}

const sidebar = buildSidebar()
writeSidebarFile(sidebar)
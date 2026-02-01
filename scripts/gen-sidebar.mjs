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

const subGroupTextMap = {
  MRware: {
    HarmonyOS: '📂HarmonyOS开发'
  }
  ,
  notes: {
    date: '📂漂泊旅记 | 记录'
  }
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

function flattenLinks(items) {
  const acc = []
  for (const it of items) {
    if (it.link) acc.push(it.link)
    if (it.items) acc.push(...flattenLinks(it.items))
  }
  return acc
}

function fileLink(category, parts, filename) {
  const nameWithoutExt = filename.replace(/\.md$/i, '')
  const prefix = prefixOverrides[category] ?? `/${category}/`
  const base = prefix.endsWith('/') ? prefix : prefix + '/'
  const link = `${base}${[...parts, nameWithoutExt].join('/')}`
  return { text: `📑${nameWithoutExt}`, link }
}

function parseExistingSidebar() {
  const content = fs.readFileSync(OUTPUT_FILE, 'utf-8')
  const match = content.match(/export const sidebar: DefaultTheme\.Config\['sidebar'\] =\s*(\{[\s\S]*\})/)
  if (!match) throw new Error('未找到现有 sidebar 导出')
  const objLiteral = match[1]
  const existing = Function(`return (${objLiteral})`)()
  return existing
}

function ensureCategoryGroup(sidebarObj, category) {
  const prefix = prefixOverrides[category] ?? `/${category}/`
  if (!sidebarObj[prefix]) {
    sidebarObj[prefix] = [{ text: groupLabels[category] ?? `📂${category}`, collapsed: false, items: [] }]
  }
  return { prefix, groupArr: sidebarObj[prefix] }
}

function findOrCreateSubGroup(groupArr, category, subdir) {
  const targetText = subGroupTextMap[category]?.[subdir] ?? `📂${subdir}`
  let group = (groupArr[0].items || []).find(g => g.text === targetText)
  if (!group) {
    if (!groupArr[0].items) groupArr[0].items = []
    group = { text: targetText, items: [] }
    groupArr[0].items.push(group)
  }
  return group
}

function findOrCreateTopLevelGroup(groupArr, targetText) {
  let group = groupArr.find(g => g.text === targetText)
  if (!group) {
    group = { text: targetText, collapsed: false, items: [] }
    groupArr.push(group)
  }
  if (!group.items) group.items = []
  return group
}

function mergeNewItems(sidebarObj) {
  const categories = getDirEntries(SRC_DIR).filter(d => d.isDirectory() && d.name !== 'public')
  for (const cat of categories) {
    const category = cat.name
    const { groupArr } = ensureCategoryGroup(sidebarObj, category)
    const existingLinks = new Set(flattenLinks(groupArr))

    const catDir = path.join(SRC_DIR, category)

    for (const f of getMdFiles(catDir)) {
      const item = fileLink(category, [], f.name)
      if (!existingLinks.has(item.link)) {
        if (!groupArr[0].items) groupArr[0].items = []
        groupArr[0].items.push(item)
      }
    }

    for (const sd of getDirEntries(catDir).filter(d => d.isDirectory())) {
      const subdir = sd.name
      const subDirPath = path.join(catDir, subdir)
      const isNotesDate = category === 'notes' && subdir === 'date'
      const targetText = subGroupTextMap[category]?.[subdir] ?? `📂${subdir}`
      const hostGroup = isNotesDate
        ? findOrCreateTopLevelGroup(groupArr, targetText)
        : findOrCreateSubGroup(groupArr, category, subdir)
      const subExistingLinks = new Set(flattenLinks([hostGroup]))
      for (const f of getMdFiles(subDirPath)) {
        const item = fileLink(category, [subdir], f.name)
        if (!subExistingLinks.has(item.link)) {
          hostGroup.items.push(item)
        }
      }

      if (isNotesDate) {
        const nested = (groupArr[0].items || []).find(g => g.text === targetText)
        if (nested) {
          const hostLinks = new Set(flattenLinks([hostGroup]))
          for (const it of nested.items || []) {
            if (!hostLinks.has(it.link)) hostGroup.items.push(it)
          }
          groupArr[0].items = (groupArr[0].items || []).filter(g => g.text !== targetText)
        }
      }
    }
  }
  return sidebarObj
}

function normalizeNotesDateLinks(sidebarObj) {
  const arr = sidebarObj['/notes']
  if (!arr) return sidebarObj
  for (const group of arr) {
    if (group.text === '📂漂泊旅记 | 记录' && Array.isArray(group.items)) {
      for (const it of group.items) {
        if (typeof it.link === 'string' && it.link.startsWith('/date/')) {
          it.link = `/notes${it.link}`
        }
      }
    }
  }
  return sidebarObj
}

function writeSidebarFile(sidebarObj) {
  const header = '/* configs/nav.ts */\nimport type { DefaultTheme } from \"vitepress\"\n\n'
  const body = `export const sidebar: DefaultTheme.Config['sidebar'] = ${JSON.stringify(sidebarObj, null, 2)}\n`
  fs.writeFileSync(OUTPUT_FILE, header + body, 'utf-8')
}

const sidebar = parseExistingSidebar()
const merged = mergeNewItems(sidebar)
const normalized = normalizeNotesDateLinks(merged)
writeSidebarFile(normalized)

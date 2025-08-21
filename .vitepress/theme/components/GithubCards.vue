<template>
    <div class="gh-collection">
        <div v-if="loading" class="gh-loading">
            <div class="gh-loading-spinner"></div>
            <p>正在获取仓库信息...</p>
        </div>

        <div v-else-if="error" class="gh-error">
            <p>{{ error }}</p>
            <button @click="retryFetch" class="gh-retry-btn">重试</button>
        </div>

        <div v-else class="gh-cards-container">
            <div v-for="repo in repoData" :key="repo.id ?? repo.name" class="gh-card"
                @click="navigateToRepo(repo.html_url)">
                <div class="gh-card-inner">
                    <div class="gh-card-header">
                        <div class="gh-left">
                            <div class="gh-thumb">
                                <img :src="repo.owner?.avatar_url || getRepoIcon(repo)" alt="repo icon"
                                    @error="handleImgError" />
                            </div>
                            <h3 class="gh-name">{{ repo.name }}</h3>
                        </div>
                        <div class="gh-stars" :title="`${repo.stargazers_count} stars`">★ {{
                            formatStars(repo.stargazers_count) }}</div>
                    </div>
                    <div class="gh-card-content">
                        <p class="gh-description">{{ repo.description || '暂无描述' }}</p>
                    </div>
                    <div class="gh-card-border"></div>
                    <div class="gh-hover-effect"></div>
                </div>
            </div>

            <div v-if="!repoData || repoData.length === 0" class="gh-empty">
                暂无仓库
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { toRefs, ref, onMounted, watch } from 'vue'

interface Repo {
    id?: string | number
    name: string
    description: string
    url: string
    stars: number
    icon?: string
    avatar?: string
}

interface GitHubRepo {
    id: number
    name: string
    description: string | null
    html_url: string
    stargazers_count: number
    owner: {
        avatar_url: string
        login: string
    }
}

interface RepoInput {
    owner: string
    repo: string
}

const props = withDefaults(defineProps<{
    repos?: (string | RepoInput | Repo)[]
    autoFetch?: boolean
}>(), {
    repos: () => [],
    autoFetch: true
})

// 从环境变量获取 GitHub Token
const getGitHubToken = (): string | undefined => {
    // @ts-ignore: Vite 环境变量类型
    const token = import.meta?.env?.VITE_GITHUB_TOKEN

    // 备用方案：尝试从其他方式获取
    if (!token) {
        // 尝试从 process.env 获取（Node.js 环境）
        if (typeof process !== 'undefined' && process.env) {
            const processToken = process.env.VITE_GITHUB_TOKEN
            if (processToken) {
                return processToken
            }
        }

        // 尝试从 window 对象获取（浏览器环境）
        if (typeof window !== 'undefined' && (window as any).__GITHUB_TOKEN__) {
            return (window as any).__GITHUB_TOKEN__
        }
    }

    // 如果所有方法都失败，返回 undefined 让组件使用未认证的 API
    if (!token) {
    }

    return token
}

const loading = ref(false)
const error = ref('')
const repoData = ref<GitHubRepo[]>([])

const navigateToRepo = (url: string) => {
    if (typeof window !== 'undefined') {
        window.open(url, '_blank')
    }
}

const formatStars = (count: number): string => {
    try {
        // 优先使用紧凑记法，如 1.2k
        // @ts-ignore: 某些环境缺少 Intl.Notation 类型声明
        return new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(count)
    } catch {
        return (count ?? 0).toLocaleString()
    }
}

const getRepoIcon = (repo: any): string => {
    if (repo.icon) return repo.icon
    if (repo.avatar) return repo.avatar
    try {
        const url = new URL(repo.url || repo.html_url)
        // 仅对 github.com 生效，推导 owner 头像：https://github.com/{owner}.png
        if (url.hostname.includes('github.com')) {
            const seg = url.pathname.split('/').filter(Boolean)
            const owner = seg[0]
            if (owner) {
                return `https://github.com/${owner}.png?size=80`
            }
        }
    } catch { }
    // fallback: 简易占位图
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMwMGQ0ZmYiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiM5MWY2ZmYiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHJ4PSIxMCIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjA1Ii8+PGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMTUiIGZpbGw9InVybCgjZykiIG9wYWNpdHk9IjAuOCIvPjxwYXRoIGQ9Ik0xNyAyNmM1LTIgOSAwIDE0LTQiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuNiIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSJub25lIi8+PC9zdmc+'
}

const handleImgError = (e: Event) => {
    const target = e.target as HTMLImageElement
    target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHJ4PSIxMiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjA0Ii8+PHBhdGggZD0iTTIwIDE4aDhhMiAyIDAgMCAxIDIgMnYxMGEyIDIgMCAwIDEtMiAyaC04YTIgMiAwIDAgMS0yLTJ2LTEwYTIgMiAwIDAgMSAyLTJ6IiBmaWxsPSIjY2NjIi8+PC9zdmc+'
}

const parseRepoInput = (input: string | RepoInput | Repo): RepoInput | null => {
    if (typeof input === 'string') {
        // 处理 "owner/repo" 格式
        if (input.includes('/')) {
            const [owner, repo] = input.split('/')
            return { owner, repo }
        }
        // 处理完整 URL
        try {
            const url = new URL(input)
            if (url.hostname.includes('github.com')) {
                const seg = url.pathname.split('/').filter(Boolean)
                if (seg.length >= 2) {
                    return { owner: seg[0], repo: seg[1] }
                }
            }
        } catch { }
        return null
    }

    if ('owner' in input && 'repo' in input) {
        return input as RepoInput
    }

    // 如果是完整的 Repo 对象，尝试从 URL 解析
    if ('url' in input) {
        return parseRepoInput(input.url)
    }

    return null
}

const fetchRepoData = async (repoInput: RepoInput): Promise<GitHubRepo | null> => {
    try {
        const headers: Record<string, string> = {
            'Accept': 'application/vnd.github.v3+json'
        }

        const token = getGitHubToken()
        if (token) {
            headers['Authorization'] = `token ${token}`
        }

        const response = await fetch(`https://api.github.com/repos/${repoInput.owner}/${repoInput.repo}`, {
            headers,
            mode: 'cors',
            credentials: 'omit'
        })

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error(`仓库 ${repoInput.owner}/${repoInput.repo} 不存在`)
            }
            if (response.status === 403) {
                const errorText = await response.text()
                // 检查是否是限流问题
                if (errorText.includes('rate limit') || errorText.includes('API rate limit')) {
                    throw new Error('GitHub API 请求频率超限，请稍后重试')
                } else {
                    throw new Error('API 访问被拒绝，请检查 Token 权限')
                }
            }
            const errorText = await response.text()
            throw new Error(`获取仓库信息失败: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (err) {
        console.error(`获取仓库 ${repoInput.owner}/${repoInput.repo} 失败:`, err)
        return null
    }
}

const loadRepos = async () => {
    if (!props.autoFetch || !props.repos || props.repos.length === 0) {
        repoData.value = []
        return
    }

    loading.value = true
    error.value = ''

    try {
        const repoInputs: RepoInput[] = []

        for (const repo of props.repos) {
            const parsed = parseRepoInput(repo)
            if (parsed) {
                repoInputs.push(parsed)
            }
        }

        if (repoInputs.length === 0) {
            error.value = '没有找到有效的仓库信息'
            return
        }

        const results = await Promise.allSettled(
            repoInputs.map(input => fetchRepoData(input))
        )

        const successful: GitHubRepo[] = []
        const failed: string[] = []

        results.forEach((result, index) => {
            if (result.status === 'fulfilled' && result.value) {
                successful.push(result.value)
            } else {
                failed.push(`${repoInputs[index].owner}/${repoInputs[index].repo}`)
            }
        })

        repoData.value = successful

        if (failed.length > 0) {
            error.value = `以下仓库获取失败: ${failed.join(', ')}`
        }

    } catch (err) {
        error.value = `加载仓库信息时发生错误: ${err instanceof Error ? err.message : String(err)}`
    } finally {
        loading.value = false
    }
}

const retryFetch = () => {
    loadRepos()
}

// 监听 props 变化
watch(() => props.repos, loadRepos, { immediate: true })

onMounted(() => {
    if (props.autoFetch) {
        loadRepos()
    }
})
</script>

<style scoped>
/* 容器与布局 */
.gh-collection {
    min-height: 100vh;
    padding: 2rem 0;
    font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* 加载状态 */
.gh-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 0;
    color: var(--site-card-text-secondary);
}

.gh-loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid var(--site-card-border);
    border-top: 3px solid var(--site-accent-rgb);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

/* 错误状态 */
.gh-error {
    text-align: center;
    padding: 2rem;
    color: var(--site-card-text-secondary);
}

.gh-retry-btn {
    background: var(--site-card-bg);
    border: 1px solid var(--site-card-border);
    color: var(--site-card-text-primary);
    padding: 8px 16px;
    border-radius: 8px;
    cursor: pointer;
    margin-top: 1rem;
    transition: all 0.3s ease;
}

.gh-retry-btn:hover {
    background: var(--site-card-bg-hover);
    border-color: var(--site-card-border-hover);
}

.gh-cards-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    max-width: 1200px;
    margin: 0 auto;
}

/* 卡片 */
.gh-card {
    position: relative;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    transform-style: preserve-3d;
}

.gh-card:hover {
    transform: translateY(-8px) rotateX(2deg) rotateY(2deg);
}

.gh-card-inner {
    position: relative;
    background: var(--site-card-bg);
    backdrop-filter: blur(20px);
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid var(--site-card-border);
    box-shadow: var(--site-shadow-outer), var(--site-shadow-inner);
    transition: all 0.3s ease;
    min-height: 96px;
    padding: 14px 18px;
}

.gh-card:hover .gh-card-inner {
    background: var(--site-card-bg-hover);
    border-color: var(--site-card-border-hover);
    box-shadow: var(--site-shadow-outer-hover), 0 0 30px rgba(var(--site-accent-rgb), var(--site-accent-glow-alpha)), var(--site-shadow-inner);
}

/* 头部 */
.gh-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 10px;
}

.gh-left {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
}

.gh-thumb {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    overflow: hidden;
    background: var(--site-card-thumb-bg);
    display: flex;
    align-items: center;
    justify-content: center;
}

.gh-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.gh-name {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--site-card-text-primary);
    margin: 0;
    line-height: 1.2;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

.gh-stars {
    font-size: 0.9rem;
    color: var(--site-card-text-secondary);
    display: flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
}

/* 内容区 */
.gh-card-content {
    position: relative;
    z-index: 2;
}

.gh-description {
    color: var(--site-card-text-secondary);
    line-height: 1.5;
    margin: 0;
    font-size: 0.92rem;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

/* 边框与悬浮发光 */
.gh-card-border {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 16px;
    padding: 1px;
    background: linear-gradient(45deg, transparent, rgba(var(--site-accent-rgb), var(--site-accent-border-alpha)), transparent);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.gh-card:hover .gh-card-border {
    opacity: 1;
}

.gh-hover-effect {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(var(--site-accent-rgb), var(--site-accent-glow-alpha)) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
}

.gh-card:hover .gh-hover-effect {
    opacity: 1;
}

/* 空状态 */
.gh-empty {
    grid-column: 1 / -1;
    text-align: center;
    color: var(--site-card-text-secondary);
    padding: 24px 0;
}

/* 响应式优化 */
@media (max-width: 768px) {
    .gh-collection {
        padding: 1rem 0;
    }

    .gh-cards-container {
        grid-template-columns: 1fr;
        gap: 1rem;
    }

    .gh-card-inner {
        padding: 12px 14px;
        min-height: 88px;
    }

    .gh-name {
        font-size: 1rem;
    }

    .gh-description {
        font-size: 0.88rem;
    }

    .gh-card:hover {
        transform: translateY(-4px);
    }
}
</style>

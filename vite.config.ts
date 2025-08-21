import { defineConfig } from 'vite'
import { loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
    // 加载环境变量
    const env = loadEnv(mode, process.cwd(), '')

    return {
        define: {
            // 确保环境变量在客户端可用
            'process.env.VITE_GITHUB_TOKEN': JSON.stringify(env.VITE_GITHUB_TOKEN),
        },
        server: {
            // 开发服务器配置
            port: 5173,
            host: true,
        },
    }
}) 
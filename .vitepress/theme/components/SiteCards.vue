<template>
  <div class="site-collection">
    <h1 class="collection-title">站点云集</h1>
    <div class="collection-subtitle">发现优质的开发者网站和工具</div>
    
    <div class="site-cards-container">
      <div 
        v-for="site in websites" 
        :key="site.id"
        class="site-tech-card"
        @click="navigateToSite(site.url)"
      >
        <div class="site-card-inner">
          <div class="site-card-header">
            <div class="site-thumbnail-small">
              <img 
                :src="site.thumbnail" 
                :alt="site.name" 
                class="site-thumbnail"
                @error="handleImageError"
              />
            </div>
            <h3 class="site-name">{{ site.name }}</h3>
          </div>
          
          <div class="site-card-content">
            <p class="site-description">{{ site.description }}</p>
          </div>
          
          <div class="site-card-border"></div>
          <div class="site-hover-effect"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 网站数据
const websites = ref([
  {
    id: 1,
    name: 'Hyper简生',
    description: 'Hyper开发的AI生成简历网站，勉强能用，还是有些小bug',
    url: 'http://www.hyper99.shop',
    thumbnail: '/AIresume.ico'
  },
  {
    id: 2,
    name: '小番茄',
    description: '一个简单的番茄钟小应用',
    url: 'https://tomato.hyper99.shop',
    thumbnail: '/tomato.svg'
  },
  {
    id: 3,
    name: '智能测速网',
    description: '多节点的宽带测速网站，可以来看看你家网速能不能跑过高铁😋',
    url: 'https://speedtest.hyper99.shop',
    thumbnail: '/speedtest.svg'
  }
])

// 导航到网站
const navigateToSite = (url) => {
  console.log('点击了网站:', url)
  window.open(url, '_blank')
}

// 图片加载错误处理
const handleImageError = (event) => {
  console.log('图片加载失败:', event.target.src)
  event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjMzMzIi8+CjxwYXRoIGQ9Ik0yMCAyMEw0NCA0NE0yMCA0NEw0NCAyMCIgc3Ryb2tlPSIjNjY2IiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc='
}
</script>

<style scoped>
/* 站点云集页面样式 */
.site-collection {
  min-height: 100vh;
  padding: 2rem;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
}

.collection-title {
  text-align: center;
  font-size: 3rem;
  font-weight: 700;
  background: linear-gradient(45deg, #00d4ff, #ff00d4, #00ff88);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 3s ease-in-out infinite;
  margin-bottom: 1rem;
  text-shadow: 0 0 30px rgba(0, 212, 255, 0.3);
}

.collection-subtitle {
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.2rem;
  margin-bottom: 3rem;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.site-cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.site-tech-card {
  position: relative;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform-style: preserve-3d;
}

.site-tech-card:hover {
  transform: translateY(-8px) rotateX(2deg) rotateY(2deg);
}

.site-card-inner {
  position: relative;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  height: 140px;
  padding: 20px;
}

.site-tech-card:hover .site-card-inner {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(0, 212, 255, 0.3);
  box-shadow: 
    0 12px 40px rgba(0, 0, 0, 0.4),
    0 0 30px rgba(0, 212, 255, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.site-card-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.site-thumbnail-small {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.site-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.site-tech-card:hover .site-thumbnail {
  transform: scale(1.1);
}

.site-card-content {
  position: relative;
  z-index: 2;
}

.site-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  line-height: 1.2;
}

.site-description {
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.4;
  margin: 0;
  font-size: 0.9rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.site-card-border {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 16px;
  padding: 1px;
  background: linear-gradient(45deg, transparent, rgba(0, 212, 255, 0.3), transparent);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.site-tech-card:hover .site-card-border {
  opacity: 1;
}

.site-hover-effect {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(0, 212, 255, 0.08) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.site-tech-card:hover .site-hover-effect {
  opacity: 1;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .site-collection {
    padding: 1rem;
  }
  
  .collection-title {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .collection-subtitle {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
  
  .site-cards-container {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .site-card-inner {
    height: 120px;
    padding: 16px;
  }

  .site-card-header {
    gap: 12px;
    margin-bottom: 12px;
  }

  .site-thumbnail-small {
    width: 40px;
    height: 40px;
  }

  .site-name {
    font-size: 1.1rem;
  }

  .site-description {
    font-size: 0.85rem;
  }
  
  .site-tech-card:hover {
    transform: translateY(-4px);
  }
}

/* 深色模式优化 */
@media (prefers-color-scheme: dark) {
  .site-card-inner {
    background: rgba(255, 255, 255, 0.03);
  }
  
  .site-tech-card:hover .site-card-inner {
    background: rgba(255, 255, 255, 0.06);
  }
}

/* 动画性能优化 */
.site-tech-card {
  will-change: transform;
}

.site-thumbnail {
  will-change: transform;
}
</style> 
@echo off
setlocal
cd /d "%~dp0"

echo [1/2] 生成侧边栏配置...
node scripts\gen-sidebar.mjs
if errorlevel 1 (
  echo 生成侧边栏失败
  pause
  exit /b %errorlevel%
)

echo [2/2] 开始构建站点...
npm run docs:build
if errorlevel 1 (
  echo 构建失败
  pause
  exit /b %errorlevel%
)

echo 构建完成，输出目录: dist
pause
## Why

「念头」小程序的需求方案和视觉设计已完成，需要开始前端实现。第一版使用 mock 数据搭建完整页面流程，验证产品体验和视觉效果，为后续接入真实 AI 服务做准备。

## What Changes

- 初始化 Taro + React + TypeScript 项目结构
- 建立设计系统（颜色、字体、间距变量）
- 实现 6 个核心页面：
  - 记录首页（快速输入念头）
  - 温柔倾听页（对话式引导）
  - 这一念详情页（心念卡展示）
  - 念心本页（记录列表）
  - 发现页（统计回顾）
  - 我的页面（设置管理）
- 实现统一组件库（卡片、按钮、输入框、标签等）
- 使用 mock 数据模拟 AI 响应
- 支持浅色/深色主题切换
- 本地数据存储（Taro Storage）

## Capabilities

### New Capabilities

- `design-system`: 设计系统规范，包括颜色、字体、间距、卡片系统
- `page-record`: 记录首页，用户快速输入念头
- `page-listen`: 温柔倾听页，对话式引导用户表达
- `page-thought-detail`: 这一念详情页，展示心念卡
- `page-thought-book`: 念心本页，管理和回看历史记录
- `page-discover`: 发现页，统计和回顾最近的念头
- `page-mine`: 我的页面，设置和隐私管理
- `component-library`: 统一组件库（卡片、按钮、输入框、标签、气泡等）
- `mock-ai-service`: Mock AI 服务，模拟温柔倾听和心念卡生成
- `local-storage`: 本地数据存储服务

### Modified Capabilities

（无，这是初始实现）

## Impact

- 新增 `miniprogram/src/pages/` 下 6 个页面目录
- 新增 `miniprogram/src/components/` 组件目录
- 新增 `miniprogram/src/services/` 服务目录
- 新增 `miniprogram/src/store/` 状态管理目录
- 新增 `miniprogram/src/styles/` 样式目录
- 修改 `miniprogram/src/app.config.ts` 配置页面路由
- 依赖：Taro、React、TypeScript、SCSS、Zustand
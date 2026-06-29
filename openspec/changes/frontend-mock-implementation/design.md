## Context

「念头」是一款记录起心动念的微信小程序，核心体验是：记下这一念 → 温柔倾听 → 整理成卡 → 回看发现。

**当前状态：**
- 需求方案已完成（`docs/requirements.md`）
- 技术方案已完成（`docs/technical.md`）
- 视觉设计规范已完成（`docs/visual/design-system.md`）
- 项目目录已初始化（`miniprogram/`）
- 使用 Taro + React + TypeScript + SCSS 技术栈

**约束条件：**
- 第一版所有数据只保存在本地，不上传云端
- 服务端仅提供 AI 代理服务，不存储用户数据
- 需要支持浅色/深色主题切换
- 使用 Mock 数据模拟 AI 响应

## Goals / Non-Goals

**Goals:**
- 实现 6 个核心页面的完整 UI 和交互流程
- 建立可复用的组件库和设计系统
- 使用 Mock 数据跑通核心链路（记录 → 倾听 → 生成卡 → 回看）
- 支持浅色/深色主题切换
- 实现本地数据持久化（Taro Storage）
- 为后续接入真实 AI 服务做好准备

**Non-Goals:**
- 不接入真实 AI 服务（后续阶段）
- 不实现语音输入（仅保留 UI 入口）
- 不实现图片保存和分享功能（后续阶段）
- 不实现账号登录和云端同步
- 不实现复杂的动画效果（保持简洁）

## Decisions

### 1. 状态管理：Zustand

**决策：** 使用 Zustand 作为全局状态管理

**理由：**
- 轻量级，API 简洁，学习成本低
- 支持 TypeScript，类型安全
- 不需要 Provider 包裹，使用简单
- 性能好，支持选择性订阅

**替代方案：**
- Redux Toolkit：太重，MVP 阶段不需要
- MobX：学习曲线较陡
- React Context：性能较差，不适合频繁更新

**实现：**
```typescript
// store/useThoughtStore.ts
interface ThoughtState {
  currentRecord?: ThoughtRecord
  records: ThoughtRecord[]
  loading: boolean
  
  createDraft: (rawThought: string) => void
  appendMessage: (message: ThoughtMessage) => void
  setCard: (card: ThoughtCard) => void
  saveCurrentRecord: () => Promise<void>
  loadRecords: () => Promise<void>
}
```

### 2. 本地存储：Taro Storage

**决策：** 使用 Taro.setStorage/getStorage 进行本地数据持久化

**理由：**
- 微信小程序原生支持，稳定可靠
- API 简单，异步操作
- 存储容量足够（单个 key 最大 1MB）

**数据结构：**
```typescript
interface ThoughtRecordsStorage {
  version: number
  records: ThoughtRecord[]
}

// Storage Keys
const STORAGE_KEYS = {
  THOUGHT_RECORDS: 'thought_records',
  THOUGHT_DRAFT: 'thought_draft',
  THEME_MODE: 'theme_mode',
  DISCOVERY_CACHE: 'discovery_cache'
}
```

### 3. 样式方案：SCSS + CSS 变量

**决策：** 使用 SCSS 预处理器 + CSS 变量实现主题系统

**理由：**
- SCSS 支持嵌套、变量、mixin，开发效率高
- CSS 变量支持运行时切换主题
- 两者结合既保留编译时优势，又支持动态切换

**实现：**
```scss
// styles/tokens.scss
:root {
  --color-primary: #D99A28;
  --color-bg: #FFF8EA;
  --color-card: #FFFDF7;
  // ...
}

.theme-dark {
  --color-primary: #9273E6;
  --color-bg: #070B1F;
  --color-card: rgba(25, 30, 65, 0.72);
  // ...
}

// 组件样式中使用变量
.app-card {
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: 24px;
}
```

### 4. Mock AI 服务：本地 Mock

**决策：** 在前端实现 Mock AI 服务，使用预设的响应数据

**理由：**
- MVP 阶段快速验证产品流程
- 不依赖后端服务，开发调试方便
- 可以模拟各种场景（简短念头、复杂表达、信息不足等）

**Mock 策略：**
```typescript
// services/mock/ai-mock.ts
const MOCK_RESPONSES = {
  // 根据用户输入长度选择不同的响应模板
  shortThought: {
    reply: '我听见你说...',
    action: 'ask_more',
    missing: 'event'
  },
  completeThought: {
    reply: '这条念头的脉络已经比较清楚了...',
    action: 'generate_card',
    card: { /* 念头卡数据 */ }
  }
}

export function mockThoughtAI(record: ThoughtRecord): ThoughtAIResponse {
  const thoughtLength = record.rawThought.length
  
  if (thoughtLength < 20) {
    return MOCK_RESPONSES.shortThought
  }
  return MOCK_RESPONSES.completeThought
}
```

### 5. 组件设计：原子化 + 业务组件

**决策：** 分为基础组件（原子）和业务组件两层

**理由：**
- 基础组件可复用，保持一致性
- 业务组件封装特定页面逻辑
- 便于维护和扩展

**组件分层：**
```
components/
├── base/              # 基础组件
│   ├── AppCard/       # 卡片容器
│   ├── AppButton/     # 按钮
│   ├── AppInput/      # 输入框
│   ├── AppTag/        # 标签
│   └── AppEmpty/      # 空状态
│
├── thought/           # 念头相关组件
│   ├── ThoughtCard/   # 念头卡（详情展示）
│   ├── ThoughtListCard/ # 念头卡（列表项）
│   ├── ThoughtWallCard/ # 念头卡（卡片墙）
│   └── ChatBubble/    # 对话气泡
│
└── layout/            # 布局组件
    ├── PageHeader/    # 页面头部
    ├── BottomNav/     # 底部导航
    └── FloatingDecor/ # 浮动装饰
```

### 6. 页面路由：TabBar + NavigateTo

**决策：** 底部 TabBar 导航 + 页面跳转

**理由：**
- 符合微信小程序规范
- 4 个主 Tab（记录、心念本、发现、我的）
- 温柔倾听页作为二级页面，使用 navigateTo

**路由配置：**
```typescript
// app.config.ts
tabBar: {
  list: [
    { pagePath: 'pages/record/index', text: '记录' },
    { pagePath: 'pages/thought-book/index', text: '心念本' },
    { pagePath: 'pages/discover/index', text: '发现' },
    { pagePath: 'pages/mine/index', text: '我的' }
  ]
}

// 页面跳转
Taro.navigateTo({ url: '/pages/listen/index' })      // 温柔倾听
Taro.navigateTo({ url: '/pages/thought-detail/index' }) // 这一念详情
```

### 7. 图片资源：CSS 优先，图片备选

**决策：** 先用 CSS 实现基础效果，后续替换为图片素材

**理由：**
- 不阻塞开发进度
- CSS 渐变可以快速实现背景效果
- 图标准备用 SVG 或 CSS 实现
- 等设计师提供素材后替换

**实现策略：**
```scss
// 背景：CSS 渐变（临时）
.page-record {
  background: linear-gradient(180deg, #FFF8EA, #F5E6C3, #F8B862);
}

// 背景：图片（设计师提供后）
.page-record {
  background-image: url('./assets/bg-light-sunset.png');
  background-size: cover;
}

// 图标：SVG 内联（临时）
.icon-record {
  background: currentColor;
  mask: url("data:image/svg+xml,...") no-repeat center;
}
```

## Risks / Trade-offs

### 风险 1：Mock 数据可能与真实 AI 响应有差异
**影响：** 页面展示效果可能与最终产品不一致  
**缓解：** 
- Mock 数据尽量贴近真实场景
- 设计时预留扩展字段
- 后续接入 AI 时只需替换 service 层

### 风险 2：本地存储容量限制
**影响：** 大量记录可能超出存储限制  
**缓解：**
- 第一版记录数量有限（用户手动清理）
- 预留容量检查逻辑
- 后续可扩展云端备份

### 风险 3：深色模式适配工作量
**影响：** 每个组件都需要适配两套颜色  
**缓解：**
- 使用 CSS 变量，统一管理颜色
- 组件开发时同步考虑深色模式
- 建立颜色规范文档

### 风险 4：小程序审核风险
**影响：** AI 相关功能可能触发审核问题  
**缓解：**
- 第一版不强调 AI 能力
- 隐私说明清晰
- 功能定位为「记录工具」而非「心理咨询」

## Open Questions

1. **语音输入实现方式？**  
   → 第一版先保留 UI 入口，暂不实现功能

2. **Canvas 绘制分享图的时机？**  
   → 后续阶段实现，本阶段跳过

3. **是否需要骨架屏？**  
   → MVP 阶段可选，优先保证功能完整

---

**下一步：** 创建 specs 文档，定义每个 capability 的详细需求。
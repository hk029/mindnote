# 「念头」小程序技术方案

## 1. 技术目标

第一版使用 Taro 实现微信小程序，核心目标是快速完成 MVP，并保证用户隐私。

技术原则：

1. 用户记录只保存在本地；
2. 服务端不保存用户念头内容；
3. AI 仅用于临时整理，不落库；
4. 前端完成记录、回看、发现统计闭环；
5. 页面支持浅色/深色主题；
6. 后续可扩展本地加密、数据导出和云端加密备份。

## 2. 总体架构

第一版架构：

```txt
Taro 小程序
  ↓
本地存储 Taro Storage
  ↓
AI 临时代理服务
  ↓
AI 模型服务
```

数据流：

```txt
用户输入念头
  ↓
前端创建本地草稿
  ↓
发送当前对话给 AI Proxy
  ↓
AI Proxy 临时调用模型
  ↓
AI 返回倾听回复 / 心念卡
  ↓
前端保存到本地
```

核心约束：

- 小程序不直接暴露 AI Key；
- AI Proxy 不保存用户原文；
- AI Proxy 不保存对话；
- AI Proxy 不保存心念卡；
- 所有最终记录由前端写入本地。

## 3. 技术选型

### 3.1 前端

- Taro
- React
- TypeScript
- SCSS
- Zustand
- Taro Storage
- Taro Request

### 3.2 服务端

第一版只需要一个轻量 AI Proxy。

可选方案：

#### 方案 A：微信云函数

优点：

- 接入微信生态方便；
- 运维成本低；
- 适合 MVP；
- 不需要单独维护完整后端。

缺点：

- 对日志、限流、复杂调度的控制弱一些；
- 后续复杂扩展可能受限。

#### 方案 B：Node.js AI Proxy

优点：

- 可控性更强；
- 方便做限流、鉴权、日志脱敏；
- 后续接入更多模型更方便。

缺点：

- 需要部署；
- 需要配置 HTTPS 域名；
- 需要加入小程序 request 合法域名。

第一版建议：

> 如果以最快上线为目标，用微信云函数。
> 如果后续计划持续迭代，用 Node.js AI Proxy。

## 4. 项目目录结构

```txt
src/
  app.tsx
  app.config.ts
  app.scss

  pages/
    record/
      index.tsx
      index.scss
    listen/
      index.tsx
      index.scss
    thought-book/
      index.tsx
      index.scss
    thought-detail/
      index.tsx
      index.scss
    discover/
      index.tsx
      index.scss
    mine/
      index.tsx
      index.scss

  components/
    AppPage/
    AppCard/
    ThoughtInput/
    VoiceButton/
    ChatBubble/
    ThoughtCard/
    ThoughtListCard/
    ThoughtWallCard/
    DiscoveryCard/
    Tag/
    EmptyState/
    BottomActionBar/
    PrivacyHint/
    ThemeProvider/

  store/
    useThoughtStore.ts
    useThemeStore.ts
    useAppStore.ts

  services/
    ai.ts
    localThought.ts
    discovery.ts
    storage.ts
    image.ts
    share.ts

  types/
    thought.ts
    ai.ts
    theme.ts
    discovery.ts

  utils/
    id.ts
    date.ts
    text.ts
    safeJson.ts
    constants.ts

  styles/
    tokens.scss
    theme-light.scss
    theme-dark.scss
    mixins.scss
```

## 5. 页面路由

```ts
export default defineAppConfig({
  pages: [
    'pages/record/index',
    'pages/listen/index',
    'pages/thought-book/index',
    'pages/thought-detail/index',
    'pages/discover/index',
    'pages/mine/index'
  ],
  window: {
    navigationStyle: 'custom'
  },
  tabBar: {
    color: '#9A8B76',
    selectedColor: '#D99A28',
    backgroundColor: '#FFF8EA',
    list: [
      {
        pagePath: 'pages/record/index',
        text: '记录',
        iconPath: 'assets/tab/record.png',
        selectedIconPath: 'assets/tab/record-active.png'
      },
      {
        pagePath: 'pages/thought-book/index',
        text: '心念本',
        iconPath: 'assets/tab/book.png',
        selectedIconPath: 'assets/tab/book-active.png'
      },
      {
        pagePath: 'pages/discover/index',
        text: '发现',
        iconPath: 'assets/tab/discover.png',
        selectedIconPath: 'assets/tab/discover-active.png'
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的',
        iconPath: 'assets/tab/mine.png',
        selectedIconPath: 'assets/tab/mine-active.png'
      }
    ]
  }
})
```

## 6. 数据模型

### 6.1 ThoughtRecord

```ts
export type ThoughtRecordStatus =
  | 'draft'
  | 'listening'
  | 'card_generated'
  | 'saved'

export interface ThoughtRecord {
  id: string
  createdAt: number
  updatedAt: number

  status: ThoughtRecordStatus

  rawThought: string

  messages: ThoughtMessage[]

  card?: ThoughtCard

  secondLooks?: SecondLook[]

  laterReviews?: LaterReview[]

  localMeta: {
    version: number
    deviceOnly: true
    deleted?: boolean
  }
}
```

### 6.2 ThoughtMessage

```ts
export type MessageRole = 'user' | 'assistant'

export interface ThoughtMessage {
  id: string
  role: MessageRole
  content: string
  createdAt: number

  meta?: {
    isInitialThought?: boolean
    isGuidance?: boolean
    isCardTrigger?: boolean
    extractedFields?: Partial<ThoughtExtractedFields>
  }
}
```

### 6.3 ThoughtCard

```ts
export interface ThoughtCard {
  id: string
  title: string

  originalQuote: string

  eventSummary?: string

  emotions: string[]

  insight?: string

  patternTags: string[]

  gentleReminder?: string

  keyQuote?: string

  generatedAt: number

  userEdited: boolean
}
```

### 6.4 再看一眼 SecondLook

```ts
export interface SecondLook {
  id: string
  createdAt: number

  angleTitle: string

  content: string

  protectMeaning?: string

  selfSentence?: string

  savedToCard: boolean
}
```

### 6.5 后来再看 LaterReview

```ts
export interface LaterReview {
  id: string
  createdAt: number
  content: string
}
```

### 6.6 信息抽取字段

```ts
export interface ThoughtExtractedFields {
  event?: string
  rawThought?: string
  emotions?: string[]
  bodyFeeling?: string
  behavior?: string
  concern?: string
  desire?: string
  fear?: string
  relationshipPressure?: string
  patternTags?: string[]
}
```

## 7. 本地存储设计

第一版所有用户内容都存在本地。

### 7.1 Storage Key

```ts
export const STORAGE_KEYS = {
  THOUGHT_RECORDS: 'thought_records',
  THOUGHT_DRAFT: 'thought_draft',
  THEME_MODE: 'theme_mode',
  DISCOVERY_CACHE: 'discovery_cache',
  APP_SETTINGS: 'app_settings'
} as const
```

### 7.2 本地记录结构

```ts
export interface ThoughtRecordsStorage {
  version: number
  records: ThoughtRecord[]
}
```

### 7.3 本地草稿结构

```ts
export interface ThoughtDraftStorage {
  version: number
  draft?: ThoughtRecord
}
```

### 7.4 Storage 封装

```ts
import Taro from '@tarojs/taro'

export async function setLocalData<T>(key: string, data: T): Promise<void> {
  await Taro.setStorage({ key, data })
}

export async function getLocalData<T>(key: string): Promise<T | null> {
  try {
    const res = await Taro.getStorage({ key })
    return res.data as T
  } catch {
    return null
  }
}

export async function removeLocalData(key: string): Promise<void> {
  await Taro.removeStorage({ key })
}
```

### 7.5 本地记录服务

```ts
export async function getThoughtRecords(): Promise<ThoughtRecord[]> {
  const data = await getLocalData<ThoughtRecordsStorage>(
    STORAGE_KEYS.THOUGHT_RECORDS
  )
  return data?.records || []
}

export async function saveThoughtRecord(record: ThoughtRecord): Promise<void> {
  const records = await getThoughtRecords()
  const index = records.findIndex(item => item.id === record.id)

  const nextRecord: ThoughtRecord = {
    ...record,
    updatedAt: Date.now()
  }

  if (index >= 0) {
    records[index] = nextRecord
  } else {
    records.unshift(nextRecord)
  }

  await setLocalData<ThoughtRecordsStorage>(STORAGE_KEYS.THOUGHT_RECORDS, {
    version: 1,
    records
  })
}

export async function deleteThoughtRecord(id: string): Promise<void> {
  const records = await getThoughtRecords()

  await setLocalData<ThoughtRecordsStorage>(STORAGE_KEYS.THOUGHT_RECORDS, {
    version: 1,
    records: records.filter(item => item.id !== id)
  })
}

export async function clearAllThoughtRecords(): Promise<void> {
  await removeLocalData(STORAGE_KEYS.THOUGHT_RECORDS)
  await removeLocalData(STORAGE_KEYS.THOUGHT_DRAFT)
  await removeLocalData(STORAGE_KEYS.DISCOVERY_CACHE)
}
```

## 8. 状态管理设计

### 8.1 useThoughtStore

负责当前记录流程、心念本、本地保存。

```ts
interface ThoughtState {
  currentRecord?: ThoughtRecord
  records: ThoughtRecord[]
  loading: boolean

  createDraft: (rawThought: string) => void
  appendMessage: (message: ThoughtMessage) => void
  setCard: (card: ThoughtCard) => void
  addSecondLook: (secondLook: SecondLook) => void
  addLaterReview: (review: LaterReview) => void

  saveCurrentRecord: () => Promise<void>
  loadRecords: () => Promise<void>
  deleteRecord: (id: string) => Promise<void>
  clearAllRecords: () => Promise<void>
}
```

### 8.2 useThemeStore

```ts
export type ThemeMode = 'light' | 'dark' | 'system'

interface ThemeState {
  mode: ThemeMode
  actualTheme: 'light' | 'dark'
  setMode: (mode: ThemeMode) => Promise<void>
  initTheme: () => Promise<void>
}
```

### 8.3 状态流转

```txt
首页输入
  ↓
createDraft
  ↓
进入温柔倾听页
  ↓
appendMessage
  ↓
requestAI
  ↓
ask_more 或 generate_card
  ↓
setCard
  ↓
保存到心念本
```

## 9. AI 接口设计

AI 只做临时处理，不保存用户内容。

### 9.1 温柔倾听接口

```http
POST /api/ai/thought/respond
```

请求：

```ts
export interface ThoughtAIRequest {
  recordId: string
  rawThought: string
  messages: {
    role: 'user' | 'assistant'
    content: string
  }[]
}
```

返回：

```ts
export interface ThoughtAIResponse {
  reply: string

  action: 'ask_more' | 'generate_card'

  extracted: ThoughtExtractedFields

  missing?: 'event' | 'thought' | 'emotion' | 'concern' | 'none'

  card?: ThoughtCardDraft
}
```

### 9.2 再看一眼接口

```http
POST /api/ai/thought/second-look
```

请求：

```ts
export interface SecondLookRequest {
  recordId: string
  card: ThoughtCard
  messages: {
    role: 'user' | 'assistant'
    content: string
  }[]
}
```

返回：

```ts
export interface SecondLookResponse {
  secondLook: {
    angleTitle: string
    content: string
    protectMeaning?: string
    selfSentence?: string
  }
}
```

### 9.3 AI Proxy 约束

服务端禁止：

- 保存用户原文；
- 保存对话内容；
- 保存心念卡；
- 保存再看一眼内容；
- 将用户文本写入日志；
- 将 AI 返回正文写入日志。

服务端允许：

- 记录请求时间；
- 记录接口耗时；
- 记录是否成功；
- 记录错误类型；
- 记录 token 用量。

错误日志必须脱敏。

## 10. AI 输出策略

AI 的角色：

> 温柔的倾听者，克制的整理者。

### 10.1 基本规则

1. 先听见，再映照，再轻问；
2. 一次只问一个问题；
3. 不问用户已经明确说过的信息；
4. 不固定轮数；
5. 信息足够时生成心念卡；
6. 不做心理诊断；
7. 不输出强建议；
8. 不使用绝对判断；
9. 用户原话必须保留；
10. 结论使用「可能、似乎、像是、也许」等表达。

### 10.2 倾听返回示例

```json
{
  "reply": "我听见你说，股票下跌之后，你不只是看到亏损，也很快把它和「我是不是很差劲」联系到了一起。这里面像是有愧疚、焦虑，也有一种害怕辜负家里信任的压力。这条念头的脉络已经比较清楚了，我先帮你整理成一张心念卡，你看看贴不贴近。",
  "action": "generate_card",
  "extracted": {
    "event": "股票下跌，账户出现亏损。",
    "rawThought": "我是不是很差劲。",
    "emotions": ["愧疚", "焦虑", "不甘"],
    "fear": "害怕辜负家里的信任，也害怕自己判断错误。",
    "patternTags": ["自我否定", "责任压力", "害怕辜负"]
  },
  "missing": "none",
  "card": {
    "title": "这一念",
    "originalQuote": "我是不是很差劲。",
    "eventSummary": "股票下跌，账户出现亏损，这让你感到愧疚和压力。",
    "emotions": ["愧疚", "焦虑", "不甘"],
    "insight": "这条念头背后，可能不只是亏损本身，而是你很在意自己是否可靠，也害怕辜负家里的信任。",
    "patternTags": ["自我否定", "责任压力", "害怕辜负"],
    "gentleReminder": "亏损需要被处理，但它不等于你这个人很差劲。"
  }
}
```

## 11. 页面技术实现

### 11.1 记录首页

职责：

- 输入念头；
- 保存草稿；
- 跳转温柔倾听页。

关键状态：

```ts
const [content, setContent] = useState('')
```

点击按钮：

```ts
function handleStart() {
  if (!content.trim()) {
    Taro.showToast({
      title: '可以先写下一句话',
      icon: 'none'
    })
    return
  }

  createDraft(content)
  Taro.navigateTo({
    url: '/pages/listen/index'
  })
}
```

### 11.2 温柔倾听页

职责：

- 展示 messages；
- 用户继续输入；
- 调用 AI；
- 根据 action 判断继续问还是生成卡。

关键逻辑：

```ts
async function handleSend(content: string) {
  appendMessage({
    id: createId(),
    role: 'user',
    content,
    createdAt: Date.now()
  })

  const res = await requestThoughtAI(currentRecord)

  appendMessage({
    id: createId(),
    role: 'assistant',
    content: res.reply,
    createdAt: Date.now()
  })

  if (res.action === 'generate_card' && res.card) {
    setCard(normalizeThoughtCard(res.card))
    Taro.navigateTo({
      url: '/pages/thought-detail/index?from=generated'
    })
  }
}
```

### 11.3 心念本页

职责：

- 读取本地 records；
- 展示最近摘要；
- 支持筛选；
- 进入详情。

筛选维度：

- 全部
- 按感受
- 按模式
- 按原话

### 11.4 这一念详情页

职责：

- 展示心念卡；
- 保存到心念本；
- 再看一眼；
- 保存图片；
- 分享；
- 查看原始对话；
- 添加后来再看。

### 11.5 发现页

职责：

- 基于本地记录计算统计；
- 展示最近 7 天摘要；
- 展示常见模式；
- 展示最近对自己说的话；
- 展示卡片墙。

## 12. 发现页统计方案

发现页全部基于本地 records 计算。

### 12.1 统计范围

第一版默认：

- 最近 7 天

后续支持：

- 最近 30 天
- 全部

### 12.2 统计指标

- 记录数量
- 高频情绪
- 高频模式
- 高频原话
- 最近提醒
- 最近对自己说的话

### 12.3 计算逻辑

```ts
export function buildDiscoverySummary(records: ThoughtRecord[]): DiscoverySummary {
  const now = Date.now()
  const startAt = now - 7 * 24 * 60 * 60 * 1000

  const recentRecords = records.filter(record => {
    return record.createdAt >= startAt && record.status === 'saved'
  })

  const emotionMap = new Map<string, number>()
  const patternMap = new Map<string, number>()
  const quotes: string[] = []

  recentRecords.forEach(record => {
    record.card?.emotions?.forEach(emotion => {
      emotionMap.set(emotion, (emotionMap.get(emotion) || 0) + 1)
    })

    record.card?.patternTags?.forEach(pattern => {
      patternMap.set(pattern, (patternMap.get(pattern) || 0) + 1)
    })

    if (record.card?.originalQuote) {
      quotes.push(record.card.originalQuote)
    }
  })

  return {
    range: '7d',
    startAt,
    endAt: now,
    recordCount: recentRecords.length,
    topEmotions: toStatItems(emotionMap, recentRecords.length),
    topPatterns: toStatItems(patternMap, recentRecords.length),
    recentQuotes: quotes.slice(0, 8),
    generatedAt: now
  }
}
```

## 13. 保存图片方案

### 13.1 功能目标

用户可以把「这一念」生成图片保存到本地相册。

### 13.2 实现方式

使用小程序 Canvas 绘制分享图。

图片内容包括：

- 产品名：念头
- 日期
- 原始念头
- 当时
- 感受
- 看见
- 提醒
- 轻量装饰元素

### 13.3 生成流程

```txt
用户点击保存图片
  ↓
检查相册权限
  ↓
Canvas 绘制心念卡
  ↓
导出临时图片
  ↓
保存到相册
```

### 13.4 权限处理

如果没有相册权限，提示：

> 需要相册权限，才能保存这张心念卡。

如果保存成功：

> 已保存到相册。

如果失败：

> 保存失败，可以稍后再试。

## 14. 分享方案

### 14.1 微信分享

支持：

- 分享小程序页面；
- 分享生成后的心念卡图片。

### 14.2 隐私提示

分享前提示：

> 这条念头可能包含私密内容，请确认后再分享。

### 14.3 默认分享策略

不默认分享完整隐私内容。

建议分享：

- 心念卡图片，由用户主动生成；
- 或小程序入口。

## 15. 主题系统

### 15.1 主题模式

支持：

```ts
export type ThemeMode = 'light' | 'dark' | 'system'
```

### 15.2 主题变量

```scss
:root {
  --color-bg: #fff8ec;
  --color-card: #fffdf7;
  --color-text-primary: #3f3024;
  --color-text-secondary: #8f7a60;
  --color-primary: #d99a28;
  --color-border: rgba(120, 90, 50, 0.14);
}

.theme-dark {
  --color-bg: #070b1f;
  --color-card: rgba(25, 30, 65, 0.72);
  --color-text-primary: #f2ecff;
  --color-text-secondary: #a8a0c8;
  --color-primary: #9273e6;
  --color-border: rgba(180, 160, 255, 0.16);
}
```

### 15.3 统一卡片组件

```tsx
interface AppCardProps {
  title?: string
  children: React.ReactNode
  className?: string
}

export function AppCard(props: AppCardProps) {
  return (
    <View className={`app-card ${props.className || ''}`}>
      {props.title && <View className="app-card__title">{props.title}</View>}
      <View className="app-card__content">{props.children}</View>
    </View>
  )
}
.app-card {
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: 24px;
  padding: 32px;
  box-sizing: border-box;
}

.app-card__title {
  font-size: 32px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 16px;
}

.app-card__content {
  font-size: 28px;
  color: var(--color-text-secondary);
}
```

## 16. 语音输入方案

第一版保留语音入口，文本输入优先。

### 16.1 第一版建议

第一版可以先做：

- 语音按钮视觉；
- 录音入口；
- 后续接入语音转文字。

如果时间充足，可支持：

- 长按录音；
- 语音转文字；
- 用户确认后填入输入框。

### 16.2 语音隐私

语音不长期保存。
识别后只保存转写文本。

## 17. 异常处理

### 17.1 AI 请求失败

提示：

> 刚刚没有整理成功，但你的记录还在本地。可以稍后再试。

操作：

- 重试；
- 手动保存；
- 返回记录页。

### 17.2 本地保存失败

提示：

> 当前设备存储空间可能不足，保存失败了。

操作：

- 重试；
- 复制文本；
- 清理本地记录。

### 17.3 AI 返回异常

如果 JSON 解析失败：

- 将 reply 作为普通文本展示；
- 不生成卡；
- 提供「重新整理」。

### 17.4 图片保存失败

提示：

> 保存图片失败，可以稍后再试。

### 17.5 分享取消

用户取消分享不提示错误。

## 18. 隐私与安全

### 18.1 前端

- 所有记录本地保存；
- 草稿本地保存；
- 支持清空本地记录；
- 不默认开启云端能力。

### 18.2 AI Proxy

- AI Key 只放服务端；
- 用户内容不落库；
- 日志不记录正文；
- 错误日志脱敏；
- 可增加简单频控，避免滥用。

### 18.3 隐私提示位置

需要在以下位置展示：

首页：

> 你的念头，只保存在当前设备。

温柔倾听页：

> 你的记录仅保存在当前设备。

我的页：

> 数据与隐私说明。

分享前：

> 这条念头可能包含私密内容，请确认后再分享。

## 19. 开发里程碑

### 阶段 1：基础工程与视觉系统

目标：

- 初始化 Taro 项目；
- 配置 React + TypeScript + SCSS；
- 建立主题变量；
- 完成底部导航；
- 完成统一卡片组件；
- 完成主要页面静态稿。

产出：

- 记录首页
- 温柔倾听页
- 心念本页
- 这一念详情页
- 发现页
- 我的页

### 阶段 2：本地数据闭环

目标：

- 创建本地草稿；
- 保存本地记录；
- 读取本地记录；
- 删除记录；
- 清空记录；
- 本地发现统计。

产出：

- 不接 AI 也能跑通核心流程。

### 阶段 3：AI Mock 流程

目标：

- Mock 温柔倾听返回；
- Mock 心念卡生成；
- Mock 再看一眼；
- 完成页面流转。

产出：

- 完整体验可测试。

### 阶段 4：AI Proxy 接入

目标：

- 搭建 AI Proxy；
- 接入真实 AI；
- 结构化 JSON 返回；
- 不落库；
- 错误降级。

产出：

- 真实 AI 可用，用户记录仍只保存在本地。

### 阶段 5：图片保存与分享

目标：

- Canvas 绘制心念卡；
- 保存到相册；
- 分享提示；
- 分享页面或图片。

产出：

- 「这一念」支持保存图片和分享。

### 阶段 6：上线打磨

目标：

- 空状态；
- Loading 状态；
- 错误状态；
- 隐私说明；
- 权限提示；
- 性能优化；
- 小程序审核准备。

## 20. 验收标准

### 20.1 本地存储

- 记录可以保存到本地；
- 关闭小程序后再次打开仍可读取；
- 删除单条记录生效；
- 清空全部记录生效；
- 服务端没有用户记录表。

### 20.2 AI 临时处理

- 小程序不暴露 AI Key；
- AI Proxy 不保存用户正文；
- AI 请求失败不丢失草稿；
- AI 返回结果由前端保存到本地。

### 20.3 核心流程

- 首页可以记录；
- 温柔倾听可以继续表达；
- 信息足够时生成心念卡；
- 心念卡可以保存到心念本；
- 可以进入详情页回看；
- 可以再看一眼；
- 可以添加后来再看；
- 可以保存图片；
- 可以分享。

### 20.4 发现页

- 基于本地记录统计；
- 可以展示最近 7 天记录数；
- 可以展示高频情绪；
- 可以展示高频模式；
- 可以展示最近对自己说的话；
- 可以展示念头墙。

### 20.5 视觉与主题

- 浅色模式正常；
- 深色模式正常；
- 页面结构一致；
- 卡片系统统一；
- 不因主题切换导致布局变化。

## 21. 后续技术演进

### 21.1 本地加密

可增加：

- 手势密码；
- 指纹 / Face ID；
- 私密记录二次解锁。

### 21.2 数据导出

支持：

- JSON
- Markdown
- PDF

### 21.3 云端加密备份

如后续做云同步，原则是：

- 默认不开启；
- 用户主动开启；
- 本地加密；
- 服务端只存密文；
- 服务端不可读明文。

### 21.4 模型能力增强

后续可以扩展：

- 周回望；
- 个人模式地图；
- 语音版心念卡；
- 长期变化分析；
- 本地语义搜索。

## 22. 总结

第一版技术重点不是搭复杂后端，而是打通本地闭环：

> 本地草稿 → AI 临时整理 → 心念卡 → 本地保存 → 心念本回看 → 发现页统计

最重要的技术原则是：

> 用户记录属于用户，只保存在当前设备。
> 服务端只是临时整理通道，不保存用户念头。

这样既能快速上线，也能建立产品最重要的隐私信任。
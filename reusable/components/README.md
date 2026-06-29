# components/

通用 UI 组件。每个组件一个子目录，含源码 + `README.md`（用法、依赖、迁移）。

## 抽取标准

- 跨项目可复用（无业务依赖）
- 零状态 / 受控状态（不耦合全局 store）
- 文档化 props 和使用方式

## 已抽取

| 组件 | 说明 | 适用场景 |
|---|---|---|
| `CachedImage` | 远程图本地缓存 + placeholder | 列表/详情页所有图片 |
| `AppNoticeModal` | 应用内公告/提示弹窗 | 公告、活动横幅、功能引导 |
| `PageHeader` | 页面顶部统一 | 需要返回按钮 + 标题的详情页 |
| `Page` | 页面容器壳 | 顶层包装 |
| `GlobalFab` | 全局浮动按钮 | 反馈入口等 |
| `Confetti` | 撒花特效 | 达成、签到、抽奖 |
| `SearchBar` | 搜索输入条 | 列表筛选搜索 |
| `AnnouncementModal` | 系统公告展示 | 公告列表/详情 |
| `DetailCard` | 详情卡片壳 | 详情页区块 |

## 未抽取（领域特定，留原项目）

`ActivityCard`、`PetCard`、`SkillCard`、`ItemCard`、`ElementIcon`、`AlchemyRecipe`、`FilterPanel`、`BossSkillRows` 等业务组件。

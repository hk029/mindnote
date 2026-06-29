# reusable/

从 `rocokingdom` 项目提取的、可复用到其他 Taro + React 微信小程序项目的资产。

## 目录结构

```
reusable/
├── README.md                    # 本文件（索引）
├── components/                  # 通用 UI 组件（带源码 + README）
│   ├── CachedImage/             # 远程图 + 本地缓存
│   ├── AppNoticeModal/          # 公告/提示模态框
│   ├── PageHeader/              # 页面顶部统一
│   ├── Page/                    # 页面壳
│   ├── GlobalFab/               # 全局浮动按钮
│   ├── Confetti/                # 撒花特效
│   ├── SearchBar/               # 搜索输入
│   ├── AnnouncementModal/       # 系统公告
│   └── DetailCard/              # 详情卡片壳
├── utils/                       # 通用工具（带源码 + README）
│   ├── subscribeMessage.ts      # 微信订阅消息统一封装
│   └── obfuscate.ts             # Base64 + JSON 混淆
├── patterns/                    # 可复用模式文档
│   ├── api-response-format.md           # {code,message,data,pagination} 约定
│   ├── subscribe-message-flow.md        # 订阅消息走法
│   ├── cached-image-container-size.md   # CachedImage 容器尺寸硬规则
│   ├── css-variables-and-bem.md         # 字号变量 + BEM 命名
│   ├── blue-green-deployment.md         # 蓝绿部署
│   └── smoke-test.md                    # 部署后冒烟测试工作流
└── conventions/
    └── hard-rules.md                     # 从 CLAUDE.md 提取的硬约束
```

## 怎么用

### 1. 搬组件到新项目

```bash
cp -r reusable/components/CachedImage <新项目>/src/components/
cp -r reusable/components/AppNoticeModal <新项目>/src/components/
# ... 把 require 的 SCSS 和 services 一起搬过去
```

每个组件目录下都有 `README.md` 描述依赖、用法、迁移要点。

### 2. 搬 utils

```bash
cp reusable/utils/subscribeMessage.ts <新项目>/src/utils/
cp reusable/utils/obfuscate.ts <新项目>/src/utils/
```

### 3. 套用模式/规范

读 `patterns/` 下对应文档，按里面的代码示例和约束写新代码。

### 4. 套用硬约束

把 `conventions/hard-rules.md` 的内容拷到新项目的 `CLAUDE.md` 里，针对项目定制。

## 不在这里的（项目特定）

以下内容**不**适合复用，留在原项目：

- 业务领域：宠物/精灵/技能/道具/活动/元素的 data 和组件
- `PetCard`、`SkillCard`、`ElementIcon` 等
- `services/api.ts`（项目专属 API 端点）
- `pages/*`（业务页面）
- 数据库 schema、`database/` 目录

## 提取原则

- **跨项目可用**：去掉了项目特定命名/路径，改成相对引用或 README 说明
- **零业务依赖**：纯展示/封装逻辑，不耦合具体游戏数据
- **可独立运行**：每个目录都有自己的 README，迁移时不依赖外部文档

## 维护

新增 / 修改可复用资产：
1. 先在本项目里完成实现，跑通
2. 复制到 `reusable/` 对应目录，更新 README
3. 提交一个 commit，message 写明"extract X to reusable/"

## 项目目录参考

- `miniprogram/` — Taro 源码
- `server/` — Go Fiber 后端
- `web-map-editor/` — 地图编辑器（独立项目，可借鉴但不算通用）
- `docs/` — 项目特定文档（含 `blue-green-deployment.md`、`api.md` 等）

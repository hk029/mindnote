# 「念头」小程序快速开始指南

## 1. 快速概览

### 1.1 项目目标

打造一个温暖治愈的「念头」小程序，让用户可以安静地记录和回看自己的念头。

### 1.2 核心视觉

- **浅色模式**：温暖纸张风，米白色调，日落海面
- **深色模式**：深色静谧风，深蓝黑色，夜空星星
- **整体感觉**：安静、温暖、私密、治愈

## 2. 素材需求（你需要准备的）

### 2.1 必须准备（P0，3天）

#### 底部导航图标（8个）
```
文件名：tab-record.png / tab-record-active.png
描述：叶子或笔形状，轮廓+填充版本
尺寸：48x48px（2倍图）
颜色：默认灰色，选中暖黄色

文件名：tab-book.png / tab-book-active.png
描述：书本或纸页形状
尺寸：48x48px
颜色：同上

文件名：tab-discover.png / tab-discover-active.png
描述：星星或罗盘形状
尺寸：48x48px
颜色：同上

文件名：tab-mine.png / tab-mine-active.png
描述：人形或小屋形状
尺寸：48x48px
颜色：同上
```

#### 浅色模式背景（1张）
```
文件名：bg-light-sunset.png
描述：日落海面背景，温暖纸张风
尺寸：750x1334px
风格：米白到暖黄渐变，海面元素，轻微手绘感
参考：ChatGPT Image 2026年6月29日 14_40_26.png
```

#### 功能操作图标（8个）
```
文件名：icon-voice.png（麦克风）
文件名：icon-send.png（纸飞机）
文件名：icon-save.png（磁盘）
文件名：icon-share.png（分享图标）
文件名：icon-back.png（左箭头）
文件名：icon-close.png（X）
文件名：icon-delete.png（垃圾桶）
文件名：icon-edit.png（铅笔）
尺寸：32x32px（2倍图）
颜色：主色 #D99A28
```

### 2.2 重要准备（P1，2.5天）

#### 深色模式背景（1张）
```
文件名：bg-dark-night.png
描述：夜空背景，深色静谧风
尺寸：750x1334px
风格：深蓝黑色调，月亮星星
参考：ChatGPT Image 2026年6月29日 14_40_33.png
```

#### 装饰元素（8-10个）
```
文件名：deco-star-1.png / deco-star-2.png / deco-star-3.png
描述：不同大小的星星
尺寸：24px / 32px / 48px

文件名：deco-cloud-1.png / deco-cloud-2.png
描述：轻柔的小云朵
尺寸：64x32px / 96x48px

文件名：deco-leaf-1.png / deco-leaf-2.png
描述：自然的小叶子
尺寸：32px / 48px

文件名：deco-moon.png
描述：夜间静月
尺寸：64x64px
```

#### 品牌Logo（1个）
```
文件名：logo.png
描述：「念头」产品Logo
尺寸：120x120px
风格：简洁温暖
```

## 3. 开发实现（我会做的）

### 3.1 立即开始（第1天）

#### 建立设计系统
```scss
// 颜色变量
:root {
  --color-primary: #D99A28;
  --color-bg: #FFF8EA;
  --color-card: #FFFDF7;
  --color-text: #3F3024;
}

// 字体系统
$font-size-sm: 24px;
$font-size-base: 28px;
$font-size-lg: 32px;

// 间距系统
$spacing-sm: 8px;
$spacing-md: 16px;
$spacing-lg: 24px;
$spacing-xl: 32px;
```

#### 实现基础组件
- 卡片组件（AppCard）
- 按钮组件（Button）
- 输入框组件（Input）
- 标签组件（Tag）

### 3.2 搭建框架（第2天）

#### 页面框架
```
pages/
├── record/          # 记录首页
├── listen/          # 温柔倾听页
├── thought-book/    # 心念本页
├── thought-detail/  # 这一念详情页
├── discover/        # 发现页
└── mine/            # 我的页面
```

#### 基础布局
- 底部导航栏
- 页面头部
- 内容区域
- 背景层

### 3.3 样式实现（第3-4天）

#### 用CSS实现的效果
```scss
// 背景渐变
.bg-light {
  background: linear-gradient(180deg, #FFF8EA, #F5E6C3, #F8B862);
}

// 卡片样式
.card {
  background: var(--color-card);
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

// 按钮样式
.btn-primary {
  background: var(--color-primary);
  color: white;
  border-radius: 16px;
  padding: 24px 48px;
}
```

### 3.4 素材替换（第5天）

#### 替换背景
```tsx
// 从CSS渐变替换为图片
<View className="page-bg" />
```

#### 替换图标
```tsx
// 从CSS图标替换为图片
<Image src="/assets/icons/tab/record.png" />
```

### 3.5 细节优化（第6-7天）

#### 添加装饰
```tsx
// 添加浮动装饰
<View className="decorations">
  <Image src="/assets/deco/star-1.png" className="deco-star" />
  <Image src="/assets/deco/cloud-1.png" className="deco-cloud" />
</View>
```

#### 动画效果
```scss
// 星星闪烁
@keyframes twinkle {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

// 云朵漂浮
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
```

## 4. 协作安排

### 4.1 每日任务

**设计师（你）**
- 第1天：制作底部导航图标（8个）
- 第2天：制作浅色模式背景（1张）
- 第3天：制作功能操作图标（8个）
- 第4天：制作深色模式背景（1张）
- 第5天：制作装饰元素（8-10个）
- 第6天：制作品牌Logo（1个）
- 第7天：优化细节，补充素材

**开发者（我）**
- 第1天：建立设计系统，实现基础组件
- 第2天：搭建页面框架，实现基础布局
- 第3天：用CSS实现背景和图标效果
- 第4天：实现卡片和组件样式
- 第5天：替换背景和图标素材
- 第6天：添加装饰和动画效果
- 第7天：优化适配和性能

### 4.2 同步安排

**每日同步**
- 早上9点：确认当天任务
- 晚上6点：同步进度和问题

**节点评审**
- 第3天：P0素材评审，确认风格
- 第5天：页面效果评审，确认布局
- 第7天：整体效果评审，确认上线

## 5. 素材制作规范

### 5.1 设计工具

**推荐：Figma**
- 免费版够用
- 协作方便
- 切图方便
- 有丰富插件

### 5.2 颜色规范

**浅色模式**
- 主色：`#D99A28`（暖黄色）
- 背景色：`#FFF8EA`（米白色）
- 卡片色：`#FFFDF7`（奶油白）
- 文字色：`#3F3024`（深棕色）

**深色模式**
- 主色：`#9273E6`（月光紫）
- 背景色：`#070B1F`（深蓝黑）
- 卡片色：`rgba(25, 30, 65, 0.72)`
- 文字色：`#F2ECFF`（淡紫色）

### 5.3 尺寸规范

**图标**
- 大图标：48x48px（2倍图）
- 小图标：32x32px（2倍图）
- 线条宽度：2px

**背景**
- 尺寸：750x1334px
- 格式：PNG或JPG

**装饰**
- 星星：24px / 32px / 48px
- 云朵：64x32px / 96x48px
- 叶子：32px / 48px

### 5.4 文件命名

```
[类型]-[名称]-[状态].[格式]

示例：
tab-record.png
tab-record-active.png
bg-light-sunset.png
deco-star-1.png
```

## 6. 常见问题

### Q1：素材风格怎么把握？

**参考视觉稿**
- 查看 `docs/visual/` 目录下的图片
- 参考 `design-system.md` 中的描述
- 参考 `asset-analysis.md` 中的详细说明

**风格关键词**
- 温暖、安静、治愈、私密、克制
- 不要太工具化，不要太心理咨询化
- 少即是多，留白充足

### Q2：开发者用CSS能实现什么？

**可以实现**
- 背景渐变效果
- 基础图标（用SVG或clip-path）
- 简单装饰（用CSS形状）
- 动画效果

**需要素材**
- 复杂背景图片
- 精细图标
- 品牌Logo
- 装饰插画

### Q3：素材准备好后怎么替换？

**替换背景**
```tsx
// 之前：CSS渐变
<View className="page-bg" />

// 之后：图片背景
<Image src="/assets/backgrounds/bg-light-sunset.png" className="page-bg" />
```

**替换图标**
```tsx
// 之前：CSS图标
<View className="icon-record" />

// 之后：图片图标
<Image src="/assets/icons/tab/record.png" />
```

### Q4：深色模式怎么适配？

**设计层面**
- 提供深色模式背景
- 提供深色模式图标
- 保持布局一致

**开发层面**
- 使用CSS变量
- 根据主题切换颜色
- 图片提供两个版本

## 7. 立即开始

### 7.1 你现在要做的

**第一步：确认素材清单**
1. 阅读 `docs/visual/asset-analysis.md`
2. 确认P0素材清单
3. 确认制作时间

**第二步：开始制作素材**
1. 打开Figma或其他设计工具
2. 参考视觉稿设计
3. 按规范制作图标和背景

**第三步：同步给我**
1. 完成一个素材就同步
2. 我立即替换到代码中
3. 一起确认效果

### 7.2 我现在要做的

**第一步：建立设计系统**
1. 定义颜色、字体、间距变量
2. 创建基础样式文件
3. 建立组件样式规范

**第二步：实现基础组件**
1. 卡片组件
2. 按钮组件
3. 输入框组件
4. 标签组件

**第三步：搭建页面框架**
1. 记录首页
2. 温柔倾听页
3. 心念本页
4. 这一念详情页
5. 发现页
6. 我的页面

### 7.3 我们一起做的

**每日同步**
- 确认进度
- 解决问题
- 调整计划

**节点评审**
- 确认效果
- 优化细节
- 推进项目

## 8. 总结

### 8.1 核心任务

**你需要准备**
- 底部导航图标（8个）
- 背景图片（2张）
- 功能图标（8个）
- 装饰元素（8-10个）
- 品牌Logo（1个）

**我会实现**
- 设计系统
- 基础组件
- 页面框架
- 样式效果
- 素材替换

### 8.2 时间安排

**总计：7天**
- 设计师：3天P0 + 2.5天P1 + 1.5天P2
- 开发者：2.5天基础 + 2天样式 + 1.5天替换 + 1.5天优化

### 8.3 成功标准

**视觉效果**
- 符合温暖治愈风
- 浅色/深色模式一致
- 卡片系统统一

**技术实现**
- 组件可复用
- 样式可维护
- 性能良好

---

**立即行动：**
1. 确认素材清单
2. 开始制作P0素材
3. 我开始建立设计系统
4. 保持每日同步
5. 按计划推进项目
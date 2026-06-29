# 「念头」小程序设计系统

## 1. 设计系统概述

本文档是「念头」小程序的完整设计系统规范，基于需求方案和视觉参考图片制定。设计系统旨在确保产品视觉的一致性、可维护性和可扩展性。

## 2. 颜色系统

### 2.1 浅色模式（温暖治愈风）

**主色调**
- 主色：`#D99A28`（暖黄色）
- 主色浅：`#F5E6C3`
- 主色深：`#B37A1E`

**背景色**
- 页面背景：`#FFF8EA`（米白色）
- 卡片背景：`#FFFDF7`（奶油白）
- 输入框背景：`#FFFCF5`

**文字色**
- 主文字：`#3F3024`（深棕色）
- 次文字：`#8F7A60`（浅棕色）
- 辅助文字：`#B8A88A`
- 占位文字：`#C4B69C`

**装饰色**
- 日落橙：`#F8B862`
- 海面蓝：`#7EC8E3`
- 云朵白：`#F5F5F5`
- 叶子绿：`#8BC34A`
- 星光金：`#FFD700`

**边框色**
- 边框：`rgba(120, 90, 50, 0.14)`
- 分割线：`rgba(120, 90, 50, 0.08)`

**状态色**
- 成功：`#52C41A`
- 警告：`#FAAD14`
- 错误：`#FF4D4F`
- 信息：`#1890FF`

### 2.2 深色模式（深色静谧风）

**主色调**
- 主色：`#9273E6`（月光紫）
- 主色浅：`#B8A0F0`
- 主色深：`#6B4DB8`

**背景色**
- 页面背景：`#070B1F`（深蓝黑）
- 卡片背景：`rgba(25, 30, 65, 0.72)`（半透明玻璃感）
- 输入框背景：`rgba(35, 40, 75, 0.8)`

**文字色**
- 主文字：`#F2ECFF`（淡紫色）
- 次文字：`#A8A0C8`
- 辅助文字：`#6B6388`
- 占位文字：`#5A5278`

**装饰色**
- 月光银：`#C0C0C0`
- 夜空蓝：`#1A1A3E`
- 星光白：`#FFFFFF`
- 远山紫：`#4A3F6B`

**边框色**
- 边框：`rgba(180, 160, 255, 0.16)`
- 分割线：`rgba(180, 160, 255, 0.08)`

**状态色**
- 成功：`#73D13D`
- 警告：`#FFC53D`
- 错误：`#FF7875`
- 信息：`#40A9FF`

## 3. 字体系统

### 3.1 字体栈

```scss
$font-family-primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
$font-family-mono: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
```

### 3.2 字体大小

```scss
// 基础大小
$font-size-xs: 20px;    // 极小
$font-size-sm: 24px;    // 小
$font-size-base: 28px;  // 基础
$font-size-lg: 32px;    // 大
$font-size-xl: 36px;    // 特大
$font-size-2xl: 40px;   // 超大
$font-size-3xl: 48px;   // 巨大

// 特殊用途
$font-size-display: 56px;  // 展示用
$font-size-title: 44px;    // 页面标题
```

### 3.3 字重

```scss
$font-weight-light: 300;
$font-weight-normal: 400;
$font-weight-medium: 500;
$font-weight-semibold: 600;
$font-weight-bold: 700;
```

### 3.4 行高

```scss
$line-height-tight: 1.2;
$line-height-normal: 1.5;
$line-height-relaxed: 1.75;
$line-height-loose: 2;
```

## 4. 间距系统

### 4.1 基础间距

```scss
// 基础单位 4px
$spacing-1: 4px;
$spacing-2: 8px;
$spacing-3: 12px;
$spacing-4: 16px;
$spacing-5: 20px;
$spacing-6: 24px;
$spacing-7: 28px;
$spacing-8: 32px;
$spacing-10: 40px;
$spacing-12: 48px;
$spacing-16: 64px;
$spacing-20: 80px;
$spacing-24: 96px;
```

### 4.2 组件间距

```scss
// 卡片内边距
$card-padding-sm: 24px;
$card-padding-md: 32px;
$card-padding-lg: 48px;

// 页面内边距
$page-padding: 32px;
$page-padding-horizontal: 24px;

// 元素间距
$gap-xs: 8px;
$gap-sm: 12px;
$gap-md: 16px;
$gap-lg: 24px;
$gap-xl: 32px;
```

## 5. 卡片系统

### 5.1 卡片类型

**基础卡片（AppCard）**
- 用途：通用内容容器
- 圆角：24px
- 内边距：32px
- 阴影：轻阴影
- 边框：1px solid var(--color-border)

**念头卡片（ThoughtCard）**
- 用途：展示单条念头记录
- 圆角：32px
- 内边距：40px
- 阴影：中等阴影
- 特殊：纸张质感

**列表卡片（ThoughtListCard）**
- 用途：心念本列表项
- 圆角：24px
- 内边距：28px
- 阴影：轻阴影
- 特殊：左侧装饰线

**发现卡片（DiscoveryCard）**
- 用途：发现页统计展示
- 圆角：28px
- 内边距：32px
- 阴影：轻阴影
- 特殊：进度条装饰

**念头墙卡片（ThoughtWallCard）**
- 用途：发现页卡片墙
- 圆角：20px
- 内边距：24px
- 阴影：轻阴影
- 特殊：半透明背景

### 5.2 卡片样式规范

```scss
// 浅色模式卡片
.card-light {
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  
  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  }
}

// 深色模式卡片
.card-dark {
  background: rgba(25, 30, 65, 0.72);
  border: 1px solid rgba(180, 160, 255, 0.16);
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(25, 30, 65, 0.8);
  }
}
```

### 5.3 卡片内容结构

```scss
.card {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }
  
  &__title {
    font-size: 32px;
    font-weight: 600;
    color: var(--color-text-primary);
  }
  
  &__subtitle {
    font-size: 24px;
    color: var(--color-text-secondary);
    margin-top: 4px;
  }
  
  &__content {
    font-size: 28px;
    color: var(--color-text-primary);
    line-height: 1.6;
  }
  
  &__footer {
    margin-top: 24px;
    padding-top: 16px;
    border-top: 1px solid var(--color-border);
  }
}
```

## 6. 组件样式

### 6.1 按钮

**主按钮**
```scss
.btn-primary {
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 16px;
  padding: 24px 48px;
  font-size: 32px;
  font-weight: 600;
  
  &:active {
    opacity: 0.9;
    transform: scale(0.98);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
```

**次按钮**
```scss
.btn-secondary {
  background: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
  border-radius: 16px;
  padding: 22px 48px;
  font-size: 32px;
  font-weight: 500;
  
  &:active {
    background: var(--color-primary-light);
  }
}
```

**文字按钮**
```scss
.btn-text {
  background: transparent;
  color: var(--color-primary);
  border: none;
  padding: 16px 24px;
  font-size: 28px;
  
  &:active {
    opacity: 0.7;
  }
}
```

### 6.2 输入框

```scss
.input {
  background: var(--color-input-bg);
  border: 2px solid var(--color-border);
  border-radius: 16px;
  padding: 24px 32px;
  font-size: 32px;
  color: var(--color-text-primary);
  width: 100%;
  box-sizing: border-box;
  
  &::placeholder {
    color: var(--color-text-placeholder);
  }
  
  &:focus {
    border-color: var(--color-primary);
    outline: none;
    box-shadow: 0 0 0 4px var(--color-primary-light);
  }
  
  &--textarea {
    min-height: 200px;
    resize: none;
    line-height: 1.6;
  }
}
```

### 6.3 标签

```scss
.tag {
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 12px;
  font-size: 24px;
  font-weight: 500;
  
  &--primary {
    background: var(--color-primary-light);
    color: var(--color-primary);
  }
  
  &--secondary {
    background: var(--color-secondary-light);
    color: var(--color-secondary);
  }
  
  &--emotion {
    background: var(--color-emotion-light);
    color: var(--color-emotion);
  }
  
  &--pattern {
    background: var(--color-pattern-light);
    color: var(--color-pattern);
  }
}
```

### 6.4 对话气泡

```scss
.chat-bubble {
  max-width: 80%;
  padding: 24px 32px;
  border-radius: 24px;
  font-size: 30px;
  line-height: 1.6;
  
  &--user {
    background: var(--color-primary);
    color: white;
    border-bottom-right-radius: 8px;
    margin-left: auto;
  }
  
  &--assistant {
    background: var(--color-card);
    color: var(--color-text-primary);
    border-bottom-left-radius: 8px;
    margin-right: auto;
  }
}
```

### 6.5 空状态

```scss
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 96px 32px;
  
  &__icon {
    width: 120px;
    height: 120px;
    margin-bottom: 32px;
    opacity: 0.6;
  }
  
  &__title {
    font-size: 32px;
    font-weight: 600;
    color: var(--color-text-primary);
    margin-bottom: 12px;
  }
  
  &__description {
    font-size: 28px;
    color: var(--color-text-secondary);
    text-align: center;
  }
}
```

## 7. 图标系统

### 7.1 图标风格

- 风格：简洁、圆润、线面结合
- 线条：2px 线宽
- 圆角：2px
- 颜色：继承父元素颜色
- 尺寸：24px / 32px / 48px

### 7.2 底部导航图标

| 导航项 | 默认状态 | 选中状态 | 图标描述 |
|--------|----------|----------|----------|
| 记录 | 叶子轮廓 | 填充叶子 | 象征念头生长 |
| 心念本 | 书本轮廓 | 打开的书本 | 象征记录保存 |
| 发现 | 星星轮廓 | 发光星星 | 象征发现洞察 |
| 我的 | 人形轮廓 | 圆形头像 | 象征个人空间 |

### 7.3 功能图标

| 功能 | 图标 | 尺寸 | 颜色 |
|------|------|------|------|
| 语音输入 | 麦克风 | 48px | 主色 |
| 发送 | 纸飞机 | 48px | 主色 |
| 保存 | 磁盘 | 32px | 主色 |
| 分享 | 分享图标 | 32px | 主色 |
| 返回 | 左箭头 | 32px | 主文字色 |
| 关闭 | X | 32px | 主文字色 |
| 删除 | 垃圾桶 | 32px | 错误色 |
| 编辑 | 铅笔 | 32px | 主色 |

## 8. 动画和过渡

### 8.1 过渡时间

```scss
$transition-fast: 0.15s;
$transition-normal: 0.3s;
$transition-slow: 0.5s;
```

### 8.2 缓动函数

```scss
$ease-out: cubic-bezier(0.25, 0.46, 0.45, 0.94);
$ease-in-out: cubic-bezier(0.645, 0.045, 0.355, 1);
$ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### 8.3 动画效果

**卡片出现**
```scss
@keyframes cardAppear {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-enter {
  animation: cardAppear $transition-normal $ease-out;
}
```

**按钮点击**
```scss
@keyframes buttonPress {
  0% { transform: scale(1); }
  50% { transform: scale(0.95); }
  100% { transform: scale(1); }
}

.btn-press {
  &:active {
    animation: buttonPress $transition-fast $ease-out;
  }
}
```

**页面切换**
```scss
@keyframes slideInRight {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slideOutLeft {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}
```

## 9. 响应式设计

### 9.1 断点系统

```scss
// 小屏手机
$breakpoint-xs: 320px;

// 普通手机
$breakpoint-sm: 375px;

// 大屏手机
$breakpoint-md: 414px;

// 平板
$breakpoint-lg: 768px;
```

### 9.2 布局规则

```scss
// 页面最大宽度
$page-max-width: 100%;

// 内容区域
$content-width: 100%;
$content-max-width: 600px;

// 响应式混合宏
@mixin respond-to($breakpoint) {
  @media (min-width: $breakpoint) {
    @content;
  }
}
```

## 10. 主题变量

### 10.1 浅色模式变量

```scss
:root {
  // 颜色
  --color-primary: #D99A28;
  --color-primary-light: #F5E6C3;
  --color-primary-dark: #B37A1E;
  
  --color-bg: #FFF8EA;
  --color-card: #FFFDF7;
  --color-input-bg: #FFFCF5;
  
  --color-text-primary: #3F3024;
  --color-text-secondary: #8F7A60;
  --color-text-placeholder: #C4B69C;
  
  --color-border: rgba(120, 90, 50, 0.14);
  --color-divider: rgba(120, 90, 50, 0.08);
  
  // 装饰色
  --color-sunset: #F8B862;
  --color-sea: #7EC8E3;
  --color-cloud: #F5F5F5;
  --color-leaf: #8BC34A;
  --color-star: #FFD700;
  
  // 状态色
  --color-success: #52C41A;
  --color-warning: #FAAD14;
  --color-error: #FF4D4F;
  --color-info: #1890FF;
  
  // 阴影
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.12);
}
```

### 10.2 深色模式变量

```scss
.theme-dark {
  // 颜色
  --color-primary: #9273E6;
  --color-primary-light: #B8A0F0;
  --color-primary-dark: #6B4DB8;
  
  --color-bg: #070B1F;
  --color-card: rgba(25, 30, 65, 0.72);
  --color-input-bg: rgba(35, 40, 75, 0.8);
  
  --color-text-primary: #F2ECFF;
  --color-text-secondary: #A8A0C8;
  --color-text-placeholder: #5A5278;
  
  --color-border: rgba(180, 160, 255, 0.16);
  --color-divider: rgba(180, 160, 255, 0.08);
  
  // 装饰色
  --color-moonlight: #C0C0C0;
  --color-night-sky: #1A1A3E;
  --color-star-white: #FFFFFF;
  --color-mountain: #4A3F6B;
  
  // 状态色
  --color-success: #73D13D;
  --color-warning: #FFC53D;
  --color-error: #FF7875;
  --color-info: #40A9FF;
  
  // 阴影
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.2);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.25);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.35);
}
```

## 11. 使用示例

### 11.1 页面结构

```tsx
import { View, Text } from '@tarojs/components'
import './index.scss'

export default function ThoughtDetail() {
  return (
    <View className="thought-detail">
      <View className="thought-detail__header">
        <Text className="thought-detail__title">这一念</Text>
      </View>
      
      <View className="thought-detail__content">
        <View className="thought-card">
          <View className="thought-card__quote">
            "我是不是很差劲。"
          </View>
          
          <View className="thought-card__field">
            <Text className="thought-card__label">当时</Text>
            <Text className="thought-card__value">
              股票下跌，账户亏了约 10%
            </Text>
          </View>
          
          <View className="thought-card__field">
            <Text className="thought-card__label">感受</Text>
            <View className="thought-card__tags">
              <Text className="tag tag--emotion">焦虑</Text>
              <Text className="tag tag--emotion">内疚</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}
```

### 11.2 样式示例

```scss
.thought-detail {
  min-height: 100vh;
  background: var(--color-bg);
  padding: 0 $page-padding;
  
  &__header {
    padding: 32px 0;
    text-align: center;
  }
  
  &__title {
    font-size: $font-size-xl;
    font-weight: $font-weight-semibold;
    color: var(--color-text-primary);
  }
}

.thought-card {
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: 32px;
  padding: $card-padding-lg;
  box-shadow: var(--shadow-md);
  
  &__quote {
    font-size: $font-size-2xl;
    font-weight: $font-weight-semibold;
    color: var(--color-text-primary);
    line-height: $line-height-relaxed;
    margin-bottom: 32px;
    padding: 24px;
    background: var(--color-primary-light);
    border-radius: 16px;
    border-left: 4px solid var(--color-primary);
  }
  
  &__field {
    margin-bottom: 24px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  &__label {
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: var(--color-text-secondary);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 8px;
    display: block;
  }
  
  &__value {
    font-size: $font-size-base;
    color: var(--color-text-primary);
    line-height: $line-height-normal;
  }
  
  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: $gap-sm;
  }
}
```

## 12. 设计资源

### 12.1 视觉参考文件

| 文件名 | 描述 | 用途 |
|--------|------|------|
| `ChatGPT Image 2026年6月29日 14_40_26.png` | 浅色模式参考 | 整体风格、颜色、布局 |
| `ChatGPT Image 2026年6月29日 14_40_33.png` | 深色模式参考 | 深色主题、玻璃效果 |
| `ChatGPT Image 2026年6月29日 14_41_52 (1).png` | 心念卡样式参考 | 卡片结构、字段设计 |
| `ChatGPT Image 2026年6月29日 14_41_52 (2).png` | 发现页参考 | 统计展示、卡片墙 |
| `6a20e27f0de3f8352519eaccd6061ee759b75632af6afe0c4150531ed57f2f8c.png` | 整体视觉风格参考 | 统一视觉语言 |

### 12.2 设计工具

- Figma：界面设计和原型
- Sketch：图标和组件设计
- Adobe Illustrator：插画和装饰元素

## 13. 更新日志

### 13.1 版本 1.0（2026-06-29）

- 初始设计系统建立
- 定义颜色、字体、间距系统
- 制定卡片系统规范
- 制定组件样式规范
- 制定动画和过渡规范
- 制定响应式设计规范
- 整合视觉参考图片

---

**设计目标：** 让用户感觉：这是一个可以安静放下念头的地方。
# 设计系统（Design Tokens）

## 字号变量

使用 rpx 单位（750rpx = 屏幕宽度），适配不同设备。

```scss
:root {
  --fs-xxs: 18rpx;    // 最小标签
  --fs-xs: 22rpx;     // 辅助文字
  --fs-sm: 24rpx;     // 小字
  --fs-base: 28rpx;   // 通用正文
  --fs-lg: 32rpx;     // 大字
  --fs-xl: 36rpx;     // 标题
  --fs-xxl: 40rpx;    // 大标题
  --fs-display: 48rpx; // 展示用
  --fs-hero: 64rpx;    // 超大标题
}
```

## 颜色变量

### 浅色模式

```scss
:root {
  // 主色
  --color-primary: #D99A28;
  --color-primary-light: #F5E6C3;
  --color-primary-dark: #B37A1E;
  
  // 背景色
  --color-bg: #FFF8EA;
  --color-card: #FFFDF7;
  --color-input-bg: #FFFCF5;
  
  // 文字色
  --color-text-primary: #3F3024;
  --color-text-secondary: #8F7A60;
  --color-text-placeholder: #C4B69C;
  
  // 边框色
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

### 深色模式

```scss
.theme-dark {
  // 主色
  --color-primary: #9273E6;
  --color-primary-light: #B8A0F0;
  --color-primary-dark: #6B4DB8;
  
  // 背景色
  --color-bg: #070B1F;
  --color-card: rgba(25, 30, 65, 0.72);
  --color-input-bg: rgba(35, 40, 75, 0.8);
  
  // 文字色
  --color-text-primary: #F2ECFF;
  --color-text-secondary: #A8A0C8;
  --color-text-placeholder: #5A5278;
  
  // 边框色
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

## 间距变量

```scss
$spacing-xs: 4px;
$spacing-sm: 8px;
$spacing-md: 16px;
$spacing-lg: 24px;
$spacing-xl: 32px;
$spacing-2xl: 48px;
```

## 圆角变量

```scss
$radius-sm: 8px;
$radius-md: 16px;
$radius-lg: 24px;
$radius-xl: 32px;
$radius-full: 9999px;
```

## 字体栈

```scss
$font-family-primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
```

## 使用示例

```scss
.thought-card {
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: $radius-lg;
  padding: $spacing-xl;
  box-shadow: var(--shadow-md);
  
  &__title {
    font-size: var(--fs-xl);
    font-weight: 600;
    color: var(--color-text-primary);
  }
  
  &__content {
    font-size: var(--fs-base);
    color: var(--color-text-secondary);
    line-height: 1.6;
  }
}
```
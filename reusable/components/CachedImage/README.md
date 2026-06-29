# CachedImage

远程图片带本地缓存的 `<Image>` 包装。基于项目 `services/imageCache`（downloadIfNeeded / isRemoteUrl）。

## 为什么需要

裸 `<Image src="https://...">` 每次都重新下载，列表渲染巨慢。本组件：
1. 第一次见 URL → 下载到本地 → 后续命中本地路径（秒开）
2. 加载未就绪时显示 placeholder，避免 layout 跳动
3. 下载失败时降级到原始 URL，错误状态交给 `<Image>` 自身处理

## Props

```ts
interface CachedImageProps {
  src?: string | null
  mode?: TaroImage mode
  lazyLoad?: boolean
  showMenuByLongpress?: boolean
  className?: string
  style?: CSSProperties
  onClick?: () => void
  onLoad?: (e: any) => void
  onError?: (e: any) => void
}
```

## 用法

```tsx
import CachedImage from '@/components/CachedImage'

<CachedImage
  src={item.icon}
  mode="aspectFill"
  className="item-icon"
/>
```

## 容器尺寸规则（坑点）

> **必须**：父容器要显式 `width` 和 `height`，否则 `<Image>` 不渲染。

```scss
.item-icon {
  width: 48px;
  height: 48px;
}
```

加 `cached-image--ready` 渐入动画时也用这个约束。这是项目 CLAUDE.md 硬规则。

## 依赖

- `services/imageCache`（downloadIfNeeded / isRemoteUrl）— 提供本地缓存能力
- `@tarojs/components` — `<Image>` / `<View>`
- SCSS：`./index.scss`

## 迁移到其他项目

1. 把 `services/imageCache.ts` 一起搬过去（提供 `downloadIfNeeded(url)` 和 `isRemoteUrl(url)`）
2. SCSS 里的占位类名 `.cached-image__placeholder` 按需要改
3. props 接口跟 Taro `Image` 对齐，可直接换 `<Image>` 调用

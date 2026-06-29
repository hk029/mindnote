# 项目规范

从 `reusable/conventions/hard-rules.md` 提取并适配 MindNote 项目。

## CSS 字号

> 所有文本字号必须使用 CSS 变量，禁止写死 px 值。

详见 `docs/design-tokens.md`。

```scss
.title {
  font-size: var(--fs-xl);
  font-weight: 700;
}
```

## 图标/图片

> Icons/images: PNG only for miniprogram assets. SVG is not supported.

- 小程序 assets 只用 PNG，不用 SVG
- 远程图用 `CachedImage`，容器必须有显式 `width` 和 `height`

## 组件

> Components: use `memo()` for pure display components.

纯展示组件用 `memo()` 包裹。

## CSS 类命名

遵循 **BEM**：`.block__element--modifier`

```scss
.thought-card {
  /* block */
}
.thought-card__title {
  /* element */
}
.thought-card__title--highlighted {
  /* modifier */
}
```

## 验证方式

> 只验证编译错误，不需要启动/重启服务。

不要主动起服务验证；只跑 build 确认编译过。

## 提交规范

> Do not commit binaries or local DB files.

二进制和临时文件不进 git。

## 开发流程

- 默认在功能分支上开发
- 不要手动 push 到 main，除非用户明确要求
- 每次部署前 `git status` 必须干净

## 代码风格

- 使用 TypeScript 严格模式
- 组件使用函数式组件 + Hooks
- 样式使用 SCSS + CSS 变量
- 状态管理使用 Zustand
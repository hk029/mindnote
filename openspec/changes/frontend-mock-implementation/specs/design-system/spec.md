## ADDED Requirements

### Requirement: 颜色系统定义
系统 SHALL 定义完整的颜色变量，包括主色、背景色、文字色、装饰色、状态色。

#### Scenario: 浅色模式颜色
- **WHEN** 应用处于浅色模式
- **THEN** 使用以下颜色：主色 `#D99A28`，背景 `#FFF8EA`，卡片 `#FFFDF7`，主文字 `#3F3024`

#### Scenario: 深色模式颜色
- **WHEN** 应用处于深色模式
- **THEN** 使用以下颜色：主色 `#9273E6`，背景 `#070B1F`，卡片 `rgba(25, 30, 65, 0.72)`，主文字 `#F2ECFF`

### Requirement: 字体系统定义
系统 SHALL 定义字体大小、字重、行高等排版规范。

#### Scenario: 字体大小层级
- **WHEN** 渲染文本
- **THEN** 支持以下字体大小：`$font-size-xs: 20px`，`$font-size-sm: 24px`，`$font-size-base: 28px`，`$font-size-lg: 32px`，`$font-size-xl: 36px`

### Requirement: 间距系统定义
系统 SHALL 定义统一的间距变量。

#### Scenario: 间距变量
- **WHEN** 布局元素间距
- **THEN** 使用以下间距：`$spacing-xs: 4px`，`$spacing-sm: 8px`，`$spacing-md: 16px`，`$spacing-lg: 24px`，`$spacing-xl: 32px`

### Requirement: 卡片系统规范
系统 SHALL 定义卡片组件的样式规范，包括圆角、内边距、阴影。

#### Scenario: 卡片基础样式
- **WHEN** 渲染卡片组件
- **THEN** 使用圆角 `24px`，内边距 `32px`，轻阴影 `var(--shadow-sm)`

### Requirement: 主题切换支持
系统 SHALL 支持浅色/深色主题切换，页面结构保持一致。

#### Scenario: 主题切换
- **WHEN** 用户切换主题模式
- **THEN** 颜色、背景、图标颜色改变，但页面布局、卡片结构、信息层级不变
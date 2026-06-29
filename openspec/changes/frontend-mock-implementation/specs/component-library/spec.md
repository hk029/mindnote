## ADDED Requirements

### Requirement: 卡片组件 AppCard
系统 SHALL 提供基础卡片容器组件。

#### Scenario: 卡片基础用法
- **WHEN** 使用 AppCard 组件
- **THEN** 渲染带圆角、边框、阴影的卡片容器

### Requirement: 按钮组件 AppButton
系统 SHALL 提供按钮组件，支持主按钮、次按钮、文字按钮。

#### Scenario: 主按钮
- **WHEN** 使用 `type="primary"` 的 AppButton
- **THEN** 渲染暖黄色背景的主按钮

#### Scenario: 次按钮
- **WHEN** 使用 `type="secondary"` 的 AppButton
- **THEN** 渲染带边框的次按钮

### Requirement: 输入框组件 AppInput
系统 SHALL 提供输入框组件，支持单行和多行。

#### Scenario: 单行输入
- **WHEN** 使用 AppInput 组件
- **THEN** 渲染带 placeholder 的输入框

#### Scenario: 多行输入
- **WHEN** 使用 `type="textarea"` 的 AppInput
- **THEN** 渲染多行文本输入框

### Requirement: 标签组件 AppTag
系统 SHALL 提供标签组件，支持不同颜色类型。

#### Scenario: 情绪标签
- **WHEN** 使用 `type="emotion"` 的 AppTag
- **THEN** 渲染情绪类型的标签

#### Scenario: 模式标签
- **WHEN** 使用 `type="pattern"` 的 AppTag
- **THEN** 渲染模式类型的标签

### Requirement: 对话气泡组件 ChatBubble
系统 SHALL 提供对话气泡组件，区分用户和系统消息。

#### Scenario: 用户气泡
- **WHEN** 使用 `role="user"` 的 ChatBubble
- **THEN** 渲染靠右的用户消息气泡

#### Scenario: 系统气泡
- **WHEN** 使用 `role="assistant"` 的 ChatBubble
- **THEN** 渲染靠左的系统消息气泡

### Requirement: 空状态组件 AppEmpty
系统 SHALL 提供空状态组件，展示空数据时的提示。

#### Scenario: 空状态展示
- **WHEN** 列表无数据时
- **THEN** 显示空状态图标和提示文案

### Requirement: 页面头部组件 PageHeader
系统 SHALL 提供页面头部组件，包含标题和返回按钮。

#### Scenario: 页面头部
- **WHEN** 渲染 PageHeader
- **THEN** 显示页面标题和可选的返回按钮
## ADDED Requirements

### Requirement: 展示标题和副标题
系统 SHALL 展示「心念本」标题和副标题。

#### Scenario: 标题展示
- **WHEN** 用户进入心念本页面
- **THEN** 显示标题「心念本」，副标题「收着你曾经认真看见过的念头」

### Requirement: 最近7天摘要
系统 SHALL 展示最近7天的记录摘要统计。

#### Scenario: 摘要统计
- **WHEN** 页面加载
- **THEN** 显示「这 7 天，你记录了 X 条念头。」以及最常出现的模式和原话

### Requirement: 记录列表展示
系统 SHALL 以列表卡片形式展示所有保存的心念卡。

#### Scenario: 列表卡片
- **WHEN** 有保存的记录
- **THEN** 每条卡片显示：原始念头、简短背景、情绪标签、模式标签、提醒、时间

### Requirement: 筛选功能
系统 SHALL 提供筛选选项，支持按不同维度筛选记录。

#### Scenario: 筛选选项
- **WHEN** 用户点击筛选按钮
- **THEN** 显示筛选选项：全部、按感受、按模式、按原话

### Requirement: 进入详情页
系统 SHALL 支持点击列表项进入详情页。

#### Scenario: 点击卡片
- **WHEN** 用户点击列表中的某条记录
- **THEN** 跳转到「这一念」详情页

### Requirement: 删除单条记录
系统 SHALL 支持删除单条记录。

#### Scenario: 删除操作
- **WHEN** 用户左滑或长按某条记录
- **THEN** 显示删除按钮，点击后确认删除

### Requirement: 空状态展示
系统 SHALL 在没有记录时展示空状态。

#### Scenario: 空状态
- **WHEN** 没有保存的记录
- **THEN** 显示空状态提示和引导文案
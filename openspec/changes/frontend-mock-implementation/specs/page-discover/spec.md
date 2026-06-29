## ADDED Requirements

### Requirement: 展示顶部洞察
系统 SHALL 在页面顶部展示一句总结性洞察。

#### Scenario: 顶部洞察
- **WHEN** 有记录数据
- **THEN** 显示基于最近记录生成的洞察语句

### Requirement: 展示7天统计
系统 SHALL 展示最近7天的记录数量。

#### Scenario: 7天统计
- **WHEN** 页面加载
- **THEN** 显示「这 7 天，你记录了 X 条念头。」

### Requirement: 展示高频念头
系统 SHALL 展示最近常出现的念头及其占比。

#### Scenario: 高频念头
- **WHEN** 有统计数据分析
- **THEN** 显示 Top 4 高频念头及其百分比

### Requirement: 展示高频模式
系统 SHALL 展示最近常见的思维模式标签。

#### Scenario: 高频模式
- **WHEN** 有统计数据
- **THEN** 显示常见的模式标签列表

### Requirement: 展示最近对自己说的话
系统 SHALL 以卡片墙形式展示最近的原始念头。

#### Scenario: 卡片墙
- **WHEN** 有记录数据
- **THEN** 显示多条原始念头的卡片墙

### Requirement: 点击进入详情
系统 SHALL 支持点击念头墙中的卡片进入详情页。

#### Scenario: 点击卡片
- **WHEN** 用户点击卡片墙中的某条记录
- **THEN** 跳转到「这一念」详情页

### Requirement: 空状态展示
系统 SHALL 在没有记录时展示空状态。

#### Scenario: 空状态
- **WHEN** 没有记录数据
- **THEN** 显示空状态提示和引导
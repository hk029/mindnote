## ADDED Requirements

### Requirement: 展示初始念头
系统 SHALL 在对话开始时展示用户输入的初始念头。

#### Scenario: 初始念头展示
- **WHEN** 用户从首页进入温柔倾听页
- **THEN** 以用户气泡形式展示初始念头内容

### Requirement: 对话区域展示
系统 SHALL 展示对话区域，支持用户气泡和系统气泡交替显示。

#### Scenario: 对话气泡展示
- **WHEN** 对话进行中
- **THEN** 用户气泡靠右显示，系统气泡靠左显示，气泡之间有足够间距

### Requirement: 用户继续输入
系统 SHALL 提供输入框，用户可以继续补充念头内容。

#### Scenario: 继续对话
- **WHEN** 用户在输入框中输入新内容并发送
- **THEN** 新内容以用户气泡形式添加到对话中

### Requirement: 系统温柔回应
系统 SHALL 使用 Mock 数据模拟系统回应，遵循「听见 → 映照 → 轻问」模式。

#### Scenario: Mock AI 响应
- **WHEN** 用户发送消息
- **THEN** 系统返回 Mock 回应，包含回复文本和下一步动作

### Requirement: 生成心念卡触发
系统 SHALL 在信息足够时自动触发心念卡生成。

#### Scenario: 自动生成卡片
- **WHEN** Mock AI 判断信息足够（action: generate_card）
- **THEN** 自动生成心念卡，跳转到「这一念」详情页

### Requirement: 手动整理成卡
系统 SHALL 提供「先整理成卡」按钮，允许用户手动触发卡片生成。

#### Scenario: 手动触发
- **WHEN** 用户点击「先整理成卡」按钮
- **THEN** 使用当前对话内容生成心念卡

### Requirement: 隐私提示展示
系统 SHALL 在页面底部展示隐私提示。

#### Scenario: 隐私提示
- **WHEN** 页面渲染
- **THEN** 显示「你的记录仅保存在当前设备。」
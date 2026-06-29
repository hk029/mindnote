## ADDED Requirements

### Requirement: Mock 温柔倾听响应
系统 SHALL 提供 Mock 的温柔倾听 AI 响应服务。

#### Scenario: 简短念头响应
- **WHEN** 用户输入少于 20 字的念头
- **THEN** 返回 ask_more 动作，追问更多信息

#### Scenario: 完整念头响应
- **WHEN** 用户输入完整的念头
- **THEN** 返回 generate_card 动作，包含完整的心念卡数据

### Requirement: Mock 心念卡生成
系统 SHALL 根据对话内容生成 Mock 的心念卡数据。

#### Scenario: 心念卡字段
- **WHEN** 生成心念卡
- **THEN** 包含字段：originalQuote、eventSummary、emotions、insight、patternTags、gentleReminder

### Requirement: Mock 再看一眼
系统 SHALL 提供 Mock 的再看一眼响应。

#### Scenario: 再看一眼响应
- **WHEN** 请求再看一眼
- **THEN** 返回 angleTitle、content、protectMeaning、selfSentence

### Requirement: 模拟不同场景
系统 SHALL 支持模拟不同的用户场景。

#### Scenario: 情绪表达场景
- **WHEN** 用户输入包含情绪词汇
- **THEN** 返回包含相关情绪标签的心念卡

#### Scenario: 关系压力场景
- **WHEN** 用户输入涉及人际关系
- **THEN** 返回包含关系压力分析的心念卡

### Requirement: 延迟模拟
系统 SHALL 模拟网络延迟效果。

#### Scenario: 加载延迟
- **WHEN** 调用 Mock AI 接口
- **THEN** 延迟 500-1000ms 返回响应
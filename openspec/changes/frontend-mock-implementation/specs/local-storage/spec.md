## ADDED Requirements

### Requirement: 保存念头记录
系统 SHALL 将念头记录保存到本地存储。

#### Scenario: 保存新记录
- **WHEN** 用户保存心念卡
- **THEN** 记录保存到本地，包含 id、createdAt、rawThought、card 等字段

#### Scenario: 更新记录
- **WHEN** 用户修改心念卡内容
- **THEN** 更新本地存储中的对应记录

### Requirement: 读取念头记录
系统 SHALL 从本地存储读取念头记录。

#### Scenario: 读取全部记录
- **WHEN** 打开心念本页面
- **THEN** 从本地存储读取所有已保存的记录

#### Scenario: 读取单条记录
- **WHEN** 打开详情页
- **THEN** 根据 id 读取单条记录

### Requirement: 删除念头记录
系统 SHALL 支持删除本地念头记录。

#### Scenario: 删除单条记录
- **WHEN** 用户删除某条记录
- **THEN** 从本地存储中移除该记录

#### Scenario: 删除全部记录
- **WHEN** 用户确认清除全部记录
- **THEN** 清空本地存储中的所有记录

### Requirement: 草稿管理
系统 SHALL 管理用户输入的草稿。

#### Scenario: 保存草稿
- **WHEN** 用户在首页输入内容
- **THEN** 自动保存草稿到本地

#### Scenario: 恢复草稿
- **WHEN** 用户重新打开首页
- **THEN** 恢复上次的草稿内容

#### Scenario: 清除草稿
- **WHE** 用户成功提交念头后
- **THEN** 清除本地草稿

### Requirement: 主题偏好存储
系统 SHALL 保存用户的主题偏好设置。

#### Scenario: 保存主题
- **WHEN** 用户切换主题模式
- **THEN** 保存主题偏好到本地存储

#### Scenario: 恢复主题
- **WHEN** 应用启动
- **THEN** 读取并应用上次保存的主题偏好

### Requirement: 数据版本管理
系统 SHALL 支持本地数据版本管理。

#### Scenario: 版本号
- **WHEN** 保存数据
- **THEN** 包含版本号字段，便于后续升级迁移
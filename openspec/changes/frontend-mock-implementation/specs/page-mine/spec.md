## ADDED Requirements

### Requirement: 主题模式切换
系统 SHALL 提供主题模式切换功能，支持浅色/深色/跟随系统。

#### Scenario: 切换主题
- **WHEN** 用户点击主题切换选项
- **THEN** 应用切换到对应的浅色或深色模式

### Requirement: 本地数据管理
系统 SHALL 展示本地数据统计信息。

#### Scenario: 数据统计
- **WHEN** 用户进入我的页面
- **THEN** 显示「当前保存了 X 条念头」

### Requirement: 清除全部记录
系统 SHALL 提供清除全部记录功能，清除前需要二次确认。

#### Scenario: 清除确认
- **WHEN** 用户点击「清除全部记录」
- **THEN** 弹出确认对话框「清除后将无法恢复。确认删除当前设备上的所有念头记录吗？」

#### Scenario: 执行清除
- **WHEN** 用户确认清除
- **THEN** 删除所有本地记录，清空心念本

### Requirement: 隐私说明
系统 SHALL 提供隐私说明入口。

#### Scenario: 隐私说明
- **WHEN** 用户点击「隐私说明」
- **THEN** 展示隐私政策内容

### Requirement: 关于产品
系统 SHALL 提供关于产品入口。

#### Scenario: 关于页面
- **WHEN** 用户点击「关于」
- **THEN** 展示产品介绍和版本信息

### Requirement: 数据导出入口
系统 SHALL 提供数据导出入口（第一版暂不实现功能）。

#### Scenario: 导出入口
- **WHEN** 用户点击「数据导出」
- **THEN** 提示「数据导出功能开发中」
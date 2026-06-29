# utils/

通用工具。每个工具一份 `.ts` + `*.README.md`（用法、依赖、迁移）。

## 已抽取

| 工具 | 说明 | 依赖 |
|---|---|---|
| `subscribeMessage.ts` | 微信订阅消息统一封装 | `@tarojs/taro` |
| `obfuscate.ts` | Base64 + JSON 混淆 | 无 |

## 项目 CLAUDE.md 硬规则

所有订阅类功能必须用 `requestSubscribePermission(templateId)`，禁止手写 `wx.requestSubscribeMessage`。

# 「念头」小程序素材需求分析

基于需求方案和视觉参考图片，我整理了需要准备的素材清单和实现方案。

## 1. 素材需求总览

### 1.1 素材分类

| 类别 | 数量 | 优先级 | 说明 |
|------|------|--------|------|
| 背景插画 | 2套 | P0 | 浅色/深色模式背景 |
| 图标素材 | 12-16个 | P0 | 功能图标和导航图标 |
| 装饰元素 | 8-10个 | P1 | 星星、云朵、叶子等 |
| 品牌素材 | 3-5个 | P1 | Logo、启动图等 |
| 状态素材 | 4-6个 | P2 | 空状态、加载状态 |

## 2. 详细素材清单

### 2.1 背景插画（P0）

**浅色模式背景**
- 文件名：`bg-light-sunset.png`
- 尺寸：750 x 1334px（2倍图）
- 格式：PNG，透明度可选
- 描述：日落海面背景，温暖橙色渐变，轻微手绘感
- 视觉参考：`ChatGPT Image 2026年6月29日 14_40_26.png`
- 用途：首页、温柔倾听页背景
- 要求：
  - 米白到暖黄的渐变
  - 海面元素，日落感
  - 不要太复杂，留出内容区域
  - 可以有轻微的星星或云朵装饰

**深色模式背景**
- 文件名：`bg-dark-night.png`
- 尺寸：750 x 1334px
- 格式：PNG
- 描述：夜空背景，深蓝黑色调，月亮和星星
- 视觉参考：`ChatGPT Image 2026年6月29日 14_40_33.png`
- 用途：深色模式下的首页、温柔倾听页背景
- 要求：
  - 深蓝黑渐变
  - 夜空、月亮、星星元素
  - 半透明玻璃感

### 2.2 功能图标（P0）

**底部导航图标（4组）**

| 图标 | 文件名 | 尺寸 | 状态 | 描述 |
|------|--------|------|------|------|
| 记录 | `tab-record.png` | 48x48px | 默认 | 叶子轮廓，线性 |
| 记录 | `tab-record-active.png` | 48x48px | 选中 | 填充叶子，暖黄色 |
| 心念本 | `tab-book.png` | 48x48px | 默认 | 书本轮廓，线性 |
| 心念本 | `tab-book-active.png` | 48x48px | 选中 | 打开的书本，暖黄色 |
| 发现 | `tab-discover.png` | 48x48px | 默认 | 星星轮廓，线性 |
| 发现 | `tab-discover-active.png` | 48x48px | 选中 | 发光星星，暖黄色 |
| 我的 | `tab-mine.png` | 48x48px | 默认 | 人形轮廓，线性 |
| 我的 | `tab-mine-active.png` | 48x48px | 选中 | 圆形头像，暖黄色 |

**功能操作图标（8个）**

| 图标 | 文件名 | 尺寸 | 颜色 | 描述 |
|------|--------|------|------|------|
| 语音输入 | `icon-voice.png` | 48x48px | 主色 | 麦克风，线性 |
| 发送 | `icon-send.png` | 48x48px | 主色 | 纸飞机，线性 |
| 保存 | `icon-save.png` | 32x32px | 主色 | 磁盘，线性 |
| 分享 | `icon-share.png` | 32x32px | 主色 | 分享图标，线性 |
| 返回 | `icon-back.png` | 32x32px | 主文字色 | 左箭头，线性 |
| 关闭 | `icon-close.png` | 32x32px | 主文字色 | X，线性 |
| 删除 | `icon-delete.png` | 32x32px | 错误色 | 垃圾桶，线性 |
| 编辑 | `icon-edit.png` | 32x32px | 主色 | 铅笔，线性 |

### 2.3 装饰元素（P1）

**星星元素**
- 文件名：`deco-star-1.png` / `deco-star-2.png` / `deco-star-3.png`
- 尺寸：24x24px / 32x32px / 48x48px
- 格式：PNG，透明背景
- 描述：不同大小的星星，用于装饰
- 用途：背景装饰、念头卡装饰

**云朵元素**
- 文件名：`deco-cloud-1.png` / `deco-cloud-2.png`
- 尺寸：64x32px / 96x48px
- 格式：PNG，透明背景
- 描述：轻柔漂浮的小云朵
- 用途：背景装饰

**叶子元素**
- 文件名：`deco-leaf-1.png` / `deco-leaf-2.png`
- 尺寸：32x32px / 48x48px
- 格式：PNG，透明背景
- 描述：自然点缀的小叶子
- 用途：记录页装饰、空状态装饰

**月亮元素**
- 文件名：`deco-moon.png`
- 尺寸：64x64px
- 格式：PNG，透明背景
- 描述：夜间静月
- 用途：深色模式背景装饰

### 2.4 品牌素材（P1）

**产品Logo**
- 文件名：`logo.png`
- 尺寸：120x120px
- 格式：PNG，透明背景
- 描述：「念头」产品Logo，简洁温暖
- 用途：启动页、关于页面

**启动图**
- 文件名：`splash.png`
- 尺寸：750x1334px
- 格式：PNG
- 描述：启动页背景，包含Logo
- 用途：小程序启动页

**分享图**
- 文件名：`share-cover.png`
- 尺寸：500x400px
- 格式：PNG
- 描述：分享卡片封面图
- 用途：微信分享

### 2.5 状态素材（P2）

**空状态**
- 文件名：`empty-thought.png`
- 尺寸：120x120px
- 描述：还没有念头的空状态
- 用途：心念本为空时

**空状态**
- 文件名：`empty-discover.png`
- 尺寸：120x120px
- 描述：还没有发现的空状态
- 用途：发现页为空时

**加载状态**
- 文件名：`loading.png`
- 尺寸：48x48px
- 描述：加载动画或静态图标
- 用途：AI整理时的加载状态

## 3. 实现方案

### 3.1 背景实现

**CSS渐变实现**
```scss
// 浅色模式背景
.bg-light {
  background: linear-gradient(
    180deg,
    #FFF8EA 0%,
    #F5E6C3 50%,
    #F8B862 100%
  );
}

// 深色模式背景
.bg-dark {
  background: linear-gradient(
    180deg,
    #070B1F 0%,
    #1A1A3E 50%,
    #4A3F6B 100%
  );
}
```

**背景图片实现**
```scss
.bg-image {
  background-image: url('./assets/bg-light-sunset.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
```

### 3.2 图标实现

**图标组件**
```tsx
interface IconProps {
  name: string
  size?: number
  color?: string
  active?: boolean
}

export function Icon({ name, size = 32, color, active }: IconProps) {
  const iconPath = active 
    ? `/assets/icons/${name}-active.png`
    : `/assets/icons/${name}.png`
  
  return (
    <Image
      src={iconPath}
      style={{ width: size, height: size }}
      className="icon"
    />
  )
}
```

### 3.3 装饰元素实现

**浮动装饰**
```tsx
function FloatingDecorations() {
  return (
    <View className="decorations">
      <Image src="/assets/deco/star-1.png" className="deco-star-1" />
      <Image src="/assets/deco/star-2.png" className="deco-star-2" />
      <Image src="/assets/deco/cloud-1.png" className="deco-cloud-1" />
    </View>
  )
}
```

**装饰样式**
```scss
.decorations {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.deco-star-1 {
  position: absolute;
  top: 15%;
  right: 20%;
  width: 24px;
  height: 24px;
  animation: twinkle 3s infinite;
}

.deco-star-2 {
  position: absolute;
  top: 25%;
  left: 15%;
  width: 32px;
  height: 32px;
  animation: twinkle 4s infinite 1s;
}

.deco-cloud-1 {
  position: absolute;
  bottom: 30%;
  right: 10%;
  width: 96px;
  height: 48px;
  animation: float 6s infinite;
}

@keyframes twinkle {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
```

### 3.4 卡片实现

**念头卡组件**
```tsx
interface ThoughtCardProps {
  quote: string
  event?: string
  emotions: string[]
  insight?: string
  patternTags: string[]
  reminder?: string
}

export function ThoughtCard({
  quote,
  event,
  emotions,
  insight,
  patternTags,
  reminder
}: ThoughtCardProps) {
  return (
    <View className="thought-card">
      <View className="thought-card__quote">
        "{quote}"
      </View>
      
      {event && (
        <View className="thought-card__section">
          <Text className="thought-card__label">当时</Text>
          <Text className="thought-card__text">{event}</Text>
        </View>
      )}
      
      <View className="thought-card__section">
        <Text className="thought-card__label">感受</Text>
        <View className="thought-card__tags">
          {emotions.map((emotion, index) => (
            <Text key={index} className="tag tag--emotion">
              {emotion}
            </Text>
          ))}
        </View>
      </View>
      
      {insight && (
        <View className="thought-card__section">
          <Text className="thought-card__label">看见</Text>
          <Text className="thought-card__text">{insight}</Text>
        </View>
      )}
      
      <View className="thought-card__section">
        <Text className="thought-card__label">模式</Text>
        <View className="thought-card__tags">
          {patternTags.map((tag, index) => (
            <Text key={index} className="tag tag--pattern">
              {tag}
            </Text>
          ))}
        </View>
      </View>
      
      {reminder && (
        <View className="thought-card__section thought-card__reminder">
          <Text className="thought-card__label">提醒</Text>
          <Text className="thought-card__text">{reminder}</Text>
        </View>
      )}
    </View>
  )
}
```

**卡片样式**
```scss
.thought-card {
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: 32px;
  padding: 40px;
  box-shadow: var(--shadow-md);
  
  &__quote {
    font-size: 36px;
    font-weight: 600;
    color: var(--color-text-primary);
    line-height: 1.6;
    margin-bottom: 32px;
    padding: 24px;
    background: var(--color-primary-light);
    border-radius: 16px;
    border-left: 4px solid var(--color-primary);
  }
  
  &__section {
    margin-bottom: 24px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  &__label {
    font-size: 24px;
    font-weight: 500;
    color: var(--color-text-secondary);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 8px;
    display: block;
  }
  
  &__text {
    font-size: 28px;
    color: var(--color-text-primary);
    line-height: 1.6;
  }
  
  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  
  &__reminder {
    background: var(--color-sunset-light);
    padding: 24px;
    border-radius: 16px;
    border-left: 4px solid var(--color-sunset);
  }
}
```

## 4. 素材制作规范

### 4.1 设计规范

**尺寸规范**
- 所有图标使用2倍图（@2x）
- 背景图使用750x1334px（iPhone 6/7/8尺寸）
- 装饰元素提供多种尺寸

**格式规范**
- 图标：PNG，透明背景
- 背景：PNG或JPG（根据复杂度）
- 装饰：PNG，透明背景

**颜色规范**
- 浅色模式图标：主色 `#D99A28`
- 深色模式图标：主色 `#9273E6`
- 状态色：成功 `#52C41A`，警告 `#FAAD14`，错误 `#FF4D4F`

### 4.2 文件组织

```
miniprogram/src/assets/
├── icons/
│   ├── tab/
│   │   ├── record.png
│   │   ├── record-active.png
│   │   ├── book.png
│   │   ├── book-active.png
│   │   ├── discover.png
│   │   ├── discover-active.png
│   │   ├── mine.png
│   │   └── mine-active.png
│   ├── voice.png
│   ├── send.png
│   ├── save.png
│   ├── share.png
│   ├── back.png
│   ├── close.png
│   ├── delete.png
│   └── edit.png
├── backgrounds/
│   ├── bg-light-sunset.png
│   └── bg-dark-night.png
├── decorations/
│   ├── star-1.png
│   ├── star-2.png
│   ├── star-3.png
│   ├── cloud-1.png
│   ├── cloud-2.png
│   ├── leaf-1.png
│   ├── leaf-2.png
│   └── moon.png
├── brand/
│   ├── logo.png
│   ├── splash.png
│   └── share-cover.png
└── states/
    ├── empty-thought.png
    ├── empty-discover.png
    └── loading.png
```

## 5. 实现优先级

### 5.1 第一阶段（MVP）

**必须实现**
1. 底部导航图标（8个）
2. 浅色模式背景
3. 功能操作图标（8个）
4. 基础卡片样式

**可以简化**
- 装饰元素可以先用CSS实现
- 深色模式可以先用CSS渐变
- 启动图可以先用简单样式

### 5.2 第二阶段（完善）

**需要实现**
1. 深色模式背景
2. 装饰元素
3. 空状态图标
4. 品牌素材

### 5.3 第三阶段（优化）

**需要实现**
1. 分享图
2. 加载动画
3. 更多装饰细节

## 6. 技术实现建议

### 6.1 图标使用

```tsx
// 方式1：直接使用Image组件
<Image src="/assets/icons/tab/record.png" />

// 方式2：使用Icon组件
<Icon name="record" size={48} active={isActive} />

// 方式3：使用CSS背景
<View className="icon-record" />
```

### 6.2 背景使用

```tsx
// 方式1：背景图片
<View className="page-bg" />

// 方式2：CSS渐变
<View className="page-gradient" />

// 方式3：混合使用
<View className="page-bg-overlay" />
```

### 6.3 装饰使用

```tsx
// 装饰组件
function PageDecorations({ theme }) {
  return (
    <View className="decorations">
      {theme === 'light' ? (
        <>
          <Image src="/assets/decorations/star-1.png" />
          <Image src="/assets/decorations/cloud-1.png" />
        </>
      ) : (
        <>
          <Image src="/assets/decorations/moon.png" />
          <Image src="/assets/decorations/star-2.png" />
        </>
      )}
    </View>
  )
}
```

## 7. 素材获取建议

### 7.1 设计工具

- **Figma**：推荐，适合UI设计和图标制作
- **Sketch**：Mac用户可选
- **Adobe Illustrator**：复杂插画

### 7.2 素材来源

**自行设计**
- 根据视觉参考图设计
- 保持风格一致
- 注意尺寸规范

**素材网站**
- Iconfont（图标）
- Unsplash（背景）
- Mixkit（装饰元素）

**AI生成**
- 可以使用AI生成背景插画
- 需要后期调整和优化
- 确保风格统一

### 7.3 协作建议

**设计师需要提供**
- Figma/Sketch源文件
- 切图文件（PNG格式）
- 图标库（SVG格式）
- 颜色规范文档

**开发者需要提供**
- 尺寸规范
- 颜色变量
- 使用场景说明
- 适配要求

## 8. 总结

### 8.1 素材清单

**P0（必须）**
- [ ] 底部导航图标（8个）
- [ ] 浅色模式背景
- [ ] 功能操作图标（8个）

**P1（重要）**
- [ ] 深色模式背景
- [ ] 装饰元素（8-10个）
- [ ] 品牌Logo

**P2（可选）**
- [ ] 空状态图标
- [ ] 分享图
- [ ] 启动图

### 8.2 实现建议

1. **先做CSS实现**：用CSS渐变和基础样式快速搭建
2. **再做图片替换**：准备好素材后替换为图片
3. **最后做装饰**：添加装饰元素提升视觉效果

### 8.3 注意事项

- 所有素材提供2倍图
- 保持风格统一
- 注意深色模式适配
- 考虑性能优化（图片大小）

---

**下一步行动：**
1. 确认素材优先级
2. 设计师开始制作P0素材
3. 开发者用CSS实现基础样式
4. 逐步替换为图片素材
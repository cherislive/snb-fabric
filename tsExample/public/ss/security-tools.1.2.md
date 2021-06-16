# WaterMark 水印插件

给页面加上水印。

- 插件通过 `window.g_waterMark.update({config})` 为前端项目添加水印；
- 已添加过水印的项目，自动在下次访问时，使用之前的水印。

## 何时使用

页面需要添加水印标识版权时使用。

## 代码演示

### 在页面中使用

```html
<body></body>
<script src="/security-tools.js"></script>
```

### 图片水印

通过 `image` 指定图片地址。为保证图片高清且不被拉伸，请传入水印图片的宽高 width 和 height, 并上传至少两倍的宽高的 logo 图片地址。

```js | inline
window.g_waterMark.update({ image: 'your pre url.{gif,jpg,png,svg}' });
```

### 文字水印

通过 `content` 指定文字水印内容。

```js | inline
window.g_waterMark.update({ content: '360数科' });
// or
window.g_waterMark.set('360数科');
```

## API

```js | inline
window.g_waterMark.update({ config });
```

### 基础参数

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| markLayout | 水印容器 | HTMLElement | `document.body` |
| markID | 水印的唯一表示（Element ID） | string | `__security_watermark_sk` |
| width | 水印的宽度 | number | 120 |
| height | 水印的高度 | number | 64 |
| rotate | 水印绘制时，旋转的角度，单位 ° | number | -22 |
| image | 图片源，建议导出 2 倍或 3 倍图，优先使用图片渲染水印 | `string` | - |
| zIndex | 追加的水印元素的 z-index | number | 99 |
| content | 水印文字内容 | `string` | `360数科` |
| fontColor | 水印文字颜色 | `string` | `rgba(0,0,0,.15)` |
| fontSize | 文字大小 | `string` \| `number` | 16 |

### 高级参数

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| markStyle | 水印层的样式 | React.CSSProperties | - |
| markClassName | 水印层的类名 | string | - |
| gapX | 水印之间的水平间距 | number | 312 |
| gapY | 水印之间的垂直间距 | number | 222 |
| offsetLeft | 水印在 canvas 画布上绘制的水平偏移量, 正常情况下，水印绘制在中间位置, 即 `offsetTop = gapX / 2` | number | `offsetTop = gapX / 2` |
| offsetTop | 水印在 canvas 画布上绘制的垂直偏移量，正常情况下，水印绘制在中间位置, 即 `offsetTop = gapY / 2` | number | `offsetTop = gapY / 2` |

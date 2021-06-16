/**
 * A plug-in for registering and loading security modules.
 */
/* exported security */
/* jshint -W079 */
var security = (function (undefined) {
  var S = function () {
    this.Config = {
      debug: '@DEBUG@',
      packages: {},
      fns: {},
      forceAssetsHost: undefined,
    };

    /**
     * security Config.
     * @member security
     */
    this.waterMarkConfig = {
      markLayout: '',
      queryKey: 'userName',
      style: '',
      className: '',
      markStyle: '',
      markClassName: '',
      markID: '__security_watermark_sk',
      zIndex: 99999,
      gapX: 312,
      gapY: 222,
      width: 120,
      height: 64,
      rotate: -22, // 默认旋转 -22 度
      image: '',
      content: '',
      subContent: '',
      offsetLeft: 0,
      offsetTop: 0,
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontColor: 'rgba(0,0,0,.12)',
      fontSize: 16,
      fontFamily: 'sans-serif',
      prefixCls: 'base-layout-watermark',
    };

    var trim = function (str, is_global) {
      if (!str) {
        return '';
      }
      //return str.replace(/^[\s\xa0]+|[\s\xa0]+$/g, '');
      //var result = str.replace(/(^\s+)|(\s+$)/g, "");
      var result = str.replace(/^[\s\xa0]+|[\s\xa0]+$/g, '');
      if (is_global) {
        result = result.replace(/\s/g, '');
      }
      return result;
    };

    var cookie = function (name, value, options) {
      if (typeof value !== 'undefined') {
        options = options || {};
        if (value === null) {
          value = '';
          options = { ...{}, ...options };
          options.expires = -1;
        }
        var expires = '';
        if (
          options.expires &&
          (typeof options.expires === 'number' || options.expires.toUTCString)
        ) {
          var date;
          if (typeof options.expires === 'number') {
            date = new Date();
            date.setTime(date.getTime() + options.expires * 24 * 60 * 60 * 1000);
          } else {
            date = options.expires;
          }
          expires = '; expires=' + date.toUTCString();
        }
        var path = options.path ? '; path=' + options.path : ';path=/';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [
          name,
          '=',
          encodeURIComponent(value),
          expires,
          path,
          domain,
          secure,
        ].join('');
      } else {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
          var cookies = document.cookie.split(';');
          for (var i = 0; i < cookies.length; i++) {
            var cookie = trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) === name + '=') {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
            }
          }
        }
        return cookieValue;
      }
    };

    this.Utils = {
      trim,
      cookie,
    };

    this.waterMark = {};
    this.initWaterMark();
  };

  const initWaterMark = function () {
    /**
     * 返回当前显示设备的物理像素分辨率与CSS像素分辨率之比
     *
     * @param context
     * @see api 有些废弃了，其实类型 CanvasRenderingContext2D
     */
    const getPixelRatio = (context) => {
      if (!context) {
        return 1;
      }
      const backingStore =
        context.backingStorePixelRatio ||
        context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio ||
        1;
      return (window.devicePixelRatio || 1) / backingStore;
    };

    /**
     * 在页面注入水印
     *
     * @param imageUrl
     */
    const setWaterMark = (imageUrl) => {
      const {
        markLayout,
        style,
        className,
        markStyle,
        markClassName,
        markID,
        zIndex,
        gapX,
        width,
        prefixCls,
      } = this.waterMarkConfig;
      const wrapperCls = `${prefixCls}-wrapper ${className}`;
      const waterMakrCls = `${prefixCls} ${markClassName}`;

      const watermarkLayout = markLayout || document.body;
      const nextWrapperCls = wrapperCls.split(' ').filter((item) => !!item);
      watermarkLayout && nextWrapperCls.map((cls) => watermarkLayout.classList.add(cls));
      watermarkLayout.style.cssText = `${watermarkLayout.style.cssText} ${style}`;

      const waterMakrEl = document.body.querySelector(`#${markID}`);
      const waterMakr = document.createElement('div');
      const nextWaterMakrCls = waterMakrCls.split(' ').filter((item) => !!item);
      waterMakr.id = markID;
      nextWaterMakrCls.map((cls) => waterMakr.classList.add(cls));
      waterMakr.style.zIndex = zIndex;
      waterMakr.style.position = 'fixed';
      waterMakr.style.left = 0;
      waterMakr.style.top = 0;
      waterMakr.style.width = '100%';
      waterMakr.style.height = '100%';
      waterMakr.style.backgroundSize = `${gapX + width}px`;
      waterMakr.style.backgroundImage = `url('${imageUrl}')`;
      waterMakr.style.pointerEvents = 'none';
      waterMakr.style.top = 0;
      waterMakr.style.cssText = `${waterMakr.style.cssText} ${markStyle}`;
      !!waterMakrEl && waterMakrEl.parentElement.removeChild(waterMakrEl);
      watermarkLayout.appendChild(waterMakr);
      // const observer = new MutationObserver(mutations => {
      //   console.log(mutations)
      // });
      // observer.observe(waterMakr, { attributes: true })
    };

    /**
     * 设置水印图片
     *
     * @param imageUrl
     */
    const initImage = (option) => {
      this.config = { ...this.waterMarkConfig, ...option };
      const {
        gapX,
        gapY,
        width,
        height,
        rotate,
        image,
        content,
        subContent,
        offsetLeft,
        offsetTop,
        fontStyle,
        fontWeight,
        fontColor,
        fontSize,
        fontFamily,
      } = this.config;
      if (this.cookieContent !== content) {
        this.Utils.cookie('__security_waterMark_info', content);
        this.cookieContent = content;
      }
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const ratio = getPixelRatio(ctx);
      const canvasWidth = `${(gapX + width) * ratio}px`;
      const canvasHeight = `${(gapY + height) * ratio}px`;
      const canvasOffsetLeft = offsetLeft || gapX / 2;
      const canvasOffsetTop = offsetTop || gapY / 2;

      canvas.setAttribute('width', canvasWidth);
      canvas.setAttribute('height', canvasHeight);

      if (ctx) {
        // 旋转字符 rotate
        ctx.translate(canvasOffsetLeft * ratio, canvasOffsetTop * ratio);
        ctx.rotate((Math.PI / 180) * Number(rotate));
        const markWidth = width * ratio;
        const markHeight = height * ratio;

        if (image) {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.referrerPolicy = 'no-referrer';
          img.src = image;
          img.onload = () => {
            ctx.drawImage(img, 0, 0, markWidth, markHeight);
            setWaterMark(canvas.toDataURL());
          };
        } else {
          const markSize = Number(fontSize) * ratio;
          if (content) {
            ctx.font = `${fontStyle} normal ${fontWeight} ${markSize}px/${markHeight}px ${fontFamily}`;
            ctx.fillStyle = fontColor;
            ctx.textAlign = 'center';
            ctx.fillText(content, 0, 0);
          }
          if (subContent) {
            ctx.font = `${fontStyle} normal ${fontWeight} ${
              markSize * 0.75
            }px/${markHeight}px ${fontFamily}`;
            ctx.fillStyle = fontColor;
            ctx.fillText(subContent, 0, 30);
          }
          setWaterMark(canvas.toDataURL());
        }
      } else {
        // eslint-disable-next-line no-console
        console.error('当前环境不支持Canvas');
      }
    };
    this.waterMark.config = this.waterMarkConfig;
    this.waterMark.update = () => initImage;
    this.waterMark.set = (content) => initImage({ content });
  };

  S.prototype.initWaterMark = initWaterMark;
  S.prototype.version = '4.0.39';
  return S;
})();
(function (S) {
  var init = function () {};
  S.prototype.init = init;
  window.g_security = S = new S();
  window.g_waterMark = window.g_security.waterMark;
  const waterMarkInfo = window.g_security.Utils.cookie('__security_waterMark_info');
  const { content: waterMarkContent } = g_waterMark.config || {};
  g_waterMark.set(waterMarkInfo || waterMarkContent);
})(security);

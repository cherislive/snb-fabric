var feloader = (function (undefined) {
  var host = this;
  var F = function () {
    /**
     * feloader Environment.
     * @type {Object}
     */
    this.Env = {
      host: host,
      mods: {},
    };

    /**
     * feloader Config.
     * If load feloader.js, Config.debug defaults to true.
     * Else If load feloader-min.js, Config.debug defaults to false.
     * @private
     * @property {Object} Config
     * @property {Boolean} Config.debug
     * @property {Boolean} Config.useDailyAssets support replace host by force
     * @property {String} Config.assetsHost host default of production
     * @property {String} Config.dailyAssetsHost host default of daily
     * @property {String} Config.forceAssetsHost default undefined
     * @member feloader
     */
    this.Config = {
      debug: '@DEBUG@',
      packages: {},
      fns: {},
      useDailyAssets: false,
      forceAssetsHost: undefined,
      assetsHost: 'g.alicdn.com',
      dailyAssetsHost: 'g-assets.daily.taobao.net',
      crossorigin: false,
    };

    /**
     * isArray
     * @type {*}
     */
    var isArray =
      Array.isArray ||
      function (obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
      };

    /**
     * each loop
     * @param obj
     * @param fn
     */
    function each(obj, fn) {
      var i = 0;
      var myKeys, l;
      if (isArray(obj)) {
        l = obj.length;
        for (; i < l; i++) {
          if (fn(obj[i], i, obj) === false) {
            break;
          }
        }
      } else {
        myKeys = keys(obj);
        l = myKeys.length;
        for (; i < l; i++) {
          if (fn(obj[myKeys[i]], myKeys[i], obj) === false) {
            break;
          }
        }
      }
    }

    this.Utils = {
      endsWith: function (str, suffix) {
        var ind = str.length - suffix.length;
        return ind >= 0 && str.indexOf(suffix, ind) === ind;
      },
      each: each,
      isArray: isArray,
    };
    // initialize
    this.initUtils();
    this.initGetScript();
    var jsCssCallbacks = {};

    /**
     * Load a javascript/css file from the server using a GET HTTP request,
     * then execute it.
     *
     * for example:
     *      @example
     *      feloader.getScript(uri, success, charset);
     *      // or
     *      feloader.getScript(uri, {
     *          charset: string
     *          success: fn,
     *          error: fn,
     *          timeout: number
     *      });
     *
     * Note 404/500 status in ie<9 will trigger success callback.
     *
     * @param {String} uri resource's uri
     * @param {Function|Object} [success] success callback or config
     * @param {Function} [success.success] success callback
     * @param {Function} [success.error] error callback
     * @param {Number} [success.timeout] timeout (s)
     * @param {String} [success.charset] charset of current resource
     * @param {String} [charset] charset of current resource
     * @return {HTMLElement} script/style node
     * @member feloader
     */
    this.getScript = function (uri, success, charset) {
      // can not use feloader.Uri, uri can not be encoded for some uri
      // eg: /??dom.js,event.js , ? , should not be encoded
      var config = success;
      var crossorigin = this.Config.crossorigin;
      var css = this.Utils.endsWith(uri, '.css');
      var error, timeout, attrs, callbacks, timer;
      if (typeof config === 'object') {
        success = config.success;
        error = config.error;
        timeout = config.timeout;
        charset = config.charset;
        attrs = config.attrs;
      }
      if (css && ieMode < 10) {
        if (
          doc.getElementsByTagName('style').length + doc.getElementsByTagName('link').length >=
          31
        ) {
          setTimeout(function () {
            throw new Error(
              "style and link's number is more than 31." + 'ie < 10 can not insert link: ' + uri,
            );
          }, 0);
          if (error) {
            error();
          }
          return;
        }
      }
      callbacks = jsCssCallbacks[uri] = jsCssCallbacks[uri] || [];
      callbacks.push([success, error]);
      if (callbacks.length > 1) {
        return callbacks.node;
      }
      var node = document.createElement(css ? 'link' : 'script');
      var clearTimer = function () {
        if (timer) {
          clearTimeout(timer);
          timer = undefined;
        }
      };
      if (attrs) {
        each(attrs, function (v, n) {
          node.setAttribute(n, v);
        });
      }
      if (charset) {
        node.charset = charset;
      }
      if (css) {
        node.href = uri;
        node.rel = 'stylesheet';
        // can not set, else test fail
        // node.media = 'async';
      } else {
        node.src = uri;
        node.async = true;
        if (crossorigin) {
          node.setAttribute('crossorigin', 'anonymous');
        }
      }
      callbacks.node = node;
      var end = function (error) {
        var index = error;
        var fn;
        clearTimer();
        each(jsCssCallbacks[uri], function (callback) {
          if ((fn = callback[index])) {
            fn.call(node);
          }
        });
        delete jsCssCallbacks[uri];
      };
      var useNative = 'onload' in node;
      // onload for webkit 535.23  Firefox 9.0
      // https://bugs.webkit.org/show_activity.cgi?id=38995
      // https://bugzilla.mozilla.org/show_bug.cgi?id=185236
      // https://developer.mozilla.org/en/HTML/Element/link#Stylesheet_load_events
      // phantomjs 1.7 == webkit 534.34
      var forceCssPoll =
        this.Config.forceCssPoll ||
        (this.Utils.webkit && this.Utils.webkit < 536) ||
        // unknown browser defaults to css poll
        // https://github.com/kissyteam/feloader/issues/607
        (!this.Utils.webkit && !Utils.trident && !Utils.gecko);
      if (css && forceCssPoll && useNative) {
        useNative = false;
      }
      function onload() {
        var readyState = node.readyState;
        if (!readyState || readyState === 'loaded' || readyState === 'complete') {
          node.onreadystatechange = node.onload = null;
          end(0);
        }
      }

      //标准浏览器 css and all script
      if (useNative) {
        node.onload = onload;
        node.onerror = function () {
          node.onerror = null;
          end(1);
        };
      } else if (css) {
        // old chrome/firefox for css
        Utils.pollCss(node, function () {
          end(0);
        });
      } else {
        node.onreadystatechange = onload;
      }
      if (timeout) {
        timer = setTimeout(function () {
          end(1);
        }, timeout * MILLISECONDS_OF_SECOND);
      }
      if (!this.Utils.headNode) {
        headNode = document.getElementsByTagName('head')[0] || document.documentElement;
      }
      if (css) {
        // css order matters
        // so can not use css in head
        headNode.appendChild(node);
      } else {
        // can use js in head
        headNode.insertBefore(node, headNode.firstChild);
      }
      return node;
    };
  };

  /**
   * convert '1.2.3.4' to 1.234
   * @param s
   * @returns {Number}
   */
  function numberify(s) {
    var c = 0;
    return parseFloat(
      s.replace(/\./g, function () {
        return c++ === 0 ? '.' : '';
      }),
    );
  }

  var initUtils = function () {
    var Utils = this.Utils || {};
    var Env = this.Env;
    var host = Env.host;
    var doc = host.document;

    var m, v;
    var ua = (host.navigator || {}).userAgent || '';

    // https://github.com/kissyteam/kissy/issues/545
    // AppleWebKit/535.19
    // AppleWebKit534.30
    // appleWebKit/534.30
    // ApplelWebkit/534.30 （SAMSUNG-GT-S6818）
    // AndroidWebkit/534.30
    if (
      ((m = ua.match(/Web[Kk]it[\/]{0,1}([\d.]*)/)) || (m = ua.match(/Safari[\/]{0,1}([\d.]*)/))) &&
      m[1]
    ) {
      Utils.webkit = numberify(m[1]);
    }
    if ((m = ua.match(/Trident\/([\d.]*)/))) {
      Utils.trident = numberify(m[1]);
    }
    if ((m = ua.match(/Gecko/))) {
      Utils.gecko = 0.1; // Gecko detected, look for revision
      if ((m = ua.match(/rv:([\d.]*)/)) && m[1]) {
        Utils.gecko = numberify(m[1]);
      }
    }
    if ((m = ua.match(/MSIE ([^;]*)|Trident.*; rv(?:\s|:)?([0-9.]+)/)) && (v = m[1] || m[2])) {
      Utils.ie = numberify(v);
      Utils.ieMode = doc.documentMode || Utils.ie;
      Utils.trident = Utils.trident || 1;
    }
  };

  var initGetScript = function () {
    var jsCssCallbacks = {};
  };
  F.prototype.initGetScript = initGetScript;
  F.prototype.initUtils = initUtils;
  F.prototype.version = '4.0.39';
  return F;
})();

(function (F) {
  var init = function () {};
  F.prototype.init = init;
  window.feloader = F = new F();
})(feloader);

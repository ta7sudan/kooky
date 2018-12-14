(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.kooky = {})));
}(this, (function (exports) { 'use strict';

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  /* global true */
  var dec = decodeURIComponent,
      enc = encodeURIComponent,
      decode = function decode(s) {
    return s.replace(/(%[0-9A-Z]{2})+/g, dec);
  };

  function setCookie(key, value, _temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        expires = _ref.expires,
        domain = _ref.domain,
        secure = _ref.secure,
        _ref$path = _ref.path,
        path = _ref$path === void 0 ? '/' : _ref$path;

    if (typeof value !== 'string') {
      value = String(value);
    }

    key = enc(key.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, dec));
    value = enc(value.replace(/%(23|24|26|2B|5E|60|7C)/g, dec).replace(/[\\]/g, escape));
    var text = key + "=" + value;
    text += "; path=" + path.split(';')[0];
    typeof expires === 'number' && (expires = new Date(Date.now() + expires * 36e5)); // js中toUTCString和toGMTString是一样的
    // https://segmentfault.com/a/1190000006798626

    expires instanceof Date && (text += "; expires=" + expires.toUTCString());
    typeof domain === 'string' && (text += "; domain=" + domain.split(';')[0]);
    secure && (text += '; secure');
    return document.cookie = text;
  }

  function getCookie(key) {
    var cookies = document.cookie ? document.cookie.split('; ') : [],
        rst = [];

    for (var i = 0, len = cookies.length; i < len; ++i) {
      var part = cookies[i].split('='),
          name = decode(part[0]),
          value = decode(part.slice(1).join('='));
      name === key && rst.push(value);
    }

    return rst.length ? rst.length === 1 ? rst[0] : rst : null;
  }

  function removeCookie(key, options) {
    setCookie(key, '', _extends({}, options, {
      expires: -1
    }));
  }

  exports.setCookie = setCookie;
  exports.getCookie = getCookie;
  exports.removeCookie = removeCookie;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=kooky.umd.js.map

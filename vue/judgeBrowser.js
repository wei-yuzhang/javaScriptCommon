window.onload = function () {
  var browserVersion = myBrowser()
  alert(myBrowser())
  if (browserVersion === 'IE6' || browserVersion === 'IE7' || browserVersion === 'IE8') {
    var tips = document.createElement('div')
    tips.style.cssText = 'filter: progid:DXImageTransform.Microsoft.gradient(startcolorstr=#190069ff, endcolorstr=#190069ff); font-size: 16px; position: absolute; z-index: 10; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 105, 255, 0.1);'
    tips.innerHTML = "<div style='padding-top: 300px; text-align: center;'>当前浏览器版本过低，无法打开此系统，请使用 <span style='color: #c7254e;'>谷歌chrome浏览器</span> 打开，<a style='color: #c7254e; text-decoration: underline;' title='点击下载' href='http://erp.winning.com.cn:1618/Erp/images/GoogleChrome.rar'>点击下载</a></div>"
    document.body.appendChild(tips)
  }
}

// 判断浏览器版本
function myBrowser() {
  // 取得浏览器的 userAgent 字符串
  var userAgent = navigator.userAgent;

  // console.log(userAgent)

  // 判断是否 IE 的 Edge 浏览器
  var isEdge = navigator.userAgent.indexOf("Edge") > -1;

  // 判断是否是 IE11 及以上浏览器
  var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;

  // 判断是否IE<11浏览器
  var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1;

  // 判断是否 Opera 浏览器
  var isOpera = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1 && userAgent.indexOf("OPR") > -1

  // 判断是否 Firefox 浏览器
  var isFF = userAgent.indexOf("Firefox") > -1;

  // 判断是否 Safari 浏览器
  var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1;;

  // 判断是否 Chrome 浏览器
  var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1 && !isEdge;

  // IE 浏览器
  if (isIE) {
    var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
    reIE.test(userAgent);
    var fIEVersion = parseFloat(RegExp["$1"]);
    if(fIEVersion === 7) {
      return 'IE7';
    } else if(fIEVersion === 8) {
      return 'IE8';
    } else if(fIEVersion === 9) {
      return 'IE9';
    } else if(fIEVersion === 10) {
      return 'IE10';
    } else {
      return 'IE6'; // IE版本<=6
    }
  } else if (isEdge) {
    return 'edge';
  } else if (isIE11) {
    return 11;
  }

  // 火狐浏览器
  if (isFF) {
    return "FireFox";
  }

  // Opera 浏览器
  if (isOpera) {
    return "Opera";
  }

  // isSafari 浏览器
  if (isSafari) {
    return "Safari"
  }

  // 谷歌浏览器（存在 360 浏览器的情况）
  if (isChrome) {
    // application/vnd.chromium.remoting-viewer 可能为360特有
    var is360 = _mime("type", "application/vnd.chromium.remoting-viewer");
    if (is360) {
      return "360浏览器（极速模式）";
    } else {
      return "Chrome";
    }
  }
}

//测试mime
function _mime(option, value) {
  var mimeTypes = navigator.mimeTypes;
  for (var mt in mimeTypes) {
    if (mimeTypes[mt][option] == value) {
      return true;
    }
  }
  return false;
}

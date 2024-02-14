/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === "object" && typeof module === "object")
		module.exports = factory();
	else if(typeof define === "function" && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === "object" ? exports : root)[i] = a[i];
	}
})(self, function() {
	return /******/ (function() { // webpackBootstrap
		/******/ 	var __webpack_modules__ = ({

			/***/ "./node_modules/autosize/dist/autosize.js":
			/*!************************************************!*\
  !*** ./node_modules/autosize/dist/autosize.js ***!
  \************************************************/
			/***/ (function(module) {

				eval("(function (global, factory) {\n\t true ? module.exports = factory() :\n\t0;\n}(this, (function () {\n\tvar assignedElements = new Map();\n\n\tfunction assign(ta) {\n\t  if (!ta || !ta.nodeName || ta.nodeName !== 'TEXTAREA' || assignedElements.has(ta)) return;\n\t  var previousHeight = null;\n\n\t  function cacheScrollTops(el) {\n\t    var arr = [];\n\n\t    while (el && el.parentNode && el.parentNode instanceof Element) {\n\t      if (el.parentNode.scrollTop) {\n\t        arr.push([el.parentNode, el.parentNode.scrollTop]);\n\t      }\n\n\t      el = el.parentNode;\n\t    }\n\n\t    return function () {\n\t      return arr.forEach(function (_ref) {\n\t        var node = _ref[0],\n\t            scrollTop = _ref[1];\n\t        node.style.scrollBehavior = 'auto';\n\t        node.scrollTop = scrollTop;\n\t        node.style.scrollBehavior = null;\n\t      });\n\t    };\n\t  }\n\n\t  var computed = window.getComputedStyle(ta);\n\n\t  function setHeight(_ref2) {\n\t    var _ref2$restoreTextAlig = _ref2.restoreTextAlign,\n\t        restoreTextAlign = _ref2$restoreTextAlig === void 0 ? null : _ref2$restoreTextAlig,\n\t        _ref2$testForHeightRe = _ref2.testForHeightReduction,\n\t        testForHeightReduction = _ref2$testForHeightRe === void 0 ? true : _ref2$testForHeightRe;\n\t    var initialOverflowY = computed.overflowY;\n\n\t    if (ta.scrollHeight === 0) {\n\t      // If the scrollHeight is 0, then the element probably has display:none or is detached from the DOM.\n\t      return;\n\t    } // disallow vertical resizing\n\n\n\t    if (computed.resize === 'vertical') {\n\t      ta.style.resize = 'none';\n\t    } else if (computed.resize === 'both') {\n\t      ta.style.resize = 'horizontal';\n\t    }\n\n\t    var restoreScrollTops; // remove inline height style to accurately measure situations where the textarea should shrink\n\t    // however, skip this step if the new value appends to the previous value, as textarea height should only have grown\n\n\t    if (testForHeightReduction) {\n\t      // ensure the scrollTop values of parent elements are not modified as a consequence of shrinking the textarea height\n\t      restoreScrollTops = cacheScrollTops(ta);\n\t      ta.style.height = '';\n\t    }\n\n\t    var newHeight;\n\n\t    if (computed.boxSizing === 'content-box') {\n\t      newHeight = ta.scrollHeight - (parseFloat(computed.paddingTop) + parseFloat(computed.paddingBottom));\n\t    } else {\n\t      newHeight = ta.scrollHeight + parseFloat(computed.borderTopWidth) + parseFloat(computed.borderBottomWidth);\n\t    }\n\n\t    if (computed.maxHeight !== 'none' && newHeight > parseFloat(computed.maxHeight)) {\n\t      if (computed.overflowY === 'hidden') {\n\t        ta.style.overflow = 'scroll';\n\t      }\n\n\t      newHeight = parseFloat(computed.maxHeight);\n\t    } else if (computed.overflowY !== 'hidden') {\n\t      ta.style.overflow = 'hidden';\n\t    }\n\n\t    ta.style.height = newHeight + 'px';\n\n\t    if (restoreTextAlign) {\n\t      ta.style.textAlign = restoreTextAlign;\n\t    }\n\n\t    if (restoreScrollTops) {\n\t      restoreScrollTops();\n\t    }\n\n\t    if (previousHeight !== newHeight) {\n\t      ta.dispatchEvent(new Event('autosize:resized', {\n\t        bubbles: true\n\t      }));\n\t      previousHeight = newHeight;\n\t    }\n\n\t    if (initialOverflowY !== computed.overflow && !restoreTextAlign) {\n\t      var textAlign = computed.textAlign;\n\n\t      if (computed.overflow === 'hidden') {\n\t        // Webkit fails to reflow text after overflow is hidden,\n\t        // even if hiding overflow would allow text to fit more compactly.\n\t        // The following is intended to force the necessary text reflow.\n\t        ta.style.textAlign = textAlign === 'start' ? 'end' : 'start';\n\t      }\n\n\t      setHeight({\n\t        restoreTextAlign: textAlign,\n\t        testForHeightReduction: true\n\t      });\n\t    }\n\t  }\n\n\t  function fullSetHeight() {\n\t    setHeight({\n\t      testForHeightReduction: true,\n\t      restoreTextAlign: null\n\t    });\n\t  }\n\n\t  var handleInput = function () {\n\t    var previousValue = ta.value;\n\t    return function () {\n\t      setHeight({\n\t        // if previousValue is '', check for height shrinkage because the placeholder may be taking up space instead\n\t        // if new value is merely appending to previous value, skip checking for height deduction\n\t        testForHeightReduction: previousValue === '' || !ta.value.startsWith(previousValue),\n\t        restoreTextAlign: null\n\t      });\n\t      previousValue = ta.value;\n\t    };\n\t  }();\n\n\t  var destroy = function (style) {\n\t    ta.removeEventListener('autosize:destroy', destroy);\n\t    ta.removeEventListener('autosize:update', fullSetHeight);\n\t    ta.removeEventListener('input', handleInput);\n\t    window.removeEventListener('resize', fullSetHeight); // future todo: consider replacing with ResizeObserver\n\n\t    Object.keys(style).forEach(function (key) {\n\t      return ta.style[key] = style[key];\n\t    });\n\t    assignedElements[\"delete\"](ta);\n\t  }.bind(ta, {\n\t    height: ta.style.height,\n\t    resize: ta.style.resize,\n\t    textAlign: ta.style.textAlign,\n\t    overflowY: ta.style.overflowY,\n\t    overflowX: ta.style.overflowX,\n\t    wordWrap: ta.style.wordWrap\n\t  });\n\n\t  ta.addEventListener('autosize:destroy', destroy);\n\t  ta.addEventListener('autosize:update', fullSetHeight);\n\t  ta.addEventListener('input', handleInput);\n\t  window.addEventListener('resize', fullSetHeight); // future todo: consider replacing with ResizeObserver\n\n\t  ta.style.overflowX = 'hidden';\n\t  ta.style.wordWrap = 'break-word';\n\t  assignedElements.set(ta, {\n\t    destroy: destroy,\n\t    update: fullSetHeight\n\t  });\n\t  fullSetHeight();\n\t}\n\n\tfunction destroy(ta) {\n\t  var methods = assignedElements.get(ta);\n\n\t  if (methods) {\n\t    methods.destroy();\n\t  }\n\t}\n\n\tfunction update(ta) {\n\t  var methods = assignedElements.get(ta);\n\n\t  if (methods) {\n\t    methods.update();\n\t  }\n\t}\n\n\tvar autosize = null; // Do nothing in Node.js environment\n\n\tif (typeof window === 'undefined') {\n\t  autosize = function autosize(el) {\n\t    return el;\n\t  };\n\n\t  autosize.destroy = function (el) {\n\t    return el;\n\t  };\n\n\t  autosize.update = function (el) {\n\t    return el;\n\t  };\n\t} else {\n\t  autosize = function autosize(el, options) {\n\t    if (el) {\n\t      Array.prototype.forEach.call(el.length ? el : [el], function (x) {\n\t        return assign(x);\n\t      });\n\t    }\n\n\t    return el;\n\t  };\n\n\t  autosize.destroy = function (el) {\n\t    if (el) {\n\t      Array.prototype.forEach.call(el.length ? el : [el], destroy);\n\t    }\n\n\t    return el;\n\t  };\n\n\t  autosize.update = function (el) {\n\t    if (el) {\n\t      Array.prototype.forEach.call(el.length ? el : [el], update);\n\t    }\n\n\t    return el;\n\t  };\n\t}\n\n\tvar autosize$1 = autosize;\n\n\treturn autosize$1;\n\n})));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvYXV0b3NpemUvZGlzdC9hdXRvc2l6ZS5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBLENBQUMsS0FBNEQ7QUFDN0QsQ0FBQyxDQUNzRDtBQUN2RCxDQUFDO0FBQ0Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOzs7QUFHUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUEsNEJBQTRCO0FBQzVCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMERBQTBEOztBQUUxRDtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0EscURBQXFEOztBQUVyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHNCQUFzQjs7QUFFdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9WdWV4eS8uL25vZGVfbW9kdWxlcy9hdXRvc2l6ZS9kaXN0L2F1dG9zaXplLmpzPzE5ZTkiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcblx0dHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuXHR0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxuXHQoZ2xvYmFsID0gZ2xvYmFsIHx8IHNlbGYsIGdsb2JhbC5hdXRvc2l6ZSA9IGZhY3RvcnkoKSk7XG59KHRoaXMsIChmdW5jdGlvbiAoKSB7XG5cdHZhciBhc3NpZ25lZEVsZW1lbnRzID0gbmV3IE1hcCgpO1xuXG5cdGZ1bmN0aW9uIGFzc2lnbih0YSkge1xuXHQgIGlmICghdGEgfHwgIXRhLm5vZGVOYW1lIHx8IHRhLm5vZGVOYW1lICE9PSAnVEVYVEFSRUEnIHx8IGFzc2lnbmVkRWxlbWVudHMuaGFzKHRhKSkgcmV0dXJuO1xuXHQgIHZhciBwcmV2aW91c0hlaWdodCA9IG51bGw7XG5cblx0ICBmdW5jdGlvbiBjYWNoZVNjcm9sbFRvcHMoZWwpIHtcblx0ICAgIHZhciBhcnIgPSBbXTtcblxuXHQgICAgd2hpbGUgKGVsICYmIGVsLnBhcmVudE5vZGUgJiYgZWwucGFyZW50Tm9kZSBpbnN0YW5jZW9mIEVsZW1lbnQpIHtcblx0ICAgICAgaWYgKGVsLnBhcmVudE5vZGUuc2Nyb2xsVG9wKSB7XG5cdCAgICAgICAgYXJyLnB1c2goW2VsLnBhcmVudE5vZGUsIGVsLnBhcmVudE5vZGUuc2Nyb2xsVG9wXSk7XG5cdCAgICAgIH1cblxuXHQgICAgICBlbCA9IGVsLnBhcmVudE5vZGU7XG5cdCAgICB9XG5cblx0ICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgIHJldHVybiBhcnIuZm9yRWFjaChmdW5jdGlvbiAoX3JlZikge1xuXHQgICAgICAgIHZhciBub2RlID0gX3JlZlswXSxcblx0ICAgICAgICAgICAgc2Nyb2xsVG9wID0gX3JlZlsxXTtcblx0ICAgICAgICBub2RlLnN0eWxlLnNjcm9sbEJlaGF2aW9yID0gJ2F1dG8nO1xuXHQgICAgICAgIG5vZGUuc2Nyb2xsVG9wID0gc2Nyb2xsVG9wO1xuXHQgICAgICAgIG5vZGUuc3R5bGUuc2Nyb2xsQmVoYXZpb3IgPSBudWxsO1xuXHQgICAgICB9KTtcblx0ICAgIH07XG5cdCAgfVxuXG5cdCAgdmFyIGNvbXB1dGVkID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGEpO1xuXG5cdCAgZnVuY3Rpb24gc2V0SGVpZ2h0KF9yZWYyKSB7XG5cdCAgICB2YXIgX3JlZjIkcmVzdG9yZVRleHRBbGlnID0gX3JlZjIucmVzdG9yZVRleHRBbGlnbixcblx0ICAgICAgICByZXN0b3JlVGV4dEFsaWduID0gX3JlZjIkcmVzdG9yZVRleHRBbGlnID09PSB2b2lkIDAgPyBudWxsIDogX3JlZjIkcmVzdG9yZVRleHRBbGlnLFxuXHQgICAgICAgIF9yZWYyJHRlc3RGb3JIZWlnaHRSZSA9IF9yZWYyLnRlc3RGb3JIZWlnaHRSZWR1Y3Rpb24sXG5cdCAgICAgICAgdGVzdEZvckhlaWdodFJlZHVjdGlvbiA9IF9yZWYyJHRlc3RGb3JIZWlnaHRSZSA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9yZWYyJHRlc3RGb3JIZWlnaHRSZTtcblx0ICAgIHZhciBpbml0aWFsT3ZlcmZsb3dZID0gY29tcHV0ZWQub3ZlcmZsb3dZO1xuXG5cdCAgICBpZiAodGEuc2Nyb2xsSGVpZ2h0ID09PSAwKSB7XG5cdCAgICAgIC8vIElmIHRoZSBzY3JvbGxIZWlnaHQgaXMgMCwgdGhlbiB0aGUgZWxlbWVudCBwcm9iYWJseSBoYXMgZGlzcGxheTpub25lIG9yIGlzIGRldGFjaGVkIGZyb20gdGhlIERPTS5cblx0ICAgICAgcmV0dXJuO1xuXHQgICAgfSAvLyBkaXNhbGxvdyB2ZXJ0aWNhbCByZXNpemluZ1xuXG5cblx0ICAgIGlmIChjb21wdXRlZC5yZXNpemUgPT09ICd2ZXJ0aWNhbCcpIHtcblx0ICAgICAgdGEuc3R5bGUucmVzaXplID0gJ25vbmUnO1xuXHQgICAgfSBlbHNlIGlmIChjb21wdXRlZC5yZXNpemUgPT09ICdib3RoJykge1xuXHQgICAgICB0YS5zdHlsZS5yZXNpemUgPSAnaG9yaXpvbnRhbCc7XG5cdCAgICB9XG5cblx0ICAgIHZhciByZXN0b3JlU2Nyb2xsVG9wczsgLy8gcmVtb3ZlIGlubGluZSBoZWlnaHQgc3R5bGUgdG8gYWNjdXJhdGVseSBtZWFzdXJlIHNpdHVhdGlvbnMgd2hlcmUgdGhlIHRleHRhcmVhIHNob3VsZCBzaHJpbmtcblx0ICAgIC8vIGhvd2V2ZXIsIHNraXAgdGhpcyBzdGVwIGlmIHRoZSBuZXcgdmFsdWUgYXBwZW5kcyB0byB0aGUgcHJldmlvdXMgdmFsdWUsIGFzIHRleHRhcmVhIGhlaWdodCBzaG91bGQgb25seSBoYXZlIGdyb3duXG5cblx0ICAgIGlmICh0ZXN0Rm9ySGVpZ2h0UmVkdWN0aW9uKSB7XG5cdCAgICAgIC8vIGVuc3VyZSB0aGUgc2Nyb2xsVG9wIHZhbHVlcyBvZiBwYXJlbnQgZWxlbWVudHMgYXJlIG5vdCBtb2RpZmllZCBhcyBhIGNvbnNlcXVlbmNlIG9mIHNocmlua2luZyB0aGUgdGV4dGFyZWEgaGVpZ2h0XG5cdCAgICAgIHJlc3RvcmVTY3JvbGxUb3BzID0gY2FjaGVTY3JvbGxUb3BzKHRhKTtcblx0ICAgICAgdGEuc3R5bGUuaGVpZ2h0ID0gJyc7XG5cdCAgICB9XG5cblx0ICAgIHZhciBuZXdIZWlnaHQ7XG5cblx0ICAgIGlmIChjb21wdXRlZC5ib3hTaXppbmcgPT09ICdjb250ZW50LWJveCcpIHtcblx0ICAgICAgbmV3SGVpZ2h0ID0gdGEuc2Nyb2xsSGVpZ2h0IC0gKHBhcnNlRmxvYXQoY29tcHV0ZWQucGFkZGluZ1RvcCkgKyBwYXJzZUZsb2F0KGNvbXB1dGVkLnBhZGRpbmdCb3R0b20pKTtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIG5ld0hlaWdodCA9IHRhLnNjcm9sbEhlaWdodCArIHBhcnNlRmxvYXQoY29tcHV0ZWQuYm9yZGVyVG9wV2lkdGgpICsgcGFyc2VGbG9hdChjb21wdXRlZC5ib3JkZXJCb3R0b21XaWR0aCk7XG5cdCAgICB9XG5cblx0ICAgIGlmIChjb21wdXRlZC5tYXhIZWlnaHQgIT09ICdub25lJyAmJiBuZXdIZWlnaHQgPiBwYXJzZUZsb2F0KGNvbXB1dGVkLm1heEhlaWdodCkpIHtcblx0ICAgICAgaWYgKGNvbXB1dGVkLm92ZXJmbG93WSA9PT0gJ2hpZGRlbicpIHtcblx0ICAgICAgICB0YS5zdHlsZS5vdmVyZmxvdyA9ICdzY3JvbGwnO1xuXHQgICAgICB9XG5cblx0ICAgICAgbmV3SGVpZ2h0ID0gcGFyc2VGbG9hdChjb21wdXRlZC5tYXhIZWlnaHQpO1xuXHQgICAgfSBlbHNlIGlmIChjb21wdXRlZC5vdmVyZmxvd1kgIT09ICdoaWRkZW4nKSB7XG5cdCAgICAgIHRhLnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG5cdCAgICB9XG5cblx0ICAgIHRhLnN0eWxlLmhlaWdodCA9IG5ld0hlaWdodCArICdweCc7XG5cblx0ICAgIGlmIChyZXN0b3JlVGV4dEFsaWduKSB7XG5cdCAgICAgIHRhLnN0eWxlLnRleHRBbGlnbiA9IHJlc3RvcmVUZXh0QWxpZ247XG5cdCAgICB9XG5cblx0ICAgIGlmIChyZXN0b3JlU2Nyb2xsVG9wcykge1xuXHQgICAgICByZXN0b3JlU2Nyb2xsVG9wcygpO1xuXHQgICAgfVxuXG5cdCAgICBpZiAocHJldmlvdXNIZWlnaHQgIT09IG5ld0hlaWdodCkge1xuXHQgICAgICB0YS5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnYXV0b3NpemU6cmVzaXplZCcsIHtcblx0ICAgICAgICBidWJibGVzOiB0cnVlXG5cdCAgICAgIH0pKTtcblx0ICAgICAgcHJldmlvdXNIZWlnaHQgPSBuZXdIZWlnaHQ7XG5cdCAgICB9XG5cblx0ICAgIGlmIChpbml0aWFsT3ZlcmZsb3dZICE9PSBjb21wdXRlZC5vdmVyZmxvdyAmJiAhcmVzdG9yZVRleHRBbGlnbikge1xuXHQgICAgICB2YXIgdGV4dEFsaWduID0gY29tcHV0ZWQudGV4dEFsaWduO1xuXG5cdCAgICAgIGlmIChjb21wdXRlZC5vdmVyZmxvdyA9PT0gJ2hpZGRlbicpIHtcblx0ICAgICAgICAvLyBXZWJraXQgZmFpbHMgdG8gcmVmbG93IHRleHQgYWZ0ZXIgb3ZlcmZsb3cgaXMgaGlkZGVuLFxuXHQgICAgICAgIC8vIGV2ZW4gaWYgaGlkaW5nIG92ZXJmbG93IHdvdWxkIGFsbG93IHRleHQgdG8gZml0IG1vcmUgY29tcGFjdGx5LlxuXHQgICAgICAgIC8vIFRoZSBmb2xsb3dpbmcgaXMgaW50ZW5kZWQgdG8gZm9yY2UgdGhlIG5lY2Vzc2FyeSB0ZXh0IHJlZmxvdy5cblx0ICAgICAgICB0YS5zdHlsZS50ZXh0QWxpZ24gPSB0ZXh0QWxpZ24gPT09ICdzdGFydCcgPyAnZW5kJyA6ICdzdGFydCc7XG5cdCAgICAgIH1cblxuXHQgICAgICBzZXRIZWlnaHQoe1xuXHQgICAgICAgIHJlc3RvcmVUZXh0QWxpZ246IHRleHRBbGlnbixcblx0ICAgICAgICB0ZXN0Rm9ySGVpZ2h0UmVkdWN0aW9uOiB0cnVlXG5cdCAgICAgIH0pO1xuXHQgICAgfVxuXHQgIH1cblxuXHQgIGZ1bmN0aW9uIGZ1bGxTZXRIZWlnaHQoKSB7XG5cdCAgICBzZXRIZWlnaHQoe1xuXHQgICAgICB0ZXN0Rm9ySGVpZ2h0UmVkdWN0aW9uOiB0cnVlLFxuXHQgICAgICByZXN0b3JlVGV4dEFsaWduOiBudWxsXG5cdCAgICB9KTtcblx0ICB9XG5cblx0ICB2YXIgaGFuZGxlSW5wdXQgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICB2YXIgcHJldmlvdXNWYWx1ZSA9IHRhLnZhbHVlO1xuXHQgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0ICAgICAgc2V0SGVpZ2h0KHtcblx0ICAgICAgICAvLyBpZiBwcmV2aW91c1ZhbHVlIGlzICcnLCBjaGVjayBmb3IgaGVpZ2h0IHNocmlua2FnZSBiZWNhdXNlIHRoZSBwbGFjZWhvbGRlciBtYXkgYmUgdGFraW5nIHVwIHNwYWNlIGluc3RlYWRcblx0ICAgICAgICAvLyBpZiBuZXcgdmFsdWUgaXMgbWVyZWx5IGFwcGVuZGluZyB0byBwcmV2aW91cyB2YWx1ZSwgc2tpcCBjaGVja2luZyBmb3IgaGVpZ2h0IGRlZHVjdGlvblxuXHQgICAgICAgIHRlc3RGb3JIZWlnaHRSZWR1Y3Rpb246IHByZXZpb3VzVmFsdWUgPT09ICcnIHx8ICF0YS52YWx1ZS5zdGFydHNXaXRoKHByZXZpb3VzVmFsdWUpLFxuXHQgICAgICAgIHJlc3RvcmVUZXh0QWxpZ246IG51bGxcblx0ICAgICAgfSk7XG5cdCAgICAgIHByZXZpb3VzVmFsdWUgPSB0YS52YWx1ZTtcblx0ICAgIH07XG5cdCAgfSgpO1xuXG5cdCAgdmFyIGRlc3Ryb3kgPSBmdW5jdGlvbiAoc3R5bGUpIHtcblx0ICAgIHRhLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2F1dG9zaXplOmRlc3Ryb3knLCBkZXN0cm95KTtcblx0ICAgIHRhLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2F1dG9zaXplOnVwZGF0ZScsIGZ1bGxTZXRIZWlnaHQpO1xuXHQgICAgdGEucmVtb3ZlRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBoYW5kbGVJbnB1dCk7XG5cdCAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVsbFNldEhlaWdodCk7IC8vIGZ1dHVyZSB0b2RvOiBjb25zaWRlciByZXBsYWNpbmcgd2l0aCBSZXNpemVPYnNlcnZlclxuXG5cdCAgICBPYmplY3Qua2V5cyhzdHlsZSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdCAgICAgIHJldHVybiB0YS5zdHlsZVtrZXldID0gc3R5bGVba2V5XTtcblx0ICAgIH0pO1xuXHQgICAgYXNzaWduZWRFbGVtZW50c1tcImRlbGV0ZVwiXSh0YSk7XG5cdCAgfS5iaW5kKHRhLCB7XG5cdCAgICBoZWlnaHQ6IHRhLnN0eWxlLmhlaWdodCxcblx0ICAgIHJlc2l6ZTogdGEuc3R5bGUucmVzaXplLFxuXHQgICAgdGV4dEFsaWduOiB0YS5zdHlsZS50ZXh0QWxpZ24sXG5cdCAgICBvdmVyZmxvd1k6IHRhLnN0eWxlLm92ZXJmbG93WSxcblx0ICAgIG92ZXJmbG93WDogdGEuc3R5bGUub3ZlcmZsb3dYLFxuXHQgICAgd29yZFdyYXA6IHRhLnN0eWxlLndvcmRXcmFwXG5cdCAgfSk7XG5cblx0ICB0YS5hZGRFdmVudExpc3RlbmVyKCdhdXRvc2l6ZTpkZXN0cm95JywgZGVzdHJveSk7XG5cdCAgdGEuYWRkRXZlbnRMaXN0ZW5lcignYXV0b3NpemU6dXBkYXRlJywgZnVsbFNldEhlaWdodCk7XG5cdCAgdGEuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBoYW5kbGVJbnB1dCk7XG5cdCAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bGxTZXRIZWlnaHQpOyAvLyBmdXR1cmUgdG9kbzogY29uc2lkZXIgcmVwbGFjaW5nIHdpdGggUmVzaXplT2JzZXJ2ZXJcblxuXHQgIHRhLnN0eWxlLm92ZXJmbG93WCA9ICdoaWRkZW4nO1xuXHQgIHRhLnN0eWxlLndvcmRXcmFwID0gJ2JyZWFrLXdvcmQnO1xuXHQgIGFzc2lnbmVkRWxlbWVudHMuc2V0KHRhLCB7XG5cdCAgICBkZXN0cm95OiBkZXN0cm95LFxuXHQgICAgdXBkYXRlOiBmdWxsU2V0SGVpZ2h0XG5cdCAgfSk7XG5cdCAgZnVsbFNldEhlaWdodCgpO1xuXHR9XG5cblx0ZnVuY3Rpb24gZGVzdHJveSh0YSkge1xuXHQgIHZhciBtZXRob2RzID0gYXNzaWduZWRFbGVtZW50cy5nZXQodGEpO1xuXG5cdCAgaWYgKG1ldGhvZHMpIHtcblx0ICAgIG1ldGhvZHMuZGVzdHJveSgpO1xuXHQgIH1cblx0fVxuXG5cdGZ1bmN0aW9uIHVwZGF0ZSh0YSkge1xuXHQgIHZhciBtZXRob2RzID0gYXNzaWduZWRFbGVtZW50cy5nZXQodGEpO1xuXG5cdCAgaWYgKG1ldGhvZHMpIHtcblx0ICAgIG1ldGhvZHMudXBkYXRlKCk7XG5cdCAgfVxuXHR9XG5cblx0dmFyIGF1dG9zaXplID0gbnVsbDsgLy8gRG8gbm90aGluZyBpbiBOb2RlLmpzIGVudmlyb25tZW50XG5cblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7XG5cdCAgYXV0b3NpemUgPSBmdW5jdGlvbiBhdXRvc2l6ZShlbCkge1xuXHQgICAgcmV0dXJuIGVsO1xuXHQgIH07XG5cblx0ICBhdXRvc2l6ZS5kZXN0cm95ID0gZnVuY3Rpb24gKGVsKSB7XG5cdCAgICByZXR1cm4gZWw7XG5cdCAgfTtcblxuXHQgIGF1dG9zaXplLnVwZGF0ZSA9IGZ1bmN0aW9uIChlbCkge1xuXHQgICAgcmV0dXJuIGVsO1xuXHQgIH07XG5cdH0gZWxzZSB7XG5cdCAgYXV0b3NpemUgPSBmdW5jdGlvbiBhdXRvc2l6ZShlbCwgb3B0aW9ucykge1xuXHQgICAgaWYgKGVsKSB7XG5cdCAgICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoZWwubGVuZ3RoID8gZWwgOiBbZWxdLCBmdW5jdGlvbiAoeCkge1xuXHQgICAgICAgIHJldHVybiBhc3NpZ24oeCk7XG5cdCAgICAgIH0pO1xuXHQgICAgfVxuXG5cdCAgICByZXR1cm4gZWw7XG5cdCAgfTtcblxuXHQgIGF1dG9zaXplLmRlc3Ryb3kgPSBmdW5jdGlvbiAoZWwpIHtcblx0ICAgIGlmIChlbCkge1xuXHQgICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGVsLmxlbmd0aCA/IGVsIDogW2VsXSwgZGVzdHJveSk7XG5cdCAgICB9XG5cblx0ICAgIHJldHVybiBlbDtcblx0ICB9O1xuXG5cdCAgYXV0b3NpemUudXBkYXRlID0gZnVuY3Rpb24gKGVsKSB7XG5cdCAgICBpZiAoZWwpIHtcblx0ICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChlbC5sZW5ndGggPyBlbCA6IFtlbF0sIHVwZGF0ZSk7XG5cdCAgICB9XG5cblx0ICAgIHJldHVybiBlbDtcblx0ICB9O1xuXHR9XG5cblx0dmFyIGF1dG9zaXplJDEgPSBhdXRvc2l6ZTtcblxuXHRyZXR1cm4gYXV0b3NpemUkMTtcblxufSkpKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/autosize/dist/autosize.js\n");

				/***/ }),

			/***/ "./libs/autosize/autosize.js":
			/*!***********************************!*\
  !*** ./libs/autosize/autosize.js ***!
  \***********************************/
			/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

				"use strict";
				eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   autosize: function() { return /* reexport module object */ autosize_dist_autosize__WEBPACK_IMPORTED_MODULE_0__; }\n/* harmony export */ });\n/* harmony import */ var autosize_dist_autosize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! autosize/dist/autosize */ \"./node_modules/autosize/dist/autosize.js\");\n/* harmony import */ var autosize_dist_autosize__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(autosize_dist_autosize__WEBPACK_IMPORTED_MODULE_0__);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9saWJzL2F1dG9zaXplL2F1dG9zaXplLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFtRCIsInNvdXJjZXMiOlsid2VicGFjazovL1Z1ZXh5Ly4vbGlicy9hdXRvc2l6ZS9hdXRvc2l6ZS5qcz9jZTJiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGF1dG9zaXplIGZyb20gJ2F1dG9zaXplL2Rpc3QvYXV0b3NpemUnO1xuXG5leHBvcnQgeyBhdXRvc2l6ZSB9O1xuIl0sIm5hbWVzIjpbImF1dG9zaXplIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./libs/autosize/autosize.js\n");

				/***/ })

			/******/ 	});
		/************************************************************************/
		/******/ 	// The module cache
		/******/ 	var __webpack_module_cache__ = {};
		/******/ 	
		/******/ 	// The require function
		/******/ 	function __webpack_require__(moduleId) {
			/******/ 		// Check if module is in cache
			/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
			/******/ 		if (cachedModule !== undefined) {
				/******/ 			return cachedModule.exports;
				/******/ 		}
			/******/ 		// Create a new module (and put it into the cache)
			/******/ 		var module = __webpack_module_cache__[moduleId] = {
				/******/ 			// no module.id needed
				/******/ 			// no module.loaded needed
				/******/ 			exports: {}
				/******/ 		};
			/******/ 	
			/******/ 		// Execute the module function
			/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
			/******/ 	
			/******/ 		// Return the exports of the module
			/******/ 		return module.exports;
			/******/ 	}
		/******/ 	
		/************************************************************************/
		/******/ 	/* webpack/runtime/compat get default export */
		/******/ 	!function() {
			/******/ 		// getDefaultExport function for compatibility with non-harmony modules
			/******/ 		__webpack_require__.n = function(module) {
				/******/ 			var getter = module && module.__esModule ?
				/******/ 				function() { return module["default"]; } :
				/******/ 				function() { return module; };
				/******/ 			__webpack_require__.d(getter, { a: getter });
				/******/ 			return getter;
				/******/ 		};
			/******/ 	}();
		/******/ 	
		/******/ 	/* webpack/runtime/define property getters */
		/******/ 	!function() {
			/******/ 		// define getter functions for harmony exports
			/******/ 		__webpack_require__.d = function(exports, definition) {
				/******/ 			for(var key in definition) {
					/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
						/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
						/******/ 				}
					/******/ 			}
				/******/ 		};
			/******/ 	}();
		/******/ 	
		/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
		/******/ 	!function() {
			/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); };
			/******/ 	}();
		/******/ 	
		/******/ 	/* webpack/runtime/make namespace object */
		/******/ 	!function() {
			/******/ 		// define __esModule on exports
			/******/ 		__webpack_require__.r = function(exports) {
				/******/ 			if(typeof Symbol !== "undefined" && Symbol.toStringTag) {
					/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
					/******/ 			}
				/******/ 			Object.defineProperty(exports, "__esModule", { value: true });
				/******/ 		};
			/******/ 	}();
		/******/ 	
		/************************************************************************/
		/******/ 	
		/******/ 	// startup
		/******/ 	// Load entry module and return exports
		/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
		/******/ 	var __webpack_exports__ = __webpack_require__("./libs/autosize/autosize.js");
		/******/ 	
		/******/ 	return __webpack_exports__;
		/******/ })()
	;
});
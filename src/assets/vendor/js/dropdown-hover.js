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

			/***/ "./js/dropdown-hover.js":
			/*!******************************!*\
  !*** ./js/dropdown-hover.js ***!
  \******************************/
			/***/ (function() {

				eval("// Add onHover event for dropdowns\n\n;\n(function ($) {\n  if (!$ || !$.fn) return;\n  var SELECTOR = '[data-bs-toggle=dropdown][data-trigger=hover]';\n  var TIMEOUT = 150;\n  function openDropdown($i) {\n    var t = $i.data('dd-timeout');\n    if (t) {\n      clearTimeout(t);\n      t = null;\n      $i.data('dd-timeout', t);\n    }\n    if ($i.attr('aria-expanded') !== 'true') $i.dropdown('toggle');\n  }\n  function closeDropdown($i) {\n    var t = $i.data('dd-timeout');\n    if (t) clearTimeout(t);\n    t = setTimeout(function () {\n      var t2 = $i.data('dd-timeout');\n      if (t2) {\n        clearTimeout(t2);\n        t2 = null;\n        $i.data('dd-timeout', t2);\n      }\n      if ($i.attr('aria-expanded') === 'true') $i.dropdown('toggle');\n    }, TIMEOUT);\n    $i.data('dd-timeout', t);\n  }\n  $(function () {\n    $('body').on('mouseenter', \"\".concat(SELECTOR, \", \").concat(SELECTOR, \" ~ .dropdown-menu\"), function () {\n      var $toggle = $(this).hasClass('dropdown-toggle') ? $(this) : $(this).prev('.dropdown-toggle');\n      var $dropdown = $(this).hasClass('dropdown-menu') ? $(this) : $(this).next('.dropdown-menu');\n      if (window.getComputedStyle($dropdown[0], null).getPropertyValue('position') === 'static') return;\n\n      // Set hovered flag\n      if ($(this).is(SELECTOR)) {\n        $(this).data('hovered', true);\n      }\n      openDropdown($(this).hasClass('dropdown-toggle') ? $(this) : $(this).prev('.dropdown-toggle'));\n    }).on('mouseleave', \"\".concat(SELECTOR, \", \").concat(SELECTOR, \" ~ .dropdown-menu\"), function () {\n      var $toggle = $(this).hasClass('dropdown-toggle') ? $(this) : $(this).prev('.dropdown-toggle');\n      var $dropdown = $(this).hasClass('dropdown-menu') ? $(this) : $(this).next('.dropdown-menu');\n      if (window.getComputedStyle($dropdown[0], null).getPropertyValue('position') === 'static') return;\n\n      // Remove hovered flag\n      if ($(this).is(SELECTOR)) {\n        $(this).data('hovered', false);\n      }\n      closeDropdown($(this).hasClass('dropdown-toggle') ? $(this) : $(this).prev('.dropdown-toggle'));\n    }).on('hide.bs.dropdown', function (e) {\n      if ($(this).find(SELECTOR).data('hovered')) e.preventDefault();\n    });\n  });\n})(window.jQuery);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9kcm9wZG93bi1ob3Zlci5qcyIsIm5hbWVzIjpbIiQiLCJmbiIsIlNFTEVDVE9SIiwiVElNRU9VVCIsIm9wZW5Ecm9wZG93biIsIiRpIiwidCIsImRhdGEiLCJjbGVhclRpbWVvdXQiLCJhdHRyIiwiZHJvcGRvd24iLCJjbG9zZURyb3Bkb3duIiwic2V0VGltZW91dCIsInQyIiwib24iLCJjb25jYXQiLCIkdG9nZ2xlIiwiaGFzQ2xhc3MiLCJwcmV2IiwiJGRyb3Bkb3duIiwibmV4dCIsIndpbmRvdyIsImdldENvbXB1dGVkU3R5bGUiLCJnZXRQcm9wZXJ0eVZhbHVlIiwiaXMiLCJlIiwiZmluZCIsInByZXZlbnREZWZhdWx0IiwialF1ZXJ5Il0sInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9WdWV4eS8uL2pzL2Ryb3Bkb3duLWhvdmVyLmpzPzA2NDciXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQWRkIG9uSG92ZXIgZXZlbnQgZm9yIGRyb3Bkb3duc1xuXG47KGZ1bmN0aW9uICgkKSB7XG4gIGlmICghJCB8fCAhJC5mbikgcmV0dXJuXG5cbiAgY29uc3QgU0VMRUNUT1IgPSAnW2RhdGEtYnMtdG9nZ2xlPWRyb3Bkb3duXVtkYXRhLXRyaWdnZXI9aG92ZXJdJ1xuICBjb25zdCBUSU1FT1VUID0gMTUwXG5cbiAgZnVuY3Rpb24gb3BlbkRyb3Bkb3duKCRpKSB7XG4gICAgbGV0IHQgPSAkaS5kYXRhKCdkZC10aW1lb3V0JylcblxuICAgIGlmICh0KSB7XG4gICAgICBjbGVhclRpbWVvdXQodClcbiAgICAgIHQgPSBudWxsXG4gICAgICAkaS5kYXRhKCdkZC10aW1lb3V0JywgdClcbiAgICB9XG5cbiAgICBpZiAoJGkuYXR0cignYXJpYS1leHBhbmRlZCcpICE9PSAndHJ1ZScpICRpLmRyb3Bkb3duKCd0b2dnbGUnKVxuICB9XG5cbiAgZnVuY3Rpb24gY2xvc2VEcm9wZG93bigkaSkge1xuICAgIGxldCB0ID0gJGkuZGF0YSgnZGQtdGltZW91dCcpXG5cbiAgICBpZiAodCkgY2xlYXJUaW1lb3V0KHQpXG5cbiAgICB0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBsZXQgdDIgPSAkaS5kYXRhKCdkZC10aW1lb3V0JylcblxuICAgICAgaWYgKHQyKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0MilcbiAgICAgICAgdDIgPSBudWxsXG4gICAgICAgICRpLmRhdGEoJ2RkLXRpbWVvdXQnLCB0MilcbiAgICAgIH1cblxuICAgICAgaWYgKCRpLmF0dHIoJ2FyaWEtZXhwYW5kZWQnKSA9PT0gJ3RydWUnKSAkaS5kcm9wZG93bigndG9nZ2xlJylcbiAgICB9LCBUSU1FT1VUKVxuXG4gICAgJGkuZGF0YSgnZGQtdGltZW91dCcsIHQpXG4gIH1cblxuICAkKGZ1bmN0aW9uICgpIHtcbiAgICAkKCdib2R5JylcbiAgICAgIC5vbignbW91c2VlbnRlcicsIGAke1NFTEVDVE9SfSwgJHtTRUxFQ1RPUn0gfiAuZHJvcGRvd24tbWVudWAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgJHRvZ2dsZSA9ICQodGhpcykuaGFzQ2xhc3MoJ2Ryb3Bkb3duLXRvZ2dsZScpID8gJCh0aGlzKSA6ICQodGhpcykucHJldignLmRyb3Bkb3duLXRvZ2dsZScpXG4gICAgICAgIGNvbnN0ICRkcm9wZG93biA9ICQodGhpcykuaGFzQ2xhc3MoJ2Ryb3Bkb3duLW1lbnUnKSA/ICQodGhpcykgOiAkKHRoaXMpLm5leHQoJy5kcm9wZG93bi1tZW51JylcblxuICAgICAgICBpZiAod2luZG93LmdldENvbXB1dGVkU3R5bGUoJGRyb3Bkb3duWzBdLCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKCdwb3NpdGlvbicpID09PSAnc3RhdGljJykgcmV0dXJuXG5cbiAgICAgICAgLy8gU2V0IGhvdmVyZWQgZmxhZ1xuICAgICAgICBpZiAoJCh0aGlzKS5pcyhTRUxFQ1RPUikpIHtcbiAgICAgICAgICAkKHRoaXMpLmRhdGEoJ2hvdmVyZWQnLCB0cnVlKVxuICAgICAgICB9XG5cbiAgICAgICAgb3BlbkRyb3Bkb3duKCQodGhpcykuaGFzQ2xhc3MoJ2Ryb3Bkb3duLXRvZ2dsZScpID8gJCh0aGlzKSA6ICQodGhpcykucHJldignLmRyb3Bkb3duLXRvZ2dsZScpKVxuICAgICAgfSlcbiAgICAgIC5vbignbW91c2VsZWF2ZScsIGAke1NFTEVDVE9SfSwgJHtTRUxFQ1RPUn0gfiAuZHJvcGRvd24tbWVudWAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgJHRvZ2dsZSA9ICQodGhpcykuaGFzQ2xhc3MoJ2Ryb3Bkb3duLXRvZ2dsZScpID8gJCh0aGlzKSA6ICQodGhpcykucHJldignLmRyb3Bkb3duLXRvZ2dsZScpXG4gICAgICAgIGNvbnN0ICRkcm9wZG93biA9ICQodGhpcykuaGFzQ2xhc3MoJ2Ryb3Bkb3duLW1lbnUnKSA/ICQodGhpcykgOiAkKHRoaXMpLm5leHQoJy5kcm9wZG93bi1tZW51JylcblxuICAgICAgICBpZiAod2luZG93LmdldENvbXB1dGVkU3R5bGUoJGRyb3Bkb3duWzBdLCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKCdwb3NpdGlvbicpID09PSAnc3RhdGljJykgcmV0dXJuXG5cbiAgICAgICAgLy8gUmVtb3ZlIGhvdmVyZWQgZmxhZ1xuICAgICAgICBpZiAoJCh0aGlzKS5pcyhTRUxFQ1RPUikpIHtcbiAgICAgICAgICAkKHRoaXMpLmRhdGEoJ2hvdmVyZWQnLCBmYWxzZSlcbiAgICAgICAgfVxuXG4gICAgICAgIGNsb3NlRHJvcGRvd24oJCh0aGlzKS5oYXNDbGFzcygnZHJvcGRvd24tdG9nZ2xlJykgPyAkKHRoaXMpIDogJCh0aGlzKS5wcmV2KCcuZHJvcGRvd24tdG9nZ2xlJykpXG4gICAgICB9KVxuICAgICAgLm9uKCdoaWRlLmJzLmRyb3Bkb3duJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKCQodGhpcykuZmluZChTRUxFQ1RPUikuZGF0YSgnaG92ZXJlZCcpKSBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgIH0pXG4gIH0pXG59KSh3aW5k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\n//# sourceURL=webpack-internal:///./js/dropdown-hover.js\n");

				/***/ })

			/******/ 	});
		/************************************************************************/
		/******/ 	
		/******/ 	// startup
		/******/ 	// Load entry module and return exports
		/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
		/******/ 	var __webpack_exports__ = {};
		/******/ 	__webpack_modules__["./js/dropdown-hover.js"]();
		/******/ 	
		/******/ 	return __webpack_exports__;
		/******/ })()
	;
});
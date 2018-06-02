(function () {
	'use strict';

	function DOM(elements) {
    if (!(this instanceof DOM)) {
      return new DOM(elements);
    }

    this.element = document.querySelectorAll(elements);
  }

  DOM.prototype.on = function on(eventType, callback) {
    Array.prototype.forEach.call(this.element, function(element) {
      element.addEventListener(eventType, callback);
    });
  };

  DOM.prototype.off = function off(eventType, callback) {
    Array.prototype.forEach.call(this.element, function(element) {
      element.removeEventListener(eventType, callback);
    });
  };

  DOM.prototype.get = function get() {
    if (this.element.length === 1) {
      return this.element[0];
    }
    return this.element;
  };

  DOM.prototype.forEach = function forEach() {
    return Array.prototype.forEach.apply(this.element, arguments);
  };

  DOM.prototype.map = function map() {
    return Array.prototype.map.apply(this.element, arguments);
  };

  DOM.prototype.filter = function filter() {
    return Array.prototype.filter.apply(this.element, arguments);
  };

  DOM.prototype.reduce = function reduce() {
    return Array.prototype.reduce.apply(this.element, arguments);
  };

  DOM.prototype.reduceRight = function reduceRight() {
    return Array.prototype.reduceRight.apply(this.element, arguments);
  };

  DOM.prototype.every = function every() {
    return Array.prototype.every.apply(this.element, arguments);
  };

  DOM.prototype.some = function some() {
    return Array.prototype.some.apply(this.element, arguments);
  };

  DOM.prototype.is = function is(arg) {
    return Object.prototype.toString.call(arg);
  };

  DOM.prototype.isArray = function isArray(arg) {
    return DOM.prototype.is(arg) === '[object Array]';
  };

  DOM.prototype.isObject = function isObject(arg) {
    return DOM.prototype.is(arg) === '[object Object]';
  };

  DOM.prototype.isFunction = function isFunction(arg) {
    return DOM.prototype.is(arg) === '[object Function]';
  };

  DOM.prototype.isNumber = function isNumber(arg) {
    return DOM.prototype.is(arg) === '[object Number]';
  };

  DOM.prototype.isString = function isString(arg) {
    return DOM.prototype.is(arg) === '[object String]';
  };

  DOM.prototype.isBoolean = function isBoolean(arg) {
    return DOM.prototype.is(arg) === '[object Boolean]';
  };

  DOM.prototype.isNull = function isNull(arg) {
    return DOM.prototype.is(arg) === '[object Null]' || DOM.prototype.is(arg) === '[object Undefined]';
  };

  window.DOM = DOM;
})();
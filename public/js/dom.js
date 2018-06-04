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
    return DOM.prototype.verifyElements.call(this);
  };

  DOM.prototype.verifyElements = function verifyElements() {
    if (this.element.length === 1) {
      return this.element[0];
    }
    return this.element;
  };

  DOM.prototype.forEach = function forEach() {
    return Array.prototype.forEach.apply(this.get(), arguments);
  };

  DOM.prototype.map = function map() {
    return Array.prototype.map.apply(this.get(), arguments);
  };

  DOM.prototype.filter = function filter() {
    return Array.prototype.filter.apply(this.get(), arguments);
  };

  DOM.prototype.reduce = function reduce() {
    return Array.prototype.reduce.apply(this.get(), arguments);
  };

  DOM.prototype.reduceRight = function reduceRight() {
    return Array.prototype.reduceRight.apply(this.get(), arguments);
  };

  DOM.prototype.every = function every() {
    return Array.prototype.every.apply(this.get(), arguments);
  };

  DOM.prototype.some = function some() {
    return Array.prototype.some.apply(this.get(), arguments);
  };

  DOM.is = function is(arg) {
    return Object.prototype.toString.call(arg);
  };

  DOM.isArray = function isArray(arg) {
    return DOM.is(arg) === '[object Array]';
  };

  DOM.isObject = function isObject(arg) {
    return DOM.is(arg) === '[object Object]';
  };

  DOM.isFunction = function isFunction(arg) {
    return DOM.is(arg) === '[object Function]';
  };

  DOM.isNumber = function isNumber(arg) {
    return DOM.is(arg) === '[object Number]';
  };

  DOM.isString = function isString(arg) {
    return DOM.is(arg) === '[object String]';
  };

  DOM.isBoolean = function isBoolean(arg) {
    return DOM.is(arg) === '[object Boolean]';
  };

  DOM.isNull = function isNull(arg) {
    return DOM.is(arg) === '[object Null]' || DOM.is(arg) === '[object Undefined]';
  };

  window.DOM = DOM;
})();
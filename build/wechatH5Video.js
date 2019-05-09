(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["wechatH5Video"] = factory();
	else
		root["wechatH5Video"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return wechatH5Video; });
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_index_css__WEBPACK_IMPORTED_MODULE_0__);

/**
 * @export
 * @class wechatH5Video
 * @param {string} source 媒体路径
 * @param {string} context 渲染容器
 * @param {boolean} preload 预加载
 * @param {boolean} mask 点击视频暂停
 * @param {string} poster 标签图片
 * @param {boolean} playBtn 是否启用播放按钮
 * @param {boolean} jumpBtn 是否启用跳过按钮
 * @param {boolean} antoClose 视频不放完是否自动移除视频
 * @param {boolean} canvas 是否采用canvas播放视频
 * @param {boolean} fill 是否拉伸撑满容器
 * @param {string} orientation 视频横向还是垂直逻辑 （portrait or landscape）
 * @param {boolean} isRotate 视频是否随手机翻转而翻转
 * @param {functtion} onPlay 播放开始回调
 * @param {functtion} onPause 播放暂停回调
 * @param {functtion} onEnd 播放结束
 */

var wechatH5Video =
/*#__PURE__*/
function () {
  function wechatH5Video(source, options) {
    var defaultOpthon = {
      context: null,
      preload: true,
      mask: true,
      poster: null,
      playBtn: true,
      jumpBtn: false,
      autoClose: false,
      canvas: false,
      fill: true,
      orientation: 'portrait',
      isRotate: true,
      onPlay: function onPlay() {},
      onPause: function onPause() {},
      onEnd: function onEnd() {}
    };

    if (!source) {
      throw new Error('缺少媒体路径参数source');
    }

    if (!options.context) {
      throw new Error('缺少容器参数context');
    }

    this.options = Object.assign(defaultOpthon, options);
    this.source = source;
    this.context = _isString(this.options.context) ? document.getElementById(this.options.context) : this.options.context;
    this.orientation = null;
    this.container = null;
    this.video = null;
    this.mask = null;
    this.poster = null;
    this.playBtn = null;
    this.jumpBtn = null;
    this.canvas = null;
    this.canvasCtx = null;
    this.timer = null;
    this.initContainer();
    this.initWrapper();

    if (this.options.preload) {
      this.init();
    }
  }

  var _proto = wechatH5Video.prototype;

  _proto.init = function init() {
    this.context.appendChild(this.container);
    this.video = this.getVideo();

    if (this.options.canvas) {
      this._videoToCavas();
    }

    if (!this.options.fill) {
      this._handleResize();
    } else {
      this._fillResize();
    }
  };

  _proto.initContainer = function initContainer() {
    // container
    this.container = document.createElement('div');
    this.container.classList.add(_index_css__WEBPACK_IMPORTED_MODULE_0___default.a.container);
  };

  _proto.initWrapper = function initWrapper() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add(_index_css__WEBPACK_IMPORTED_MODULE_0___default.a.wrapper);
    this.wrapper.innerHTML = "\n      <video\n        class=" + _index_css__WEBPACK_IMPORTED_MODULE_0___default.a.video + "\n        style=\"" + (this.options.fill ? 'object-fit: fill;object-position: 50% 50%;' : '') + "\"\n        width=\"100%\"\n        preload=\"true\"\n        x-webkit-airplay=\"allow\",\n        webkit-playsinline=\"true\",\n        playsinline=\"true\",\n        x5-video-player-type=\"h5\",\n        x5-video-player-fullscreen=\"true\",\n        x5-video-orientation=\"" + this.options.orientation + "\"\n        >\n        " + (this.source instanceof Object ? "<source src=\"" + this.source.url + "\" type=\"video/" + this.source.type + "\"></source>" : "<source src=\"" + this.source + "\"></source>") + "\n      </video>\n    ";
    this.container.appendChild(this.wrapper);

    if (this.options.mask) {
      this._initMask();
    }

    if (this.options.poster) {
      this._initPoster();
    }

    if (this.options.playBtn) {
      this._initPlayBtn();
    }

    if (this.options.jumpBtn) {
      this._initeJumpBtn();
    }
  }; // Get time format


  _proto._timeFormat = function _timeFormat(time) {
    if (!isFinite(time) || time < 0) {
      time = 0;
    } // Get hours


    var _time = [];

    if (Math.floor(time / 3600) % 24) {
      _time.push(Math.floor(time / 3600) % 24);
    } // Get minutes


    _time.push(String(Math.floor(time / 60) % 60).length === 1 ? '0' + String(Math.floor(time / 60) % 60) : String(Math.floor(time / 60) % 60)); // Get seconds


    _time.push(String(Math.floor(time % 60)).length === 1 ? '0' + Math.floor(time % 60) : Math.floor(time % 60));

    _time = _time.join(':');
    return _time;
  }; // Get style


  _proto._css = function _css(el, property) {
    return parseInt(getComputedStyle(el, null).getPropertyValue(property));
  };

  _proto._initMask = function _initMask() {
    this.mask = document.createElement('div');
    this.mask.classList.add(_index_css__WEBPACK_IMPORTED_MODULE_0___default.a.mask);
    this.container.appendChild(this.mask);

    this._initStopBtn(); // 初始化暂停按钮


    this._initControls(); // 初始化控制播放器

  };

  _proto._initPoster = function _initPoster() {
    this.poster = document.createElement('div');
    this.poster.classList.add(_index_css__WEBPACK_IMPORTED_MODULE_0___default.a.poster);
    this.poster.style.backgroundImage = "url('" + this.options.poster + "')";
    this.container.appendChild(this.poster);
  };

  _proto._initPlayBtn = function _initPlayBtn() {
    this.playBtn = document.createElement('div');
    this.playBtn.classList.add(_index_css__WEBPACK_IMPORTED_MODULE_0___default.a.playBtn);
    this.playBtn.innerHTML = "\n      <svg viewBox=\"0 0 64 64\">\n        <path d=\"M26,45.5L44,32L26,18.6v27V45.5L26,45.5z M32,2C15.4,2,2,15.5,2,32c0,16.6,13.4,30,30,30c16.6,0,30-13.4,30-30 C62,15.4,48.5,2,32,2L32,2z M32,56c-9.7,0-18.5-5.9-22.2-14.8C6.1,32.2,8.1,21.9,15,15c6.9-6.9,17.2-8.9,26.2-5.2 C50.1,13.5,56,22.3,56,32C56,45.3,45.2,56,32,56L32,56z\" />\n      </svg>\n    ";
    this.container.appendChild(this.playBtn);
  };

  _proto._initStopBtn = function _initStopBtn() {
    this.stopBtn = document.createElement('div');
    this.stopBtn.classList.add(_index_css__WEBPACK_IMPORTED_MODULE_0___default.a.stopBtn);
    this.stopBtn.innerHTML = "\n      <svg viewBox=\"0 0 64 64\">\n        <path d=\"M26,45.5L44,32L26,18.6v27V45.5L26,45.5z M32,2C15.4,2,2,15.5,2,32c0,16.6,13.4,30,30,30c16.6,0,30-13.4,30-30 C62,15.4,48.5,2,32,2L32,2z M32,56c-9.7,0-18.5-5.9-22.2-14.8C6.1,32.2,8.1,21.9,15,15c6.9-6.9,17.2-8.9,26.2-5.2 C50.1,13.5,56,22.3,56,32C56,45.3,45.2,56,32,56L32,56z\" />\n      </svg>\n    ";
    this.mask.appendChild(this.stopBtn);
  };

  _proto._initeJumpBtn = function _initeJumpBtn() {
    this.jumpBtn = document.createElement('div');
    this.jumpBtn.classList.add(_index_css__WEBPACK_IMPORTED_MODULE_0___default.a.jumpBtn);
    this.jumpBtn.innerHTML = "\u8DF3\u8FC7\u89C6\u9891>>";
    this.container.appendChild(this.jumpBtn);
  }; // 页面播放总时长


  _proto._initSpreadTotalTime = function _initSpreadTotalTime(spreadTotalTime) {
    this.spreadTotalTime = document.createElement('span');
    this.spreadTotalTime.classList.add(_index_css__WEBPACK_IMPORTED_MODULE_0___default.a.spreadTotalTime);
    this.spreadTotalTime.innerHTML = spreadTotalTime;
    this.spreadTotalTime.style.display = 'block';
    this.container.appendChild(this.spreadTotalTime);
  }; // 初始化自定义播放控制器


  _proto._initControls = function _initControls() {
    this.controls = document.createElement('div');
    this.controls.classList.add(_index_css__WEBPACK_IMPORTED_MODULE_0___default.a.controls);
    this.mask.appendChild(this.controls);
  }; // 起始播放时间


  _proto._initSpreadCurrentTime = function _initSpreadCurrentTime() {
    console.warn('currentTime:', this._timeFormat(this.video.currentTime));
    this.currentTime = document.createElement('span');
    this.currentTime.classList.add(_index_css__WEBPACK_IMPORTED_MODULE_0___default.a.currentTime);
    this.currentTime.innerHTML = this._timeFormat(this.video.currentTime);
    this.controls.append(this.currentTime);
  }; // 最新当前播放时间


  _proto._updateSpreadCurrentTime = function _updateSpreadCurrentTime() {
    this.currentTime.innerHTML = this._timeFormat(this.video.currentTime);
  }; // 播放总时长


  _proto._initTotalTime = function _initTotalTime() {
    console.warn('_initSpreadTotalTime:', this._timeFormat(this.video.duration));
    this.totalTime = document.createElement('span');
    this.totalTime.classList.add(_index_css__WEBPACK_IMPORTED_MODULE_0___default.a.totalTime);
    this.totalTime.innerHTML = this._timeFormat(this.video.duration);
    this.controls.append(this.totalTime);
  }; // 初始化播放进度条


  _proto._initTimeLine = function _initTimeLine() {
    console.warn('__initTimeLine');
    this.timeLineSlide = document.createElement('div');
    this.timeLineSlide.classList.add(_index_css__WEBPACK_IMPORTED_MODULE_0___default.a.timeLineSlide);
    this.timeLineBuffer = document.createElement('div');
    this.timeLineLoaded = document.createElement('div');
    this.timeLineLoaded.classList.add(_index_css__WEBPACK_IMPORTED_MODULE_0___default.a.timeLineLoaded);
    this.timeLineLoaded.style.width = '0px';
    this.timeLineCursor = document.createElement('div');
    this.timeLineCursor.classList.add(_index_css__WEBPACK_IMPORTED_MODULE_0___default.a.timeLineCursor);
    this.timeLineCursor.style.left = '0px';
    this.timeLineSlide.append(this.timeLineBuffer);
    this.timeLineSlide.append(this.timeLineLoaded);
    this.timeLineSlide.append(this.timeLineCursor);
    this.controls.append(this.timeLineSlide);
  }; // 更新播放进度条


  _proto._updateTimeLine = function _updateTimeLine() {
    var percent = null;

    var _W = this._css(this.timeLineSlide, 'width'); // Support buffered


    if (this.video.buffered && this.video.buffered.length > 0 && this.video.buffered.end && this.video.duration) {
      percent = this.video.buffered.end(this.video.buffered.length - 1) / this.video.duration;
    } // Support bufferedBytes
    else if (this.video.bytesTotal !== undefined && this.video.bytesTotal > 0 && this.video.bufferedBytes !== undefined) {
        percent = this.video.bufferedBytes / this.video.bytesTotal;
      } // Support progressEvent.lengthComputable
      else if (this.video && this.video.lengthComputable && this.video.total !== 0) {
          percent = this.video.loaded / this.video.total;
        } // Update the timeline


    if (percent !== null) {
      percent = Math.min(1, Math.max(0, percent));
    }

    if (this.video.currentTime !== undefined && this.video.duration) {
      var _w = Math.round(_W * this.video.currentTime / this.video.duration);

      this.timeLineLoaded.style.width = _w + 'px';
      this.timeLineCursor.style.left = _w + 'px';
    }
  };

  _proto.getVideo = function getVideo() {
    return this.wrapper.querySelector("." + _index_css__WEBPACK_IMPORTED_MODULE_0___default.a.video);
  };

  _proto.load = function load() {
    if (!this.context.contains(this.container)) {
      this.init();
    }

    this._addEvent();

    this.video.load();
    return this;
  };

  _proto.play = function play() {
    this.video.play();
    this.options.onPlay();

    this._hiddenControls();

    var self = this;
    self.video.isPlayed = false;
    self.video.addEventListener('timeupdate', function () {
      // 当视频currentTime大于0.1时候表示已有视频画面
      self._updateSpreadCurrentTime(); // 更新播放时间
      // 更新播放进度条


      self._updateTimeLine();

      if (!self.video.isPlayed && this.currentTime > 0.1) {
        self.video.isPlayed = true;

        if (self.options.canvas) {
          self._drawCavas();
        }

        self._hiddenPoster();

        self._hiddenPlayBtn();

        self._hiddenSpreadTotalTime();

        self._showJumpBtn();
      }
    });
  };

  _proto.pause = function pause() {
    this.video.pause();

    this._showPlayBtn();

    this._hideJumpBtn();

    this._hiddenControls();

    this.options.onPause();

    if (this.options.canvas) {
      cancelAnimationFrame(this.timer);
    }
  };

  _proto._hiddenPoster = function _hiddenPoster() {
    if (this.poster) {
      this.poster.style.display = 'none';
    }
  };

  _proto._showPoster = function _showPoster() {
    if (this.poster) {
      this.poster.style.display = 'block';
    }
  }; // 隐藏初始化播放总时长


  _proto._hiddenSpreadTotalTime = function _hiddenSpreadTotalTime() {
    if (this.spreadTotalTime) {
      this.spreadTotalTime.style.display = 'none';
    }
  };

  _proto._hiddenPlayBtn = function _hiddenPlayBtn() {
    if (this.playBtn) {
      this.playBtn.style.display = 'none';
    }
  };

  _proto._showPlayBtn = function _showPlayBtn() {
    if (this.playBtn) {
      this.playBtn.style.display = 'block';
    }
  };

  _proto._showStopBtn = function _showStopBtn() {
    if (this.stopBtn) {
      this.stopBtn.style.display = 'block';
    }
  };

  _proto._hiddenStopBtn = function _hiddenStopBtn() {
    if (this.stopBtn) {
      this.stopBtn.style.display = 'none';
    }
  };

  _proto._showJumpBtn = function _showJumpBtn() {
    if (this.jumpBtn) {
      this.jumpBtn.style.display = 'block';
    }
  };

  _proto._hideJumpBtn = function _hideJumpBtn() {
    if (this.jumpBtn) {
      this.jumpBtn.style.display = 'none';
    }
  };

  _proto._remove = function _remove() {
    this.context.removeChild(this.container);
  };

  _proto._reload = function _reload() {
    this.video.currentTime = 0;
    this.pause();

    this._showPoster();
  }; // 展示控制器


  _proto._showControls = function _showControls() {
    var _this = this;

    this.controls.style.bottom = '0px';
    this.controlsTimer = setTimeout(function () {
      _this.controls.style.bottom = '-45px';

      _this._hiddenStopBtn(); // 隐藏暂停按钮

    }, 3000);
  }; // 隐藏控制器


  _proto._hiddenControls = function _hiddenControls() {
    this.controlsTimer && clearTimeout(this.controlsTimer);
    console.warn(33);
    this.controls.style.bottom = '-45px';

    this._hiddenStopBtn(); // 隐藏暂停按钮

  };

  _proto._addEvent = function _addEvent() {
    var _this2 = this;

    if (this.options.playBtn) {
      this.playBtn.addEventListener('click', function () {
        _this2.play();
      }, false);
    }

    if (this.stopBtn) {
      this.stopBtn.addEventListener('click', function () {
        _this2.pause();
      }, false);
    }

    if (this.options.mask) {
      this.mask.addEventListener('click', function () {
        //this.pause(); // 切换点击出现播放控制器
        _this2._showStopBtn();

        !_this2.video.paused && _this2._showControls(); // 显示播放控制器 3s后自动消失
      }, false);
    }

    if (this.options.jumpBtn) {
      this.jumpBtn.addEventListener('click', function () {
        _this2.options.onEnd();

        if (_this2.options.autoClose) {
          _this2._remove();
        } else {
          _this2._reload();
        }

        if (_this2.options.canvas) {
          cancelAnimationFrame(_this2.timer);
        }
      }, false);
    }

    this.video.addEventListener('ended', function () {
      console.warn('ended');

      _this2.options.onEnd();

      _this2._showPlayBtn();

      _this2.timeLineLoaded.style.width = '0px';
      _this2.timeLineCursor.style.left = '0px';

      if (_this2.options.autoClose) {
        _this2._remove();
      } else {
        _this2._reload();
      }

      if (_this2.options.canvas) {
        cancelAnimationFrame(_this2.timer);
      }
    }, false);

    window.onresize = function () {
      setTimeout(function () {
        _addStyles(_this2.wrapper, {
          width: window.innerWidth + 'px',
          height: window.innerHeight + 'px'
        });

        if (_this2.options.canvas) {
          _addStyles(_this2.canvas, {
            width: window.innerWidth + 'px',
            height: window.innerHeight + 'px'
          });
        }
      }, 200);
    };

    this.video.addEventListener('loadstart', function () {
      console.warn('loadstart');
    });
    this.video.addEventListener('durationchange', function () {
      console.warn('durationchange');
    });
    this.video.addEventListener('loadedmetadata', function () {
      // 初始化页面视频播放总时长
      _this2._initSpreadTotalTime(_this2._timeFormat(_this2.video.duration));
    });
    this.video.addEventListener('loadeddata', function () {
      console.warn('loadeddata'); // 起始播放时间

      _this2._initSpreadCurrentTime(); // 播放时间线


      _this2._initTimeLine(); // 播放总时长


      _this2._initTotalTime();
    });
    this.video.addEventListener('canplay', function () {
      console.warn('canplay');
    });
    this.video.addEventListener('canplaythrough', function () {
      console.warn('canplaythrough');
    });
    this.video.addEventListener('progress', function () {
      console.warn('progress');
    });
  };

  _proto._containerRect = function _containerRect() {
    return this.container.getBoundingClientRect();
  };

  _proto._handleResize = function _handleResize() {
    var sWidth = 9;
    var sHeight = 16;
    var width = window.innerWidth;
    var height = window.innerHeight;
    var marginTop = height - width * sHeight / sWidth;
    marginTop = Math.round(marginTop);
    this.video.style.marginTop = marginTop / 2 + 'px';
  };

  _proto._fillResize = function _fillResize() {
    var _this3 = this;

    var _changeStyle = function _changeStyle() {
      var containerRectWidth = _this3._containerRect().width;

      var containerRectHeight = _this3._containerRect().height;

      if (_judgePhoneOrientation() === _this3.options.orientation) {
        _addStyles(_this3.wrapper, {
          width: containerRectWidth + 'px',
          height: containerRectHeight + 'px',
          transform: ''
        });

        if (_this3.options.canvas) {
          _addStyles(_this3.canvas, {
            width: containerRectWidth + 'px',
            height: containerRectHeight + 'px',
            transform: ''
          });
        }
      } else {
        _addStyles(_this3.wrapper, {
          width: containerRectHeight + 'px',
          height: containerRectWidth + 'px',
          transform: 'rotate(-90deg)'
        });

        if (_this3.options.canvas) {
          _addStyles(_this3.canvas, {
            width: containerRectHeight + 'px',
            height: containerRectWidth + 'px'
          });
        }
      }
    };

    var _changeOrientation = function _changeOrientation() {
      window.removeEventListener(_orientationchangeEvt, _changeOrientation);
      setTimeout(function () {
        _changeStyle();

        window.addEventListener(_orientationchangeEvt, _changeOrientation, false);
      }, 400);
    };

    if (this.options.isRotate) {
      _changeStyle();

      window.addEventListener(_orientationchangeEvt, _changeOrientation, false);
    } else {
      _addStyles(this.wrapper, {
        width: this._containerRect().width + 'px',
        height: this._containerRect().height + 'px'
      });
    }
  };

  _proto._videoToCavas = function _videoToCavas() {
    if (!this.video) return;
    this.canvas = document.createElement('canvas');
    this.canvas.width = this._containerRect().width;
    this.canvas.height = this._containerRect().height;
    this.canvasCtx = this.canvas.getContext('2d');
    this.video.parentNode.replaceChild(this.canvas, this.video);
  };

  _proto._drawCavas = function _drawCavas() {
    var _this4 = this;

    this.canvasCtx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
    this.timer = requestAnimationFrame(function () {
      _this4._drawCavas();
    });
  };

  return wechatH5Video;
}();



var _addStyles = function _addStyles(element, styles) {
  for (var name in styles) {
    element.style[name] = styles[name];
  }
};

var _judgePhoneOrientation = function _judgePhoneOrientation() {
  var clientWidth = document.documentElement.clientWidth;
  var clientHeight = document.documentElement.clientHeight;
  var result = '';

  if (clientWidth > clientHeight) {
    result = 'landscape';
  } else {
    result = 'portrait';
  }

  return result;
};

var _isString = function _isString(str) {
  return typeof str === 'string' && str.constructor === String;
};

var _orientationchangeEvt = 'onorientationchange' in window ? 'orientationchange' : 'resize';

var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
var cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.msCancelAnimationFrame;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(2);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(4)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, ".wechat_h5_video__container {\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  width: 100%;\r\n  height: 100%;\r\n  z-index: 999;\r\n  /* display: none; */\r\n  background-color: black;\r\n  overflow: hidden;\r\n}\r\n\r\n.wechat_h5_video__wrapper {\r\n  position: absolute;\r\n  left: -100%;\r\n  top: -100%;\r\n  right: -100%;\r\n  bottom: -100%;\r\n  margin: auto;\r\n  z-index: 1;\r\n  overflow: hidden;\r\n  background-color: black;\r\n  transform-origin: 50% 50%;\r\n}\r\n\r\n.wechat_h5_video__video {\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  width: 100%;\r\n  height: 100%;\r\n  z-index: -1;\r\n  /* object-fit: fill;\r\n  object-position: 50% 50%; */\r\n}\r\n\r\n.wechat_h5_video__mask {\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  width: 100%;\r\n  height: 100%;\r\n  z-index: 10;\r\n}\r\n\r\n.wechat_h5_video__poster {\r\n  width: 100%;\r\n  height: 100%;\r\n  position: absolute;\r\n  background: transparent no-repeat;\r\n  background-size: cover;\r\n  z-index: 99;\r\n}\r\n\r\n.wechat_h5_video__playBtn {\r\n  position: absolute;\r\n  left: -100%;\r\n  top: -100%;\r\n  right: -100%;\r\n  bottom: -100%;\r\n  z-index: 1000;\r\n  margin: auto;\r\n  max-width: 60px;\r\n  max-height: 60px;\r\n  opacity: .4;\r\n}\r\n\r\n.wechat_h5_video__stopBtn {\r\n  display: none;\r\n  position: absolute;\r\n  left: -100%;\r\n  top: -100%;\r\n  right: -100%;\r\n  bottom: -100%;\r\n  z-index: 1000;\r\n  margin: auto;\r\n  max-width: 60px;\r\n  max-height: 60px;\r\n  opacity: .4;\r\n}\r\n\r\n.wechat_h5_video__playBtn svg{\r\n  max-width: 60px;\r\n  max-height: 60px;\r\n  fill: #fff;\r\n}\r\n\r\n.wechat_h5_video__jumpBtn {\r\n  display: none;\r\n  color: #fff;\r\n  position: absolute;\r\n  top: 20px;\r\n  right: 20px;\r\n  z-index: 1000;\r\n}\r\n\r\n.wechat_h5_video__spreadTotalTime {\r\n  display: none;\r\n  color: #333333;\r\n  background: rgba(255,255,255,0.6);\r\n  position: absolute;\r\n  right: 20px;\r\n  bottom: 20px;\r\n  z-index: 100;\r\n  outline: 0;\r\n  padding: 6px 12px;\r\n  border-radius: 12px;\r\n}\r\n\r\n.wechat_h5_video__controls {\r\n  background: rgba(0, 0, 0, 0.8);\r\n  height: 45px;\r\n  position: absolute;\r\n  left: 0;\r\n  right: 0;\r\n  width: 100%;\r\n  bottom: -45px;\r\n  /* bottom: 0; */\r\n  z-index: 122;\r\n  transition: 0.3s linear;\r\n  padding: 0px 16px;\r\n  box-sizing: border-box;\r\n  display: flex;\r\n  align-items: center;\r\n\r\n}\r\n\r\n.wechat_h5_video__currentTime {\r\n  font-size: 14px;\r\n  color: #ffffff;\r\n  padding-right: 10px;\r\n}\r\n\r\n.wechat_h5_video__totalTime {\r\n  font-size: 14px;\r\n  color: #ffffff;\r\n  padding-left: 16px;\r\n}\r\n\r\n.wechat_h5_video__timeLineSlide {\r\n  position: relative;\r\n  flex: 1 1 auto;\r\n  border-bottom: 1px solid #ffffff;\r\n}\r\n\r\n.wechat_h5_video__timeLineCursor {\r\n  position: absolute;\r\n  left: 0;\r\n  top: -6px;\r\n  width: 12px;\r\n  height: 12px;\r\n  border-radius: 50%;\r\n  overflow: hidden;\r\n  background: #ffffff;\r\n  z-index: 116;\r\n}\r\n\r\n.wechat_h5_video__timeLineLoaded {\r\n  width: 0;\r\n  height: 2px;\r\n  background: red;\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  z-index: 114;\r\n}", ""]);

// exports
exports.locals = {
	"container": "wechat_h5_video__container",
	"wrapper": "wechat_h5_video__wrapper",
	"video": "wechat_h5_video__video",
	"mask": "wechat_h5_video__mask",
	"poster": "wechat_h5_video__poster",
	"playBtn": "wechat_h5_video__playBtn",
	"stopBtn": "wechat_h5_video__stopBtn",
	"jumpBtn": "wechat_h5_video__jumpBtn",
	"spreadTotalTime": "wechat_h5_video__spreadTotalTime",
	"controls": "wechat_h5_video__controls",
	"currentTime": "wechat_h5_video__currentTime",
	"totalTime": "wechat_h5_video__totalTime",
	"timeLineSlide": "wechat_h5_video__timeLineSlide",
	"timeLineCursor": "wechat_h5_video__timeLineCursor",
	"timeLineLoaded": "wechat_h5_video__timeLineLoaded"
};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(5);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 5 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ])["default"];
});
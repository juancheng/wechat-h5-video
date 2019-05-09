
import style from './index.css';

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
export default class wechatH5Video {
  constructor(source, options) {
    let defaultOpthon = {
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
      onPlay() { },
      onPause() { },
      onEnd() { }
    }

    if (!source) {
      throw new Error('缺少媒体路径参数source');
    }
    if (!options.context) {
      throw new Error('缺少容器参数context')
    }

    this.options = Object.assign(defaultOpthon, options)
    this.source = source
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
  };
  
  initContainer() {
    // container
    this.container = document.createElement('div');
    this.container.classList.add(style.container);
  };

  initWrapper() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add(style.wrapper);

    this.wrapper.innerHTML = `
      <video
        class=${style.video}
        style="${this.options.fill ? 'object-fit: fill;object-position: 50% 50%;' : ''}"
        width="100%"
        preload="true"
        x-webkit-airplay="allow",
        webkit-playsinline="true",
        playsinline="true",
        x5-video-player-type="h5",
        x5-video-player-fullscreen="true",
        x5-video-orientation="${this.options.orientation}"
        >
        ${this.source instanceof Object ?
        `<source src="${this.source.url}" type="video/${this.source.type}"></source>` :
        `<source src="${this.source}"></source>`}
      </video>
    `
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

  }

  init() {
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
  }

  // Get time format
  _timeFormat(time) {
    if (!isFinite(time) || time < 0) {
			time = 0;
		}
		// Get hours
		var _time = [];
		if (Math.floor(time / 3600) % 24) {
			_time.push(Math.floor(time / 3600) % 24)
		}
    // Get minutes
		_time.push(String(Math.floor(time / 60) % 60).length === 1 ? '0' + String(Math.floor(time / 60) % 60) : String(Math.floor(time / 60) % 60));
		// Get seconds
		_time.push(String(Math.floor(time % 60)).length === 1 ? '0' + Math.floor(time % 60): Math.floor(time % 60));
    _time = _time.join(':');
    
		return _time
  }

  // Get style
	_css(el, property) {
    if (getComputedStyle) {
      return parseInt(getComputedStyle(el, null).getPropertyValue(property))
    } else {
      return parseInt(currentStyle(el, null).getPropertyValue(property))
    }
	}

  _initMask() {
    this.mask = document.createElement('div');
    this.mask.classList.add(style.mask);
    this.container.appendChild(this.mask);
    this._initPauseBtn(); // 初始化暂停按钮
    this._initControls(); // 初始化控制播放器
  }

  _initPoster() {
    this.poster = document.createElement('div');
    this.poster.classList.add(style.poster);
    this.poster.style.backgroundImage = `url('${this.options.poster}')`
    this.container.appendChild(this.poster);
  }

  _initPlayBtn() {
    this.playBtn = document.createElement('div');
    this.playBtn.classList.add(style.playBtn);
    this.playBtn.innerHTML = `
      <svg viewBox="0 0 64 64">
        <path d="M26,45.5L44,32L26,18.6v27V45.5L26,45.5z M32,2C15.4,2,2,15.5,2,32c0,16.6,13.4,30,30,30c16.6,0,30-13.4,30-30 C62,15.4,48.5,2,32,2L32,2z M32,56c-9.7,0-18.5-5.9-22.2-14.8C6.1,32.2,8.1,21.9,15,15c6.9-6.9,17.2-8.9,26.2-5.2 C50.1,13.5,56,22.3,56,32C56,45.3,45.2,56,32,56L32,56z" />
      </svg>
    `
    this.container.appendChild(this.playBtn);
  }

  // 初始化暂停按钮
  _initPauseBtn() {
    this.pauseBtn = document.createElement('div');
    this.pauseBtn.classList.add(style.pauseBtn);
    this.pauseBtn.innerHTML = `
      <svg viewBox="0 0 64 64">
        <path d="M26,45.5L44,32L26,18.6v27V45.5L26,45.5z M32,2C15.4,2,2,15.5,2,32c0,16.6,13.4,30,30,30c16.6,0,30-13.4,30-30 C62,15.4,48.5,2,32,2L32,2z M32,56c-9.7,0-18.5-5.9-22.2-14.8C6.1,32.2,8.1,21.9,15,15c6.9-6.9,17.2-8.9,26.2-5.2 C50.1,13.5,56,22.3,56,32C56,45.3,45.2,56,32,56L32,56z" />
      </svg>
    `
    this.mask.appendChild(this.pauseBtn);
  }

  _initeJumpBtn() {
    this.jumpBtn = document.createElement('div');
    this.jumpBtn.classList.add(style.jumpBtn);
    this.jumpBtn.innerHTML = `跳过视频>>`;
    this.container.appendChild(this.jumpBtn);
  }

  // 页面播放总时长
  _initSpreadTotalTime(spreadTotalTime) {
    this.spreadTotalTime = document.createElement('span');
    this.spreadTotalTime.classList.add(style.spreadTotalTime);
    this.spreadTotalTime.innerHTML = spreadTotalTime;
    this.spreadTotalTime.style.display = 'block';
    this.container.appendChild(this.spreadTotalTime);
  }

  // 初始化自定义播放控制器
  _initControls() {
    this.controls = document.createElement('div');
    this.controls.classList.add(style.controls);
    this.mask.appendChild(this.controls);
  }

  // 起始播放时间
  _initSpreadCurrentTime() {
    this.currentTime = document.createElement('span');
    this.currentTime.classList.add(style.currentTime);
    this.currentTime.innerHTML = this._timeFormat(this.video.currentTime);
    this.controls.appendChild(this.currentTime);
  }
  // 最新当前播放时间
  _updateSpreadCurrentTime() {
    this.currentTime.innerHTML = this._timeFormat(this.video.currentTime);
  }

  // 播放总时长
  _initTotalTime() {
    this.totalTime = document.createElement('span');
    this.totalTime.classList.add(style.totalTime);
    this.totalTime.innerHTML = this._timeFormat(this.video.duration);
    this.controls.appendChild(this.totalTime);
  }

  // 初始化播放进度条
  _initTimeLine() {
    this.timeLineSlide = document.createElement('div');
    this.timeLineSlide.classList.add(style.timeLineSlide);
    this.timeLineBuffer = document.createElement('div');
    this.timeLineLoaded = document.createElement('div');
    this.timeLineLoaded.classList.add(style.timeLineLoaded);
    this.timeLineLoaded.style.width = '0px'
    this.timeLineCursor = document.createElement('div');
    this.timeLineCursor.classList.add(style.timeLineCursor);
    this.timeLineCursor.style.left = '0px'
    this.timeLineSlide.appendChild(this.timeLineBuffer);
    this.timeLineSlide.appendChild(this.timeLineLoaded);
    this.timeLineSlide.appendChild(this.timeLineCursor);
    this.controls.appendChild(this.timeLineSlide);
  }

  // 更新播放进度条
  _updateTimeLine() {
      let percent = null;
      var _W = this._css(this.timeLineSlide, 'width');
      // Support buffered
			if (this.video.buffered && this.video.buffered.length > 0 && this.video.buffered.end && this.video.duration) {
        percent = this.video.buffered.end(this.video.buffered.length - 1) / this.video.duration
			}
			// Support bufferedBytes
			else if (this.video.bytesTotal !== undefined && this.video.bytesTotal > 0 && this.video.bufferedBytes !== undefined) {
        percent = this.video.bufferedBytes / this.video.bytesTotal
      }
			// Support progressEvent.lengthComputable
			else if (this.video && this.video.lengthComputable && this.video.total !== 0) {
        percent = this.video.loaded / this.video.total
      }
			// Update the timeline
			if (percent !== null) { // 数据缓冲线
        percent = Math.min(1, Math.max(0, percent));
      }
      
      if (this.video.currentTime !== undefined && this.video.duration) { // 播放时长与播放移动游标
        const _w = Math.round(_W * this.video.currentTime / this.video.duration);
        this.timeLineLoaded.style.width = _w + 'px';
        this.timeLineCursor.style.left = _w + 'px';
      }
  }

  // 视频播放结束 播放时长与播放移动游标重置为0
  _resetTimeLine() {
    this.timeLineLoaded.style.width = '0px';
    this.timeLineCursor.style.left = '0px';
  }

  getVideo() {
    return this.wrapper.querySelector(`.${style.video}`)
  }

  load() {
    if (!this.context.contains(this.container)) {
      this.init();
    }
    this._addEvent();
    this.video.load();
    return this;
  }

  play() {
    this.video.play();
    this.options.onPlay();
    this._hiddenControls();
    let self = this;
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
    })
  };

  pause() {
    this.video.pause();
    console.warn('pause()')
    this._showPlayBtn();
    this._hideJumpBtn();
    this._hiddenControls();
    this.options.onPause();
    if (this.options.canvas) {
      cancelAnimationFrame(this.timer);
    }
  }

  _hiddenPoster() {
    if (this.poster) {
      this.poster.style.display = 'none';
    }
  }

  _showPoster() {
    if (this.poster) {
      this.poster.style.display = 'block';
    }
  }

  // 隐藏初始化播放总时长
  _hiddenSpreadTotalTime() {
    if (this.spreadTotalTime) {
      this.spreadTotalTime.style.display = 'none';
    }
  }

  _hiddenPlayBtn() {
    if (this.playBtn) {
      this.playBtn.style.display = 'none';
    }
  }

  _showPlayBtn() {
    console.warn('_showPlayBtn')
    if (this.playBtn) {
      this.playBtn.style.display = 'block';
    }
  }

  _showPauseBtn() {
    if(this.pauseBtn) {
      this.pauseBtn.style.display = 'block';
    }
  }

  _hiddenPauseBtn() {
    if(this.pauseBtn) {
      this.pauseBtn.style.display = 'none';
    }
  }

  _showJumpBtn() {
    if (this.jumpBtn) {
      this.jumpBtn.style.display = 'block';
    }
  }

  _hideJumpBtn() {
    if (this.jumpBtn) {
      this.jumpBtn.style.display = 'none';
    }
  }

  _remove() {
    this.context.removeChild(this.container);
  }

  _reload() {
    this.video.currentTime = 0;
    this.pause();
    this._showPoster();
  }

  // 展示控制器
  _showControls() {
    this.controls.style.bottom = '0px';
    this._showPauseBtn();
    // 展示暂停按钮
    this.controlsTimer && clearTimeout(this.controlsTimer);
    this.controlsTimer = setTimeout(() => { // 倒计时关闭控制器
      this.controls.style.bottom = '-45px';
      this._hiddenPauseBtn(); // 隐藏暂停按钮
    }, 3000)
  }

  // 隐藏控制器 和 暂停按钮
  _hiddenControls() {
      this.controlsTimer && clearTimeout(this.controlsTimer); // 清空控制器自动隐藏倒计时
      this.controls.style.bottom = '-45px';
      this._hiddenPauseBtn(); // 隐藏暂停按钮
  }

  _addEvent() {
    const that = this;
    if (this.options.playBtn) {
      this.playBtn.addEventListener('click', () => {
        this.play();
      }, false);
    }
    if(this.pauseBtn) {
      this.pauseBtn.addEventListener('click', () => {
        this.pause();
      }, false);
    }
  
    if (this.options.mask) {
      this.mask.addEventListener('click', () => {
        !this.video.paused && this._showControls();// 显示播放控制器 和 暂停 按钮 3s后自动消失
      }, false)
    }

    if (this.options.jumpBtn) {
      this.jumpBtn.addEventListener('click', () => {
        this.options.onEnd();
        if (this.options.autoClose) {
          this._remove();
        } else {
          this._reload();
        }
        if (this.options.canvas) {
          cancelAnimationFrame(this.timer);
        }
      }, false)
    }

    this.video.addEventListener('ended', () => {
      this.options.onEnd();
      console.warn('end')
      this._showPlayBtn();
      this._resetTimeLine();
      
      if (this.options.autoClose) {
        this._remove();
      } else {
        this._reload();
      }
      if (this.options.canvas) {
        cancelAnimationFrame(this.timer);
      }
    }, false)

    window.onresize = () => {
      setTimeout(() => {
        _addStyles(this.wrapper, {
          width: window.innerWidth + 'px',
          height: window.innerHeight + 'px',
        });
        if (this.options.canvas) {
          _addStyles(this.canvas, {
            width: window.innerWidth + 'px',
            height: window.innerHeight + 'px',
          });
        }
      }, 200);
    }

    this.video.addEventListener('loadstart', () => {
        console.warn('loadstart')
    })

    this.video.addEventListener('durationchange', () => {
        console.warn('durationchange')
    })

    this.video.addEventListener('loadedmetadata', () => {
      // 初始化页面视频播放总时长
      this._initSpreadTotalTime(this._timeFormat(this.video.duration))
    })
    this.video.addEventListener('loadeddata', () => {
      console.warn('loadeddata')
      // 起始播放时间
      this._initSpreadCurrentTime();
      // 播放时间线
      this._initTimeLine();
      // 播放总时长
      this._initTotalTime();
    })

    this.video.addEventListener('canplay', () => {
      console.warn('canplay')
    })

    this.video.addEventListener('canplaythrough', () => {
      console.warn('canplaythrough')
    })

    this.video.addEventListener('progress', () => {
      console.warn('progress')
    })

    // this.video.addEventListener("fullscreenchange ", function(e) {
    //   console.warn('退出全屏暂停视频1') 未生效
       
    // }, false);

    // this.video.addEventListener("webkitfullscreenchange", function(e) {
    //   //TODO 未侦听到该事件  未生效
    //   console.warn('退出全屏暂停视频')
    // }, false);
    
    this.video.addEventListener('pause', function(e) {
      // handle ios browser no support inline spread question; or spread will auto fullscreen question;
      // at auto fullscreen, click pause button or exit fullscreen will show play button.
      that.pause();
    });
  }


  _containerRect() {
    return this.container.getBoundingClientRect();
  }

  _handleResize() {
    let sWidth = 9
    let sHeight = 16
    let width = window.innerWidth
    let height = window.innerHeight

    let marginTop = height - (width * sHeight) / sWidth
    marginTop = Math.round(marginTop)
    this.video.style.marginTop = marginTop / 2 + 'px'
  }
  _fillResize() {

    let _changeStyle = () => {
      let containerRectWidth = this._containerRect().width;
      let containerRectHeight = this._containerRect().height;
      if (_judgePhoneOrientation() === this.options.orientation) {
        _addStyles(this.wrapper, {
          width: containerRectWidth + 'px',
          height: containerRectHeight + 'px',
          transform: '',
        })
        if (this.options.canvas) {
          _addStyles(this.canvas, {
            width: containerRectWidth + 'px',
            height: containerRectHeight + 'px',
            transform: '',
          })
        }
      } else {
        _addStyles(this.wrapper, {
          width: containerRectHeight + 'px',
          height: containerRectWidth + 'px',
          transform: 'rotate(-90deg)',
        });
        if (this.options.canvas) {
          _addStyles(this.canvas, {
            width: containerRectHeight + 'px',
            height: containerRectWidth + 'px',
          })
        }

      }
    }
    let _changeOrientation = () => {
      window.removeEventListener(_orientationchangeEvt, _changeOrientation);

      setTimeout(() => {
        _changeStyle();
        window.addEventListener(_orientationchangeEvt, _changeOrientation, false);
      }, 400);
    }

    if (this.options.isRotate) {
      _changeStyle();
      window.addEventListener(_orientationchangeEvt, _changeOrientation, false);
    } else {
      _addStyles(this.wrapper, {
        width: this._containerRect().width + 'px',
        height: this._containerRect().height + 'px',
      });
    }
  }

  _videoToCavas() {
    if (!this.video) return;

    this.canvas = document.createElement('canvas');
    this.canvas.width = this._containerRect().width;
    this.canvas.height = this._containerRect().height;
    this.canvasCtx = this.canvas.getContext('2d');
    this.video.parentNode.replaceChild(this.canvas, this.video);
  }

  _drawCavas() {
    this.canvasCtx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
    this.timer = requestAnimationFrame(() => {
      this._drawCavas();
    });
  }

}

let _addStyles = (element, styles) => {
  for (let name in styles) {
    element.style[name] = styles[name];
  }
}

let _judgePhoneOrientation = () => {
  let clientWidth = document.documentElement.clientWidth
  let clientHeight = document.documentElement.clientHeight
  let result = '';

  if (clientWidth > clientHeight) {
    result = 'landscape';
  } else {
    result = 'portrait';
  }
  return result;
}
let _isString = (str) => typeof str === 'string' && str.constructor === String;
let _orientationchangeEvt = 'onorientationchange' in window ? 'orientationchange' : 'resize';
let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
let cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.msCancelAnimationFrame;
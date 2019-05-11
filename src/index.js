
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
 * @param {number} fullScreenRate 全屏播放状态下 视频的画面比例 1: 采用默认高度(指定高度); 2: 采用宽高等比例计算高度; 3：采用全屏比例播放
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
      fullScreenRate: 1, // 1: 采用默认高度; 2: 采用宽高等比例计算高度; 3：采用全屏比例播放
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

    // if (this.options.mask) {
    //   this._initMask();
    //   this._initPauseBtn(); // 初始化暂停按钮
    //   this._initControls(); // 初始化控制播放器
    // }
    this._initMask();
    if (this.options.poster) {
      this._initPoster();
    }
    if (this.options.playBtn) {
      this._initPlayBtn();
    }

    this._initPauseBtn(); // 初始化暂停按钮
    this._initControls(); // 初始化控制播放器
    // 起始播放时间
    this._initSpreadCurrentTime();
    // 播放时间线
    this._initTimeLine();
    // 播放总时长
    this._initTotalTime();
    // 全屏播放按钮
    this._initFullScreenBtn();
    // 退出全屏播放按钮
    this._initExitFullScreenBtn();

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
    this.playBtn.innerHTML = `<svg fill="#ffffff" viewBox="0 0 1024 1024" width="48" height="48"><defs><style type="text/css"></style></defs><path d="M516.30080001 38.81884445c-262.3488 0-475.7504 213.4016-475.7504 475.7504s213.4016 475.7504 475.7504 475.75039999 475.7504-213.4016 475.7504-475.75039999-213.4016-475.7504-475.7504-475.7504z m0 883.23413333c-224.6656 0-407.48373333-182.81813333-407.48373335-407.48373333s182.81813333-407.48373333 407.48373335-407.48373334 407.48373333 182.81813333 407.48373333 407.48373334-182.81813333 407.48373333-407.48373333 407.48373333z" p-id="936"></path><path d="M406.56213334 672.62933333c0 37.54666667 26.624 52.90666667 59.11893333 34.13333333l234.22293332-135.23626667c32.5632-18.77333333 32.5632-49.49333333 0-68.26666666L465.68106667 367.9552c-32.5632-18.77333333-59.11893333-3.41333333-59.11893333 34.13333333v270.5408z" p-id="937"></path></svg>`
    this.container.appendChild(this.playBtn);
  }

  // 初始化暂停按钮
  _initPauseBtn() {
    this.pauseBtn = document.createElement('div');
    this.pauseBtn.classList.add(style.pauseBtn);
    this.pauseBtn.innerHTML = `<svg fill="#ffffff" viewBox="0 0 1024 1024" width="48" height="48"><defs><style type="text/css"></style></defs><path d="M512 1003.2C243.2 1003.2 22.4 784 22.4 513.6 22.4 244.8 243.2 25.6 512 25.6s489.6 219.2 489.6 489.6C1001.6 784 780.8 1003.2 512 1003.2z m0-913.6C278.4 89.6 86.4 280 86.4 513.6s192 425.6 425.6 425.6 425.6-190.4 425.6-425.6S745.6 89.6 512 89.6z" p-id="1299"></path><path d="M425.6 692.8c-17.6 0-32-14.4-32-32V377.6c0-17.6 14.4-32 32-32s32 14.4 32 32v283.2c0 17.6-14.4 32-32 32zM598.4 692.8c-17.6 0-32-14.4-32-32V377.6c0-17.6 14.4-32 32-32s32 14.4 32 32v283.2c0 17.6-14.4 32-32 32z" p-id="1300"></path></svg>`
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
    this.currentTime.innerHTML = '00:00'
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
    this.totalTime.innerHTML = '00:00';
    this.controls.appendChild(this.totalTime);
  }
  // 更新播放总时长
  _updateTotalTime() {
    this.totalTime.innerHTML = this._timeFormat(this.video.duration);
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

  _initFullScreenBtn() {
     // 添加全屏播放按钮
     this.startFullScreenBtn = document.createElement('div');
     this.startFullScreenBtn.classList.add(style.startFullScreenBtn);
     this.startFullScreenBtn.innerHTML = `<svg fill="#ffffff" viewBox="0 0 1024 1024" width="48" height="48"><defs><style type="text/css"></style></defs><path d="M135.39555555 336.21333333V135.62311111h200.704c16.27022222 0 29.46844445-13.19822222 29.46844445-29.46844444v-35.38488889c0-16.27022222-13.19822222-29.46844445-29.46844445-29.46844445H63.71555555c-12.51555555 0-22.75555555 10.24-22.75555555 22.75555556v272.384c0 16.27022222 13.19822222 29.46844445 29.46844445 29.46844444H105.81333333c16.384-0.11377778 29.58222222-13.312 29.58222222-29.696zM690.176 135.62311111H890.88v200.704c0 16.27022222 13.19822222 29.46844445 29.46844445 29.46844444H955.73333333c16.27022222 0 29.46844445-13.19822222 29.46844445-29.46844444V63.94311111c0-12.51555555-10.24-22.75555555-22.75555556-22.75555556H690.176c-16.27022222 0-29.46844445 13.19822222-29.46844445 29.46844445v35.38488889c0 16.27022222 13.19822222 29.58222222 29.46844445 29.58222222zM336.09955555 891.10755555H135.39555555V690.40355555c0-16.27022222-13.19822222-29.46844445-29.46844444-29.46844444H70.54222222c-16.27022222 0-29.46844445 13.19822222-29.46844444 29.46844444v272.384c0 12.51555555 10.24 22.75555555 22.75555555 22.75555556h272.384c16.27022222 0 29.46844445-13.19822222 29.46844445-29.46844444v-35.38488889c-0.11377778-16.384-13.312-29.58222222-29.58222223-29.58222223zM890.88 690.40355555v200.704H690.176c-16.27022222 0-29.46844445 13.19822222-29.46844445 29.46844445v35.38488889c0 16.27022222 13.19822222 29.46844445 29.46844445 29.46844444H962.56c12.51555555 0 22.75555555-10.24 22.75555555-22.75555555V690.40355555c0-16.27022222-13.19822222-29.46844445-29.46844444-29.46844444H920.46222222c-16.384 0-29.58222222 13.19822222-29.58222222 29.46844444z" p-id="836"></path></svg>`
     this.controls.appendChild(this.startFullScreenBtn);
  }

  _initExitFullScreenBtn() {
      // this.exitFullScreenBtn = document.createElement('div');
      // this.exitFullScreenBtn.classList.add(style.exitFullScreenBtn);
      // this.exitFullScreenBtn.innerHTML = `<svg t="1557555708053" width="48" height="48"><defs><style type="text/css"></style></defs><path d="M229.8 163l55.7-55.7c6-6 2.4-16.2-6-17.2l-203.2-24c-6.5-0.8-12 4.7-11.3 11.3l24 203.2c1 8.4 11.3 11.9 17.2 6l55.4-55.4 169.6 169.4c3.9 3.9 10.4 3.9 14.3 0l53.8-53.6c3.9-3.9 3.9-10.4 0-14.3L229.8 163z m447.3 237.6c3.9 3.9 10.4 3.9 14.3 0L861 231.1l55.4 55.4c6 6 16.2 2.4 17.2-6l24-203c0.8-6.5-4.7-12-11.3-11.3l-203.2 24c-8.4 1-11.9 11.3-6 17.2l55.7 55.7-169.5 169.4c-3.9 3.9-3.9 10.4 0 14.3l53.8 53.8z m256.6 343.9c-1-8.4-11.3-11.9-17.2-6L861 794 691.4 624.5c-3.9-3.9-10.4-3.9-14.3 0l-53.8 53.6c-3.9 3.9-3.9 10.4 0 14.3L792.9 862l-55.7 55.7c-6 6-2.4 16.2 6 17.2l203.2 24c6.5 0.8 12-4.7 11.3-11.3l-24-203.1z m-588.1-120c-3.9-3.9-10.4-3.9-14.3 0L161.7 794l-55.4-55.4c-6-6-16.2-2.4-17.2 6l-24 203c-0.8 6.5 4.7 12.1 11.3 11.3l203.2-24c8.4-1 11.9-11.3 6-17.2l-55.7-55.5 169.6-169.4c3.9-3.9 3.9-10.4 0-14.3l-53.9-54z m0 0" fill="#ffffff" p-id="813"></path></svg>`
      // this.controls.appendChild(this.exitFullScreenBtn);
  }


  _showFullScreenBtn() {
    if (this.startFullScreenBtn) {
      this.startFullScreenBtn.style.display = 'block';
    }
  }

  _hiddenFullScreenBtn() {
    if (this.startFullScreenBtn) {
      this.startFullScreenBtn.style.display = 'none';
    }
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
    this.mask.style.background = 'rgba(0,0,0,0)';
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
    // 更改 mask的样式
    this.mask.style.background = 'rgba(0,0,0,0.3)'
    this.video.pause();
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

  _showSpreadTotalTime() {
    if (this.spreadTotalTime) {
      this.spreadTotalTime.style.display = 'block';
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
    // 更改 mask的样式
    this.mask.style.background = 'rgba(0,0,0,0.3)'
    this._showPauseBtn();
    // 展示暂停按钮
    this.controlsTimer && clearTimeout(this.controlsTimer);
    this.controlsTimer = setTimeout(() => { // 倒计时关闭控制器
      this.controls.style.bottom = '-45px';
      this._hiddenPauseBtn(); // 隐藏暂停按钮
      this.mask.style.background = 'rgba(0,0,0,0)'
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
      this.playBtn.addEventListener('click', (e) => {
        e && e.stopPropagation && e.stopPropagation();
        this.play();
      }, false);
    }
    if(this.pauseBtn) {
      this.pauseBtn.addEventListener('click', (e) => {
        e && e.stopPropagation && e.stopPropagation();
        this.pause();
      }, false);
    }
  
    if (this.options.mask) {
      this.mask.addEventListener('click', (e) => {
        e && e.stopPropagation && e.stopPropagation();
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

    if (this.startFullScreenBtn) {
      this.startFullScreenBtn.addEventListener('click', (e) => {
        console.warn('点击全屏播放')
        e && e.stopPropagation && e.stopPropagation();
        if (that.fullScreenSpread) { // 退出全屏状态
          // that.exitFullScreenBtn.style.display = 'block';
          // that.startFullScreenBtn.style.display = 'none';
          that.container.style.wdith = that._css(that.context, 'wdith') + 'px';
          that.container.style.height = that._css(that.context, 'height') + 'px';
          that.container.style.position = 'absolute';
          that.fullScreenSpread = false;
          if (that.options.fullScreenRate === 2) { // 宽高比计算
            that.wrapper.style.width = that._css(that.context, 'wdith') + 'px';
            that.wrapper.style.height = that._css(that.context, 'height') + 'px';
          } else if (that.options.fullScreenRate === 3) { // 全屏铺满
            that.wrapper.style.width = that._css(that.context, 'wdith') + 'px';
            that.wrapper.style.height = that._css(that.context, 'height') + 'px';
          } else { // 1: 默认高度
            // 校验视频的高度是否大于屏幕的高度
            that.wrapper.style.width = that._css(that.context, 'wdith') + 'px';
            that.wrapper.style.height = that._css(that.context, 'height') + 'px';
          }
        } else { // 进入全屏状态
          // that.exitFullScreenBtn.style.display = 'none';
          // that.startFullScreenBtn.style.display = 'block';
          that.container.style.width = window.screen.width + 'px';
          that.container.style.height = window.screen.height + 'px';
          that.container.style.position = 'fixed';
          that.fullScreenSpread = true;
          if (that.options.fullScreenRate === 2) { // 宽高比计算
            // 计算视频全屏播放的宽高比例
            let realVideoHight = Math.round((window.screen.width/that.videoWidth) * that.videoHeight);
            if(realVideoHight > window.screen.height) realVideoHight = window.screen.height;
            that.wrapper.style.width = window.screen.width + 'px';
            that.wrapper.style.height = realVideoHight + 'px';
          } else if (that.options.fullScreenRate === 3) { // 全屏铺满
            that.wrapper.style.width = window.screen.width + 'px';
            that.wrapper.style.height = window.screen.height + 'px';
          } else { // 1: 默认高度    
            // 校验视频的高度是否大于屏幕的高度
            if (that._css(that.wrapper, 'height') > window.screen.height) {
              that.wrapper.style.width = window.screen.width + 'px';
              that.wrapper.style.height = window.screen.height + 'px';
            }
          }
        }
      })
    }

    this.video.addEventListener('ended', () => {
      this.options.onEnd(); // 监听视频播放 结束

      if (that.fullScreenSpread) { // 全屏播放状态下， 退出全屏
        that.container.style.height = that._css(that.context, 'height') + 'px';
        that.fullScreenSpread = false;
        if (!this.options.fill) {
          this._handleResize();
        } else {
          this._fillResize();
        }
      }
      
      this._showPlayBtn();
      this._resetTimeLine();
      // 更新视频的总时间
      this._showSpreadTotalTime();

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
      that.videoWidth = that.video.videoWidth;
      that.videoHeight = that.video.videoHeight;
      // 未指定视频区域的高度，重新调整视频的高度
      if (that._css(that.context, 'height') < 20) {
        // 计算视频的高度
        const videoHeight = Math.round((that.video.videoHeight/that.video.videoWidth) * that.context.clientWidth);
        that.context.style.height = videoHeight + 'px';
        // 重新计算 播放视频的大小
        if (!this.options.fill) {
          this._handleResize();
        } else {
          this._fillResize();
        }
      }

      // 初始化页面视频播放总时长
      this._initSpreadTotalTime(this._timeFormat(this.video.duration));
      this._updateTotalTime(); // 更新播放总时长
    })
    this.video.addEventListener('loadeddata', () => {
      console.warn('loadeddata')
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


    
    this.video.addEventListener('pause', function(e) { // should listen visibility webkitvisibility
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
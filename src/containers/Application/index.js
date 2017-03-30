import EventManagerMixin from 'mixins/EventManagerMixin'
import Detect from 'helpers/Detect'
import Router from 'core/Router'
import debounce from 'lodash.debounce'

import 'gsap'
import 'whatwg-fetch'

import Logo from 'components/Logo'

import {
  WINDOW_RESIZE,
  WINDOW_ON_FOCUS,
  WINDOW_ON_BLUR
} from 'config/messages'

export default Vue.extend({

  name: 'application',

  mixins: [EventManagerMixin],

  router: Router,

  template: require('./template.html'),

  emitterEvents: [],

  domEvents: [{
    target: window,
    event: 'resize',
    method: 'handleWindowResize'
  }, {
    target: window,
    event: 'blur',
    method: 'handleWindowBlur'
  }, {
    target: window,
    event: 'focus',
    method: 'handleWindowFocus'
  }],

  data () {
    return {
      resourcesReady: false
    }
  },

  created () {
  },

  mounted () {
    this.creditsLog()
    Detect.addClasses()
    this.bind()
  },

  methods: {

    bind () {
      this.handleWindowResize = debounce(this.broadcastWindowSize, 200)
      window.addEventListener('resize', this.handleWindowResize, false)
    },

    creditsLog () {
      /* eslint-disable */
      console.log('%c ==== Boiteapotes ====', 'background: #FFDBC6; padding:5px; font-size: 11px; color: #ffffff');
      console.log('%c Site developed with -`ღ´- by yannouXpatou', 'background: #FFDBC6; padding:5px; font-size: 13px; color: #ffffff');
      console.log('%c', 'background: #FFDBC6; font-size: 11px; color: #f0f0f0');
      /* eslint-enable */
    },

    handleWindowBlur () {
      this.emitter.emit(WINDOW_ON_BLUR)
    },

    handleWindowFocus () {
      this.emitter.emit(WINDOW_ON_FOCUS)
    },

    broadcastWindowSize () {
      this.emitter.emit(WINDOW_RESIZE, {
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
  },

  components: {
    Logo
  }

})

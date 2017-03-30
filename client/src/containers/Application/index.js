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
    Detect.addClasses()
    this.bind()
  },

  methods: {

    bind () {
      this.handleWindowResize = debounce(this.broadcastWindowSize, 200)
      window.addEventListener('resize', this.handleWindowResize, false)
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

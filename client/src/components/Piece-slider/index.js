import EventManagerMixin from 'mixins/EventManagerMixin'
import scope from 'utils/generic/scope'
import 'gsap'

import {
  WINDOW_RESIZE
} from 'config/messages'

export default Vue.extend({

  name: 'piece-slider',

  mixins: [EventManagerMixin],

  template: require('./template.html'),

  domEvents: [],

  emitterEvents: [{
    message: WINDOW_RESIZE,
    method: 'onWindowResize'
  }],

  data () {
    return {
      fullScreen: false
    }
  },

  created () {
  },

  mounted () {
  },

  beforeDestroy () {
  },

  methods: {

    createTls () {
    },

    goFullScreen() {
      this.$refs.overlay.classList.add("full")
      this.$refs.pieceimg.classList.add("full")
      this.fullScreen = true
    },

    exitFullScreen() {
      this.$refs.overlay.classList.remove("full")
      this.$refs.pieceimg.classList.remove("full")
      this.fullScreen = false
    },

    onWindowResize ({width, height}) {

    }
  },

  components: {
  }
})

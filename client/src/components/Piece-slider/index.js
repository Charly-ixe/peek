import EventManagerMixin from 'mixins/EventManagerMixin'
import scope from 'utils/generic/scope'
import 'gsap'

import {
  WINDOW_RESIZE,
  DETAIL_CLICK
} from 'config/messages'

export default Vue.extend({

  name: 'piece-slider',

  mixins: [EventManagerMixin],

  template: require('./template.html'),

  domEvents: [],

  emitterEvents: [{
    message: WINDOW_RESIZE,
    method: 'onWindowResize'
  },
  {
    message: DETAIL_CLICK,
    method: 'adaptSlider'
  }
  ],

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

    adaptSlider() {
      this.$refs.overlay.classList.add("half")

      setTimeout(function(){
        this.$refs.pieceimg.classList.add("half")
      }.bind(this), 500)

    },

    onWindowResize ({width, height}) {

    }
  },

  components: {
  }
})

import EventManagerMixin from 'mixins/EventManagerMixin'
import scope from 'utils/generic/scope'
import 'gsap'

import data from 'data/content'

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
      fullScreen: false,
      currentPiece: {}
    }
  },

  created () {
    this.currentPiece = data.myPeeks[this.$route.params.id]
  },

  mounted () {
  },

  beforeDestroy () {
  },

  methods: {

    createTls () {
    },

    handleFullScreen() {
      this.$refs.overlay.classList.toggle("full")
      this.$refs.pieceimg.classList.toggle("full")
      document.body.classList.toggle("auto")
      if(this.fullScreen) {
        this.fullScreen = false
      }
      else {
        this.fullScreen = true
      }
    },

    adaptSlider() {
      this.$refs.overlay.classList.add("half")
      this.$refs.pieceimg.classList.add("half")

    },

    onWindowResize ({width, height}) {

    }
  },

  components: {
  }
})

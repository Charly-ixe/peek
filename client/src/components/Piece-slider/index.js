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
      currentPiece: {},
      coverType: null
    }
  },

  created () {
    this.currentPiece = data.myPeeks[this.$route.params.id]
    this.coverType = this.currentPiece.cover_type
  },

  mounted () {
    Vue.nextTick(() => {
      this.createTls()
      this.enterTl.play()
    })
  },

  beforeDestroy () {
  },

  methods: {

    createTls () {
      this.enterTl = new TimelineMax({paused: true, delay: 0.6})
      this.enterTl
        .fromTo(this.$el, 0.5, {x: -80, opacity: 0}, {x: 0, opacity: 1, ease: Expo.easeOut})
    },

    handleFullScreen() {
      this.$refs.overlay.classList.toggle("full")
      if(this.coverType == "image") {
        this.$refs.pieceimg.classList.toggle("full")
      }
      else if(this.coverType == "video") {
        this.$refs.piecevid.classList.toggle("full")
      }
      document.body.classList.toggle("auto")
      if(this.fullScreen) {
        this.fullScreen = false
      }
      else {
        this.fullScreen = true
      }
    },

    adaptSlider() {
      this.$refs.overlay.classList.toggle("half")
      this.$el.classList.toggle("half")
      // if(this.coverType == "image") {
      //   this.$refs.pieceimg.classList.toggle("half")
      // }
      // else if(this.coverType == "video") {
      //   this.$refs.piecevid.classList.toggle("half")
      //   // this.$refs.videobutton.classList.toggle("half")
      // }

    },

    playMorphing() {
      this.$refs.piecevid.play()
    },

    onWindowResize ({width, height}) {

    }
  },

  components: {
  }
})

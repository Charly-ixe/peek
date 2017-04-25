import EventManagerMixin from 'mixins/EventManagerMixin'
import scope from 'utils/generic/scope'
import Emitter from 'helpers/Emitter'

import {
  WINDOW_RESIZE,
  DETAIL_CLICK
} from 'config/messages'

import content from 'data/content'

export default Vue.extend({

  name: 'piece-infos',

  mixins: [EventManagerMixin],

  template: require('./template.html'),

  domEvents: [],

  emitterEvents: [{
    message: WINDOW_RESIZE,
    method: 'onWindowResize'
  }],

  data () {
    return {
      pieces: content.pieces,
      index: 0,
      currentPiece: {},
      categoriesDisplayed: true,
      detailDisplayed: false
    }
  },

  created () {
  },

  mounted () {
    this.currentPiece = this.pieces[this.index]
    let video = document.getElementsByTagName('video')
    video.autoplay = false
    video.load()
  },

  computed: {
    peeked() {
      return this.currentPiece.peeked
    },
    contents() {
      return this.currentPiece.content
    }
  },

  beforeDestroy () {
  },

  methods: {

    createTls () {
    },

    fadeOutCategories() {
      Emitter.emit(DETAIL_CLICK)
      this.fadeOutTl = new TimelineMax({onComplete: this.changeContent})
      this.fadeOutTl
        .staggerFromTo(this.$refs.contentinfos, 0.4, {opacity: 1, ease: Expo.easeOut}, {opacity: 0, ease: Expo.easeOut}, -0.1)
        .to(this.$el, 0.4, {css:{width: '50%'}, ease: Expo.easeOut})
    },

    changeContent() {
      this.categoriesDisplayed = false
      this.detailDisplayed = true
      this.fadeInTl = new TimelineMax()
      this.fadeInTl
        .staggerFromTo(this.$refs.details.children, 0.5, {opacity: 0,x:-10, ease: Expo.easeOut}, {opacity: 1,x:0, ease: Expo.easeOut}, 0.1)
    },

    onWindowResize ({width, height}) {

    }
  },

  components: {
  }
})

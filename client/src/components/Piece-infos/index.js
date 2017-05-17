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
      detailDisplayed: false,
      selectedDetail: {},
      navItems: []
    }
  },

  created () {
  },

  mounted () {
    this.index = this.$route.params.id
    this.currentPiece = this.pieces[this.index]

    setTimeout(()=>{
      for (var i = 0; i < this.$refs.navitems.length; i++) {

        this.navItems.push(this.$refs.navitems[i])
      }
      let wrapper = document.querySelector(".infos-zone__wrapper")
      let navbar = document.querySelector(".infos-zone__navbar")
      let dynamicHeight = wrapper.offsetHeight
      navbar.style.height = dynamicHeight - 80 + 'px'
      console.log(navbar)
    },100)

    // let video = document.getElementsByTagName('video')
    // video.autoplay = false
    // video.load()
    // let wrapper = document.querySelector(".infos-zone__wrapper")
    // let navbar = document.querySelector(".infos-zone__navbar")
    //
    // let dynamicHeight = wrapper.offsetHeight
    // navbar.style.height = dynamicHeight
    // console.log(dynamicHeight)

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

    fadeOutCategories(selected, n) {
      this.selectedDetail = selected
      this.navItems[n].classList.add('active')
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

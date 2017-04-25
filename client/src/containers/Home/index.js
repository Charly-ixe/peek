import EventManagerMixin from 'mixins/EventManagerMixin'
import AssetsLoaderMixin from 'mixins/AssetsLoaderMixin'
import { home as assets } from 'config/manifestLoader'
import { scope } from 'utils/generic'
import States from 'core/States'
import Router from 'core/Router'

import {throttle} from 'lodash'

import Peeks from 'components/Peeks-gallery'

import {
} from 'config/messages'

import FixedNavigation from 'components/Fixed-navigation'
import Tweenmax from 'gsap'

export default Vue.extend({

  name: 'home',

  mixins: [EventManagerMixin, AssetsLoaderMixin],

  template: require('./template.html'),

  autoLoad: true,

  assets,

  emitterEvents: [],

  data () {
    return {
      scrolled: false
    }
  },

  created () {
    document.title = `Home - ${States.metas.baseTitle}`

    scope(this, [
      'createTls'
    ])
    window.addEventListener('mousewheel', throttle(this.handleScroll, 1200, {'trailing': false}))
    window.addEventListener('click', this.handleClick, false)
    window.addEventListener('keypress', this.onKeyPressed, false);
  },
  destroyed () {
    window.removeEventListener('mousewheel', throttle(this.handleScroll, 1200, {'trailing': false}))
    window.removeEventListener('click', this.handleClick,  false)
    window.removeEventListener('keypress', this.onKeyPressed, false);
  },

  mounted () {
    this.createTls()
    this.video = this.$refs.bgVid
    this.playbackConst = 500

    let _this = this

    this.video.addEventListener('loadedmetadata', function() {
      _this.$refs.homeContainer.style.height = Math.floor(_this.video.duration) * _this.playbackConst + "px";
    });

  },

  beforeDestroy () {
  },

  methods: {
    scrollPlay(){
      this.frameNumber  = window.pageYOffset/this.playbackConst;
      this.video.currentTime  = this.frameNumber;
      window.requestAnimationFrame(this.scrollPlay);
    },

    createTls () {
      this.enterTl = new TimelineMax({paused: true})
    },

    onKeyPressed( event ) {
      if (event.code == "Space") {
        if (!this.video.paused){
          this.video.pause();
        } else {
          this.video.play();
        }
      }
    },

    handleScroll () {
      if (!this.scrolled) {
        console.log(this.$refs.overlay)
        Tweenmax.to(this.$refs.overlay, 1, {
          opacity: 0,
          ease:Power1.easeInOut,
          onComplete: ()=> {
            this.scrolled = true
            this.$refs.overlay.style.display = "none"
            // this.video.play()
            // let _this = this

            window.requestAnimationFrame(this.scrollPlay);
        }
        })
      }
    },
    handleClick () {
      Router.go('/details')
    }
  },

  components: {
    'fixed-navigation-component': FixedNavigation,
    'peeks-component': Peeks
  }
})

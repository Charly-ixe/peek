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
  },
  destroyed () {
    window.removeEventListener('mousewheel', throttle(this.handleScroll, 1200, {'trailing': false}))
  },

  mounted () {
    this.createTls()

  },

  beforeDestroy () {
  },

  methods: {
    createTls () {
      this.enterTl = new TimelineMax({paused: true})
    },

    handleScroll () {
      if (!this.scrolled) {
        Tweenmax.to(this.$refs.overlay, 1, {
          opacity: 0,
          ease:Power1.easeInOut,
          onComplete: ()=> {
            this.scrolled = true
            this.$refs.overlay.style.display = "none"

        }
        })
      }
    }
  },

  components: {
    'fixed-navigation-component': FixedNavigation,
    'peeks-component': Peeks
  }
})

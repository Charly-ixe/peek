import EventManagerMixin from 'mixins/EventManagerMixin'
import AssetsLoaderMixin from 'mixins/AssetsLoaderMixin'
import { home as assets } from 'config/manifestLoader'
import { scope } from 'utils/generic'
import States from 'core/States'
import Router from 'core/Router'
import Scroll from 'helpers/Scroll'

import {throttle} from 'lodash'

import Peeks from 'components/Peeks-gallery'

import {
} from 'config/messages'

import FixedNavigation from 'components/Fixed-navigation'
import Tweenmax from 'gsap'
import Content from 'data/content'

export default Vue.extend({

  name: 'home',

  mixins: [EventManagerMixin, AssetsLoaderMixin],

  template: require('./template.html'),

  autoLoad: true,

  assets,

  emitterEvents: [],

  data () {
    return {
    }
  },

  created () {
    document.title = `Home - ${States.metas.baseTitle}`

    scope(this, [
      'createTls'
    ])

  },
  destroyed () {
  },

  mounted () {
    this.createTls()
    this.addListeners()

    this.scroll = new Scroll({
        preload: false,
        native: false,
        direction: 'horizontal',
        section: document.querySelector('.home__expos-scroll-container'),
        divs: document.querySelectorAll('.home__expo-container')
    })

    this.scroll.init()

  },

  beforeDestroy () {
  },

  methods: {
    createTls () {
      this.enterTl = new TimelineMax({paused: true})
    },

    addListeners() {
      window.addEventListener('mousewheel', throttle(this.fadeOutInfos, 1200, {'trailing': false}))
    },

    fadeOutInfos() {
      console.log("eghizehfgizfhl");
      // Tweenmax.to(this.$refs.infoselt, 0.3, {opacity: 0, ease:Power1.easeInOut})

    }

  },

  components: {
    'fixed-navigation-component': FixedNavigation,
  }
})

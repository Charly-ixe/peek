import EventManagerMixin from 'mixins/EventManagerMixin'
import AssetsLoaderMixin from 'mixins/AssetsLoaderMixin'
import { home as assets } from 'config/manifestLoader'
import { scope } from 'utils/generic'
import States from 'core/States'
import Router from 'core/Router'
import Scroll from 'helpers/Scroll'
import AssetsLoader from 'helpers/AssetsLoader'
import Emitter from 'helpers/Emitter'

import {throttle} from 'lodash'

import Peeks from 'components/Peeks-gallery'

import {
  SCROLL_STARTED_ALL_EXP,
  SCROLL_ZERO_ALL_EXP
} from 'config/messages'

import FixedNavigation from 'components/Fixed-navigation'
import LoaderComponent from 'components/Loader'
import Tweenmax from 'gsap'
import Content from 'data/content'

export default Vue.extend({

  name: 'home',

  mixins: [EventManagerMixin, AssetsLoaderMixin],

  template: require('./template.html'),

  autoLoad: true,

  assets,

  emitterEvents: [
    {
      message: SCROLL_STARTED_ALL_EXP,
      method: 'onScrollStarted'
    },
    {
      message: SCROLL_ZERO_ALL_EXP,
      method: 'onScrollZero'
    }
  ],

  data () {
    return {
      assetsIsLoaded: false,
      resources: {}
    }
  },

  created () {
    document.title = `Home - ${States.metas.baseTitle}`

    this.loader = AssetsLoader

    this.loader
     .load()
     .then( resources => {

       resources.forEach( ({ id, img }) => this.resources[ id ] = img )

       this.assetsIsLoaded = true

     })

    scope(this, [
      'createTls'
    ])



  },
  destroyed () {
  },

  mounted () {
    this.createTls()

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

    },

    onScrollStarted() {
      Tweenmax.to(this.$refs.infoselt, 0.2, {opacity: 0, ease:Power1.easeInOut})
    },

    onScrollZero() {
      Tweenmax.to(this.$refs.infoselt, 0.2, {opacity: 1, ease:Power1.easeInOut})
    },
    goArtSpi() {
      Router.push('/art-spiegelman')
    }

  },

  components: {
    'fixed-navigation-component': FixedNavigation,
    'loader-component': LoaderComponent
  }
})

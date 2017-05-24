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
      scrolled: false,
      peeks_obj: Content.pieces,
      hovered: false,
      openedMenu: false
    }
  },

  created () {
    document.title = `Home - ${States.metas.baseTitle}`

    scope(this, [
      'createTls'
    ])
  },
  destroyed () {
    window.removeEventListener('mouseup', this.handleFirstClick)
    window.removeEventListener('mousewheel', throttle(this.handleFirstScroll, 1200, {'trailing': false}))
  },

  mounted () {
    this.createTls()

    this.scroll = new Scroll({
        preload: false,
        native: false,
        direction: 'horizontal',
        section: document.querySelector('.expo__peeks-scroll-container'),
        divs: document.querySelectorAll('.peek-container')
      })

    this.hasSeenWelcome = localStorage.getItem("has-seen-welcome")

    if (this.hasSeenWelcome !== null) {
      this.$refs.overlay.style.display = "none"
      this.scroll.init()
    } else {
      window.addEventListener('mousewheel', throttle(this.handleFirstScroll, 1200, {'trailing': false}))
      window.addEventListener('mouseup', this.handleFirstClick)
    }

  },

  beforeDestroy () {
  },

  methods: {
    createTls () {
      this.enterTl = new TimelineMax({paused: true})
    },

    handleFirstScroll () {
      if (!this.scrolled) {
        Tweenmax.to(this.$refs.overlay, 1, {
          opacity: 0,
          ease:Power1.easeInOut,
          onComplete: ()=> {
            this.scrolled = true
            this.$refs.overlay.style.display = "none"
            this.scroll.init()
            localStorage.setItem("has-seen-welcome", "true")
          }
        })
      }
    },

    isMultipleCover(i) {
      console.log(i);
      return this.peeks_obj[i].cover_url.length > 1
    },

    handleFirstClick() {
      Tweenmax.to(this.$refs.overlay, 1, {
        opacity: 0,
        ease:Power1.easeInOut,
        onComplete: ()=> {
          this.scrolled = true
          this.$refs.overlay.style.display = "none"
          this.scroll.init()
          localStorage.setItem("has-seen-welcome", "true")
        }
      })
    },
    hoverCard(e) {
    },
    leaveCard(e) {
    },
    goDetails(index) {
      console.log('go setails');
      Router.push('art-spiegelman/details/'+index)
    },
    onMenuClick() {
      if (!this.openedMenu){
        this.$refs.overlayMenu.className = "expo__overlay-menu opened"
        this.$refs.menuBtn.className = "expo__menu-button opened"
        this.openedMenu = true
      } else {
        this.$refs.overlayMenu.className = "expo__overlay-menu"
        this.$refs.menuBtn.className = "expo__menu-button"
        this.openedMenu = false
      }
    },
    onFilterClick() {
      this.$refs.bgName.innerHTML = "Toutes les oeuvres"
      this.$refs.currentFilter.innerHTML = "Toutes les oeuvres"
      this.$refs.secondFilter.innerHTML = "Mes peeks"
    },
    onPeekClick(e){
      let prevEl = e.srcElement.nextSibling.nextElementSibling
      console.log(prevEl)

      e.srcElement.style.backgroundImage="url(/images/icons/icon-peek-off.svg)"
      prevEl.innerHTML = "peeker"
      prevEl.style.color = "#908A86"
    }
  },

  components: {
    'fixed-navigation-component': FixedNavigation,
    'peeks-component': Peeks
  }
})

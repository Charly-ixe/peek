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
      peeks_obj: Content.pieces,
      hovered: false,
      openedMenu: false,
      firstAnimatedPeeks : []
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
    this.bgPeekTypo = this.$refs.bgPeekTypo
    for (let i = 0; i < 4; i++) {
      this.firstAnimatedPeeks.push(this.$refs.peekContainer[i])
    }
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
      this.enterTl.play()
    } else {
      window.addEventListener('mousewheel', throttle(this.handleFirstUserAction, 1200, {'trailing': false}))
      window.addEventListener('mouseup', this.handleFirstUserAction)
    }

  },

  beforeDestroy () {
  },

  methods: {
    createTls () {
      this.enterTl = new TimelineMax({paused: true})
      this.enterTl
        .add(Tweenmax.to(this.bgPeekTypo, 0.7, {
          opacity: 0.5,
          top: "45%",
          ease:Power1.easeInOut
        })
      )
        .add(Tweenmax.to(this.firstAnimatedPeeks[0], 0.5, {
          opacity: 1,
          left: "-15px",
          ease:Power1.easeInOut
        }),"-=0.4")
        .add(Tweenmax.to(this.firstAnimatedPeeks[1], 0.5, {
          opacity: 1,
          left: "-15px",
          ease:Power1.easeInOut
        }),"-=0.3")
        .add(Tweenmax.to(this.firstAnimatedPeeks[2], 0.5, {
          opacity: 1,
          left: "-15px",
          ease:Power1.easeInOut
        }),"-=0.3")
        .add(Tweenmax.to(this.firstAnimatedPeeks[3], 0.5, {
          opacity: 1,
          left: "-15px",
          ease:Power1.easeInOut,
          onComplete: ()=> {
            this.scroll.init()
            localStorage.setItem("has-seen-welcome", "true")
            for (let i = 4; i < this.$refs.peekContainer.length; i++) {
              this.$refs.peekContainer[i].style.opacity = 1
            }
          }
        }),"-=0.3")
    },

    handleFirstUserAction () {
      Tweenmax.to(this.$refs.overlay, 1, {
        opacity: 0,
        ease:Power1.easeInOut,
        onStart: ()=> {
          this.enterTl.play()
        },
        onComplete: ()=> {
          this.$refs.overlay.style.display = "none"
          localStorage.setItem("has-seen-welcome", "true")
        }
      })
    },

    isMultipleCover(i) {
      return this.peeks_obj[i].cover_url.length > 1
    },
    hoverCard(e) {
    },
    leaveCard(e) {
    },
    goDetails(index) {
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

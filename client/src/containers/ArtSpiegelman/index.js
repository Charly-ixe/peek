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
  SCROLL_AFTER_THIRD_CARD,
  SCROLL_BEFORE_THIRD_CARD
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

  emitterEvents: [
    {
      message: SCROLL_BEFORE_THIRD_CARD,
      method: 'onScrollBeforeThird'
    },
    {
      message: SCROLL_AFTER_THIRD_CARD,
      method: 'onScrollAfterThird'
    }
  ],

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
    this.filterClicFlag = false
    this.bgPeekTypo = this.$refs.bgPeekTypo
    for (let i = 0; i < 5; i++) {
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
    // for (var i = 0; i < this.$refs.peekContainer.length; i++) {
      // console.log(this.$refs.peekContainer[i].nextSibling)
    // }
    this.$refs.peekContainer

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
      this.fadeOutCards = new TimelineMax({paused: true})

      this.enterTl
        .add(Tweenmax.to(this.bgPeekTypo, 1, {
          opacity: 0.5,
          top: "45%",
          ease:Power1.easeInOut
        }))
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
          ease:Power1.easeInOut
        }),"-=0.3")
        .add(Tweenmax.to(this.firstAnimatedPeeks[4], 0.5, {
          opacity: 1,
          left: "-15px",
          ease:Power1.easeInOut,
          onComplete: ()=> {
            this.scroll.init()
            for (let i = 4; i < this.$refs.peekContainer.length; i++) {
              this.$refs.peekContainer[i].style.opacity = 1
            }
          }
        }),"-=0.3")

        this.fadeOutCards
        .add(Tweenmax.to(this.bgPeekTypo, 0.7, {
          opacity: 0,
          ease:Power1.easeInOut
        }))
        .add(Tweenmax.to(this.firstAnimatedPeeks[0], 0.5, {
          opacity: 0,
          ease:Power1.easeInOut
        }),"-=0.5")
        .add(Tweenmax.to(this.firstAnimatedPeeks[1], 0.5, {
          opacity: 0,
          ease:Power1.easeInOut
        }),"-=0.5")
        .add(Tweenmax.to(this.firstAnimatedPeeks[2], 0.5, {
          opacity: 0,
          ease:Power1.easeInOut
        }),"-=0.5")
        .add(Tweenmax.to(this.firstAnimatedPeeks[3], 0.5, {
          opacity: 0,
          ease:Power1.easeInOut
        }),"-=0.5")
        .add(Tweenmax.to(this.firstAnimatedPeeks[4], 0.5, {
          opacity: 0,
          ease:Power1.easeInOut,
          onComplete: ()=> {
            for (let i = 4; i < this.$refs.peekContainer.length; i++) {
              this.$refs.peekContainer[i].style.opacity = 0
            }
            this.$refs.bgPeekTypo.innerHTML = this.bgTitle
            this.enterTl.restart()
          }
        }),"-=0.5")
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
    onFilterClick(e) {
      if (e.srcElement.className != 'filter-name current') {
        this.bgTitle = e.srcElement.innerHTML
        if (!this.filterClicFlag) {
          this.fadeOutCards.play()
          this.filterClicFlag = true
        } else {
          this.fadeOutCards.restart()
        }
        let filtersEls = document.getElementsByClassName('filter-name')
        for (var i = 0; i < filtersEls.length; i++) {
          filtersEls[i].className = "filter-name"
        }
        e.srcElement.className = "filter-name current"
      } else {
      }
    },
    onPeekClick(e){
      let prevEl = e.srcElement.nextSibling.nextElementSibling
      if (prevEl.innerHTML == "dépeeker") {
        e.srcElement.style.backgroundImage="url(/images/icons/icon-peek-off.svg)"
        prevEl.innerHTML = "peeker"
        prevEl.style.color = "#908A86"
      } else {
        e.srcElement.style.backgroundImage="url(/images/icons/icon-peek-on.svg)"
        prevEl.innerHTML = "dépeeker"
        prevEl.style.color = "#fcc854"

      }

    },
    goAllExpo() {
      Router.push("/")
    },
    goArtSpi() {
      Router.push("/art-spiegelman")
    },
    goInfos() {

    },
    goAbout() {

    },
    goMyAccount() {

    },
    onScrollBeforeThird() {
      Tweenmax.to(this.$refs.bgPeekTypo, 0.3, {
        opacity: 0.7,
        ease:Power1.easeInOut
      })
    },
    onScrollAfterThird() {
      Tweenmax.to(this.$refs.bgPeekTypo, 0.3, {
        opacity: 0,
        ease:Power1.easeInOut
      })
    }
  },

  components: {
    'fixed-navigation-component': FixedNavigation,
    'peeks-component': Peeks
  }
})

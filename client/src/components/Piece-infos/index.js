import EventManagerMixin from 'mixins/EventManagerMixin'
import scope from 'utils/generic/scope'
import Emitter from 'helpers/Emitter'
import Tweenmax from 'gsap'
import Router from 'core/Router'

import {
  WINDOW_RESIZE,
  DETAIL_CLICK
} from 'config/messages'

import SubdetailsComponent from 'components/Subdetails'

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
      pieces: content.myPeeks,
      index: 0,
      currentPiece: {},
      categoriesDisplayed: true,
      detailDisplayed: false,
      selectedCategory: {},
      activeElement: null,
      navItems: [],
      categories: [],
      activeItem: null,
      subdetails: []
    }
  },

  created () {
  },

  mounted () {
    this.index = this.$route.params.id
    this.currentPiece = this.pieces[this.index]

    Vue.nextTick(() => {

      this.categories = this.$refs.contentinfos
      this.navItems = this.$refs.navitems

      this.setCategoriesPositions()
      this.setNavBar()

      this.subdetails = this.$children
      this.subdetails.forEach((subdetail, i) => {
        subdetail.index = i
        subdetail.content = this.currentPiece.content[i].subdetails
      })
    })

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

    openCategory(selected, index) {
      this.selectedCategory = selected
      this.activeId = index
      this.activeElement = this.categories[index]
      let firstNavItem = document.querySelector('.first')
      let titleContainer = document.querySelector(".infos-zone__content-block")
      let navbar = document.querySelector(".infos-zone__navbar")
      let button = document.querySelector(".infos-zone__dicover-button")

      let categoryElts = this.activeElement.children
      let text = categoryElts[1]

      let openTl = new TimelineMax({delay: 0.2, onComplete: ()=>{

        this.activeElement.style.top = this.navItems[this.activeId].getBoundingClientRect().top - 90 - this.activeId + "px"
        this.navItems[this.activeId].classList.toggle('active')
        firstNavItem.classList.toggle('active')
        button.classList.toggle('hidden')

        let navNewHeight = this.categories[this.categories.length - 1].getBoundingClientRect().bottom
        let navbar = document.querySelector(".infos-zone__navbar")
        // navbar.style.height = navNewHeight - 110 + 'px'

        let displayContent = new TimelineMax({delay: 0.4})
        displayContent

          .fromTo(categoryElts[0], 0.3, {opacity: 0, y: -5}, {opacity: 1, y: 0, ease: Expo.easeOut})
          .fromTo(categoryElts[1], 0.3, {opacity: 0, y: -10}, {opacity: 1, y: 0, ease: Expo.easeOut}, 0.3)
      }})

      for(let i = 0; i < this.navItems.length; i++) {
        let targetYTop = (this.navItems[i].getBoundingClientRect().top - titleContainer.getBoundingClientRect().height - 60) - 33*i
        let targetYBottom = ((navbar.getBoundingClientRect().bottom - this.navItems[i].getBoundingClientRect().bottom) + 33) - 33*(this.navItems.length - i)
        let targetYActive = (this.navItems[this.activeId].getBoundingClientRect().top - titleContainer.getBoundingClientRect().height - 60) - 33*i

        if(i < this.activeId) {
          this.categories[i].classList.toggle('hidden')
          Tweenmax.to(this.navItems[i], 1.2, {y: -targetYTop, ease: Expo.easeOut})
        }
        else if(i > this.activeId) {
          this.categories[i].classList.toggle('hidden')
          Tweenmax.to(this.navItems[i], 1.2, {y: targetYBottom, ease: Expo.easeOut})
        }
        else {

        }
        Tweenmax.to(this.navItems[this.activeId], 1.2, {y: -targetYActive, ease: Expo.easeOut})
      }

      Emitter.emit(DETAIL_CLICK)
      this.$el.classList.add('open')

      if(this.detailDisplayed) {
        this.detailDisplayed = false
      }
      else {
        this.detailDisplayed = true
      }

      openTl
        .fromTo(categoryElts[0], 0.3, {opacity: 1, y: 0}, {opacity: 0, y: -20, ease: Expo.easeOut})
        .fromTo(categoryElts[1], 0.3, {opacity: 1, y: 0}, {opacity: 0, y: -10, ease: Expo.easeOut}, 0.3)
        .fromTo(categoryElts[2], 0.3, {opacity: 1, y: 0}, {opacity: 0, y: 10, ease: Expo.easeOut}, 0)

    },

    clickCategoryTitle(selected, index) {
      this.openCategory(selected, index)
    },

    setCategoriesPositions() {
      let categoryPosY = 0
      let dateBottom = document.querySelector('.infos-zone__date').getBoundingClientRect().bottom

      for(let i = 0; i < this.categories.length; i++) {
        if (i > 0) {
          categoryPosY += this.categories[i-1].getBoundingClientRect().height + 30
        }
        else {
          categoryPosY = dateBottom
        }
        this.categories[i].style.top = categoryPosY + "px"

      }
    },

    setNavBar() {
      let navNewHeight = this.categories[this.categories.length - 1].getBoundingClientRect().bottom
      let navbar = document.querySelector(".infos-zone__navbar")
      let titleContainer = document.querySelector(".infos-zone__content-block")
      navbar.style.height = navNewHeight - 110 + 'px'

      for(let i = 0; i < this.categories.length; i++) {
        let itemPosY = this.categories[i].getBoundingClientRect().top - titleContainer.getBoundingClientRect().height + 35
        this.navItems[i].style.top = itemPosY + "px"
      }
    },

    backToArtSpi() {
      Router.push('/art-spiegelman')
    },

    onWindowResize ({width, height}) {

    }
  },

  components: {
    "subdetails-component": SubdetailsComponent
  }
})

import EventManagerMixin from 'mixins/EventManagerMixin'
import scope from 'utils/generic/scope'
import Emitter from 'helpers/Emitter'
import Tweenmax from 'gsap'

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
      selectedCategory: {},
      navItems: [],
      categories: [],
      activeItem: null
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

    openCategory(selected, index, event) {
      this.selectedCategory = selected
      this.activeId = index
      let firstNavItem = document.querySelector('.first')
      let titleContainer = document.querySelector(".infos-zone__content-block")
      let navbar = document.querySelector(".infos-zone__navbar")
      let parent = event.srcElement.parentElement
      let categoryElts = parent.children
      let text = event.toElement.previousElementSibling

      let openTl = new TimelineMax({delay: 0.2, onComplete: ()=>{

        parent.style.top = this.navItems[this.activeId].getBoundingClientRect().top - 90 - this.activeId + "px"
        text.innerHTML = ""
        text.innerHTML = selected.content
        this.navItems[this.activeId].classList.add('active')
        firstNavItem.classList.remove('active')
        let displayContent = new TimelineMax({delay: 0.4})
        displayContent

          .fromTo(categoryElts[0], 0.3, {opacity: 0, y: -5}, {opacity: 1, y: 0, ease: Expo.easeOut})
          .fromTo(categoryElts[1], 0.3, {opacity: 0, y: -10}, {opacity: 1, y: 0, ease: Expo.easeOut}, 0.3)
      }})

      for(let i = 0; i < this.navItems.length; i++) {
        let targetYTop = (this.navItems[i].getBoundingClientRect().top - titleContainer.getBoundingClientRect().height - 60) - 33*i
        let targetYBottom = (navbar.getBoundingClientRect().bottom - this.navItems[i].getBoundingClientRect().bottom)
        let targetYActive = (this.navItems[this.activeId].getBoundingClientRect().top - titleContainer.getBoundingClientRect().height - 60) - 33*i

        if(i < this.activeId) {
          this.categories[i].classList.add('hidden')
          Tweenmax.to(this.navItems[i], 1.2, {y: -targetYTop, ease: Expo.easeOut})
        }
        else if(i > this.activeId) {
          this.categories[i].classList.add('hidden')
          Tweenmax.to(this.navItems[i], 1.2, {y: targetYBottom, ease: Expo.easeOut})
        }
        else {

        }
        Tweenmax.to(this.navItems[this.activeId], 1.2, {y: -targetYActive, ease: Expo.easeOut})
      }

      Emitter.emit(DETAIL_CLICK)
      this.$el.classList.add('open')

      openTl
        .fromTo(categoryElts[0], 0.3, {opacity: 1, y: 0}, {opacity: 0, y: -20, ease: Expo.easeOut})
        .fromTo(categoryElts[1], 0.3, {opacity: 1, y: 0}, {opacity: 0, y: -10, ease: Expo.easeOut}, 0.3)
        .fromTo(categoryElts[2], 0.3, {opacity: 1, y: 0}, {opacity: 0, y: 10, ease: Expo.easeOut}, 0)

    },

    fadeOutCategories(selected, n) {
      this.selectedDetail = selected
      this.activeItem = n
      this.navItems[this.activeItem].classList.add('active')
      Emitter.emit(DETAIL_CLICK)
      // this.fadeOutTl = new TimelineMax({onComplete: this.changeContent})
      // this.fadeOutTl
      //   .staggerFromTo(this.$refs.contentinfos, 0.4, {opacity: 1, ease: Expo.easeOut}, {opacity: 0, ease: Expo.easeOut}, -0.1)
      //   .to(this.$el, 0.4, {css:{width: '50%'}, ease: Expo.easeOut})
    },

    changeContent() {
      this.categoriesDisplayed = false
      this.detailDisplayed = true
      // this.fadeInTl = new TimelineMax()
      // this.fadeInTl
      //   .staggerFromTo(this.$refs.details.children, 0.5, {opacity: 0,x:-10, ease: Expo.easeOut}, {opacity: 1,x:0, ease: Expo.easeOut}, 0.1)
    },

    goBackToCategories() {
      if(this.detailDisplayed == true) {
        // this.leaveDetailTl = new TimelineMax({onComplete: this.displayCategories})
        // this.leaveDetailTl
        //   .staggerFromTo(this.$refs.details.children, 0.5, {opacity: 1,x:0, ease: Expo.easeOut}, {opacity: 0,x:-10, ease: Expo.easeOut}, 0.1)
        // this.categoriesDisplayed = true
        // this.detailDisplayed = false
      }
    },

    displayCategories() {
      this.fadeOutTl.reverse()
      this.navItems[this.activeItem].classList.remove('active')
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
        console.log("1: ", this.categories[i].style.top);
        console.log("1: ", this.categories[i].style.top);
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

    onWindowResize ({width, height}) {

    }
  },

  components: {
  }
})

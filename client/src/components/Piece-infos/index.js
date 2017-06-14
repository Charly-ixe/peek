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
      let categoryElt = event.toElement.previousElementSibling
      console.log(categoryElt);
      categoryElt.innerHTML = ""
      categoryElt.innerHTML = selected.content
    },

    fadeOutCategories(selected, n) {
      this.selectedDetail = selected
      this.activeItem = n
      this.navItems[this.activeItem].classList.add('active')
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

    goBackToCategories() {
      if(this.detailDisplayed == true) {
        this.leaveDetailTl = new TimelineMax({onComplete: this.displayCategories})
        this.leaveDetailTl
          .staggerFromTo(this.$refs.details.children, 0.5, {opacity: 1,x:0, ease: Expo.easeOut}, {opacity: 0,x:-10, ease: Expo.easeOut}, 0.1)
        this.categoriesDisplayed = true
        this.detailDisplayed = false
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

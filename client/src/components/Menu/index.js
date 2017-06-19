import EventManagerMixin from 'mixins/EventManagerMixin'
import scope from 'utils/generic/scope'

import {
  WINDOW_RESIZE
} from 'config/messages'

export default Vue.extend({

  name: 'Menu',

  mixins: [EventManagerMixin],

  template: require('./template.html'),

  domEvents: [],

  emitterEvents: [{
    message: WINDOW_RESIZE,
    method: 'onWindowResize'
  }],

  data () {
    return {
      openedMenu: false
    }
  },

  created () {
  },

  mounted () {
  },

  beforeDestroy () {
  },

  methods: {

    createTls () {
    },

    onMenuClick() {
      if (!this.openedMenu){
        // this.$refs.menuBtn.childNodes[2].style.marginRight = "17px"
        this.$refs.overlayMenu.className = "menu__overlay-button opened"
        this.$refs.menuBtn.className = "menu__button opened"
        this.$refs.menuBtn.childNodes[2].innerHTML = "fermer"
        this.$refs.menuBtn.childNodes[0].style.width = "22px"
        this.openedMenu = true
      } else {
        // this.$refs.menuBtn.childNodes[2].style.marginRight = "10px"
        this.$refs.overlayMenu.className = "menu__overlay-menu"
        this.$refs.menuBtn.className = "menu__button"
        this.$refs.menuBtn.childNodes[0].style.width = "29px"
        this.$refs.menuBtn.childNodes[2].innerHTML = "menu"
        this.openedMenu = false
      }
    },

    onWindowResize ({width, height}) {

    }
  },

  components: {
  }
})

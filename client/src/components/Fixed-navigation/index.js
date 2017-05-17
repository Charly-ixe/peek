import EventManagerMixin from 'mixins/EventManagerMixin'
import scope from 'utils/generic/scope'

import {
  WINDOW_RESIZE
} from 'config/messages'

export default Vue.extend({

  name: 'fixed-navigation',

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

    onWindowResize ({width, height}) {

    }
  },

  components: {
  }
})

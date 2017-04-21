import EventManagerMixin from 'mixins/EventManagerMixin'
import scope from 'utils/generic/scope'

import {
  WINDOW_RESIZE
} from 'config/messages'

export default Vue.extend({

  name: 'tutorial-step',

  mixins: [EventManagerMixin],

  template: require('./template.html'),

  domEvents: [],

  emitterEvents: [{
    message: WINDOW_RESIZE,
    method: 'onWindowResize'
  }],

  data () {
    return {
      index : 0,
      image : '',
      title : '',
      subtitle: ''
    }
  },

  created () {
  },

  mounted () {
  },

  computed: {
    visible() {
      return this.index === this.$parent.index
    }
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

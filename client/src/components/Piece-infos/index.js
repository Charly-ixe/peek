import EventManagerMixin from 'mixins/EventManagerMixin'
import scope from 'utils/generic/scope'

import {
  WINDOW_RESIZE
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
      currentPiece: {}
    }
  },

  created () {
  },

  mounted () {
    this.currentPiece = this.pieces[this.index]
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

    onWindowResize ({width, height}) {

    }
  },

  components: {
  }
})

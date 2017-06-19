import EventManagerMixin from 'mixins/EventManagerMixin'
import scope from 'utils/generic/scope'
import Emitter from 'helpers/Emitter'

import {
  WINDOW_RESIZE,
  NEXT_STEP_TUTO_SUB
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
      video : '',
      title : '',
      subtitle: ''
    }
  },

  created () {
  },

  mounted () {
    let _this = this
    Vue.nextTick(()=> {
      this.videos = document.querySelectorAll('video.video-tuto')
      if (this.index == 0) {
          this.videos[this.index].play()
      }
      this.videos[this.index].addEventListener("ended", ()=> {
        Emitter.emit('NEXT_STEP_TUTO_SUB')
      })
    })
  },

  computed: {
    visible: function() {
      return this.index === this.$parent.index
    }
  },

  beforeDestroy () {
  },

  methods: {

    createTls () {
    },

    onWindowResize ({width, height}) {

    },
    playVideoAtIndex(i) {
      this.videos[i].play()
    }
  },

  components: {
  }
})

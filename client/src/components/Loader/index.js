import EventManagerMixin from 'mixins/EventManagerMixin'
import scope from 'utils/generic/scope'
import Tweenmax from 'gsap'

import {
  WINDOW_RESIZE,
  RESSOURCES_PROGRESS
} from 'config/messages'

export default Vue.extend({

  name: 'loader',

  mixins: [EventManagerMixin],

  template: require('./template.html'),

  domEvents: [],

  emitterEvents: [{
    message: WINDOW_RESIZE,
    method: 'onWindowResize'
  },
  {
    message: RESSOURCES_PROGRESS,
    method: 'onResourceProgress'
  }],

  data () {
    return {
      progress: 0
    }
  },

  created () {
    this.tweenProgress = 0
    this.canTween = true
  },

  mounted () {

  },

  beforeDestroy () {
  },

  methods: {

    createTls () {
    },

    onWindowResize ({width, height}) {

    },

    onResourceProgress( p ) {
      this.progress = Math.ceil( p * 100 )

      Tweenmax.to(this.$refs.bar, 0.2, {scaleX: p, ease: Expo.easeOut})

      if( this.progress === 100 ) {

        Tweenmax.to(this, 0.1, { tweenProgress: this.progress, onUpdate: () => {
          this.progress = Math.ceil( this.tweenProgress )
        }})
      }
      else if ( this.progress <= 100 ) {

        Tweenmax.to(this, 0.5, { tweenProgress: this.progress, onUpdate: () => {
          this.progress = Math.ceil( this.tweenProgress )
        }})
      } else {

        this.progress = 0
        this.tweenProgress = 0
      }

    }
  },

  components: {
  }
})

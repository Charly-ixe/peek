import EventManagerMixin from 'mixins/EventManagerMixin'
import AssetsLoaderMixin from 'mixins/AssetsLoaderMixin'
import { home as assets } from 'config/manifestLoader'
import { scope } from 'utils/generic'
import States from 'core/States'

import {
} from 'config/messages'

import TutorialSlider from 'components/Tutorial-slider'

export default Vue.extend({

  name: 'submission',

  mixins: [EventManagerMixin, AssetsLoaderMixin],

  template: require('./template.html'),

  autoLoad: true,

  assets,

  emitterEvents: [],

  data () {
    return {
    }
  },

  created () {
    document.title = `Submission - ${States.metas.baseTitle}`

    scope(this, [
      'createTls'
    ])
  },

  mounted () {
    this.createTls()
  },

  beforeDestroy () {
  },

  methods: {

    createTls () {
      this.enterTl = new TimelineMax({paused: true})
    }

  },

  components: {
    'tutorial-slider-component': TutorialSlider
  }
})

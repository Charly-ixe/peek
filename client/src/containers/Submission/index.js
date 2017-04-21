import EventManagerMixin from 'mixins/EventManagerMixin'
import AssetsLoaderMixin from 'mixins/AssetsLoaderMixin'
import { home as assets } from 'config/manifestLoader'
import { scope } from 'utils/generic'
import States from 'core/States'

import {
} from 'config/messages'

import content from 'data/content'

import TutorialSlider from 'components/Tutorial-slider'
import TutorialStep from 'components/Tutorial-step'

export default Vue.extend({

  name: 'submission',

  mixins: [EventManagerMixin, AssetsLoaderMixin],

  template: require('./template.html'),

  autoLoad: true,

  assets,

  emitterEvents: [],

  data () {
    return {
      steps: content.tuto_steps
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
    'tutorial-slider-component': TutorialSlider,
    'tutorial-step-component': TutorialStep
  }
})

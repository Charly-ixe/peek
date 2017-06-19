import EventManagerMixin from 'mixins/EventManagerMixin'
import scope from 'utils/generic/scope'

import {
  WINDOW_RESIZE,
  NEXT_STEP_TUTO_SUB
} from 'config/messages'

import content from 'data/content';

export default Vue.extend({

  name: 'tutorial-slider',

  mixins: [EventManagerMixin],

  template: require('./template.html'),

  domEvents: [],

  emitterEvents: [{
    message: WINDOW_RESIZE,
    method: 'onWindowResize'
  },
  {
    message: NEXT_STEP_TUTO_SUB,
    method: 'nextStep'
  }],

  data () {
    return {
      index: 0,
      slides: [],
      steps: content.tuto_sub_steps
    }
  },

  created () {
  },

  mounted () {
    this.slides = this.$children
    this.slides.forEach((slide, i) => {
      slide.index = i
      slide.video = content.tuto_sub_steps[i].image
      slide.title = content.tuto_sub_steps[i].title
      slide.subtitle = content.tuto_sub_steps[i].subtitle
    })
    this.pagination = document.querySelector('.tutorial-slider__pagination')
  },

  computed: {
    slidesCount() {
      return this.slides.length
    }

  },

  beforeDestroy () {
  },

  methods: {

    createTls () {
    },

    nextStep() {
      this.index++

      if(this.index > this.slidesCount - 1) {
        this.index = 0
      }
      this.$children[this.index].playVideoAtIndex(this.index)
    },

    onWindowResize ({width, height}) {

    }
  },

  components: {
  }
})

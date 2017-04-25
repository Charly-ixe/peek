import EventManagerMixin from 'mixins/EventManagerMixin'
import scope from 'utils/generic/scope'

import {
  WINDOW_RESIZE
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
  }],

  data () {
    return {
      index: 0,
      slides: [],
      steps: content.tuto_steps
    }
  },

  created () {
    setInterval(this.nextStep, 4000)
  },

  mounted () {
    this.slides = this.$children
    this.slides.forEach((slide, i) => {
      slide.index = i
      slide.image = content.tuto_steps[i].image
      slide.title = content.tuto_steps[i].title
      slide.subtitle = content.tuto_steps[i].subtitle
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
    },

    onWindowResize ({width, height}) {

    }
  },

  components: {
  }
})

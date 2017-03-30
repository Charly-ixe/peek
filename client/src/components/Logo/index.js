import EventManagerMixin from 'mixins/EventManagerMixin'

export default Vue.extend({

  name: 'logo',

  mixins: [EventManagerMixin],

  template: require('./template.html'),

  domEvents: [],

  emitterEvents: [],

  data () {
    return {
    }
  },

  created () {
  },

  mounted () {

  },

  beforeDestroy () {
  },

  methods: {

    enterAnimation () {
    },

    onLoaderIsHidding () {
      this.enterAnimation()
    }
  }
})

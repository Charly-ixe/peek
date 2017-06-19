import EventManagerMixin from 'mixins/EventManagerMixin'
import AssetsLoaderMixin from 'mixins/AssetsLoaderMixin'
import { details as assets } from 'config/manifestLoader'
import { scope } from 'utils/generic'
import States from 'core/States'

import {
} from 'config/messages'

import FixedNavigation from 'components/Fixed-navigation'
import MenuComponent from 'components/Menu'

export default Vue.extend({

  name: 'informations',

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
    document.title = `Informations - ${States.metas.baseTitle}`

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
    'fixed-navigation-component': FixedNavigation,
    'menu-component': MenuComponent
  }
})

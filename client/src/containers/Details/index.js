import EventManagerMixin from 'mixins/EventManagerMixin'
import AssetsLoaderMixin from 'mixins/AssetsLoaderMixin'
import { details as assets } from 'config/manifestLoader'
import { scope } from 'utils/generic'
import States from 'core/States'

import {
} from 'config/messages'

import FixedNavigation from 'components/Fixed-navigation'
import PieceInfos from 'components/Piece-infos'
import PieceSlider from 'components/Piece-slider'

import content from 'data/content'

export default Vue.extend({

  name: 'details',

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
    document.title = `Details - ${States.metas.baseTitle}`

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
    'piece-infos-component': PieceInfos,
    'piece-slider-component': PieceSlider
  }
})

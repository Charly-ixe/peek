import EventManagerMixin from 'mixins/EventManagerMixin'
import scope from 'utils/generic/scope'
import feathers from 'feathers/client'
import socketio from 'feathers-socketio/client'
import io from 'socket.io-client'

const socket = io('http://localhost:3030')
const app = feathers().configure(socketio(socket))
// Get the message service that uses a websocket connection
const getPeeksService = app.service('peeks')

import {
  WINDOW_RESIZE
} from 'config/messages'

export default Vue.extend({

  name: 'peeks-gallery',

  mixins: [EventManagerMixin],

  template: require('./template.html'),

  domEvents: [],

  emitterEvents: [{
    message: WINDOW_RESIZE,
    method: 'onWindowResize'
  }],

  data () {
    return {
      peeks: []
    }
  },

  created () {
  },

  mounted () {
    // Call the messages service on the server via websocket
      getPeeksService.find({}).then(result => {
        this.peeks = result.data
      })
      getPeeksService.on('created', function(message) {
        console.log('Someone peek an artwork', message);
      });
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

import EventManagerMixin from 'mixins/EventManagerMixin'
import AssetsLoaderMixin from 'mixins/AssetsLoaderMixin'
import { home as assets } from 'config/manifestLoader'
import { scope } from 'utils/generic'
import States from 'core/States'

import feathers from 'feathers/client'
import socketio from 'feathers-socketio/client'
import io from 'socket.io-client'

import Tweenmax from 'gsap'

import content from 'data/content'

import TutorialFirstRegSlider from 'components/Tutorial-first-reg-slider'
import TutorialStep from 'components/Tutorial-step'

const socket = io('http://localhost:3030')
const app = feathers().configure(socketio(socket))
// Get the message service that uses a websocket connection
const firstRegisterService = app.service('firstRegisters')

import Peeks from 'components/Peeks-gallery'

import {
} from 'config/messages'

import FixedNavigation from 'components/Fixed-navigation';

export default Vue.extend({

  name: 'home',

  mixins: [EventManagerMixin, AssetsLoaderMixin],

  template: require('./template.html'),

  autoLoad: true,

  assets,

  emitterEvents: [],

  data () {
    return {
      steps: content.tuto_first_reg_steps
    }
  },

  created () {
    document.title = `Home - ${States.metas.baseTitle}`

    scope(this, [
      'createTls'
    ])
  },

  mounted () {
    window.addEventListener('mouseup', this.handleFirstUserAction)
    this.createTls()
  },

  beforeDestroy () {
  },

  methods: {

    createTls () {
      this.enterTl = new TimelineMax({paused: true})
    },
    saveEmail () {
      let email = this.$refs.formEmail.value
      if ( email != "" && this.validateEmail(email)) {
        //send email
        firstRegisterService.create({ user_email: email });
        this.$refs.formEmail.value = ""
      }
    },
    validateEmail (email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    handleFirstUserAction () {
      Tweenmax.to(this.$refs.overlay, 1, {
        opacity: 0,
        ease:Power1.easeInOut,
        onStart: ()=> {
          // this.enterTl.play()
        },
        onComplete: ()=> {
          this.$refs.overlay.style.display = "none"
        }
      })
    }

  },

  components: {
    'tutorial-slider-component': TutorialFirstRegSlider,
    'tutorial-step-component': TutorialStep
  }
})

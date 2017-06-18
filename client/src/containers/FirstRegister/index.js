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
    window.addEventListener('keyup', this.onKeyDown)
    this.createTls()
  },

  beforeDestroy () {
  },

  methods: {

    createTls () {
      this.badgeAppearCheck = new TimelineMax({paused: true})
      this.badgeAppearCheck
        .to(this.$refs.formWelcome, 0.5, {
          opacity: 0,
          ease:Power1.easeInOut
        })
        .to(this.$refs.formInput, 0.5, {
          opacity: 0,
          ease:Power1.easeInOut
        },"-=0.5")
        .to(this.$refs.formBraceletTxt, 0.5, {
          opacity: 0,
          ease:Power1.easeInOut
        },"-=0.5")
        .to(this.$refs.formBraceletCont, 0.5, {
          opacity: 0,
          ease:Power1.easeInOut
        },"-=0.5")
        .to(this.$refs.formBtn, 0.5, {
          opacity: 0,
          ease:Power1.easeInOut
        },"-=0.5")
        .to(this.$refs.formTitle, 0.5, {
          opacity: 0,
          ease:Power1.easeInOut,
          onComplete:()=> {
            this.$refs.formTitle.innerHTML = "Badgez votre bracelet"
            Tweenmax.to(this.$refs.formTitle, 0.5, {
              opacity: 1,
              ease: Power1.easeInOut
            })
          },
          onReverseComplete:()=> {
            console.log("on reverse complete");
            this.$refs.formTitle.innerHTML = "Enregistrez vous"
            this.$refs.formEmail.value = this.returnEmail()
          }
        },"-=0.5")
        .to(this.$refs.formDescr, 0.5, {
          opacity: 0,
          ease:Power1.easeInOut,
          onComplete:()=> {
            this.$refs.formDescr.innerHTML = "Passez votre bracelet devant la borne à votre droite </br> et attendez le retour lumineux."
            Tweenmax.to(this.$refs.formDescr, 0.5, {
              opacity: 1,
              ease: Power1.easeInOut
            })
          },
          onReverseComplete:()=> {
            console.log("on reverse complete");
            this.$refs.formDescr.innerHTML = "Entrez votre adresse mail afin d'y associer votre bracelet. Nous vous enverrons un seul mail afin d'activer votre compte."
          }
        },"-=0.5")
        .to(this.$refs.returnBtn, 0.5, {
          opacity: 1,
          ease:Power1.easeInOut
        })

    },
    saveEmail () {
      this.email = this.$refs.formEmail.value
      if ( this.email != "" && this.validateEmail(this.email)) {
        //send email
        // firstRegisterService.create({ user_email: email });
        this.$refs.formEmail.value = ""
        this.badgeAppearCheck.play()
      }
    },
    returnEmail() {
      return this.email
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
    },
    onKeyDown() {
      if (this.validateEmail(this.$refs.formEmail.value)) {
        console.log("email validé");
        this.$refs.formCheck.className = "first-register__form-check display"
      } else {
        this.$refs.formCheck.className = "first-register__form-check"
      }
    },
    onReturnClick() {
      this.badgeAppearCheck.reverse()
    }

  },

  components: {
    'tutorial-slider-component': TutorialFirstRegSlider,
    'tutorial-step-component': TutorialStep
  }
})

import EventManagerMixin from 'mixins/EventManagerMixin'
import scope from 'utils/generic/scope'

import {
  WINDOW_RESIZE
} from 'config/messages'

// import content from 'data/content'

export default Vue.extend({

  name: 'subdetails',

  mixins: [EventManagerMixin],

  template: require('./template.html'),

  domEvents: [],

  emitterEvents: [{
    message: WINDOW_RESIZE,
    method: 'onWindowResize'
  }],

  data () {
    return {
      index: null,
      content: []
    }
  },

  created () {
  },

  mounted () {
    Vue.nextTick(() => {
      // this.organizeSubdetails()
    })
  },

  beforeDestroy () {
  },

  methods: {

    createTls () {
    },

    organizeSubdetails() {
      for(let i = 0; i < this.content.length; i++) {
        this.generateHTML(this.content[i])
      }
    },

    generateHTML(subdetail) {
      if(subdetail.type == "text") {
        this.$el.innerHTML += "<p>" + subdetail.content + "</p>"
      }
      else if (subdetail.type == "video") {
        this.$el.innerHTML += "<div class='subdetails__video-container'><video src='" + subdetail.url +"' class='subdetails__video' ref='subvideo'></video><div class='subdetails__video-play-button' @click='handleVideoPlayButton'></div></div>"
        this.$el.innerHTML += "<p class='subdetails__credits left'>" + subdetail.credits + "</p>"
      }
      else if(subdetail.type == "quote") {
        this.$el.innerHTML += "<div class='subdetails__quote'>" + subdetail.content + "</div>"
        this.$el.innerHTML += "<p class='subdetails__credits center'>" + subdetail.credits + "</p>"
      }
      else if(subdetail.type == "link") {
        this.$el.innerHTML += "<h4 class='subdetails__outro'>Aller plus loin</h4><div class='subdetails__link'>" + subdetail.name + "</div>"
      }
      else if(subdetail.type == "image") {
        this.$el.innerHTML += "<div class='subdetails__image-container'><img src='" + subdetail.url + "'>"
        this.$el.innerHTML += "<p class='subdetails__credits center'>" + subdetail.credits + "</p>"
      }
      else if(subdetail.type == "audio") {
        this.$el.innerHTML += "Audio"
      }
    },

    handleVideoPlayButton() {
      if(this.$refs.subvideo[0].paused) {
        this.$refs.subvideo[0].play()
        this.$refs.playbutton[0].classList.add('hidden')
        this.$refs.subvideo[0].classList.add('clickable')
      }
    },

    handleVideoClick() {
      if (!this.$refs.subvideo[0].paused) {
        this.$refs.subvideo[0].pause()
        this.$refs.playbutton[0].classList.remove('hidden')
        this.$refs.subvideo[0].classList.remove('clickable')
      }
    },

    onWindowResize ({width, height}) {

    }
  },

  components: {
  }
})

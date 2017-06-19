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
      this.organizeSubdetails()
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
        this.$el.innerHTML += "<video src='" + subdetail.url +"' class='infos-zone__video' controls></video>"
        this.$el.innerHTML += "<p class='infos-zone__credits left'>" + subdetail.credits + "</p>"
      }
      else if(subdetail.type == "quote") {
        this.$el.innerHTML += "<div class='infos-zone__quote'>" + subdetail.content + "</div>"
        this.$el.innerHTML += "<p class='infos-zone__credits center'>" + subdetail.credits + "</p>"
      }
      else if(subdetail.type == "link") {
        this.$el.innerHTML += "<h4 class='infos-zone__outro'>Aller plus loin</h4><div class='infos-zone__link'>" + subdetail.name + "</div>"
      }
      else if(subdetail.type == "image") {
        this.$el.innerHTML += "<div class='infos-zone__image-container'><img src='" + subdetail.url + "'>"
        this.$el.innerHTML += "<p class='infos-zone__credits center'>" + subdetail.credits + "</p>"
      }
      else if(subdetail.type == "audio") {
        this.$el.innerHTML += "Audio"
      }
    },

    onWindowResize ({width, height}) {

    }
  },

  components: {
  }
})

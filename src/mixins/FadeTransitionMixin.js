const FadeTransitionMixin = {

  methods: {

    beforeEnter: function (el) {
    },

    enter: function (el, done) {
      TweenMax.fromTo(el, 2, {
        opacity: 0
      }, {
        delay: 0.5,
        opacity: 1,
        ease: Expo.easeOut,
        onComplete: done
      })
    },

    leave: function (el, done) {
      TweenMax.fromTo(el, 2, {
        opacity: 1
      }, {
        opacity: 0,
        ease: Expo.easeOut,
        onComplete: done
      })
    }

  }

}

export default FadeTransitionMixin

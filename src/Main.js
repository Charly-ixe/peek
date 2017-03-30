import Application from 'containers/Application'

import Router from 'core/Router'

import 'stylesheets/main.styl'

import domready from 'domready'

class Main {

  constructor () {
    this.bind()

    this.addEventListeners()

    this.router = Router

    this.start()
  }

  bind () {}

  addEventListeners () {}

  start () {
    this.app = new Application().$mount('#application')
  }
}

domready(() => {
  new Main() // eslint-disable-line
})

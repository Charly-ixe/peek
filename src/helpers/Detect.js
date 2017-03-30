import MobileDetect from 'mobile-detect'
import browser from 'detect-browser'

import Sniffr from 'sniffr'
class Detect {

  constructor () {
    this.userAgent = window.navigator.userAgent
    this.mobileDetect = new MobileDetect(this.userAgent)
    this.sniffr = new Sniffr()
    this.device = this.getDeviceType()
    this.browser = browser.name

    this.sniffr.sniff(this.userAgent)
    this.os = this.sniffr.os
    this.model = this.sniffr.device

    this.isDesktop = (this.device === 'desktop')
    this.isTablet = (this.device === 'tablet')
    this.isMobile = (this.device === 'mobile')

    window.Detect = this
  }

  getDeviceType () {
    if (this.mobileDetect.tablet()) {
      return 'tablet'
    } else if (this.mobileDetect.mobile()) {
      return 'mobile'
    } else {
      return 'desktop'
    }
  }

  getOs () {
    ua = detect.parse(navigator.userAgent)

    os = ua.os.family.split(' ').join('').toLowerCase()

    if (os.indexOf('win') !== -1) {
      this.os = 'windows'
    } else if (os.indexOf('mac') !== -1) {
      this.os = 'mac'
    } else if (os.indexOf('x11') !== -1) {
      this.os = 'unix'
    } else if (os.indexOf('linux') !== -1) {
      this.os = 'linux'
    } else if (os.indexOf('ios') !== -1) {
      this.os = 'ios'
    } else if (os.indexOf('android') !== -1) {
      this.os = 'android'
    } else {
      this.os = 'unknown-os'
    }
  }

  isIE () {
    return (this.userAgent.indexOf('MSIE ') > 0 || this.userAgent.indexOf('Trident/') > 0 || this.userAgent.indexOf('Edge/') > 0)
  }

  addClasses () {
    document.body.classList.add('browser-' + this.browser)
    document.body.classList.add('device-' + this.device)
    document.body.classList.add('os-' + this.os.name)
    document.body.classList.add('model-' + this.model.name.toLowerCase())
  }
}

export default new Detect()

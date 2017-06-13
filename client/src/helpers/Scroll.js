import Smooth from 'helpers/smooth-scrolling'
import Emitter from 'helpers/Emitter'
import {
  SCROLL_STARTED_ALL_EXP,
  SCROLL_ZERO_ALL_EXP
} from 'config/messages'

class Parallax extends Smooth {

    constructor(opt) {

        super(opt)

        this.createExtraBound()

        this.resizing = false
        this.scrollStarted = false
        this.cache = null
        this.dom.divs = Array.prototype.slice.call(opt.divs, 0)
    }

    createExtraBound() {

        ['getCache', 'inViewport']
        .forEach((fn) => this[fn] = this[fn].bind(this))
    }

    resize() {

        this.resizing = true

        this.getCache()
        super.resize()

        this.resizing = false
    }

    calc(e) {

        const delta = this.vars.direction == 'horizontal' ? e.deltaX : e.deltaY

        this.vars.target += e.originalEvent.deltaY + e.originalEvent.deltaX
        // console.log(e.originalEvent);
        this.vars.bounding = this.dom.section.getBoundingClientRect().width
        this.clampTarget()
        this.checkScroll()
    }

    checkScroll() {
      let scrollPos = this.vars.target
      if (scrollPos != 0 && !this.scrollStarted) {
        Emitter.emit('SCROLL_STARTED_ALL_EXP')
        this.scrollStarted = true
      }
      if(scrollPos < 20 && this.scrollStarted) {
        Emitter.emit('SCROLL_ZERO_ALL_EXP')
        this.scrollStarted = false
      }
    }

    getCache() {

        this.cache = []

        const unit = (this.vars.width / 3)

        this.dom.divs.forEach((el, index) => {

            // el.style.display = 'inline-block'
            // el.style.transform = 'none'
            // el.style.width = `${unit}px`

            const scrollX = this.vars.target
            const bounding = el.getBoundingClientRect()
            const bounds = {
                el: el,
                state: true,
                left: bounding.left + scrollX,
                right: bounding.right + scrollX,
                center: unit / 2
            }

            this.cache.push(bounds)
        })

        // this.dom.section.style.width = `${this.vars.width}px`
        // this.vars.bounding = (unit * this.dom.divs.length) - this.vars.width

    }

    run() {

        this.dom.divs.forEach(this.inViewport);

        this.dom.section.style[this.prefix] = this.getTransform(this.vars.current * -1)

        super.run()
    }

    clampTarget() {

        this.vars.target = Math.round(Math.max(0, Math.min(this.vars.target, this.vars.bounding)))
    }

    inViewport(el, index) {

        if(!this.cache || this.resizing) return

        const cache = this.cache[index]
        const current = this.vars.current
        const left = Math.round(cache.left - current)
        const right = Math.round(cache.right - current)
        const inview = right > 0 && left < this.vars.width

        if(inview) {
          // entrée / sortie d'anim

        } else {


        }
    }
}

export default Parallax

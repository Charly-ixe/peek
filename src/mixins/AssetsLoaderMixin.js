import States from 'core/States'
import AssetsLoader from 'assets-loader'
import Emitter from 'helpers/Emitter'

import manifestLoader from 'config/manifestLoader'

import {
  MODEL_READY,
  RESOURCES_READY,
  LOADER_TOGGLE
} from 'config/messages'

const AssetsLoaderMixin = {

  autoLoad: false,

  assets: [],

  data () {
    return {
      assetsIsLoaded: false,
      resources: []
    }
  },

  created () {
    this.initLoader()
  },

  methods: {

    initLoader () {
      const assets = this.$options.assets
      this.loader = AssetsLoader({ assets, crossOrigin: 'anonymous' })
      this.loader
          .on('complete', assets => {
            assets.forEach(({ id, file }) => { this.resources[id] = file })

            this.assetsIsLoaded = true
            States.resources = this.resources
            this.onAssetsLoaded()
            Emitter.emit(RESOURCES_READY)
            // Emitter.emit(LOADER_TOGGLE, false)
          })

      if (!States.defaultBatchLoaded) {
        for (let i = 0, l = manifestLoader.default.length; i < l; i++) {
          this.loader.add(manifestLoader.default[i])
        }
      }

      if (this.$options.autoLoad) {
        this.loadAssets()
      }
    },

    loadAssets () {
      if (States.modelReady) {
        this.doLoad()
      } else {
        Emitter.on(MODEL_READY, this.doLoad.bind(this))
      }
    },

    doLoad () {
      this.loader.start()
      States.defaultBatchLoaded = true
    },

    onAssetsLoaded () {
    }
  }
}

export default AssetsLoaderMixin

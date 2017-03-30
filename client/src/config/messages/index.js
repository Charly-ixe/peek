import global from './global'
import models from './models'
import webGL from './webGL'

const messages = {
  ...global,
  ...models,
  ...webGL
}

module.exports = messages

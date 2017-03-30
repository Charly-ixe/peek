import parseDefault from './parse-default'
import capitalize from 'lodash.capitalize'

export default function parseNumber (folder, object, property, propertyName) {
  switch (propertyName) {
    case 'shading':
      folder.add(object, propertyName, { 'FlatShading': THREE.FlatShading, 'SmoothShading': THREE.SmoothShading })
        .name(capitalize(propertyName))
        
      break
    case 'intensity':
      folder.add(object, propertyName, 0, 5, 0.01)
        .name(capitalize(propertyName))
        
      break
    case 'angle':
      folder.add(object, propertyName, 0.01, Math.PI / 2, 0.01)
        .name(capitalize(propertyName))
        
      break
    default:
      parseDefault(folder, object, property, propertyName)
  }
}

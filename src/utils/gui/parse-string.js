import parseDefault from './parse-default'
import capitalize from 'lodash.capitalize'

export default function parseString (folder, object, property, propertyName) {
  if (property.charAt(0) === '#') { // Hexa color
    folder.addColor(object, propertyName)
      .name(capitalize(propertyName))
      
  } else { // Default
    parseDefault(folder, object, property, propertyName)
  }
}

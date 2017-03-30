import GUI from 'helpers/GUI'
import capitalize from 'lodash.capitalize'
import * as parseFunctions from './parse-functions'

export default function parseObject ({ object, propertiesWhitelist = [], folder = GUI.addFolder('Default'), folderName = null }) {
  if (!folderName) {
    folderName = object.type
  }

  const objectFolder = folder.addFolder(folderName)

  for (let propertyName in object) {
    const property = object[propertyName]

    if (propertiesWhitelist.indexOf(propertyName) !== -1 && typeof property !== 'undefined' || !propertiesWhitelist.length) {
      const constructorName = property.constructor.name
      const parseFunctionName = `parse${capitalize(constructorName)}`
      const parseFunction = parseFunctions[parseFunctionName]

      if (typeof parseFunction !== 'undefined') {
        parseFunction(objectFolder, object, property, propertyName)
      } else {
        console.error(`[parseObject] Undefined parse function for '${constructorName}'`)
      }
    }
  }

  return objectFolder
}

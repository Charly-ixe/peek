import capitalize from 'lodash.capitalize'

export default function parseDefault (folder, object, property, propertyName) {
  folder.add(object, propertyName).name(capitalize(propertyName))
}

import capitalize from 'lodash.capitalize'

export default function parseVector2 (folder, object, property, propertyName) {
  const vec2Folder = folder.addFolder(capitalize(propertyName))
  vec2Folder.add(property, 'x').name('X').step(0.1)
  vec2Folder.add(property, 'y').name('Y').step(0.1)
}

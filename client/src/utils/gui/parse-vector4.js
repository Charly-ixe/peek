import capitalize from 'lodash.capitalize'

export default function parseVector4 (folder, object, property, propertyName) {
  const vec4Folder = folder.addFolder(capitalize(propertyName))
  vec4Folder.add(property, 'x').name('X').step(0.1)
  vec4Folder.add(property, 'y').name('Y').step(0.1)
  vec4Folder.add(property, 'z').name('Z').step(0.1)
  vec4Folder.add(property, 'w').name('W').step(0.1)
}

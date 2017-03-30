import capitalize from 'lodash.capitalize'

export default function parseVector3 (folder, object, property, propertyName) {
  const vec3Folder = folder.addFolder(capitalize(propertyName))
  vec3Folder.add(property, 'x').name('X').step(0.1)
  vec3Folder.add(property, 'y').name('Y').step(0.1)
  vec3Folder.add(property, 'z').name('Z').step(0.1)
}

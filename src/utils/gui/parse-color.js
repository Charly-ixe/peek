import capitalize from 'lodash.capitalize'

export default function parseColor (folder, object, property, propertyName) {
  folder.addColor({ color: '#' + property.getHexString() }, 'color')
    .name(capitalize(propertyName))
    
    .onChange(color => {
      object[propertyName] = new THREE.Color(color)
    })
}

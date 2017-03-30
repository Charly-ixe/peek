import dat from 'dat'

const GUI = new dat.GUI({
  autoPlace: false,
  scrollable: true
})

document.body.appendChild(GUI.domElement)
GUI.domElement.classList.add('hide')

window.onkeyup = function (event) {
  if (event.keyCode === 49) {
    GUI.domElement.classList.toggle('hide')
  }
}

export default GUI

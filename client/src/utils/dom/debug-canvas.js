export default function debugCanvas (canvas) {
  canvas.style.position = 'absolute'
  canvas.style.top = 0
  canvas.style.left = 0
  canvas.style.zIndex = 10
  canvas.style.pointerEvents = 'none'

  document.body.appendChild(canvas)
}


const getCanvas = (() => {
  let canvas = null

  /**
   * @param {number} width
   * @param {number} height
   * @returns {HTMLCanvasElement}
   */
  function getCanvas (width, height) {
    if (canvas === null) {
      canvas = document.createElement('canvas')
    }

    canvas.setAttribute('width', width)
    canvas.setAttribute('height', height)

    return canvas
  }

  return getCanvas
})()

/**
 * @param {number} rate
 */
function getPixceler (rate = 300) {
  /**
   * @param {number} value
   */
  function mm (value) {
    return rate * value
  }
  return mm
}

export function getPlaceholderImage () {
  const mm = getPixceler(12)
  const width = mm(210)
  const height = mm(297)
  const canvas = getCanvas(width, height)
  const ctx = canvas.getContext('2d', {
    willReadFrequently: true
  })

  ctx.fillStyle = '#FFF'
  ctx.fillRect(0, 0, width, height)

  ctx.strokeStyle = 'red'
  ctx.lineWidth = mm(0.5)
  ctx.strokeRect(
    mm(6), mm(6),
    mm(210) - mm(12),
    mm(297) - mm(12)
  )

  ctx.fillStyle = '#000'
  ctx.font = `normal ${mm(7)}px sans-serif`
  ctx.fillText(
    'Hello World',
    mm(6),
    mm(6 + 7)
  )

  return ctx.getImageData(0, 0, width, height)
}

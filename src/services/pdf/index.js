import Pdf from 'jspdf'
import { getPlaceholderImage } from 'services/render'

/**
 *
 * @param {number} pageCount
 */
export function downloadPdf (pageCount = 1, {
  onUpdateProgress,
  onEnd
}) {
  if (typeof pageCount !== 'number') throw Error('Invalid type pageCount')

  let p = 0

  let pdf = null

  function end () {
    pdf.save(`sample_${new Date().toLocaleDateString()}_${new Date().toLocaleTimeString()}.pdf`)
    onEnd()
  }

  function step () {
    if (p > pageCount) return end()

    if (p > 0) pdf.addPage()
    const image = getPlaceholderImage()
    pdf.addImage(image, 'png', 0, 0, 210, 297)

    onUpdateProgress(p / pageCount)
    p += 1
    requestAnimationFrame(step)
  }

  function start () {
    pdf = new Pdf({
      format: 'a4'
    })
    requestAnimationFrame(step)
  }

  requestAnimationFrame(start)
}

import Pdf from 'jspdf'
import { getPlaceholderImage } from 'services/render'

function getProgressValue (parentValue, parentMax, childValue, childMax) {
  return (
    parentValue / parentMax +
    1 / parentMax * childValue / childMax
  )
}

function getProgress (parentValue, parentMax, childValue, childMax, message) {
  return {
    value: getProgressValue(parentValue, parentMax, childValue, childMax),
    message
  }
}

/**
 *
 * @param {number} pageCount
 */
export function * getGetPdfGenerator (pageCount = 1) {
  if (typeof pageCount !== 'number') throw Error('Invalid type pageCount')

  const images = []
  for (let i = 0; i < pageCount; i++) {
    const image = getPlaceholderImage()
    images.push(image)
    yield getProgress(0, 2, i, pageCount, `Image ${i + 1}/${pageCount}`)
  }

  const pdf = new Pdf({ format: 'a4' })
  for (const page in images) {
    const image = images[page]
    if (page > 0) pdf.addPage()
    pdf.addImage(image, 'png', 0, 0, 210, 297)
    yield getProgress(1, 2, page, images.length, `Pdf Page ${(+page + 1)}/${images.length}`)
  }

  return pdf
}

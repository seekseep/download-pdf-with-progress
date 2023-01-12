
/**
 * @param {Generator} generator
 * @param {{
 *   onEnd: (result) => void
 *   onProcess: (process) => void
 * }} events
 */
export function execGeneratorWithProgress (generator, { onEnd, onProcess }) {
  const result = generator.next()
  if (result.done) {
    onEnd(result.value)
    return
  }

  onProcess(result.value)
  requestAnimationFrame(() => execGeneratorWithProgress(generator, { onEnd, onProcess }))
}

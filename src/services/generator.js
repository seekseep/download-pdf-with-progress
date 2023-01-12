
/**
 * @param {Generator} generator
 * @param {{
 *   onProcess: (process) => void
 *   onSuccess: (result) => void
 * }} events
 */
export function execGeneratorWithProgress (generator, { onSuccess, onProcess }) {
  const result = generator.next()
  if (result.done) {
    onSuccess(result.value)
    return
  }

  onProcess(result.value)
  requestAnimationFrame(() => execGeneratorWithProgress(generator, { onSuccess, onProcess }))
}

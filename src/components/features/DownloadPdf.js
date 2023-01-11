import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { downloadPdf } from 'services/pdf'

function DownloadPdf () {
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm()
  const onSubmit = data => {
    setProgress(0)
    setIsLoading(true)
    downloadPdf(+data.pageCount, {
      onUpdateProgress: progress => setProgress(progress),
      onEnd: () => setIsLoading(false)
    })
  }

  return (
    <>
      <h1>DownloadPdf</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="pageCountInput">Page Count</label><br />
          <input id="pageCountInput" type="number" defaultValue={100} min={1} max={999} step={1} {...register('pageCount')} />
          {errors.pageCount && <p>{errors.pageCount}</p>}
        </div>
        {!isLoading && <button type="submit">Download</button>}
        {isLoading && (
          <>
            <div>{Math.floor(progress * 100)}%</div>
            <progress max="1" value={progress}>{Math.floor(progress * 100)}%</progress><br />
            <button disabled type="submit">Downloading</button>
          </>
        )}
      </form>
      <hr />
    </>
  )
}

export default DownloadPdf

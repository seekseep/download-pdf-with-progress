import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { downloadPdf } from 'services/pdf'

function DownloadPdf () {
  const [progress, setProgress] = useState(null)

  const { register, handleSubmit, formState: { errors } } = useForm()
  const onSubmit = data => {
    setProgress({ value: 0, message: '' })
    downloadPdf(+data.pageCount, {
      onProcess: (progress) => setProgress(progress),
      onSuccess: (pdf) => {
        pdf.save(`${new Date().getTime()}.pdf`)
        setProgress(null)
      }
    })
  }

  const isLoading = !!progress

  return (
    <>
      <h1>DownloadPdf</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="pageCountInput">Page Count</label><br />
          <input id="pageCountInput" type="number" defaultValue={50} min={1} max={999} step={1} {...register('pageCount')} />
          {errors.pageCount && <p>{errors.pageCount}</p>}
        </div>
        {!isLoading && <button type="submit">Download</button>}
        {isLoading && (
          <>
            <div>{Math.floor(progress.value * 100)}%</div>
            <div>{progress.message}</div>
            <progress max="1" value={progress.value}>{Math.floor(progress.value * 100)}%</progress><br />
            <button disabled type="submit">Downloading</button>
          </>
        )}
      </form>
      <hr />
    </>
  )
}

export default DownloadPdf

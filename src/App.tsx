import { useRef, useState } from 'react'
import { parseCsv, parseXlsx } from './utils'

function App() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [data, setData] = useState<unknown[]>([])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const file = e.target.files[0]
    const fileType = file.name.split('.')[1]

    if (fileType === 'csv') {
      setData(await parseCsv(file))
    } else if (fileType === 'xlsx') {
      setData(await parseXlsx(file))
    }

    //eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    fileInputRef.current!.value = ''
  }

  return (
    <div className='mt-16 flex flex-col items-center justify-center gap-6'>
      <input
        ref={fileInputRef}
        type='file'
        accept='.csv, .xlsx'
        onChange={handleFileChange}
        className='sr-only'
      />

      <button
        className='rounded-lg bg-black px-5 py-3 text-sm text-white transition-colors duration-300 ease-out hover:bg-zinc-600 focus:ring-2 focus:ring-slate-400 focus:ring-offset-2'
        onClick={() => fileInputRef.current?.click()}
      >
        Choose File
      </button>

      {data.length > 0 && (
        <pre className='whitespace-pre-wrap text-sm'>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  )
}

export default App

import { useRef, useState } from 'react'
import Papa from 'papaparse'
import { utils, read } from 'xlsx'

import { standardizeObjectPropNames } from './utils'

export type TObj = Record<string, string>

function App() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [data, setData] = useState<unknown[]>([])

  const parseCsv = (file: File) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: results =>
        setData(results.data.map(obj => standardizeObjectPropNames(obj as TObj))),
    })
  }

  const parseXlsx = async (file: File) => {
    const workbook = read(await file.arrayBuffer())
    const worksheet = workbook.Sheets[workbook.SheetNames[0]]

    const data = utils
      .sheet_to_json<TObj>(worksheet)
      .map(row => standardizeObjectPropNames(row))

    setData(data)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const file = e.target.files[0]
    const fileType = file.name.split('.')[1]

    if (fileType === 'csv') {
      parseCsv(file)
    } else if (fileType === 'xlsx') {
      parseXlsx(file)
    }

    //eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    fileInputRef.current!.value = ''
  }

  return (
    <div className='flex flex-col gap-6 justify-center items-center mt-8'>
      <input
        ref={fileInputRef}
        type='file'
        accept='.csv, .xlsx'
        onChange={handleFileChange}
        className='sr-only'
      />

      <button
        className='text-white text-sm bg-black px-5 py-3 rounded-lg focus:ring-2 focus:ring-offset-2 focus:ring-slate-400'
        onClick={() => fileInputRef.current?.click()}
      >
        Choose File
      </button>

      {data.length > 0 && <pre>{JSON.stringify(data)}</pre>}
    </div>
  )
}

export default App

import Papa from 'papaparse'
import { utils, read } from 'xlsx'
import { camelCase } from 'change-case'

type TObj = Record<string, string>

export const standardizeObjectPropNames = (obj: TObj) => {
  const standardizedObj: TObj = {}
  for (const key in obj) {
    // const objKey = key as keyof Data
    // need the above step if obj is a more specific type
    standardizedObj[camelCase(key)] = obj[key]
  }
  return standardizedObj
}

export const parseCsv = async (file: File) => {
  return new Promise<TObj[]>(resolve => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: results =>
        resolve(results.data.map(obj => standardizeObjectPropNames(obj as TObj))),
    })
  })
}

export const parseXlsx = async (file: File) => {
  const workbook = read(await file.arrayBuffer())
  const worksheet = workbook.Sheets[workbook.SheetNames[0]]

  const data = utils
    .sheet_to_json<TObj>(worksheet)
    .map(row => standardizeObjectPropNames(row))

  return data
}

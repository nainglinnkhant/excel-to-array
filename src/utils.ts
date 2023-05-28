import type { TObj } from './App'
import { camelCase } from 'change-case'

export const standardizeObjectPropNames = (obj: TObj) => {
  const standardizedObj: TObj = {}
  for (const key in obj) {
    // const objKey = key as keyof Data
    // need the above step if obj is a more specific type
    standardizedObj[camelCase(key)] = obj[key]
  }
  return standardizedObj
}

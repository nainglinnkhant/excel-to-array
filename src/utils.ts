import type { TObj } from './App'

export const standardizeObjectPropNames = (obj: TObj) => {
  const standardizedObj: TObj = {}
  for (const key in obj) {
    // const objKey = key as keyof Data
    // need the above step if obj is a more specific type
    standardizedObj[key.toLowerCase()] = obj[key]
  }
  return standardizedObj
}

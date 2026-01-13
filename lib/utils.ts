export const prettyJSON = (data: any) => {
  try {
    return JSON.stringify(data, null, 2)
  } catch {
    return ""
  }
}

export const isValidJSON = (text: string) => {
  try {
    JSON.parse(text)
    return true
  } catch {
    return false
  }
}

export const removeHttpFromUrl = (url: string): string => {
  return url.replace(/^http[s]?:\/\//i, "")
}
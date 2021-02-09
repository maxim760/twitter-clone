export const reduceWords = (word: string, length: number) => {
  return word.length <= length ? word : `${word.slice(0,length)}…`
}
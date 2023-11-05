export const escapeSpecialCharacters = (text) => {
  return String(text).replace(/([.*+?=^!:${}()|[\]\/\\])/g, '\\$1')
}

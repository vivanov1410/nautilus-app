export const shuffle = (arr) => {
  const tmp = [...arr]
  const result = []
  const inner = () => {
    if (tmp.length === 0) return result
    const randomIndex = Math.floor(Math.random() * tmp.length)
    result.push(tmp[randomIndex])
    tmp.splice(randomIndex, 1)

    return inner()
  }
  inner()

  return result
}

export default {}

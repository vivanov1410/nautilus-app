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

export const calculateDiagonalAngle = (width, height) => {
  const rad = Math.asin(width / Math.sqrt((width * width) + (height * height)))
  const deg = 90 - ((rad * 180) / Math.PI)

  return deg
}

export const prettifyImages = (data) => {
  const MIN_WIDTH = 200
  const MIN_HEIGHT = 200
  const MAX_WIDTH = 400

  let width = MIN_WIDTH
  let height = MIN_HEIGHT
  const images = data.map((x) => {
    width += 1
    if (width === MAX_WIDTH) {
      height += 1
      width = MIN_WIDTH
    }

    return {
      ...x,
      url: `https://source.unsplash.com/random/${width}x${height}`,
      width,
      height,
    }
  })

  return images
}

export default {}

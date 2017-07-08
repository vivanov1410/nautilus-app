import { shuffle, calculateDiagonalAngle } from '../app/utils'

describe('shuffle', () => {
  it('should randomly shuffle array', () => {
    const arr = [1, 2, 3, 4]
    const shuffled = shuffle(arr)

    expect(shuffled.length).toEqual(arr.length)
  })
})

describe('calculateDiagonalAngle', () => {
  it('should calculate angle of rectangle diagonal in degrees', () => {
    const angle = calculateDiagonalAngle(20, 20)

    expect(angle).toBeCloseTo(45, 5)
  })
})

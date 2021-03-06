import expect from '../index'

describe('toNotEqual', () => {
  it('works with arrays of objects', () => {
    const a = [
      {
        id: 0,
        text: 'Array Object 0',
        boo: false
      },
      {
        id: 1,
        text: 'Array Object 1',
        boo: false
      }
    ]

    const b = [
      {
        id: 0,
        text: 'Array Object 0',
        boo: true // value of boo is changed to true here
      },
      {
        id: 1,
        text: 'Array Object 1',
        boo: false
      }
    ]

    expect(a).toNotEqual(b)
  })

  if (typeof Map !== 'undefined') {
    it('works with Map', () => {
      const a = new Map()
      a.set('key', 'value')

      const b = new Map()
      b.set('key', 'another value')

      expect(a).toNotEqual(b)
    })
  }

  if (typeof Set !== 'undefined') {
    it('works with Set', () => {
      const a = new Set()
      a.add('a')

      const b = new Set()
      b.add('b')

      expect(a).toNotEqual(b)
    })
  }
})

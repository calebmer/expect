import expect from '../index'

describe('toInclude', () => {
  it('requires the actual value to be an array, object, or a string', () => {
    expect(() => {
      expect(1).toInclude(2)
    }).toThrow(/must be an array, object, or a string/)
  })

  it('does not throw when an array contains an expected integer', () => {
    expect(() => {
      expect([ 1, 2, 3 ]).toInclude(2)
      expect([ { a: 1 }, { c: 2 } ]).toInclude({ c: 2 })
    }).toNotThrow()
  })

  it('does not throw when an array contains an expected object', () => {
    expect(() => {
      expect([ { a: 1 }, { c: 2 } ]).toInclude({ c: 2 })
    }).toNotThrow()
  })

  it('does not throw when an object contains an expected key', () => {
    expect(() => {
      expect({ a: 1 }).toInclude('a')
    }).toNotThrow()
  })

  it('throws when an object contains an unexpected key', () => {
    expect(() => {
      expect({ a: 1 }).toInclude('b')
    }).toThrow(/to include/)
  })

  it('does not throw when an object contains an expected object', () => {
    expect(() => {
      expect({ a: 1, b: 2, c: 3 }).toInclude({ b: 2 })
    }).toNotThrow()
  })

  it('throws when an object does not contain an expected object', () => {
    expect(() => {
      expect({ a: 1, b: 2, c: 3 }).toInclude({ d: 4 })
    }).toThrow(/to include/)

    expect(() => {
      expect({ a: 1, b: 2, c: 3 }).toInclude({ b: 4 })
    }).toThrow(/to include/)
  })

  it('does not throw when an object contains an expected object in a deep key', () => {
    expect(() => {
      expect(
        { a: 1, b: 2, c: { d: 4, e: { f: 5, g: 6, h: 7 } } }
      ).toInclude(
        { b: 2, c: { e: { f: 5, g: 6, h: 7 } } }
      )
    }).toNotThrow()
  })

  it('throws when an object does not contain an expected object in a deep key', () => {
    expect(() => {
      expect(
        { a: 1, b: 2, c: { d: 4, e: { f: 5, g: 6, h: 7 } } }
      ).toInclude(
        { b: 2, c: { e: { f: 5, g: 999, h: 7 } } }
      )
    }).toThrow(/to include/)
  })

  it('throws when an array does not contain an expected integer', () => {
    expect(() => {
      expect([ 1, 2, 3 ]).toInclude(4)
    }).toThrow(/to include/)
  })

  it('throws when an array does not contain an expected object', () => {
    expect(() => {
      expect([ { a: 1 }, { c: 2 } ]).toInclude({ a: 2 })
    }).toThrow(/to include/)
  })

  it('does not throw when a string contains the expected value', () => {
    expect(() => {
      expect('hello world').toInclude('world')
    }).toNotThrow()
  })

  it('throws when a string does not contain the expected value', () => {
    expect(() => {
      expect('hello world').toInclude('goodbye')
    }).toThrow(/to include/)
  })
})

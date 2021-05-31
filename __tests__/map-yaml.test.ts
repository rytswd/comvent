import {mapToComventSetup} from '../src/step-1-config-prep/map-yaml'

describe('map-yaml', () => {
  test('valid empty YAML', () => {
    const input: Map<string, object> = new Map([
      //   ['version', ('0.2.0' as unknown) as object]
    ])
    const result = mapToComventSetup(input)
    expect(result).toMatchObject({
      keywords: new Map(),
      trigger: 'default',
      usersBlacklisted: [],
      usersWhitelisted: []
    })
  })
  test('valid YAML with just version', () => {
    const input: Map<string, object> = new Map([
      ['version', '0.2.0' as unknown as object]
    ])
    const result = mapToComventSetup(input)
    expect(result).toMatchObject({
      keywords: new Map(),
      trigger: 'default',
      usersBlacklisted: [],
      usersWhitelisted: []
    })
  })
  test('invalid version', () => {
    const input: Map<string, object> = new Map([
      ['version', '0.1.0' as unknown as object]
    ])
    expect(() => mapToComventSetup(input)).toThrow(
      "unexpected version '0.1.0' provided"
    )
  })
})

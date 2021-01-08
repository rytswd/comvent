import {exception} from 'console'
import * as yaml from 'js-yaml'

/**
 *
 * @param fileContent
 */
export function parseYAML(fileContent: string): Map<string, object> {
  const doc = yaml.load(fileContent)

  let data: Map<string, object> = new Map()

  switch (typeof doc) {
    case 'object':
      if (doc === null) break

      data = new Map(Object.entries(doc))
      break
    // either content is pure string or empty
    default:
      throw exception(`Unexpected data proovided: ${doc}`)
  }
  return data
}

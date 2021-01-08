import {comventComment, comventSetup} from '../util'

/**
 * check if comment matches with the provided config.
 * Return type is a map, and thus the config can have duplicating names,
 * which woould be overridden by subsequent check.
 * @param comment comment string
 * @param config config parsed and mapped to interface
 */
export function findMatches(
  comment: comventComment,
  config: comventSetup
): Map<string, boolean> {
  const result = new Map()

  for (const [name, regexValue] of config.keywords) {
    result.set(name, findMatch(comment.commentBody, regexValue))
  }

  return result
}

function findMatch(comment: string, keyword: string): boolean {
  const regexp = new RegExp(keyword)

  const lines = comment.split(/\r?\n/)
  let result = false

  for (const line of lines) {
    if (regexp.test(line)) result = true
  }

  return result
}

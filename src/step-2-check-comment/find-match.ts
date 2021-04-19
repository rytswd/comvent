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
): Map<string, string | undefined> {
  const result = new Map()

  for (const [name, regexValue] of config.keywords) {
    result.set(name, findMatch(comment.commentBody, regexValue))
  }

  return result
}

function findMatch(comment: string, keyword: string): string | undefined {
  const regexp = new RegExp(keyword, 'g')

  const lines = comment.split(/\r?\n/)

  for (const line of lines) {
    const [result] = line.matchAll(regexp)
    // No match found.
    if (!result) {
      continue
    }

    // Found a match, and no regexp group defined.
    if (result.length === 1 && result.input) {
      return result.input
    }

    // Found a match, and there is a regexp group.
    // Take the first match and return, as long as it's valid.
    if (result[1]) {
      return result[1]
    }

    // If the first group is an empty string, return the full match
    return result.input
  }

  return undefined
}

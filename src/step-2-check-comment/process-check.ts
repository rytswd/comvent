import * as core from '@actions/core'
import {comventSetup} from '../util'
import {getComment} from './get-comment'
import {findMatches} from './find-match'
import {isUserAllowed} from './check-user'

export function checkComment(config: comventSetup): void {
  const comment = getComment()
  if (!isUserAllowed(comment, config))
    // If the comment was submitted by unlisted user, return early.
    return

  let foundAny = false
  const foundKeywords = findMatches(comment, config)

  for (const [name, found] of foundKeywords) {
    if (!found) break

    foundAny = true
    core.setOutput(name, 'found')
  }

  // If any match found, set another special flag 'comvent-found-any-match' to
  // 'found', so that you can do some common prep work for all cases.
  if (foundAny) core.setOutput('comvent-found-any-match', 'found')
}

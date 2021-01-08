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

  const foundKeywords = findMatches(comment, config)

  // eslint-disable-next-line github/array-foreach
  foundKeywords.forEach((found: boolean, name: string) => {
    if (found) core.setOutput(name, 'found')
  })
}

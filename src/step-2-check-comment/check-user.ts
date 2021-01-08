import {comventComment, comventSetup} from '../util'

export function isUserAllowed(
  comment: comventComment,
  config: comventSetup
): boolean {
  let result = false
  if (config.trigger === 'specific') {
    // For specific trigger setup, check if username is listed.
    result = config.usersWhitelisted.includes(comment.username)
  } else {
    // For default setup, check if username is not blacklisted.
    result = !config.usersBlacklisted.includes(comment.username)
  }
  return result
}

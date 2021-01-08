import {readFileSync} from 'fs'
import {comventComment, hasProperty} from '../util'

export function getComment(): comventComment {
  const path = process.env.GITHUB_EVENT_PATH
  if (!path) throw new Error('GITHUB_EVENT_PATH not found')

  const data = readFileSync(path)
  const event = JSON.parse(data.toString())

  if (!hasProperty(event.comment, 'body'))
    throw new Error('Comment body not found')

  const msg: comventComment = {
    commentBody: event.comment.body,
    username: event.comment.user.login
  }

  return msg
}

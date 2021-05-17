import * as github from '@actions/github'
import {components} from '@octokit/openapi-types'

// Workaround suggested in https://github.com/octokit/rest.js/issues/1971#issuecomment-747129857
type GetRepoContentResponseDataFile = components['schemas']['content-file']

/**
 * fetchFileContent fetches the file content and returns string representation
 * @param token GitHub Token string, typically provided as secrets.GITHUB_TOKEN
 * @param filePath File name to load
 */
export async function fetchFileContent(
  token: string,
  filePath: string
): Promise<string> {
  const octokit = github.getOctokit(token)

  const {data} = await octokit.rest.repos.getContent({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    path: filePath,
    ref: github.context.sha
  })

  // Workaround to get the content type
  if (Array.isArray(data)) throw new Error('config data is malformed')

  const d = data as GetRepoContentResponseDataFile

  if (typeof d.content === 'undefined')
    throw new Error('undefined content received for config')

  // Encoding needs to be hardcoded here, as d.encoding is represented as string,
  // but 'base64' is a part of union in the Buffer.from.
  return Buffer.from(d.content, 'base64').toString()
}

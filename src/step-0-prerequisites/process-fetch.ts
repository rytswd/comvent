import {fetchFileContent} from './fetch-config'

export async function fetch(token: string, filePath: string): Promise<string> {
  let result: string

  try {
    result = await fetchFileContent(token, filePath)
  } catch (ex) {
    throw new Error(`failed to load config: ${ex}`)
  }

  return result
}

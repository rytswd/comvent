import * as core from '@actions/core'
import {comventSetup} from '../util'
import {mapToComventSetup} from './map-yaml'
import {parseYAML} from './parse-yaml'

export function prepare(fileContent: string): comventSetup {
  const data = parseYAML(fileContent)
  const setup = mapToComventSetup(data)

  core.debug(`setup retrieved, 
      whitelist: ${setup.usersWhitelisted}
      blacklist: ${setup.usersBlacklisted}
      keywords:  ${setup.keywords}`)

  return setup
}

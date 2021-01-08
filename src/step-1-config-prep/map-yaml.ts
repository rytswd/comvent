import * as core from '@actions/core'
import {comventSetup, hasProperty, isArrayOfStrings} from '../util'

export function mapToComventSetup(data: Map<string, object>): comventSetup {
  const result: comventSetup = {
    trigger: 'default',
    usersBlacklisted: [],
    usersWhitelisted: [],
    keywords: new Map()
  }

  // If there is no version input, it assumes that the provided YAML follows the expected schema.
  if (data.has('version')) {
    const version = data.get('version')
    if (typeof version === 'string' && version !== '0.2.0') {
      throw new Error(`unexpected version '${version}' provided`)
    }
  }

  for (const [k, v] of data) {
    switch (k) {
      // 'version' is handled prior to the loop, and thus return immediately.
      case 'version':
        break

      // Handle 'trigger' value, which can only hold a string input.
      case 'trigger':
        if (typeof v === 'string' && v === 'specific')
          result.trigger = 'specific'
        break

      // Handle 'users' stanza - which holds 'active' and/or 'inactive' array(s).
      //   - active: array of string, which is used to whitelist specific users.
      //   - inactive: array of string, which is used to blacklist provided users.
      case 'users':
        if (typeof v === 'object' && v !== null) {
          const users = v
          if (hasProperty(users, 'active') && isArrayOfStrings(users.active))
            result.usersWhitelisted = users.active

          if (
            hasProperty(users, 'inactive') &&
            isArrayOfStrings(users.inactive)
          )
            result.usersBlacklisted = users.inactive
        }
        core.debug(typeof v)
        break

      // Handle 'keywords' stanza.
      case 'keywords':
        if (Array.isArray(v)) {
          for (const keyword of v) {
            if (!hasProperty(keyword, 'name')) break
            if (!hasProperty(keyword, 'value')) break

            const name = keyword.name
            const regex = keyword.value

            result.keywords.set(name, regex)
          }
        }
        break

      default:
        break
    }
  }

  return result
}

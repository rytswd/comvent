import * as core from '@actions/core'
import {fetch} from './step-0-prerequisites/process-fetch'
import {prepare} from './step-1-config-prep/process-prep'
import {checkComment} from './step-2-check-comment/process-check'

async function run(): Promise<void> {
  try {
    core.debug('Getting input from Action setup')
    const token = core.getInput('token')
    const configPath = core.getInput('config-path')
    const configCheckOnly = core.getInput('config-check-only')

    core.debug('Getting config file for further processing')
    const f: string = await fetch(token, configPath)

    core.debug('Parse config and prepare for comment event check')
    const config = prepare(f)

    // If only config check is to be done, return early
    if (configCheckOnly !== '') {
      core.debug('config-check-only flag found, skipping comment handling')
      return
    }

    core.debug('Starting comment check by iterating comvent config')
    checkComment(config)

    core.debug('comvent complete')
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()

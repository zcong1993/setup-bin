import * as core from '@actions/core'

async function run(): Promise<void> {
  try {
    const body = core.getInput('body') || 'default'
    core.info(`Echo body: ${body}`)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()

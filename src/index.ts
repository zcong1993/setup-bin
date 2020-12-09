import * as core from '@actions/core'
import { BinInstaller } from './installer'

async function run(): Promise<void> {
  try {
    const name = core.getInput('name', { required: true })
    const version = core.getInput('bin-version', { required: true })
    const downloadUrl = core.getInput('download-url', { required: true })
    const binPath = core.getInput('bin-path')

    const installer = new BinInstaller(name, binPath)
    installer.downloadUrl = downloadUrl

    await installer.getTools(version)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()

import * as core from '@actions/core'
import * as github from '@actions/github'
import * as exec from '@actions/exec'
import { BinInstaller } from './installer'

async function run(): Promise<void> {
  try {
    const name = core.getInput('name', { required: true })
    let version = core.getInput('bin-version')
    const binPath = core.getInput('bin-path')
    const testCmd = core.getInput('test-cmd')

    // direct set downloadUrl
    const downloadUrl = core.getInput('download-url')

    // support github release, org/repo
    const repoFull = core.getInput('repo-full')
    // github release tag, support latest
    const tag = core.getInput('tag-version')
    // github release assets matcher, regex
    const matcher = core.getInput('matcher')

    const installer = new BinInstaller(name, binPath)

    if (downloadUrl) {
      if (!version) {
        throw new Error('version is required when set downloadUrl')
      }
      installer.downloadUrl = downloadUrl
    } else {
      if (!repoFull || !tag || !matcher) {
        throw new Error(
          'repoFull, tag and matcher inputs are required when downloadUrl is not set'
        )
      }

      const [owner, repo] = repoFull.split('/')
      const octokit = github.getOctokit(process.env.GITHUB_TOKEN)

      const matcherReg = new RegExp(matcher)

      if (tag === 'latest') {
        const { data } = await octokit.rest.repos.getLatestRelease({
          owner,
          repo,
        })

        version = data.tag_name.replace(/^v/, '')
        installer.downloadUrl = data.assets.find((asset) =>
          matcherReg.test(asset.name)
        )?.browser_download_url
      } else {
        const { data } = await octokit.rest.repos.getReleaseByTag({
          owner,
          repo,
          tag,
        })

        version = data.tag_name.replace(/^v/, '')
        installer.downloadUrl = data.assets.find((asset) =>
          matcherReg.test(asset.name)
        )?.browser_download_url
      }
    }

    if (!installer.downloadUrl) {
      throw new Error('downloadUrl is required')
    }

    core.info(
      `download ${name}, version: ${version}, downloadUrl: ${installer.downloadUrl}`
    )
    await installer.getTools(version)

    if (testCmd) {
      const [cmd, ...args] = testCmd.split(' ')
      await exec.exec(cmd, args)
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()

const repo = require('../repo.config.json')

const command = {
  name: 'create-html5-app',
  run: async (toolbox) => {
    const { print, parameters, filesystem } = toolbox
    const pm = (process.env.npm_config_user_agent || '').indexOf('yarn') === 0

    //@Current Directory
    //const _current_dir = filesystem.cwd()

    //@First Parameter = App Name
    let _app_name = parameters.first
    let _app_name_exists = _app_name ? await filesystem.exists(_app_name) : null

    //print.info(`first params ${_app_name}`)
    function end(_app_name, pm) {
      print.success(`● ${_app_name} app created with success!`)
      print.highlight(
        `- cd ${_app_name} Leave your star at: https://github.com/andremalveira/create-html5-app`
      )
    }

    async function validate(owner, repo, paths, _app_name) {
      const { Octokit } = require('@octokit/rest')
      const _app_dir = filesystem.dir(_app_name).cwd()
      const spinner = toolbox.print.spin('Validating files...')
      try {
        await new Octokit().repos.getContent({
          owner,
          repo,
          paths,
        })

        spinner.succeed('Validated files')
        return true
      } catch (error) {
        spinner.fail('Validating Failed!')
        filesystem.remove(_app_dir)
        print.error(`× Error: ${error.message} - Status ${error.status}`)
        return false
      }
    }

    async function download(_app_name) {
      const mainUrl = `https://codeload.github.com/${repo.owner}/${repo.repo}/tar.gz/${repo.branch}`
      const _app_dir = filesystem.dir(_app_name).cwd()

      const { default: got } = await import('got')
      const { x } = require('tar')

      const spinner = toolbox.print.spin('Downloading files...')

      try {
        await new Promise((resolve) => {
          got
            .stream(mainUrl)
            .pipe(x({ cwd: _app_dir, strip: 1 }, [`${repo.repo}-main`]))
            .on('finish', () => resolve())
        })

        spinner.succeed('Downloaded files')
        return true
      } catch (error) {
        spinner.fail('Download Failed!')
        print.error(`× Error: ${error.message} - Status ${error.status}`)
        filesystem.remove(_app_dir)
        return false
      }
    }

    async function create_app() {
      let validated, downloaded

      validated = await validate(repo.owner, repo.repo, false, _app_name)

      if (validated) {
        downloaded = await download(_app_name)
      }
      if (downloaded) {
        end(_app_name, pm)
      }
    }

    //@verifications
    if (!_app_name) {
      print.error(`App name must be specified!`)
      return
    }
    if (_app_name_exists == 'dir') {
      print.error(`An app with that name already exists!`)
      return false
    }

    //@starting
    print.highlight(`● Building ${_app_name}`)
    await create_app()
  },
}

module.exports = command

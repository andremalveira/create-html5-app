const repo = require('../repo.config.json')

const command = {
  name: 'create-html5-app',
  run: async (toolbox) => {
    const { print, parameters, filesystem, template, create_page } = toolbox
    const pm = (process.env.npm_config_user_agent || '').indexOf('yarn') === 0

    //variables
    let APP_NAME = parameters.first
    let OPTIONS = await check_options(parameters.options)

    let _app_name_exists = APP_NAME ? await filesystem.exists(APP_NAME) : null

    if (OPTIONS.page) {
      await create_page(OPTIONS)
      return
    } else {
      //@verifications
      if (!APP_NAME) {
        print.error(`App name must be specified!`)
        return
      }
      if (_app_name_exists == 'dir') {
        print.error(`An app with that name already exists!`)
        return false
      }

      //@starting
      print.highlight(`√ Building ${APP_NAME} app`)
      //await create_app()
      await validate(repo.owner, repo.repo, false, APP_NAME)
    }

    //functions
    async function check_options(options) {
      let obj = new Object()

      if (options) {
        if (options.example || options.e) {
          let example_v = options.example || options.e

          obj.example = true
          obj.example_name = typeof example_v === 'string' ? example_v : null
        }
        if (options.page || options.p) {
          let page_v = options.page || options.p

          obj.page = true
          obj.page_name = typeof page_v === 'string' ? page_v : null
        }
      }
      return obj
    }

    async function validate(owner, repo, paths, _app_name, option) {
      const { Octokit } = require('@octokit/rest')
      const _app_dir = filesystem.dir(_app_name).cwd()
      const spinner = toolbox.print.spin('Validating files...')

      try {
        const _repo = await new Octokit().repos.getContent({
          owner,
          repo,
          path: option.example ? `examples/${option.example_name}` : '',
        })

        spinner.succeed('Validated files')
        return true
      } catch (error) {
        spinner.fail('Validating Failed!')
        filesystem.remove(_app_dir)

        if (option.example) {
          print.error(`× Error: Example '${option.example_name}' not found!`)
        } else {
          print.error(`× Error: ${error.message} - Status ${error.status}`)
        }

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
            .pipe(
              x({ cwd: _app_dir, strip: 3 }, [
                `${repo.repo}-main/examples/html5/`,
              ])
            )
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

      validated = await validate(
        repo.owner,
        repo.repo,
        false,
        APP_NAME,
        OPTIONS
      )

      if (validated) {
        downloaded = await download(APP_NAME)
      }
      if (downloaded) {
        const option = await check_options(OPTIONS)
        if (option.example) {
          let installed = await toolbox.install_dependencies(APP_NAME, pm)
          if (installed) end(APP_NAME, pm)
        } else {
          end(APP_NAME, pm)
        }
      }
    }

    async function end(_app_name, pm) {
      const option = await check_options(OPTIONS)

      print.success(`√ ${_app_name} app created with success!`)

      print.highlight(`   `)
      print.muted(`> cd ${_app_name}`)
      if (option.example) {
        print.muted(`> npm run dev`)
        print.muted(`> #or`)
        print.muted(`> yarn dev`)
      }
      print.highlight(`   `)

      print.highlight(`⭐ Leave your star at:`)
      print.highlight(`   https://github.com/andremalveira/create-html5-app`)
      print.highlight(`   `)
    }
  },
}

module.exports = command

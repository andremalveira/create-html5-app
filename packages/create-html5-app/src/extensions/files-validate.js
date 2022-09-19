/* eslint-disable prettier/prettier */
module.exports = async (toolbox) => {
  const { print, filesystem } = toolbox

  toolbox.files_validate = async (_app_name, option, config) => {
    const { Octokit } = require('@octokit/rest')
    const _app_dir = filesystem.dir(_app_name).cwd()
    const spinner = toolbox.print.spin('Validating files...')

    let example_name =
      option && option.example ? option.example_name : config.defaultExample

    try {
      const _repo = await new Octokit().repos.getContent({
        owner: config.owner,
        repo: config.repo,
        ref: config.branch,
        path: option && option.example ? `examples/${example_name}` : '',
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

}

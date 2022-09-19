/* eslint-disable prettier/prettier */
module.exports = async (toolbox) => {
  const { print, filesystem } = toolbox

  toolbox.files_download = async (_app_name, option, config) => {
    const mainUrl = `https://codeload.github.com/${config.owner}/${config.repo}/tar.gz/${config.branch}`

    let example_name =
      option && option.example ? option.example : config.defaultExample

    const { default: got } = await import('got')
    const { x } = require('tar')

    const spinner = toolbox.print.spin('Downloading files...')

    const _app_dir = filesystem.dir(_app_name).cwd()
    try {
      await new Promise((resolve) => {
        got
          .stream(mainUrl)
          .pipe(
            x({ cwd: _app_dir, strip: 3}, 
              [`${config.repo}-${config.branch}/examples/with-scss`]
            )
          )
          .on('finish', () => {
            resolve()
          })
      })

      let hasFiles = await toolbox.exists(_app_dir);
      if(hasFiles.dir_exists && hasFiles.dir_has_files) {
        spinner.succeed('Downloaded files')
        return true
      } else {
        let error = new Error("No files found")
            error.status = 404
        throw error
      }
    } catch (error) {
      spinner.fail('Download Failed!')
      print.error(`× Error: ${error.message} - Status ${error.status}`)
      filesystem.remove(_app_dir)
      return false
    }
  }

}

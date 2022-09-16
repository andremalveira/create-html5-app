/* eslint-disable prettier/prettier */
module.exports = async (toolbox) => {
  const { print, filesystem } = toolbox

  toolbox.install_dependencies = async (_app_name, pm) => {
    const { promisify } = require('util')
    const { exec: defaultExec } = require('child_process')
    const exec = promisify(defaultExec)
    const cwd = filesystem.dir(_app_name).cwd()

    let installed = false

    const spinner = toolbox.print.spin(
      'Installing dependencies. This might take a couple of minutes.'
    )

    await exec(
      `${pm ? 'yarn' : 'npm'} i `,
      {cwd,},
      (error, stdout, stderr) => {
        if (error) {
          spinner.fail('Install dependencies Failed!')
          print.error(`× Error: ${error.message}`)
          return
        }
        if (stderr) {
          spinner.fail('Install dependencies Failed!')
          return
        }
        spinner.succeed('Installed Dependencies') 
        installed = true
      }
    )

    return installed
  }

}

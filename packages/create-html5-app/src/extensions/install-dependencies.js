/* eslint-disable prettier/prettier */
module.exports = async (toolbox) => {
  const { print, filesystem } = toolbox

  toolbox.install_dependencies = async (_app_name, pm, callback) => {
    const { promisify } = require('util')
    const { exec: defaultExec } = require('child_process')
    const exec = promisify(defaultExec)
    const cwd = filesystem.dir(_app_name).cwd()

    const spinner = toolbox.print.spin(
      'Installing dependencies. This might take a couple of minutes.'
    )

    await exec(
      `${pm ? 'yarn --force' : 'npm i --force'}`,
      {cwd},
      (error, stdout, stderr) => {
        if (error) {
          spinner.fail('Install dependencies Failed!')
          print.error(`× Error: ${error.message}`)
          return false
        }
/*         if (stderr) {
          spinner.fail('Install dependencies Failed!')
          return false
        } */
        spinner.succeed('Installed Dependencies') 
        callback({success: true})
        return true
      }
    )
  }

}

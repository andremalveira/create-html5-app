/* eslint-disable prettier/prettier */
module.exports = async (toolbox) => {
  const { print, filesystem } = toolbox

  toolbox.gitInit = async (_app_name, callback = () => {}) => {
    const { promisify } = require('util')
    const { exec: defaultExec } = require('child_process')
    const exec = promisify(defaultExec)
    const cwd = filesystem.dir(_app_name).cwd()

    await exec(
      `git init`,
      {cwd},
      (error, stdout, stderr) => {
        if (error) {
          print.error('git init Failed!')
          print.error(`× Error: ${error.message}`)
          return false
        }
        if (stderr) {
          print.error('git init Failed!')
          return false
        }
        print.success('Git initialized!') 
        callback({success: true})
        return true
      }
    )
  }

}

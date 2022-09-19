/* eslint-disable prettier/prettier */
module.exports = async (toolbox) => {
  const { print, filesystem } = toolbox

  toolbox.exists = async (path) => {
    let typeFile = await filesystem.exists(path)

    let res = {
      dir_exists: false,
      file_exists: false,
      dir_has_files: false
    }
    if(typeFile == 'dir') {
      res.dir_exists = true
      if(await filesystem.list(path).length > 0) {
        res.dir_has_files = true
      }
    }
    if(typeFile == 'file') {
      res.file_exists = true
    }

    return res
  }

}

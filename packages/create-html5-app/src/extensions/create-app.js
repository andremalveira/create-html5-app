/* eslint-disable prettier/prettier */
module.exports = async (toolbox) => {
  const { print } = toolbox

  toolbox.create_app = async (APP_NAME, OPTIONS, config, pm) => {
    let validated, downloaded

    validated = await toolbox.files_validate(APP_NAME, OPTIONS, config)

    if (validated) {
      downloaded = await toolbox.files_download(APP_NAME, OPTIONS, config)
    }
    if (downloaded) {
      if (OPTIONS.example) {
        let installed = await toolbox.install_dependencies(APP_NAME, pm)
        if (installed) toolbox.finish(APP_NAME, OPTIONS)
      } else {
        toolbox.finish(APP_NAME, OPTIONS)
      }
    }
  }

}

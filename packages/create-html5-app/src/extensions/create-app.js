/* eslint-disable prettier/prettier */
module.exports = async (toolbox) => {

  toolbox.create_app = async (APP_NAME, OPTIONS, config, pm) => {
    let validated, downloaded

    validated = await toolbox.files_validate(APP_NAME, OPTIONS, config)

    if (validated) {
      downloaded = await toolbox.files_download(APP_NAME, OPTIONS, config)
    }
    if (downloaded) {
      if (OPTIONS.example) {
        await toolbox.install_dependencies(
          APP_NAME, pm, 
          (e) => {
            if (e.success) toolbox.finish(APP_NAME, OPTIONS)
          }
        )
      } else {
        toolbox.finish(APP_NAME, OPTIONS)
      }
      if (OPTIONS.git) {
        toolbox.gitInit(APP_NAME)
      }
    }
  }

}

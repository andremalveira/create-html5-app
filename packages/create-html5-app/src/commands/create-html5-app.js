const config = require('../repo.config.json')

const command = {
  name: 'create-html5-app',
  run: async (toolbox) => {
    const { print, parameters } = toolbox
    const pm = (process.env.npm_config_user_agent || '').indexOf('yarn') === 0

    //@variables
    let APP_NAME = parameters.first
    let OPTIONS = await toolbox.get_options(parameters.options)

    if (!APP_NAME && Object.keys(parameters.options).length == 0) {
      toolbox.about()
      return
    }

    if (OPTIONS.page) {
      await toolbox.create_page(OPTIONS)
      return
    } else {
      //@check if has app_name
      if (!APP_NAME) {
        print.error(`App name must be specified!`)
        print.highlight('')
        print.highlight('Help: [create-html5-app | cha] [app-name] [options]')
        print.highlight('')
        return
      }

      //@check if app_name dir exists
      let app_name_exists = await toolbox.exists(APP_NAME)
      if (app_name_exists.dir_exists) {
        print.error(`An app with that name already exists!`)
        return
      }

      //@check if options has --example and has name
      if (OPTIONS.example && !OPTIONS.example_name) {
        print.error(`× Example name must be specified!`)
        return
      }

      //@starting
      print.highlight(`√ Building ${APP_NAME} app`)
      await toolbox.create_app(APP_NAME, OPTIONS, config, pm)
    }
  },
}

module.exports = command

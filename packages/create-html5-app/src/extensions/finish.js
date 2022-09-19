/* eslint-disable prettier/prettier */
module.exports = async (toolbox) => {
  const { print } = toolbox

  toolbox.finish = async (_app_name, option) => {
  
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

}

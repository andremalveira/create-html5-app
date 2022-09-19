/* eslint-disable prettier/prettier */
module.exports = async (toolbox) => {
  const { print } = toolbox

  toolbox.about = async (_app_name, option) => {
    print.muted(``)
    print.muted(`create-html5-app or cha, is a command line to start a simple html5 project.`)
    print.muted(``)
    print.highlight(`📌 Help? --> create-html5-app -h`)
    print.muted(``)
    print.muted(``)
    print.highlight(`⭐ Leave your star at:`)
    print.highlight(`   https://github.com/andremalveira/create-html5-app`)
    print.highlight(`   `)
  }

}

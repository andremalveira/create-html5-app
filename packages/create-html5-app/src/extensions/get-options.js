/* eslint-disable prettier/prettier */
module.exports = async (toolbox) => {
  const { print } = toolbox

  toolbox.get_options = async (options) => {
    let obj = new Object()

    if (options) {
      if (options.example || options.e) {
        let example_v = options.example || options.e
        obj.example = true
        obj.example_name = typeof example_v === 'string' ? example_v : null
      }

      if (options.page || options.p) {
        let page_v = options.page || options.p
        obj.page = true
        obj.page_name = typeof page_v === 'string' ? page_v : null
      }

      if (options.git || options.g) {
        let value = options.git || options.g
        obj.git = value
      }
    }
    return obj
  }

}
